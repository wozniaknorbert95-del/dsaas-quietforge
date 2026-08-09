#!/usr/bin/env python3
"""Build LinkedIn carousel v2 for INSPIRE build-in-public (POD shop ICP)."""

from __future__ import annotations

import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "operations" / "media" / "linkedin-inspire-v2"
INSPIRE = ROOT.parent / "flexgrafik-inspire"
MOCKUP_STD = (
    INSPIRE
    / "ops"
    / "benchmarks"
    / "inspiration-v2"
    / "schilder"
    / "bus_l-tier-v2"
    / "standard.png"
)
MOCKUP_PREM = (
    INSPIRE
    / "ops"
    / "benchmarks"
    / "inspiration-v2"
    / "schilder"
    / "bus_l-tier-v2"
    / "premium.png"
)

W, H = 1080, 1350  # 4:5 LinkedIn feed

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
    ]
    y = 520
    for bullet in bullets:
        draw.ellipse((72, y + 10, 88, y + 26), fill=QF_ACCENT)
        for line in textwrap.wrap(bullet, width=38):
            draw.text((108, y), line, fill=QF_DIM, font=_font(28))
            y += 38
        y += 16

    draw.rounded_rectangle((72, H - 320, W - 72, H - 200), radius=16, fill=QF_RAISED, outline=QF_BORDER)
    draw.text((96, H - 290), "There is a better path:", fill=QF_TEXT, font=_font(26, True))
    draw.text(
        (96, H - 248),
        "NL intake → brief → Standard + Premium → mockups → wizard",
        fill=QF_DIM,
        font=_font(24),
    )

    _draw_footer(draw, "Slide 1/4 · PARTIAL · inspire-build-in-public-v2")
    path = OUT / "slide-1-hook-problem.png"
    img.save(path, optimize=True)
    return path


def slide_intake_nl() -> Path:
    img = Image.new("RGB", (W, H), QF_BG)
    draw = ImageDraw.Draw(img)

    draw.text((48, 48), "Live NL client intake", fill=QF_ACCENT, font=_font(28, True))
    draw.text((48, 92), "zzpackage.flexgrafik.nl/voertuigreclame-ontwerp", fill=QF_DIM, font=_font(20))

    # Simulated NL chat (client persona Schilder Janssen)
    messages = [
        ("assistant", "Mooi — ik pak dit aan zoals een professionele voertuig-reclame studio."),
        ("assistant", "Ik maak twee richtingen: Standard en Premium."),
        ("user", "Schilder Janssen — schilder in Noord-Brabant."),
        ("assistant", "Welk voertuig? Bestelbus L past goed voor jouw branche."),
        ("user", "Bestelbus L, zakelijk gebruik."),
        ("user", "Binnen- en buitenschilderwerk, behangen. Strak en betrouwbaar."),
    ]

    y = 150
    for role, text in messages:
        is_user = role == "user"
        bg = "#1a2438" if is_user else "#14261f"
        accent = "#5b8def" if is_user else "#3ecf8e"
        label = "Klant" if is_user else "INSPIRE consultant"
        wrapped = textwrap.wrap(text, width=48)
        block_h = 28 + len(wrapped) * 32 + 20
        x0 = 48 if is_user else 100
        x1 = W - 48
        draw.rounded_rectangle((x0, y, x1, y + block_h), radius=16, fill=bg, outline=QF_BORDER)
        draw.text((x0 + 16, y + 10), label, fill=accent, font=_font(18, True))
        ty = y + 36
        for line in wrapped:
            draw.text((x0 + 16, ty), line, fill=QF_TEXT, font=_font(22))
            ty += 32
        y += block_h + 14
        if y > H - 200:
            break

    draw.rectangle((48, H - 160, W - 48, H - 100), fill=QF_RAISED, outline=QF_BORDER)
    draw.text((64, H - 142), "Record this on prod — not dev EN chat", fill=QF_ACCENT, font=_font(22, True))

    _draw_footer(draw, "Slide 2/4 · NL intake · replace with prod frame after recording")
    path = OUT / "slide-2-intake-nl.png"
    img.save(path, optimize=True)
    return path


def slide_summary_sku() -> Path:
    img = Image.new("RGB", (W, H), QF_BG)
    draw = ImageDraw.Draw(img)

    draw.text((48, 48), "Brief confirmed — two directions", fill=QF_ACCENT, font=_font(28, True))
    draw.text((48, 92), "Schilder Janssen · bus_l · €600–1000", fill=QF_DIM, font=_font(22))

    cards = [
        ("Standard — Slim zichtbaar", "BLS-SET-LOGO-CONTACT", "deur + achter", "€199+"),
        ("Premium — Maximale uitstraling", "NA-WRAP-BASIC", "wrap-flow · meer zichtbaarheid", "€399+"),
    ]
    y = 180
    for title, sku, coverage, price in cards:
        draw.rounded_rectangle((48, y, W - 48, y + 200), radius=18, fill=QF_RAISED, outline=QF_BORDER)
        draw.text((72, y + 24), title, fill=QF_TEXT, font=_font(30, True))
        draw.text((72, y + 72), f"SKU: {sku}", fill=QF_DIM, font=_font(24))
        draw.text((72, y + 112), f"Panels: {coverage}", fill=QF_DIM, font=_font(22))
        draw.text((72, y + 148), f"From {price}", fill=QF_ACCENT, font=_font(26, True))
        y += 220

    draw.text((48, y + 20), "CTA exact: 06-98765432 · www.janssen-schilder.nl", fill=QF_DIM, font=_font(22))

    _draw_footer(draw, "Slide 3/4 · Summary + SKU · inspire v2 bench")
    path = OUT / "slide-3-summary-sku.png"
    img.save(path, optimize=True)
    return path


def slide_mockups_partial() -> Path:
    if not MOCKUP_STD.is_file() or not MOCKUP_PREM.is_file():
        raise FileNotFoundError(f"Missing v2 mockups under {INSPIRE / 'ops/benchmarks/inspiration-v2'}")

    canvas = Image.new("RGB", (W, H), QF_BG)
    draw = ImageDraw.Draw(canvas)

    draw.text((48, 32), "Jouw 2 ontwerpen", fill=QF_TEXT, font=_font(32, True))

    thumb_h = int(H * 0.36)
    thumb_w = (W - 120) // 2
    for idx, src in enumerate([MOCKUP_STD, MOCKUP_PREM]):
        im = Image.open(src).convert("RGB")
        scale = min(thumb_w / im.width, thumb_h / im.height)
        nw, nh = int(im.width * scale), int(im.height * scale)
        resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
        ox = 48 + idx * (thumb_w + 24) + (thumb_w - nw) // 2
        oy = 100 + (thumb_h - nh) // 2
        canvas.paste(resized, (ox, oy))
        label = "Standard" if idx == 0 else "Premium"
        draw.text((48 + idx * (thumb_w + 24), 100 + thumb_h + 12), label, fill=QF_ACCENT, font=_font(22, True))

    banner_y = H - 340
    draw.rectangle((0, banner_y, W, H), fill=QF_RAISED)
    draw.rectangle((48, banner_y + 28, 200, banner_y + 68), fill=PARTIAL)
    draw.text((62, banner_y + 36), "PARTIAL", fill="#ffffff", font=_font(22, True))

    lines = [
        "Inspiration mockups — not print-ready",
        "Final artwork = Adobe Illustrator (DF-004)",
        "Generative bench v2 · openrouter · Dowódca Q3 pending",
    ]
    ty = banner_y + 88
    for i, line in enumerate(lines):
        draw.text(
            (48, ty + i * 40),
            line,
            fill=QF_TEXT if i == 0 else QF_DIM,
            font=_font(28 if i == 0 else 22, bold=(i == 0)),
        )

    _draw_footer(draw, "Slide 4/4 · G_DOWODCA_VISUAL pending · build in public")
    path = OUT / "slide-4-mockups-partial.png"
    canvas.save(path, optimize=True)
    return path


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    paths = [
        slide_hook(),
        slide_intake_nl(),
        slide_summary_sku(),
        slide_mockups_partial(),
    ]
    for p in paths:
        print(f"Wrote {p}")


if __name__ == "__main__":
    main()
