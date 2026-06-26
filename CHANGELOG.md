# @openshock/svelte-core

## 0.2.0

### Minor Changes

- ca28ee6: Add `./state/*` subpath export with the shared `PersistedState` class (and `usePersistedState`) plus the `colorScheme` color-scheme state (`ColorScheme`, `getDarkReaderState`, `initializeColorScheme`). Both are ported to be framework-agnostic — browser detection uses `typeof window` instead of SvelteKit's `$app/environment`.

  With the color-scheme state now living in the library, `LightSwitch` and the `sonner` `Toaster` are self-contained again: they read `colorScheme` directly instead of requiring the consumer to wire `value`/`onValueChange`/`theme` props. `LightSwitch` no longer takes any props.

## 0.1.0

### Minor Changes

- 56f9344: Initial release — shared OpenShock Svelte/SvelteKit core: shadcn-svelte component baseline, design-system theme, custom components (stepper, multi-select-combobox, LightSwitch, metadata SEO tags, datetime-picker, dialog-manager, input fields, and more), utilities, type guards, input validators, shared types, and the pwned-passwords API.
