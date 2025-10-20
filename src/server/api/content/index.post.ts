import { defineProtectedEventHandler } from '~/server/utils/defineProtectedEventHandler'
import { prisma } from '~/server/utils/prisma'
import { z } from 'zod'
import { StatusSchema } from '~/server/utils/zod'
import type { Prisma } from '@prisma/client'

const createContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500),
  status: StatusSchema,
  requestedById: z.string().uuid('Invalid user ID'),
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

  const { title, status, requestedById } = validation.data

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

  // Create content
  const content = await prisma.content.create({
    data: {
      title,
      status,
      createdById: event.context.user!.id,
      requestedById,
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

  return content
})
