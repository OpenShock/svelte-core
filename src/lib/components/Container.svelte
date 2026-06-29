<script lang="ts">
  import type { ChildrenFunc } from '@openshock/svelte-core/types/ChildrenFunc.js';
  import { cn } from '@openshock/svelte-core/utils/index.js';

  interface Props {
    children: ChildrenFunc;
    class?: string;
  }

  let { children, class: className }: Props = $props();
</script>

<div
  class={cn(
    'container mx-auto flex h-full flex-col items-start justify-start gap-4 px-4 pt-4 pb-1 sm:px-12 sm:pt-12 sm:pb-2',
    className
  )}
>
  {@render children()}
</div>
