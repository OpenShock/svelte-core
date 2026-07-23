<script lang="ts">
  import { CircleCheckBig, Copy } from '@lucide/svelte';
  import { cn } from '@openshock/svelte-core/utils/index.js';
  import { useClipboard } from '@openshock/svelte-core/utils/clipboard.svelte.js';
  import type { Snippet } from 'svelte';
  import { scale } from 'svelte/transition';

  interface Props {
    value: string;
    class?: string;
    icon?: Snippet;
    displayValue?: string;
  }

  let { value, class: className, icon, displayValue }: Props = $props();

  const clip = useClipboard();
</script>

<form
  class={cn(
    'flex h-10 w-full flex-row rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    className
  )}
>
  {#if icon}
    {@render icon()}
  {/if}
  <input
    class="mx-3 w-0 min-w-0 grow outline-none!"
    type="text"
    value={displayValue ?? value}
    readonly
    disabled
  />
  <span>
    <button
      onclick={() => clip.copy(value)}
      class="transition-in-place"
      title={clip.copied ? 'Copied' : 'Copy to clipboard'}
      type="button"
    >
      {#if clip.copied}
        <span transition:scale>
          <CircleCheckBig size="20" />
        </span>
      {:else}
        <span transition:scale>
          <Copy size="20" />
        </span>
      {/if}
    </button>
  </span>
</form>
