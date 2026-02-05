import { describe, it, expect } from 'vitest';
import { buildManifest } from '../../src/cli/commands/init/manifest.js';
import { getAllTemplates } from '../../src/config/mappings.js';
import { CLAUDE_PROVIDER } from '../../src/config/providers.js';

describe('scaffold manifest', () => {
  describe('buildManifest', () => {
    it('should return manifest for Claude provider', () => {
      const manifest = buildManifest(CLAUDE_PROVIDER);

      expect(manifest.provider).toEqual(CLAUDE_PROVIDER);
      expect(manifest.directories.length).toBeGreaterThan(0);
      expect(manifest.files.length).toBeGreaterThan(0);
    });

    it('should include required directories', () => {
      const manifest = buildManifest(CLAUDE_PROVIDER);

      expect(manifest.directories).toContain('.claude/commands');
      expect(manifest.directories).toContain('.contents/templates/content');
      expect(manifest.directories).toContain('.contents/templates/workflow');
      expect(manifest.directories).toContain('.contents/scripts/bash');
      expect(manifest.directories).toContain('.contents/memory');
    });

    it('should include command template files', () => {
      const manifest = buildManifest(CLAUDE_PROVIDER);
      const commandFiles = manifest.files.filter((f) => f.category === 'command');

      expect(commandFiles.length).toBe(9);
      expect(commandFiles.map((f) => f.targetPath)).toContain(
        '.claude/commands/creator.constitution.md'
      );
      expect(commandFiles.map((f) => f.targetPath)).toContain(
        '.claude/commands/creator.brief.md'
      );
    });

    it('should include workflow template files', () => {
      const manifest = buildManifest(CLAUDE_PROVIDER);
      const workflowFiles = manifest.files.filter((f) => f.category === 'workflow');

      expect(workflowFiles.length).toBe(4);
    });

    it('should include content template files', () => {
      const manifest = buildManifest(CLAUDE_PROVIDER);
      const contentFiles = manifest.files.filter((f) => f.category === 'content');

      expect(contentFiles.length).toBe(3);
      expect(contentFiles.map((f) => f.targetPath)).toContain(
        '.contents/templates/content/linkedin-post-template.md'
      );
    });

    it('should include memory file', () => {
      const manifest = buildManifest(CLAUDE_PROVIDER);
      const memoryFiles = manifest.files.filter((f) => f.category === 'memory');

      expect(memoryFiles.length).toBe(1);
      expect(memoryFiles[0]?.targetPath).toBe('.contents/memory/constitution.md');
    });

    it('should include config file', () => {
      const manifest = buildManifest(CLAUDE_PROVIDER);
      const configFiles = manifest.files.filter((f) => f.category === 'config');

      expect(configFiles.length).toBe(1);
      expect(configFiles[0]?.targetPath).toBe('.contents/config.json');
    });

    it('should include skill template files', () => {
      const manifest = buildManifest(CLAUDE_PROVIDER);
      const skillFiles = manifest.files.filter((f) => f.category === 'skill');

      expect(skillFiles.length).toBe(1);
      expect(skillFiles[0]?.targetPath).toBe('.claude/skills/humanizer/SKILL.md');
    });

    it('should include skills directory', () => {
      const manifest = buildManifest(CLAUDE_PROVIDER);

      expect(manifest.directories).toContain('.claude/skills/humanizer');
    });
  });

  describe('getAllTemplates', () => {
    it('should include skill category templates', () => {
      const allTemplates = getAllTemplates();
      const skillTemplates = allTemplates.filter((f) => f.category === 'skill');

      expect(skillTemplates.length).toBe(1);
      expect(skillTemplates[0]?.sourcePath).toBe('skills/humanizer/SKILL.md');
    });

    it('should include humanizer command mapping', () => {
      const allTemplates = getAllTemplates();
      const humanizerCommand = allTemplates.find(
        (f) => f.targetPath === '.claude/commands/creator.humanizer.md'
      );

      expect(humanizerCommand).toBeDefined();
      expect(humanizerCommand?.category).toBe('command');
    });
  });
});
