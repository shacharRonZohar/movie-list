<template>
  <div>
    <NuxtPage />
    <ToastContainer />
    <ConfirmDialogContainer />
  </div>
</template>

<script setup lang="ts">
import ToastContainer from '~/components/ToastContainer.vue'
import ConfirmDialogContainer from '~/components/ConfirmDialogContainer.vue'
</script>
