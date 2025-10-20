<template>
  <div
    class="min-h-screen bg-love-gradient flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
  >
    <!-- Romantic background decorations - Smaller on mobile -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-6 sm:top-10 left-6 sm:left-10 text-4xl sm:text-6xl opacity-10 animate-float"
      >
        💕
      </div>
      <div
        class="absolute top-20 sm:top-32 right-10 sm:right-20 text-3xl sm:text-5xl opacity-10 animate-float"
        style="animation-delay: 0.5s"
      >
        ✨
      </div>
      <div
        class="absolute bottom-16 sm:bottom-20 left-10 sm:left-20 text-3xl sm:text-5xl opacity-10 animate-float"
        style="animation-delay: 1s"
      >
        💖
      </div>
      <div
        class="absolute bottom-24 sm:bottom-32 right-16 sm:right-32 text-4xl sm:text-6xl opacity-10 animate-float"
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
