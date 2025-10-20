<script setup lang="ts">
const { user, logout, isLoggingOut } = useAuth()
const { confirm } = useConfirm()

const handleLogout = async () => {
  const confirmed = await confirm({
    title: 'Confirm Logout',
    message: 'Are you sure you want to logout?',
    confirmText: 'Logout',
    cancelText: 'Cancel',
    variant: 'warning',
  })

  if (confirmed) {
    logout()
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Title -->
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-indigo-600">
              App
            </NuxtLink>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-indigo-600 transition-colors"
              active-class="text-indigo-600 font-semibold"
            >
              Home
            </NuxtLink>
          </div>

          <!-- User Info and Logout -->
          <div class="flex items-center space-x-4">
            <span v-if="user" class="text-sm text-gray-600">
              Welcome, <strong>{{ user.displayName }}</strong>
            </span>
            <button
              :disabled="isLoggingOut"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              @click="handleLogout"
            >
              {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div
          class="md:hidden flex items-center justify-around py-3 border-t border-gray-200"
        >
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-indigo-600 transition-colors text-sm"
            active-class="text-indigo-600 font-semibold"
          >
            Home
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot></slot>
    </main>
  </div>
</template>
