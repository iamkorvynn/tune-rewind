# Testing

```bash
npm test
```

Vitest + jsdom. Coverage areas:

- `src/lib/__tests__/` — stats engine (top-N, aggregation, genre share,
  hour histogram, streaks, albums, growth, export, share text/cards,
  Sound City model, Spotify mapping, validation, formatting)
- `src/data/__tests__/` — sample data loads, validates, covers a year
- `src/components/__tests__/` — App and SoundCity render from sample data

Share-card PNG generation uses a real browser canvas, so the unit tests
cover the deterministic SVG it is built from (`shareCardSvg`) plus the
title/line builders; the PNG path is exercised manually in the browser.
