import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@/components/ui/popover'
import { PreviewCode } from '@/components/preview-code'
import {
  AltArrowDownLinear,
  ChartLinear,
  ChartSquareLinear,
  CursorLinear,
  ShieldCheckLinear,
} from 'icona'

const solutions = [
  { name: 'Insights', desc: 'Measure actions your users take', Icon: ChartLinear },
  { name: 'Automations', desc: 'Create your own targeted content', Icon: CursorLinear },
  { name: 'Reports', desc: 'Keep track of your growth', Icon: ChartSquareLinear },
  { name: 'Security', desc: 'Lock down sensitive data', Icon: ShieldCheckLinear },
]

function Preview() {
  return (
    <PopoverGroup className="flex items-center gap-6 text-sm">
      <a href="#" className="font-medium text-gray-700 hover:text-gray-900 dark:text-white/80 dark:hover:text-white">
        Products
      </a>
      <Popover className="relative" __demoMode>
        <PopoverButton>
          Solutions
          <AltArrowDownLinear className="size-4 transition group-data-open:rotate-180" />
        </PopoverButton>
        <PopoverPanel anchor="bottom" className="w-80">
          {solutions.map((s) => (
            <a
              key={s.name}
              href="#"
              className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <s.Icon className="mt-0.5 size-5 text-sky-600 dark:text-sky-400" />
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-gray-500 dark:text-white/50">{s.desc}</div>
              </div>
            </a>
          ))}
        </PopoverPanel>
      </Popover>
      <a href="#" className="font-medium text-gray-700 hover:text-gray-900 dark:text-white/80 dark:hover:text-white">
        Pricing
      </a>
    </PopoverGroup>
  )
}

const code = `import { Popover, PopoverButton, PopoverPanel } from '@/components/ui/popover'
import { AltArrowDownLinear } from 'icona'

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
