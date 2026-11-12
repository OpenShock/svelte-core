import { defineConfig } from '@inlang/paraglide-js';

// This package owns the strings its components render themselves (sr-only labels,
// dialog buttons, validation messages). It never detects the locale: consuming
// apps hand over their own Paraglide runtime's `getLocale`/`setLocale` through
// `initCoreI18n()` (see src/lib/i18n), so `baseLocale` is the only strategy and
// apps without i18n simply get English.
export default defineConfig({
  outdir: './src/lib/paraglide',
  emitTsDeclarations: true,
  // Pinned so the CLI (used by `prepare`/`check`) and the Vite plugin emit the same layout.
  outputStructure: 'message-modules',
  strategy: ['baseLocale'],
});
