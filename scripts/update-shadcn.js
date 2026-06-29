import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const UI_DIR = 'src/lib/components/ui';
const HOOKS_DIR = 'src/lib/hooks';

// Non-shadcn directories in ui/ to keep. Empty: ui/ holds only registry
// components; all custom components (stepper, multi-select-combobox, etc.) live
// under components/ instead, so the regen never touches them.
const EXCLUDE = [];

// Unwanted dependencies that the CLI tends to add
const UNWANTED_DEPS = ['mode-watcher'];

function run(command, options = {}) {
  execSync(command, { stdio: 'inherit', shell: true, ...options });
}

// Collect shadcn component names
const components = fs
  .readdirSync(UI_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !EXCLUDE.includes(entry.name))
  .map((entry) => entry.name);

if (components.length === 0) {
  console.error('No shadcn components found to update.');
  process.exit(1);
}

console.log(`Found ${components.length} shadcn components: ${components.join(' ')}`);

// Delete all shadcn component directories
console.log('Deleting shadcn components...');
for (const name of components) {
  fs.rmSync(path.join(UI_DIR, name), { recursive: true, force: true });
}
fs.rmSync(path.join(HOOKS_DIR, 'is-mobile.svelte.ts'), { force: true });

// Re-add all components
console.log('Re-adding components via shadcn CLI...');
run(`pnpm dlx shadcn-svelte@latest add --yes --overwrite ${components.join(' ')}`);

// Remove unwanted dependencies
console.log('Cleaning up dependencies...');
const packageJson = fs.readFileSync('package.json', 'utf-8');
for (const dep of UNWANTED_DEPS) {
  if (packageJson.includes(`"${dep}"`)) {
    console.log(`  Removing unwanted dependency: ${dep}`);
    run(`pnpm remove ${dep}`);
  }
}

// Format to reduce diff noise
console.log('Formatting...');
run('pnpm run format');

// Apply custom modifications
console.log('Applying custom modifications...');

// Patches run *after* `pnpm run format`, so match against the formatted output:
// 2-space indentation, single quotes (see .prettierrc). Patterns that assume tab
// indentation or double quotes silently no-op. A no-op almost always means the
// upstream registry changed and the customization is stale, so fail loudly rather
// than emit a broken file for `pnpm run check` to flag cryptically later.
function patch(filePath, replacements) {
  let source = fs.readFileSync(filePath, 'utf-8');
  for (const [pattern, replacement] of replacements) {
    const next = source.replace(pattern, replacement);
    if (next === source) {
      throw new Error(
        `Patch did not apply in ${filePath}: ${pattern}. The upstream shadcn component likely changed; update the patch.`
      );
    }
    source = next;
  }
  fs.writeFileSync(filePath, source);
}

// Sidebar: ease-in-out and duration-300
patch(path.join(UI_DIR, 'sidebar/sidebar.svelte'), [
  [/duration-200 ease-linear/g, 'duration-300 ease-in-out'],
]);

// Sidebar submenu: ml-* instead of mx-*, pl-* instead of px-*
patch(path.join(UI_DIR, 'sidebar/sidebar-menu-sub.svelte'), [
  [/mx-3\.5(.*)px-2\.5/g, 'ml-3.5$1pl-2.5'],
]);

// Sonner: source the theme from our own color-scheme store instead of
// mode-watcher. The shadcn registry imports `mode` from mode-watcher and uses
// `theme={mode.current}`; we swap both for our color-scheme state. Use the
// `@openshock/svelte-core` self-import (not `$lib`) so the specifier matches the
// rest of the CLI-generated components and resolves in consuming apps too — see
// the `exports` self-reference in package.json. `$lib` only exists inside a
// SvelteKit app build and would not resolve once the package is published.
patch(path.join(UI_DIR, 'sonner/sonner.svelte'), [
  [
    /^([ \t]*)import \{ mode \} from ['"]mode-watcher['"];/m,
    "$1import { colorScheme } from '@openshock/svelte-core/state/color-scheme-state.svelte.js';",
  ],
  [/theme=\{mode\.current\}/, 'theme={colorScheme.value}'],
]);

// Slider: add cursor-w-resize to thumb
patch(path.join(UI_DIR, 'slider/slider.svelte'), [
  [/select-none disabled:pointer/, 'cursor-w-resize select-none disabled:pointer'],
]);

// Toggle group: suppress state_referenced_locally warnings
patch(path.join(UI_DIR, 'toggle-group/toggle-group.svelte'), [
  [/(\n[ \t]*)setToggleGroupCtx/, '$1// svelte-ignore state_referenced_locally$1setToggleGroupCtx'],
]);

// Final format and check
console.log('Final format...');
run('pnpm run format');

console.log('Running checks...');
run('pnpm run check');

console.log('Done! Review the git diff before committing.');
