---
'@openshock/svelte-core': minor
---

Add `./state/*` subpath export with the shared `PersistedState` class (and `usePersistedState`) plus the `colorScheme` color-scheme state (`ColorScheme`, `getDarkReaderState`, `initializeColorScheme`). Both are ported to be framework-agnostic — browser detection uses `typeof window` instead of SvelteKit's `$app/environment`.
