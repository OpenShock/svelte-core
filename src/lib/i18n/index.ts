import {
  baseLocale,
  isLocale,
  locales,
  overwriteGetLocale,
  overwriteSetLocale,
  type Locale,
} from '@openshock/svelte-core/paraglide/runtime.js';

export { baseLocale, locales, type Locale };

export interface CoreI18nOptions {
  /**
   * The consuming app's `getLocale` from its own Paraglide runtime. Called every
   * time a message renders, so a request-scoped implementation stays request-safe
   * during SSR. Locales this package has no catalog for fall back to English.
   */
  getLocale: () => string;
  /** The app's `setLocale`. Optional: this package never changes the locale itself. */
  setLocale?: (locale: Locale, options?: { reload?: boolean }) => void | Promise<void>;
}

/**
 * Points this package's Paraglide runtime at the consuming app's locale.
 *
 * This package compiles its messages with `strategy: ['baseLocale']`, so it never
 * detects the locale from URLs, cookies or storage on its own. Call this once per
 * runtime before rendering any component: in `hooks.server.ts` for SSR and in
 * `hooks.client.ts` (or the root layout) for the browser. Apps without i18n skip
 * it and get English.
 *
 * @example
 * import { getLocale, setLocale } from '$lib/paraglide/runtime.js';
 * import { initCoreI18n } from '@openshock/svelte-core/i18n';
 *
 * initCoreI18n({ getLocale, setLocale });
 */
export function initCoreI18n({ getLocale, setLocale }: CoreI18nOptions): void {
  overwriteGetLocale(() => {
    const locale = getLocale();
    return isLocale(locale) ? locale : baseLocale;
  });
  if (setLocale) overwriteSetLocale(setLocale);
}
