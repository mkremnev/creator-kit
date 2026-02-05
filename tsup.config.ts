import { defineConfig } from 'tsup';
import { cp, readFile } from 'fs/promises';
import { resolve } from 'path';

const pkg = JSON.parse(await readFile('package.json', 'utf-8'));

export default defineConfig({
  entry: ['src/cli/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'node18',
  outDir: 'dist/cli',
  define: {
    __PKG_VERSION__: JSON.stringify(pkg.version),
  },
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
