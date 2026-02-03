import { describe, it, expect } from 'vitest';
import { determineFileStatus } from '../../src/cli/commands/update/status.js';

describe('file status detection', () => {
  describe('determineFileStatus', () => {
    it('should return "new" when file does not exist', () => {
      const status = determineFileStatus({
        exists: false,
        currentHash: undefined,
        originalHash: undefined,
        bundledHash: 'sha256:abc123',
      });

      expect(status).toBe('new');
    });

    it('should return "unchanged" when current matches original', () => {
      const hash = 'sha256:abc123';
      const status = determineFileStatus({
        exists: true,
        currentHash: hash,
        originalHash: hash,
        bundledHash: hash,
      });

      expect(status).toBe('unchanged');
    });

    it('should return "modified" when current differs from original but bundled is same', () => {
      const status = determineFileStatus({
        exists: true,
        currentHash: 'sha256:modified',
        originalHash: 'sha256:original',
        bundledHash: 'sha256:original',
      });

      expect(status).toBe('modified');
    });

    it('should return "updated" when bundled differs from original but current matches original', () => {
      const status = determineFileStatus({
        exists: true,
        currentHash: 'sha256:original',
        originalHash: 'sha256:original',
        bundledHash: 'sha256:newversion',
      });

      expect(status).toBe('updated');
    });

    it('should return "conflict" when both user modified and template updated', () => {
      const status = determineFileStatus({
        exists: true,
        currentHash: 'sha256:usermodified',
        originalHash: 'sha256:original',
        bundledHash: 'sha256:newversion',
      });

      expect(status).toBe('conflict');
    });

    it('should return "new" when original hash is missing (new file in update)', () => {
      const status = determineFileStatus({
        exists: false,
        currentHash: undefined,
        originalHash: undefined,
        bundledHash: 'sha256:newfile',
      });

      expect(status).toBe('new');
    });
  });
});
