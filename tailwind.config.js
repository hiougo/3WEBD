/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        black: '#000000',
        white: '#ffffff',
        neon: '#ccff00',
        gray: {
          100: '#f3f4f6',
          900: '#111827',
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-hover': '2px 2px 0px 0px #000000',
        'brutal-white': '4px 4px 0px 0px #ffffff',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}