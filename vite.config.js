import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Set base to your GitHub repo name, e.g. '/personal-tracker/'
export default defineConfig({
  plugins: [react()],
  base: '/workbench/',  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
          'charts': ['recharts'],
          'utils': ['date-fns', 'lucide-react', 'clsx'],
        },
      },
    },
  },})
