/**
 * Provider validation for init command
 */

import { isProviderSupported, getSupportedProviderIds, getProvider } from '../../../config/providers.js';
import type { AIProvider } from '../../../config/providers.js';

export interface ValidationResult {
  valid: boolean;
  provider?: AIProvider;
  error?: string;
}

export function validateProvider(providerId: string): ValidationResult {
  if (!providerId || providerId.trim() === '') {
    return {
      valid: false,
      error: 'Missing required flag: --ai',
    };
  }

  if (!isProviderSupported(providerId)) {
    const supported = getSupportedProviderIds().join(', ');
    return {
      valid: false,
      error: `Unsupported AI provider '${providerId}'\n\nSupported providers:\n  - ${supported}\n\nUsage: creator init --ai <provider>`,
    };
  }

  const provider = getProvider(providerId);
  if (!provider) {
    return {
      valid: false,
      error: `Provider configuration not found for '${providerId}'`,
    };
  }

  return {
    valid: true,
    provider,
  };
}
