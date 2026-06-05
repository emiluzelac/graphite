import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Description, Field, Label } from '@/components/ui/field'
import { Fieldset, Legend } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'

export function SignupForm() {
  const [agreed, setAgreed] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    alert(`Signed up:\n${JSON.stringify(Object.fromEntries(data), null, 2)}`)
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <Fieldset>
        <Legend>Create your account</Legend>
        <Field>
          <Label>Full name</Label>
          <Input name="name" required autoComplete="name" />
        </Field>
        <Field>
          <Label>Email</Label>
          <Description>We'll never share your email.</Description>
          <Input name="email" type="email" required autoComplete="email" />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input name="password" type="password" required autoComplete="new-password" />
        </Field>
        <Field className="flex items-start gap-3 space-y-0">
          <Checkbox
            checked={agreed}
            onChange={setAgreed}
            name="terms"
            value="agreed"
            className="mt-0.5"
          />
          <Label className="font-normal text-muted-foreground">
            I agree to the{' '}
            <a href="#" className="font-medium text-foreground underline">
              terms
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-foreground underline">
              privacy policy
            </a>
            .
          </Label>
        </Field>
        <Button type="submit" disabled={!agreed} className="w-full justify-center">
          Sign up
        </Button>
      </Fieldset>
    </form>
  )
}
