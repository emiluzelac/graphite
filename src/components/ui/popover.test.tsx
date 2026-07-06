import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as popover from './popover'

// Namespace import so a missing export fails its own test instead of the module.
const { Popover, PopoverButton, PopoverPanel, PopoverBackdrop, useClose } = popover

describe('Popover', () => {
  it('anchors PopoverPanel to "bottom" by default', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverButton>Solutions</PopoverButton>
        <PopoverPanel>Panel content</PopoverPanel>
      </Popover>,
    )

    await user.click(screen.getByRole('button', { name: 'Solutions' }))
    // Headless UI normalizes "bottom" to "bottom center"
    expect(screen.getByText('Panel content')).toHaveAttribute('data-anchor', 'bottom center')
  })

  it('lets consumers override the default anchor', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverButton>Solutions</PopoverButton>
        <PopoverPanel anchor="top">Panel content</PopoverPanel>
      </Popover>,
    )

    await user.click(screen.getByRole('button', { name: 'Solutions' }))
    // Headless UI normalizes "top" to "top center"
    expect(screen.getByText('Panel content')).toHaveAttribute('data-anchor', 'top center')
  })

  it('renders PopoverBackdrop as a full-screen overlay hidden from assistive tech', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverButton>Solutions</PopoverButton>
        <PopoverBackdrop />
        <PopoverPanel>Panel content</PopoverPanel>
      </Popover>,
    )

    await user.click(screen.getByRole('button', { name: 'Solutions' }))
    expect(document.querySelector('[aria-hidden="true"].fixed.inset-0')).not.toBeNull()
  })

  it('re-exports useClose for closing from inside a panel', async () => {
    function DismissButton() {
      const close = useClose()
      return <button onClick={() => close()}>Dismiss</button>
    }

    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverButton>Solutions</PopoverButton>
        <PopoverPanel>
          <DismissButton />
        </PopoverPanel>
      </Popover>,
    )

    await user.click(screen.getByRole('button', { name: 'Solutions' }))
    await user.click(screen.getByRole('button', { name: 'Dismiss' }))
    // The panel's leave transition unmounts it asynchronously.
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument(),
    )
  })

  it('renders the panel as glass', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverButton>Solutions</PopoverButton>
        <PopoverPanel>Panel content</PopoverPanel>
      </Popover>,
    )
    await user.click(screen.getByRole('button', { name: 'Solutions' }))
    expect(screen.getByText('Panel content')).toHaveClass('glass')
  })
})
