import { formatCategories, formatDate } from '../format'

describe('formatCategories', () => {
  it('should return the expected result for the following values', () => {
    const f = formatCategories

    expect(f([])).toBe('')
    expect(f([{ name: 'category' }])).toBe('category')
    expect(f([{ name: 'category' }, { name: 'category #2' }])).toBe('category, category #2')
  })
})

describe('formatDate', () => {
  it('should return the expected result for the following values', () => {
    const f = formatDate

    //
  })
})
