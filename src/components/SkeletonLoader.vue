<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  customClass: '',
})

const style = computed(() => ({
  width: props.width,
  height: props.height,
}))
</script>

<template>
  <div :class="['skeleton', customClass]" :style="style"></div>
</template>
