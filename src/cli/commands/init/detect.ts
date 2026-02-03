/**
 * Existing installation detection for init command
 */

import { join } from 'path';
import { fileExists, readJsonFile } from '../../utils/files.js';
import { META_FILE_PATH } from '../../../config/directories.js';
import type { CreatorMeta } from '../../../types/meta.js';

export interface DetectionResult {
  initialized: boolean;
  meta?: CreatorMeta;
  metaPath: string;
}

export async function detectExistingInstallation(targetDir: string): Promise<DetectionResult> {
  const metaPath = join(targetDir, META_FILE_PATH);

  if (!(await fileExists(metaPath))) {
    return {
      initialized: false,
      metaPath,
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
    // Corrupted meta file - treat as not initialized
    return {
      initialized: false,
      metaPath,
    };
  }
}
