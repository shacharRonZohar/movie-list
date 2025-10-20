<script setup lang="ts">
import { ref } from 'vue'
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

const title = ref('')
const status = ref('WANT_TO_WATCH')
const requestedById = ref('')

// Fetch users
const { data: usersData, isLoading: isLoadingUsers } = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const response = await $fetch('/api/users')
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

const statusOptions = [
  { value: 'WANT_TO_WATCH', label: 'Plan to Watch 🎬' },
  { value: 'WATCHING', label: 'Currently Watching 📺' },
  { value: 'WATCHED', label: 'Completed ✓' },
  { value: 'ON_HOLD', label: 'On Hold ⏸️' },
  { value: 'DROPPED', label: 'Dropped 💫' },
] as const

const addContentMutation = useMutation({
  mutationFn: async (data: {
    title: string
    status: string
    requestedById: string
  }) => {
    const result = await $fetch('/api/content', {
      method: 'POST',
      body: data,
    })
    return result
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['content'] })
    toast.success('Added with love! ❤️')
    closeModal()
  },
  onError: error => {
    toast.error(
      `Oops! ${error instanceof Error ? error.message : 'Something went wrong'}`
    )
  },
})

const closeModal = () => {
  title.value = ''
  status.value = 'WANT_TO_WATCH'
  if (usersData.value?.users && usersData.value.users.length > 0) {
    requestedById.value = usersData.value.users[0].id
  }
  emit('close')
}

const handleSubmit = () => {
  if (!title.value.trim()) {
    toast.error('Please enter a title 💫')
    return
  }

  if (!requestedById.value) {
    toast.error('Please select who requested this 💫')
    return
  }

  addContentMutation.mutate({
    title: title.value.trim(),
    status: status.value,
    requestedById: requestedById.value,
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
              Add Something Special 💕
            </h2>
            <p class="text-base sm:text-lg text-gray-600">
              Let's add a new movie to our collection ✨
            </p>
          </div>

          <!-- Form -->
          <form class="space-y-4 sm:space-y-6" @submit.prevent="handleSubmit">
            <!-- Title Input -->
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Movie Title 🎬
              </label>
              <input
                id="title"
                v-model="title"
                type="text"
                placeholder="Enter the movie title..."
                class="input w-full text-sm sm:text-base"
                :disabled="addContentMutation.isPending.value"
                autofocus
              />
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
                :disabled="addContentMutation.isPending.value || isLoadingUsers"
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
                :disabled="addContentMutation.isPending.value"
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
                :disabled="addContentMutation.isPending.value"
                @click="closeModal"
              >
                Maybe Later 💫
              </button>
              <button
                type="submit"
                class="btn-primary flex-1 py-2.5 sm:py-2 text-sm sm:text-base order-1 sm:order-2"
                :disabled="
                  addContentMutation.isPending.value ||
                  !title.trim() ||
                  !requestedById
                "
              >
                <span
                  v-if="addContentMutation.isPending.value"
                  class="text-sm sm:text-base"
                >
                  Adding with love... ✨
                </span>
                <span v-else class="text-sm sm:text-base">
                  Add to Our Collection ❤️
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
