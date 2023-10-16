import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "home.jsx"),
        profiles: resolve(__dirname, "profiles.jsx"),
        login: resolve(__dirname, "login.jsx"),
        plugins: [react()],
      }
    }
  }
})
