import { prisma } from '../../utils/prisma'
import { defineProtectedEventHandler } from '../../utils/defineProtectedEventHandler'

/**
 * Get all users endpoint
 * Returns a list of all users (requires authentication)
 */
export default defineProtectedEventHandler(async event => {
  try {
    // Access authenticated user from context
    const { user } = event.context
    console.log('Authenticated user:', user?.username)

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
