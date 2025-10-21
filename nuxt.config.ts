// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  compatibilityDate: '2024-07-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  serverDir: 'src/server',
  app: {
    head: {
      title: 'Our Movie Collection 💕',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'A romantic movie collection app built with love - Share and cherish movie moments together',
        },
        {
          name: 'theme-color',
          content: '#ff6b9d',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },

  // Production optimizations
  nitro: {
    compressPublicAssets: true,
    minify: true,
    routeRules: {
      // Cache static assets
      '/_nuxt/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },
      // API and page security headers
      '/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
      },
    },
  },

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (server-side only)
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    tmdbApiKey: process.env.TMDB_API_KEY,
    // Public keys (exposed to client)
    public: {
      appUrl: process.env.PUBLIC_APP_URL || '',
    },
  },
})
