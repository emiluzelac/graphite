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
import { cn } from '@/lib/cn'

export interface RootDialogProps extends Omit<DialogProps, 'className' | 'children'> {
  className?: string
  children: ReactNode
}

export function Dialog({ className, children, ...props }: RootDialogProps) {
  return (
    <HUIDialog {...props} className={cn('relative z-50', className)}>
      <HUIDialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition duration-200 ease-out data-closed:opacity-0 dark:bg-black/60"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {children}
      </div>
    </HUIDialog>
  )
}

export function DialogPanel({
  className,
  ...props
}: Omit<DialogPanelProps, 'className'> & { className?: string }) {
  return (
    <HUIDialogPanel
      {...props}
      transition
      className={cn(
        'w-full max-w-md space-y-4 rounded-2xl border border-gray-200 bg-white p-8 text-gray-900 shadow-xl',
        'duration-200 ease-out data-closed:scale-95 data-closed:opacity-0',
        'dark:border-white/10 dark:bg-gray-900 dark:text-white',
        className,
      )}
    />
  )
}

export function DialogTitle({
  className,
  ...props
}: Omit<DialogTitleProps, 'className'> & { className?: string }) {
  return <HUIDialogTitle {...props} className={cn('text-lg font-bold', className)} />
}
