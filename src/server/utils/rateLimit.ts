import type { H3Event } from 'h3'
import { setResponseHeader } from 'h3'

/**
 * Simple in-memory rate limiter
 * Note: For production, use Redis-based rate limiting (e.g., ioredis + rate-limiter-flexible)
 * This implementation is for demonstration and light production use only
 */

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
}

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

/**
 * Check if request should be rate limited
 *
 * @param event - H3 event
 * @param config - Rate limit configuration
 * @returns True if request should be allowed, false if rate limited
 */
export function checkRateLimit(
  event: H3Event,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 100 }
) {
  // Get client identifier (IP address)
  const clientIp =
    getRequestHeader(event, 'x-forwarded-for') ||
    getRequestHeader(event, 'x-real-ip') ||
    event.node.req.socket.remoteAddress ||
    'unknown'

  const now = Date.now()
  const entry = rateLimitStore.get(clientIp)

  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    // 1% chance to clean up
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key)
      }
    }
  }

  if (!entry || entry.resetTime < now) {
    // New window
    rateLimitStore.set(clientIp, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return true
  }

  if (entry.count < config.maxRequests) {
    // Within limit
    entry.count++
    return true
  }

  // Rate limited
  return false
}

/**
 * Require rate limit - throws error if rate limit exceeded
 *
 * @param event - H3 event
 * @param config - Rate limit configuration
 */
export function requireRateLimit(
  event: H3Event,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 100 }
) {
  if (!checkRateLimit(event, config)) {
    const retryAfter = Math.ceil(config.windowMs / 1000)
    setResponseHeader(event, 'Retry-After', retryAfter)

    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests - Please try again later',
    })
  }
}

/**
 * Example usage in an API route:
 *
 * export default defineEventHandler(async (event) => {
 *   // Rate limit: 10 requests per minute
 *   requireRateLimit(event, { windowMs: 60000, maxRequests: 10 })
 *
 *   // Your route logic here...
 * })
 */

/**
 * For production, consider using:
 * - Redis + rate-limiter-flexible package
 * - Cloudflare rate limiting
 * - API Gateway rate limiting (AWS, Azure, GCP)
 * - upstash/ratelimit for serverless environments
 */
