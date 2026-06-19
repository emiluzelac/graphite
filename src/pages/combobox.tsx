import { useState } from 'react'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@/components/ui/combobox'
import { PreviewCode } from '@/components/preview-code'

const people = [
  { id: 1, name: 'Tom Cook' },
  { id: 2, name: 'Wade Cooper' },
  { id: 3, name: 'Tanya Fox' },
  { id: 4, name: 'Arlene Mccoy' },
  { id: 5, name: 'Devon Webb' },
]

export function Preview({ demoMode = true }: { demoMode?: boolean }) {
  const [selected, setSelected] = useState(people[1])
  const [query, setQuery] = useState('')

  const filtered =
    query === '' ? people : people.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="w-72">
      <Combobox
        value={selected}
        onChange={(v) => v && setSelected(v)}
        onClose={() => setQuery('')}
        __demoMode={demoMode}
      >
        <ComboboxInput
          displayValue={(p: { name: string } | null) => p?.name ?? ''}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ComboboxOptions>
          {filtered.map((person) => (
            <ComboboxOption key={person.id} value={person}>
              {person.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}

const code = `import { useState } from 'react'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@/components/ui/combobox'

export function Example() {
  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')
  const filtered = query === '' ? people : people.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <Combobox value={selected} onChange={(v) => v && setSelected(v)} onClose={() => setQuery('')} __demoMode>
      <ComboboxInput displayValue={(p) => p?.name} onChange={(e) => setQuery(e.target.value)} />
      <ComboboxOptions>
        {filtered.map((p) => <ComboboxOption key={p.id} value={p}>{p.name}</ComboboxOption>)}
      </ComboboxOptions>
    </Combobox>
  )
}
`

export default function ComboboxPage() {
  return (
    <PreviewCode
      title="Combobox"
      description="Autocomplete with searchable options and full keyboard navigation."
      preview={<Preview />}
      code={code}
    />
  )
}
