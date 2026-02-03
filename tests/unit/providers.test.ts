import { describe, it, expect } from 'vitest';
import {
  getProvider,
  isProviderSupported,
  getSupportedProviderIds,
  CLAUDE_PROVIDER,
} from '../../src/config/providers.js';

describe('providers', () => {
  describe('getProvider', () => {
    it('should return Claude provider for id "claude"', () => {
      const provider = getProvider('claude');
      expect(provider).toBeDefined();
      expect(provider?.id).toBe('claude');
      expect(provider?.name).toBe('Claude');
      expect(provider?.commandsDir).toBe('.claude/commands');
      expect(provider?.commandPrefix).toBe('creator');
    });

    it('should return undefined for unknown provider id', () => {
      const provider = getProvider('unknown');
      expect(provider).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      const provider = getProvider('');
      expect(provider).toBeUndefined();
    });
  });

  describe('isProviderSupported', () => {
    it('should return true for "claude"', () => {
      expect(isProviderSupported('claude')).toBe(true);
    });

    it('should return false for unsupported provider', () => {
      expect(isProviderSupported('qwen')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isProviderSupported('')).toBe(false);
    });
  });

  describe('getSupportedProviderIds', () => {
    it('should return array containing "claude"', () => {
      const ids = getSupportedProviderIds();
      expect(ids).toContain('claude');
    });

    it('should return non-empty array', () => {
      const ids = getSupportedProviderIds();
      expect(ids.length).toBeGreaterThan(0);
    });
  });

  describe('CLAUDE_PROVIDER', () => {
    it('should have correct structure', () => {
      expect(CLAUDE_PROVIDER).toEqual({
        id: 'claude',
        name: 'Claude',
        commandsDir: '.claude/commands',
        commandPrefix: 'creator',
        supported: true,
      });
    });
  });
});
