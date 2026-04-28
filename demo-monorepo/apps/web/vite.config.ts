import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, '../../packages/types'),
      '@mocks': path.resolve(__dirname, '../../packages/mocks')
    }
  }
})
