<script lang="ts">
  import { Button } from '@openshock/svelte-core/components/ui/button/index.js';
  import * as Dialog from '@openshock/svelte-core/components/ui/dialog/index.js';
  import { Spinner } from '@openshock/svelte-core/components/ui/spinner/index.js';
  import type { Snippet } from 'svelte';

  interface Props {
    open: boolean;
    title: string;
    description: Snippet;
    /** Button label. Defaults to "Delete". */
    actionLabel?: string;
    cancelLabel?: string;
    /**
     * Return the request's promise. The dialog awaits it, blocks repeat
     * confirms while it is in flight, and closes itself once it resolves.
     * If it rejects, the dialog stays open so the user can retry.
     */
    onConfirm: () => void | Promise<unknown>;
    /** Optional extra content between the header and the action row. */
    children?: Snippet;
  }

  let {
    open = $bindable(),
    title,
    description,
    actionLabel = 'Delete',
    cancelLabel = 'Cancel',
    onConfirm,
    children,
  }: Props = $props();

  let pending = $state(false);

  async function handleConfirm() {
    if (pending) return;
    pending = true;
    try {
      await onConfirm();
      open = false;
    } catch {
      // onConfirm reports its own errors; stay open so the user can retry.
    } finally {
      pending = false;
    }
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{@render description()}</Dialog.Description>
    </Dialog.Header>
    {@render children?.()}
    <Dialog.Footer>
      <Button variant="outline" disabled={pending} onclick={() => (open = false)}>
        {cancelLabel}
      </Button>
      <Button variant="destructive" disabled={pending} onclick={handleConfirm}>
        {#if pending}<Spinner />{/if}
        {actionLabel}
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
