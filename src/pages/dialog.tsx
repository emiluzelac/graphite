import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogPanel, DialogTitle } from '@/components/ui/dialog'
import { PreviewCode } from '@/components/preview-code'
import { CheckCircleBold } from '@emiluzelac/icona'

function Preview() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} __demoMode>
        <DialogPanel>
          <CheckCircleBold className="size-10 text-emerald-500" />
          <DialogTitle>Payment successful</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Your payment has been successfully submitted. We've sent you an email with the order
            details.
          </p>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Got it, thanks!
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}

const code = `import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogPanel, DialogTitle } from '@/components/ui/dialog'

export function Example() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogPanel>
          <DialogTitle>Payment successful</DialogTitle>
          <p>Your payment has been submitted.</p>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Got it</Button>
        </DialogPanel>
      </Dialog>
    </>
  )
}
`

export default function DialogPage() {
  return (
    <PreviewCode
      title="Dialog"
      description="A fully-managed renderless modal with focus traps, scroll locking, and accessibility features."
      preview={<Preview />}
      code={code}
    />
  )
}
