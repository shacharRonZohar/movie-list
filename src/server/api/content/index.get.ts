import { defineProtectedEventHandler } from '~/server/utils/defineProtectedEventHandler'
import { prisma } from '~/server/utils/prisma'

export default defineProtectedEventHandler(async event => {
  const content = await prisma.content.findMany({
    orderBy: {
      order: 'asc',
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
