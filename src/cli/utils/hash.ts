/**
 * File hashing utilities using SHA-256
 */

import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

export async function computeFileHash(filePath: string): Promise<string> {
  const content = await readFile(filePath);
  return computeHash(content);
}

export function computeHash(content: Buffer | string): string {
  const hash = createHash('sha256');
  hash.update(content);
  return `sha256:${hash.digest('hex')}`;
}

export function hashesMatch(hash1: string, hash2: string): boolean {
  return hash1 === hash2;
}
