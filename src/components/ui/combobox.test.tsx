import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from './combobox'

describe('Combobox', () => {
  it('renders the options panel as glass', async () => {
    const user = userEvent.setup()
    render(
      <Combobox defaultValue="a" onChange={() => {}}>
        <ComboboxInput aria-label="Pick" displayValue={(v: string) => v} />
        <ComboboxOptions>
          <ComboboxOption value="a">Alpha</ComboboxOption>
        </ComboboxOptions>
      </Combobox>,
    )
    // The only button is the chevron ComboboxButton inside the input wrapper.
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox')).toHaveClass('glass')
  })
})
