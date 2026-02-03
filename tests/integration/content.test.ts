import { describe, it, expect } from 'vitest';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';

describe('scaffolded file content', () => {
  const templatesDir = join(process.cwd(), 'src/templates');

  describe('command files internal paths', () => {
    it('all command files should reference .specify/ paths correctly', async () => {
      const commandsDir = join(templatesDir, 'commands');
      const files = await readdir(commandsDir);

      for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const content = await readFile(join(commandsDir, file), 'utf-8');

        // Check that .specify/ references are correct format
        const specifyMatches = content.match(/\.specify\/[^\s\)]+/g) || [];

        for (const match of specifyMatches) {
          // Should start with .specify/
          expect(match.startsWith('.specify/')).toBe(true);

          // Should be a valid path structure
          const validPaths = [
            '.specify/templates/content/',
            '.specify/templates/workflow/',
            '.specify/scripts/bash/',
            '.specify/memory/',
            '.specify/config.json',
            '.specify/.creator-meta.json',
          ];

          const isValidPath = validPaths.some((p) => match.startsWith(p));
          expect(isValidPath).toBe(true);
        }
      }
    });

    it('command files should not contain speckit references', async () => {
      const commandsDir = join(templatesDir, 'commands');
      const files = await readdir(commandsDir);

      for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const content = await readFile(join(commandsDir, file), 'utf-8');

        // Should not reference old speckit naming
        expect(content).not.toMatch(/speckit\./);
        expect(content).not.toMatch(/\/speckit\./);
      }
    });
  });

  describe('workflow templates', () => {
    it('all workflow templates should be valid markdown', async () => {
      const workflowDir = join(templatesDir, 'workflow');
      const files = await readdir(workflowDir);

      for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const content = await readFile(join(workflowDir, file), 'utf-8');

        // Should have a title
        expect(content).toMatch(/^#\s+.+/m);

        // Should have some structure
        expect(content.length).toBeGreaterThan(100);
      }
    });
  });

  describe('content templates', () => {
    it('all content templates should be valid markdown', async () => {
      const contentDir = join(templatesDir, 'content');
      const files = await readdir(contentDir);

      for (const file of files) {
        if (!file.endsWith('.md')) continue;

        const content = await readFile(join(contentDir, file), 'utf-8');

        // Should have a title
        expect(content).toMatch(/^#\s+.+/m);

        // Should have format guidelines section
        expect(content).toMatch(/format|guideline/i);
      }
    });
  });

  describe('config file', () => {
    it('should be valid JSON', async () => {
      const configPath = join(templatesDir, 'config/config.json');
      const content = await readFile(configPath, 'utf-8');

      expect(() => JSON.parse(content)).not.toThrow();

      const config = JSON.parse(content);
      expect(config.version).toBeDefined();
      expect(config.provider).toBe('claude');
    });
  });
});
