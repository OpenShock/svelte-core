<script lang="ts">
  import { m } from '@openshock/svelte-core/paraglide/messages.js';
  import {
    getPasswordStrength,
    type PasswordStrengthLevel,
  } from '@openshock/svelte-core/inputvalidation/passwordValidator.js';
  import { twTextColor } from '@openshock/svelte-core/types/Tailwind.js';

  interface Props {
    password: string;
  }

  let { password }: Props = $props();

  const strengthLabels: Record<PasswordStrengthLevel, () => string> = {
    none: m.password_strength_none,
    very_weak: m.password_strength_very_weak,
    weak: m.password_strength_weak,
    fair: m.password_strength_fair,
    strong: m.password_strength_strong,
    very_strong: m.password_strength_very_strong,
  };

  let { percent, level, color } = $derived(getPasswordStrength(password));
</script>

<div aria-hidden="true">
  <div class="flex flex-row items-center space-x-1 text-xs">
    <p class="text-gray-400">{m.password_strength_label()}</p>
    <p class={twTextColor[color]}>{strengthLabels[level]()}</p>
  </div>

  <!-- SVG Meter -->
  <svg viewBox="0 0 100 6" class="mt-1 w-full">
    <rect x="0" y="0" width="30" height="2" fill="#ef4444" />
    <rect x="30" y="0" width="20" height="2" fill="#f97316" />
    <rect x="50" y="0" width="10" height="2" fill="#eab308" />
    <rect x="60" y="0" width="40" height="2" fill="#22c55e" />

    <polygon
      points="0,-2 -2,0 0,2 2,0"
      transform="translate({percent}, 2)"
      fill="white"
      stroke="black"
      stroke-width="0.2"
    />
  </svg>
</div>
