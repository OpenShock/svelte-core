import svelte from 'eslint-plugin-svelte';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

// Formatting is prettier's job — `svelte.configs.prettier` turns off the rules
// that would fight it, and `pnpm run lint` runs both tools.
export default ts.config(
  { ignores: ['.svelte-kit/', 'dist/', 'build/'] },
  ...svelte.configs.recommended,
  ...svelte.configs.prettier,
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

      // Matches the consuming app, and makes the `eslint-disable` comments this
      // package already carries for it meaningful.
      'no-useless-assignment': 'warn',

      // Components here take `href` as a prop and cannot resolve it: the target
      // belongs to whichever app mounts them, and may well be external. The rule
      // stays on in the consuming app, which does own its routes.
      'svelte/no-navigation-without-resolve': 'off',
    },
  }
);
