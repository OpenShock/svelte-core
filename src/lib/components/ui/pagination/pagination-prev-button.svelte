<script lang="ts">
  import { m } from '@openshock/svelte-core/paraglide/messages.js';
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import { cn } from '@openshock/svelte-core/utils/shadcn.js';
  import { buttonVariants } from '../button/index.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: PaginationPrimitive.PrevButtonProps = $props();
</script>

{#snippet Fallback()}
  <ChevronLeftIcon class={cn('cn-rtl-flip size-4', className)} />
  <span>{m.common_previous()}</span>
{/snippet}

<PaginationPrimitive.PrevButton
  bind:ref
  aria-label={m.pagination_go_to_previous_page()}
  class={cn(buttonVariants({ variant: 'ghost' }), 'pl-1.5!', className)}
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    {@render Fallback()}
  {/if}
</PaginationPrimitive.PrevButton>
