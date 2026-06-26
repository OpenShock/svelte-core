# @openshock/svelte-core

## 0.2.2

### Patch Changes

- e267bc3: Fix consumption in a SvelteKit dev server. Importing components via raw `.svelte`-file subpaths (e.g. `components/input/PasswordInput.svelte`) made Vite's dependency scanner crawl into the file and fail on its relative imports. The component directories are now exposed via JS barrel index files — `components`, `components/input`, `components/svg`, `components/datetime-picker`, `components/dialog-manager` — so consumers import named exports (like `ui/*` and `stepper` already do) and Vite treats the package as a Svelte library. Also add the missing `default` export condition to `.` and `./hooks/is-mobile.svelte`.

## 0.2.1

### Patch Changes

- 9a6c73b: `theme.css` now registers the package's components as a Tailwind content source (`@source './components'`). Tailwind v4 auto-detection skips `node_modules`, so previously consumers had to add their own `@source '@openshock/svelte-core'` or utility classes used only inside the library's components would be missing from the generated CSS. Importing `@openshock/svelte-core/theme.css` is now sufficient.

## 0.2.0

### Minor Changes

- ca28ee6: Add `./state/*` subpath export with the shared `PersistedState` class (and `usePersistedState`) plus the `colorScheme` color-scheme state (`ColorScheme`, `getDarkReaderState`, `initializeColorScheme`). Both are ported to be framework-agnostic — browser detection uses `typeof window` instead of SvelteKit's `$app/environment`.

  With the color-scheme state now living in the library, `LightSwitch` and the `sonner` `Toaster` are self-contained again: they read `colorScheme` directly instead of requiring the consumer to wire `value`/`onValueChange`/`theme` props. `LightSwitch` no longer takes any props.

## 0.1.0

### Minor Changes

- 56f9344: Initial release — shared OpenShock Svelte/SvelteKit core: shadcn-svelte component baseline, design-system theme, custom components (stepper, multi-select-combobox, LightSwitch, metadata SEO tags, datetime-picker, dialog-manager, input fields, and more), utilities, type guards, input validators, shared types, and the pwned-passwords API.
