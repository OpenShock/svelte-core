<script lang="ts">
  import { m } from '@openshock/svelte-core/paraglide/messages.js';
  import { Moon, Sun } from '@lucide/svelte';
  import { Button, buttonVariants } from '@openshock/svelte-core/components/ui/button/index.js';
  import * as Dialog from '@openshock/svelte-core/components/ui/dialog/index.js';
  import * as DropdownMenu from '@openshock/svelte-core/components/ui/dropdown-menu/index.js';
  import {
    ColorScheme,
    colorScheme,
    getDarkReaderState,
  } from '@openshock/svelte-core/state/color-scheme-state.svelte.js';
  import { cn } from '@openshock/svelte-core/utils/shadcn.js';
  import { toast } from 'svelte-sonner';

  let pendingScheme = $state<ColorScheme | null>(null);
  function handleOpenChanged(open: boolean) {
    if (open) return;
    pendingScheme = null;
  }
  function confirm() {
    if (!pendingScheme) return;
    colorScheme.value = pendingScheme;
    pendingScheme = null;
  }

  // Decision matrix
  //        light  dark system pending
  //  light false false  false
  //   dark true  false  check
  // system check false  false
  // current
  function isGoingNuclear(current: ColorScheme, pending: ColorScheme) {
    // There will definetly be no transition from dark -> light
    if (current === pending || current === ColorScheme.Light || pending === ColorScheme.Dark)
      return false;

    const currentDark = current === ColorScheme.Dark;
    const pendingLight = pending === ColorScheme.Light;
    if (currentDark && pendingLight) return true; // Change will definetly go from dark to light

    // Now either current or pending is system, so we need to query the browser preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      // System prefers lightmode, if the current mode is dark the transition will happen
      return currentDark;
    }

    // system prefers darkmode, if pending is light then the transition will happen
    return pendingLight;
  }
  function evaluateLightSwitch(scheme: ColorScheme) {
    if (isGoingNuclear(colorScheme.value, scheme)) {
      const darkreader = getDarkReaderState();
      if (darkreader.isActive) {
        toast.warning(m.light_mode_darkreader_warning());
        return;
      }
      pendingScheme = scheme;
      return;
    }
    colorScheme.value = scheme;
  }

  const schemeLabels: Record<ColorScheme, () => string> = {
    [ColorScheme.Dark]: m.color_scheme_dark,
    [ColorScheme.Light]: m.color_scheme_light,
    [ColorScheme.System]: m.color_scheme_system,
  };
</script>

<Dialog.Root bind:open={() => pendingScheme !== null, handleOpenChanged}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{m.light_mode_dialog_title()}</Dialog.Title>
      <Dialog.Description>
        <span class="font-bold text-red-500">{m.light_mode_dialog_warning_label()}</span>
        {m.light_mode_dialog_description()}
        <br />
        {m.light_mode_dialog_question()}
      </Dialog.Description>
    </Dialog.Header>
    <Button variant="destructive" onclick={confirm}>{m.light_mode_dialog_confirm()}</Button>
  </Dialog.Content>
</Dialog.Root>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class={cn(buttonVariants({ variant: 'ghost' }), 'size-8! text-gray-600 dark:text-gray-300')}
  >
    <Sun class="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
    <Moon
      class="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
    />
    <span class="sr-only">{m.color_scheme_toggle()}</span>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    {#each Object.values(ColorScheme) as value (value)}
      <DropdownMenu.Item
        class="cursor-pointer capitalize"
        onclick={() => evaluateLightSwitch(value)}>{schemeLabels[value]()}</DropdownMenu.Item
      >
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
