<script setup lang="ts">
const { user, logout, isLoggingOut } = useAuth()
const { confirm } = useConfirm()

const handleLogout = async () => {
  const confirmed = await confirm({
    title: 'See You Soon! 💕',
    message: "Taking a break? We'll be here when you return.",
    confirmText: 'Sign Out',
    cancelText: 'Stay',
    variant: 'warning',
  })

  if (confirmed) {
    logout()
  }
}
</script>

<template>
  <div class="min-h-screen bg-romantic-gradient">
    <!-- Navigation Header - Warm & Loving -->
    <nav
      class="bg-white/80 backdrop-blur-sm shadow-sm border-b border-love-cherry/30"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Title - With Love -->
          <div class="flex items-center space-x-2">
            <NuxtLink
              to="/"
              class="text-2xl font-bold text-romantic-gradient flex items-center space-x-2"
            >
              <span class="text-3xl">💕</span>
              <span>Our Collection</span>
            </NuxtLink>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-love-rose transition-all duration-200 flex items-center space-x-1"
              active-class="text-love-rose font-semibold"
            >
              <span>✨</span>
              <span>Home</span>
            </NuxtLink>
          </div>

          <!-- User Info and Logout - Tender Touch -->
          <div class="flex items-center space-x-4">
            <span v-if="user" class="text-sm text-gray-600">
              <span class="hidden sm:inline">Welcome back, </span>
              <strong class="text-love-rose">{{ user.displayName }}</strong>
              <span class="ml-1">💖</span>
            </span>
            <button
              :disabled="isLoggingOut"
              class="px-4 py-2 text-sm font-medium text-white bg-love-coral hover:bg-love-deep-rose rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              @click="handleLogout"
            >
              {{ isLoggingOut ? 'Until next time...' : 'Sign Out' }}
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div
          class="md:hidden flex items-center justify-around py-3 border-t border-love-cherry/30"
        >
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-love-rose transition-colors text-sm flex items-center space-x-1"
            active-class="text-love-rose font-semibold"
          >
            <span>✨</span>
            <span>Home</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content - Cozy Space -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot></slot>
    </main>
  </div>
</template>
