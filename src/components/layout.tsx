import { Outlet } from 'react-router'
import { Sidebar } from '@/components/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'

export function Layout() {
  return (
    <div className="flex min-h-svh">
      <Sidebar />
      <main className="flex-1 px-8 py-12 lg:px-16">
        <div className="mx-auto flex max-w-4xl justify-end lg:hidden">
          <ThemeToggle />
        </div>
        <div className="mx-auto max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
