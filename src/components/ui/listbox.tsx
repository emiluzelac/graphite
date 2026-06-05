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
        'relative w-full cursor-default rounded-lg bg-white py-1.5 pr-10 pl-3 text-left text-sm/6',
        'border border-gray-300 text-gray-900',
        'data-hover:border-gray-400 data-focus:outline-2 data-focus:outline-sky-600 data-focus:-outline-offset-2',
        'dark:border-white/10 dark:bg-white/5 dark:text-white dark:data-hover:border-white/20 dark:data-focus:outline-sky-400',
        className,
      )}
    >
      {children as ReactNode}
      <SortVerticalLinear className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-gray-500 dark:text-white/50" />
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
        'z-10 w-(--button-width) rounded-xl border border-black/5 bg-white p-1 text-sm/6 shadow-lg [--anchor-gap:--spacing(1)]',
        'transition duration-100 ease-in data-closed:scale-95 data-closed:opacity-0 data-leave:duration-75',
        'dark:border-white/10 dark:bg-gray-900',
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
        'text-gray-900 data-focus:bg-gray-100',
        'dark:text-white dark:data-focus:bg-white/5',
        className,
      )}
    >
      <CheckCircleLinear className="invisible size-4 text-sky-600 group-data-selected:visible dark:text-sky-400" />
      <span className="flex-1">{children as ReactNode}</span>
    </HUIListboxOption>
  )
}
