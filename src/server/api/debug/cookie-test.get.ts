/**
 * Debug endpoint to test cookie configuration
 * Check if cookies are being set and read correctly
 */
export default defineEventHandler(async event => {
  const nodeEnv = process.env.NODE_ENV
  const isProduction = nodeEnv === 'production'

  // Try to read existing auth cookie
  const existingCookie = getCookie(event, 'auth_token')

  // Set a test cookie
  setCookie(event, 'test_cookie', 'test_value_' + Date.now(), {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 60 * 5, // 5 minutes
    path: '/',
  })

  return {
    environment: {
      NODE_ENV: nodeEnv,
      isProduction,
      JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT SET',
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
    },
    cookies: {
      existingAuthToken: existingCookie ? 'PRESENT' : 'NOT FOUND',
      testCookieSet: true,
    },
    cookieSettings: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: '5 minutes',
      path: '/',
    },
    request: {
      protocol: event.node.req.headers['x-forwarded-proto'] || 'unknown',
      host: event.node.req.headers.host,
      userAgent: event.node.req.headers['user-agent'],
    },
    headers: {
      'x-forwarded-proto': event.node.req.headers['x-forwarded-proto'],
      'x-forwarded-for': event.node.req.headers['x-forwarded-for'],
    },
  }
})
