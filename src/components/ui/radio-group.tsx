import {
  RadioGroup as HUIRadioGroup,
  Radio as HUIRadio,
  type RadioGroupProps,
  type RadioProps,
} from '@headlessui/react'
import { cn } from '@/lib/cn'
import { CheckCircleBold } from 'icona'

type RGProps<T> = Omit<RadioGroupProps<'div', T>, 'className'> & { className?: string }

export function RadioGroup<T>({ className, ...props }: RGProps<T>) {
  return (
    <HUIRadioGroup
      {...(props as RadioGroupProps<'div', T>)}
      className={cn('space-y-2', className)}
    />
  )
}

type RProps<T> = Omit<RadioProps<'span', T>, 'className'> & { className?: string }

export function Radio<T>({ className, ...props }: RProps<T>) {
  return (
    <HUIRadio
      {...(props as RadioProps<'span', T>)}
      className={cn(
        'group flex size-5 shrink-0 items-center justify-center rounded-full border border-input bg-card',
        'data-checked:border-primary data-checked:bg-primary',
        className,
      )}
    >
      <CheckCircleBold className="invisible size-5 text-primary-foreground group-data-checked:visible" />
    </HUIRadio>
  )
}
