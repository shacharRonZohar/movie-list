<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

// Example query - replace with your actual data fetching
const { data, isLoading, error } = useQuery({
  queryKey: ["example"],
  queryFn: async () => {
    // Replace with your API call
    return { message: "TanStack Query is working!" };
  },
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Movie List</h1>
        <p class="text-xl text-gray-600 mb-8">
          Nuxt 3 + TypeScript + TanStack Query + Tailwind CSS
        </p>

        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Getting Started
          </h2>

          <p v-if="isLoading" class="text-gray-600">Loading...</p>

          <p v-if="error" class="text-red-600">
            Error: {{ error.message }}
          </p>

          <div v-if="data" class="space-y-4">
            <p class="text-green-600 font-medium">✓ {{ data.message }}</p>
            <div class="space-y-2 text-gray-700">
              <p>✓ Nuxt 3 with TypeScript</p>
              <p>✓ File-based routing</p>
              <p>✓ TanStack Query (Vue Query)</p>
              <p>✓ Tailwind CSS</p>
              <p>✓ Prettier</p>
              <p>✓ ESLint</p>
            </div>
          </div>

          <div class="mt-6 p-4 bg-blue-50 rounded-md">
            <p class="text-sm text-gray-700">
              Start building your movie list app! Create new pages in the
              <code class="bg-gray-100 px-1 py-0.5 rounded">pages/</code>
              directory for automatic routing.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

