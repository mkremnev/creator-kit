/**
 * Update command handler
 */

import type { UpdateOptions } from '../../types/options.js';
import { detectInstallation } from './update/detect.js';
import { checkAllFiles } from './update/status.js';
import { performSelectiveUpdate } from './update/selective.js';
import { createBackups } from './update/backup.js';
import { updateMeta, writeMeta } from './update/meta.js';
import { getAllTemplates } from '../../config/mappings.js';
import { formatError, formatSuccess, symbols } from '../utils/output.js';
import { VERSION } from '../../config/version.js';

export interface UpdateResult {
  exitCode: number;
  error?: string;
  upToDate?: boolean;
  updated?: string[];
  preserved?: string[];
  added?: string[];
  backedUp?: string[];
}

export async function updateCommand(options: UpdateOptions): Promise<UpdateResult> {
  const targetDir = process.cwd();

  // Check if initialized
  const detection = await detectInstallation(targetDir);
  if (!detection.initialized || !detection.meta) {
    console.error(formatError(detection.error ?? 'Not initialized'));
    return { exitCode: 5, error: detection.error };
  }

  const meta = detection.meta;

  // Check all files
  const templates = getAllTemplates();
  const fileResults = await checkAllFiles(templates, targetDir, meta);

  // Check if any updates needed
  const needsUpdate = fileResults.some(
    (r) => r.status === 'new' || r.status === 'updated' || (options.force && r.status === 'conflict')
  );

  if (!needsUpdate) {
    console.log(`\nCreator Kit is up to date (v${meta.version})`);
    return { exitCode: 0, upToDate: true };
  }

  console.log(`\nUpdating Creator Kit from v${meta.version} to v${VERSION}...`);
  console.log('');

  // Create backups if force mode
  let backedUp: string[] = [];
  if (options.force && options.backup) {
    const backupResult = await createBackups(fileResults, targetDir);
    backedUp = backupResult.backedUp;
  }

  // Perform selective update
  const updateResult = await performSelectiveUpdate(fileResults, targetDir, options.force);

  // Update metadata
  const newMeta = updateMeta(meta, updateResult.newHashes);
  await writeMeta(newMeta, targetDir);

  // Output results
  if (updateResult.updated.length > 0 || updateResult.added.length > 0) {
    console.log('Updated files:');
    for (const file of [...updateResult.added, ...updateResult.updated]) {
      console.log(`  ${symbols.check} ${file}`);
    }
    console.log('');
  }

  if (updateResult.preserved.length > 0) {
    console.log('Preserved (user modified):');
    for (const file of updateResult.preserved) {
      console.log(`  ${symbols.skip} ${file}`);
    }
    console.log('');
  }

  if (backedUp.length > 0) {
    console.log('Backed up and replaced:');
    for (const file of backedUp) {
      console.log(`  ${symbols.arrow} ${file} → ${file}.bak`);
    }
    console.log('');
  }

  console.log(formatSuccess('Creator Kit updated successfully!'));
  console.log('');

  return {
    exitCode: 0,
    updated: updateResult.updated,
    preserved: updateResult.preserved,
    added: updateResult.added,
    backedUp,
  };
}
