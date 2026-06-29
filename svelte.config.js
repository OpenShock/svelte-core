import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // svelte-core is consumed (and consumes itself) by its own package name so
    // the same specifiers resolve in every app that pulls it in. This alias maps
    // that name to the source so standalone dev/check and the shadcn-svelte CLI
    // (see components.json) can resolve it to a folder.
    alias: {
      '@openshock/svelte-core': 'src/lib',
      '@openshock/svelte-core/*': 'src/lib/*',
    },
  },
};

export default config;
