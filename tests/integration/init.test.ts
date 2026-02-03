import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { join } from 'path';
import { mkdtemp, rm, mkdir, writeFile, chmod } from 'fs/promises';
import { tmpdir } from 'os';
import { fileExists, readJsonFile, directoryExists } from '../../src/cli/utils/files.js';
import { initCommand } from '../../src/cli/commands/init.js';
import type { CreatorMeta } from '../../src/types/meta.js';

describe('init command', () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(async () => {
    originalCwd = process.cwd();
    tempDir = await mkdtemp(join(tmpdir(), 'creator-kit-init-test-'));
    process.chdir(tempDir);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('success case', () => {
    it('should create all required directories', async () => {
      await initCommand({ ai: 'claude', force: false });

      expect(await directoryExists(join(tempDir, '.claude/commands'))).toBe(true);
      expect(await directoryExists(join(tempDir, '.specify/templates/content'))).toBe(true);
      expect(await directoryExists(join(tempDir, '.specify/templates/workflow'))).toBe(true);
      expect(await directoryExists(join(tempDir, '.specify/scripts/bash'))).toBe(true);
      expect(await directoryExists(join(tempDir, '.specify/memory'))).toBe(true);
    });

    it('should create command files', async () => {
      await initCommand({ ai: 'claude', force: false });

      expect(await fileExists(join(tempDir, '.claude/commands/creator.constitution.md'))).toBe(
        true
      );
      expect(await fileExists(join(tempDir, '.claude/commands/creator.brief.md'))).toBe(true);
      expect(await fileExists(join(tempDir, '.claude/commands/creator.refine.md'))).toBe(true);
      expect(await fileExists(join(tempDir, '.claude/commands/creator.outline.md'))).toBe(true);
      expect(await fileExists(join(tempDir, '.claude/commands/creator.todo.md'))).toBe(true);
      expect(await fileExists(join(tempDir, '.claude/commands/creator.write.md'))).toBe(true);
      expect(await fileExists(join(tempDir, '.claude/commands/creator.review.md'))).toBe(true);
      expect(await fileExists(join(tempDir, '.claude/commands/creator.verify.md'))).toBe(true);
    });

    it('should create template files', async () => {
      await initCommand({ ai: 'claude', force: false });

      expect(
        await fileExists(join(tempDir, '.specify/templates/content/linkedin-post-template.md'))
      ).toBe(true);
      expect(
        await fileExists(join(tempDir, '.specify/templates/content/telegram-post-template.md'))
      ).toBe(true);
      expect(
        await fileExists(join(tempDir, '.specify/templates/content/twitter-thread-template.md'))
      ).toBe(true);
      expect(
        await fileExists(join(tempDir, '.specify/templates/workflow/content-brief-template.md'))
      ).toBe(true);
    });

    it('should create constitution and config files', async () => {
      await initCommand({ ai: 'claude', force: false });

      expect(await fileExists(join(tempDir, '.specify/memory/constitution.md'))).toBe(true);
      expect(await fileExists(join(tempDir, '.specify/config.json'))).toBe(true);
    });

    it('should create .creator-meta.json with correct structure', async () => {
      await initCommand({ ai: 'claude', force: false });

      const metaPath = join(tempDir, '.specify/.creator-meta.json');
      expect(await fileExists(metaPath)).toBe(true);

      const meta = await readJsonFile<CreatorMeta>(metaPath);
      expect(meta.provider).toBe('claude');
      expect(meta.version).toBeDefined();
      expect(meta.installedAt).toBeDefined();
      expect(meta.fileHashes).toBeDefined();
      expect(Object.keys(meta.fileHashes).length).toBeGreaterThan(0);
    });

    it('should return success exit code', async () => {
      const result = await initCommand({ ai: 'claude', force: false });
      expect(result.exitCode).toBe(0);
    });
  });

  describe('already initialized', () => {
    it('should detect existing installation', async () => {
      // First init
      await initCommand({ ai: 'claude', force: false });

      // Second init should detect existing
      const result = await initCommand({ ai: 'claude', force: false });

      // With force=false and no user input, it should indicate already initialized
      expect(result.alreadyInitialized).toBe(true);
    });
  });

  describe('force flag', () => {
    it('should overwrite existing files with --force', async () => {
      // First init
      await initCommand({ ai: 'claude', force: false });

      // Modify a file
      const constitutionPath = join(tempDir, '.specify/memory/constitution.md');
      await writeFile(constitutionPath, 'Modified content');

      // Second init with force
      const result = await initCommand({ ai: 'claude', force: true });

      expect(result.exitCode).toBe(0);
    });
  });

  describe('unsupported provider error', () => {
    it('should return error for unsupported provider', async () => {
      const result = await initCommand({ ai: 'unknown', force: false });

      expect(result.exitCode).toBe(2);
      expect(result.error).toContain('Unsupported');
    });

    it('should return error for empty provider', async () => {
      const result = await initCommand({ ai: '', force: false });

      expect(result.exitCode).toBe(2);
    });
  });

  describe('permission denied error', () => {
    it('should return error when cannot write to directory', async () => {
      // Skip on Windows as chmod doesn't work the same way
      if (process.platform === 'win32') {
        return;
      }

      // Create a read-only directory (with execute but not write)
      const readOnlyDir = join(tempDir, 'readonly');
      await mkdir(readOnlyDir);
      await chmod(readOnlyDir, 0o555); // r-x r-x r-x

      process.chdir(readOnlyDir);

      try {
        const result = await initCommand({ ai: 'claude', force: false });
        expect(result.exitCode).toBe(3);
      } finally {
        // Restore permissions for cleanup
        process.chdir(tempDir);
        await chmod(readOnlyDir, 0o755);
      }
    });
  });
});
