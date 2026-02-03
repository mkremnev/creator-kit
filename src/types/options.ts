/**
 * Command options type definitions
 */

export interface InitOptions {
  ai: string;
  force: boolean;
  dryRun?: boolean;
}

export interface UpdateOptions {
  force: boolean;
  backup: boolean;
}
