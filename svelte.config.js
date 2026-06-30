import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
// NOTE: this file is IGNORED at build time. vite.config.ts passes options to
// sveltekit(), which makes SvelteKit ignore svelte.config.js entirely. The real
// SvelteKit config — including the `@openshock/svelte-core` aliases that the
// shadcn-svelte CLI (see components.json) and `svelte-check` resolve against —
// lives in vite.config.ts. This file is kept only for tooling that reads it
// directly; keep it in sync with vite.config.ts.
const config = {
  preprocess: vitePreprocess(),
  kit: {
    alias: {
      '@openshock/svelte-core': 'src/lib',
      '@openshock/svelte-core/*': 'src/lib/*',
    },
  },
};

export default config;
