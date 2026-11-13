import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all network addresses (0.0.0.0) so localhost, 127.0.0.1, and Network IP all work
    port: 5173,
    open: true, // Automatically opens the browser with the correct active port on startup
  },
})
