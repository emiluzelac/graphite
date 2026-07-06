import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { PreviewCode } from '@/components/preview-code'
import { SettingsLinear } from '@emiluzelac/icona'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-3">{children}</div>
    </div>
  )
}

export function Preview({ compact = false }: { compact?: boolean }) {
  if (compact)
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Save changes</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    )
  return (
    <div className="flex flex-col items-center gap-8">
      <Row label="Variants">
        <Button>Save changes</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="outline">Export</Button>
        <Button variant="ghost">Learn more</Button>
        <Button variant="destructive">Delete</Button>
      </Row>
      <Row label="Sizes">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="outline" aria-label="Settings">
          <SettingsLinear className="size-4" />
        </Button>
      </Row>
      <Row label="State">
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </Row>
    </div>
  )
}

const code = `import { Button } from '@/components/ui/button'
import { SettingsLinear } from '@emiluzelac/icona'

export function Example() {
  return (
    <>
      {/* variants */}
      <Button>Save changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="outline">Export</Button>
      <Button variant="ghost">Learn more</Button>
      <Button variant="destructive">Delete</Button>

      {/* sizes */}
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" variant="outline" aria-label="Settings">
        <SettingsLinear className="size-4" />
      </Button>

      {/* state */}
      <Button disabled>Disabled</Button>
    </>
  )
}
`

export default function ButtonPage() {
  return (
    <PreviewCode
      title="Button"
      description="CVA-powered variants and sizes on top of the Headless UI button. Import buttonVariants to style links or other elements as buttons."
      preview={<Preview />}
      code={code}
    />
  )
}
