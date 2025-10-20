import { prisma } from '../../utils/prisma'
import { getUserFromToken } from '../../utils/auth'

export default defineEventHandler(async event => {
  try {
    // Get user from JWT token in cookie
    const tokenPayload = getUserFromToken(event)

    if (!tokenPayload) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authenticated',
      })
    }

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
  } catch (error: any) {
    // If it's already an H3Error, rethrow it
    if (error.statusCode) {
      throw error
    }

    console.error('Get current user error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
