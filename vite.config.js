import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: '0.0.0.0', // Membuat server dapat diakses melalui jaringan
    port: 3000, // Port default, ubah jika diperlukan
  },
})


