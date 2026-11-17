# Share cards

Four 1080x1080 PNG cards, rendered on a canvas in the browser from a
deterministic SVG (`shareCardSvg` in `src/lib/shareCard.ts`):

- **Summary** — total minutes, plays, artists, top track
- **Top artist** — your #1 artist and minutes with them
- **Top genre** — the genre share that owned the year
- **Sound City** — your skyline, shareable

Downloads are local files — nothing is uploaded. The SVG is unit-tested
(`src/lib/__tests__/shareCard.test.ts`); the canvas PNG path needs a real
browser and is verified manually.
