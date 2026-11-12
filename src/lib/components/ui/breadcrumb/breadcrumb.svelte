<script lang="ts">
  import { m } from '@openshock/svelte-core/paraglide/messages.js';
  import type { WithElementRef } from '@openshock/svelte-core/utils/shadcn.js';
  import { cn } from '@openshock/svelte-core/utils/shadcn.js';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<nav
  bind:this={ref}
  data-slot="breadcrumb"
  aria-label={m.breadcrumb_label()}
  class={cn(className)}
  {...restProps}
>
  {@render children?.()}
</nav>
