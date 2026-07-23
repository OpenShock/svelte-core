<script lang="ts">
  import { cn } from '@openshock/svelte-core/utils/shadcn.js';
  import { getStepperItemContext } from './stepper.svelte.js';
  import type { StepperTitleProps } from './types.js';

  let { class: className, children, ...restProps }: StepperTitleProps = $props();

  const item = getStepperItemContext();
</script>

<h4
  data-state={item.state}
  class={cn(
    'text-sm leading-none font-medium',
    item.state === 'inactive' && 'text-muted-foreground',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</h4>
