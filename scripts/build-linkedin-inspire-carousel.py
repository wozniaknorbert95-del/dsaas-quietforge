#!/usr/bin/env python3
"""Build LinkedIn carousel slides for INSPIRE build-in-public post."""

from __future__ import annotations

import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "operations" / "media" / "linkedin-inspire-build-in-public"
MOCKUP_SRC = (
    ROOT.parent
    / "flexgrafik-inspire"
    / "ops"
    / "benchmarks"
    / "inspiration-v1"
    / "quietforge"
    / "confirmed-brief"
    / "standard.png"
)

W, H = 1080, 1350  # 4:5 LinkedIn feed


def _font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if Path(path).is_file():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def slide_chat() -> Path:
    img = Image.new("RGB", (W, H), "#0f1419")
    draw = ImageDraw.Draw(img)

    # Header bar
    draw.rectangle((0, 0, W, 120), fill="#1a2332")
    draw.text((48, 42), "INSPIRE — supervised sales consultant", fill="#e8edf4", font=_font(34, True))
    draw.text((48, 82), "Professional intake — not a random image prompt", fill="#8b9cb3", font=_font(22))

    messages = [
        ("user", "We're building INSPIRE for NL ZZP — vehicle branding quotes still die in email threads."),
        (
            "assistant",
            "Right. The flow should be: intake → confirmed brief → Standard + Premium "
            "→ inspiration mockups → wizard checkout. Not a one-shot AI poster.",
        ),
        ("user", "Client needs to see direction before they commit. Final art stays in Illustrator."),
        (
            "assistant",
            "Confirmed. Two directions only. Generative mockups = sales inspiration (~7/10). "
            "Human Q3 gate before anything ships to a real client.",
        ),
        ("user", "Status?"),
        ("assistant", "PARTIAL — pipeline works end-to-end. Visual bar still tuning. Build in public."),
    ]

    y = 150
    for role, text in messages:
        is_user = role == "user"
        bg = "#243044" if is_user else "#1e3a2f"
        accent = "#5b8def" if is_user else "#3ecf8e"
        label = "You" if is_user else "INSPIRE consultant"
        wrapped = textwrap.wrap(text, width=52)
        block_h = 28 + len(wrapped) * 34 + 24
        x0 = 56 if is_user else 120
        x1 = W - 56
        draw.rounded_rectangle((x0, y, x1, y + block_h), radius=18, fill=bg)
        draw.text((x0 + 20, y + 12), label, fill=accent, font=_font(20, True))
        ty = y + 40
        for line in wrapped:
            draw.text((x0 + 20, ty), line, fill="#e8edf4", font=_font(24))
            ty += 34
        y += block_h + 22

    draw.rectangle((0, H - 72, W, H), fill="#111820")
    draw.text((48, H - 50), "Slide 1/2 · PARTIAL · flexgrafik-inspire", fill="#6b7c93", font=_font(20))

    path = OUT / "slide-1-chat-intake-en.png"
    img.save(path, optimize=True)
    return path


def slide_mockup() -> Path:
    if not MOCKUP_SRC.is_file():
        raise FileNotFoundError(f"Missing mockup source: {MOCKUP_SRC}")

    base = Image.open(MOCKUP_SRC).convert("RGB")
    # Fit mockup in upper area
    target_w, target_h = W, int(H * 0.78)
    scale = min(target_w / base.width, target_h / base.height)
    nw, nh = int(base.width * scale), int(base.height * scale)
    resized = base.resize((nw, nh), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (W, H), "#0f1419")
    ox, oy = (W - nw) // 2, 40
    canvas.paste(resized, (ox, oy))

    draw = ImageDraw.Draw(canvas)
    banner_y = H - 280
    draw.rectangle((0, banner_y, W, H), fill="#0b0f14")
    draw.rectangle((48, banner_y + 28, 220, banner_y + 68), fill="#c47a1a")
    draw.text((62, banner_y + 36), "PARTIAL", fill="#ffffff", font=_font(22, True))

    lines = [
        "Inspiration mockup — not print-ready",
        "Final artwork = Adobe Illustrator (DF-004)",
        "quietforge · Standard direction · openrouter bench v1",
    ]
    ty = banner_y + 88
    for i, line in enumerate(lines):
        draw.text(
            (48, ty + i * 42),
            line,
            fill="#e8edf4" if i == 0 else "#9aa8bc",
            font=_font(30 if i == 0 else 24, bold=(i == 0)),
        )

    draw.text((48, H - 50), "Slide 2/2 · G-SALES-VISUAL pending Dowódca Q3", fill="#6b7c93", font=_font(20))

    path = OUT / "slide-2-mockup-partial.png"
    canvas.save(path, optimize=True)
    return path


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    s1 = slide_chat()
    s2 = slide_mockup()
    print(f"Wrote {s1}")
    print(f"Wrote {s2}")


if __name__ == "__main__":
    main()
