<script lang="ts">
  import * as FormPrimitive from 'formsnap';
  import { Label } from '@openshock/svelte-core/components/ui/label/index.js';
  import { cn, type WithoutChild } from '@openshock/svelte-core/utils/shadcn.js';

  let {
    ref = $bindable(null),
    children,
    class: className,
    ...restProps
  }: WithoutChild<FormPrimitive.LabelProps> = $props();
</script>

<FormPrimitive.Label {...restProps} bind:ref>
  {#snippet child({ props })}
    <Label
      {...props}
      data-slot="form-label"
      class={cn('data-[fs-error]:text-destructive', className)}
    >
      {@render children?.()}
    </Label>
  {/snippet}
</FormPrimitive.Label>
