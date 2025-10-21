<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useToast } from '~/composables/useToast'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const toast = useToast()
const queryClient = useQueryClient()

const searchQuery = ref('')
const selectedContentId = ref<string | null>(null)
const status = ref('WANT_TO_WATCH')
const requestedById = ref('')
const position = ref<number | undefined>(undefined)
const isSearching = ref(false)
const searchResults = ref<any[]>([])
const searchInputRef = ref<HTMLInputElement | null>(null)

// Fetch users
const { data: usersData, isLoading: isLoadingUsers } = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const response = await $fetch('/api/users')
    return response
  },
})

// Fetch list count for position options
const { data: listData } = useQuery({
  queryKey: ['list'],
  queryFn: async () => {
    const response = await $fetch('/api/list')
    return response
  },
})

// Set default requestedBy when users are loaded
watch(
  () => usersData.value,
  users => {
    if (users?.users && users.users.length > 0 && !requestedById.value) {
      requestedById.value = users.users[0].id
    }
  },
  { immediate: true }
)

// Debounced search
let searchTimeout: ReturnType<typeof setTimeout> | null = null

const performSearch = async () => {
  if (!searchQuery.value.trim() || searchQuery.value.length < 2) {
    searchResults.value = []
    return
  }

  isSearching.value = true
  try {
    const results = await $fetch('/api/content/search', {
      params: { q: searchQuery.value },
    })
    searchResults.value = results
    if (results.length === 0) {
      toast.error('No movies found. Try a different search! 🔍')
    }

    // Maintain focus on search input after results load
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  } catch (error) {
    toast.error('Failed to search for movies 💫')
    console.error(error)
  } finally {
    isSearching.value = false
  }
}

const searchMovies = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (!searchQuery.value.trim() || searchQuery.value.length < 2) {
    searchResults.value = []
    return
  }

  searchTimeout = setTimeout(() => {
    performSearch()
  }, 500) // 500ms debounce
}

// Watch search query for auto-search
watch(searchQuery, () => {
  searchMovies()
})

const statusOptions = [
  { value: 'WANT_TO_WATCH', label: 'Plan to Watch 🎬' },
  { value: 'WATCHING', label: 'Currently Watching 📺' },
  { value: 'WATCHED', label: 'Completed ✓' },
  { value: 'ON_HOLD', label: 'On Hold ⏸️' },
  { value: 'DROPPED', label: 'Dropped 💫' },
] as const

const addToListMutation = useMutation({
  mutationFn: async (data: {
    contentId: string
    status: string
    requestedById: string
    position?: number
  }) => {
    const result = await $fetch('/api/list', {
      method: 'POST',
      body: data,
    })
    return result
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['list'] })
    toast.success('Woof woof woof woof! ❤️')
    closeModal()
  },
  onError: error => {
    toast.error(
      `Woof! ${error instanceof Error ? error.message : 'Woof woof woof woof'}`
    )
  },
})

const closeModal = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchQuery.value = ''
  selectedContentId.value = null
  searchResults.value = []
  status.value = 'WANT_TO_WATCH'
  position.value = undefined
  if (usersData.value?.users && usersData.value.users.length > 0) {
    requestedById.value = usersData.value.users[0].id
  }
  emit('close')
}

const selectMovie = (contentId: string) => {
  selectedContentId.value = contentId
}

const selectedMovie = computed(() => {
  if (!selectedContentId.value) return null
  return searchResults.value.find(m => m.id === selectedContentId.value)
})

const handleSubmit = () => {
  if (!selectedContentId.value) {
    toast.error('Please select a movie 💫')
    return
  }

  if (!requestedById.value) {
    toast.error('Woof woof woof woof woof woof 💫')
    return
  }

  addToListMutation.mutate({
    contentId: selectedContentId.value,
    status: status.value,
    requestedById: requestedById.value,
    position: position.value,
  })
}

// Handle ESC key to close modal
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
        @click="closeModal"
      >
        <div
          class="relative w-full max-w-2xl bg-romantic-cream rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-love-rose/20 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <!-- Close Button -->
          <button
            type="button"
            class="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-love-blush/50 hover:bg-love-rose/20 transition-all duration-300 hover:rotate-90 group z-10"
            aria-label="Close"
            @click="closeModal"
          >
            <span
              class="text-xl sm:text-2xl text-love-rose group-hover:text-love-twilight transition-colors"
            >
              ×
            </span>
          </button>

          <!-- Header -->
          <div class="text-center mb-6 sm:mb-8 pr-8">
            <h2
              class="text-2xl sm:text-3xl md:text-4xl font-bold text-romantic-gradient mb-2 sm:mb-3"
            >
              Woof Woof Woof Woof 💕
            </h2>
            <p class="text-base sm:text-lg text-gray-600">
              Woof woof woof woof woof woof woof woof woof ✨
            </p>
          </div>

          <!-- Form -->
          <form class="space-y-4 sm:space-y-6" @submit.prevent="handleSubmit">
            <!-- Search Input -->
            <div>
              <label
                for="search"
                class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Search for a Movie 🎬
              </label>
              <div class="flex gap-2">
                <input
                  id="search"
                  ref="searchInputRef"
                  v-model="searchQuery"
                  type="text"
                  placeholder="Start typing to search..."
                  class="input flex-1 text-sm sm:text-base"
                  autofocus
                />
                <div
                  v-if="isSearching"
                  class="flex items-center px-4 text-love-rose text-sm"
                >
                  🔍 Searching...
                </div>
              </div>
            </div>

            <!-- Search Results -->
            <div
              v-if="searchResults.length > 0"
              class="space-y-2 max-h-64 overflow-y-auto"
            >
              <p class="text-sm font-medium text-gray-700 mb-2">
                Select a movie:
              </p>
              <div
                v-for="movie in searchResults"
                :key="movie.id"
                class="p-3 border-2 rounded-xl cursor-pointer transition-all"
                :class="
                  selectedContentId === movie.id
                    ? 'border-love-rose bg-love-blush/20'
                    : 'border-gray-200 hover:border-love-blush'
                "
                @click="selectMovie(movie.id)"
              >
                <h4 class="font-semibold text-gray-800 text-sm">
                  {{ movie.title }}
                  <span v-if="movie.year" class="text-gray-500"
                    >({{ movie.year }})</span
                  >
                </h4>
                <p
                  v-if="movie.overview"
                  class="text-xs text-gray-600 mt-1 line-clamp-2"
                >
                  {{ movie.overview }}
                </p>
                <div
                  v-if="movie.genres && movie.genres.length > 0"
                  class="text-xs text-gray-500 mt-1"
                >
                  {{ movie.genres.slice(0, 3).join(', ') }}
                </div>
              </div>
            </div>

            <!-- Requested By Select -->
            <div>
              <label
                for="requestedBy"
                class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Requested By 💝
              </label>
              <select
                id="requestedBy"
                v-model="requestedById"
                class="input w-full text-sm sm:text-base"
                :disabled="addToListMutation.isPending.value || isLoadingUsers"
              >
                <option
                  v-for="user in usersData?.users"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.displayName }}
                </option>
              </select>
            </div>

            <!-- Position Input -->
            <div>
              <label
                for="position"
                class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Position in List 📍
              </label>
              <select
                id="position"
                v-model.number="position"
                class="input w-full text-sm sm:text-base"
                :disabled="addToListMutation.isPending.value"
              >
                <option :value="undefined">At the end (default)</option>
                <option
                  v-for="i in (listData?.length || 0) + 1"
                  :key="i"
                  :value="i"
                >
                  Position {{ i }}{{ i === 1 ? ' (top)' : '' }}
                </option>
              </select>
            </div>

            <!-- Status Select -->
            <div>
              <label
                for="status"
                class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Status 📋
              </label>
              <select
                id="status"
                v-model="status"
                class="input w-full text-sm sm:text-base"
                :disabled="addToListMutation.isPending.value"
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

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                type="button"
                class="btn-secondary flex-1 py-2.5 sm:py-2 text-sm sm:text-base order-2 sm:order-1"
                :disabled="addToListMutation.isPending.value"
                @click="closeModal"
              >
                Woof Woof 💫
              </button>
              <button
                type="submit"
                class="btn-primary flex-1 py-2.5 sm:py-2 text-sm sm:text-base order-1 sm:order-2"
                :disabled="
                  addToListMutation.isPending.value ||
                  !selectedContentId ||
                  !requestedById
                "
              >
                <span
                  v-if="addToListMutation.isPending.value"
                  class="text-sm sm:text-base"
                >
                  Woof woof woof... ✨
                </span>
                <span v-else class="text-sm sm:text-base">
                  Woof Woof Woof Woof Woof ❤️
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: translateY(100%);
}

@media (min-width: 640px) {
  .modal-enter-from > div,
  .modal-leave-to > div {
    transform: scale(0.95);
  }
}
</style>
