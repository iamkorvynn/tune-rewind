#!/usr/bin/env python3
"""Generate three alternate listener profiles for TuneRewind.

Each profile is a full fictional listening history with a distinct taste
shape, so the app can be explored from different angles:
  - night-owl:     mostly 21:00-02:00, Electronic + Lo-Fi heavy
  - jazz-devotee:  Jazz + Classical heavy, mornings, long sessions
  - genre-explorer: flat across all 12 genres, no dominant artist
Run: python3 tools/generate-profiles.py
"""
import json, random, os
from datetime import datetime, timedelta

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, "src/data/profiles")

ARTISTS = [
    ("Neon Coastline", "Indie Pop", 10), ("Mara Voss", "Indie Pop", 8),
    ("The Low Tides", "Indie Pop", 6), ("Juno Fields", "Indie Pop", 5),
    ("KAIRO", "Electronic", 10), ("Vessel Nine", "Electronic", 8),
    ("Modular Sun", "Electronic", 6), ("Lumen Arc", "Electronic", 5),
    ("Dario Fontaine", "Jazz", 7), ("The Velvet Hour", "Jazz", 6),
    ("Nia Okafor", "Jazz", 5), ("Cole Bennett Trio", "Jazz", 3),
    ("Sofia Reyes", "Latin Pop", 8), ("Diego Mar", "Latin Pop", 6),
    ("Arjun Mehta", "Bollywood", 7), ("Priya Nair", "Bollywood", 5),
    ("Hana Mori", "J-Pop", 7), ("Tokyo Drift Club", "J-Pop", 5),
    ("Elena Petrova", "Classical", 5), ("The Meridian Quartet", "Classical", 4),
    ("Marcus Bell", "Hip-Hop", 9), ("Jae Park", "Hip-Hop", 7),
    ("Freya Lindqvist", "Folk", 6), ("Willow Creek", "Folk", 5),
    ("Rogue Frequency", "Rock", 8), ("The Ironwoods", "Rock", 6),
    ("Zara Ahmed", "R&B", 7), ("Dante Cole", "R&B", 5),
    ("Milo Hart", "Lo-Fi", 6), ("Cloud Nine FM", "Lo-Fi", 5),
    ("Nora Lind", "Ambient", 4), ("Echo Valley", "Ambient", 3),
]

PROFILES = {
    "night-owl": {
        "name": "Night Owl", "seed": 101,
        "genreBoost": {"Electronic": 3.0, "Lo-Fi": 2.5, "Ambient": 2.0},
        "hours": [21, 22, 23, 0, 1, 2, 21, 22, 23, 0],
        "blurb": "Mostly after dark — Electronic and Lo-Fi past midnight.",
    },
    "jazz-devotee": {
        "name": "Jazz Devotee", "seed": 202,
        "genreBoost": {"Jazz": 4.0, "Classical": 2.5},
        "hours": [7, 8, 9, 10, 18, 19, 20, 8, 9, 19],
        "blurb": "Mornings and evenings, Jazz and Classical, long sessions.",
    },
    "genre-explorer": {
        "name": "Genre Explorer", "seed": 303,
        "genreBoost": {},
        "hours": list(range(7, 24)),
        "blurb": "Flat across all 12 genres — no single home base.",
    },
}

def build(profile_id, cfg):
    random.seed(cfg["seed"])
    catalog = []
    tid = 0
    for artist, genre, weight in ARTISTS:
        boost = cfg["genreBoost"].get(genre, 1.0)
        for i in range(3):
            tid += 1
            catalog.append({"trackId": f"p{tid:03d}", "artist": artist, "genre": genre,
                            "track": f"{artist} Song {i+1}", "album": artist,
                            "durationMs": random.randint(150000, 280000),
                            "weight": weight * boost})
    start = datetime(2025, 11, 18)
    plays = []
    for d in range(365):
        day = start + timedelta(days=d)
        n = max(2, int(random.gauss(8, 3)))
        for _ in range(n):
            c = random.choices(catalog, weights=[x["weight"] for x in catalog], k=1)[0]
            hour = random.choice(cfg["hours"])
            played = day.replace(hour=hour, minute=random.randint(0, 59))
            plays.append({"trackId": c["trackId"], "artist": c["artist"], "track": c["track"],
                          "album": c["album"], "genre": c["genre"],
                          "playedAt": played.isoformat(),
                          "msPlayed": int(c["durationMs"] * random.uniform(0.55, 1.0))})
    plays.sort(key=lambda p: p["playedAt"])
    return {"id": profile_id, "name": cfg["name"], "blurb": cfg["blurb"],
            "source": "bundled sample profile (fictional artists)", "plays": plays}

os.makedirs(OUT, exist_ok=True)
for pid, cfg in PROFILES.items():
    data = build(pid, cfg)
    with open(os.path.join(OUT, f"{pid}.json"), "w") as f:
        json.dump(data, f, indent=2)
    mins = sum(p["msPlayed"] for p in data["plays"]) / 60000
    print(f"{pid}: plays={len(data['plays'])} minutes={mins:.0f}")
