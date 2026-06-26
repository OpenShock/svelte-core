---
'@openshock/svelte-core': patch
---

Fix consumption in a SvelteKit dev server. Importing components via raw `.svelte`-file subpaths (e.g. `components/input/PasswordInput.svelte`) made Vite's dependency scanner crawl into the file and fail on its relative imports. The component directories are now exposed via JS barrel index files — `components`, `components/input`, `components/svg`, `components/datetime-picker`, `components/dialog-manager` — so consumers import named exports (like `ui/*` and `stepper` already do) and Vite treats the package as a Svelte library. Also add the missing `default` export condition to `.` and `./hooks/is-mobile.svelte`.
