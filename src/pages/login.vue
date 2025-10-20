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
    return 'Invalid username or password'
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return (
      (error.message as string) ||
      'An error occurred during login. Please try again.'
    )
  }
  return 'An error occurred during login. Please try again.'
}
</script>

<template>
  <NuxtLayout name="auth">
    <div class="bg-white rounded-lg shadow-2xl p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">🎬 MovieList</h1>
        <p class="text-gray-600">Sign in to manage your watch list</p>
      </div>

      <!-- Login Form -->
      <form class="space-y-6" @submit.prevent="handleLogin">
        <!-- Username -->
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            id="username"
            v-model="credentials.username"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            placeholder="Enter your username"
          />
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            v-model="credentials.password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            placeholder="Enter your password"
          />
        </div>

        <!-- Error Message -->
        <div
          v-if="loginError"
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
        >
          {{ getErrorMessage(loginError) }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoggingIn"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoggingIn ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <!-- Demo Credentials -->
      <div class="mt-6 p-4 bg-gray-50 rounded-md">
        <p class="text-xs text-gray-600 text-center mb-2">Demo Credentials:</p>
        <p class="text-xs text-gray-700 text-center">
          <strong>alice</strong> / password123 or <strong>bob</strong> /
          password123
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
