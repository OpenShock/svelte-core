<script lang="ts">
  import { m } from '@openshock/svelte-core/paraglide/messages.js';
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import { buttonVariants } from '@openshock/svelte-core/components/ui/button/index.js';
  import { cn } from '@openshock/svelte-core/utils/shadcn.js';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: PaginationPrimitive.PrevButtonProps = $props();
</script>

<PaginationPrimitive.PrevButton
  bind:ref
  aria-label={m.pagination_go_to_previous_page()}
  class={cn(buttonVariants({ variant: 'ghost', size: 'default' }), 'pl-1.5!', className)}
  {...restProps}
>
  <ChevronLeftIcon data-icon="inline-start" class="cn-rtl-flip" />
  <span class="hidden sm:block">{m.common_previous()}</span>
</PaginationPrimitive.PrevButton>
