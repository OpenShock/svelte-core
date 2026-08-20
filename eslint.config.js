import svelte from 'eslint-plugin-svelte';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

// `svelte.configs.base` wires up the parser and plugin without enabling any
// rules. Formatting stays prettier's job (`pnpm run lint` runs both), and the
// shadcn-svelte baseline this package vendors does not currently pass
// eslint-plugin-svelte's `recommended` preset — so rules are opted into
// individually rather than by preset.
export default ts.config(
  { ignores: ['.svelte-kit/', 'dist/', 'build/'] },
  // Existing `eslint-disable` comments target rules this config does not enable
  // yet; they stay put for whenever the `recommended` preset is turned on.
  { linterOptions: { reportUnusedDisableDirectives: 'off' } },
  ...svelte.configs.base,
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig,
      },
    },
    rules: {
      'svelte/prefer-attribute-interpolation': 'error',
    },
  }
);
