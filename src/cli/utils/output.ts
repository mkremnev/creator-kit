/**
 * Output formatting utilities with color support
 */

import chalk from 'chalk';

const noColor = process.env['NO_COLOR'] !== undefined;

function colorize(text: string, colorFn: (text: string) => string): string {
  return noColor ? text : colorFn(text);
}

export function success(text: string): string {
  return colorize(text, chalk.green);
}

export function error(text: string): string {
  return colorize(text, chalk.red);
}

export function warn(text: string): string {
  return colorize(text, chalk.yellow);
}

export function info(text: string): string {
  return colorize(text, chalk.cyan);
}

export function dim(text: string): string {
  return colorize(text, chalk.dim);
}

export function bold(text: string): string {
  return colorize(text, chalk.bold);
}

export const symbols = {
  check: noColor ? '[OK]' : chalk.green('✓'),
  cross: noColor ? '[FAIL]' : chalk.red('✗'),
  warning: noColor ? '[WARN]' : chalk.yellow('⚠'),
  info: noColor ? '[INFO]' : chalk.cyan('ℹ'),
  arrow: noColor ? '->' : '→',
  skip: noColor ? '[-]' : chalk.dim('⊘'),
};

export function formatFileCount(category: string, count: number): string {
  return `${symbols.check} Created ${category} (${count} file${count === 1 ? '' : 's'})`;
}

export function formatError(message: string): string {
  return `${error('Error:')} ${message}`;
}

export function formatSuccess(message: string): string {
  return success(message);
}
