import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from './listbox'

describe('Listbox', () => {
  it('renders the options panel as glass', async () => {
    const user = userEvent.setup()
    render(
      <Listbox defaultValue="a">
        <ListboxButton>Choose</ListboxButton>
        <ListboxOptions>
          <ListboxOption value="a">Alpha</ListboxOption>
        </ListboxOptions>
      </Listbox>,
    )
    await user.click(screen.getByRole('button', { name: /Choose/ }))
    expect(screen.getByRole('listbox')).toHaveClass('glass')
  })
})
