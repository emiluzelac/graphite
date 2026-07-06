import { cn } from '@/lib/cn'

export function Separator({ className }: { className?: string }) {
  return <div role="separator" className={cn('my-1 h-px bg-border', className)} />
}
