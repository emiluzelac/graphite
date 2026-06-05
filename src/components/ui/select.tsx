import { Select as HUISelect, type SelectProps as HUISelectProps } from '@headlessui/react'
import { AltArrowDownLinear } from 'icona'
import { cn } from '@/lib/cn'

export interface SelectProps extends Omit<HUISelectProps, 'className'> {
  className?: string
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <HUISelect
        {...props}
        className={cn(
          'block w-full appearance-none rounded-lg border border-input bg-card px-3 py-1.5 pr-9 text-sm/6 text-foreground',
          'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-ring',
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
