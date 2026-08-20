---
'@openshock/svelte-core': patch
---

Trim the published tarball and tighten package metadata. A `files` field limits
publishing to `src/lib` minus its test files, dropping the repo scaffolding
(`.github/`, `.prettierrc`, `components.json`, `svelte.config.js`,
`vite.config.ts`, `src/routes`, `static/`) that consumers never resolved: 424
files down to 394. Everything `exports` points at still ships.

`exports["./*"]` collapses from a three-entry fallback array to a single
`./src/lib/*` target. This is not a resolution change — Node picks the first
array entry that parses rather than the first that exists, so `./src/lib/*` was
always the one being used, and the `./src/lib/*/index.js` entry matched no files
at all because every barrel is `index.ts`. Removing the array makes bundlers and
Node agree on the same target.

Also drops the unused `@sveltejs/package` dev dependency (`exports` point at
`src/lib`, so there is no build step) and wires `publint --strict` up as a
`lint:package` script.
