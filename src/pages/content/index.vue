<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from '~/composables/useToast'
import { useConfirm } from '~/composables/useConfirm'
import { VueDraggable } from 'vue-draggable-plus'

interface ContentData {
  id: string
  title: string
  originalTitle: string | null
  type: string
  overview: string | null
  tagline: string | null
  genres: string[]
  year: number
  runtime: number | null
  posterPath: string | null
  backdropPath: string | null
  releaseDate: string | null
  imdbId: string | null
}

interface UserData {
  id: string
  username: string
  displayName: string
}

interface ListItemData {
  id: string
  status: string
  rating: number | null
  addedAt: Date
  position: number
  content: ContentData
  addedBy: UserData
  requestedBy: UserData
}

defineOptions({
  name: 'ContentPage',
})

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

const showAddModal = ref(false)
const showDetailsModal = ref(false)
const selectedListItem = ref<ListItemData | null>(null)
const toast = useToast()
const { confirm } = useConfirm()
const queryClient = useQueryClient()
const isDragging = ref(false)
const draggedItemId = ref<string | null>(null)
const draggedFromIndex = ref<number | null>(null)

const {
  data: queryListItems,
  isLoading,
  error,
} = useQuery({
  queryKey: ['list'],
  queryFn: async () => {
    const response = await $fetch('/api/list')
    return response
  },
})

// Create a writable computed for draggable v-model
const listItems = computed({
  get: () => queryListItems.value || [],
  set: value => {
    queryClient.setQueryData(['list'], value)
  },
})

const statusOptions = [
  { value: 'WANT_TO_WATCH', label: 'Plan to Watch 🎬' },
  { value: 'WATCHING', label: 'Currently Watching 📺' },
  { value: 'WATCHED', label: 'Completed ✓' },
  { value: 'ON_HOLD', label: 'On Hold ⏸️' },
  { value: 'DROPPED', label: 'Dropped 💫' },
] as const

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

const updatePositionMutation = useMutation({
  mutationFn: async (data: { id: string; position: number }) => {
    const result = await $fetch(`/api/list/${data.id}`, {
      method: 'PATCH',
      body: { position: data.position },
    })
    return result
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['list'] })
  },
  onError: error => {
    toast.error(
      `Failed to update position: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
    queryClient.invalidateQueries({ queryKey: ['list'] })
  },
})

const openDetailsModal = (item: ListItemData) => {
  selectedListItem.value = item
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedListItem.value = null
}

const deleteMutation = useMutation({
  mutationFn: async (id: string) => {
    await $fetch(`/api/list/${id}`, {
      method: 'DELETE',
    })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['list'] })
    toast.success('Removed with love 💫')
  },
  onError: error => {
    toast.error(
      `Oops! ${error instanceof Error ? error.message : "Couldn't remove it 💔"}`
    )
  },
})

const handleDelete = async (item: ListItemData, event: Event) => {
  event.stopPropagation() // Prevent opening the details modal

  const confirmed = await confirm({
    title: 'Remove from our collection?',
    message: `Are you sure you want to remove "${item.content.title}" from our list? This cannot be undone.`,
    confirmText: 'Yes, remove it',
    cancelText: 'Keep it',
    variant: 'danger',
  })

  if (confirmed) {
    deleteMutation.mutate(item.id)
  }
}

const handleDragStart = (evt: { oldIndex?: number }) => {
  isDragging.value = true
  if (evt.oldIndex !== undefined) {
    draggedFromIndex.value = evt.oldIndex
    if (listItems.value && listItems.value[evt.oldIndex]) {
      draggedItemId.value = listItems.value[evt.oldIndex].id
    }
  }
}

const handleDragEnd = (evt: { newIndex?: number; oldIndex?: number }) => {
  isDragging.value = false

  // Check if indices are defined
  if (evt.newIndex === undefined || evt.oldIndex === undefined) {
    draggedItemId.value = null
    draggedFromIndex.value = null
    return
  }

  // Only update if position actually changed
  if (evt.newIndex === evt.oldIndex) {
    draggedItemId.value = null
    draggedFromIndex.value = null
    return
  }

  // Calculate fractional position between neighbors
  if (draggedItemId.value && listItems.value) {
    const items = listItems.value
    const newIndex = evt.newIndex

    let newPosition: number

    // Dropped at the beginning
    if (newIndex === 0) {
      const nextItem = items[1]
      newPosition = nextItem ? nextItem.position / 2 : 1.0
    }
    // Dropped at the end
    else if (newIndex === items.length - 1) {
      const prevItem = items[newIndex - 1]
      newPosition = prevItem ? prevItem.position + 1.0 : items.length
    }
    // Dropped in the middle - calculate average between neighbors
    else {
      const prevItem = items[newIndex - 1]
      const nextItem = items[newIndex + 1]
      newPosition = (prevItem.position + nextItem.position) / 2
    }

    updatePositionMutation.mutate({
      id: draggedItemId.value,
      position: newPosition,
    })
  }

  draggedItemId.value = null
  draggedFromIndex.value = null
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
        <VueDraggable
          v-model="listItems"
          :animation="300"
          class="space-y-3 sm:space-y-4"
          ghost-class="drag-ghost"
          chosen-class="drag-chosen"
          easing="cubic-bezier(0.4, 0, 0.2, 1)"
          @start="handleDragStart"
          @end="handleDragEnd"
        >
          <div
            v-for="item in listItems"
            :key="item.id"
            class="card-hover p-4 sm:p-6 group transition-all cursor-grab active:cursor-grabbing"
            @click="openDetailsModal(item)"
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
                    <span v-if="item.content.year">{{
                      item.content.year
                    }}</span>
                    <span
                      v-if="item.content.year && item.content.genres.length > 0"
                    >
                      •
                    </span>
                    <span v-if="item.content.genres.length > 0">
                      {{ item.content.genres.slice(0, 2).join(', ') }}
                    </span>
                  </div>
                </div>

                <!-- Status Selector and Actions -->
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
                    @click.stop
                  >
                    <option
                      v-for="option in statusOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                  <button
                    class="ml-auto text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                    title="Remove from list"
                    :disabled="deleteMutation.isPending.value"
                    @click="handleDelete(item, $event)"
                  >
                    <span class="text-xl">🗑️</span>
                  </button>
                </div>

                <!-- Requested By -->
                <div class="text-xs text-gray-400">
                  Requested by {{ item.requestedBy.displayName }}
                </div>
              </div>
            </div>
          </div>
        </VueDraggable>
      </div>
    </div>

    <!-- Add Content Modal -->
    <AddContentModal :open="showAddModal" @close="showAddModal = false" />

    <!-- Content Details Modal -->
    <ContentDetailsModal
      :open="showDetailsModal"
      :list-item="selectedListItem"
      @close="closeDetailsModal"
    />
  </div>
</template>

<style scoped>
/* Drag and Drop Styles */

/* The placeholder/empty space where item will land */
.drag-ghost {
  opacity: 0.3 !important;
  background: linear-gradient(
    to right,
    rgba(255, 182, 193, 0.3),
    rgba(230, 190, 255, 0.3)
  ) !important;
  border: 2px dashed #f0abab !important;
  border-radius: 1rem !important;
}

/* Item when selected/chosen (before dragging starts) */
.drag-chosen {
  @apply ring-2 ring-love-rose ring-opacity-50 scale-[1.01] shadow-lg;
}
</style>
