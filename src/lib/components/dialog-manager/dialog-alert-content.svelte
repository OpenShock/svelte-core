<script lang="ts">
  import { Button } from '@openshock/svelte-core/components/ui/button/index.js';
  import * as Dialog from '@openshock/svelte-core/components/ui/dialog/index.js';
  import type { AlertProps } from './types';

  let { title, desc, buttonText = 'OK', resolve }: AlertProps = $props();

  function handleAcknowledge() {
    resolve();
  }
</script>

<Dialog.Header>
  <Dialog.Title>{title}</Dialog.Title>
  {#if desc}
    <Dialog.Description>{desc}</Dialog.Description>
  {/if}
</Dialog.Header>
<Dialog.Footer>
  <Button onclick={handleAcknowledge}>{buttonText}</Button>
</Dialog.Footer>
