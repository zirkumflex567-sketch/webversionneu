import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    chunkSizeWarningLimit: 650
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  }
})
