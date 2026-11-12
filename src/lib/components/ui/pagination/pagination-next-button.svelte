<script lang="ts">
  import { m } from '@openshock/svelte-core/paraglide/messages.js';
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { cn } from '@openshock/svelte-core/utils/shadcn.js';
  import { buttonVariants } from '../button/index.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: PaginationPrimitive.NextButtonProps = $props();
</script>

{#snippet Fallback()}
  <span>{m.common_next()}</span>
  <ChevronRightIcon class={cn('cn-rtl-flip size-4', className)} />
{/snippet}

<PaginationPrimitive.NextButton
  bind:ref
  aria-label={m.pagination_go_to_next_page()}
  class={cn(buttonVariants({ variant: 'ghost' }), 'pr-1.5!', className)}
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    {@render Fallback()}
  {/if}
</PaginationPrimitive.NextButton>
