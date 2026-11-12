# @openshock/svelte-core

Shared Svelte core for OpenShock frontends.

It owns the **shadcn-svelte component baseline**, the **design-system theme**, and a few dependency-light helpers that are common to both the cloud frontend and the firmware captive portal.

It is a plain Svelte component library (built with [`@sveltejs/package`](https://svelte.dev/docs/kit/packaging)), it does **not** depend on SvelteKit, so it works in any Vite + Svelte 5 app.

> **Where this lives:** the package is developed inside the OpenShock
> [Frontend](https://github.com/OpenShock/Frontend) repo as a git submodule at
> `packages/svelte-core`, where it's part of a [Turborepo](https://turbo.build)
> workspace and consumed via `workspace:*`. It is **also** published to npm for
> external consumers — both of the workflows below are supported.

## Install (external consumers)

```sh
pnpm i -D @openshock/svelte-core@latest
```

Peer dependencies (`svelte`, `bits-ui`, `tailwind-variants`, `tailwind-merge`, `clsx`, `@lucide/svelte`, `svelte-sonner`) are expected in the consuming app.

A few are optional and only needed if you use the component that pulls them in (

`@internationalized/date` → calendar/date-picker,

`@tanstack/table-core` → data-table,

`vaul-svelte` → drawer

).

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

## Localization

The strings this package renders itself (dialog and pagination buttons, screen-reader
labels, validation messages) live in `messages/{locale}.json` and are compiled with
[Paraglide JS](https://paraglidejs.com) into `src/lib/paraglide/` by `pnpm install`
(the `prepare` script) and `pnpm run check`. The compiled runtime uses only the
`baseLocale` strategy: this package never detects the locale on its own.

**Apps with Paraglide** hand over their own runtime once per environment, before any
component renders. Locales this package has no catalog for fall back to English.

```ts
// hooks.server.ts and hooks.client.ts
import { getLocale, setLocale } from '$lib/paraglide/runtime.js';
import { initCoreI18n } from '@openshock/svelte-core/i18n';

initCoreI18n({ getLocale, setLocale });
```

To recompile this package's messages as part of your dev server and build, add a second
plugin instance pointing at this package's project:

```ts
paraglideVitePlugin({ project: './packages/svelte-core/project.inlang' });
```

**Apps without i18n** (the firmware captive portal) change nothing and get English. The
other locales ride along in the bundle, but only for the messages the app's components
actually use: a few hundred bytes gzipped for the portal's current handful.

Validators in `inputvalidation/` return a `ValidationIssue` (a `code` plus that code's
inputs, see `types/ValidationResult.ts`) instead of text. `getValidationMessage()` resolves
it in the current locale; `TextInput` does that for you. Apps pass their own already
localized text as `message` instead.

Adding a string: put the key in `messages/en.json`, run `pnpm run i18n:compile`, then use
`m.key()` from `@openshock/svelte-core/paraglide/messages.js`. Keep the locale list in
`project.inlang/settings.json` in sync with the cloud frontend.

## Develop

This package is consumed **from source** as a `workspace:*` dependency — its
`exports` point directly at `src/lib`, so there is no build step. Editing a file
here hot-reloads instantly in any consuming app's dev server. From the frontend
root just run:

```sh
pnpm dev          # frontend dev server; svelte-core source is compiled inline
```

Standalone in this package (showcase playground / isolated work):

```sh
pnpm install
pnpm dev          # showcase playground at src/routes
pnpm check        # svelte-check
```

### Updating shadcn components

The shadcn-svelte components are owned here. To pull registry updates and re-apply the
project customizations, run `pnpm run update-shadcn`. See
[`src/lib/components/ui/README.md`](src/lib/components/ui/README.md) for the list of
customizations and [`NOTES.md`](NOTES.md) for maintainer context.
