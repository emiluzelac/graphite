import { useState } from 'react'
import { Field, Label } from '@/components/ui/field'
import { Radio, RadioGroup } from '@/components/ui/radio-group'
import { PreviewCode } from '@/components/preview-code'

const plans = [
  { name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256GB SSD' },
  { name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512GB SSD' },
  { name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1TB SSD' },
]

function Preview() {
  const [selected, setSelected] = useState(plans[0])
  return (
    <div className="w-full max-w-md">
      <RadioGroup value={selected} onChange={setSelected} aria-label="Server size">
        {plans.map((plan) => (
          <Field
            key={plan.name}
            className="flex items-center gap-3 space-y-0 rounded-xl bg-gray-100 p-4 transition data-checked:bg-gray-200 dark:bg-white/5 dark:data-checked:bg-white/10"
          >
            <Radio value={plan} />
            <Label className="flex-1 font-normal">
              <div className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                {plan.name}
              </div>
              <div className="flex gap-2 text-xs text-gray-500 dark:text-white/50">
                <span>{plan.ram}</span>
                <span aria-hidden="true">·</span>
                <span>{plan.cpus}</span>
                <span aria-hidden="true">·</span>
                <span>{plan.disk}</span>
              </div>
            </Label>
          </Field>
        ))}
      </RadioGroup>
    </div>
  )
}

const code = `import { useState } from 'react'
import { Field, Label } from '@/components/ui/field'
import { Radio, RadioGroup } from '@/components/ui/radio-group'

export function Example() {
  const [selected, setSelected] = useState(plans[0])
  return (
    <RadioGroup value={selected} onChange={setSelected} aria-label="Server size">
      {plans.map((plan) => (
        <Field key={plan.name} className="flex items-center gap-3 rounded-xl bg-gray-100 p-4 data-checked:bg-gray-200 dark:bg-white/5 dark:data-checked:bg-white/10">
          <Radio value={plan} />
          <Label>{plan.name}</Label>
        </Field>
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
