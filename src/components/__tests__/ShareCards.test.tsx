import { describe, it, expect, vi } from 'vitest'
import { renderToString } from 'react-dom/server'
import { ShareCards } from '../ShareCards'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('ShareCards', () => {
  it('renders four download cards', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<ShareCards stats={stats} onDownload={vi.fn()} busy={null} error={null} />)
    expect(html).toContain('Share cards')
    expect((html.match(/Download PNG/g) ?? []).length).toBe(4)
  })
})
