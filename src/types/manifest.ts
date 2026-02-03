/**
 * Scaffold manifest type definitions
 */

import type { AIProvider } from '../config/providers.js';
import type { TemplateFile } from './templates.js';

export interface ScaffoldManifest {
  provider: AIProvider;
  files: TemplateFile[];
  directories: string[];
}
