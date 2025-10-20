<template>
  <Transition name="toast">
    <div
      v-if="visible"
      :class="[
        'fixed z-50 max-w-md px-6 py-4 rounded-2xl shadow-lg',
        'flex items-center gap-3 animate-slide-up',
        positionClasses[position],
        typeClasses[type],
      ]"
    >
      <!-- Icon -->
      <div class="flex-shrink-0">
        <svg
          v-if="type === 'success'"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else-if="type === 'error'"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else-if="type === 'warning'"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Message -->
      <div class="flex-1">
        <p class="font-medium">{{ message }}</p>
      </div>

      <!-- Close button -->
      <button
        v-if="closable"
        @click="close"
        class="flex-shrink-0 hover:opacity-75 transition-opacity"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'
  duration?: number
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  position: 'top-right',
  duration: 3000,
  closable: true,
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(true)

const typeClasses = {
  success:
    'bg-status-cherished/10 text-love-deep-rose border border-love-gold/30 backdrop-blur-sm',
  error:
    'bg-love-coral/10 text-love-deep-rose border border-love-coral/30 backdrop-blur-sm',
  warning:
    'bg-love-peach/20 text-love-deep-rose border border-love-coral/30 backdrop-blur-sm',
  info: 'bg-love-lavender/10 text-love-deep-rose border border-love-lavender/30 backdrop-blur-sm',
} as const

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
} as const

const close = () => {
  visible.value = false
  emit('close')
}

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      close()
    }, props.duration)
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
