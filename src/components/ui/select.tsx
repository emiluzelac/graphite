import { Select as HUISelect, type SelectProps as HUISelectProps } from '@headlessui/react'
import { SortVerticalLinear } from '@emiluzelac/icona'
import { composeClass } from '@/lib/cn'

export type SelectProps = HUISelectProps

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <HUISelect
        {...props}
        className={composeClass(
          [
            'block w-full cursor-pointer appearance-none rounded-lg glass-flat py-1.5 pr-10 pl-3 text-sm/6 text-foreground',
            'data-hover:border-foreground/25',
            'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-ring',
          ].join(' '),
          className,
        )}
      >
        {children}
      </HUISelect>
      <SortVerticalLinear
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  )
}
