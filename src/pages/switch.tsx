import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { PreviewCode } from '@/components/preview-code'

export function Preview() {
  const [enabled, setEnabled] = useState(true)
  const [compact, setCompact] = useState(false)
  return (
    <div className="flex items-center gap-6">
      <Switch checked={enabled} onChange={setEnabled} />
      <Switch size="sm" checked={compact} onChange={setCompact} />
    </div>
  )
}

const code = `import { useState } from 'react'
import { Switch } from '@/components/ui/switch'

export function Example() {
  const [enabled, setEnabled] = useState(true)
  const [compact, setCompact] = useState(false)
  return (
    <>
      <Switch checked={enabled} onChange={setEnabled} />
      <Switch size="sm" checked={compact} onChange={setCompact} />
    </>
  )
}
`

export default function SwitchPage() {
  return (
    <PreviewCode
      title="Switch"
      description="A toggle that swaps a value between two states. Sizes: default and sm for dense settings rows."
      preview={<Preview />}
      code={code}
    />
  )
}
