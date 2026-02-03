/**
 * Atomic file scaffolding for init command
 */

import { join } from 'path';
import { createDirectory, copyFile, fileExists } from '../../utils/files.js';
import { computeFileHash } from '../../utils/hash.js';
import { getTemplatesDir } from '../../../config/paths.js';
import type { ScaffoldManifest } from '../../../types/manifest.js';
import type { TemplateFile } from '../../../types/templates.js';

export interface ScaffoldResult {
  success: boolean;
  filesCreated: string[];
  fileHashes: Record<string, string>;
  error?: string;
  isPermissionError?: boolean;
}

function isPermissionError(error: unknown): boolean {
  if (error instanceof Error && 'code' in error) {
    const code = (error as NodeJS.ErrnoException).code;
    return code === 'EACCES' || code === 'EPERM';
  }
  return false;
}

export async function scaffoldFiles(
  manifest: ScaffoldManifest,
  targetDir: string
): Promise<ScaffoldResult> {
  const filesCreated: string[] = [];
  const fileHashes: Record<string, string> = {};
  const templatesDir = await getTemplatesDir();

  try {
    // Create all directories first
    for (const dir of manifest.directories) {
      const fullPath = join(targetDir, dir);
      await createDirectory(fullPath);
    }

    // Copy all files
    for (const file of manifest.files) {
      const sourcePath = join(templatesDir, file.sourcePath);
      const targetPath = join(targetDir, file.targetPath);

      // Check if source template exists
      if (!(await fileExists(sourcePath))) {
        throw new Error(`Template file not found: ${file.sourcePath}`);
      }

      await copyFile(sourcePath, targetPath);
      filesCreated.push(file.targetPath);

      // Compute hash for the copied file
      const hash = await computeFileHash(targetPath);
      fileHashes[file.targetPath] = hash;
    }

    return {
      success: true,
      filesCreated,
      fileHashes,
    };
  } catch (error) {
    // Rollback: remove created files
    for (const filePath of filesCreated) {
      try {
        const { rm } = await import('fs/promises');
        await rm(join(targetDir, filePath), { force: true });
      } catch {
        // Ignore rollback errors
      }
    }

    return {
      success: false,
      filesCreated: [],
      fileHashes: {},
      error: error instanceof Error ? error.message : 'Unknown error during scaffolding',
      isPermissionError: isPermissionError(error),
    };
  }
}

export function countFilesByCategory(
  files: TemplateFile[]
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const file of files) {
    const category = file.category;
    counts[category] = (counts[category] ?? 0) + 1;
  }

  return counts;
}
