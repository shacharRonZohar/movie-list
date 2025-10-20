import { ref } from 'vue'

/**
 * Toast notification options
 */
export interface ToastOptions {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'
  duration?: number
  closable?: boolean
}

export interface ToastItem extends ToastOptions {
  id: string
}

const toasts = ref<ToastItem[]>([])

/**
 * Toast notification composable
 * Manages toast notifications with different types and positions
 *
 * @returns Toast state and methods to show/remove toasts
 */
export const useToast = () => {
  const showToast = (options: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const toast: ToastItem = {
      id,
      type: 'info',
      position: 'top-right',
      duration: 3000,
      closable: true,
      ...options,
    }

    toasts.value.push(toast)

    // Auto-remove after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message: string, options?: Partial<ToastOptions>) => {
    return showToast({ message, type: 'success', ...options })
  }

  const error = (message: string, options?: Partial<ToastOptions>) => {
    return showToast({ message, type: 'error', ...options })
  }

  const warning = (message: string, options?: Partial<ToastOptions>) => {
    return showToast({ message, type: 'warning', ...options })
  }

  const info = (message: string, options?: Partial<ToastOptions>) => {
    return showToast({ message, type: 'info', ...options })
  }

  return {
    toasts: readonly(toasts),
    showToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
}
