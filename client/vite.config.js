import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configuració simplificada i robusta
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost',   // Usar localhost per evitar problemes de WebSocket
    port: 5173,
    strictPort: true,
    cors: true,
    hmr: {
      port: 5173,
      host: 'localhost'  // HMR també a localhost
    },
    open: false
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  }
})
