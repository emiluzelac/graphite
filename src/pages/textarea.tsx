import { Description, Field, Label } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { PreviewCode } from '@/components/preview-code'

export function Preview() {
  return (
    <Field className="w-full max-w-md">
      <Label>Description</Label>
      <Description>This will be shown under the product title.</Description>
      <Textarea name="description" rows={4} className="mt-3" />
    </Field>
  )
}

const code = `import { Description, Field, Label } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

export function Example() {
  return (
    <Field>
      <Label>Description</Label>
      <Description>This will be shown under the product title.</Description>
      <Textarea name="description" rows={4} className="mt-3" />
    </Field>
  )
}
`

export default function TextareaPage() {
  return (
    <PreviewCode
      title="Textarea"
      description="A native textarea wrapper with consistent state styling."
      preview={<Preview />}
      code={code}
    />
  )
}
