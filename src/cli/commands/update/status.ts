/**
 * File status checker for update command
 */

import { join } from 'path';
import { fileExists } from '../../utils/files.js';
import { computeFileHash } from '../../utils/hash.js';
import { getTemplatesDir } from '../../../config/paths.js';
import type { TemplateFile } from '../../../types/templates.js';
import type { FileStatus, FileCheckResult } from '../../../types/files.js';
import type { CreatorMeta } from '../../../types/meta.js';

interface StatusInput {
  exists: boolean;
  currentHash: string | undefined;
  originalHash: string | undefined;
  bundledHash: string;
}

export function determineFileStatus(input: StatusInput): FileStatus {
  const { exists, currentHash, originalHash, bundledHash } = input;

  // File doesn't exist in target
  if (!exists) {
    return 'new';
  }

  // No original hash recorded - treat as new file in this update
  if (originalHash === undefined) {
    return 'new';
  }

  const userModified = currentHash !== originalHash;
  const templateUpdated = bundledHash !== originalHash;

  if (!userModified && !templateUpdated) {
    return 'unchanged';
  }

  if (userModified && !templateUpdated) {
    return 'modified';
  }

  if (!userModified && templateUpdated) {
    return 'updated';
  }

  // Both modified
  return 'conflict';
}

export async function checkFileStatus(
  file: TemplateFile,
  targetDir: string,
  meta: CreatorMeta
): Promise<FileCheckResult> {
  const targetPath = join(targetDir, file.targetPath);
  const templatesDir = await getTemplatesDir();
  const sourcePath = join(templatesDir, file.sourcePath);

  const exists = await fileExists(targetPath);
  const currentHash = exists ? await computeFileHash(targetPath) : undefined;
  const originalHash = meta.fileHashes[file.targetPath];
  const bundledHash = await computeFileHash(sourcePath);

  const status = determineFileStatus({
    exists,
    currentHash,
    originalHash,
    bundledHash,
  });

  const result: FileCheckResult = {
    file,
    status,
    bundledHash,
  };
  if (currentHash !== undefined) {
    result.currentHash = currentHash;
  }
  if (originalHash !== undefined) {
    result.originalHash = originalHash;
  }
  return result;
}

export async function checkAllFiles(
  files: TemplateFile[],
  targetDir: string,
  meta: CreatorMeta
): Promise<FileCheckResult[]> {
  const results: FileCheckResult[] = [];

  for (const file of files) {
    const result = await checkFileStatus(file, targetDir, meta);
    results.push(result);
  }

  return results;
}
