import { isString } from '@openshock/svelte-core/typeguards/basicGuards.js';

export function isTwitterHandle(value: unknown): value is string {
  return isString(value) && value.startsWith('@');
}
