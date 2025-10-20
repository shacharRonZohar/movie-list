import { prisma } from '../../utils/prisma'
import { hashPassword } from '../../utils/auth'
import {
  sanitizeString,
  isValidUsername,
  isValidPassword,
  validateRequired,
} from '../../utils/validation'

export default defineEventHandler(async event => {
  try {
    // Parse request body
    const body = await readBody(event)
    const { username, password, displayName } = body

    // Validate required fields
    const validation = validateRequired(body, [
      'username',
      'password',
      'displayName',
    ])
    if (!validation.valid) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required fields: ${validation.missing.join(', ')}`,
      })
    }

    // Sanitize inputs
    const sanitizedUsername = sanitizeString(username)
    const sanitizedDisplayName = sanitizeString(displayName)

    // Validate username format
    if (!isValidUsername(sanitizedUsername)) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'Invalid username format. Use 3-20 alphanumeric characters, underscores, or hyphens.',
      })
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must be at least 6 characters long',
      })
    }

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: sanitizedUsername },
    })

    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Username already exists',
      })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        username: sanitizedUsername,
        passwordHash,
        displayName: sanitizedDisplayName,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        createdAt: true,
      },
    })

    return {
      user,
    }
  } catch (error: any) {
    // If it's already an H3Error, rethrow it
    if (error.statusCode) {
      throw error
    }

    console.error('Create user error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error while creating user',
    })
  }
})
