import { describe, it, expect } from 'vitest'
import { shareCardSvg, shareCardTitle, shareCardLines, escapeXml } from '../shareCard'
import { computeYearStats } from '../stats'
import type { Play } from '../types'

const plays: Play[] = [
  { trackId: 't1', artist: 'Neon Coastline', track: 'Salt Air I', album: 'Salt Air', genre: 'Indie Pop', playedAt: '2026-06-01T21:00:00', msPlayed: 180000 },
  { trackId: 't1', artist: 'Neon Coastline', track: 'Salt Air I', album: 'Salt Air', genre: 'Indie Pop', playedAt: '2026-06-02T21:00:00', msPlayed: 180000 },
  { trackId: 't2', artist: 'KAIRO', track: 'Pulse I', album: 'Pulse//Wave', genre: 'Electronic', playedAt: '2026-06-03T10:00:00', msPlayed: 120000 },
]
const stats = computeYearStats(plays)

describe('shareCardTitle', () => {
  it('names the top artist', () => { expect(shareCardTitle('top-artist', stats)).toContain('Neon Coastline') })
  it('names the top genre', () => { expect(shareCardTitle('top-genre', stats)).toContain('Indie Pop') })
})

describe('shareCardLines', () => {
  it('includes minutes for the summary card', () => {
    expect(shareCardLines('summary', stats).join(' ')).toContain('min')
  })
})

describe('shareCardSvg', () => {
  it('produces a 1080x1080 SVG containing the title and stats', () => {
    const svg = shareCardSvg('summary', stats)
    expect(svg).toContain('<svg')
    expect(svg).toContain('1080')
    expect(svg).toContain('TUNEREWIND')
    expect(svg).toContain('Neon Coastline')
  })
  it('escapes XML in titles', () => {
    expect(escapeXml('A & B <C>')).toBe('A &amp; B &lt;C&gt;')
  })
})
