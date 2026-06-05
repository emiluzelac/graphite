import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { PreviewCode } from '@/components/preview-code'

function Preview() {
  const [open, setOpen] = useState(true)
  return (
    <div className="flex flex-col items-center gap-6">
      <Button variant="secondary" onClick={() => setOpen((o) => !o)}>
        Click to transition
      </Button>
      <Transition show={open}>
        <div className="size-32 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg transition duration-300 ease-in-out data-closed:scale-90 data-closed:opacity-0" />
      </Transition>
    </div>
  )
}

const code = `import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { Button } from '@/components/ui/button'

export function Example() {
  const [open, setOpen] = useState(true)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen((o) => !o)}>
        Click to transition
      </Button>
      <Transition show={open}>
        <div className="size-32 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 transition duration-300 data-closed:scale-90 data-closed:opacity-0" />
      </Transition>
    </>
  )
}
`

export default function TransitionPage() {
  return (
    <PreviewCode
      title="Transition"
      description="Animate the entrance and exit of elements using CSS classes and data attributes."
      preview={<Preview />}
      code={code}
    />
  )
}
