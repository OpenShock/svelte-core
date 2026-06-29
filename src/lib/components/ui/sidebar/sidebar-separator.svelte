<script lang="ts">
  import { Separator } from '@openshock/svelte-core/components/ui/separator/index.js';
  import { cn } from '@openshock/svelte-core/utils/shadcn.js';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof Separator> = $props();
</script>

<Separator
  bind:ref
  data-slot="sidebar-separator"
  data-sidebar="separator"
  class={cn('bg-sidebar-border mx-2 w-auto', className)}
  {...restProps}
/>
