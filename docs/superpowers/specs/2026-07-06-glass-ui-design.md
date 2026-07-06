# Glass UI — Design Spec

Date: 2026-07-06
Status: approved (brainstorm with Emil; treatment chosen visually from three mockups)

## Goal

Make frosted glass Graphite's default look — the original idea for the kit, in the spirit
of the headlessui.com demos (translucent alpha surfaces, hairline borders) rather than
heavy glassmorphism. At the same time, restore Headless UI's render-prop `className`
support, which the current wrappers drop.

## Decisions (settled during brainstorm)

| Question        | Decision                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------ |
| Scope           | Glass **is** Graphite — the default look, not an opt-in theme or variant                         |
| Intensity       | Subtle. "Frost": alpha surface + 16px backdrop-blur + hairline border (mockup B)                 |
| Light mode      | True glass in both modes (macOS-style frosted white in light)                                    |
| Architecture    | First-class `glass` utility + tokens; NOT alpha-fying shadcn slots, NOT per-component hardcoding |
| `className` API | Accept Headless UI's native `string \| (bag) => string`, merged via `cn`                         |

## Material

### Tokens

New raw slots in `src/index.css`, wired through `@theme inline` like existing tokens.
Values come from the approved mockup:

```css
:root {
  --glass-surface: oklch(1 0 0 / 0.55); /* white 55% */
  --glass-border: oklch(0.21 0.016 295 / 0.1); /* ink hairline */
  --glass-shadow: oklch(0.21 0.016 295 / 0.08);
  --glass-blur: 16px;
}
.dark {
  --glass-surface: oklch(1 0 0 / 0.08); /* white 8% */
  --glass-border: oklch(1 0 0 / 0.12);
  --glass-shadow: oklch(0 0 0 / 0.25);
}
```

Existing shadcn slots (`--popover`, `--card`, …) keep their opaque values for contract
compatibility; glass components simply stop referencing them. Components continue to
contain zero `dark:` variants — tokens do all mode switching.

### Utilities

Two Tailwind v4 `@utility` definitions in `src/index.css`, the single source of truth
for the material:

- `glass` — floating surfaces: `background: var(--glass-surface)`, 1px solid
  `var(--glass-border)`, `backdrop-filter: blur(var(--glass-blur)) saturate(120%)`,
  `box-shadow: 0 8px 24px var(--glass-shadow)`.
- `glass-flat` — inline controls: surface + border only. No blur or shadow (nothing
  floats behind an inline control; skipping blur keeps control-dense pages cheap).

Graceful degradation: without `backdrop-filter` support the surface renders as plain
alpha film (mockup A) — acceptable, no `@supports` branching.

### State fills on glass

Opaque `accent`/`secondary` fills would punch holes in translucent panels. On glass
surfaces, state fills use **foreground-alpha** instead:

- focused/active rows: `data-focus:bg-foreground/10`
- hover: `data-hover:bg-foreground/5`

`--foreground` already flips per mode, so this yields white-alpha in dark and ink-alpha
in light with no new tokens.

## Component map

| Treatment         | Components                                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `glass`           | MenuItems, PopoverPanel, ListboxOptions, ComboboxOptions, DialogPanel                                                                                |
| `glass-flat`      | Input, Textarea, Select, ComboboxInput, ListboxButton, MenuButton, TabList, Fieldset, Radio cards, unchecked Checkbox, secondary/outline Button      |
| Solid (unchanged) | primary + destructive Button, checked Checkbox/Switch/Radio fills, Separator, MenuSeparator, DataList, dialog scrim (`bg-black/50 backdrop-blur-sm`) |

Text tokens (`foreground`, `muted-foreground`, …) are unchanged everywhere.

## Ambient backdrop

Glass needs backdrop variation to read. New `Backdrop` component
(`src/components/ui/backdrop.tsx`): a `position: fixed`, `pointer-events: none` layer
behind content with three radial gradient blobs (hues 295/220/330), mode-aware via
alpha OKLCH values (no `dark:` variants). Gallery mounts it once in the layouts. Ships
as an optional registry item (`backdrop`) so consumers get the stage the demos are shot
on. Not a Headless UI wrapper — plain div, string-only `className`.

## Registry packaging

- `theme` item: add the glass tokens to `cssVars` and the `glass`/`glass-flat`
  utilities via the shadcn v4 schema `css` field, so `shadcn add` installs the material
  with the theme.
- New `backdrop` item (registry:ui).
- Component items structurally unchanged; sources use the new classes.
- `docs/design-tokens.md`: new "Glass material" section documenting tokens, utilities,
  and the foreground-alpha state rule.

## Render-prop `className`

Wrappers drop the `Omit<Props, 'className'> & { className?: string }` pattern and
accept Headless UI's native `className` (`string | ((bag) => string)`), resolving:

```tsx
className={(bag) => cn(base, typeof className === 'function' ? className(bag) : className)}
```

- Strings behave exactly as today — no breaking change.
- Functions receive the Headless UI state bag (`hover`, `focus`, `open`, `disabled`, …)
  and the result is `cn`-merged, so tailwind-merge conflict resolution still applies.
- Simplifies wrapper prop types (the Omit dance and several casts disappear).
- Non-Headless components (`DataList`, `Separator`, `Backdrop`) stay string-only.

## Testing & rollout

TDD throughout — failing test first for each new contract:

- `glass` present on floating panels; `glass-flat` on controls (class contracts).
- Function `className` receives the bag and merges with base classes (per wrapper shape,
  not per component: one covering test for a representative simple wrapper, one for a
  generic/polymorphic wrapper).
- `Backdrop` renders a fixed, aria-hidden, pointer-events-none layer.
- Existing 27 tests pin behavior; assertions that encode old surfaces (e.g. secondary
  Button `bg-secondary`) are updated deliberately as part of the retheme commit.

Rollout in three commits:

1. Tokens + `glass`/`glass-flat` utilities + `Backdrop` component and registry item.
2. Render-prop `className` support across all wrappers.
3. Component retheme + gallery layouts mount `Backdrop` + docs + registry rebuild.

Verification: full suite + `tsc -b` + lint + prettier per commit; visual pass of every
gallery page in both light and dark before the final commit.

## Out of scope

- Heavy glassmorphism: glow gradients, cursor-following glare, spring physics (aicanvas
  direction — explicitly rejected).
- Opt-in/secondary opaque theme, `surface` variant props.
- Retheming `DataList` and the dialog scrim.
- Shadow/spacing/font token families (unchanged per design-tokens.md policy).
