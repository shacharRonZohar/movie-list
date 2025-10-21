<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div
    class="min-h-screen bg-romantic-gradient flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden"
  >
    <!-- Decorative floating hearts - Smaller on mobile -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-10 sm:top-20 left-4 sm:left-10 text-3xl sm:text-6xl text-love-rose/20 animate-float"
        style="animation-delay: 0s"
      >
        💕
      </div>
      <div
        class="absolute top-24 sm:top-40 right-8 sm:right-20 text-2xl sm:text-4xl text-love-lavender/20 animate-float"
        style="animation-delay: 1s"
      >
        ✨
      </div>
      <div
        class="absolute bottom-40 sm:bottom-32 left-1/4 text-3xl sm:text-5xl text-love-blush/20 animate-float"
        style="animation-delay: 2s"
      >
        ❤️
      </div>
      <div
        class="absolute top-1/3 right-1/4 text-2xl sm:text-3xl text-love-coral/20 animate-float"
        style="animation-delay: 1.5s"
      >
        💖
      </div>
      <div
        class="absolute bottom-20 right-4 sm:right-10 text-3xl sm:text-4xl text-love-gold/20 animate-float"
        style="animation-delay: 0.5s"
      >
        🎬
      </div>
    </div>

    <!-- Main content -->
    <div class="max-w-4xl w-full relative z-10">
      <div class="text-center mb-6 sm:mb-8">
        <!-- Main heading with gradient -->
        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-romantic-gradient mb-3 sm:mb-4 animate-fade-in px-2"
        >
          Meow Meow Meow 💕
        </h1>

        <!-- Subheading -->
        <p
          class="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 mb-3 animate-fade-in px-4"
          style="animation-delay: 0.2s"
        >
          Meow Meow Meow meow Meow Meow Meow Meow
        </p>

        <!-- Excited cat GIF -->
        <div
          class="flex justify-center mb-4 animate-fade-in"
          style="animation-delay: 0.3s"
        >
          <img
            src="/images/excited-cat.gif"
            alt="Meow meow meow"
            class="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
          />
        </div>

        <!-- Description -->
        <p
          class="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 animate-fade-in px-4"
          style="animation-delay: 0.4s"
        >
          Meow meow meow meow meow meow meow meow. Meow meow meow meow meow meow
          meow meow, meow, meow meow meow meow meow ✨
        </p>
      </div>

      <!-- Feature cards -->
      <div
        class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 px-2"
      >
        <div
          class="card-hover p-5 sm:p-6 text-center animate-fade-in"
          style="animation-delay: 0.6s"
        >
          <div class="text-4xl sm:text-5xl mb-3 sm:mb-4">🎬</div>
          <h3 class="text-lg sm:text-xl font-semibold text-love-rose mb-2">
            Meow Meow
          </h3>
          <p class="text-sm sm:text-base text-gray-600">
            Meow meow meow meow meow meow meow meow meow meow
          </p>
        </div>

        <div
          class="card-hover p-5 sm:p-6 text-center animate-fade-in"
          style="animation-delay: 0.8s"
        >
          <div class="text-4xl sm:text-5xl mb-3 sm:mb-4">💑</div>
          <h3 class="text-lg sm:text-xl font-semibold text-love-rose mb-2">
            Meow meow Meow
          </h3>
          <p class="text-sm sm:text-base text-gray-600">
            Meow meow meow meow meow meow meow meow meow
          </p>
        </div>

        <div
          class="card-hover p-5 sm:p-6 text-center animate-fade-in sm:col-span-2 md:col-span-1"
          style="animation-delay: 1s"
        >
          <div class="text-4xl sm:text-5xl mb-3 sm:mb-4">💝</div>
          <h3 class="text-lg sm:text-xl font-semibold text-love-rose mb-2">
            Meow Meow
          </h3>
          <p class="text-sm sm:text-base text-gray-600">
            Meow meow meow meow meow meow meow meow meow
          </p>
        </div>
      </div>

      <!-- Call to action -->
      <div
        class="text-center animate-fade-in px-2"
        style="animation-delay: 1.2s"
      >
        <div
          class="flex flex-col gap-3 sm:gap-4 justify-center items-stretch sm:items-center"
        >
          <NuxtLink
            to="/content"
            class="btn-primary text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 inline-flex items-center justify-center gap-2 sm:gap-3 group w-full sm:w-auto"
          >
            <span>Meow Meow Meow Meow</span>
            <span class="group-hover:translate-x-1 transition-transform"
            >❤️</span
            >
          </NuxtLink>

          <NuxtLink
            to="/content/add"
            class="btn-secondary text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 inline-flex items-center justify-center gap-2 sm:gap-3 group w-full sm:w-auto"
          >
            <span>Add Something Special</span>
            <span class="group-hover:scale-110 transition-transform">✨</span>
          </NuxtLink>
        </div>

        <p class="mt-4 sm:mt-6 text-gray-500 text-xs sm:text-sm px-4">
          Meow meow meow, meow meow meow 💕✨
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
  opacity: 0;
}
</style>
