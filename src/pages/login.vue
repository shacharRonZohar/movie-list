<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: [],
})

const credentials = reactive({
  username: '',
  password: '',
})

const { login, isLoggingIn, loginError } = useAuth()

const handleLogin = () => {
  login(credentials)
}

const getErrorMessage = (error: unknown) => {
  if (
    error &&
    typeof error === 'object' &&
    'statusCode' in error &&
    error.statusCode === 401
  ) {
    return "Meow meow, meow meow meow meow. Meow meow? 💫"
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return (
      (error.message as string) ||
      "Meow! Meow meow meow meow. Meow meow meow meow meow meow."
    )
  }
  return "Meow! Meow meow meow meow. Meow meow meow meow meow meow."
}
</script>

<template>
  <NuxtLayout name="auth">
    <div
      class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-love-cherry/20"
    >
      <!-- Header - Warm Welcome -->
      <div class="text-center mb-6 sm:mb-8">
        <div
          class="flex items-center justify-center space-x-1.5 sm:space-x-2 mb-2 sm:mb-3"
        >
          <span class="text-3xl sm:text-4xl animate-pulse-soft">💕</span>
          <h1 class="text-3xl sm:text-4xl font-bold text-romantic-gradient">
            Meow Meow Meow
          </h1>
          <span
            class="text-3xl sm:text-4xl animate-pulse-soft"
            style="animation-delay: 0.5s"
          >💕</span
          >
        </div>
        <p class="text-sm sm:text-base text-gray-600 px-4">
          Meow meow meow meow meow meow meow ✨
        </p>
      </div>

      <!-- Login Form -->
      <form class="space-y-5 sm:space-y-6" @submit.prevent="handleLogin">
        <!-- Username -->
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Username 💫
          </label>
          <input
            id="username"
            v-model="credentials.username"
            type="text"
            required
            class="input text-sm sm:text-base"
            placeholder="Enter your name"
          />
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Password 🔑
          </label>
          <input
            id="password"
            v-model="credentials.password"
            type="password"
            required
            class="input text-sm sm:text-base"
            placeholder="Your secret key"
          />
        </div>

        <!-- Error Message -->
        <div
          v-if="loginError"
          class="bg-love-coral/10 border border-love-coral/30 text-love-deep-rose px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm"
        >
          {{ getErrorMessage(loginError) }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoggingIn"
          class="w-full btn-primary py-2.5 sm:py-3 px-4 text-sm sm:text-base"
        >
          {{ isLoggingIn ? 'Meow meow meow...' : 'Meow Meow ❤️' }}
        </button>
      </form>

      <!-- Demo Credentials -->
      <div
        class="mt-5 sm:mt-6 p-3 sm:p-4 bg-love-blush/20 rounded-lg border border-love-cherry/20"
      >
        <p class="text-xs text-gray-600 text-center mb-1.5 sm:mb-2">
          ✨ Meow meow:
        </p>
        <p class="text-xs text-gray-700 text-center leading-relaxed">
          <strong class="text-love-rose">alice</strong> / password123 or
          <strong class="text-love-rose">bob</strong> / password123
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
