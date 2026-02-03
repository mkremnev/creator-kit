import { defineConfig } from 'tsup';
import { cp } from 'fs/promises';
import { resolve } from 'path';

export default defineConfig({
  entry: ['src/cli/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'node18',
  outDir: 'dist/cli',
  banner: {
    js: '#!/usr/bin/env node',
  },
  async onSuccess() {
    // Copy templates to dist
    const srcTemplates = resolve('src/templates');
    const distTemplates = resolve('dist/templates');
    await cp(srcTemplates, distTemplates, { recursive: true });
  },
});
