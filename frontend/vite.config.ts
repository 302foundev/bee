import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://bee-api-gps3.onrender.com/urls',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '^/(?!dashboard|about|settings|signin|signup)([a-zA-Z0-9_-]+)': {
        target: 'https://bee-api-gps3.onrender.com/urls',
        changeOrigin: true,
        rewrite: (path) => path.replace('/', ''),
      },
    },
  },
});
