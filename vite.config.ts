// vite.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [svgr(), react()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL, 
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/__tests__/setup.ts'],
    },
  };
});
