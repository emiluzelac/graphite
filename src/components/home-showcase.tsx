import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { AltArrowDownLinear, CodeSquareLinear } from '@emiluzelac/icona'
import { Link } from 'react-router'
import { Backdrop } from '@/components/ui/backdrop'
import { Button, CloseButton } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DataList,
  DataListCell,
  DataListColumn,
  DataListHeader,
  DataListRow,
} from '@/components/ui/data-list'
import { Dialog, DialogPanel, DialogTitle } from '@/components/ui/dialog'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@/components/ui/disclosure'
import { Description, Field, Label } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

function PreviewCard({
  title,
  description,
  href,
  linkLabel,
  children,
}: {
  title: string
  description: string
  href: string
  linkLabel: string
  children: ReactNode
}) {
  const titleId = useId()
  return (
    <article
      aria-labelledby={titleId}
      className="min-w-0 rounded-2xl glass-flat p-5 shadow-sm shadow-foreground/5 sm:p-6"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 id={titleId} className="text-base font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <Link
          to={href}
          aria-label={linkLabel}
          className="-mt-1 -mr-1 flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <CodeSquareLinear aria-hidden="true" className="size-4" />
        </Link>
      </div>
      {children}
    </article>
  )
}

function EssentialsPreview() {
  const [open, setOpen] = useState(false)
  const [project, setProject] = useState('Untitled project')
  const [enabled, setEnabled] = useState(true)
  const [alerts, setAlerts] = useState(false)

  function reset() {
    setProject('Untitled project')
    setEnabled(true)
    setAlerts(false)
  }

  return (
    <PreviewCard
      title="Everyday essentials"
      description="Small details that work together."
      href="/react/button"
      linkLabel="View button components"
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => setOpen(true)}>
            Open dialog
          </Button>
          <Button type="button" variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
        <Field>
          <Label>Project name</Label>
          <Input value={project} onChange={(event) => setProject(event.target.value)} />
        </Field>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Field className="flex items-center gap-2.5 space-y-0">
            <Checkbox checked={enabled} onChange={setEnabled} />
            <Label>Enabled</Label>
          </Field>
          <Field className="flex items-center gap-2.5 space-y-0">
            <Label>Alerts</Label>
            <Switch size="sm" checked={alerts} onChange={setAlerts} />
          </Field>
        </div>
      </div>
      <Dialog open={open} onClose={setOpen}>
        <DialogPanel>
          <DialogTitle>A closer look</DialogTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            Headless UI handles focus, keyboard navigation, and dismissal. This is a local component
            preview.
          </p>
          <CloseButton type="button" variant="secondary">
            Close preview
          </CloseButton>
        </DialogPanel>
      </Dialog>
    </PreviewCard>
  )
}

const people = [
  { name: 'Ada Lovelace', team: 'Engineering' },
  { name: 'Alan Turing', team: 'Research' },
  { name: 'Grace Hopper', team: 'Compiler' },
  { name: 'Katherine Johnson', team: 'Trajectory' },
]

function PeoplePreview() {
  return (
    <PreviewCard
      title="Room for everyone"
      description="Example records, neatly aligned."
      href="/react/data-list"
      linkLabel="View the data list"
    >
      <DataList columns="minmax(0, 1fr) auto" aria-label="Example team members">
        <DataListHeader>
          <DataListColumn>Name</DataListColumn>
          <DataListColumn align="right">Team</DataListColumn>
        </DataListHeader>
        {people.map((person) => (
          <DataListRow key={person.name}>
            <DataListCell className="min-w-0 font-medium text-foreground">
              {person.name}
            </DataListCell>
            <DataListCell align="right" className="text-xs text-muted-foreground">
              {person.team}
            </DataListCell>
          </DataListRow>
        ))}
      </DataList>
    </PreviewCard>
  )
}

function ProfilePreview() {
  const [updates, setUpdates] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <PreviewCard
      title="Your profile"
      description="A few fields. A complete composition."
      href="/react/fieldset"
      linkLabel="View form components"
    >
      <form
        aria-label="Profile preview"
        onSubmit={submit}
        onInput={() => setSubmitted(false)}
        className="space-y-4"
      >
        <Field>
          <Label>Display name</Label>
          <Input name="name" defaultValue="Alex Morgan" required autoComplete="off" />
        </Field>
        <Field>
          <Label>Email address</Label>
          <Input
            name="email"
            type="email"
            defaultValue="alex@example.com"
            required
            autoComplete="off"
          />
        </Field>
        <Field>
          <Label>Your role</Label>
          <Select name="role" defaultValue="designer">
            <option value="designer">Designer</option>
            <option value="developer">Developer</option>
            <option value="product">Product manager</option>
          </Select>
        </Field>
        <Field>
          <Label>A little about you</Label>
          <Textarea name="bio" rows={2} defaultValue="Making useful things for the web." />
        </Field>
        <Field className="flex items-start gap-3 space-y-0 py-1">
          <Checkbox
            name="updates"
            checked={updates}
            onChange={(checked) => {
              setUpdates(checked)
              setSubmitted(false)
            }}
            className="mt-0.5 shrink-0"
          />
          <Label className="font-normal">Keep me in the loop with product updates.</Label>
        </Field>
        <Button type="submit" className="min-h-10 w-full">
          Save preview
        </Button>
        <p role="status" className="min-h-5 text-center text-xs leading-5 text-muted-foreground">
          {submitted ? 'Preview updated. No data was sent.' : 'Try it out. This is a local demo.'}
        </p>
      </form>
    </PreviewCard>
  )
}

function Preference({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <Field className="flex items-center justify-between gap-4 space-y-0 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <Label>{label}</Label>
        <Description>{description}</Description>
      </div>
      <Switch size="sm" checked={checked} onChange={onChange} />
    </Field>
  )
}

function PreferencesPreview() {
  const [email, setEmail] = useState(true)
  const [push, setPush] = useState(false)
  const [profile, setProfile] = useState(true)
  const [activity, setActivity] = useState(false)

  return (
    <PreviewCard
      title="Preferences"
      description="Different views. The same attention to detail."
      href="/react/tabs"
      linkLabel="View tab components"
    >
      <TabGroup>
        <TabList className="w-fit max-w-full gap-1">
          <Tab>Notifications</Tab>
          <Tab>Privacy</Tab>
        </TabList>
        <TabPanels className="mt-5">
          <TabPanel className="divide-y divide-border rounded-none bg-transparent p-0">
            <Preference
              label="Email notifications"
              description="A summary in your inbox."
              checked={email}
              onChange={setEmail}
            />
            <Preference
              label="Push notifications"
              description="Updates as they happen."
              checked={push}
              onChange={setPush}
            />
          </TabPanel>
          <TabPanel className="divide-y divide-border rounded-none bg-transparent p-0">
            <Preference
              label="Public profile"
              description="Let others find your work."
              checked={profile}
              onChange={setProfile}
            />
            <Preference
              label="Share activity"
              description="Show what you're working on."
              checked={activity}
              onChange={setActivity}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </PreviewCard>
  )
}

const questions = [
  {
    question: 'What gets installed?',
    answer:
      'The component source and its declared dependencies. The code lives in your app, ready to adapt.',
  },
  {
    question: 'Can I keep my own theme?',
    answer:
      'Yes. The Graphite theme is opt-in. Keep your existing tokens and provide the semantic mappings and glass utilities.',
  },
  {
    question: 'What handles the interactions?',
    answer:
      'Headless UI provides the keyboard and focus behavior. Graphite adds the styling and composable wrappers.',
  },
]

function QuestionsPreview() {
  return (
    <PreviewCard
      title="Good questions"
      description="A little context before you build."
      href="/react/disclosure"
      linkLabel="View disclosure components"
    >
      <div className="divide-y divide-border">
        {questions.map((item, index) => (
          <Disclosure
            key={item.question}
            as="div"
            defaultOpen={index === 0}
            className="py-4 first:pt-0 last:pb-0"
          >
            <DisclosureButton className="gap-3">
              {item.question}
              <AltArrowDownLinear
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-transform group-data-open:rotate-180 motion-reduce:transition-none"
              />
            </DisclosureButton>
            <DisclosurePanel className="leading-6">{item.answer}</DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </PreviewCard>
  )
}

export function HomeShowcase() {
  return (
    <section
      id="examples"
      aria-labelledby="examples-heading"
      className="relative isolate mx-auto max-w-7xl scroll-mt-32 px-5 pb-8 sm:px-8"
    >
      <Backdrop className="absolute opacity-30" />
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 id="examples-heading" className="text-sm font-semibold text-foreground">
          Live examples
        </h2>
        <p className="text-sm text-muted-foreground">
          Real components. Go ahead, make yourself at home.
        </p>
      </div>
      <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="grid min-w-0 gap-5">
          <EssentialsPreview />
          <PeoplePreview />
        </div>
        <ProfilePreview />
        <div className="grid min-w-0 gap-5 md:col-span-2 md:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
          <PreferencesPreview />
          <QuestionsPreview />
        </div>
      </div>
    </section>
  )
}
