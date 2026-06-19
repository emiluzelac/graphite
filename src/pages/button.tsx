import { Button } from '@/components/ui/button'
import { PreviewCode } from '@/components/preview-code'
import { SettingsLinear } from '@emiluzelac/icona'

export function Preview() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Save changes</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="outline">Export</Button>
        <Button variant="ghost">Learn more</Button>
        <Button variant="destructive">Delete</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="outline" aria-label="Settings">
          <SettingsLinear className="size-4" />
        </Button>
      </div>
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
      <Button disabled>Disabled</Button>

      {/* sizes */}
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" variant="outline" aria-label="Settings">
        <SettingsLinear className="size-4" />
      </Button>
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
