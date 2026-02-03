import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { join } from 'path';
import { mkdtemp, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { computeFileHash, computeHash, hashesMatch } from '../../src/cli/utils/hash.js';

describe('hash utilities', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'creator-kit-hash-test-'));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('computeHash', () => {
    it('should compute consistent hash for same content', () => {
      const content = 'Hello, World!';
      const hash1 = computeHash(content);
      const hash2 = computeHash(content);

      expect(hash1).toBe(hash2);
    });

    it('should return different hash for different content', () => {
      const hash1 = computeHash('Hello');
      const hash2 = computeHash('World');

      expect(hash1).not.toBe(hash2);
    });

    it('should return hash with sha256 prefix', () => {
      const hash = computeHash('test');

      expect(hash).toMatch(/^sha256:[a-f0-9]{64}$/);
    });

    it('should handle empty string', () => {
      const hash = computeHash('');

      expect(hash).toMatch(/^sha256:[a-f0-9]{64}$/);
    });

    it('should handle Buffer input', () => {
      const buffer = Buffer.from('Hello');
      const hash = computeHash(buffer);

      expect(hash).toMatch(/^sha256:[a-f0-9]{64}$/);
    });
  });

  describe('computeFileHash', () => {
    it('should compute hash of file contents', async () => {
      const filePath = join(tempDir, 'test.txt');
      const content = 'Test content';
      await writeFile(filePath, content);

      const fileHash = await computeFileHash(filePath);
      const contentHash = computeHash(content);

      expect(fileHash).toBe(contentHash);
    });

    it('should return same hash for identical files', async () => {
      const file1 = join(tempDir, 'file1.txt');
      const file2 = join(tempDir, 'file2.txt');
      const content = 'Same content';

      await writeFile(file1, content);
      await writeFile(file2, content);

      const hash1 = await computeFileHash(file1);
      const hash2 = await computeFileHash(file2);

      expect(hash1).toBe(hash2);
    });

    it('should return different hash for different files', async () => {
      const file1 = join(tempDir, 'file1.txt');
      const file2 = join(tempDir, 'file2.txt');

      await writeFile(file1, 'Content 1');
      await writeFile(file2, 'Content 2');

      const hash1 = await computeFileHash(file1);
      const hash2 = await computeFileHash(file2);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('hashesMatch', () => {
    it('should return true for matching hashes', () => {
      const hash = computeHash('test');

      expect(hashesMatch(hash, hash)).toBe(true);
    });

    it('should return false for different hashes', () => {
      const hash1 = computeHash('test1');
      const hash2 = computeHash('test2');

      expect(hashesMatch(hash1, hash2)).toBe(false);
    });
  });
});
