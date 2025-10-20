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
    return "Hmm, that doesn't seem right. Try again? 💫"
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return (
      (error.message as string) ||
      "Oops! Something went wrong. Let's try that again together."
    )
  }
  return "Oops! Something went wrong. Let's try that again together."
}
</script>

<template>
  <NuxtLayout name="auth">
    <div
      class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-love-cherry/20"
    >
      <!-- Header - Warm Welcome -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center space-x-2 mb-3">
          <span class="text-4xl animate-pulse-soft">💕</span>
          <h1 class="text-4xl font-bold text-romantic-gradient">
            Our Collection
          </h1>
          <span
            class="text-4xl animate-pulse-soft"
            style="animation-delay: 0.5s"
            >💕</span
          >
        </div>
        <p class="text-gray-600">Welcome to our special movie moments ✨</p>
      </div>

      <!-- Login Form -->
      <form class="space-y-6" @submit.prevent="handleLogin">
        <!-- Username -->
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Username 💫
          </label>
          <input
            id="username"
            v-model="credentials.username"
            type="text"
            required
            class="input"
            placeholder="Enter your name"
          />
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Password 🔑
          </label>
          <input
            id="password"
            v-model="credentials.password"
            type="password"
            required
            class="input"
            placeholder="Your secret key"
          />
        </div>

        <!-- Error Message -->
        <div
          v-if="loginError"
          class="bg-love-coral/10 border border-love-coral/30 text-love-deep-rose px-4 py-3 rounded-lg text-sm"
        >
          {{ getErrorMessage(loginError) }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoggingIn"
          class="w-full btn-primary py-3 px-4 text-base"
        >
          {{ isLoggingIn ? 'Opening our collection...' : 'Enter ❤️' }}
        </button>
      </form>

      <!-- Demo Credentials -->
      <div
        class="mt-6 p-4 bg-love-blush/20 rounded-lg border border-love-cherry/20"
      >
        <p class="text-xs text-gray-600 text-center mb-2">✨ Test Access:</p>
        <p class="text-xs text-gray-700 text-center">
          <strong class="text-love-rose">alice</strong> / password123 or
          <strong class="text-love-rose">bob</strong> / password123
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
