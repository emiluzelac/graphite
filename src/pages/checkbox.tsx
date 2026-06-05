import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, Label } from '@/components/ui/field'
import { PreviewCode } from '@/components/preview-code'

function Preview() {
  const [enabled, setEnabled] = useState(true)
  return (
    <Field className="flex items-center gap-3 space-y-0">
      <Checkbox checked={enabled} onChange={setEnabled} />
      <Label>Enable beta features</Label>
    </Field>
  )
}

const code = `import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, Label } from '@/components/ui/field'

export function Example() {
  const [enabled, setEnabled] = useState(true)
  return (
    <Field className="flex items-center gap-3 space-y-0">
      <Checkbox checked={enabled} onChange={setEnabled} />
      <Label>Enable beta features</Label>
    </Field>
  )
}
`

export default function CheckboxPage() {
  return (
    <PreviewCode
      title="Checkbox"
      description="An accessible checkbox with full state styling via data attributes."
      preview={<Preview />}
      code={code}
    />
  )
}
