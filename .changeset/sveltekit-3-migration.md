---
'@openshock/svelte-core': patch
---

Migrate the repo to SvelteKit 3. `svelte.config.js` is gone — SvelteKit 3 no
longer reads it — so `preprocess` joins the adapter and `compilerOptions`
already passed to `sveltekit()` in `vite.config.ts`. The deprecated
`config.alias` entry is dropped: `@openshock/svelte-core/*` specifiers resolve
through this package's own `exports` field instead, which removes the
deprecation warning that fired on every dev, build, check and test run.
`tsconfig.json` extends `$app/tsconfig` rather than `./.svelte-kit/tsconfig.json`
and uses `include: ["src", "*"]` so `vite.config.ts` stays type-checked, as it
was under the generated config.

Patch rather than minor because nothing under `src/lib` imports `@sveltejs/kit`
— the published source is plain Svelte 5, so consumers on SvelteKit 2 are
unaffected. The new floors (Node 22.17+, Svelte 5.56.4+, Vite 8.0.12+,
`@sveltejs/vite-plugin-svelte` 7+) apply to developing this repo, not to
consuming it.
