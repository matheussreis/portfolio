import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/portfolio/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('src/icons/') ||
            id.includes('react-icons') ||
            id.includes('lucide-react')
          )
            return 'icons';
          if (id.includes('i18next') || id.includes('src/i18n/')) return 'lang';
          if (id.includes('src/components/')) return 'components';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
});
