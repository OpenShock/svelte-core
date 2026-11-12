import { m } from '@openshock/svelte-core/paraglide/messages.js';
import type { ValidationResult } from '@openshock/svelte-core/types/ValidationResult.js';

/**
 * Resolves a validation result to display text in the current locale. A text
 * result returns its `message` as-is; a coded result is looked up in this
 * package's catalog. A valid result without text has nothing to show.
 */
export function getValidationMessage(result: ValidationResult): string | undefined {
  switch (result.code) {
    case undefined:
      return result.message;
    case 'password_too_short':
      return m.validation_password_too_short();
    case 'password_too_long':
      return m.validation_password_too_long({ length: result.length });
    case 'password_only_whitespace':
      return m.validation_password_only_whitespace();
    case 'password_edge_whitespace':
      return m.validation_password_edge_whitespace();
    case 'password_pwned':
      return m.validation_password_pwned({ count: result.count });
    case 'password_checking':
      return m.validation_password_checking();
    case 'passwords_mismatch':
      return m.validation_passwords_mismatch();
    case 'email_invalid':
      return m.validation_email_invalid();
    case 'email_alias':
      return m.validation_email_alias();
    default:
      return result satisfies never;
  }
}
