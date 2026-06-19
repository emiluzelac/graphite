import { useState } from 'react'
import { Radio, RadioGroup } from '@/components/ui/radio-group'
import { PreviewCode } from '@/components/preview-code'
import { CheckCircleBold } from '@emiluzelac/icona'

const plans = [
  { name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256GB SSD disk' },
  { name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512GB SSD disk' },
  { name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1TB SSD disk' },
]

export function Preview() {
  const [selected, setSelected] = useState(plans[0])
  return (
    <div className="w-full max-w-md">
      <RadioGroup by="name" value={selected} onChange={setSelected} aria-label="Server size">
        {plans.map((plan) => (
          <Radio key={plan.name} value={plan}>
            <div className="flex w-full items-center justify-between">
              <div className="text-sm/6">
                <p className="font-semibold text-foreground">{plan.name}</p>
                <div className="flex gap-2 text-muted-foreground">
                  <div>{plan.ram}</div>
                  <div aria-hidden="true">&middot;</div>
                  <div>{plan.cpus}</div>
                  <div aria-hidden="true">&middot;</div>
                  <div>{plan.disk}</div>
                </div>
              </div>
              <CheckCircleBold className="size-6 text-primary opacity-0 transition group-data-checked:opacity-100" />
            </div>
          </Radio>
        ))}
      </RadioGroup>
    </div>
  )
}

const code = `import { useState } from 'react'
import { Radio, RadioGroup } from '@/components/ui/radio-group'
import { CheckCircleBold } from '@emiluzelac/icona'

export function Example() {
  const [selected, setSelected] = useState(plans[0])
  return (
    <RadioGroup by="name" value={selected} onChange={setSelected} aria-label="Server size">
      {plans.map((plan) => (
        <Radio key={plan.name} value={plan}>
          <div className="flex w-full items-center justify-between">
            <div className="text-sm/6">
              <p className="font-semibold text-foreground">{plan.name}</p>
              <div className="flex gap-2 text-muted-foreground">
                <div>{plan.ram}</div>
                <div aria-hidden="true">&middot;</div>
                <div>{plan.cpus}</div>
                <div aria-hidden="true">&middot;</div>
                <div>{plan.disk}</div>
              </div>
            </div>
            <CheckCircleBold className="size-6 text-primary opacity-0 transition group-data-checked:opacity-100" />
          </div>
        </Radio>
      ))}
    </RadioGroup>
  )
}
`

export default function RadioGroupPage() {
  return (
    <PreviewCode
      title="Radio Group"
      description="Native-radio semantics, completely custom UI, full keyboard support."
      preview={<Preview />}
      code={code}
    />
  )
}
