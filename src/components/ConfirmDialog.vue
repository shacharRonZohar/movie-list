<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-content" @click.stop>
          <div class="card p-8 animate-scale-in">
            <!-- Icon -->
            <div
              :class="[
                'mx-auto flex items-center justify-center h-14 w-14 rounded-full mb-4',
                variantClasses[variant].bg,
              ]"
            >
              <svg
                class="h-6 w-6"
                :class="variantClasses[variant].icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="iconPaths[variant]"
                />
              </svg>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-center mb-2 text-love-deep-rose">
              {{ title }}
            </h3>

            <!-- Message -->
            <p class="text-gray-600 text-center mb-8">
              {{ message }}
            </p>

            <!-- Actions -->
            <div class="flex gap-3">
              <button
                v-if="!hideCancel"
                @click="handleCancel"
                class="btn-secondary flex-1"
              >
                {{ cancelText }}
              </button>
              <button
                @click="handleConfirm"
                :class="['flex-1', variantClasses[variant].button]"
              >
                {{ confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  hideCancel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'danger',
  hideCancel: false,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
  close: []
}>()

const variantClasses = {
  danger: {
    bg: 'bg-love-coral/20',
    icon: 'text-love-coral',
    button: 'btn-danger',
  },
  warning: {
    bg: 'bg-love-peach/30',
    icon: 'text-love-coral',
    button:
      'btn bg-love-coral text-white hover:bg-love-deep-rose focus:ring-love-coral',
  },
  info: {
    bg: 'bg-love-lavender/20',
    icon: 'text-love-rose',
    button: 'btn-primary',
  },
} as const

const iconPaths = {
  danger:
    'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  warning:
    'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
} as const

const handleConfirm = () => {
  emit('confirm')
  emit('close')
}

const handleCancel = () => {
  emit('cancel')
  emit('close')
}

const handleOverlayClick = () => {
  if (!props.hideCancel) {
    handleCancel()
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
