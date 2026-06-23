import { defineConfig } from 'vite';

export default defineConfig({
  // CRITICAL FIX: Tells Vite to bundle assets relative to your GitHub repository path
  base: '/RomWeb/', 
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});