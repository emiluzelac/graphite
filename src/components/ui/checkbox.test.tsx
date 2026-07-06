import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('toggles checked state on click', async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Accept terms" />)

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' })
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
    await user.click(checkbox)
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('ships a check icon revealed by the checked state', () => {
    render(<Checkbox aria-label="Done" defaultChecked />)

    const checkbox = screen.getByRole('checkbox', { name: 'Done' })
    const check = checkbox.querySelector('[data-slot="check-icon"]')
    expect(check).not.toBeNull()
    expect(check!.getAttribute('class')).toMatch(/group-data-checked:/)
  })

  it('ships an indeterminate icon and reflects the indeterminate state', () => {
    render(<Checkbox aria-label="Select all" indeterminate />)

    const checkbox = screen.getByRole('checkbox', { name: 'Select all' })
    expect(checkbox).toHaveAttribute('data-indeterminate')

    const dash = checkbox.querySelector('[data-slot="indeterminate-icon"]')
    expect(dash).not.toBeNull()
    expect(dash!.getAttribute('class')).toMatch(/group-data-indeterminate:/)

    // The check icon must not also show while indeterminate.
    const check = checkbox.querySelector('[data-slot="check-icon"]')
    expect(check!.getAttribute('class')).toMatch(/not-group-data-indeterminate/)
  })
})
