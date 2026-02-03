/**
 * Scaffold manifest builder for init command
 */

import type { AIProvider } from '../../../config/providers.js';
import type { ScaffoldManifest } from '../../../types/manifest.js';
import { SCAFFOLD_DIRECTORIES } from '../../../config/directories.js';
import { getAllTemplates } from '../../../config/mappings.js';

export function buildManifest(provider: AIProvider): ScaffoldManifest {
  return {
    provider,
    files: getAllTemplates(),
    directories: [...SCAFFOLD_DIRECTORIES],
  };
}
