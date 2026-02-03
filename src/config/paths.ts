/**
 * Path resolution utilities
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fsExtra from 'fs-extra';

const { pathExists } = fsExtra;

let cachedTemplatesDir: string | null = null;

export async function getTemplatesDir(): Promise<string> {
  if (cachedTemplatesDir !== null) {
    return cachedTemplatesDir;
  }

  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFile);

  // Try dist path first (production: dist/config/ -> dist/templates/)
  const distPath = join(currentDir, '..', 'templates');
  if (await pathExists(join(distPath, 'commands'))) {
    cachedTemplatesDir = distPath;
    return distPath;
  }

  // Try source path (development: src/config/ -> src/templates/)
  const srcPath = join(currentDir, '..', 'templates');
  if (await pathExists(join(srcPath, 'commands'))) {
    cachedTemplatesDir = srcPath;
    return srcPath;
  }

  // Fallback: look relative to cli directory
  const cliPath = join(currentDir, '..', 'cli', '..', 'templates');
  if (await pathExists(join(cliPath, 'commands'))) {
    cachedTemplatesDir = cliPath;
    return cliPath;
  }

  // Last resort: assume we're in dist/cli or similar
  const lastResort = join(currentDir, '..', '..', 'templates');
  cachedTemplatesDir = lastResort;
  return lastResort;
}

export function clearTemplatesDirCache(): void {
  cachedTemplatesDir = null;
}
