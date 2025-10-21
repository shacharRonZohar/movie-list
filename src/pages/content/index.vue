<script setup lang="ts">
import { ref } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from '~/composables/useToast'

defineOptions({
  name: 'ContentPage',
})

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

const showAddModal = ref(false)
const toast = useToast()
const queryClient = useQueryClient()

const {
  data: listItems,
  isLoading,
  error,
} = useQuery({
  queryKey: ['list'],
  queryFn: async () => {
    const response = await $fetch('/api/list')
    return response
  },
})

const statusOptions = [
  { value: 'WANT_TO_WATCH', label: 'Plan to Watch 🎬' },
  { value: 'WATCHING', label: 'Currently Watching 📺' },
  { value: 'WATCHED', label: 'Completed ✓' },
  { value: 'ON_HOLD', label: 'On Hold ⏸️' },
  { value: 'DROPPED', label: 'Dropped 💫' },
] as const

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

const updateStatusMutation = useMutation({
  mutationFn: async (data: { id: string; status: string }) => {
    const result = await $fetch(`/api/list/${data.id}`, {
      method: 'PATCH',
      body: { status: data.status },
    })
    return result
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['list'] })
    toast.success('Status updated! ✨')
  },
  onError: error => {
    toast.error(
      `Failed to update status: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  },
})

const handleStatusChange = (itemId: string, newStatus: string) => {
  updateStatusMutation.mutate({ id: itemId, status: newStatus })
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
          Woof Woof Woof 💕
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-gray-700 px-4">
          Woof woof woof woof woof woof woof ✨
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-3 sm:space-y-4">
        <div
          v-for="i in 5"
          :key="i"
          class="card-hover p-4 sm:p-6 animate-pulse"
        >
          <div class="flex gap-4 sm:gap-6">
            <!-- Skeleton Poster -->
            <div
              class="flex-shrink-0 w-20 h-28 sm:w-32 sm:h-48 bg-love-blush/30 rounded-lg"
            ></div>
            <!-- Skeleton Content -->
            <div class="flex-1 min-w-0 space-y-3">
              <div
                class="h-5 sm:h-6 bg-love-blush/30 rounded w-1/2 sm:w-1/3"
              ></div>
              <div
                class="h-3 sm:h-4 bg-love-blush/20 rounded w-3/4 sm:w-2/3"
              ></div>
              <div
                class="h-3 sm:h-4 bg-love-blush/20 rounded w-2/3 sm:w-1/2"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="card-hover p-6 sm:p-8 text-center">
        <div class="text-5xl sm:text-6xl mb-3 sm:mb-4">😢</div>
        <h2 class="text-xl sm:text-2xl font-semibold text-love-rose mb-2 px-4">
          Woof woof! Woof woof woof woof
        </h2>
        <p class="text-sm sm:text-base text-gray-600 px-4">
          Woof woof woof woof woof woof. Woof woof woof woof woof 💫
        </p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!listItems || listItems.length === 0"
        class="card-hover p-8 sm:p-12 text-center"
      >
        <div class="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6">🐶</div>
        <h2
          class="text-2xl sm:text-3xl font-bold text-romantic-gradient mb-3 sm:mb-4 px-4"
        >
          Woof Woof Woof Woof Woof Woof 💑
        </h2>
        <p
          class="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 px-4"
        >
          Woof woof woof. Woof woof woof woof woof woof woof? 💕
        </p>
        <button
          class="btn-primary text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto"
          @click="showAddModal = true"
        >
          Woof Woof Woof Woof ✨
        </button>
      </div>

      <!-- Content List -->
      <div v-else class="space-y-3 sm:space-y-4">
        <div class="flex justify-center sm:justify-end mb-4 sm:mb-6">
          <button
            class="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 w-full sm:w-auto"
            @click="showAddModal = true"
          >
            Woof Woof Woof ✨
          </button>
        </div>
        <div
          v-for="item in listItems"
          :key="item.id"
          class="card-hover p-4 sm:p-6 group"
        >
          <div class="flex gap-4 sm:gap-6">
            <!-- Poster Image -->
            <div class="flex-shrink-0 w-20 h-28 sm:w-32 sm:h-48">
              <img
                v-if="item.content.posterPath"
                :src="`https://image.tmdb.org/t/p/w342${item.content.posterPath}`"
                :alt="item.content.title"
                class="w-full h-full object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-love-blush to-love-lavender rounded-lg flex items-center justify-center shadow-lg"
              >
                <span class="text-3xl sm:text-5xl">
                  {{ item.content.type === 'SERIES' ? '📺' : '🎬' }}
                </span>
              </div>
            </div>

            <!-- Content Info -->
            <div class="flex-1 min-w-0 flex flex-col gap-3">
              <div>
                <h3
                  class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-love-rose transition-colors break-words"
                >
                  {{ item.content.title }}
                  <span
                    v-if="item.content.type === 'SERIES'"
                    class="text-love-lavender text-base sm:text-xl"
                  >
                    📺
                  </span>
                  <span v-else class="text-love-coral text-base sm:text-xl">
                    🎬
                  </span>
                </h3>
                <div
                  class="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm text-gray-500"
                >
                  <span v-if="item.content.year">{{ item.content.year }}</span>
                  <span
                    v-if="item.content.year && item.content.genres.length > 0"
                    >•</span
                  >
                  <span v-if="item.content.genres.length > 0">
                    {{ item.content.genres.slice(0, 2).join(', ') }}
                  </span>
                </div>
              </div>

              <!-- Status Selector -->
              <div class="flex items-center gap-2">
                <label
                  :for="`status-${item.id}`"
                  class="text-xs sm:text-sm text-gray-600"
                >
                  Status:
                </label>
                <select
                  :id="`status-${item.id}`"
                  :value="item.status"
                  class="text-xs sm:text-sm px-2 py-1 rounded-lg border-2 transition-all cursor-pointer"
                  :class="[
                    getStatusColor(item.status),
                    'border-transparent hover:border-love-rose/30 focus:border-love-rose focus:outline-none',
                  ]"
                  :disabled="updateStatusMutation.isPending.value"
                  @change="
                    handleStatusChange(
                      item.id,
                      ($event.target as HTMLSelectElement).value
                    )
                  "
                >
                  <option
                    v-for="option in statusOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <!-- Requested By -->
              <div class="text-xs text-gray-400">
                Requested by {{ item.requestedBy.displayName }}
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
