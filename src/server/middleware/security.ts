/**
 * Security middleware
 * Adds security headers to all responses
 * Note: This runs on every request, which is acceptable for adding headers
 */
export default defineEventHandler(event => {
  const headers = event.node.res

  // Prevent clickjacking attacks
  headers.setHeader('X-Frame-Options', 'DENY')

  // Prevent MIME type sniffing
  headers.setHeader('X-Content-Type-Options', 'nosniff')

  // Enable XSS protection (legacy browsers)
  headers.setHeader('X-XSS-Protection', '1; mode=block')

  // Control referrer information
  headers.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Content Security Policy (adjust as needed for your app)
  headers.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'"
  )

  // Permissions Policy (formerly Feature Policy)
  headers.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )

  // Strict Transport Security (HTTPS only - enable in production)
  if (process.env.NODE_ENV === 'production') {
    headers.setHeader(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    )
  }
})
