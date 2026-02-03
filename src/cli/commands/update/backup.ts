/**
 * Backup creation for update --force mode
 */

import { join } from 'path';
import { copyFile, fileExists } from '../../utils/files.js';
import type { FileCheckResult } from '../../../types/files.js';

export interface BackupResult {
  backedUp: string[];
  backupPaths: Record<string, string>;
}

export async function createBackups(
  results: FileCheckResult[],
  targetDir: string
): Promise<BackupResult> {
  const backedUp: string[] = [];
  const backupPaths: Record<string, string> = {};

  // Only backup files that will be overwritten
  const filesToBackup = results.filter(
    (r) => r.status === 'modified' || r.status === 'conflict'
  );

  for (const result of filesToBackup) {
    const originalPath = join(targetDir, result.file.targetPath);
    const backupPath = `${originalPath}.bak`;

    if (await fileExists(originalPath)) {
      await copyFile(originalPath, backupPath);
      backedUp.push(result.file.targetPath);
      backupPaths[result.file.targetPath] = backupPath;
    }
  }

  return {
    backedUp,
    backupPaths,
  };
}
