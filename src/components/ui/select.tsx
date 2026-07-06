import { Select as HUISelect, type SelectProps as HUISelectProps } from '@headlessui/react'
import { AltArrowDownLinear } from '@emiluzelac/icona'
import { composeClass } from '@/lib/cn'

export type SelectProps = HUISelectProps

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <HUISelect
        {...props}
        className={composeClass(
          [
            'block w-full appearance-none rounded-lg glass-flat px-3 py-1.5 pr-9 text-sm/6 text-foreground',
            'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-ring',
          ].join(' '),
          className,
        )}
      >
        {children}
      </HUISelect>
      <AltArrowDownLinear
        className="pointer-events-none absolute top-2.5 right-2.5 size-4 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  )
}
