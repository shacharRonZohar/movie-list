import { defineProtectedEventHandler } from '~/server/utils/defineProtectedEventHandler'
import { prisma } from '~/server/utils/prisma'
import { z } from 'zod'
import { StatusSchema } from '~/server/utils/zod'
import type { Prisma } from '@prisma/client'

const createContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500),
  status: StatusSchema,
  requestedById: z.string().uuid('Invalid user ID'),
  position: z.number().int().positive().optional(),
})

export type ContentWithRelations = Prisma.ContentGetPayload<{
  include: {
    createdBy: { select: { id: true; username: true; displayName: true } }
    requestedBy: { select: { id: true; username: true; displayName: true } }
  }
}>

export default defineProtectedEventHandler(async event => {
  const body = await readBody(event)

  // Validate input
  const validation = createContentSchema.safeParse(body)
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.issues[0]?.message || 'Invalid input',
    })
  }

  const { title, status, requestedById, position } = validation.data

  // Verify the requested user exists
  const requestedUser = await prisma.user.findUnique({
    where: { id: requestedById },
  })

  if (!requestedUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Requested user not found',
    })
  }

  // Get all existing content to calculate order
  const existingContent = await prisma.content.findMany({
    orderBy: { order: 'asc' },
    select: {
      id: true,
      order: true,
    },
  })

  // Calculate the insert order
  let insertOrder = 1
  if (position && position <= existingContent.length) {
    // Insert at specified position
    insertOrder = position
  } else {
    // Insert at end
    insertOrder =
      existingContent.length > 0
        ? (existingContent[existingContent.length - 1]?.order ?? 0) + 1
        : 1
  }

  // Use transaction to ensure atomicity
  const content = await prisma.$transaction(async tx => {
    // Shift all items at and after the insert position if needed
    if (position && position <= existingContent.length) {
      await tx.content.updateMany({
        where: {
          order: { gte: insertOrder },
        },
        data: {
          order: { increment: 1 },
        },
      })
    }

    // Create the new content with the calculated order
    return tx.content.create({
      data: {
        title,
        status,
        createdById: event.context.user!.id,
        requestedById,
        order: insertOrder,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
        requestedBy: {
          select: {
            id: true,
            username: true,
            displayName: true,
          },
        },
      },
    })
  })

  return content
})
