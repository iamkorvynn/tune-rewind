import { useCallback, useState } from 'react'
import type { YearStats } from '../lib/types'
import { downloadPng, shareCardPng, type ShareCardKind } from '../lib/shareCard'

export function useShareCard(stats: YearStats) {
  const [busy, setBusy] = useState<ShareCardKind | null>(null)
  const [error, setError] = useState<string | null>(null)

  const download = useCallback(async (kind: ShareCardKind) => {
    setBusy(kind)
    setError(null)
    try {
      const png = await shareCardPng(kind, stats)
      downloadPng(png, `tunerewind-${kind}.png`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not generate the share card')
    } finally {
      setBusy(null)
    }
  }, [stats])

  return { download, busy, error }
}
