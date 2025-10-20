import { ref } from 'vue'

/**
 * Confirmation dialog options
 */
export interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  hideCancel?: boolean
}

interface ConfirmState extends ConfirmOptions {
  isOpen: boolean
  resolve: ((value: boolean) => void) | null
}

const confirmState = ref<ConfirmState>({
  isOpen: false,
  title: '',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'danger',
  hideCancel: false,
  resolve: null,
})

/**
 * Confirmation dialog composable
 * Provides a promise-based confirmation dialog for user actions
 *
 * @returns Confirmation state and methods
 */
export const useConfirm = () => {
  const confirm = (options: ConfirmOptions) => {
    return new Promise<boolean>(resolve => {
      confirmState.value = {
        isOpen: true,
        ...options,
        resolve,
      }
    })
  }

  const handleConfirm = () => {
    if (confirmState.value.resolve) {
      confirmState.value.resolve(true)
    }
    confirmState.value.isOpen = false
    confirmState.value.resolve = null
  }

  const handleCancel = () => {
    if (confirmState.value.resolve) {
      confirmState.value.resolve(false)
    }
    confirmState.value.isOpen = false
    confirmState.value.resolve = null
  }

  const handleClose = () => {
    handleCancel()
  }

  return {
    confirmState: readonly(confirmState),
    confirm,
    handleConfirm,
    handleCancel,
    handleClose,
  }
}
