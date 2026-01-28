#!/usr/bin/env python3
"""
Resize hero background image to reduce file size.
Run: pip install Pillow   (if needed)
     python resize_hero_image.py
Creates images/hero-massena.jpeg (max width 1400px, quality 82) for faster loading.
"""
try:
    from PIL import Image
except ImportError:
    print("Please install Pillow: pip install Pillow")
    raise

import os

SRC = "images/AS-Massena-Square-scaled.jpeg"
OUT = "images/hero-massena.jpeg"
MAX_WIDTH = 1400
QUALITY = 82

if not os.path.exists(SRC):
    print(f"Source image not found: {SRC}")
    exit(1)

img = Image.open(SRC)
if img.mode in ("RGBA", "P"):
    img = img.convert("RGB")
w, h = img.size
if w > MAX_WIDTH:
    ratio = MAX_WIDTH / w
    new_h = int(h * ratio)
    img = img.resize((MAX_WIDTH, new_h), Image.Resampling.LANCZOS)
img.save(OUT, "JPEG", quality=QUALITY, optimize=True)
print(f"Saved {OUT} (max width {MAX_WIDTH}px)")
