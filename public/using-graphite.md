# Using Graphite

This is the canonical integration guide for developers and coding agents adding
Graphite to another application. For work on Graphite itself, use the repository's
[AGENTS.md](https://github.com/emiluzelac/graphite/blob/main/AGENTS.md).

Graphite is a copy-in React/TypeScript component library built on Headless UI v2
and Tailwind CSS v4. The shadcn CLI distributes its source; Graphite is not a set
of Radix components or an npm package to import as `graphite`.

The [agent index](llms.txt) links to component references. The
[registry catalog](r/registry.json) lists available items; each `r/{name}.json`
contains installation dependencies and source. Read the relevant item before
inventing an API or copying a visually similar component.

## Prepare the consuming app

Inspect the app's framework, React version, Tailwind setup, global stylesheet,
import aliases, and existing components before changing anything. These components
target Tailwind CSS v4 and Headless UI v2; a Tailwind v3 app needs a deliberate
migration, not just a component install. This showcase uses React 19.

The app needs a valid shadcn `components.json` with its actual CSS path and aliases.
For a new, unconfigured app, initialize it with:

```bash
npx shadcn@latest init
```

Initialization can change CSS and create shared utilities. Do not reinitialize an
already configured app or replace a customized stylesheet just to add Graphite.
Keep the app's package manager and lockfile conventions.

## Configure the registry

Merge this entry into the app's existing `components.json`; this is a fragment,
not a replacement for the rest of the configuration:

```json
{
  "registries": {
    "@graphite": "https://emiluzelac.github.io/graphite/r/{name}.json"
  }
}
```

Use the `@graphite/` namespace in install commands so the CLI selects Graphite,
not a similarly named component from the default registry.

## Choose the theme deliberately

### New app adopting the Graphite appearance

Install the optional theme once, after initializing the app:

```bash
npx shadcn@latest add @graphite/theme
```

The theme supplies light/dark semantic values and the `glass` / `glass-flat`
utilities. It intentionally changes theme CSS. It does not install a theme
provider, persistence, a router, or the showcase layout.

### App keeping its existing design system

Skip `@graphite/theme`. Installing ordinary controls does not pull in the theme.
Instead, satisfy the styling contract without replacing the app's colors:

1. Keep existing semantic values, or alias the app's tokens to the slots used by
   the installed components. The [theme item](r/theme.json) lists the reference
   slots under `cssVars.light` and `cssVars.dark`.
2. Expose those colors through Tailwind v4's `@theme inline`, for example
   `--color-primary: var(--primary)`, and supply the radius mappings. The
   [reference stylesheet](https://github.com/emiluzelac/graphite/blob/main/src/index.css)
   contains the complete mapping block. Reuse the mapping, not its `:root` and
   `.dark` color values. Include `--destructive-foreground` and its color mapping
   if the app does not already define them.
3. Define mode-appropriate `--glass-surface`, `--glass-border`, `--glass-shadow`,
   and `--glass-blur` values. Add the `@utility glass` and `@utility glass-flat`
   definitions from the theme item's `css` object to the global stylesheet.
   Defining the variables alone does not create these utilities.

Do not fix one unstyled control by installing the entire theme over an existing
brand. Review the CSS diff and keep unrelated tokens unchanged.

### Dark mode and the optional backdrop

The default theme responds to `.dark` on the document root. Let the consuming
app's theme system manage that class, including any pre-paint handling; do not
add competing providers. Root-level theming also reaches portaled dialogs and
menus. Components should not need duplicate `dark:` classes.

For the showcase's ambient gradient, explicitly opt in:

```bash
npx shadcn@latest add @graphite/backdrop
```

Import `Backdrop` from the installed `components/ui/backdrop` module and render
it once near the app root. This item adds its own `--backdrop-1/2/3` variables;
it does not install the Graphite theme. It paints at `-z-10`, so an opaque wrapper
above it will hide it. The gradient is optional, not a dependency of the controls.

## Install components and use their actual APIs

For the examples below:

```bash
npx shadcn@latest add @graphite/button @graphite/field @graphite/input @graphite/dialog
```

The CLI copies source into the app and installs each item's dependencies,
including shared registry utilities. Icon-using items declare
`@emiluzelac/icona`; no local checkout of the icon library is needed.

Review file collisions before accepting replacements. Do not use `--overwrite`
blindly against an existing `components/ui/` directory. Once installed, the
source belongs to the app; later updates must preserve its intentional changes.
Use the paths produced by the app's configured aliases. The examples assume
`@/components/ui/`.

These are Headless UI compositions, not Radix/shadcn component names:

| Purpose | Graphite composition |
| --- | --- |
| Labelled input | `Field`, `Label`, `Description`, and `Input` |
| Dialog | `Dialog` with `open` / `onClose`, containing `DialogPanel` and `DialogTitle` |
| Tabs | `TabGroup`, `TabList`, `Tab`, `TabPanels`, and `TabPanel` |
| Menu | `Menu`, `MenuButton`, `MenuItems`, and `MenuItem` |
| Custom select | `Listbox`, `ListboxButton`, `ListboxOptions`, and `ListboxOption` |
| Autocomplete | `Combobox`, `ComboboxInput`, `ComboboxOptions`, and `ComboboxOption` |

Do not assume APIs such as `DialogContent`, `onOpenChange`, `onValueChange`, or
`asChild`. Consult the installed wrapper's types; wrappers can narrow the
underlying Headless UI API. For example, `ComboboxInput` already includes its
toggle button.

Button variants are `primary`, `secondary`, `outline`, `ghost`, and `destructive`;
sizes are `sm`, `default`, `lg`, and `icon`. A `Transition` showcase page also
exists, but there is no `@graphite/transition` registry item: use the Headless UI
transition primitives.

### Labelled input

```tsx
'use client'

import { Description, Field, Label } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function EmailField() {
  return (
    <Field>
      <Label>Email address</Label>
      <Input name="email" type="email" autoComplete="email" required />
      <Description>Use the address associated with your account.</Description>
    </Field>
  )
}
```

`Field` connects the label and description to the Headless UI input. A placeholder
is not a substitute for a label. The consuming app still owns form submission,
validation, error messaging, and persistence.

### Controlled dialog

```tsx
'use client'

import { useState } from 'react'
import { Button, CloseButton } from '@/components/ui/button'
import { Dialog, DialogPanel, DialogTitle } from '@/components/ui/dialog'

export function DetailsDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        View details
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogPanel>
          <DialogTitle>Account details</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Add your application's content here.
          </p>
          <CloseButton type="button" variant="secondary">
            Close
          </CloseButton>
        </DialogPanel>
      </Dialog>
    </>
  )
}
```

`CloseButton` closes the nearest Headless UI dialog or popover. Keep the panel and
title composition so focus management and accessible naming remain intact.

In React Server Component frameworks, place these compositions behind a
`'use client'` boundary. The wrappers pass render functions to Headless UI, and
interactive examples also use browser events or hooks. Vite does not require that
directive. The registry does not set up framework-specific client boundaries.

## Preserve Graphite's styling contract

Use semantic utilities such as `bg-background`, `text-foreground`,
`text-muted-foreground`, `border-border`, and `outline-ring`. Retheme through
variables rather than hardcoded gray ramps or per-component light/dark overrides.

| Surface or state | Treatment |
| --- | --- |
| Floating menu, options list, dialog panel | `glass`: translucent surface, border, blur, and shadow |
| Inline input, trigger, secondary/outline button | `glass-flat`: translucent surface and border |
| Nested panel or hover wash | `bg-foreground/5` |
| Focused menu/option row or active wash | `bg-foreground/10` |
| Primary/destructive action or selected control indicator | Its deliberate solid semantic control styling |
| Syntax-highlighted code block | Opaque `bg-card` for stable contrast |

Do not substitute opaque `bg-card`, `bg-popover`, `bg-accent`, or `bg-secondary`
for glass surfaces or their interaction washes. Solid actions and selected
control states are intentional exceptions, not a reason to make whole panels
opaque.

The custom glass utilities include a border shorthand. `tailwind-merge` cannot
resolve their effects against ordinary classes such as `border-0` or `border-2`.
Use the material variables or a targeted wrapper class rather than assuming a
conflicting utility will win.

## Accessibility and application behavior

- Keep visible labels and descriptions associated with controls; group related
  controls with `Fieldset` and `Legend` when appropriate.
- Give icon-only buttons an accessible name and hide decorative icons from
  assistive technology.
- Preserve Headless UI state attributes, keyboard handling, and focus indicators.
  Do not replace its controls with clickable `div` elements.
- Match controlled values and callbacks to the installed types. Do not mix
  controlled and uncontrolled state or fake a successful application operation.
- Do not copy showcase-only props such as `__demoMode` into production UI.
  Examples demonstrate composition, not authentication, billing, or backend logic.

Before handing off an integration, use the consuming app's existing type/build
checks and exercise keyboard navigation, dialog dismissal and focus return,
disabled/invalid states, light/dark mode, and narrow layouts. Inspect the final
diff for unintended component replacements or theme changes.
