---
'@openshock/svelte-core': patch
---

Bump dev dependencies (`@sveltejs/kit`, `svelte`, `vite`, `@changesets/cli`) and fix the `update-shadcn` script so re-running it leaves no diff. The script's patches run after Prettier, but several patterns assumed tab indentation or double quotes and silently no-op'd, and the sonner patch rewrote the component to a consumer-injected `theme` prop that never matched the committed `colorScheme` form. Patterns are now indent/quote-agnostic, the sonner patch maps mode-watcher back to `$lib/state/color-scheme-state`, and `patch()` throws on a no-op so a stale customization fails loudly instead of emitting broken output.
