// vite.config.ts
import { defineConfig } from "file:///C:/Users/arrar/Documents/Keepcoding/proyecto_final/front_alfa/node_modules/vitest/dist/config.js";
import react from "file:///C:/Users/arrar/Documents/Keepcoding/proyecto_final/front_alfa/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///C:/Users/arrar/Documents/Keepcoding/proyecto_final/front_alfa/node_modules/vite-plugin-svgr/dist/index.js";
import dotenv from "file:///C:/Users/arrar/Documents/Keepcoding/proyecto_final/front_alfa/node_modules/dotenv/lib/main.js";
dotenv.config();
var vite_config_default = defineConfig(() => {
  return {
    plugins: [svgr(), react()],
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api")
        }
      },
      build: {
        rollupOptions: {
          // Exclude testing folders and files when build
          external: [/\.test\.(ts|tsx)$/, /__tests__/]
        }
      },
      test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["src/__tests__/setup.ts"]
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhcnJhclxcXFxEb2N1bWVudHNcXFxcS2VlcGNvZGluZ1xcXFxwcm95ZWN0b19maW5hbFxcXFxmcm9udF9hbGZhXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhcnJhclxcXFxEb2N1bWVudHNcXFxcS2VlcGNvZGluZ1xcXFxwcm95ZWN0b19maW5hbFxcXFxmcm9udF9hbGZhXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hcnJhci9Eb2N1bWVudHMvS2VlcGNvZGluZy9wcm95ZWN0b19maW5hbC9mcm9udF9hbGZhL3ZpdGUuY29uZmlnLnRzXCI7Ly8gdml0ZS5jb25maWcudHNcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcblxyXG5kb3RlbnYuY29uZmlnKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbc3ZncigpLCByZWFjdCgpXSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgICcvYXBpJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBwcm9jZXNzLmVudi5WSVRFX0FQSV9VUkwsIFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcvYXBpJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAvLyBFeGNsdWRlIHRlc3RpbmcgZm9sZGVycyBhbmQgZmlsZXMgd2hlbiBidWlsZFxyXG4gICAgICAgIGV4dGVybmFsOiBbL1xcLnRlc3RcXC4odHN8dHN4KSQvLCAvX190ZXN0c19fL10sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgdGVzdDoge1xyXG4gICAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgICAgc2V0dXBGaWxlczogWydzcmMvX190ZXN0c19fL3NldHVwLnRzJ10sXHJcbiAgICB9LFxyXG4gIH1cclxufX0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFlBQVk7QUFFbkIsT0FBTyxPQUFPO0FBRWQsSUFBTyxzQkFBUSxhQUFhLE1BQU07QUFDaEMsU0FBTztBQUFBLElBQ0wsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFBQSxJQUN6QixRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixRQUFRLFFBQVEsSUFBSTtBQUFBLFVBQ3BCLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLE1BQU07QUFBQSxRQUNsRDtBQUFBLE1BQ0Y7QUFBQSxNQUNGLE9BQU87QUFBQSxRQUNMLGVBQWU7QUFBQTtBQUFBLFVBRWIsVUFBVSxDQUFDLHFCQUFxQixXQUFXO0FBQUEsUUFDN0M7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsUUFDVCxhQUFhO0FBQUEsUUFDYixZQUFZLENBQUMsd0JBQXdCO0FBQUEsTUFDdkM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFDLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
