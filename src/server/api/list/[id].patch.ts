/**
 * Update a list item
 * PATCH /api/list/:id
 */

import { prisma } from '~/server/utils/prisma'
import { z } from 'zod'
import { StatusSchema } from '~/server/utils/zod'

const updateListItemSchema = z.object({
  status: StatusSchema.optional(),
  position: z.number().positive().optional(),
  rating: z.number().min(0).max(10).nullable().optional(),
})

export default defineProtectedEventHandler(async event => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'List item ID is required',
    })
  }

  const body = await readBody(event)

  // Validate input
  const validation = updateListItemSchema.safeParse(body)
  if (!validation.success) {
    throw createError({
      statusCode: 400,
      message: validation.error.issues[0]?.message || 'Invalid input',
    })
  }

  const { status, position, rating } = validation.data

  // Get existing list item
  const existingItem = await prisma.listItem.findUnique({
    where: { id },
  })

  if (!existingItem) {
    throw createError({
      statusCode: 404,
      message: 'List item not found',
    })
  }

  // Use transaction for status history
  const updatedItem = await prisma.$transaction(async tx => {
    // Update the list item - with fractional indexing, we just update this one item
    const updated = await tx.listItem.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(position !== undefined && { position }),
        ...(rating !== undefined && { rating }),
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

    // Create status history if status changed
    if (status !== undefined && status !== existingItem.status) {
      await tx.statusHistory.create({
        data: {
          listItemId: id,
          fromStatus: existingItem.status,
          toStatus: status,
        },
      })
    }

    return updated
  })

  return updatedItem
})
