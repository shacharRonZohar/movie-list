/**
 * Get all list items with their content
 * GET /api/list
 */

import { prisma } from '~/server/utils/prisma'

export default defineProtectedEventHandler(async () => {
  const listItems = await prisma.listItem.findMany({
    orderBy: {
      position: 'asc',
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

  return listItems
})
