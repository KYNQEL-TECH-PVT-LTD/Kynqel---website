import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        talent: resolve(__dirname, 'talent.html'),
        industries: resolve(__dirname, 'industries.html'),
        company: resolve(__dirname, 'company.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
