import {
  Combobox as HUICombobox,
  ComboboxInput as HUIComboboxInput,
  ComboboxButton as HUIComboboxButton,
  ComboboxOptions as HUIComboboxOptions,
  ComboboxOption as HUIComboboxOption,
  type ComboboxProps,
  type ComboboxInputProps,
  type ComboboxOptionsProps,
  type ComboboxOptionProps,
} from '@headlessui/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { AltArrowDownLinear, CheckCircleLinear } from 'icona'

type CProps<T, M extends boolean | undefined = false> = Omit<
  ComboboxProps<T, M, 'div'>,
  'className'
> & { className?: string }

export function Combobox<T, M extends boolean | undefined = false>(props: CProps<T, M>) {
  return <HUICombobox {...(props as ComboboxProps<T, M, 'div'>)} />
}

export function ComboboxInput<T>({
  className,
  ...props
}: Omit<ComboboxInputProps<'input', T>, 'className'> & { className?: string }) {
  return (
    <div className="relative">
      <HUIComboboxInput
        {...(props as ComboboxInputProps<'input', T>)}
        className={cn(
          'w-full rounded-lg bg-card py-1.5 pr-10 pl-3 text-sm/6',
          'border border-input text-foreground placeholder:text-muted-foreground',
          'data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-ring data-hover:border-ring',
          className,
        )}
      />
      <HUIComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
        <AltArrowDownLinear className="size-4 text-muted-foreground group-data-hover:text-foreground" />
      </HUIComboboxButton>
    </div>
  )
}

export function ComboboxOptions({
  className,
  ...props
}: Omit<ComboboxOptionsProps<'ul'>, 'className'> & { className?: string }) {
  return (
    <HUIComboboxOptions
      anchor="bottom"
      transition
      {...(props as ComboboxOptionsProps<'ul'>)}
      className={cn(
        'z-10 w-(--input-width) rounded-xl border bg-popover p-1 text-sm/6 text-popover-foreground shadow-lg [--anchor-gap:--spacing(1)]',
        'transition duration-100 ease-in data-closed:scale-95 data-closed:opacity-0 data-leave:duration-75',
        'empty:invisible [&]:focus:outline-none',
        className,
      )}
    />
  )
}

type COProps<T> = Omit<ComboboxOptionProps<'li', T>, 'className' | 'children'> & {
  className?: string
  children?: ReactNode
}

export function ComboboxOption<T>({ className, children, ...props }: COProps<T>) {
  return (
    <HUIComboboxOption
      {...(props as ComboboxOptionProps<'li', T>)}
      className={cn(
        'group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none',
        'text-popover-foreground data-focus:bg-accent data-focus:text-accent-foreground',
        className,
      )}
    >
      <CheckCircleLinear className="invisible size-4 text-primary group-data-selected:visible" />
      <span className="flex-1">{children as ReactNode}</span>
    </HUIComboboxOption>
  )
}
