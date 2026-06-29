<script lang="ts">
  import Ellipsis from '@lucide/svelte/icons/ellipsis';
  import { Button } from '@openshock/svelte-core/components/ui/button/index.js';
  import * as DropdownMenu from '@openshock/svelte-core/components/ui/dropdown-menu/index.js';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
        <span class="sr-only">Open menu</span>
        <Ellipsis class="size-4" />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    {@render children?.()}
  </DropdownMenu.Content>
</DropdownMenu.Root>
