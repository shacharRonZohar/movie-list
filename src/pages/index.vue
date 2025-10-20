<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div
    class="min-h-screen bg-romantic-gradient flex items-center justify-center px-4 py-8 relative overflow-x-hidden"
  >
    <!-- Decorative floating hearts -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 left-10 text-6xl text-love-rose/20 animate-float"
        style="animation-delay: 0s"
      >
        💕
      </div>
      <div
        class="absolute top-40 right-20 text-4xl text-love-lavender/20 animate-float"
        style="animation-delay: 1s"
      >
        ✨
      </div>
      <div
        class="absolute bottom-32 left-1/4 text-5xl text-love-blush/20 animate-float"
        style="animation-delay: 2s"
      >
        ❤️
      </div>
      <div
        class="absolute top-1/3 right-1/4 text-3xl text-love-coral/20 animate-float"
        style="animation-delay: 1.5s"
      >
        💖
      </div>
      <div
        class="absolute bottom-20 right-10 text-4xl text-love-gold/20 animate-float"
        style="animation-delay: 0.5s"
      >
        🎬
      </div>
    </div>

    <!-- Main content -->
    <div class="max-w-4xl w-full relative z-10">
      <div class="text-center mb-8">
        <!-- Main heading with gradient -->
        <h1
          class="text-6xl md:text-7xl font-bold text-romantic-gradient mb-4 animate-fade-in"
        >
          Meow Meow Meow 💕
        </h1>

        <!-- Subheading -->
        <p
          class="text-2xl md:text-3xl text-gray-700 mb-3 animate-fade-in"
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
            class="w-32 h-32 md:w-40 md:h-40"
          />
        </div>

        <!-- Description -->
        <p
          class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 animate-fade-in"
          style="animation-delay: 0.4s"
        >
          Meow meow meow meow meow meow meow meow. Meow meow meow meow meow meow
          meow meow, meow, meow meow meow meow meow ✨
        </p>
      </div>

      <!-- Feature cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div
          class="card-hover p-6 text-center animate-fade-in"
          style="animation-delay: 0.6s"
        >
          <div class="text-5xl mb-4">🎬</div>
          <h3 class="text-xl font-semibold text-love-rose mb-2">Meow Meow</h3>
          <p class="text-gray-600">
            Meow meow meow meow meow meow meow meow meow meow
          </p>
        </div>

        <div
          class="card-hover p-6 text-center animate-fade-in"
          style="animation-delay: 0.8s"
        >
          <div class="text-5xl mb-4">💑</div>
          <h3 class="text-xl font-semibold text-love-rose mb-2">
            Meow meow Meow
          </h3>
          <p class="text-gray-600">
            Meow meow meow meow meow meow meow meow meow
          </p>
        </div>

        <div
          class="card-hover p-6 text-center animate-fade-in"
          style="animation-delay: 1s"
        >
          <div class="text-5xl mb-4">💝</div>
          <h3 class="text-xl font-semibold text-love-rose mb-2">Meow Meow</h3>
          <p class="text-gray-600">
            Meow meow meow meow meow meow meow meow meow
          </p>
        </div>
      </div>

      <!-- Call to action -->
      <div class="text-center animate-fade-in" style="animation-delay: 1.2s">
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <NuxtLink
            to="/content"
            class="btn-primary text-xl px-12 py-4 inline-flex items-center gap-3 group"
          >
            <span>Meow Meow Meow Meow</span>
            <span class="group-hover:translate-x-1 transition-transform"
              >❤️</span
            >
          </NuxtLink>

          <NuxtLink
            to="/content/add"
            class="btn-secondary text-xl px-12 py-4 inline-flex items-center gap-3 group"
          >
            <span>Add Something Special</span>
            <span class="group-hover:scale-110 transition-transform">✨</span>
          </NuxtLink>
        </div>

        <p class="mt-6 text-gray-500 text-sm">
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
