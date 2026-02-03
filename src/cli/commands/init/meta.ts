/**
 * CreatorMeta generation and writing
 */

import { join } from 'path';
import { writeJsonFile } from '../../utils/files.js';
import { META_FILE_PATH } from '../../../config/directories.js';
import { VERSION } from '../../../config/version.js';
import type { CreatorMeta } from '../../../types/meta.js';

export function createMeta(
  providerId: string,
  fileHashes: Record<string, string>
): CreatorMeta {
  return {
    version: VERSION,
    provider: providerId,
    installedAt: new Date().toISOString(),
    fileHashes,
  };
}

export async function writeMeta(
  meta: CreatorMeta,
  targetDir: string
): Promise<void> {
  const metaPath = join(targetDir, META_FILE_PATH);
  await writeJsonFile(metaPath, meta);
}
