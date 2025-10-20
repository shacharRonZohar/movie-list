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
      // API security headers
      '/api/**': {
        cors: true,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
      },
    },
  },

  // Production security headers
  security: {
    headers: {
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production'
          ? {
              'base-uri': ["'self'"],
              'font-src': ["'self'", 'https:', 'data:'],
              'form-action': ["'self'"],
              'frame-ancestors': ["'self'"],
              'img-src': ["'self'", 'data:', 'https:'],
              'object-src': ["'none'"],
              'script-src-attr': ["'none'"],
              'style-src': ["'self'", 'https:', "'unsafe-inline'"],
              'upgrade-insecure-requests': true,
            }
          : false,
      xContentTypeOptions: 'nosniff',
      xFrameOptions: 'DENY',
      xXSSProtection: '1; mode=block',
    },
  },

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (server-side only)
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    // Public keys (exposed to client)
    public: {
      appUrl: process.env.PUBLIC_APP_URL || '',
    },
  },
})
