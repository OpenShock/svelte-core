import type { TwTextColor } from '@openshock/svelte-core/types/Tailwind.js';

/**
 * Every reason this package's validators can report, each with exactly the inputs
 * its message needs. Resolve to text with `getValidationMessage`. Adding a member
 * here fails `getValidationMessage`'s exhaustiveness check until it is handled.
 */
export type ValidationIssue =
  | { code: 'password_too_short' }
  | { code: 'password_too_long'; length: number }
  | { code: 'password_only_whitespace' }
  | { code: 'password_edge_whitespace' }
  | { code: 'password_pwned'; count: number }
  | { code: 'password_checking' }
  | { code: 'passwords_mismatch' }
  | { code: 'email_invalid' }
  | { code: 'email_alias' };

export type ValidationCode = ValidationIssue['code'];

type ValidationResultBase = {
  color?: TwTextColor;
  link?: { text: string; href: string };
};

/** A result whose text the app already localized itself; may be valid or not. */
export type TextValidationResult = ValidationResultBase & {
  valid: boolean;
  message?: string;
  code?: never;
};

/** A failure produced by this package's validators, identified by `code`. */
export type CodedValidationResult = ValidationResultBase &
  ValidationIssue & {
    valid: false;
    message?: never;
  };

export type ValidationResult = TextValidationResult | CodedValidationResult;

export function GetValResColor(valRes: ValidationResult): TwTextColor {
  if (valRes.color !== undefined) return valRes.color;
  return valRes.valid ? 'green' : 'red';
}
