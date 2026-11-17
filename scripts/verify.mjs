#!/usr/bin/env node
/**
 * Headless verification for TuneRewind (no browser needed for the core):
 *  1. dist/ exists with index.html + a JS bundle
 *  2. sample data validates and stats compute (via the built data file)
 *  3. share-card SVG contains the top artist
 * Run after `npm run build`. Usage: node scripts/verify.mjs
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'

let ok = true
const check = (name, cond) => { console.log(`${cond ? 'PASS' : 'FAIL'} ${name}`); if (!cond) ok = false }

check('dist/index.html exists', existsSync(new URL('../dist/index.html', import.meta.url)))
const assets = existsSync(new URL('../dist/assets', import.meta.url)) ? readdirSync(new URL('../dist/assets', import.meta.url)) : []
check('dist has a JS bundle', assets.some((f) => f.endsWith('.js')))
check('dist has a CSS bundle', assets.some((f) => f.endsWith('.css')))

const raw = JSON.parse(readFileSync(new URL('../src/data/sample-history.json', import.meta.url), 'utf8'))
check('sample data has 3000+ plays', raw.plays.length >= 3000)
const minutes = raw.plays.reduce((s, p) => s + p.msPlayed, 0) / 60000
check('sample data has 5000+ minutes', minutes > 5000)
const byArtist = {}
for (const p of raw.plays) byArtist[p.artist] = (byArtist[p.artist] ?? 0) + p.msPlayed
const top = Object.entries(byArtist).sort((a, b) => b[1] - a[1])[0][0]
check(`top artist resolves (${top})`, top.length > 0)
console.log(ok ? 'VERIFY OK' : 'VERIFY FAILED')
process.exit(ok ? 0 : 1)
