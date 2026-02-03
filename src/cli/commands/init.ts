/**
 * Init command handler
 */

import type { InitOptions } from '../../types/options.js';
import { validateProvider } from './init/validate.js';
import { detectExistingInstallation } from './init/detect.js';
import { buildManifest } from './init/manifest.js';
import { scaffoldFiles, countFilesByCategory } from './init/scaffold.js';
import { createMeta, writeMeta } from './init/meta.js';
import { isWritable } from '../utils/files.js';
import { confirmAction } from '../utils/prompts.js';
import { formatFileCount, formatError, formatSuccess, symbols } from '../utils/output.js';

export interface InitResult {
  exitCode: number;
  error?: string;
  alreadyInitialized?: boolean;
}

export async function initCommand(options: InitOptions): Promise<InitResult> {
  const targetDir = process.cwd();

  // Validate provider
  const validation = validateProvider(options.ai);
  if (!validation.valid || !validation.provider) {
    console.error(formatError(validation.error ?? 'Invalid provider'));
    return { exitCode: 2, error: validation.error };
  }

  const provider = validation.provider;

  // Check write permissions
  if (!(await isWritable(targetDir))) {
    const errorMsg = `Permission denied: cannot write to ${targetDir}`;
    console.error(formatError(errorMsg));
    console.error('\nCheck that you have write access to this directory.');
    return { exitCode: 3, error: errorMsg };
  }

  // Detect existing installation
  const detection = await detectExistingInstallation(targetDir);

  if (detection.initialized && !options.force) {
    console.log('Creator Kit is already initialized in this directory.\n');

    // In non-interactive mode (tests), return early
    if (!process.stdin.isTTY) {
      return { exitCode: 0, alreadyInitialized: true };
    }

    const shouldOverwrite = await confirmAction('Overwrite existing files?', false);
    if (!shouldOverwrite) {
      console.log('\nOperation cancelled.');
      return { exitCode: 4, alreadyInitialized: true };
    }
  }

  // Build manifest and scaffold
  const manifest = buildManifest(provider);
  const result = await scaffoldFiles(manifest, targetDir);

  if (!result.success) {
    console.error(formatError(result.error ?? 'Failed to scaffold files'));
    const exitCode = result.isPermissionError === true ? 3 : 1;
    return { exitCode, error: result.error };
  }

  // Write metadata
  const meta = createMeta(provider.id, result.fileHashes);
  await writeMeta(meta, targetDir);

  // Output success message
  const counts = countFilesByCategory(manifest.files);

  console.log('');
  if (counts['command'] !== undefined && counts['command'] > 0) {
    console.log(formatFileCount('.claude/commands/', counts['command']));
  }
  if (counts['content'] !== undefined && counts['content'] > 0) {
    console.log(formatFileCount('.contents/templates/content/', counts['content']));
  }
  if (counts['workflow'] !== undefined && counts['workflow'] > 0) {
    console.log(formatFileCount('.contents/templates/workflow/', counts['workflow']));
  }
  if (counts['script'] !== undefined && counts['script'] > 0) {
    console.log(formatFileCount('.contents/scripts/bash/', counts['script']));
  }
  if (counts['memory'] !== undefined && counts['memory'] > 0) {
    console.log(`${symbols.check} Created .contents/memory/constitution.md`);
  }
  if (counts['config'] !== undefined && counts['config'] > 0) {
    console.log(`${symbols.check} Created .contents/config.json`);
  }

  console.log('');
  console.log(formatSuccess('Creator Kit initialized successfully!'));
  console.log('');
  console.log('Next steps:');
  console.log('  1. Open Claude in this directory');
  console.log('  2. Run /creator.constitution to set up your content principles');
  console.log('  3. Run /creator.brief "your idea" to start creating');
  console.log('');

  return { exitCode: 0 };
}
