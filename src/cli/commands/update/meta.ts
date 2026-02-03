/**
 * CreatorMeta update for update command
 */

import { join } from 'path';
import { writeJsonFile } from '../../utils/files.js';
import { META_FILE_PATH } from '../../../config/directories.js';
import { VERSION } from '../../../config/version.js';
import type { CreatorMeta } from '../../../types/meta.js';

export function updateMeta(
  existingMeta: CreatorMeta,
  newHashes: Record<string, string>
): CreatorMeta {
  return {
    ...existingMeta,
    version: VERSION,
    updatedAt: new Date().toISOString(),
    fileHashes: {
      ...existingMeta.fileHashes,
      ...newHashes,
    },
  };
}

export async function writeMeta(meta: CreatorMeta, targetDir: string): Promise<void> {
  const metaPath = join(targetDir, META_FILE_PATH);
  await writeJsonFile(metaPath, meta);
}
