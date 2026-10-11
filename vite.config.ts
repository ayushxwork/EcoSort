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
        // The `build.manualChunks` shorthand is ignored by Vite 6 — declare
        // the splits under rollupOptions.output so three.js stays out of the
        // landing bundle and React is cached across lazy routes.
        manualChunks(id: string) {
          if (id.includes('node_modules/three')) return 'three';
          if (id.includes('node_modules/react')) return 'react';
        },
      },
    },
  },
});
