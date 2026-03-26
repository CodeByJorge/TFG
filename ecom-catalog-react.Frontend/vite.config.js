import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    cors: true,
    allowedHosts: [
      'fd80-2-137-95-199.ngrok-free.app',
      '.ngrok-free.app'
    ]
  }
})
