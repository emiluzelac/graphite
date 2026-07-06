import { Checkbox as HUICheckbox, type CheckboxProps as HUICheckboxProps } from '@headlessui/react'
import { composeClass } from '@/lib/cn'

export type CheckboxProps = HUICheckboxProps

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <HUICheckbox
      {...props}
      className={composeClass(
        [
          'group size-6 shrink-0 cursor-pointer rounded-md glass-flat p-1 transition',
          'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-offset-2 data-focus:outline-ring',
          'data-checked:border-primary data-checked:bg-primary',
          'data-indeterminate:border-primary data-indeterminate:bg-primary',
        ].join(' '),
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
