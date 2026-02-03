import { describe, it, expect } from 'vitest';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { glob } from 'fs/promises';

describe('command template files', () => {
  const templatesDir = join(process.cwd(), 'src/templates/commands');

  const expectedCommands = [
    'creator.constitution.md',
    'creator.brief.md',
    'creator.refine.md',
    'creator.outline.md',
    'creator.todo.md',
    'creator.write.md',
    'creator.review.md',
    'creator.verify.md',
  ];

  describe('file existence', () => {
    it.each(expectedCommands)('should have %s template', async (filename) => {
      const filePath = join(templatesDir, filename);
      const content = await readFile(filePath, 'utf-8').catch(() => null);
      expect(content).not.toBeNull();
    });
  });

  describe('file content', () => {
    it.each(expectedCommands)('%s should use creator.* naming in content', async (filename) => {
      const filePath = join(templatesDir, filename);
      const content = await readFile(filePath, 'utf-8').catch(() => '');

      // Should not contain speckit references
      expect(content).not.toMatch(/speckit\./);
      expect(content).not.toMatch(/\/speckit\./);
    });

    it.each(expectedCommands)('%s should reference .specify/ paths correctly', async (filename) => {
      const filePath = join(templatesDir, filename);
      const content = await readFile(filePath, 'utf-8').catch(() => '');

      // If it references templates, should use correct path format
      if (content.includes('templates/')) {
        expect(content).toMatch(/\.specify\/templates\//);
      }
    });
  });
});
