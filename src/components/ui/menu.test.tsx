import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as menu from './menu'

// Namespace import so a missing export fails its own test instead of the module.
const { Menu, MenuButton, MenuItems, MenuItem, MenuSeparator, MenuSection, MenuHeading } = menu

describe('Menu', () => {
  it('opens on click and renders MenuItem as a button by default', async () => {
    const user = userEvent.setup()
    render(
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuItems>
          <MenuItem>Edit</MenuItem>
        </MenuItems>
      </Menu>,
    )

    await user.click(screen.getByRole('button', { name: 'Options' }))
    const item = screen.getByRole('menuitem', { name: 'Edit' })
    expect(item.tagName).toBe('BUTTON')
  })

  it('renders MenuItem as a link when as="a" is passed', async () => {
    const user = userEvent.setup()
    render(
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuItems>
          <MenuItem as="a" href="/settings">
            Settings
          </MenuItem>
        </MenuItems>
      </Menu>,
    )

    await user.click(screen.getByRole('button', { name: 'Options' }))
    const item = screen.getByRole('menuitem', { name: 'Settings' })
    expect(item.tagName).toBe('A')
    expect(item).toHaveAttribute('href', '/settings')
  })

  it('anchors MenuItems to "bottom end" by default', async () => {
    const user = userEvent.setup()
    render(
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuItems>
          <MenuItem>Edit</MenuItem>
        </MenuItems>
      </Menu>,
    )

    await user.click(screen.getByRole('button', { name: 'Options' }))
    expect(screen.getByRole('menu')).toHaveAttribute('data-anchor', 'bottom end')
  })

  it('lets consumers override the default anchor', async () => {
    const user = userEvent.setup()
    render(
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuItems anchor="top">
          <MenuItem>Edit</MenuItem>
        </MenuItems>
      </Menu>,
    )

    await user.click(screen.getByRole('button', { name: 'Options' }))
    // Headless UI normalizes "top" to "top center"
    expect(screen.getByRole('menu')).toHaveAttribute('data-anchor', 'top center')
  })

  it('renders MenuSeparator with separator semantics', async () => {
    const user = userEvent.setup()
    render(
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuItems>
          <MenuItem>Edit</MenuItem>
          <MenuSeparator />
          <MenuItem>Delete</MenuItem>
        </MenuItems>
      </Menu>,
    )

    await user.click(screen.getByRole('button', { name: 'Options' }))
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('groups MenuSection items under a MenuHeading label', async () => {
    const user = userEvent.setup()
    render(
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuItems>
          <MenuSection>
            <MenuHeading>Actions</MenuHeading>
            <MenuItem>Edit</MenuItem>
          </MenuSection>
        </MenuItems>
      </Menu>,
    )

    await user.click(screen.getByRole('button', { name: 'Options' }))
    expect(screen.getByRole('group', { name: 'Actions' })).toBeInTheDocument()
  })

  it('resolves function className on MenuItem with the state bag', async () => {
    const user = userEvent.setup()
    render(
      <Menu>
        <MenuButton>Options</MenuButton>
        <MenuItems>
          <MenuItem className={({ focus }) => (focus ? 'is-focused' : 'is-idle')}>Edit</MenuItem>
        </MenuItems>
      </Menu>,
    )
    await user.click(screen.getByRole('button', { name: 'Options' }))
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveClass('is-idle')
  })
})
