/**
 * Creator metadata type definitions
 */

export interface CreatorMeta {
  version: string;
  provider: string;
  installedAt: string;
  updatedAt?: string;
  fileHashes: Record<string, string>;
}
