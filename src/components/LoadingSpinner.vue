<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray'
  text?: string
  containerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  text: '',
  containerClass: '',
})

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
} as const

const colorClasses = {
  primary: 'border-brand-primary',
  white: 'border-white',
  gray: 'border-gray-600',
} as const

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
} as const
</script>

<template>
  <div :class="['flex items-center justify-center', containerClass]">
    <div
      :class="[
        'animate-spin rounded-full border-b-2',
        sizeClasses[size],
        colorClasses[color],
      ]"
    ></div>
    <span v-if="text" :class="['ml-3', textSizeClasses[size]]">{{ text }}</span>
  </div>
</template>
