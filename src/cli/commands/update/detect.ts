/**
 * Installation detection for update command
 */

import { join } from 'path';
import { fileExists, readJsonFile } from '../../utils/files.js';
import { META_FILE_PATH } from '../../../config/directories.js';
import type { CreatorMeta } from '../../../types/meta.js';

export interface UpdateDetectionResult {
  initialized: boolean;
  meta?: CreatorMeta;
  metaPath: string;
  error?: string;
}

export async function detectInstallation(targetDir: string): Promise<UpdateDetectionResult> {
  const metaPath = join(targetDir, META_FILE_PATH);

  if (!(await fileExists(metaPath))) {
    return {
      initialized: false,
      metaPath,
      error: 'Creator Kit is not initialized in this directory.\n\nRun \'creator init --ai claude\' first.',
    };
  }

  try {
    const meta = await readJsonFile<CreatorMeta>(metaPath);
    return {
      initialized: true,
      meta,
      metaPath,
    };
  } catch {
    return {
      initialized: false,
      metaPath,
      error: 'Corrupted .creator-meta.json, run init --force to reinitialize.',
    };
  }
}
