---
'@openshock/svelte-core': patch
---

`theme.css` now registers the package's components as a Tailwind content source (`@source './components'`). Tailwind v4 auto-detection skips `node_modules`, so previously consumers had to add their own `@source '@openshock/svelte-core'` or utility classes used only inside the library's components would be missing from the generated CSS. Importing `@openshock/svelte-core/theme.css` is now sufficient.
