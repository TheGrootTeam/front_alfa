import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [svgr(), react()],
    build: {
      rollupOptions: {
        // Exclude testing folders and files when build
        external: [/\.test\.(ts|tsx)$/, /__tests__/],
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/__tests__/setup.ts'],
    },
  };
});
