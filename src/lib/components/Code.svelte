<script lang="ts">
  import type { ChildrenFunc } from '@openshock/svelte-core/types/ChildrenFunc.js';

  interface Props {
    children?: ChildrenFunc;
  }

  let { children }: Props = $props();
</script>

<code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
  {@render children?.()}
</code>
