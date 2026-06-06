# Design Tokens — Graphite Theme

Graphite's visual system in four choices:

| Aspect               | Choice                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------- |
| Accent/primary color | Monochrome (near-black in light, near-white in dark)                                   |
| Neutral scale        | **Custom OKLCH ramp, hue 295 ("Graphite")** — violet undertone, not a Tailwind preset  |
| Token naming         | shadcn-compatible (`--background`, `--primary`, `--muted`, …) for ecosystem leverage   |
| Token scope          | Colors + single `--radius` knob. No shadow/spacing/font tokens until a real need shows |

## Architecture

Three-layer wiring in `src/index.css` (the shadcn v4 pattern):

```css
:root {
  /* light values + --radius */
}
.dark {
  /* dark overrides */
}
@theme inline {
  --color-background: var(--background); /* … */
}
```

`@theme inline` maps Tailwind utilities (`bg-background`, `text-muted-foreground`, …) to
CSS variables rather than literal values, so toggling `.dark` re-themes everything.
**Components contain zero `dark:` variants.** The existing ThemeProvider, FOUC guard,
and `@custom-variant dark` stay unchanged (the variant remains available but should be
unused after the refactor).

A base layer sets sensible defaults:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply min-h-svh bg-background text-foreground antialiased;
  }
}
```

## Graphite ramp (internal reference)

All hue 295. Not exposed as utilities — these values fill the semantic slots below.

| Step | OKLCH             | Step | OKLCH             |
| ---- | ----------------- | ---- | ----------------- |
| 50   | `0.985 0.004 295` | 500  | `0.554 0.014 295` |
| 100  | `0.967 0.005 295` | 600  | `0.446 0.014 295` |
| 200  | `0.92 0.008 295`  | 700  | `0.37 0.016 295`  |
| 300  | `0.87 0.01 295`   | 800  | `0.269 0.014 295` |
| 400  | `0.708 0.014 295` | 900  | `0.21 0.016 295`  |
|      |                   | 950  | `0.141 0.012 295` |

## Token values

| Token                                        | Light                    | Dark                    |
| -------------------------------------------- | ------------------------ | ----------------------- |
| `--background`                               | 50                       | 950                     |
| `--foreground`                               | 900                      | 50                      |
| `--card` / `--popover`                       | `oklch(1 0 0)` (white)   | 900                     |
| `--card-foreground` / `--popover-foreground` | 900                      | 50                      |
| `--primary`                                  | 900                      | 50                      |
| `--primary-foreground`                       | 50                       | 900                     |
| `--secondary`                                | 200                      | 800                     |
| `--secondary-foreground`                     | 900                      | 50                      |
| `--muted`                                    | 100                      | 800                     |
| `--muted-foreground`                         | 500                      | 400                     |
| `--accent`                                   | `oklch(0.945 0.007 295)` | 800                     |
| `--accent-foreground`                        | 900                      | 50                      |
| `--destructive`                              | `oklch(0.577 0.215 27)`  | `oklch(0.704 0.191 22)` |
| `--destructive-foreground`                   | white                    | 950                     |
| `--border` / `--input`                       | 200                      | 800                     |
| `--ring`                                     | 400                      | 500                     |
| `--radius`                                   | `0.625rem`               | (same)                  |

Radius derivations in `@theme inline`: `--radius-sm: calc(var(--radius) - 4px)`,
`--radius-md: calc(var(--radius) - 2px)`, `--radius-lg: var(--radius)`,
`--radius-xl: calc(var(--radius) + 4px)`.

## Class mapping guide

| Old (hardcoded)                                                  | New (semantic)                                                    |
| ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| `bg-white` (page) / `dark:bg-gray-950`                           | `bg-background`                                                   |
| `bg-white` (panels, menus, dialogs) / `dark:bg-gray-900`         | `bg-card` or `bg-popover` (floating)                              |
| `text-gray-900` / `dark:text-white`                              | `text-foreground`                                                 |
| `text-gray-500`, `text-gray-600`, `dark:text-white/50`           | `text-muted-foreground`                                           |
| `border-gray-200/300`, `border-black/5`, `dark:border-white/10`  | `border-border` (or bare `border` via base layer)                 |
| `bg-sky-600` primary actions, checked switch/checkbox            | `bg-primary text-primary-foreground`; hover via `bg-primary/90`   |
| `bg-gray-900` secondary button                                   | `bg-secondary text-secondary-foreground`, hover `bg-secondary/80` |
| ghost hover `bg-gray-100`, menu/listbox `data-focus:bg-gray-100` | `data-focus:bg-accent`, `data-hover:bg-accent`                    |
| selected checkmarks `text-sky-600`                               | `text-primary`                                                    |
| `data-invalid:` red-500                                          | `data-invalid:border-destructive` etc.                            |
| focus outlines `outline-gray-900` / `outline-sky-600`            | `data-focus:outline-ring`                                         |
| `rounded-lg/xl` on components                                    | `rounded-md/lg/xl` from radius tokens (visually same at default)  |
| every `dark:*` class                                             | **deleted**                                                       |

## Where the tokens live

- `src/index.css` — the entire token sheet (`:root`, `.dark`, `@theme inline`)
- Components contain only semantic classes; a grep for `gray-`, `sky-`, or `dark:` in `src/components/ui/` should always come back empty
- Consumers get the same values via the registry's `theme` item (`registry.json` → `cssVars`)

## Retheming

Everything visual is a variable. To retheme an app built on Graphite, override the slots in `:root` / `.dark` — no component changes needed. `--radius: 0` gives sharp corners; `--radius: 9999px` goes pill.
