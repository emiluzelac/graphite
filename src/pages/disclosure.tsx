import { Disclosure, DisclosureButton, DisclosurePanel } from '@/components/ui/disclosure'
import { PreviewCode } from '@/components/preview-code'
import { AltArrowDownLinear } from 'icona'

const faqs = [
  {
    q: 'What is your refund policy?',
    a: "If you're unhappy with your purchase, we'll refund you in full.",
  },
  { q: 'Do you offer technical support?', a: 'No.' },
  {
    q: 'Is team pricing available?',
    a: 'Yes — contact sales for a quote that works for your whole team.',
  },
]

function Preview() {
  return (
    <div className="w-full max-w-md divide-y divide-border rounded-xl bg-muted p-2">
      {faqs.map(({ q, a }, i) => (
        <Disclosure key={q} as="div" className="p-4" defaultOpen={i === 0}>
          <DisclosureButton>
            <span>{q}</span>
            <AltArrowDownLinear className="size-5 transition group-data-open:rotate-180" />
          </DisclosureButton>
          <DisclosurePanel>{a}</DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  )
}

const code = `import { Disclosure, DisclosureButton, DisclosurePanel } from '@/components/ui/disclosure'
import { AltArrowDownLinear } from 'icona'

export function Example() {
  return (
    <Disclosure as="div" className="p-4">
      <DisclosureButton>
        What is your refund policy?
        <AltArrowDownLinear className="size-5 group-data-open:rotate-180" />
      </DisclosureButton>
      <DisclosurePanel>If you're unhappy, we'll refund you in full.</DisclosurePanel>
    </Disclosure>
  )
}
`

export default function DisclosurePage() {
  return (
    <PreviewCode
      title="Disclosure"
      description="Show and hide content with togglable accordion panels."
      preview={<Preview />}
      code={code}
    />
  )
}
