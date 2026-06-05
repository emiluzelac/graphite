import { Field, Label } from '@/components/ui/field'
import { Select } from '@/components/ui/select'
import { PreviewCode } from '@/components/preview-code'

function Preview() {
  return (
    <Field className="w-full max-w-sm">
      <Label>Project status</Label>
      <Select name="status" defaultValue="active">
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="delayed">Delayed</option>
        <option value="canceled">Canceled</option>
      </Select>
    </Field>
  )
}

const code = `import { Field, Label } from '@/components/ui/field'
import { Select } from '@/components/ui/select'

export function Example() {
  return (
    <Field>
      <Label>Project status</Label>
      <Select name="status">
        <option value="active">Active</option>
        <option value="paused">Paused</option>
      </Select>
    </Field>
  )
}
`

export default function SelectPage() {
  return (
    <PreviewCode
      title="Select"
      description="A wrapper around the native select with consistent state styling."
      preview={<Preview />}
      code={code}
    />
  )
}
