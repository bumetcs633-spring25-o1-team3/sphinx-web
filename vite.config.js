import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  server: {
    port: 3000,
    open: true, // Auto-opens browser
  },
  build: {
    rollupOptions: {
      input: 'index.html', // Ensure Vite knows where to start
    },
  },
});
