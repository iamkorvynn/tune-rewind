# Contributing

- Keep the stats engine pure: no DOM, no network in `src/lib/` except
  `spotify.ts` (token-gated) and `export.ts` (download helpers).
- One file per component, one test file per module.
- Small, real commits: per file / per feature / per test.
- Never commit secrets, tokens, or `src/data/spotify-live.json`.
- Run `npm test` and `npm run build` before pushing.
