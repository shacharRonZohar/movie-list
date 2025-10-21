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
    console.log('[LOGIN] Login attempt started')

    // Rate limit: 5 login attempts per minute per IP
    requireRateLimit(event, { windowMs: 60000, maxRequests: 5 })

    // Parse request body
    const body = await readBody(event)
    const { username, password } = body

    console.log('[LOGIN] Login attempt for username:', username)

    // Validate required fields
    if (!username || !password) {
      console.log('[LOGIN] Missing username or password')
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
      console.log('[LOGIN] User not found:', sanitizedUsername)
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password',
      })
    }

    console.log('[LOGIN] User found, verifying password')

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash)

    if (!isPasswordValid) {
      console.log('[LOGIN] Invalid password for user:', sanitizedUsername)
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password',
      })
    }

    console.log('[LOGIN] Password verified successfully')

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      username: user.username,
    })

    // Debug logging
    console.log('[LOGIN] Setting auth cookie', {
      NODE_ENV: process.env.NODE_ENV,
      username: user.username,
      tokenLength: token.length,
    })

    // Set HTTP-only cookie
    setAuthCookie(event, token)

    // Return user data (without password hash)
    console.log('[LOGIN] Login successful for:', user.username)

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
    console.error('[LOGIN] Error:', error)

    // Return generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error during login',
    })
  }
})
