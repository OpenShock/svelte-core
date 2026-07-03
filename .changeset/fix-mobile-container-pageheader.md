---
'@openshock/svelte-core': patch
---

Improve mobile scaling of `Container` and `PageHeader`. `Container` now uses tighter horizontal padding on small screens (`px-2`, unchanged from `sm:` up). `PageHeader` stacks the title and action slot vertically on mobile and hides the `h1` below the `sm` breakpoint, only revealing it (and the horizontal `ml-auto` action layout) from `sm:` up.
