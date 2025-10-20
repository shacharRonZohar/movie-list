# Server Authentication Patterns

This guide shows how to use authentication in your Nuxt server API routes.

## Available Handlers

### 1. `defineProtectedEventHandler` - Requires Authentication

Use this for routes that **require** the user to be authenticated.  
Automatically returns `401 Unauthorized` if no valid token is present.

```typescript
import { defineProtectedEventHandler } from '../../utils/defineProtectedEventHandler'

export default defineProtectedEventHandler(async event => {
  // User is guaranteed to be authenticated here
  const { user } = event.context // { userId: string, username: string }

  return {
    message: `Hello ${user.username}!`,
  }
})
```

**Use cases:**

- User profile endpoints
- Creating/updating/deleting resources
- Any operation that needs to know who the user is

---

### 2. `defineOptionalAuthEventHandler` - Optional Authentication

Use this for routes where authentication is **optional**.  
User will be `null` if not authenticated, but the handler still runs.

```typescript
import { defineOptionalAuthEventHandler } from '../../utils/defineProtectedEventHandler'

export default defineOptionalAuthEventHandler(async event => {
  const { user } = event.context // { userId: string, username: string } | undefined

  if (user) {
    return { message: `Welcome back, ${user.username}!` }
  }

  return { message: 'Hello, guest!' }
})
```

**Use cases:**

- Public content that changes based on auth status
- Analytics endpoints
- Search endpoints (different results for logged-in users)

---

### 3. `defineEventHandler` - No Authentication

Use the standard handler for **public** routes that don't need auth.

```typescript
export default defineEventHandler(async event => {
  // No authentication check
  return { status: 'ok' }
})
```

**Use cases:**

- Health checks
- Login/registration endpoints
- Public API endpoints

---

## Manual Authentication (Advanced)

If you need custom auth logic, use the utility functions directly:

```typescript
import { requireAuth, getUserFromToken } from '../../utils/auth'

export default defineEventHandler(async event => {
  // Option 1: Require auth (throws 401 if not authenticated)
  const user = requireAuth(event)

  // Option 2: Get user without throwing (returns null if not authenticated)
  const user = getUserFromToken(event)

  // Custom logic...
})
```

---

## Role-Based Access Control (Future)

When you need role-based access:

```typescript
// server/utils/defineProtectedEventHandler.ts
export function defineAdminEventHandler<T extends EventHandlerRequest>(
  handler: EventHandler<T>
): EventHandler<T> {
  return defineEventHandler<T>(async event => {
    const user = requireAuth(event)

    // Check if user has admin role
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { role: true },
    })

    if (dbUser?.role !== 'ADMIN') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden - Admin access required',
      })
    }

    event.context.user = user
    return handler(event)
  })
}
```

---

## Examples

### Protected User List

```typescript
// server/api/users/index.get.ts
import { defineProtectedEventHandler } from '../../utils/defineProtectedEventHandler'

export default defineProtectedEventHandler(async event => {
  const { user } = event.context
  console.log('Fetched by:', user.username)

  const users = await prisma.user.findMany()
  return { users }
})
```

### Public Health Check

```typescript
// server/api/health.get.ts
export default defineEventHandler(async () => {
  return { status: 'ok', timestamp: Date.now() }
})
```

### Optional Auth Content

```typescript
// server/api/movies/index.get.ts
import { defineOptionalAuthEventHandler } from '../../utils/defineProtectedEventHandler'

export default defineOptionalAuthEventHandler(async event => {
  const { user } = event.context

  // Public movies
  const movies = await prisma.movie.findMany({
    where: {
      // Show user's private movies if authenticated
      OR: [{ isPublic: true }, ...(user ? [{ userId: user.userId }] : [])],
    },
  })

  return { movies }
})
```

---

## Best Practices

1. ✅ **Be explicit** - Choose the right handler for your needs
2. ✅ **Use TypeScript** - The `event.context.user` is properly typed
3. ✅ **Don't mix patterns** - Stick to one auth approach per route
4. ✅ **Log auth events** - Track who's doing what for security
5. ❌ **Never use global server middleware** - It's an anti-pattern in Nuxt

---

## Security Notes

- Tokens are stored in HTTP-only cookies (XSS protection)
- Tokens are validated on every request
- Expired tokens return 401
- Invalid tokens return 401
- HTTPS enforced in production for secure cookie transmission
