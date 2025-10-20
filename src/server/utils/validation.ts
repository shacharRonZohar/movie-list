/**
 * Validation utilities for input sanitization and validation
 */

/**
 * Validate email format
 */
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate username format (alphanumeric, underscore, hyphen, 3-20 chars)
 */
export function isValidUsername(username: string) {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
  return usernameRegex.test(username)
}

/**
 * Validate password strength (min 6 characters for now, can be enhanced)
 */
export function isValidPassword(password: string) {
  return password.length >= 6
}

/**
 * Sanitize string input by trimming whitespace
 */
export function sanitizeString(input: string) {
  return input.trim()
}

/**
 * Validate required fields are present
 */
export function validateRequired<T extends Record<string, any>>(
  data: T,
  requiredFields: (keyof T)[]
) {
  const missing: string[] = []

  for (const field of requiredFields) {
    if (
      data[field] === undefined ||
      data[field] === null ||
      data[field] === ''
    ) {
      missing.push(String(field))
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}
