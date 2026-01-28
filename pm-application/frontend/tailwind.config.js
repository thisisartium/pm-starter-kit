/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        artium: {
          purple: '#9333EA',
          pink: '#EC4899',
          'purple-light': '#A855F7',
          'pink-light': '#F472B6',
          dark: '#000000',
          'dark-gray': '#1F2937',
          'light-gray': '#F9FAFB',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

