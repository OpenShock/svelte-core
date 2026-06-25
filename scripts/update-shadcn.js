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

function patch(filePath, replacements) {
  let source = fs.readFileSync(filePath, 'utf-8');
  for (const [pattern, replacement] of replacements) {
    source = source.replace(pattern, replacement);
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

// Sonner: decouple from any app color-scheme store. `theme` is consumer-injected
// (default 'system'); the shadcn registry version imports mode-watcher, which we
// strip entirely. Consumers pass e.g. `theme={colorScheme.value}`.
patch(path.join(UI_DIR, 'sonner/sonner.svelte'), [
  ['import { mode } from "mode-watcher";\n', ''],
  ["\timport { mode } from 'mode-watcher';\n", ''],
  [
    'let { ...restProps }: SonnerProps = $props();',
    "// `theme` is consumer-injected (e.g. `theme={colorScheme.value}`) so this\n\t// component stays free of any app-specific color-scheme state.\n\tlet { theme = 'system', ...restProps }: SonnerProps = $props();",
  ],
  ['theme={mode.current}', '{theme}'],
]);

// Slider: add cursor-w-resize to thumb
patch(path.join(UI_DIR, 'slider/slider.svelte'), [
  [/select-none disabled:pointer/, 'cursor-w-resize select-none disabled:pointer'],
]);

// Toggle group: suppress state_referenced_locally warnings
patch(path.join(UI_DIR, 'toggle-group/toggle-group.svelte'), [
  [/\tsetToggleGroupCtx/, '\t// svelte-ignore state_referenced_locally\n\tsetToggleGroupCtx'],
]);

// Final format and check
console.log('Final format...');
run('pnpm run format');

console.log('Running checks...');
run('pnpm run check');

console.log('Done! Review the git diff before committing.');
