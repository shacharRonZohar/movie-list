import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-this'
const JWT_EXPIRATION = '7d'

export interface JwtPayload {
  userId: string
  username: string
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/**
 * Verify a password against its hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  })
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}

/**
 * Get user from JWT token in cookies
 */
export function getUserFromToken(event: H3Event): JwtPayload | null {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    return null
  }

  return verifyToken(token)
}

/**
 * Require authentication - throws error if not authenticated
 */
export function requireAuth(event: H3Event): JwtPayload {
  const user = getUserFromToken(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Please log in',
    })
  }

  return user
}

/**
 * Set authentication cookie
 */
export function setAuthCookie(event: H3Event, token: string): void {
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
export function clearAuthCookie(event: H3Event): void {
  deleteCookie(event, 'auth_token', {
    path: '/',
  })
}
