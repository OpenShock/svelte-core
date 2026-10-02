<script lang="ts">
  import { Button } from '@openshock/svelte-core/components/ui/button/index.js';
  import { cn } from '@openshock/svelte-core/utils/index.js';

  interface Props {
    /** What failed, as a sentence: "Failed to load webhooks." */
    message: string;
    /** Omit to render without a retry affordance. */
    onRetry?: () => void;
    retryLabel?: string;
    class?: string;
  }

  let { message, onRetry, retryLabel = 'Try again', class: className }: Props = $props();
</script>

<div class={cn('flex w-full flex-col items-center gap-3 py-12', className)}>
  <p class="text-sm text-destructive">{message}</p>
  {#if onRetry}
    <Button variant="outline" onclick={onRetry}>{retryLabel}</Button>
  {/if}
</div>
