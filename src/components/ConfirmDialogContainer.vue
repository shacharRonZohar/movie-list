<template>
  <ConfirmDialog
    :is-open="confirmState.isOpen"
    :title="confirmState.title"
    :message="confirmState.message"
    :confirm-text="confirmState.confirmText"
    :cancel-text="confirmState.cancelText"
    :variant="confirmState.variant"
    :hide-cancel="confirmState.hideCancel"
    @confirm="handleConfirm"
    @cancel="handleCancel"
    @close="handleClose"
  />
</template>

<script setup lang="ts">
import { useConfirm } from '~/composables/useConfirm'
import ConfirmDialog from './ConfirmDialog.vue'

const { confirmState, handleConfirm, handleCancel, handleClose } = useConfirm()
</script>
