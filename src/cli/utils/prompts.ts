/**
 * User prompt utilities
 */

import { createInterface } from 'readline';

export async function confirmAction(message: string, defaultValue = false): Promise<boolean> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const defaultHint = defaultValue ? 'Y/n' : 'y/N';
  const prompt = `${message} (${defaultHint}) `;

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      const normalized = answer.trim().toLowerCase();

      if (normalized === '') {
        resolve(defaultValue);
        return;
      }

      resolve(normalized === 'y' || normalized === 'yes');
    });
  });
}
