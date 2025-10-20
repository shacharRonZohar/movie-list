/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './src/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // Romantic color palette - Shades of Love
        love: {
          rose: '#FF6B9D',
          blush: '#FFC0CB',
          cherry: '#FFB7C5',
          lavender: '#E6A8D7',
          gold: '#FFD700',
          coral: '#FF6F61',
          peach: '#FFDAB9',
          'deep-rose': '#C73866',
          hotpink: '#FF1493',
        },
        // Background colors - Cozy Atmosphere
        romantic: {
          canvas: '#FFF5F7',
          cream: '#FFF9FA',
          twilight: '#2D1B2E',
          'dark-rose': '#1A0A12',
        },
        // Status colors - Our Journey Together
        status: {
          dreaming: '#E6A8D7', // Movies we dream of watching
          'watching-together': '#FF6B9D', // Currently enjoying
          cherished: '#FFD700', // Treasured favorites
          paused: '#FFDAB9', // Taking a break
          'not-for-us': '#C73866', // Moving on gracefully
        },
        // Priority colors - What Matters Most
        priority: {
          low: '#FFB7C5', // Cherry Blossom - Gentle suggestions
          medium: '#FF6F61', // Coral - Worth our time
          high: '#FF1493', // Hot Pink - Can't wait to share this!
        },
        // Brand colors - Keeping compatibility
        brand: {
          primary: '#FF6B9D', // Rose
          secondary: '#E6A8D7', // Lavender
          accent: '#FFD700', // Gold
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        skeleton: 'skeleton 1.5s ease-in-out infinite',
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        skeleton: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': {
            boxShadow:
              '0 0 5px rgba(255, 107, 157, 0.5), 0 0 10px rgba(255, 107, 157, 0.3)',
          },
          '50%': {
            boxShadow:
              '0 0 10px rgba(255, 107, 157, 0.8), 0 0 20px rgba(255, 107, 157, 0.5)',
          },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
