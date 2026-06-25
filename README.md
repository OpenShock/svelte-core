# @openshock/svelte-core

Shared Svelte/SvelteKit core for OpenShock frontends. It owns the **shadcn-svelte
component baseline**, the **design-system theme**, and a few dependency-light helpers
that are common to both the cloud frontend and the firmware captive portal. It is a
plain Svelte component library (built with [`@sveltejs/package`](https://svelte.dev/docs/kit/packaging)) —
it does **not** depend on SvelteKit, so it works in any Vite + Svelte 5 app.

## Install

```sh
pnpm add @openshock/svelte-core
```

Peer dependencies (`svelte`, `bits-ui`, `tailwind-variants`, `tailwind-merge`, `clsx`,
`@lucide/svelte`, `svelte-sonner`) are expected in the consuming app. A few are optional
and only needed if you use the component that pulls them in (`@internationalized/date`
→ calendar/date-picker, `@tanstack/table-core` → data-table, `vaul-svelte` → drawer,
`formsnap` + `sveltekit-superforms` → form).

## Usage

Import the design-system theme once in your app's CSS, after Tailwind:

```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import '@openshock/svelte-core/theme.css';
```

Then import components by subpath:

```svelte
<script lang="ts">
  import { Button } from '@openshock/svelte-core/ui/button';
  import { Toaster } from '@openshock/svelte-core/ui/sonner';
  import { cn } from '@openshock/svelte-core/utils/shadcn';
</script>

<!-- sonner takes its theme as a prop — inject your app's color scheme -->
<Toaster theme="system" />
<Button>Click me</Button>
```

## Develop

```sh
pnpm install
pnpm dev      # showcase playground at src/routes
pnpm check    # svelte-check
pnpm build    # svelte-package → dist/ + publint
```

### Updating shadcn components

The shadcn-svelte components are owned here. To pull registry updates and re-apply the
project customizations, run `pnpm run update-shadcn`. See
[`src/lib/components/ui/README.md`](src/lib/components/ui/README.md) for the list of
customizations and [`NOTES.md`](NOTES.md) for maintainer context.
