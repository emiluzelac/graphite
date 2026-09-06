import { ArrowRightLinear } from '@emiluzelac/icona'
import { Link } from 'react-router'
import { HomeShowcase } from '@/components/home-showcase'
import { buttonVariants, DataInteractive } from '@/components/ui/button'
import { cn } from '@/lib/cn'

type Item = { to: string; name: string; description: string }

const components: Item[] = [
  { to: '/react/data-list', name: 'Data List', description: 'Records, neatly aligned' },
  { to: '/react/menu', name: 'Dropdown Menu', description: 'Actions within reach' },
  { to: '/react/disclosure', name: 'Disclosure', description: 'Reveal a little more' },
  { to: '/react/dialog', name: 'Dialog', description: 'Room to focus' },
  { to: '/react/popover', name: 'Popover', description: 'Context, on demand' },
  { to: '/react/tabs', name: 'Tabs', description: 'One space, different views' },
  { to: '/react/transition', name: 'Transition', description: 'Movement with purpose' },
]

const forms: Item[] = [
  { to: '/react/button', name: 'Button', description: 'Every kind of action' },
  { to: '/react/checkbox', name: 'Checkbox', description: 'A clear choice' },
  { to: '/react/combobox', name: 'Combobox', description: 'Find the right option' },
  { to: '/react/fieldset', name: 'Fieldset', description: 'Bring fields together' },
  { to: '/react/input', name: 'Input', description: 'Start a conversation' },
  { to: '/react/listbox', name: 'Listbox', description: 'Selection, your way' },
  { to: '/react/radio-group', name: 'Radio Group', description: 'Choose one' },
  { to: '/react/select', name: 'Select', description: 'A familiar native control' },
  { to: '/react/switch', name: 'Switch', description: 'A change of state' },
  { to: '/react/textarea', name: 'Textarea', description: 'Space for more' },
]

function ComponentLinks({ title, items }: { title: string; items: Item[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <ul className="grid gap-x-8 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="group flex items-center justify-between gap-4 border-b border-border py-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <span>
                <span className="block text-sm font-medium text-foreground">{item.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{item.description}</span>
              </span>
              <ArrowRightLinear
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-14 pb-12 text-center sm:px-8 sm:pt-20 sm:pb-16">
        <h1 className="mx-auto max-w-5xl text-4xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
          Headless UI, beautifully composed.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg">
          Accessible React components with Graphite&apos;s signature glass finish. Copy the source,
          keep your own theme, and make every detail yours.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <DataInteractive>
            <a
              href="#components"
              className={cn(buttonVariants(), 'min-h-11 gap-2 rounded-full px-5')}
            >
              Browse components
              <ArrowRightLinear aria-hidden="true" className="size-4" />
            </a>
          </DataInteractive>
          <DataInteractive>
            <a
              href="/using-graphite.md"
              className={cn(buttonVariants({ variant: 'secondary' }), 'min-h-11 rounded-full px-5')}
            >
              Read the guide
            </a>
          </DataInteractive>
        </div>
        <p className="mt-6 text-xs text-muted-foreground sm:text-sm">
          <code className="select-all">npx shadcn add @graphite/button</code>
        </p>
      </section>

      <HomeShowcase />

      <section
        id="components"
        aria-labelledby="components-heading"
        className="mx-auto max-w-7xl scroll-mt-32 px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-24"
      >
        <div className="mb-10 max-w-2xl">
          <h2
            id="components-heading"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Explore the components
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Start with one. Add what you need. Every component comes with a live preview and code
            you can make your own.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ComponentLinks title="Components" items={components} />
          <ComponentLinks title="Forms" items={forms} />
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">Want to see a complete composition?</p>
          <Link
            to="/signup"
            className="inline-flex w-fit items-center gap-2 rounded-sm font-medium text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Explore the signup form
            <ArrowRightLinear aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
