import { describe, it, expect } from 'vitest';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { getSkillTemplates } from '../../src/config/mappings.js';

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

  describe('skill templates', () => {
    it('should return exactly 1 skill template with correct mapping', () => {
      const skills = getSkillTemplates();

      expect(skills).toHaveLength(1);
      expect(skills[0]?.category).toBe('skill');
      expect(skills[0]?.sourcePath).toBe('skills/humanizer/SKILL.md');
      expect(skills[0]?.targetPath).toBe('.claude/skills/humanizer/SKILL.md');
    });

    it('should have SKILL.md source file with valid markdown', async () => {
      const filePath = join(templatesDir, 'skills/humanizer/SKILL.md');
      const content = await readFile(filePath, 'utf-8').catch(() => null);

      expect(content).not.toBeNull();
      expect(content).toMatch(/^#/m);
    });

    it('should have creator.humanizer.md command source file with valid markdown', async () => {
      const filePath = join(templatesDir, 'commands/creator.humanizer.md');
      const content = await readFile(filePath, 'utf-8').catch(() => null);

      expect(content).not.toBeNull();
      expect(content).toMatch(/^#/m);
    });

    it('SKILL.md should contain key humanizer sections', async () => {
      const filePath = join(templatesDir, 'skills/humanizer/SKILL.md');
      const content = await readFile(filePath, 'utf-8');

      expect(content).toContain('# CONTENT PATTERNS');
      expect(content).toContain('# LANGUAGE PATTERNS');
      expect(content).toContain('# STYLE PATTERNS');
      expect(content).toContain('# QUALITY SCORE');
      expect(content).toMatch(/Keep the meaning/);
      expect(content).toContain('# PRE-SUBMISSION CHECKLIST');
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
