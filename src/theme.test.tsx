import { act, cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import html from '../index.html?raw'
import { ThemeProvider } from './theme'
import { useTheme } from './theme-context'

const bootstrap = html.match(/<script>([\s\S]*?)<\/script>/)?.[1]

function applyBootstrap() {
  if (!bootstrap) throw new Error('The initial HTML must contain the theme bootstrap')
  // Execute the trusted local script with the same browser globals as the provider.
  const run = new Function('window', 'document', 'localStorage', bootstrap)
  run(window, document, localStorage)
}

function ThemeControls() {
  const { theme, resolved, setTheme } = useTheme()
  return (
    <>
      <output aria-label="Selected theme">{theme}</output>
      <output aria-label="Resolved theme">{resolved}</output>
      <button onClick={() => setTheme('light')}>Use light</button>
      <button onClick={() => setTheme('dark')}>Use dark</button>
      <button onClick={() => setTheme('system')}>Use system</button>
    </>
  )
}

function mountTheme() {
  applyBootstrap()
  return render(
    <ThemeProvider>
      <ThemeControls />
    </ThemeProvider>,
  )
}

let systemDark = false
let listeners: Set<() => void>

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
  systemDark = false
  listeners = new Set()
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      get matches() {
        return systemDark
      },
      media: '(prefers-color-scheme: dark)',
      addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
    })),
  )
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('initial theme', () => {
  it.each([
    { stored: null, osDark: false, selected: 'light', resolved: 'light' },
    { stored: null, osDark: true, selected: 'light', resolved: 'light' },
    { stored: 'invalid', osDark: true, selected: 'light', resolved: 'light' },
    { stored: 'light', osDark: true, selected: 'light', resolved: 'light' },
    { stored: 'dark', osDark: false, selected: 'dark', resolved: 'dark' },
    { stored: 'system', osDark: false, selected: 'system', resolved: 'light' },
    { stored: 'system', osDark: true, selected: 'system', resolved: 'dark' },
  ])(
    'keeps HTML and React aligned for $stored with OS dark=$osDark',
    ({ stored, osDark, selected, resolved }) => {
      systemDark = osDark
      if (stored !== null) localStorage.setItem('theme', stored)
      mountTheme()

      expect(screen.getByLabelText('Selected theme')).toHaveTextContent(selected)
      expect(screen.getByLabelText('Resolved theme')).toHaveTextContent(resolved)
      expect(document.documentElement.classList.contains('dark')).toBe(resolved === 'dark')
    },
  )

  it('uses light when storage is unavailable', () => {
    systemDark = true
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage is unavailable', 'SecurityError')
    })
    mountTheme()

    expect(screen.getByLabelText('Selected theme')).toHaveTextContent('light')
    expect(screen.getByLabelText('Resolved theme')).toHaveTextContent('light')
    expect(document.documentElement).not.toHaveClass('dark')
  })
})

describe('explicit theme choices', () => {
  it('preserves a dark choice across a remount', async () => {
    const user = userEvent.setup()
    const view = mountTheme()
    await user.click(screen.getByRole('button', { name: 'Use dark' }))

    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')
    view.unmount()
    mountTheme()
    expect(screen.getByLabelText('Selected theme')).toHaveTextContent('dark')
    expect(screen.getByLabelText('Resolved theme')).toHaveTextContent('dark')
  })

  it('persists a system choice instead of treating it as no preference', async () => {
    systemDark = true
    const user = userEvent.setup()
    const view = mountTheme()
    await user.click(screen.getByRole('button', { name: 'Use system' }))

    expect(localStorage.getItem('theme')).toBe('system')
    expect(document.documentElement).toHaveClass('dark')
    view.unmount()
    mountTheme()
    expect(screen.getByLabelText('Selected theme')).toHaveTextContent('system')
    expect(screen.getByLabelText('Resolved theme')).toHaveTextContent('dark')
  })

  it('tracks OS changes only while system is selected', async () => {
    localStorage.setItem('theme', 'system')
    const user = userEvent.setup()
    mountTheme()
    expect(listeners.size).toBe(1)

    act(() => {
      systemDark = true
      listeners.forEach((listener) => listener())
    })
    expect(screen.getByLabelText('Resolved theme')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveClass('dark')

    await user.click(screen.getByRole('button', { name: 'Use light' }))
    expect(localStorage.getItem('theme')).toBe('light')
    expect(listeners.size).toBe(0)
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('removes the system listener when unmounted', () => {
    localStorage.setItem('theme', 'system')
    const view = mountTheme()
    expect(listeners.size).toBe(1)
    view.unmount()
    expect(listeners.size).toBe(0)
  })
})
