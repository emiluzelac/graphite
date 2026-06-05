import { Button } from '@/components/ui/button'
import { PreviewCode } from '@/components/preview-code'

function Preview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Save changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Learn more</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}

const code = `import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <>
      <Button>Save changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Learn more</Button>
      <Button disabled>Disabled</Button>
    </>
  )
}
`

export default function ButtonPage() {
  return (
    <PreviewCode
      title="Button"
      description="A wrapper around the native button with opinionated states for hover, focus, and active."
      preview={<Preview />}
      code={code}
    />
  )
}
