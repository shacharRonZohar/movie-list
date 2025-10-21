import type { EventHandler, EventHandlerRequest } from 'h3'
import { requireAuth, getUserFromToken } from './auth'
import type { JWTUser } from './validation'

/**
 * Define a protected event handler that requires authentication
 * The handler will receive the authenticated user as part of the event context
 */
export function defineProtectedEventHandler<T extends EventHandlerRequest>(
  handler: EventHandler<T>
) {
  return defineEventHandler<T>(async event => {
    console.log('[PROTECTED] Checking auth for:', event.node.req.url)

    // Require authentication - throws 401 if not authenticated
    const user = requireAuth(event)

    console.log('[PROTECTED] Auth successful, calling handler')

    // Attach user to event context for easy access in handler
    event.context.user = user

    // Call the actual handler
    return handler(event)
  })
}

/**
 * Define an optionally protected event handler
 * The handler will receive the user if authenticated, null otherwise
 */
export function defineOptionalAuthEventHandler<T extends EventHandlerRequest>(
  handler: EventHandler<T>
) {
  return defineEventHandler<T>(async event => {
    // Get user but don't throw if not authenticated
    const user = getUserFromToken(event)

    // Attach user to event context (convert null to undefined)
    event.context.user = user ?? undefined

    // Call the actual handler
    return handler(event)
  })
}

// Extend H3 event context type to include user
declare module 'h3' {
  interface H3EventContext {
    user?: JWTUser
  }
}
