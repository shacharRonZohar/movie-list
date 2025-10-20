<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'default',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome</h1>
    <p class="text-gray-600 text-lg">Your application starts here</p>
  </div>
</template>
