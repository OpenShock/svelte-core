import { describe, expect, it } from 'vitest';
import { getPasswordStrength, validatePassword, validatePasswordMatch } from './passwordValidator';

describe('validatePassword', () => {
  it('returns null for an empty value so the field shows no state', () => {
    expect(validatePassword('')).toBeNull();
  });

  it('returns a code, not a sentence, for each failure', () => {
    expect(validatePassword('short')).toEqual({ valid: false, code: 'password_too_short' });
    expect(validatePassword(' '.repeat(12))).toEqual({
      valid: false,
      code: 'password_only_whitespace',
    });
    expect(validatePassword(' correct horse battery')).toEqual({
      valid: false,
      code: 'password_edge_whitespace',
    });
    expect(validatePassword('a'.repeat(257))).toEqual({
      valid: false,
      code: 'password_too_long',
      length: 257,
    });
  });

  it('accepts a long enough trimmed password', () => {
    expect(validatePassword('correct horse battery staple')).toEqual({ valid: true });
  });
});

describe('validatePasswordMatch', () => {
  it('flags a mismatch and accepts a match', () => {
    expect(validatePasswordMatch('abc', 'abd')).toEqual({
      valid: false,
      code: 'passwords_mismatch',
    });
    expect(validatePasswordMatch('abc', 'abc')).toEqual({ valid: true });
    expect(validatePasswordMatch('', 'x')).toBeNull();
  });
});

describe('getPasswordStrength', () => {
  it('maps an empty value to the none level', () => {
    expect(getPasswordStrength('')).toEqual({ percent: 0, level: 'none', color: 'gray' });
  });

  it('rates a long random string stronger than a short repeated one', () => {
    const weak = getPasswordStrength('aaaa');
    const strong = getPasswordStrength('kR9#vL2$pQ7!mX4&wZ8^nB3*');
    expect(weak.percent).toBeLessThan(strong.percent);
    expect(weak.level).toBe('very_weak');
  });
});
