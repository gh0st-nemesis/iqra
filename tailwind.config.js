/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"Noto Naskh Arabic"', '"Amiri"', 'serif'],
        arabicDisplay: ['"Amiri"', '"Noto Naskh Arabic"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#effcfa',
          100: '#c7f4ed',
          200: '#90e8dc',
          300: '#55d5c5',
          400: '#2bbcac',
          500: '#149e8f',
          600: '#0f766e', // primary teal
          700: '#115e59',
          800: '#134945',
          900: '#0c302d',
        },
        sand: {
          50: '#fdfbf3',
          100: '#faf3dd',
          200: '#f3e4b8',
          300: '#e9cf85',
          400: '#dfb75c',
          500: '#c99a3a',
          600: '#a97a2b',
        },
      },
    },
  },
  plugins: [],
}
