import type { Play, DataSource } from '../lib/types'
import { validateHistory } from '../lib/validate'
import raw from './sample-history.json'

const checked = validateHistory(raw as unknown)
if (!checked.ok) {
  console.warn('Sample data had invalid rows:', checked.errors.slice(0, 5))
}

export const samplePlays: Play[] = checked.plays

export const sampleSource: DataSource = {
  kind: 'sample',
  label: 'Bundled sample data — Nov 2025 to Nov 2026 (fictional artists)',
  plays: samplePlays,
}
