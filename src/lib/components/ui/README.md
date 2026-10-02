# Updating shadcn-svelte Components

Every component directory in here comes from the shadcn-svelte registry and is
regenerated wholesale by the update script, so **do not hand-edit them** — any change
has to go into `scripts/update-shadcn.js` or it will be lost on the next update.
Custom components live under `src/lib/components/` instead, where the regen never
touches them.

## How to Update

Run the update script from the project root:

```bash
pnpm run update-shadcn
```

This will automatically:

1. Delete all shadcn component directories
2. Re-add them from the registry
3. Remove unwanted dependencies the CLI adds (`mode-watcher`)
4. Reapply project-specific customizations (see below)
5. Format and type-check the result

Review the git diff before committing.

## Custom Modifications

These are applied by the script, and documented here for reference. The patches run
_after_ `pnpm run format`, so they match against formatted output. A patch that no
longer applies fails the script loudly rather than silently dropping the
customization — when that happens, the upstream component changed and the patch needs
updating here and in the script.

### Sidebar (`sidebar.svelte`)

- Change `ease-linear` to `ease-in-out`
- Change `duration-200` to `duration-300`

### Sidebar menu (`sidebar-menu.svelte`)

- Change `gap-0` to `gap-1`, so hover/active highlights on adjacent items don't touch

### Sonner (`sonner.svelte`)

- Drop the `mode-watcher` import and source the theme from our own color-scheme
  state: `theme={colorScheme.value}`. The import uses the
  `@openshock/svelte-core` self-reference rather than `$lib`, which would not
  resolve once the package is published.

### Slider (`slider.svelte`)

- Add `cursor-w-resize` to the thumb

### Toggle group (`toggle-group.svelte`)

- Rewrite ``style={`--gap: ${spacing}`}`` as `style="--gap: {spacing}"` to satisfy
  `svelte/prefer-attribute-interpolation`

### Chart tooltip (`chart-tooltip.svelte`)

- Strip the registry's `eslint-disable-next-line @typescript-eslint/no-explicit-any`
  comments; `eslint.config.js` never registers the typescript-eslint rules, so eslint
  errors on the unknown rule name
