# Architecture

```
src/
  lib/          pure stats engine — no React, fully unit-tested
    types.ts       Play, YearStats, GenreShare, MonthBucket
    topN.ts        top artists / tracks by minutes
    aggregation.ts genre share, hour histogram, months, top day
    stats.ts       computeYearStats — the single entry point
    streak.ts      longest listening streak, quietest day
    topAlbums.ts   top albums by minutes
    growth.ts      month-over-month growth, biggest jump
    format.ts      minutes / dates / hours / percents
    validate.ts    history validation
    soundCity.ts   skyline model (genre -> building)
    shareCard.ts   SVG share cards + canvas PNG export
    shareText.ts   paste-ready summary text
    export.ts      stats JSON / top-artists CSV download
    spotify.ts     live Spotify top artists/tracks (token-gated)
    insights.ts    plain-language takeaways
    streak.ts      longest streak, quietest day
    topAlbums.ts   top albums by minutes
    growth.ts      month-over-month growth
    export.ts      JSON / CSV export helpers
    shareText.ts   paste-ready summary text
  data/profiles.ts  alternate listener profiles
  data/         sample history + per-month slices + loader
  hooks/        useStats, useShareCard
  components/   one file per section; charts/ holds Bar/Donut/Line
```

Rules: the stats engine never touches the DOM; components never compute
stats inline (they receive `YearStats`); Spotify code is only called when a
token is configured; nothing secret is ever committed.
