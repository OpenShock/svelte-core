# Updating shadcn-svelte Components

Everything in this directory comes from the shadcn-svelte registry **except** `multi-select-combobox`.

## How to Update

Run the update script from the project root:

```bash
pnpm run update-shadcn
```

This will automatically:

1. Delete all shadcn component directories (preserving `multi-select-combobox`)
2. Re-add them from the registry
3. Remove unwanted dependencies the CLI adds
4. Reapply project-specific customizations (see below)
5. Format and type-check the result

Review the git diff before committing.

## Custom Modifications

These are automatically applied by the script, but documented here for reference.

### Sidebar (`sidebar.svelte`)

- Change `ease-linear` to `ease-in-out`
- Change `duration-200` to `duration-300`

### Sidebar submenu (`sidebar-menu-sub.svelte`)

- Change `mx-3.5` to `ml-3.5`
- Change `px-2.5` to `pl-2.5`

### Sonner (`sonner.svelte`)

- Strip `mode-watcher`; `theme` is a consumer-injected prop (default `'system'`).
  Consumers pass their own color scheme, e.g. `<Toaster theme={colorScheme.value} />`.

### Slider (`slider.svelte`)

- Add `cursor-w-resize` to the thumb

### Toggle group (`toggle-group.svelte`)

- Add `// svelte-ignore state_referenced_locally` to suppress false warnings
