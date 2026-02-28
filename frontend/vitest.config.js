import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: false,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    include: ['src/**/*.{test,spec}.{js,jsx}'],
  },
});
