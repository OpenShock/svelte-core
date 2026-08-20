<script lang="ts" generics="T, R">
  import type { CustomProps, DialogRenderProps } from './types.ts';

  let { data: initialData, contentSnippet, resolve, close }: CustomProps<T, R> = $props();

  // intentionally captures initial value as own reactive copy
  // svelte-ignore state_referenced_locally
  let data: T = $state(initialData as T);

  const renderProps: DialogRenderProps<T, R> = $derived({
    data,
    resolve,
    close,
  });
</script>

{@render contentSnippet(renderProps)}
