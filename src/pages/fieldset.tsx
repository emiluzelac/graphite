import { Field, Label } from '@/components/ui/field'
import { Fieldset, Legend } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PreviewCode } from '@/components/preview-code'

function Preview() {
  return (
    <Fieldset className="w-full max-w-md">
      <Legend>Shipping details</Legend>
      <Field>
        <Label>Street address</Label>
        <Input name="address" />
      </Field>
      <Field>
        <Label>Country</Label>
        <Select name="country">
          <option>Canada</option>
          <option>Mexico</option>
          <option>United States</option>
        </Select>
      </Field>
      <Field>
        <Label>Delivery notes</Label>
        <Textarea name="notes" rows={3} />
      </Field>
    </Fieldset>
  )
}

const code = `import { Field, Label } from '@/components/ui/field'
import { Fieldset, Legend } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

export function Example() {
  return (
    <Fieldset>
      <Legend>Shipping details</Legend>
      <Field>
        <Label>Street address</Label>
        <Input name="address" />
      </Field>
      <Field>
        <Label>Country</Label>
        <Select name="country">
          <option>Canada</option>
          <option>Mexico</option>
        </Select>
      </Field>
    </Fieldset>
  )
}
`

export default function FieldsetPage() {
  return (
    <PreviewCode
      title="Fieldset"
      description="Group form controls together with an accessible legend."
      preview={<Preview />}
      code={code}
    />
  )
}
