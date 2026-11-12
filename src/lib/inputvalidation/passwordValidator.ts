import type { TwTextColor } from '@openshock/svelte-core/types/Tailwind.js';
import type { ValidationResult } from '@openshock/svelte-core/types/ValidationResult.js';
import { calculateStringEntropy } from '@openshock/svelte-core/utils/entropy.js';

export function validatePassword(value: string): ValidationResult | null {
  if (value.length == 0) {
    return null;
  }

  if (value.length < 12) {
    return { valid: false, code: 'password_too_short' };
  }

  if (value.length > 256) {
    return { valid: false, code: 'password_too_long', length: value.length };
  }

  const trimmedLength = value.trim().length;
  if (trimmedLength == 0) {
    return { valid: false, code: 'password_only_whitespace' };
  }

  if (trimmedLength != value.length) {
    return { valid: false, code: 'password_edge_whitespace' };
  }

  return { valid: true };
}

export function validatePasswordMatch(
  password: string,
  passwordConfirmation: string
): ValidationResult | null {
  if (password.length == 0) {
    return null;
  }

  if (password != passwordConfirmation) {
    return { valid: false, code: 'passwords_mismatch' };
  }

  return { valid: true };
}

export type PasswordStrengthLevel =
  'none' | 'very_weak' | 'weak' | 'fair' | 'strong' | 'very_strong';

export function getPasswordStrength(value: string): {
  percent: number;
  level: PasswordStrengthLevel;
  color: TwTextColor;
} {
  if (value.length === 0) {
    return { percent: 0, level: 'none', color: 'gray' };
  }

  const percent = Math.min((calculateStringEntropy(value) / 120) * 100, 100);

  if (percent < 30) return { percent, level: 'very_weak', color: 'red' };
  if (percent < 50) return { percent, level: 'weak', color: 'orange' };
  if (percent < 60) return { percent, level: 'fair', color: 'yellow' };
  if (percent < 99) return { percent, level: 'strong', color: 'green' };
  return { percent, level: 'very_strong', color: 'cyan' };
}
