/**
 * Environment variable utilities
 */

export function isDebugMode(): boolean {
  return process.env['CREATOR_KIT_DEBUG'] === 'true' || process.env['CREATOR_KIT_DEBUG'] === '1';
}

export function isNoColor(): boolean {
  return process.env['NO_COLOR'] !== undefined;
}

export function debug(message: string): void {
  if (isDebugMode()) {
    console.error(`[DEBUG] ${message}`);
  }
}
