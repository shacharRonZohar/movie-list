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
    return null
  }

  const user = verifyToken(token)

  return validateJWTUser(user)
}

/**
 * Set authentication cookie
 */
export function setAuthCookie(event: H3Event, token: string) {
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

/**
 * Clear authentication cookie
 */
export function clearAuthCookie(event: H3Event) {
  deleteCookie(event, 'auth_token', {
    path: '/',
  })
}

export function requireAuth(event: H3Event) {
  const user = getUserFromToken(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
  return user
}
