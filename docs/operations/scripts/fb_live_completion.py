#!/usr/bin/env python3
"""Facebook Live Completion — Graph API profile update + Post #1 publish.

Reads FB_PAGE_ID and FB_ACCESS_TOKEN from environment.
SSoT copy: services/docs/strategy/facebook/profile-copy.md + content-themes.md Post 1.

Usage on VPS:
  cd /opt/jadzia && source venv/bin/activate && set -a && source .env && set +a
  python3 /path/to/fb_live_completion.py audit
  python3 /path/to/fb_live_completion.py update-profile
  python3 /path/to/fb_live_completion.py publish-post1 --image-url URL
"""
from __future__ import annotations

import argparse
import json
import os
import sys

import requests

API = "https://graph.facebook.com/v25.0"

SHORT_BIO = (
    "FlexGrafik — jouw brandingpartner als ZZP'er in Nederland.\n\n"
    "Stickers, voertuigbelettering en bedrijfskleding — alles op één plek.\n"
    "Mimaki ecosolvent druk (UV- en weerbestendig) + vakkundige montage via onze partner.\n\n"
    "Bestel via de wizard · vragen? Chat op flexgrafik.nl of stuur een bericht.\n"
    "https://zzpackage.flexgrafik.nl/wizard/"
)

ABOUT = (
    "FlexGrafik is jouw brandingpartner voor ZZP'ers in Nederland — geen generieke drukkerij, "
    "geen bouwmarktstickers.\n\n"
    "Wat wij doen:\n"
    "• Stickers, voertuigbelettering, bedrijfskleding en signage\n"
    "• Professionele Mimaki ecosolvent druk — UV-bestendig en weerbestendig\n"
    "• Vakkundige montage door onze professionele montagepartner (geen DIY)\n"
    "• 161 producten bestelbaar via onze online wizard — upload, betaal via Mollie, klaar\n"
    "• Live chat op flexgrafik.nl en in de wizard — helpt je kiezen (geen wachten op antwoord)\n\n"
    "Oorsprong: Rotterdam — wij werken voor ZZP'ers door heel Nederland.\n\n"
    "Bestellen (self-service):\nhttps://zzpackage.flexgrafik.nl/wizard/\n\n"
    "Website & chat:\nhttps://flexgrafik.nl/\n\n"
    "Vragen of maatwerk? Stuur een bericht via deze pagina."
)

POST_1 = (
    "Even stil geweest — maar FlexGrafik is terug, en anders dan je gewend bent.\n\n"
    "Wij zijn géén generieke drukkerij. Wij zijn jouw brandingpartner als ZZP'er in Nederland:\n"
    "stickers, voertuigbelettering, bedrijfskleding en signage — alles op één plek.\n\n"
    "Professionele Mimaki ecosolvent druk. Vakkundige montage via onze partner. "
    "Bestellen kan online via onze wizard — 161 producten, zonder eindeloos mailen.\n\n"
    "De komende weken laten we zien hoe dat werkt. Vragen? Stuur een bericht.\n\n"
    "Klaar om te bestellen?\nhttps://zzpackage.flexgrafik.nl/wizard/"
)

WEBSITE = "https://zzpackage.flexgrafik.nl/wizard/"


def _config() -> tuple[str, str]:
    page_id = os.environ.get("FB_PAGE_ID")
    token = os.environ.get("FB_ACCESS_TOKEN")
    if not page_id or not token:
        raise RuntimeError("FB_PAGE_ID and FB_ACCESS_TOKEN required")
    return page_id, token


def audit() -> int:
    page_id, token = _config()
    fields = (
        "id,name,about,description,website,category,category_list,link,"
        "fan_count,followers_count,phone,emails,username"
    )
    r = requests.get(
        f"{API}/{page_id}",
        params={"fields": fields, "access_token": token},
        timeout=30,
    )
    print(json.dumps(r.json(), indent=2, ensure_ascii=False))
    return 0 if r.ok else 2


def update_profile() -> int:
    page_id, token = _config()
    payload = {
        "about": ABOUT,
        "description": SHORT_BIO[:255],
        "website": WEBSITE,
        "access_token": token,
    }
    r = requests.post(f"{API}/{page_id}", data=payload, timeout=30)
    data = r.json()
    print(json.dumps(data, indent=2, ensure_ascii=False))
    if not r.ok:
        return 2
    # CTA: SHOP_NOW -> wizard
    cta_payload = {
        "type": "SHOP_NOW",
        "value": json.dumps({"link": WEBSITE}),
        "access_token": token,
    }
    r2 = requests.post(f"{API}/{page_id}/call_to_actions", data=cta_payload, timeout=30)
    print("CTA:", json.dumps(r2.json(), indent=2, ensure_ascii=False))
    return 0 if r2.ok else 3


def publish_post1(image_url: str) -> int:
    page_id, token = _config()
    r = requests.post(
        f"{API}/{page_id}/photos",
        data={
            "url": image_url,
            "caption": POST_1,
            "access_token": token,
        },
        timeout=60,
    )
    print(json.dumps(r.json(), indent=2, ensure_ascii=False))
    return 0 if r.ok else 2


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["audit", "update-profile", "publish-post1"])
    parser.add_argument("--image-url", default="https://quietforge.flexgrafik.nl/gratka/wizard-checkout.png")
    args = parser.parse_args()
    if args.action == "audit":
        return audit()
    if args.action == "update-profile":
        return update_profile()
    if args.action == "publish-post1":
        return publish_post1(args.image_url)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
