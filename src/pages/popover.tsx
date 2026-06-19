import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@/components/ui/popover'
import { PreviewCode } from '@/components/preview-code'
import {
  AltArrowDownLinear,
  ChartLinear,
  ChartSquareLinear,
  CursorLinear,
  ShieldCheckLinear,
} from '@emiluzelac/icona'

const solutions = [
  { name: 'Insights', desc: 'Measure actions your users take', Icon: ChartLinear },
  { name: 'Automations', desc: 'Create your own targeted content', Icon: CursorLinear },
  { name: 'Reports', desc: 'Keep track of your growth', Icon: ChartSquareLinear },
  { name: 'Security', desc: 'Lock down sensitive data', Icon: ShieldCheckLinear },
]

export function Preview({ demoMode = true }: { demoMode?: boolean }) {
  return (
    <PopoverGroup className="flex items-center gap-6 text-sm">
      <a href="#" className="font-medium text-muted-foreground hover:text-foreground">
        Products
      </a>
      <Popover className="relative" __demoMode={demoMode}>
        <PopoverButton>
          Solutions
          <AltArrowDownLinear className="size-4 transition group-data-open:rotate-180" />
        </PopoverButton>
        <PopoverPanel anchor="bottom" className="w-80">
          {solutions.map((s) => (
            <a
              key={s.name}
              href="#"
              className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent"
            >
              <s.Icon className="mt-0.5 size-5 text-primary" />
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-muted-foreground">{s.desc}</div>
              </div>
            </a>
          ))}
        </PopoverPanel>
      </Popover>
      <a href="#" className="font-medium text-muted-foreground hover:text-foreground">
        Pricing
      </a>
    </PopoverGroup>
  )
}

const code = `import { Popover, PopoverButton, PopoverPanel } from '@/components/ui/popover'
import { AltArrowDownLinear } from '@emiluzelac/icona'

export function Example() {
  return (
    <Popover className="relative" __demoMode>
      <PopoverButton>
        Solutions
        <AltArrowDownLinear className="size-4 group-data-open:rotate-180" />
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="w-80">
        {/* ... */}
      </PopoverPanel>
    </Popover>
  )
}
`

export default function PopoverPage() {
  return (
    <PreviewCode
      title="Popover"
      description="Floating panels with arbitrary content, perfect for nav menus and flyouts."
      preview={<Preview />}
      code={code}
    />
  )
}
