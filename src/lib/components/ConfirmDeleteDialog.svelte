<script lang="ts">
  import { Button } from '@openshock/svelte-core/components/ui/button/index.js';
  import * as Dialog from '@openshock/svelte-core/components/ui/dialog/index.js';
  import type { Snippet } from 'svelte';

  interface Props {
    open: boolean;
    title: string;
    description: Snippet;
    /** Button label. Defaults to "Delete". */
    actionLabel?: string;
    onConfirm: () => void | Promise<void>;
    /** Optional extra content between the header and the action button. */
    children?: Snippet;
  }

  let {
    open = $bindable(),
    title,
    description,
    actionLabel = 'Delete',
    onConfirm,
    children,
  }: Props = $props();
</script>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{@render description()}</Dialog.Description>
    </Dialog.Header>
    {@render children?.()}
    <Button variant="destructive" onclick={onConfirm}>{actionLabel}</Button>
  </Dialog.Content>
</Dialog.Root>
