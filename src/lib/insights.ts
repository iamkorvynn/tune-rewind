import type { YearStats } from './types'
import { peakHour } from './stats'
import { hourLabel, formatMinutes } from './format'

export function buildInsights(stats: YearStats): string[] {
  if (stats.totalPlays === 0) return []
  const out: string[] = []
  const peak = peakHour(stats.playsByHour)
  out.push(`Your peak listening hour is ${hourLabel(peak.hour)} (${peak.plays} plays).`)
  if (stats.topDay) {
    out.push(`Your biggest day was ${stats.topDay.date}: ${formatMinutes(stats.topDay.minutes)} in one day.`)
  }
  const topGenre = stats.topGenres[0]
  if (topGenre) out.push(`${topGenre.genre} is your home base — ${Math.round(topGenre.share * 100)}% of your minutes.`)
  const busiest = [...stats.playsByMonth].sort((a, b) => b.minutes - a.minutes)[0]
  if (busiest) out.push(`${busiest.label} was your biggest month (${formatMinutes(busiest.minutes)}).`)
  if (stats.uniqueGenres >= 10) out.push(`You explored ${stats.uniqueGenres} genres — a real wanderer.`)
  if (stats.daysActive >= 300) out.push(`You listened on ${stats.daysActive} different days. Nearly every day.`)
  if (stats.streak) out.push(`Longest streak: ${stats.streak.lengthDays} days in a row — music every single day.`)
  return out
}
