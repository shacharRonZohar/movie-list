import { clearAuthCookie } from '../../utils/auth'

export default defineEventHandler(async event => {
  try {
    // Clear the authentication cookie
    clearAuthCookie(event)

    return {
      success: true,
      message: 'Logged out successfully',
    }
  } catch (error) {
    console.error('Logout error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error during logout',
    })
  }
})
