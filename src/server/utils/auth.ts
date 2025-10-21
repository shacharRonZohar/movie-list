import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'
import { validateJWTUser } from './validation'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-this'
const JWT_EXPIRATION = '7d'

export interface JwtPayload {
  id: string
  username: string
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/**
 * Verify a password against its hash
 */
export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  })
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

/**
 * Get user from JWT token in cookies
 */
export function getUserFromToken(event: H3Event) {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    console.log('[AUTH] No auth_token cookie found')
    return null
  }

  console.log('[AUTH] Found auth_token, verifying...', {
    tokenLength: token.length,
  })

  const user = verifyToken(token)

  if (!user) {
    console.log('[AUTH] Token verification failed')
    return null
  }

  const validatedUser = validateJWTUser(user)

  if (validatedUser) {
    console.log('[AUTH] User authenticated:', {
      username: validatedUser.username,
    })
  } else {
    console.log('[AUTH] User validation failed')
  }

  return validatedUser
}

/**
 * Set authentication cookie
 */
export function setAuthCookie(event: H3Event, token: string) {
  const isProduction = process.env.NODE_ENV === 'production'

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? 'strict' : 'lax') as 'strict' | 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    // Don't set domain - let browser handle it automatically
  }

  console.log('[AUTH] Setting cookie with options:', {
    ...cookieOptions,
    tokenLength: token.length,
  })

  setCookie(event, 'auth_token', token, cookieOptions)
}

/**
 * Clear authentication cookie
 */
export function clearAuthCookie(event: H3Event) {
  deleteCookie(event, 'auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/',
  })
}

export function requireAuth(event: H3Event) {
  console.log('[AUTH] requireAuth called for:', event.node.req.url)
  const user = getUserFromToken(event)
  if (!user) {
    console.log('[AUTH] Authentication required but no valid user found')
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
  console.log('[AUTH] Authentication successful for:', user.username)
  return user
}
