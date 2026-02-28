import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3100,
    strictPort: true,
    proxy: mode === 'development' ? {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    } : {}
  }
}))
