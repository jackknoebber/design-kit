import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

// 'design-kit' resolves to the repo root so the playground imports the kit
// exactly like a consumer app does (deep, extensionless paths). dedupe keeps
// the kit's `import React` resolving to the playground's single copy.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: { 'design-kit': path.resolve(here, '..') },
    dedupe: ['react', 'react-dom'],
  },
  server: { fs: { allow: [path.resolve(here, '..')] } },
});
