import { describe, it, expect } from 'vitest';
import { readFile } from 'fs/promises';
import { join } from 'path';

describe('template files', () => {
  const templatesDir = join(process.cwd(), 'src/templates');

  describe('workflow templates', () => {
    const workflowTemplates = [
      'workflow/content-brief-template.md',
      'workflow/content-plan-template.md',
      'workflow/content-tasks-template.md',
      'workflow/content-checklist-template.md',
    ];

    it.each(workflowTemplates)('should have %s', async (filename) => {
      const filePath = join(templatesDir, filename);
      const content = await readFile(filePath, 'utf-8').catch(() => null);
      expect(content).not.toBeNull();
    });

    it.each(workflowTemplates)('%s should be valid markdown', async (filename) => {
      const filePath = join(templatesDir, filename);
      const content = await readFile(filePath, 'utf-8').catch(() => '');

      // Should have at least a title
      expect(content).toMatch(/^#/m);
    });
  });

  describe('content templates', () => {
    const contentTemplates = [
      'content/linkedin-post-template.md',
      'content/telegram-post-template.md',
      'content/twitter-thread-template.md',
    ];

    it.each(contentTemplates)('should have %s', async (filename) => {
      const filePath = join(templatesDir, filename);
      const content = await readFile(filePath, 'utf-8').catch(() => null);
      expect(content).not.toBeNull();
    });

    it.each(contentTemplates)('%s should be valid markdown', async (filename) => {
      const filePath = join(templatesDir, filename);
      const content = await readFile(filePath, 'utf-8').catch(() => '');

      // Should have at least a title
      expect(content).toMatch(/^#/m);
    });
  });

  describe('memory templates', () => {
    it('should have constitution.md', async () => {
      const filePath = join(templatesDir, 'memory/constitution.md');
      const content = await readFile(filePath, 'utf-8').catch(() => null);
      expect(content).not.toBeNull();
    });
  });

  describe('config templates', () => {
    it('should have config.json', async () => {
      const filePath = join(templatesDir, 'config/config.json');
      const content = await readFile(filePath, 'utf-8').catch(() => null);
      expect(content).not.toBeNull();

      // Should be valid JSON
      if (content !== null) {
        expect(() => JSON.parse(content) as unknown).not.toThrow();
      }
    });
  });
});
