import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: colors.blue,
      },
      boxShadow: {
        card: '0 6px 20px rgba(0, 0, 0, 0.08)'
      }
    },
  },
  plugins: [],
}

