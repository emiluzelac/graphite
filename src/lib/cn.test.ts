import { composeClass } from './cn'

describe('composeClass', () => {
  it('merges base with a string className', () => {
    expect(composeClass('px-3 rounded-md', 'text-red-500')({})).toBe('px-3 rounded-md text-red-500')
  })

  it('resolves a function className with the state bag', () => {
    const resolve = composeClass('px-3', (bag: { focus: boolean }) =>
      bag.focus ? 'ring-2' : 'ring-0',
    )
    expect(resolve({ focus: true })).toBe('px-3 ring-2')
    expect(resolve({ focus: false })).toBe('px-3 ring-0')
  })

  it('lets consumer classes win conflicts via tailwind-merge', () => {
    expect(composeClass('px-3', 'px-8')({})).toBe('px-8')
  })

  it('returns just the base for undefined className', () => {
    expect(composeClass('px-3', undefined)({})).toBe('px-3')
  })
})
