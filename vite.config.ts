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
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'icons', test: /react-icons|lucide-react|src\/icons\// },
            { name: 'lang', test: /i18next|src\/i18n\// },
            { name: 'vendor', test: /node_modules/ },
          ],
        },
      },
    },
  },
});
