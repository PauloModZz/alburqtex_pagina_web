import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Firebase y React casi nunca cambian; el código del sitio sí. Al
        // separarlos, un deploy nuevo solo invalida el chunk de la app y el
        // visitante recurrente se ahorra volver a bajar ~700KB de librerías.
        advancedChunks: {
          groups: [
            { name: 'firebase', test: /node_modules[\\/]@?firebase/ },
            { name: 'react', test: /node_modules[\\/](react|react-dom|react-router)/ },
          ],
        },
      },
    },
  },
})
