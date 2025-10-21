import { prisma } from '../../utils/prisma'
import { defineProtectedEventHandler } from '../../utils/defineProtectedEventHandler'

/**
 * Get current authenticated user
 * Returns full user data from the database based on JWT token
 */
export default defineProtectedEventHandler(async event => {
  try {
    console.log('[ME] Getting current user info')

    const tokenPayload = event.context.user!

    console.log('[ME] Token payload:', { username: tokenPayload.username })

    // Fetch full user data from database
    const user = await prisma.user.findUnique({
      where: { id: tokenPayload.id },
      select: {
        id: true,
        username: true,
        displayName: true,
        createdAt: true,
      },
    })

    if (!user) {
      console.log('[ME] User not found in database:', tokenPayload.id)
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found',
      })
    }

    console.log('[ME] Returning user:', { username: user.username })

    return {
      user,
    }
  } catch (error) {
    // If it's already an H3Error, rethrow it
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('[ME] Error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
