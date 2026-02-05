/**
 * Template file type definitions
 */

export type TemplateCategory =
  | 'command'
  | 'workflow'
  | 'content'
  | 'script'
  | 'memory'
  | 'config'
  | 'skill';

export interface TransformRule {
  pattern: RegExp;
  replacement: string;
}

export interface TemplateFile {
  sourcePath: string;
  targetPath: string;
  category: TemplateCategory;
  transform?: TransformRule[];
}
