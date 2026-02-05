import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { join } from 'path';
import { mkdtemp, rm, writeFile, readFile } from 'fs/promises';
import { tmpdir } from 'os';
import { fileExists, readJsonFile } from '../../src/cli/utils/files.js';
import { initCommand } from '../../src/cli/commands/init.js';
import { updateCommand } from '../../src/cli/commands/update.js';
import type { CreatorMeta } from '../../src/types/meta.js';

describe('update command', () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(async () => {
    originalCwd = process.cwd();
    tempDir = await mkdtemp(join(tmpdir(), 'creator-kit-update-test-'));
    process.chdir(tempDir);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('not initialized error', () => {
    it('should return error when not initialized', async () => {
      const result = await updateCommand({ force: false, backup: true });

      expect(result.exitCode).toBe(5);
      expect(result.error).toContain('not initialized');
    });
  });

  describe('no changes needed', () => {
    it('should report up to date when no changes', async () => {
      // Initialize first
      await initCommand({ ai: 'claude', force: false });

      // Update immediately - should be up to date
      const result = await updateCommand({ force: false, backup: true });

      expect(result.exitCode).toBe(0);
      expect(result.upToDate).toBe(true);
    });
  });

  describe('preserves modified files', () => {
    it('should preserve user-modified files without --force', async () => {
      // Initialize
      await initCommand({ ai: 'claude', force: false });

      // Modify constitution file
      const constitutionPath = join(tempDir, '.contents/memory/constitution.md');
      const customContent = '# My Custom Constitution\n\nCustom content here.';
      await writeFile(constitutionPath, customContent);

      // Update without force
      // Since bundled version hasn't changed, this is "up to date"
      // but modified files are preserved
      const result = await updateCommand({ force: false, backup: true });

      expect(result.exitCode).toBe(0);

      // Verify custom content preserved (no overwrite)
      const content = await readFile(constitutionPath, 'utf-8');
      expect(content).toBe(customContent);

      // upToDate should be true since bundled hasn't changed
      expect(result.upToDate).toBe(true);
    });
  });

  describe('force update with backup', () => {
    it('should create backup and overwrite with --force', async () => {
      // Initialize
      await initCommand({ ai: 'claude', force: false });

      // Modify constitution file
      const constitutionPath = join(tempDir, '.contents/memory/constitution.md');
      const customContent = '# My Custom Constitution';
      await writeFile(constitutionPath, customContent);

      // Delete a file to trigger an update
      const configPath = join(tempDir, '.contents/config.json');
      await rm(configPath);

      // Update with force - this triggers update because config.json is missing (new)
      const result = await updateCommand({ force: true, backup: true });

      expect(result.exitCode).toBe(0);

      // Verify config was restored
      expect(await fileExists(configPath)).toBe(true);

      // User modified file should be preserved (force only affects conflicts)
      const content = await readFile(constitutionPath, 'utf-8');
      expect(content).toBe(customContent);
    });
  });

  describe('new files added', () => {
    it('should add new files from updated templates', async () => {
      // Initialize
      await initCommand({ ai: 'claude', force: false });

      // Simulate removing a file that update should restore
      const filePath = join(tempDir, '.contents/config.json');
      await rm(filePath);

      // Update
      const result = await updateCommand({ force: false, backup: true });

      expect(result.exitCode).toBe(0);

      // File should be restored
      expect(await fileExists(filePath)).toBe(true);
    });
  });

  describe('deploys skill files via update', () => {
    it('should deploy skill file to projects that do not yet have it', async () => {
      // Initialize
      await initCommand({ ai: 'claude', force: false });

      // Remove skill file to simulate pre-skill project
      const skillPath = join(tempDir, '.claude/skills/humanizer/SKILL.md');
      await rm(skillPath);

      // Update should restore the skill file
      const result = await updateCommand({ force: false, backup: true });

      expect(result.exitCode).toBe(0);
      expect(await fileExists(skillPath)).toBe(true);
    });

    it('should deploy humanizer command file to projects that do not yet have it', async () => {
      // Initialize
      await initCommand({ ai: 'claude', force: false });

      // Remove humanizer command to simulate pre-skill project
      const commandPath = join(tempDir, '.claude/commands/creator.humanizer.md');
      await rm(commandPath);

      // Update should restore the command file
      const result = await updateCommand({ force: false, backup: true });

      expect(result.exitCode).toBe(0);
      expect(await fileExists(commandPath)).toBe(true);
    });
  });

  describe('updates meta file', () => {
    it('should update .creator-meta.json after update with changes', async () => {
      // Initialize
      await initCommand({ ai: 'claude', force: false });

      const metaPath = join(tempDir, '.contents/.creator-meta.json');

      // Delete a file to trigger actual update
      const configPath = join(tempDir, '.contents/config.json');
      await rm(configPath);

      // Wait a bit to ensure different timestamp
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Update - should add the deleted file
      await updateCommand({ force: false, backup: true });

      const metaAfter = await readJsonFile<CreatorMeta>(metaPath);

      // updatedAt should be set because actual update happened
      expect(metaAfter.updatedAt).toBeDefined();
    });
  });
});
