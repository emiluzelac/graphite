import {
  Listbox as HUIListbox,
  ListboxButton as HUIListboxButton,
  ListboxOptions as HUIListboxOptions,
  ListboxOption as HUIListboxOption,
  type ListboxProps,
  type ListboxButtonProps,
  type ListboxOptionsProps,
  type ListboxOptionProps,
} from '@headlessui/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { CheckCircleLinear, SortVerticalLinear } from 'icona'

type LProps<T> = Omit<ListboxProps<'div', T>, 'className'> & { className?: string }

export function Listbox<T>(props: LProps<T>) {
  return <HUIListbox {...(props as ListboxProps<'div', T>)} />
}

export function ListboxButton({
  className,
  children,
  ...props
}: Omit<ListboxButtonProps<'button'>, 'className' | 'children'> & {
  className?: string
  children?: ReactNode
}) {
  return (
    <HUIListboxButton
      {...(props as ListboxButtonProps<'button'>)}
      className={cn(
        'relative w-full cursor-default rounded-lg bg-card py-1.5 pr-10 pl-3 text-left text-sm/6',
        'border border-input text-foreground',
        'data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-ring data-hover:border-ring',
        className,
      )}
    >
      {children as ReactNode}
      <SortVerticalLinear className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
    </HUIListboxButton>
  )
}

export function ListboxOptions({
  className,
  ...props
}: Omit<ListboxOptionsProps<'ul'>, 'className'> & { className?: string }) {
  return (
    <HUIListboxOptions
      anchor="bottom"
      transition
      {...(props as ListboxOptionsProps<'ul'>)}
      className={cn(
        'z-10 w-(--button-width) rounded-xl border bg-popover p-1 text-sm/6 text-popover-foreground shadow-lg [--anchor-gap:--spacing(1)]',
        'transition duration-100 ease-in data-closed:scale-95 data-closed:opacity-0 data-leave:duration-75',
        '[&]:focus:outline-none',
        className,
      )}
    />
  )
}

type LOProps<T> = Omit<ListboxOptionProps<'li', T>, 'className' | 'children'> & {
  className?: string
  children?: ReactNode
}

export function ListboxOption<T>({ className, children, ...props }: LOProps<T>) {
  return (
    <HUIListboxOption
      {...(props as ListboxOptionProps<'li', T>)}
      className={cn(
        'group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none',
        'text-popover-foreground data-focus:bg-accent data-focus:text-accent-foreground',
        className,
      )}
    >
      <CheckCircleLinear className="invisible size-4 text-primary group-data-selected:visible" />
      <span className="flex-1">{children as ReactNode}</span>
    </HUIListboxOption>
  )
}
