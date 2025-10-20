import { prisma } from '../../utils/prisma'
import { defineProtectedEventHandler } from '../../utils/defineProtectedEventHandler'

/**
 * Get current authenticated user
 * Returns full user data from the database based on JWT token
 */
export default defineProtectedEventHandler(async event => {
  try {
    const tokenPayload = event.context.user!

    // Fetch full user data from database
    const user = await prisma.user.findUnique({
      where: { id: tokenPayload.userId },
      select: {
        id: true,
        username: true,
        displayName: true,
        createdAt: true,
      },
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found',
      })
    }

    return {
      user,
    }
  } catch (error) {
    // If it's already an H3Error, rethrow it
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('Get current user error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
