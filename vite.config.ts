import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split three + react out of entry/dynamic chunks so game-logic
        // deploys do not re-send the Three.js payload to returning players.
        // Normalize separators so the matcher works on Windows and POSIX.
        manualChunks(id: string) {
          const normalized = id.split('\\').join('/');
          if (normalized.includes('node_modules/three')) return 'three';
          if (
            normalized.includes('node_modules/react-dom') ||
            normalized.includes('node_modules/react/') ||
            normalized.includes('node_modules/scheduler')
          ) {
            return 'react';
          }
        },
      },
    },
  },
});
