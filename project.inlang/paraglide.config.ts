import { defineConfig } from '@inlang/paraglide-js';

// This package owns the strings its components render themselves (sr-only labels,
// dialog buttons, validation messages). It never detects the locale: consuming
// apps hand over their own Paraglide runtime's `getLocale`/`setLocale` through
// `initCoreI18n()` (see src/lib/i18n), so `baseLocale` is the only strategy and
// apps without i18n simply get English.
export default defineConfig({
  outdir: './src/lib/paraglide',
  emitTsDeclarations: true,
  // The compiler would drop a `.gitignore` with `*` into the outdir. npm honours
  // nested ignore files when packing `files`, so that would strip the generated
  // runtime from the published tarball. The repository-level .gitignore and
  // .prettierignore cover the directory instead.
  emitGitIgnore: false,
  emitPrettierIgnore: false,
  // Pinned so the CLI (used by `prepare`/`check`) and the Vite plugin emit the same layout.
  outputStructure: 'message-modules',
  strategy: ['baseLocale'],
});
