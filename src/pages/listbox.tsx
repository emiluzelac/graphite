import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@/components/ui/listbox'
import { PreviewCode } from '@/components/preview-code'

const people = [
  { id: 1, name: 'John' },
  { id: 2, name: 'George' },
  { id: 3, name: 'Paul' },
  { id: 4, name: 'Ringo' },
]

function Preview() {
  const [selected, setSelected] = useState(people[0])
  return (
    <div className="w-60">
      <Listbox value={selected} onChange={setSelected} __demoMode>
        <ListboxButton>{selected.name}</ListboxButton>
        <ListboxOptions>
          {people.map((person) => (
            <ListboxOption key={person.id} value={person}>
              {person.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}

const code = `import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@/components/ui/listbox'

export function Example() {
  const [selected, setSelected] = useState(people[0])
  return (
    <Listbox value={selected} onChange={setSelected} __demoMode>
      <ListboxButton>{selected.name}</ListboxButton>
      <ListboxOptions>
        {people.map((p) => <ListboxOption key={p.id} value={p}>{p.name}</ListboxOption>)}
      </ListboxOptions>
    </Listbox>
  )
}
`

export default function ListboxPage() {
  return (
    <PreviewCode
      title="Listbox"
      description="Custom select menus with full keyboard navigation."
      preview={<Preview />}
      code={code}
    />
  )
}
