import type { YearStats } from './types'
import { formatMinutes, formatNumber, pct } from './format'

export type ShareCardKind = 'summary' | 'top-artist' | 'top-genre' | 'sound-city'

export function shareCardTitle(kind: ShareCardKind, stats: YearStats): string {
  switch (kind) {
    case 'top-artist': return stats.topArtists[0] ? `My #1: ${stats.topArtists[0].name}` : 'My #1 artist'
    case 'top-genre': return stats.topGenres[0] ? `${stats.topGenres[0].genre} took the year` : 'My top genre'
    case 'sound-city': return 'My Sound City'
    default: return 'My Year in Music'
  }
}

export function shareCardLines(kind: ShareCardKind, stats: YearStats): string[] {
  const topArtist = stats.topArtists[0]
  const topGenre = stats.topGenres[0]
  const topTrack = stats.topTracks[0]
  switch (kind) {
    case 'top-artist':
      return topArtist ? [`${formatMinutes(topArtist.minutes)} with ${topArtist.name}`, `${formatNumber(topArtist.plays)} plays`, topArtist.extra ?? ''] : []
    case 'top-genre':
      return topGenre ? [`${pct(topGenre.share)} of my year was ${topGenre.genre}`, `${formatMinutes(topGenre.minutes)} · ${formatNumber(topGenre.plays)} plays`] : []
    case 'sound-city':
      return [`${stats.topGenres.length} genres built my skyline`, `Tallest tower: ${topArtist?.name ?? '—'}`]
    default:
      return [
        `${formatMinutes(stats.totalMinutes)} listened`,
        `${formatNumber(stats.totalPlays)} plays · ${stats.uniqueArtists} artists`,
        topTrack ? `Top track: ${topTrack.name}` : '',
      ]
  }
}

/** Deterministic SVG for a share card — testable without a browser canvas. */
export function shareCardSvg(kind: ShareCardKind, stats: YearStats): string {
  const title = shareCardTitle(kind, stats)
  const lines = shareCardLines(kind, stats).filter(Boolean)
  const accent = kind === 'top-genre' ? '#ff7a3d' : kind === 'top-artist' ? '#ff5c8a' : kind === 'sound-city' ? '#7c5cff' : '#22d3ee'
  const lineEls = lines.map((l, i) => `<text x="48" y="${210 + i * 44}" font-family="Arial, sans-serif" font-size="30" fill="#e8e8f0">${escapeXml(l)}</text>`).join('\n')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <rect width="1080" height="1080" fill="#0b0b14"/>
  <rect width="1080" height="14" fill="${accent}"/>
  <text x="48" y="110" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="${accent}">TUNEREWIND · YOUR YEAR IN MUSIC</text>
  <text x="48" y="180" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="#ffffff">${escapeXml(title)}</text>
  ${lineEls}
  <text x="48" y="980" font-family="Arial, sans-serif" font-size="28" fill="#9a9ab0">Made with TuneRewind — sample data</text>
</svg>`
}

export function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/**
 * Render the SVG share card to a PNG data URL via an offscreen canvas.
 * Browser-only (needs document + canvas); the SVG itself is unit-tested.
 */
export function shareCardPng(kind: ShareCardKind, stats: YearStats): Promise<string> {
  return new Promise((resolve, reject) => {
    const svg = shareCardSvg(kind, stats)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1080
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas 2D not available'))
      ctx.drawImage(img, 0, 0, 1080, 1080)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => reject(new Error('Could not render share card image'))
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  })
}

export function shareCardSubtitle(kind: ShareCardKind, stats: YearStats): string {
  const lines = shareCardLines(kind, stats).filter(Boolean)
  return lines[0] ?? ''
}

export function downloadPng(dataUrl: string, filename: string): void {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  a.click()
}
