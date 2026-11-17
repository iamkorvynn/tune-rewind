#!/usr/bin/env node
/** Validate the bundled sample dataset without the app: counts + shape. */
import { readFileSync } from 'node:fs'

const raw = JSON.parse(readFileSync(new URL('../src/data/sample-history.json', import.meta.url), 'utf8'))
const plays = raw.plays
const bad = plays.filter((p) => !p.artist || !p.track || !p.genre || Number.isNaN(Date.parse(p.playedAt)) || !(p.msPlayed > 0))
const artists = new Set(plays.map((p) => p.artist)).size
const tracks = new Set(plays.map((p) => p.trackId)).size
const minutes = Math.round(plays.reduce((s, p) => s + p.msPlayed, 0) / 60000)
console.log(`plays=${plays.length} artists=${artists} tracks=${tracks} minutes=${minutes} invalid=${bad.length}`)
if (bad.length > 0 || plays.length < 3000) { console.error('DATA CHECK FAILED'); process.exit(1) }
console.log('DATA CHECK OK')
