import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import { HomeLayout } from '@/components/home-layout'
import { ThemeProvider } from '@/theme'
import Home from './home'

const originalAnimations = Object.getOwnPropertyDescriptor(Element.prototype, 'getAnimations')

beforeAll(() => {
  Object.defineProperty(Element.prototype, 'getAnimations', {
    configurable: true,
    value: () => [],
  })
})

afterAll(() => {
  if (originalAnimations) {
    Object.defineProperty(Element.prototype, 'getAnimations', originalAnimations)
  } else {
    Reflect.deleteProperty(Element.prototype, 'getAnimations')
  }
})

function renderHome() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </MemoryRouter>,
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('Graphite homepage', () => {
  it('provides a clear introduction and real next steps', () => {
    renderHome()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Headless UI, beautifully composed.' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Browse components' })).toHaveAttribute(
      'href',
      '#components',
    )
    expect(screen.getByRole('link', { name: 'Read the guide' })).toHaveAttribute('href', '/docs')
    expect(screen.queryByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs')
    expect(screen.getByRole('region', { name: 'Live examples' })).toBeInTheDocument()
  })

  it('keeps one fixed backdrop outside the constrained content sections', () => {
    const { container } = renderHome()
    const backdrops = container.querySelectorAll(
      'div[aria-hidden="true"][style*="radial-gradient"]',
    )
    const page = screen.getByRole('main').parentElement

    expect(backdrops).toHaveLength(1)
    expect(backdrops[0]).toHaveClass('fixed', 'inset-0', 'opacity-30')
    expect(backdrops[0]).not.toHaveClass('absolute')
    expect(backdrops[0].parentElement === page).toBe(true)
    expect(page).toHaveClass('isolate')
    expect(screen.getByRole('region', { name: 'Live examples' })).toHaveClass('max-w-7xl')
  })

  it('keeps every existing component and example route discoverable', () => {
    renderHome()
    const directory = screen.getByRole('region', { name: 'Explore the components' })
    const links = within(directory)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
    expect(links).toEqual(
      expect.arrayContaining([
        '/react/data-list',
        '/react/menu',
        '/react/disclosure',
        '/react/dialog',
        '/react/popover',
        '/react/tabs',
        '/react/transition',
        '/react/button',
        '/react/checkbox',
        '/react/combobox',
        '/react/fieldset',
        '/react/input',
        '/react/listbox',
        '/react/radio-group',
        '/react/select',
        '/react/switch',
        '/react/textarea',
        '/signup',
      ]),
    )
  })

  it('opens and dismisses a real dialog without leaving the homepage', async () => {
    const user = userEvent.setup()
    renderHome()
    const trigger = screen.getByRole('button', { name: 'Open dialog' })
    await user.click(trigger)
    expect(await screen.findByRole('dialog', { name: 'A closer look' })).toBeVisible()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('resets the editable essentials preview', async () => {
    const user = userEvent.setup()
    renderHome()
    const input = screen.getByRole('textbox', { name: 'Project name' })
    await user.clear(input)
    await user.type(input, 'My project')
    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(input).toHaveValue('Untitled project')
  })

  it('makes form submission explicitly local to the preview', async () => {
    const user = userEvent.setup()
    renderHome()
    const form = screen.getByRole('form', { name: 'Profile preview' })
    await user.click(within(form).getByRole('button', { name: 'Save preview' }))
    expect(within(form).getByRole('status')).toHaveTextContent('Preview updated. No data was sent.')
  })

  it('keeps preference changes while switching tabs', async () => {
    const user = userEvent.setup()
    renderHome()
    const preferences = within(screen.getByRole('article', { name: 'Preferences' }))
    await user.click(preferences.getByRole('switch', { name: 'Email notifications' }))
    expect(preferences.getByRole('switch', { name: 'Email notifications' })).not.toBeChecked()
    await user.click(preferences.getByRole('tab', { name: 'Privacy' }))
    expect(preferences.getByRole('switch', { name: 'Public profile' })).toBeChecked()
    await user.click(preferences.getByRole('tab', { name: 'Notifications' }))
    expect(preferences.getByRole('switch', { name: 'Email notifications' })).not.toBeChecked()
  })
})
