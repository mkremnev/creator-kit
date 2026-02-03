import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { join } from 'path';
import { mkdtemp, rm, writeFile, mkdir } from 'fs/promises';
import { tmpdir } from 'os';
import {
  fileExists,
  directoryExists,
  createDirectory,
  copyFile,
  readTextFile,
  writeTextFile,
  readJsonFile,
  writeJsonFile,
  isWritable,
} from '../../src/cli/utils/files.js';

describe('file utilities', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'creator-kit-test-'));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('fileExists', () => {
    it('should return true for existing file', async () => {
      const filePath = join(tempDir, 'test.txt');
      await writeFile(filePath, 'test content');

      expect(await fileExists(filePath)).toBe(true);
    });

    it('should return false for non-existing file', async () => {
      const filePath = join(tempDir, 'nonexistent.txt');

      expect(await fileExists(filePath)).toBe(false);
    });
  });

  describe('directoryExists', () => {
    it('should return true for existing directory', async () => {
      const dirPath = join(tempDir, 'subdir');
      await mkdir(dirPath);

      expect(await directoryExists(dirPath)).toBe(true);
    });

    it('should return false for non-existing directory', async () => {
      const dirPath = join(tempDir, 'nonexistent');

      expect(await directoryExists(dirPath)).toBe(false);
    });

    it('should return false for file path', async () => {
      const filePath = join(tempDir, 'file.txt');
      await writeFile(filePath, 'content');

      expect(await directoryExists(filePath)).toBe(false);
    });
  });

  describe('createDirectory', () => {
    it('should create nested directories', async () => {
      const dirPath = join(tempDir, 'a', 'b', 'c');

      await createDirectory(dirPath);

      expect(await directoryExists(dirPath)).toBe(true);
    });

    it('should not fail if directory already exists', async () => {
      const dirPath = join(tempDir, 'existing');
      await mkdir(dirPath);

      await expect(createDirectory(dirPath)).resolves.not.toThrow();
    });
  });

  describe('copyFile', () => {
    it('should copy file to destination', async () => {
      const source = join(tempDir, 'source.txt');
      const dest = join(tempDir, 'dest.txt');
      await writeFile(source, 'test content');

      await copyFile(source, dest);

      expect(await fileExists(dest)).toBe(true);
      expect(await readTextFile(dest)).toBe('test content');
    });

    it('should create destination directory if needed', async () => {
      const source = join(tempDir, 'source.txt');
      const dest = join(tempDir, 'subdir', 'dest.txt');
      await writeFile(source, 'test content');

      await copyFile(source, dest);

      expect(await fileExists(dest)).toBe(true);
    });
  });

  describe('readTextFile / writeTextFile', () => {
    it('should write and read text file', async () => {
      const filePath = join(tempDir, 'text.txt');
      const content = 'Hello, World!';

      await writeTextFile(filePath, content);
      const result = await readTextFile(filePath);

      expect(result).toBe(content);
    });

    it('should create parent directories', async () => {
      const filePath = join(tempDir, 'a', 'b', 'text.txt');

      await writeTextFile(filePath, 'content');

      expect(await fileExists(filePath)).toBe(true);
    });
  });

  describe('readJsonFile / writeJsonFile', () => {
    it('should write and read JSON file', async () => {
      const filePath = join(tempDir, 'data.json');
      const data = { name: 'test', count: 42, nested: { value: true } };

      await writeJsonFile(filePath, data);
      const result = await readJsonFile<typeof data>(filePath);

      expect(result).toEqual(data);
    });
  });

  describe('isWritable', () => {
    it('should return true for existing writable directory', async () => {
      expect(await isWritable(tempDir)).toBe(true);
    });

    it('should return true for non-existing directory with writable parent', async () => {
      const newDir = join(tempDir, 'newdir');
      expect(await isWritable(newDir)).toBe(true);
    });
  });
});
