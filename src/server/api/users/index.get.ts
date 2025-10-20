import { prisma } from '../../utils/prisma'

export default defineEventHandler(async _event => {
  try {
    // Fetch all users (without password hashes)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        displayName: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return {
      users,
    }
  } catch (error) {
    console.error('Get users error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error while fetching users',
    })
  }
})
