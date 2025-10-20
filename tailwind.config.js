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
        // Status colors
        status: {
          'want-to-watch': '#8B5CF6', // Purple
          watching: '#3B82F6', // Blue
          watched: '#10B981', // Green
          'on-hold': '#F59E0B', // Amber
          dropped: '#EF4444', // Red
        },
        // Priority colors
        priority: {
          low: '#6B7280', // Gray
          medium: '#F59E0B', // Amber
          high: '#EF4444', // Red
        },
        // Brand colors
        brand: {
          primary: '#8B5CF6', // Purple
          secondary: '#3B82F6', // Blue
          accent: '#EC4899', // Pink
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        skeleton: 'skeleton 1.5s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
}
