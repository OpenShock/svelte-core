import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
      },

      // Passing options to sveltekit() makes SvelteKit ignore svelte.config.js
      // entirely, so the kit config (adapter + aliases) must live here. These are
      // KitConfig keys flattened to the top level — they are not nested under a
      // `kit` key (sveltekit() splits known kit options out of this object itself).

      // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
      // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
      // See https://svelte.dev/docs/kit/adapters for more information about adapters.
      adapter: adapter(),

      // svelte-core is consumed (and consumes itself) by its own package name so
      // the same specifiers resolve in every app that pulls it in. This alias maps
      // that name to the source so standalone dev/check and the shadcn-svelte CLI
      // (see components.json) can resolve it to a folder.
      alias: {
        '@openshock/svelte-core': 'src/lib',
        '@openshock/svelte-core/*': 'src/lib/*',
      },
    }),
  ],
  test: {
    expect: { requireAssertions: true },
    projects: [
      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{js,ts}'],
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
        },
      },
    ],
  },
});
