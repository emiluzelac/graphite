import { Outlet, Link } from 'react-router'
import { ThemeToggle } from '@/components/theme-toggle'
import { Backdrop } from '@/components/ui/backdrop'

export function HomeLayout() {
  return (
    <div className="relative isolate min-h-svh bg-background">
      <Backdrop className="opacity-30" />
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-3 sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <div
              aria-hidden="true"
              className="size-6 rounded-md bg-gradient-to-br from-primary/60 to-primary"
            />
            <span className="text-base font-semibold tracking-tight text-foreground">Graphite</span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="order-last flex w-full items-center gap-6 text-sm text-muted-foreground sm:order-none sm:w-auto"
          >
            <a
              href="#components"
              className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Components
            </a>
            <a
              href="#examples"
              className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Examples
            </a>
            <Link
              to="/docs"
              className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Docs
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-5">
            <a
              href="https://github.com/emiluzelac/graphite"
              className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              GitHub
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>Built on Headless UI. Styled with Graphite.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a
              href="/llms.txt"
              className="rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              For agents
            </a>
            <a
              href="https://github.com/emiluzelac/graphite"
              className="rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Source on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
