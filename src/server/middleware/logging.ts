/**
 * Logging middleware
 * Logs all incoming requests and responses for debugging
 */
export default defineEventHandler(async event => {
  const startTime = Date.now()
  const method = event.node.req.method
  const url = event.node.req.url
  const userAgent = event.node.req.headers['user-agent']
  const ip =
    event.node.req.headers['x-forwarded-for'] ||
    event.node.req.socket.remoteAddress

  // Log incoming request
  console.log(`[${new Date().toISOString()}] 📥 ${method} ${url}`, {
    ip,
    userAgent: userAgent?.substring(0, 50),
    cookies: event.node.req.headers.cookie ? 'PRESENT' : 'NONE',
  })

  // Log response after processing
  event.node.res.on('finish', () => {
    const duration = Date.now() - startTime
    const statusCode = event.node.res.statusCode

    const statusEmoji = statusCode < 300 ? '✅' : statusCode < 400 ? '🔀' : '❌'

    console.log(
      `[${new Date().toISOString()}] ${statusEmoji} ${method} ${url} ${statusCode} (${duration}ms)`
    )
  })
})
