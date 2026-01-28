import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          utils: ['axios']
        }
      }
    },
    sourcemap: false,
    minify: 'terser'
  },
  server: {
    port: 5173,
    host: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material']
  }
})
