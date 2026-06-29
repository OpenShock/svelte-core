import type { TwTextColor } from '@openshock/svelte-core/types/Tailwind.js';

export type ValidationResult = {
  valid: boolean;
  message?: string;
  color?: TwTextColor;
  link?: { text: string; href: string };
};

export function GetValResColor(valRes: ValidationResult): TwTextColor {
  if (valRes.color !== undefined) return valRes.color;
  return valRes.valid ? 'green' : 'red';
}
