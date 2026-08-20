<script lang="ts">
  import { Button } from '@openshock/svelte-core/components/ui/button/index.js';
  import { Input } from '@openshock/svelte-core/components/ui/input/index.js';
  import { Toaster } from '@openshock/svelte-core/components/ui/sonner/index.js';
  import { toast } from 'svelte-sonner';
</script>

<Toaster theme="system" />

<main class="mx-auto flex max-w-md flex-col gap-4 p-8">
  <h1 class="text-2xl font-bold">@openshock/svelte-core</h1>
  <p class="text-sm text-muted-foreground">
    Dev playground for the shared OpenShock UI. Components here are consumed exactly as a downstream
    app would.
  </p>

  <Input placeholder="An input from the shared library" />

  <div class="flex gap-2">
    <Button onclick={() => toast.success('Hello from the shared toaster')}>Show toast</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="destructive">Destructive</Button>
  </div>
</main>
