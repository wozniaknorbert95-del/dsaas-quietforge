#!/usr/bin/env python3
"""Build LinkedIn carousel v3 for INSPIRE build-in-public (mockup-first, no video).

v3 supersedes v2: real prod mockups (Schilder Janssen) are the visual proof, not
designed chat/summary placeholders. Four slides, 1080x1350, PNG.

Run from services/ repo root:  python scripts/build-linkedin-inspire-carousel-v3.py
"""

from __future__ import annotations

import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "operations" / "media" / "linkedin-inspire-v3"
SCREENS = ROOT / "docs" / "operations" / "media" / "inspire-screens"

MOCKUP_STD = SCREENS / "prod-mockup-standard.png"
MOCKUP_PREM = SCREENS / "prod-mockup-premium.png"
RESULTS_PNG = SCREENS / "prod-e2e-results.png"

W, H = 1080, 1350  # 4:5 LinkedIn feed carousel

QF_BG = "#050608"
QF_RAISED = "#0b0d12"
QF_BORDER = "#252937"
QF_TEXT = "#e5e7ef"
QF_DIM = "#9ca3c7"
QF_ACCENT = "#e8a33d"
PARTIAL = "#c47a1a"


def _font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if Path(path).is_file():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def _draw_footer(draw: ImageDraw.ImageDraw, label: str) -> None:
    draw.rectangle((0, H - 72, W, H), fill="#111820")
    draw.text((48, H - 50), label, fill="#6b7c93", font=_font(20))


def _require(path: Path) -> Path:
    if not path.is_file():
        raise FileNotFoundError(f"Missing prod asset: {path}")
    return path


def slide_hook() -> Path:
    img = Image.new("RGB", (W, H), QF_BG)
    draw = ImageDraw.Draw(img)

    draw.rectangle((48, 120, W - 48, 200), outline=QF_BORDER, width=2)
    draw.text((72, 148), "INSPIRE · supervised sales consultant", fill=QF_ACCENT, font=_font(22, True))

    headline = "Your shop still quotes vehicle wraps in email?"
    y = 280
    for line in textwrap.wrap(headline, width=22):
        draw.text((72, y), line, fill=QF_TEXT, font=_font(52, True))
        y += 62

    bullets = [
        "Logo in one thread. Coverage in another.",
        "Client never sees direction before they commit.",
        "Redraw rounds eat studio margin.",
        "He ghosts — because choices never felt clear.",
    ]
    y = 540
    for bullet in bullets:
        draw.ellipse((72, y + 10, 88, y + 26), fill=QF_ACCENT)
        for line in textwrap.wrap(bullet, width=38):
            draw.text((108, y), line, fill=QF_DIM, font=_font(28))
            y += 38
        y += 16

    draw.rounded_rectangle((72, H - 300, W - 72, H - 180), radius=16, fill=QF_RAISED, outline=QF_BORDER)
    draw.text((96, H - 270), "There is a better path:", fill=QF_TEXT, font=_font(26, True))
    draw.text(
        (96, H - 228),
        "NL intake brief confirmed 2 directions mockups wizard",
        fill=QF_DIM,
        font=_font(24),
    )

    _draw_footer(draw, "Slide 1/4 · PARTIAL · inspire-build-in-public-v2")
    path = OUT / "slide-1-hook-problem.png"
    img.save(path, optimize=True)
    return path


def slide_mockup(src: Path, label: str, sub: str, slide_no: int, out_name: str) -> Path:
    _require(src)
    canvas = Image.new("RGB", (W, H), QF_BG)
    draw = ImageDraw.Draw(canvas)

    draw.text((48, 40), label, fill=QF_ACCENT, font=_font(36, True))
    draw.text((48, 96), sub, fill=QF_DIM, font=_font(24))

    # Fit mockup into a generous frame below header, above footer.
    top = 150
    bottom = H - 120
    frame_w = W - 96
    frame_h = bottom - top
    im = Image.open(src).convert("RGB")
    scale = min(frame_w / im.width, frame_h / im.height)
    nw, nh = int(im.width * scale), int(im.height * scale)
    resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
    ox = 48 + (frame_w - nw) // 2
    oy = top + (frame_h - nh) // 2
    canvas.paste(resized, (ox, oy))

    _draw_footer(draw, f"Slide {slide_no}/4 · Schilder Janssen · prod mockup")

    # NOTE: no EN burn-in on the mockup itself. Caption is in QF dark area only.
    path = OUT / out_name
    canvas.save(path, optimize=True)
    return path


def slide_endcard() -> Path:
    img = Image.new("RGB", (W, H), QF_BG)
    draw = ImageDraw.Draw(img)

    draw.rectangle((48, 80, 232, 144), fill=PARTIAL)
    draw.text((66, 92), "PARTIAL", fill="#ffffff", font=_font(28, True))

    headline = "Built in my own NL print business first."
    y = 220
    for line in textwrap.wrap(headline, width=24):
        draw.text((52, y), line, fill=QF_TEXT, font=_font(46, True))
        y += 56

    effects = [
        "Client sees direction before he pays a euro.",
        "Shop owner: structured lead, SKU, price — before quote chaos.",
        "Two directions. One confirmed brief. Zero email ping-pong.",
    ]
    y = 420
    for eff in effects:
        draw.ellipse((52, y + 10, 70, y + 26), fill=QF_ACCENT)
        for line in textwrap.wrap(eff, width=42):
            draw.text((88, y), line, fill=QF_DIM, font=_font(28))
            y += 38
        y += 18

    draw.rounded_rectangle((52, H - 360, W - 52, H - 200), radius=18, fill=QF_RAISED, outline=QF_BORDER)
    draw.text((76, H - 332), "Honesty", fill=QF_ACCENT, font=_font(26, True))
    honesty = [
        "Pipeline runs end-to-end on prod.",
        "Mockups shown here are real. Conversation still tuning.",
        "Will not call it studio-grade until a human client run signs it off.",
    ]
    ty = H - 288
    for i, line in enumerate(honesty):
        wrapped = textwrap.wrap(line, width=46)
        for w in wrapped:
            draw.text((76, ty), w, fill=QF_TEXT if i == 0 else QF_DIM, font=_font(22))
            ty += 30
        ty += 8

    draw.text((52, H - 150), "DM me what you sell and how you quote today.", fill=QF_TEXT, font=_font(26, True))

    _draw_footer(draw, "Slide 4/4 · Build in public · supervised systems")
    path = OUT / "slide-4-endcard-partial.png"
    img.save(path, optimize=True)
    return path


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    paths = [
        slide_hook(),
        slide_mockup(MOCKUP_STD, "Standard direction", "Schilder Janssen · ZZP schilder · bus_l", 2, "slide-2-standard-mockup.png"),
        slide_mockup(MOCKUP_PREM, "Premium direction", "Schilder Janssen · full-coverage wrap", 3, "slide-3-premium-mockup.png"),
        slide_endcard(),
    ]
    for p in paths:
        print(f"Wrote {p}")


if __name__ == "__main__":
    main()