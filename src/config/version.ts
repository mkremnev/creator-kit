/**
 * Package version — injected from package.json at build time via tsup `define`.
 * Single source of truth: package.json → tsup.config.ts → __PKG_VERSION__
 */

declare const __PKG_VERSION__: string;

export const VERSION = __PKG_VERSION__;
