<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

defineOptions({
  name: 'ContentPage',
})

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

const {
  data: content,
  isLoading,
  error,
} = useQuery({
  queryKey: ['content'],
  queryFn: async () => {
    const response = await $fetch('/api/content')
    return response
  },
})

const getStatusLabel = (status: string) => {
  const labels = {
    WANT_TO_WATCH: 'Plan to Watch 🎬',
    WATCHING: 'Currently Watching 📺',
    WATCHED: 'Completed ✓',
    ON_HOLD: 'On Hold ⏸️',
    DROPPED: 'Dropped 💫',
  } as const

  return labels[status as keyof typeof labels] || status
}

const getStatusColor = (status: string) => {
  const colors = {
    WANT_TO_WATCH: 'status-dreaming',
    WATCHING: 'status-watching-together',
    WATCHED: 'status-cherished',
    ON_HOLD: 'status-paused',
    DROPPED: 'status-not-for-us',
  } as const

  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}
</script>

<template>
  <div class="min-h-screen bg-romantic-gradient py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold text-romantic-gradient mb-4">
          Our Movie Collection 💕
        </h1>
        <p class="text-xl text-gray-700">
          All the movies we'll love together ✨
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 5" :key="i" class="card-hover p-6 animate-pulse">
          <div class="h-6 bg-love-blush/30 rounded w-1/3 mb-4"></div>
          <div class="h-4 bg-love-blush/20 rounded w-2/3 mb-2"></div>
          <div class="h-4 bg-love-blush/20 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="card-hover p-8 text-center">
        <div class="text-6xl mb-4">😢</div>
        <h2 class="text-2xl font-semibold text-love-rose mb-2">
          Oops! Something went wrong
        </h2>
        <p class="text-gray-600">
          We couldn't load our collection. Let's try again together 💫
        </p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!content || content.length === 0"
        class="card-hover p-12 text-center"
      >
        <div class="text-8xl mb-6">🎬</div>
        <h2 class="text-3xl font-bold text-romantic-gradient mb-4">
          Let's Start Our Journey Together 💑
        </h2>
        <p class="text-xl text-gray-600 mb-6">
          Nothing here yet. Ready to add our first movie? 💕
        </p>
        <button class="btn-primary text-lg px-8 py-3">
          Add Our First Movie ✨
        </button>
      </div>

      <!-- Content List -->
      <div v-else class="space-y-4">
        <div
          v-for="item in content"
          :key="item.id"
          class="card-hover p-6 group"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <h3
                class="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-love-rose transition-colors"
              >
                {{ item.title }}
              </h3>
              <div class="flex flex-wrap items-center gap-3 text-sm">
                <span
                  :class="getStatusColor(item.status)"
                  class="px-3 py-1 rounded-full font-medium"
                >
                  {{ getStatusLabel(item.status) }}
                </span>
                <span class="text-gray-500">
                  Requested by {{ item.requestedBy.displayName }}
                </span>
                <span class="text-gray-400">
                  • Added {{ new Date(item.createdAt).toLocaleDateString() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
