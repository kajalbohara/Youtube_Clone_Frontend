import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,  // Allows access from `localhost`
    port: 5173,  // Set your desired port
  },
});
