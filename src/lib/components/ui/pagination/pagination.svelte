<script lang="ts">
  import { m } from '@openshock/svelte-core/paraglide/messages.js';
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import { cn } from '@openshock/svelte-core/utils/shadcn.js';

  let {
    ref = $bindable(null),
    class: className,
    count = 0,
    perPage = 10,
    page = $bindable(1),
    siblingCount = 1,
    ...restProps
  }: PaginationPrimitive.RootProps = $props();
</script>

<PaginationPrimitive.Root
  bind:ref
  bind:page
  role="navigation"
  aria-label={m.pagination_label()}
  data-slot="pagination"
  {count}
  {perPage}
  {siblingCount}
  class={cn('mx-auto flex w-full justify-center', className)}
  {...restProps}
/>
