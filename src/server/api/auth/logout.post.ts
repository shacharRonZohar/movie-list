import { clearAuthCookie } from '../../utils/auth'

/**
 * Logout endpoint
 * Clears the authentication cookie and invalidates the session
 */
export default defineEventHandler(async event => {
  try {
    console.log('[LOGOUT] Clearing auth cookie')

    // Clear the authentication cookie
    clearAuthCookie(event)

    console.log('[LOGOUT] Successfully logged out')

    return {
      success: true,
      message: 'Logged out successfully',
    }
  } catch (error) {
    console.error('[LOGOUT] Error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error during logout',
    })
  }
})
