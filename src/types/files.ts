/**
 * File status type definitions for update detection
 */

import type { TemplateFile } from './templates.js';

export type FileStatus = 'new' | 'unchanged' | 'modified' | 'updated' | 'conflict';

export interface FileCheckResult {
  file: TemplateFile;
  status: FileStatus;
  currentHash?: string;
  originalHash?: string;
  bundledHash: string;
}
