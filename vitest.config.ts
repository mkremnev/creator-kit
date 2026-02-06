import { readFileSync } from 'fs';
import { defineConfig } from 'vitest/config';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

export default defineConfig({
  define: {
    __PKG_VERSION__: JSON.stringify(pkg.version),
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    // Use forks pool to support process.chdir in integration tests
    pool: 'forks',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/templates/**'],
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
