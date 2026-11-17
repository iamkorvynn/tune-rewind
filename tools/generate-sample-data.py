#!/usr/bin/env python3
"""Generate TuneRewind's bundled sample listening history.

Deterministic (seeded) realistic ~1 year of plays: 42 artists, 126 tracks,
12 genres, Nov 2025 - Nov 2026. Output: src/data/sample-history.json plus
one file per month under src/data/months/. No real user data, no Spotify
branding, all artist/track names are fictional.
Run: python3 tools/generate-sample-data.py
"""
import json, random, os, sys
from datetime import datetime, timedelta

random.seed(20261118)
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ARTISTS = [
    # (artist, genre, weight, album)
    ("Neon Coastline", "Indie Pop", 10, "Salt Air"), ("Mara Voss", "Indie Pop", 8, "Glasshouse"),
    ("The Low Tides", "Indie Pop", 6, "Drift"), ("Juno Fields", "Indie Pop", 5, "Golden Hour"),
    ("Cassette Palms", "Indie Pop", 4, "Summer Static"),
    ("KAIRO", "Electronic", 10, "Pulse//Wave"), ("Vessel Nine", "Electronic", 8, "Deep Signal"),
    ("Modular Sun", "Electronic", 6, "Analog Dreams"), ("Lumen Arc", "Electronic", 5, "Night Grid"),
    ("Static Bloom", "Electronic", 4, "Feedback Loop"),
    ("Dario Fontaine", "Jazz", 7, "Blue Hour Sessions"), ("The Velvet Hour", "Jazz", 6, "Smoke & Brass"),
    ("Nia Okafor", "Jazz", 5, "Riverlight"), ("Cole Bennett Trio", "Jazz", 3, "Late Checkout"),
    ("Sofia Reyes", "Latin Pop", 8, "Fuego Lento"), ("Diego Mar", "Latin Pop", 6, "Costa Azul"),
    ("Luna Palma", "Latin Pop", 4, "Bailar Sola"),
    ("Arjun Mehta", "Bollywood", 7, "Monsoon Nights"), ("Priya Nair", "Bollywood", 5, "Chandni"),
    ("The Raag Collective", "Bollywood", 4, "Strings of Dawn"),
    ("Hana Mori", "J-Pop", 7, "Sakura Static"), ("Tokyo Drift Club", "J-Pop", 5, "Neon Rain"),
    ("Yuki Tanaka", "J-Pop", 3, "Paper Cranes"),
    ("Elena Petrova", "Classical", 5, "Winter Sonatas"), ("The Meridian Quartet", "Classical", 4, "Four Seasons Reimagined"),
    ("Marcus Bell", "Hip-Hop", 9, "Corner Store Poems"), ("Jae Park", "Hip-Hop", 7, "Night Shift"),
    ("Tasha Reed", "Hip-Hop", 5, "Gold Chains & Gardens"), ("Big Olu", "Hip-Hop", 4, "Block Party"),
    ("Freya Lindqvist", "Folk", 6, "Northern Lights"), ("Willow Creek", "Folk", 5, "Dusty Roads"),
    ("Amber Skye", "Folk", 3, "Harvest Moon"),
    ("Rogue Frequency", "Rock", 8, "Turn It Up"), ("The Ironwoods", "Rock", 6, "Thunder Road"),
    ("Crimson Static", "Rock", 4, "Red Line"),
    ("Zara Ahmed", "R&B", 7, "Velvet Nights"), ("Dante Cole", "R&B", 5, "Slow Burn"),
    ("Milo Hart", "Lo-Fi", 6, "Rainy Day Tapes"), ("Cloud Nine FM", "Lo-Fi", 5, "Study Break"),
    ("Nora Lind", "Ambient", 4, "Northern Stillness"), ("Echo Valley", "Ambient", 3, "Weightless"),
]

TRACK_SUFFIXES = ["(Original Mix)", "", "", "", " (Acoustic)", " (Remix)", "", " (Live)"]

def track_names(artist, album):
    base = [f"{album} I", f"{album} II", f"{album} III"]
    return base

plays = []
track_id = 0
catalog = []  # (track_id, artist, genre, track, album, duration_ms)
for artist, genre, weight, album in ARTISTS:
    for i, tname in enumerate(track_names(artist, album)):
        track_id += 1
        catalog.append({
            "trackId": f"t{track_id:03d}", "artist": artist, "genre": genre,
            "track": tname, "album": album,
            "durationMs": random.randint(150000, 280000),
            "weight": weight,
        })

start = datetime(2025, 11, 18)
end = datetime(2026, 11, 17, 23, 59)
days = (end - start).days
# ~3,400 plays over the year, heavier on weekends + evenings, summer peak
weights = [c["weight"] for c in catalog]
for d in range(days + 1):
    day = start + timedelta(days=d)
    # seasonal: more listening in Jun-Aug and Dec
    seasonal = 1.35 if day.month in (6, 7, 8, 12) else 1.0
    weekend = 1.45 if day.weekday() >= 5 else 1.0
    n = int(random.gauss(9.2, 3.2) * seasonal * weekend)
    n = max(2, min(22, n))
    for _ in range(n):
        c = random.choices(catalog, weights=weights, k=1)[0]
        # listening clock: peaks 08:00, 13:00, 21:00-23:00
        hour = random.choices(
            list(range(24)),
            weights=[1,1,1,1,1,1,2,4,7,5,3,3,4,6,4,3,4,5,6,7,8,10,9,5], k=1)[0]
        minute = random.randint(0, 59)
        played = day.replace(hour=hour, minute=minute, second=random.randint(0, 59))
        ms = int(c["durationMs"] * random.uniform(0.55, 1.0))
        plays.append({
            "trackId": c["trackId"], "artist": c["artist"], "track": c["track"],
            "album": c["album"], "genre": c["genre"],
            "playedAt": played.isoformat(), "msPlayed": ms,
        })

plays.sort(key=lambda p: p["playedAt"])
out = {"generatedAt": "2026-11-18", "year": "Nov 2025 - Nov 2026",
       "source": "bundled sample data (fictional artists/tracks)",
       "plays": plays}
os.makedirs(os.path.join(BASE, "src/data/months"), exist_ok=True)
with open(os.path.join(BASE, "src/data/sample-history.json"), "w") as f:
    json.dump(out, f, indent=2)
# per-month files
from collections import defaultdict
bymonth = defaultdict(list)
for p in plays:
    bymonth[p["playedAt"][:7]].append(p)
for month, ps in sorted(bymonth.items()):
    with open(os.path.join(BASE, f"src/data/months/{month}.json"), "w") as f:
        json.dump({"month": month, "plays": ps}, f, indent=2)
total_min = sum(p["msPlayed"] for p in plays) / 60000
print(f"plays={len(plays)} artists={len(ARTISTS)} tracks={len(catalog)} "
      f"totalMinutes={total_min:.0f} months={len(bymonth)}")
