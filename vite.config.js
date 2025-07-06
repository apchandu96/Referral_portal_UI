// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Evaluate your env var now and JSON-stringify it so it's inserted as a literal
    'process.env.API_BASE': JSON.stringify(process.env.VITE_API_BASE),
  }
});
