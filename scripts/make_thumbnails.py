"""Create 640px-wide WebP copies of large library photos for grids and tiles.

Run from the project root after adding photos to public/images/library:
    python3 scripts/make_thumbnails.py
Requires Pillow (pip install Pillow). Output: public/images/library/640/<name>.webp
Only images 800px or wider get a copy; src/lib/responsive.ts uses the same rule.
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LIB = ROOT / "public/images/library"
OUT = LIB / "640"
MIN_WIDTH = 800
TARGET = 640

OUT.mkdir(exist_ok=True)
made = skipped = 0
for src in sorted(LIB.glob("*.webp")):
    with Image.open(src) as im:
        if im.width < MIN_WIDTH:
            continue
        dest = OUT / src.name
        if dest.exists() and dest.stat().st_mtime >= src.stat().st_mtime:
            skipped += 1
            continue
        h = round(im.height * TARGET / im.width)
        im.convert("RGB").resize((TARGET, h), Image.LANCZOS).save(
            dest, "WEBP", quality=78, method=6
        )
        made += 1
print(f"created {made}, up to date {skipped}")
