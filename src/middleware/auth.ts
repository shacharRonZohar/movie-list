export default defineNuxtRouteMiddleware(async to => {
  // Skip middleware on server
  if (import.meta.server) {
    return
  }

  // Allow access to login page
  if (to.path === '/login') {
    return
  }

  // Check if user is authenticated
  try {
    await $fetch('/api/auth/me')
  } catch {
    // User is not authenticated, redirect to login
    return navigateTo('/login')
  }
})
