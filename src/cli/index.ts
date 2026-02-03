/**
 * CLI entry point
 */

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { VERSION } from '../config/version.js';

const DESCRIPTION = 'CLI tool for scaffolding AI-assisted content creation workflow files';

const program = new Command();

program
  .name('creator')
  .description(DESCRIPTION)
  .version(VERSION, '-V, --version', 'Output version number');

program
  .command('init')
  .description('Initialize creator-kit in current directory')
  .requiredOption('--ai <provider>', 'AI provider (claude)')
  .option('--force', 'Overwrite existing files without prompt', false)
  .action(async (options: { ai: string; force: boolean }) => {
    const result = await initCommand({
      ai: options.ai,
      force: options.force,
    });
    process.exit(result.exitCode);
  });

program
  .command('update')
  .description('Update existing creator-kit installation')
  .option('--force', 'Overwrite modified files (creates .bak)', false)
  .action(async (options: { force: boolean }) => {
    // Import dynamically to avoid loading until needed
    const { updateCommand } = await import('./commands/update.js');
    const result = await updateCommand({
      force: options.force,
      backup: true,
    });
    process.exit(result.exitCode);
  });

program.parse();
