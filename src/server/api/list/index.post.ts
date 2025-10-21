/**
 * Add a movie to the list
 * POST /api/list
 */

import { prisma } from '~/server/utils/prisma'
import { z } from 'zod'
import { StatusSchema } from '~/server/utils/zod'

const addToListSchema = z.object({
  contentId: z.string().uuid('Invalid content ID'),
  status: StatusSchema.optional(),
  requestedById: z.string().uuid('Invalid user ID'),
  position: z.number().int().positive().optional(),
  rating: z.number().min(0).max(10).optional(),
})

export default defineProtectedEventHandler(async event => {
  const body = await readBody(event)

  // Validate input
  const validation = addToListSchema.safeParse(body)
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      message: validation.error.issues[0]?.message || 'Invalid input',
    })
  }

  const { contentId, status, requestedById, position, rating } = validation.data

  // Verify content exists
  const content = await prisma.content.findUnique({
    where: { id: contentId },
  })

  if (!content) {
    throw createError({
      statusCode: 404,
      message: 'Content not found',
    })
  }

  // Verify requested user exists
  const requestedUser = await prisma.user.findUnique({
    where: { id: requestedById },
  })

  if (!requestedUser) {
    throw createError({
      statusCode: 400,
      message: 'Requested user not found',
    })
  }

  // Check if content is already in the list
  const existingListItem = await prisma.listItem.findUnique({
    where: { contentId },
  })

  if (existingListItem) {
    throw createError({
      statusCode: 400,
      message: 'This content is already in your list',
    })
  }

  // Get all existing list items to calculate position
  const existingItems = await prisma.listItem.findMany({
    orderBy: { position: 'asc' },
    select: {
      id: true,
      position: true,
    },
  })

  // Calculate the insert position
  let insertPosition = 1
  if (position && position <= existingItems.length) {
    // Insert at specified position
    insertPosition = position
  } else {
    // Insert at end
    insertPosition =
      existingItems.length > 0
        ? (existingItems[existingItems.length - 1]?.position ?? 0) + 1
        : 1
  }

  // Use transaction to ensure atomicity
  const listItem = await prisma.$transaction(async tx => {
    // Shift all items at and after the insert position if needed
    if (position && position <= existingItems.length) {
      await tx.listItem.updateMany({
        where: {
          position: { gte: insertPosition },
        },
        data: {
          position: { increment: 1 },
        },
      })
    }

    // Create the new list item
    const newItem = await tx.listItem.create({
      data: {
        contentId,
        addedById: event.context.user!.id,
        requestedById,
        status: status || 'WANT_TO_WATCH',
        position: insertPosition,
        rating,
      },
      include: {
        content: true,
        addedBy: {
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

    // Create initial status history
    await tx.statusHistory.create({
      data: {
        listItemId: newItem.id,
        fromStatus: null,
        toStatus: status || 'WANT_TO_WATCH',
      },
    })

    return newItem
  })

  return listItem
})

