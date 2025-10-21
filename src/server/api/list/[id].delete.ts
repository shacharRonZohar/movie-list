/**
 * Remove a movie from the list
 * DELETE /api/list/:id
 */

import { prisma } from '~/server/utils/prisma'

export default defineProtectedEventHandler(async event => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'List item ID is required',
    })
  }

  // Get the item to be deleted
  const itemToDelete = await prisma.listItem.findUnique({
    where: { id },
    select: { position: true },
  })

  if (!itemToDelete) {
    throw createError({
      statusCode: 404,
      message: 'List item not found',
    })
  }

  // Use transaction to delete and reorder
  await prisma.$transaction(async tx => {
    // Delete the list item (cascade will delete status history)
    await tx.listItem.delete({
      where: { id },
    })

    // Shift all items after the deleted position
    await tx.listItem.updateMany({
      where: {
        position: { gt: itemToDelete.position },
      },
      data: {
        position: { decrement: 1 },
      },
    })
  })

  return { success: true }
})

