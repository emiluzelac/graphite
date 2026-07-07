import { Link, Outlet } from 'react-router'
import { Sidebar } from '@/components/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { Backdrop } from '@/components/ui/backdrop'

export function Layout() {
  return (
    <div className="flex min-h-svh">
      <Backdrop />
      <Sidebar />
      <main className="flex-1 px-8 py-12 lg:px-16">
        <div className="mx-auto mb-8 flex max-w-4xl items-center justify-between lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-gradient-to-br from-primary/60 to-primary" />
            <span className="text-lg font-semibold text-foreground">Graphite</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="mx-auto max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
