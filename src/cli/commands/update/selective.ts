/**
 * Selective update logic for update command
 */

import { join } from 'path';
import { copyFile } from '../../utils/files.js';
import { getTemplatesDir } from '../../../config/paths.js';
import type { FileCheckResult } from '../../../types/files.js';

export interface SelectiveUpdateResult {
  updated: string[];
  preserved: string[];
  added: string[];
  conflicts: string[];
  newHashes: Record<string, string>;
}

export async function performSelectiveUpdate(
  results: FileCheckResult[],
  targetDir: string,
  force: boolean
): Promise<SelectiveUpdateResult> {
  const templatesDir = await getTemplatesDir();
  const updated: string[] = [];
  const preserved: string[] = [];
  const added: string[] = [];
  const conflicts: string[] = [];
  const newHashes: Record<string, string> = {};

  for (const result of results) {
    const sourcePath = join(templatesDir, result.file.sourcePath);
    const targetPath = join(targetDir, result.file.targetPath);

    switch (result.status) {
      case 'new':
        // New file - always add
        await copyFile(sourcePath, targetPath);
        added.push(result.file.targetPath);
        newHashes[result.file.targetPath] = result.bundledHash;
        break;

      case 'unchanged':
        // No changes needed, keep existing hash
        if (result.currentHash !== undefined) {
          newHashes[result.file.targetPath] = result.currentHash;
        }
        break;

      case 'updated':
        // Template updated, user didn't modify - safe to update
        await copyFile(sourcePath, targetPath);
        updated.push(result.file.targetPath);
        newHashes[result.file.targetPath] = result.bundledHash;
        break;

      case 'modified':
        // User modified, template same - preserve user's version
        preserved.push(result.file.targetPath);
        if (result.currentHash !== undefined) {
          newHashes[result.file.targetPath] = result.currentHash;
        }
        break;

      case 'conflict':
        if (force) {
          // Force update - already backed up in backup step
          await copyFile(sourcePath, targetPath);
          updated.push(result.file.targetPath);
          newHashes[result.file.targetPath] = result.bundledHash;
        } else {
          // Preserve user's version, report conflict
          conflicts.push(result.file.targetPath);
          preserved.push(result.file.targetPath);
          if (result.currentHash !== undefined) {
            newHashes[result.file.targetPath] = result.currentHash;
          }
        }
        break;
    }
  }

  return {
    updated,
    preserved,
    added,
    conflicts,
    newHashes,
  };
}
