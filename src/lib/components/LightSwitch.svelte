<script lang="ts" module>
  export type ColorSchemeValue = 'light' | 'dark' | 'system';
</script>

<script lang="ts">
  import { Moon, Sun } from '@lucide/svelte';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { cn } from '$lib/utils/shadcn';
  import { toast } from 'svelte-sonner';

  interface Props {
    /** Current color scheme. Bindable so the consumer's store stays the source of truth. */
    value?: ColorSchemeValue;
    onValueChange?: (value: ColorSchemeValue) => void;
    /** Warn before switching to light mode (the "going nuclear" guard). */
    confirmLightMode?: boolean;
    /** When DarkReader (or similar) is active, light mode has no effect — inject to warn. */
    darkReaderActive?: boolean;
    class?: string;
  }

  let {
    value = $bindable('system'),
    onValueChange,
    confirmLightMode = false,
    darkReaderActive = false,
    class: className,
  }: Props = $props();

  const SCHEMES: ColorSchemeValue[] = ['light', 'dark', 'system'];

  let pendingScheme = $state<ColorSchemeValue | null>(null);
  function handleOpenChanged(open: boolean) {
    if (open) return;
    pendingScheme = null;
  }
  function apply(scheme: ColorSchemeValue) {
    value = scheme;
    onValueChange?.(scheme);
  }
  function confirm() {
    if (!pendingScheme) return;
    apply(pendingScheme);
    pendingScheme = null;
  }

  // Switching to an effectively-light appearance is jarring, so optionally confirm it.
  function isGoingNuclear(current: ColorSchemeValue, pending: ColorSchemeValue) {
    if (current === pending || current === 'light' || pending === 'dark') return false;

    const currentDark = current === 'dark';
    const pendingLight = pending === 'light';
    if (currentDark && pendingLight) return true;

    // Either side is 'system' — query the browser preference.
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return currentDark;
    }
    return pendingLight;
  }

  function select(scheme: ColorSchemeValue) {
    if (confirmLightMode && isGoingNuclear(value, scheme)) {
      if (darkReaderActive) {
        toast.warning('DarkReader is enabled, activating light mode will have no effect!');
        return;
      }
      pendingScheme = scheme;
      return;
    }
    apply(scheme);
  }
</script>

<Dialog.Root bind:open={() => pendingScheme !== null, handleOpenChanged}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Switch to light mode</Dialog.Title>
      <Dialog.Description>
        <span class="font-bold text-red-500">Warning:</span> You are about to switch to light mode.
        <br />
        Are you sure you want to do this?
      </Dialog.Description>
    </Dialog.Header>
    <Button variant="destructive" onclick={confirm}>I am willing to take the risk</Button>
  </Dialog.Content>
</Dialog.Root>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class={cn(
      buttonVariants({ variant: 'ghost' }),
      'size-8! text-gray-600 dark:text-gray-300',
      className
    )}
  >
    <Sun class="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
    <Moon
      class="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
    />
    <span class="sr-only">Toggle theme</span>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    {#each SCHEMES as scheme (scheme)}
      <DropdownMenu.Item class="cursor-pointer capitalize" onclick={() => select(scheme)}>
        {scheme}
      </DropdownMenu.Item>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
