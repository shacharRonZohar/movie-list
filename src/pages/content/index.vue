<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'

defineOptions({
  name: 'ContentPage',
})

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

const showAddModal = ref(false)

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
  <div class="min-h-screen bg-romantic-gradient py-6 sm:py-8 px-3 sm:px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8 sm:mb-12">
        <h1
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-romantic-gradient mb-3 sm:mb-4 px-2"
        >
          Our Movie Collection 💕
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-gray-700 px-4">
          All the movies we'll love together ✨
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-3 sm:space-y-4">
        <div
          v-for="i in 5"
          :key="i"
          class="card-hover p-4 sm:p-6 animate-pulse"
        >
          <div
            class="h-5 sm:h-6 bg-love-blush/30 rounded w-1/2 sm:w-1/3 mb-3 sm:mb-4"
          ></div>
          <div
            class="h-3 sm:h-4 bg-love-blush/20 rounded w-3/4 sm:w-2/3 mb-2"
          ></div>
          <div class="h-3 sm:h-4 bg-love-blush/20 rounded w-2/3 sm:w-1/2"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="card-hover p-6 sm:p-8 text-center">
        <div class="text-5xl sm:text-6xl mb-3 sm:mb-4">😢</div>
        <h2 class="text-xl sm:text-2xl font-semibold text-love-rose mb-2 px-4">
          Oops! Something went wrong
        </h2>
        <p class="text-sm sm:text-base text-gray-600 px-4">
          We couldn't load our collection. Let's try again together 💫
        </p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!content || content.length === 0"
        class="card-hover p-8 sm:p-12 text-center"
      >
        <div class="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6">🎬</div>
        <h2
          class="text-2xl sm:text-3xl font-bold text-romantic-gradient mb-3 sm:mb-4 px-4"
        >
          Let's Start Our Journey Together 💑
        </h2>
        <p
          class="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 px-4"
        >
          Nothing here yet. Ready to add our first movie? 💕
        </p>
        <button
          class="btn-primary text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto"
          @click="showAddModal = true"
        >
          Add Our First Movie ✨
        </button>
      </div>

      <!-- Content List -->
      <div v-else class="space-y-3 sm:space-y-4">
        <div class="flex justify-center sm:justify-end mb-4 sm:mb-6">
          <button
            class="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 w-full sm:w-auto"
            @click="showAddModal = true"
          >
            Add New Movie ✨
          </button>
        </div>
        <div
          v-for="item in content"
          :key="item.id"
          class="card-hover p-4 sm:p-6 group"
        >
          <div class="flex items-start justify-between gap-3 sm:gap-4">
            <div class="flex-1 min-w-0">
              <h3
                class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 group-hover:text-love-rose transition-colors break-words"
              >
                {{ item.title }}
              </h3>
              <div
                class="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm"
              >
                <span
                  :class="getStatusColor(item.status)"
                  class="px-2.5 sm:px-3 py-1 rounded-full font-medium inline-block w-fit"
                >
                  {{ getStatusLabel(item.status) }}
                </span>
                <span class="text-gray-500 break-words">
                  Requested by {{ item.requestedBy.displayName }}
                </span>
                <span class="text-gray-400 hidden sm:inline">•</span>
                <span class="text-gray-400">
                  Added {{ new Date(item.createdAt).toLocaleDateString() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Content Modal -->
    <AddContentModal :open="showAddModal" @close="showAddModal = false" />
  </div>
</template>
