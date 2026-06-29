// @openshock/svelte-core
//
// Components are consumed via subpath exports to keep tree-shaking tight, e.g.
//   import { Button } from '@openshock/svelte-core/components/ui/button/index.js';
//   import { cn } from '@openshock/svelte-core/utils/shadcn.js';
// and the design-system theme via
//   import '@openshock/svelte-core/theme.css';
//
// This barrel re-exports the small, dependency-light shared helpers.

export { IsMobile } from './hooks/is-mobile.svelte';
export * from './typeguards';
export { cn } from './utils/shadcn';
export type {
  WithElementRef,
  WithoutChild,
  WithoutChildren,
  WithoutChildrenOrChild,
} from './utils/shadcn';
