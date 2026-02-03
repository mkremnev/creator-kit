/**
 * File mapping configuration (speckit -> creator naming)
 */

import type { TemplateCategory, TemplateFile } from '../types/templates.js';


function createTemplateFile(
  sourcePath: string,
  targetPath: string,
  category: TemplateCategory
): TemplateFile {
  return { sourcePath, targetPath, category };
}

export function getCommandTemplates(): TemplateFile[] {
  return [
    createTemplateFile(
      'commands/creator.constitution.md',
      '.claude/commands/creator.constitution.md',
      'command'
    ),
    createTemplateFile('commands/creator.brief.md', '.claude/commands/creator.brief.md', 'command'),
    createTemplateFile(
      'commands/creator.refine.md',
      '.claude/commands/creator.refine.md',
      'command'
    ),
    createTemplateFile(
      'commands/creator.outline.md',
      '.claude/commands/creator.outline.md',
      'command'
    ),
    createTemplateFile('commands/creator.todo.md', '.claude/commands/creator.todo.md', 'command'),
    createTemplateFile('commands/creator.write.md', '.claude/commands/creator.write.md', 'command'),
    createTemplateFile(
      'commands/creator.review.md',
      '.claude/commands/creator.review.md',
      'command'
    ),
    createTemplateFile(
      'commands/creator.verify.md',
      '.claude/commands/creator.verify.md',
      'command'
    ),
  ];
}

export function getWorkflowTemplates(): TemplateFile[] {
  return [
    createTemplateFile(
      'workflow/content-brief-template.md',
      '.contents/templates/workflow/content-brief-template.md',
      'workflow'
    ),
    createTemplateFile(
      'workflow/content-plan-template.md',
      '.contents/templates/workflow/content-plan-template.md',
      'workflow'
    ),
    createTemplateFile(
      'workflow/content-tasks-template.md',
      '.contents/templates/workflow/content-tasks-template.md',
      'workflow'
    ),
    createTemplateFile(
      'workflow/content-checklist-template.md',
      '.contents/templates/workflow/content-checklist-template.md',
      'workflow'
    ),
  ];
}

export function getContentTemplates(): TemplateFile[] {
  return [
    createTemplateFile(
      'content/linkedin-post-template.md',
      '.contents/templates/content/linkedin-post-template.md',
      'content'
    ),
    createTemplateFile(
      'content/telegram-post-template.md',
      '.contents/templates/content/telegram-post-template.md',
      'content'
    ),
    createTemplateFile(
      'content/twitter-thread-template.md',
      '.contents/templates/content/twitter-thread-template.md',
      'content'
    ),
  ];
}

export function getMemoryTemplates(): TemplateFile[] {
  return [
    createTemplateFile('memory/constitution.md', '.contents/memory/constitution.md', 'memory'),
  ];
}

export function getConfigTemplates(): TemplateFile[] {
  return [createTemplateFile('config/config.json', '.contents/config.json', 'config')];
}

export function getScriptTemplates(): TemplateFile[] {
  return [
    createTemplateFile(
      'scripts/check-prerequisites.sh',
      '.contents/scripts/bash/check-prerequisites.sh',
      'script'
    ),
  ];
}

export function getAllTemplates(): TemplateFile[] {
  return [
    ...getCommandTemplates(),
    ...getWorkflowTemplates(),
    ...getContentTemplates(),
    ...getMemoryTemplates(),
    ...getConfigTemplates(),
    ...getScriptTemplates(),
  ];
}
