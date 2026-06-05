import {
  RadioGroup as HUIRadioGroup,
  Radio as HUIRadio,
  type RadioGroupProps,
  type RadioProps,
} from '@headlessui/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type RGProps<T> = Omit<RadioGroupProps<'div', T>, 'className'> & { className?: string }

export function RadioGroup<T>({ className, ...props }: RGProps<T>) {
  return (
    <HUIRadioGroup
      {...(props as RadioGroupProps<'div', T>)}
      className={cn('space-y-2', className)}
    />
  )
}

type RProps<T> = Omit<RadioProps<'span', T>, 'className' | 'children'> & {
  className?: string
  children?: ReactNode
}

export function Radio<T>({ className, children, ...props }: RProps<T>) {
  return (
    <HUIRadio
      {...(props as RadioProps<'span', T>)}
      className={cn(
        'group relative flex cursor-pointer rounded-lg bg-muted px-5 py-4 shadow-md transition',
        'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-ring',
        'data-checked:bg-secondary',
        className,
      )}
    >
      {children as ReactNode}
    </HUIRadio>
  )
}
