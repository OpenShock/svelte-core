<script lang="ts">
  import { m } from '@openshock/svelte-core/paraglide/messages.js';
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { buttonVariants } from '@openshock/svelte-core/components/ui/button/index.js';
  import { cn } from '@openshock/svelte-core/utils/shadcn.js';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: PaginationPrimitive.NextButtonProps = $props();
</script>

<PaginationPrimitive.NextButton
  bind:ref
  aria-label={m.pagination_go_to_next_page()}
  class={cn(buttonVariants({ variant: 'ghost', size: 'default' }), 'pr-1.5!', className)}
  {...restProps}
>
  <span class="hidden sm:block">{m.common_next()}</span>
  <ChevronRightIcon data-icon="inline-end" class="cn-rtl-flip" />
</PaginationPrimitive.NextButton>
