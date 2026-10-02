<script lang="ts">
  import { Spinner } from '@openshock/svelte-core/components/ui/spinner/index.js';
  import { cn } from '@openshock/svelte-core/utils/index.js';

  interface Props {
    /** Optional label beside the spinner, e.g. "Loading hub information...". */
    label?: string;
    /** `default` reserves a block of height; `inline` sits in the current flow. */
    inline?: boolean;
    class?: string;
  }

  let { label, inline, class: className }: Props = $props();
</script>

<div
  class={cn('flex w-full items-center justify-center gap-3', inline ? 'py-2' : 'h-64', className)}
>
  <Spinner class="size-8 text-muted-foreground" />
  {#if label}
    <span class="text-muted-foreground">{label}</span>
  {/if}
</div>
