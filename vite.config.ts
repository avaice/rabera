import preact from '@preact/preset-vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), visualizer()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          required: ['preact', 'react-helmet-async', 'wouter-preact'],
          swr: ['swr'],
        },
      },
    },
  },
})
