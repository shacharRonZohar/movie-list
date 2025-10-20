<template>
  <div
    class="min-h-screen bg-love-gradient flex items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- Romantic background decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-10 text-6xl opacity-10 animate-float">
        💕
      </div>
      <div
        class="absolute top-32 right-20 text-5xl opacity-10 animate-float"
        style="animation-delay: 0.5s"
      >
        ✨
      </div>
      <div
        class="absolute bottom-20 left-20 text-5xl opacity-10 animate-float"
        style="animation-delay: 1s"
      >
        💖
      </div>
      <div
        class="absolute bottom-32 right-32 text-6xl opacity-10 animate-float"
        style="animation-delay: 1.5s"
      >
        ⭐
      </div>
    </div>

    <div class="w-full max-w-md relative z-10">
      <slot></slot>
    </div>
  </div>
</template>
