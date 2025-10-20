<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'default',
})

const { user, isLoading } = useAuth()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh]">
    <LoadingSpinner v-if="isLoading" class="mb-4" />
    <template v-else>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Welcome{{ user ? `, ${user.displayName}` : '' }}!
      </h1>
      <p class="text-gray-600 text-lg mb-8">Your application starts here</p>
      <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl w-full">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Getting Started
        </h2>
        <p class="text-gray-600 mb-4">
          This is a modern Nuxt.js application with authentication, built
          following best practices.
        </p>
        <ul class="list-disc list-inside text-gray-700 space-y-2">
          <li>Server-side authentication with JWT tokens</li>
          <li>Protected API routes</li>
          <li>TanStack Query for data fetching</li>
          <li>Tailwind CSS for styling</li>
          <li>TypeScript for type safety</li>
        </ul>
      </div>
    </template>
  </div>
</template>
