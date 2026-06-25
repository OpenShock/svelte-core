# svelte-core — maintainer notes

Shared Svelte/SvelteKit core for OpenShock frontends. Scoped to **what is genuinely
common** between `frontend` (cloud) and `firmware/frontend` (device captive portal):
the shadcn-svelte component baseline, the design-system theme, and a few
dependency-light helpers. App-specific code (API clients, signalr, state, feature
components) intentionally stays in each app.

## What lives here

- `src/lib/components/ui/**` — the full shadcn-svelte component set (superset of what
  both apps use). The library **owns** shadcn now; apps should consume from here instead
  of re-copying the registry into each repo.
- `src/lib/theme.css` — the design tokens, `@theme` mappings, base layer, data-\*
  variants, keyframes and utilities the components rely on. Consumers import it after
  Tailwind. Exported as `@openshock/svelte-core/theme.css`.
- `src/lib/utils/shadcn.ts` — `cn()` + the shadcn prop-type helpers.
- `src/lib/hooks/is-mobile.svelte.ts` — used by `sidebar`.
- `src/lib/typeguards/**` — `basicGuards` (superset incl. `isDate`).

## Decisions worth knowing

### sonner is decoupled from app state

The registry `sonner` pulls its theme from `mode-watcher`; the cloud app overrode that
with its own `color-scheme-state`. Here `sonner` takes `theme` as a prop (default
`'system'`) so it has **no** app coupling. Consumers inject it, e.g.
`<Toaster theme={colorScheme.value} />`. This is the only component that needed a
behavior change to be shareable.

### shadcn customizations

`update-shadcn` re-applies project tweaks after regen (sidebar easing/spacing, slider
cursor, toggle-group warning suppression, the sonner decoupling above). `README.md`
under `components/ui/` documents these; it is excluded from the published tarball.

## Folder layout: ui/ vs components/

`ui/` holds **only** shadcn-svelte registry components, so `update-shadcn` can delete and
regenerate the whole folder with an empty `EXCLUDE`. Everything custom lives under
`components/` instead — including `stepper` (a composable stepper adopted from firmware;
the registry has no stepper) and `multi-select-combobox`. The stepper carries
`// svelte-ignore state_referenced_locally` suppressions for its config props, same as
`toggle-group`.

## Follow-ups not yet done

- **LightSwitch** — both apps have one; they diverge (confirm dialog + DarkReader vs
  bare). Unify and inject color-scheme state, like sonner. The frontend's custom
  monolithic `Stepper.svelte` usage (terminal HelpDialog) should also migrate to the
  composable stepper now living here.
- **Wire up consumers** — point `frontend` and `firmware/frontend` at this package and
  delete their duplicated `ui/`, `cn`, theme tokens, and `basicGuards`.
- **Release/publish** — decide public npm vs GitHub Packages, add Changesets + a publish
  workflow. Until then it can be consumed via `workspace:` / `pnpm link` / `yalc`.
