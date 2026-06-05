import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { PreviewCode } from '@/components/preview-code'
import { cn } from '@/lib/cn'
import { RefreshLinear } from 'icona'

function Preview() {
  const [isShowing, setIsShowing] = useState(true)
  return (
    <div className="flex flex-col items-center">
      <div className="size-24">
        <Transition show={isShowing}>
          <div
            className={cn(
              'size-full rounded-xl bg-gradient-to-br from-primary/60 to-primary shadow-lg transition duration-400',
              'data-closed:scale-50 data-closed:rotate-[-120deg] data-closed:opacity-0',
              'data-leave:duration-200 data-leave:ease-in-out',
              'data-leave:data-closed:scale-95 data-leave:data-closed:rotate-0',
            )}
          />
        </Transition>
      </div>
      <Button
        variant="secondary"
        className="mt-10 rounded-full"
        onClick={() => {
          setIsShowing(false)
          setTimeout(() => setIsShowing(true), 500)
        }}
      >
        <RefreshLinear className="size-4 text-muted-foreground" />
        Click to transition
      </Button>
    </div>
  )
}

const code = `import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { RefreshLinear } from 'icona'

export function Example() {
  const [isShowing, setIsShowing] = useState(true)
  return (
    <div className="flex flex-col items-center">
      <div className="size-24">
        <Transition show={isShowing}>
          <div
            className={cn(
              'size-full rounded-xl bg-gradient-to-br from-primary/60 to-primary shadow-lg transition duration-400',
              'data-closed:scale-50 data-closed:rotate-[-120deg] data-closed:opacity-0',
              'data-leave:duration-200 data-leave:ease-in-out',
              'data-leave:data-closed:scale-95 data-leave:data-closed:rotate-0',
            )}
          />
        </Transition>
      </div>
      <Button
        variant="secondary"
        className="mt-10 rounded-full"
        onClick={() => {
          setIsShowing(false)
          setTimeout(() => setIsShowing(true), 500)
        }}
      >
        <RefreshLinear className="size-4 text-muted-foreground" />
        Click to transition
      </Button>
    </div>
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
