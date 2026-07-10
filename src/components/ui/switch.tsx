import { Switch as HUISwitch, type SwitchProps as HUISwitchProps } from '@headlessui/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { composeClass } from '@/lib/cn'

const switchVariants = cva(
  [
    'group relative flex shrink-0 cursor-pointer rounded-full border-0 bg-input p-1 transition-colors duration-200 ease-in-out',
    'focus:not-data-focus:outline-none data-focus:outline-1 data-focus:outline-ring',
    'data-checked:bg-primary',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        default: 'h-7 w-14',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

const knobVariants = cva(
  [
    'pointer-events-none inline-block translate-x-0 rounded-full bg-foreground shadow-lg ring-0',
    'transition duration-200 ease-in-out group-data-checked:bg-primary-foreground',
  ],
  {
    variants: {
      size: {
        sm: 'size-3 group-data-checked:translate-x-4',
        default: 'size-5 group-data-checked:translate-x-7',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type SwitchProps = HUISwitchProps & VariantProps<typeof switchVariants>

export function Switch({ className, size, ...props }: SwitchProps) {
  return (
    <HUISwitch {...props} className={composeClass(switchVariants({ size }), className)}>
      <span aria-hidden="true" className={knobVariants({ size })} />
    </HUISwitch>
  )
}
