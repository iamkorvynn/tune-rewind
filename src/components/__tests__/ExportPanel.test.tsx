import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { ExportPanel } from '../ExportPanel'
import { computeYearStats } from '../../lib/stats'
import { samplePlays } from '../../data/sampleData'

describe('ExportPanel', () => {
  it('renders export options', () => {
    const stats = computeYearStats(samplePlays)
    const html = renderToString(<ExportPanel stats={stats} />)
    expect(html).toContain('Take your year with you')
    expect(html).toContain('Download stats JSON')
    expect(html).toContain('Download top artists CSV')
  })
})
