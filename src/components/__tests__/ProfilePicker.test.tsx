import { describe, it, expect, vi } from 'vitest'
import { renderToString } from 'react-dom/server'
import { ProfilePicker } from '../ProfilePicker'

describe('ProfilePicker', () => {
  it('renders the default year plus three profiles', () => {
    const html = renderToString(<ProfilePicker selectedId={null} onSelect={vi.fn()} />)
    expect(html).toContain('Try another listener')
    expect(html).toContain('Night Owl')
    expect(html).toContain('Jazz Devotee')
    expect(html).toContain('Genre Explorer')
  })
})
