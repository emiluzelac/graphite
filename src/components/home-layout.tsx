import { Outlet, Link } from 'react-router'
import { ThemeToggle } from '@/components/theme-toggle'

export function HomeLayout() {
  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-gradient-to-br from-primary/60 to-primary" />
            <span className="text-lg font-semibold text-foreground">Graphite</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="px-6 py-12 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
