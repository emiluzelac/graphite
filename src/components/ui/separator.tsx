import { cn } from '@/lib/cn'

export function Separator({ className }: { className?: string }) {
  return <div className={cn('my-1 h-px bg-gray-200 dark:bg-white/10', className)} />
}
