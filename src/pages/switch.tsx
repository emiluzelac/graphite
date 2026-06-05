import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { PreviewCode } from '@/components/preview-code'

function Preview() {
  const [enabled, setEnabled] = useState(true)
  return <Switch checked={enabled} onChange={setEnabled} />
}

const code = `import { useState } from 'react'
import { Switch } from '@/components/ui/switch'

export function Example() {
  const [enabled, setEnabled] = useState(true)
  return <Switch checked={enabled} onChange={setEnabled} />
}
`

export default function SwitchPage() {
  return (
    <PreviewCode
      title="Switch"
      description="A toggle that swaps a value between two states."
      preview={<Preview />}
      code={code}
    />
  )
}
