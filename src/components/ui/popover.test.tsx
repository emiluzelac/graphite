import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Popover, PopoverButton, PopoverPanel } from './popover'

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
})
