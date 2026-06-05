import { PreviewCode } from '@/components/preview-code'
import { SignupForm } from '@/components/signup-form'

const code = `import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Description, Field, Label } from '@/components/ui/field'
import { Fieldset, Legend } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'

export function SignupForm() {
  const [agreed, setAgreed] = useState(false)

  return (
    <form className="w-full max-w-md">
      <Fieldset>
        <Legend>Create your account</Legend>
        <Field>
          <Label>Full name</Label>
          <Input name="name" required />
        </Field>
        <Field>
          <Label>Email</Label>
          <Description>We'll never share your email.</Description>
          <Input name="email" type="email" required />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input name="password" type="password" required />
        </Field>
        <Field className="flex items-start gap-3 space-y-0">
          <Checkbox checked={agreed} onChange={setAgreed} className="mt-0.5" />
          <Label className="font-normal">I agree to the terms and privacy policy.</Label>
        </Field>
        <Button type="submit" disabled={!agreed} className="w-full justify-center">
          Sign up
        </Button>
      </Fieldset>
    </form>
  )
}
`

export default function SignupPage() {
  return (
    <PreviewCode
      title="Signup form"
      description="A real composition built entirely from primitives in components/ui."
      preview={<SignupForm />}
      code={code}
    />
  )
}
