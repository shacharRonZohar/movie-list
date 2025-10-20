import { prisma } from '../../utils/prisma'
import { verifyPassword, generateToken, setAuthCookie } from '../../utils/auth'
import { sanitizeString } from '../../utils/validation'
import { requireRateLimit } from '../../utils/rateLimit'

/**
 * Login endpoint
 * Authenticates user with username and password, returns JWT token in HTTP-only cookie
 * Rate limited to prevent brute force attacks
 */
export default defineEventHandler(async event => {
  try {
    // Rate limit: 5 login attempts per minute per IP
    requireRateLimit(event, { windowMs: 60000, maxRequests: 5 })
    // Parse request body
    const body = await readBody(event)
    const { username, password } = body

    // Validate required fields
    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username and password are required',
      })
    }

    // Sanitize inputs
    const sanitizedUsername = sanitizeString(username)

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username: sanitizedUsername },
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password',
      })
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash)

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password',
      })
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      username: user.username,
    })

    // Set HTTP-only cookie
    setAuthCookie(event, token)

    // Return user data (without password hash)
    return {
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        createdAt: user.createdAt,
      },
    }
  } catch (error) {
    // If it's already an H3Error, rethrow it
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    // Log the error for debugging
    console.error('Login error:', error)

    // Return generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error during login',
    })
  }
})
