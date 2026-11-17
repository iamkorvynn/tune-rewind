import { useMemo } from 'react'
import type { Play, YearStats } from '../lib/types'
import { computeYearStats, listeningPersona, peakHour } from '../lib/stats'
import { buildInsights } from '../lib/insights'

export function useStats(plays: Play[]) {
  return useMemo(() => {
    const stats: YearStats = computeYearStats(plays)
    return { stats, persona: listeningPersona(stats), insights: buildInsights(stats) }
  }, [plays])
}
