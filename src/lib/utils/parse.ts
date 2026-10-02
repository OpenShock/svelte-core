/**
 * Coerces an env-var / URL-param style value into a boolean.
 *
 * Truthy: `true`, the number `1`, or a case-insensitive `'1'`, `'true'`, `'yes'`, `'y'`, or `'on'`.
 *
 * Everything else - including `null`, `undefined`, other numbers, and unrecognized strings - is falsy.
 *
 * @param value - The value to coerce (typically an environment variable or query parameter)
 * @returns `true` when the value matches a recognized truthy form, `false` otherwise
 *
 * @example
 * ```ts
 * isTruthy(env.PUBLIC_DISABLE_SITEMAP) // false when unset, true when "1" / "true"
 * ```
 */
export function isTruthy(value: boolean | number | string | null | undefined): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  if (typeof value !== 'string') return false;
  if (value == '1') return true;

  value = value.toLowerCase();

  return value === 'true' || value === 'yes' || value === 'y' || value === 'on';
}
