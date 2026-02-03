/**
 * AI Provider configuration and definitions
 */

export interface AIProvider {
  id: string;
  name: string;
  commandsDir: string;
  commandPrefix: string;
  supported: boolean;
}

export const CLAUDE_PROVIDER: AIProvider = {
  id: 'claude',
  name: 'Claude',
  commandsDir: '.claude/commands',
  commandPrefix: 'creator',
  supported: true,
};

export const SUPPORTED_PROVIDERS: readonly AIProvider[] = [CLAUDE_PROVIDER] as const;

export function getProvider(id: string): AIProvider | undefined {
  return SUPPORTED_PROVIDERS.find((p) => p.id === id);
}

export function isProviderSupported(id: string): boolean {
  return SUPPORTED_PROVIDERS.some((p) => p.id === id && p.supported);
}

export function getSupportedProviderIds(): string[] {
  return SUPPORTED_PROVIDERS.filter((p) => p.supported).map((p) => p.id);
}
