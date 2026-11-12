import { describe, expect, it } from 'vitest';
import { validateEmail } from './emailValidator';

describe('validateEmail', () => {
  it('returns null for an empty value', () => {
    expect(validateEmail('')).toBeNull();
  });

  it('returns codes for malformed addresses and aliases', () => {
    expect(validateEmail('not-an-email')).toEqual({ valid: false, code: 'email_invalid' });
    expect(validateEmail('user+tag@example.com')).toEqual({ valid: false, code: 'email_alias' });
  });

  it('accepts a plain address', () => {
    expect(validateEmail('user@example.com')).toEqual({ valid: true });
  });
});
