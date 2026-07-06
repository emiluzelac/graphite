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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition duration-200 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">{children}</div>
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
      transition
      {...props}
      className={cn(
        'w-full max-w-md space-y-4 rounded-2xl border bg-card p-8 text-card-foreground shadow-xl',
        'duration-200 ease-out data-closed:scale-95 data-closed:opacity-0',
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
