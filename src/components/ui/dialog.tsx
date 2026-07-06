import {
  Dialog as HUIDialog,
  DialogBackdrop as HUIDialogBackdrop,
  DialogPanel as HUIDialogPanel,
  DialogTitle as HUIDialogTitle,
  type DialogProps,
  type DialogPanelProps,
  type DialogTitleProps,
} from '@headlessui/react'
import type { ReactNode } from 'react'
import { composeClass } from '@/lib/cn'

export type RootDialogProps = Omit<DialogProps, 'children'> & { children: ReactNode }

export function Dialog({ className, children, ...props }: RootDialogProps) {
  return (
    <HUIDialog {...props} className={composeClass('relative z-50', className)}>
      <HUIDialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition duration-200 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">{children}</div>
      </div>
    </HUIDialog>
  )
}

export function DialogPanel({ className, ...props }: DialogPanelProps) {
  return (
    <HUIDialogPanel
      transition
      {...props}
      className={composeClass(
        [
          'w-full max-w-md space-y-4 rounded-2xl glass p-8 text-foreground',
          'duration-200 ease-out data-closed:scale-95 data-closed:opacity-0',
        ].join(' '),
        className,
      )}
    />
  )
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <HUIDialogTitle {...props} className={composeClass('text-lg font-bold', className)} />
}
