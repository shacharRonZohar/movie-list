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
      class="bg-white/80 backdrop-blur-sm shadow-sm border-b border-love-cherry/30 sticky top-0 z-40"
    >
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <!-- Logo and Title - With Love -->
          <div
            class="flex items-center space-x-1.5 sm:space-x-2 min-w-0 flex-1"
          >
            <NuxtLink
              to="/"
              class="text-lg sm:text-xl md:text-2xl font-bold text-romantic-gradient flex items-center space-x-1.5 sm:space-x-2 truncate"
            >
              <span class="text-2xl sm:text-3xl flex-shrink-0">💕</span>
              <span class="truncate">Our Collection</span>
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
          <div
            class="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0"
          >
            <span
              v-if="user"
              class="text-xs sm:text-sm text-gray-600 hidden xs:inline"
            >
              <span class="hidden lg:inline">Welcome back, </span>
              <strong
                class="text-love-rose truncate max-w-[80px] sm:max-w-none inline-block align-bottom"
                >{{ user.displayName }}</strong
              >
              <span class="ml-0.5 sm:ml-1">💖</span>
            </span>
            <button
              :disabled="isLoggingOut"
              class="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-love-coral hover:bg-love-deep-rose rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md whitespace-nowrap"
              @click="handleLogout"
            >
              <span class="hidden sm:inline">{{
                isLoggingOut ? 'Until next time...' : 'Sign Out'
              }}</span>
              <span class="sm:hidden">{{
                isLoggingOut ? 'Bye...' : 'Out'
              }}</span>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div
          class="md:hidden flex items-center justify-around py-2.5 sm:py-3 border-t border-love-cherry/30"
        >
          <NuxtLink
            to="/"
            class="text-gray-700 hover:text-love-rose transition-colors text-xs sm:text-sm flex items-center space-x-1"
            active-class="text-love-rose font-semibold"
          >
            <span>✨</span>
            <span>Home</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content - Cozy Space -->
    <main class="max-w-7xl mx-auto px-0 sm:px-4 lg:px-8 py-0">
      <slot></slot>
    </main>
  </div>
</template>
