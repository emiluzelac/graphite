import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router'
import { SignupForm } from '@/components/signup-form'

import { Preview as DataListDemo } from '@/pages/data-list'
import { Preview as MenuDemo } from '@/pages/menu'
import { Preview as DisclosureDemo } from '@/pages/disclosure'
import { Preview as DialogDemo } from '@/pages/dialog'
import { Preview as PopoverDemo } from '@/pages/popover'
import { Preview as TabsDemo } from '@/pages/tabs'
import { Preview as TransitionDemo } from '@/pages/transition'
import { Preview as ButtonDemo } from '@/pages/button'
import { Preview as CheckboxDemo } from '@/pages/checkbox'
import { Preview as ComboboxDemo } from '@/pages/combobox'
import { Preview as FieldsetDemo } from '@/pages/fieldset'
import { Preview as InputDemo } from '@/pages/input'
import { Preview as ListboxDemo } from '@/pages/listbox'
import { Preview as RadioGroupDemo } from '@/pages/radio-group'
import { Preview as SelectDemo } from '@/pages/select'
import { Preview as SwitchDemo } from '@/pages/switch'
import { Preview as TextareaDemo } from '@/pages/textarea'

type Item = { to: string; name: string; demo: ReactNode; wide?: boolean }

const components: Item[] = [
  { to: '/react/data-list', name: 'Data List', demo: <DataListDemo />, wide: true },
  { to: '/react/menu', name: 'Dropdown Menu', demo: <MenuDemo demoMode={false} /> },
  { to: '/react/disclosure', name: 'Disclosure', demo: <DisclosureDemo /> },
  { to: '/react/dialog', name: 'Dialog', demo: <DialogDemo /> },
  { to: '/react/popover', name: 'Popover', demo: <PopoverDemo demoMode={false} /> },
  { to: '/react/tabs', name: 'Tabs', demo: <TabsDemo />, wide: true },
  { to: '/react/transition', name: 'Transition', demo: <TransitionDemo /> },
]

const forms: Item[] = [
  { to: '/react/button', name: 'Button', demo: <ButtonDemo /> },
  { to: '/react/checkbox', name: 'Checkbox', demo: <CheckboxDemo /> },
  { to: '/react/combobox', name: 'Combobox', demo: <ComboboxDemo demoMode={false} /> },
  { to: '/react/fieldset', name: 'Fieldset', demo: <FieldsetDemo />, wide: true },
  { to: '/react/input', name: 'Input', demo: <InputDemo /> },
  { to: '/react/listbox', name: 'Listbox', demo: <ListboxDemo demoMode={false} /> },
  { to: '/react/radio-group', name: 'Radio Group', demo: <RadioGroupDemo /> },
  { to: '/react/select', name: 'Select', demo: <SelectDemo /> },
  { to: '/react/switch', name: 'Switch', demo: <SwitchDemo /> },
  { to: '/react/textarea', name: 'Textarea', demo: <TextareaDemo /> },
]

/** Anything matching this keeps its own click; everywhere else the card navigates. */
const INTERACTIVE =
  'a, button, input, textarea, select, label, [role="button"], [role="checkbox"], [role="switch"], [role="radio"], [role="radiogroup"], [role="tab"], [role="option"], [role="menuitem"], [role="combobox"], [role="listbox"], [role="menu"], [role="dialog"]'

/**
 * Masonry card: the body is the real, interactive component preview, with a
 * full-card link overlay for navigation (keyboard focus, middle-click). The
 * demo layer sits above the overlay (z-10 vs z-0), so a card-level onClick
 * routes any click that didn't land on an interactive control — the whole
 * card navigates, not just the label strip.
 */
function GalleryCard({
  to,
  name,
  wide,
  children,
}: {
  to: string
  name: string
  wide?: boolean
  children: ReactNode
}) {
  const navigate = useNavigate()
  return (
    <div
      onClick={(e) => {
        if (!(e.target as Element).closest(INTERACTIVE)) navigate(to)
      }}
      className={`relative flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-card transition hover:border-foreground/25 ${wide ? 'sm:col-span-2' : ''}`}
    >
      <Link
        to={to}
        aria-label={`${name} component`}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      />
      <div className="px-5 pt-4 pb-1">
        <span className="text-xs font-medium tracking-wide text-muted-foreground">{name}</span>
      </div>
      <div className="relative z-10 flex min-h-40 min-w-0 flex-1 items-center justify-center overflow-hidden px-5 pt-3 pb-6">
        {children}
      </div>
    </div>
  )
}

function Gallery({ title, items }: { title: string; items: Item[] }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <GalleryCard key={item.to} to={item.to} name={item.name} wide={item.wide}>
            {item.demo}
          </GalleryCard>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        Graphite — styled, fully accessible components built on Headless UI.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        A component library with its own OKLCH design tokens, distributed as a registry. Every card
        below is the real, interactive component — click one to open its page, source, and the rest
        of the library. Add one to your app with{' '}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-base">
          npx shadcn add @graphite/button
        </code>
        .
      </p>

      <Gallery title="Components" items={components} />
      <Gallery title="Forms" items={forms} />

      <section className="mt-12">
        <h2 className="mb-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Examples
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <GalleryCard to="/signup" name="Signup form" wide>
            <SignupForm />
          </GalleryCard>
        </div>
      </section>
    </div>
  )
}
