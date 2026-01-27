import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or vue, svelte, etc.

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Matches any request starting with /api
      '/api': {
        target: 'https://openlibrary.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})