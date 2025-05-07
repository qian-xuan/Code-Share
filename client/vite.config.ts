import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    watch: {
      usePolling: true,
    }
  },

  // build 配置
  build: {
    outDir: '../server/dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: 'index.html'
    }
  }
})
