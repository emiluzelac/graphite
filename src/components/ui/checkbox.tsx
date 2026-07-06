import { Checkbox as HUICheckbox, type CheckboxProps as HUICheckboxProps } from '@headlessui/react'
import { cn } from '@/lib/cn'

export interface CheckboxProps extends Omit<HUICheckboxProps, 'className'> {
  className?: string
}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <HUICheckbox
      {...props}
      className={cn(
        'group size-6 shrink-0 cursor-pointer rounded-md bg-muted p-1 ring-1 ring-input transition ring-inset',
        'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-offset-2 data-focus:outline-ring',
        'data-checked:bg-primary data-checked:ring-primary',
        'data-indeterminate:bg-primary data-indeterminate:ring-primary',
        className,
      )}
    >
      <svg
        data-slot="check-icon"
        className="hidden size-4 stroke-primary-foreground group-data-checked:not-group-data-indeterminate:block"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        data-slot="indeterminate-icon"
        className="hidden size-4 stroke-primary-foreground group-data-indeterminate:block"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" />
      </svg>
    </HUICheckbox>
  )
}
