/**
 * Scaffold directory configuration
 */

export const SCAFFOLD_DIRECTORIES: readonly string[] = [
  '.claude/commands',
  '.contents/templates/content',
  '.contents/templates/workflow',
  '.contents/scripts/bash',
  '.contents/memory',
] as const;

export const META_FILE_PATH = '.contents/.creator-meta.json';
export const CONFIG_FILE_PATH = '.contents/config.json';
