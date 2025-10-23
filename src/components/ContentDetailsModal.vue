<script setup lang="ts">
import { computed } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useToast } from '~/composables/useToast'
import { useConfirm } from '~/composables/useConfirm'

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

interface ListItemData {
  id: string
  status: string
  rating: number | null
  addedAt: Date
  content: ContentData
}

const props = defineProps<{
  open: boolean
  listItem: ListItemData | null
}>()

const emit = defineEmits<{
  close: []
}>()

const toast = useToast()
const { confirm } = useConfirm()
const queryClient = useQueryClient()

const backdropUrl = computed(() => {
  if (!props.listItem?.content.backdropPath) return null
  return `https://image.tmdb.org/t/p/w1280${props.listItem.content.backdropPath}`
})

const posterUrl = computed(() => {
  if (!props.listItem?.content.posterPath) return null
  return `https://image.tmdb.org/t/p/w500${props.listItem.content.posterPath}`
})

const imdbUrl = computed(() => {
  if (!props.listItem?.content.imdbId) return null
  return `https://www.imdb.com/title/${props.listItem.content.imdbId}`
})

const formattedRuntime = computed(() => {
  if (!props.listItem?.content.runtime) return null
  const hours = Math.floor(props.listItem.content.runtime / 60)
  const minutes = props.listItem.content.runtime % 60
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
})

const statusLabel = computed(() => {
  const statusMap = {
    WANT_TO_WATCH: 'Plan to Watch',
    WATCHING: 'Currently Watching',
    WATCHED: 'Completed',
    ON_HOLD: 'On Hold',
    DROPPED: 'Dropped',
  } as const
  return (
    statusMap[props.listItem?.status as keyof typeof statusMap] ||
    props.listItem?.status
  )
})

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

const deleteMutation = useMutation({
  mutationFn: async (id: string) => {
    await $fetch(`/api/list/${id}`, {
      method: 'DELETE',
    })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['list'] })
    toast.success('Removed with love 💫')
    closeModal()
  },
  onError: error => {
    toast.error(
      `Oops! ${error instanceof Error ? error.message : "Couldn't remove it 💔"}`
    )
  },
})

const handleDelete = async () => {
  if (!props.listItem) return

  const confirmed = await confirm({
    title: 'Remove from our collection?',
    message: `Are you sure you want to remove "${props.listItem.content.title}" from our list? This cannot be undone.`,
    confirmText: 'Yes, remove it',
    cancelText: 'Keep it',
    variant: 'danger',
  })

  if (confirmed) {
    deleteMutation.mutate(props.listItem.id)
  }
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open && listItem"
        class="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          <!-- Backdrop Image -->
          <div v-if="backdropUrl" class="relative h-48 sm:h-64 overflow-hidden">
            <img
              :src="backdropUrl"
              :alt="listItem.content.title"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white"
            ></div>
          </div>

          <!-- Close Button -->
          <button
            class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-love-rose flex items-center justify-center transition-all shadow-lg z-10"
            @click="closeModal"
          >
            <span class="text-2xl">×</span>
          </button>

          <!-- Content -->
          <div class="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-12rem)]">
            <div class="flex gap-6">
              <!-- Poster -->
              <div v-if="posterUrl" class="flex-shrink-0 w-32 sm:w-48">
                <img
                  :src="posterUrl"
                  :alt="listItem.content.title"
                  class="w-full rounded-xl shadow-lg"
                />
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <!-- Title -->
                <h2
                  class="text-2xl sm:text-3xl font-bold text-romantic-gradient mb-2"
                >
                  {{ listItem.content.title }}
                  <span v-if="listItem.content.type === 'SERIES'">📺</span>
                  <span v-else>🎬</span>
                </h2>

                <!-- Original Title -->
                <p
                  v-if="
                    listItem.content.originalTitle &&
                    listItem.content.originalTitle !== listItem.content.title
                  "
                  class="text-sm text-gray-500 mb-4"
                >
                  {{ listItem.content.originalTitle }}
                </p>

                <!-- Meta Info -->
                <div class="flex flex-wrap items-center gap-3 text-sm mb-4">
                  <span class="px-3 py-1 bg-love-blush rounded-full">
                    {{ listItem.content.year }}
                  </span>
                  <span v-if="formattedRuntime" class="text-gray-600">
                    {{ formattedRuntime }}
                  </span>
                  <span
                    class="px-3 py-1 rounded-full text-white"
                    :class="getStatusColor(listItem.status)"
                  >
                    {{ statusLabel }}
                  </span>
                  <span
                    v-if="listItem.rating"
                    class="text-love-gold font-semibold"
                  >
                    ⭐ {{ listItem.rating.toFixed(1) }}
                  </span>
                </div>

                <!-- Tagline -->
                <p
                  v-if="listItem.content.tagline"
                  class="text-love-rose italic mb-4"
                >
                  "{{ listItem.content.tagline }}"
                </p>

                <!-- Genres -->
                <div
                  v-if="listItem.content.genres.length > 0"
                  class="flex flex-wrap gap-2 mb-4"
                >
                  <span
                    v-for="genre in listItem.content.genres"
                    :key="genre"
                    class="px-3 py-1 bg-romantic-cream text-gray-700 rounded-full text-sm"
                  >
                    {{ genre }}
                  </span>
                </div>

                <!-- Overview -->
                <p
                  v-if="listItem.content.overview"
                  class="text-gray-700 leading-relaxed mb-4"
                >
                  {{ listItem.content.overview }}
                </p>

                <!-- Links -->
                <div class="flex gap-3 mb-6">
                  <a
                    v-if="imdbUrl"
                    :href="imdbUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-semibold transition-colors"
                  >
                    View on IMDb 🎬
                  </a>
                </div>

                <!-- Actions -->
                <div class="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    class="flex-1 btn-secondary"
                    :disabled="deleteMutation.isPending.value"
                    @click="closeModal"
                  >
                    Close
                  </button>
                  <button
                    class="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                    :disabled="deleteMutation.isPending.value"
                    @click="handleDelete"
                  >
                    {{
                      deleteMutation.isPending.value
                        ? 'Removing...'
                        : 'Remove from List'
                    }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.status-dreaming {
  @apply bg-love-lavender;
}
.status-watching-together {
  @apply bg-love-rose;
}
.status-cherished {
  @apply bg-love-gold;
}
.status-paused {
  @apply bg-love-peach;
}
.status-not-for-us {
  @apply bg-rose-700;
}
</style>
