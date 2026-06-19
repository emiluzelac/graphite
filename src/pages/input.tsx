import { Description, Field, Label } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PreviewCode } from '@/components/preview-code'

export function Preview() {
  return (
    <Field className="w-full max-w-sm">
      <Label>Username</Label>
      <Description>Use your real name so people will recognize you.</Description>
      <Input name="full_name" className="mt-3" />
    </Field>
  )
}

const code = `import { Description, Field, Label } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function Example() {
  return (
    <Field>
      <Label>Username</Label>
      <Description>Use your real name so people will recognize you.</Description>
      <Input name="full_name" className="mt-3" />
    </Field>
  )
}
`

export default function InputPage() {
  return (
    <PreviewCode
      title="Input"
      description="A native input wrapper with hover, focus, and disabled states baked in."
      preview={<Preview />}
      code={code}
    />
  )
}
