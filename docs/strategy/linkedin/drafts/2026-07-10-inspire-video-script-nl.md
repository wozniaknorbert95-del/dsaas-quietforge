---
status: "[READY]"
title: "INSPIRE video script NL — Schilder Janssen (prod recording)"
owner: "Norbert Wozniak"
date: "2026-07-10"
persona: "Schilder Janssen (ZZP schilder, bus_l)"
url: "https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/"
brief: "flexgrafik-inspire/ops/briefs/bus_l-tier-v2.json"
logo: "flexgrafik-inspire/docs/ops/inspire-v2/logos/schilder-janssen-logo.png"
duration_target: "60–90s raw → 60–75s edited"
---

# Scenariusz nagrania NL — Schilder Janssen

**Ty grasz:** klienta (Schilder Janssen).  
**UI mówi:** konsultant INSPIRE po NL.  
**Nagrywaj na:** https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/  
**NIE używaj:** `?da_fixture=results` (to DEMO, nie LIVE).

## Przed nagraniem

1. Przygotuj logo: `docs/ops/inspire-v2/logos/schilder-janssen-logo.png` (z repo inspire).
2. Wyczyść cache / incognito — świeża sesja chatu.
3. OBS / Win+G / Loom — **1080×1920 (9:16)** lub 1920×1080 + crop.
4. Ukryj pasek zakładek, powiadomienia, PII spoza briefu.

---

## Krok po kroku (co klikasz / co piszesz)

| # | Faza | Twoja akcja (klient) | Oczekiwany UI |
|---|------|----------------------|---------------|
| 1 | Opening | Przeczytaj powitanie, scroll lekko w dół | NL studio-ton; wzmianka o **Standard** + **Premium** |
| 2 | Bedrijf | **Bedrijfsnaam:** `Schilder Janssen` | Pole / przycisk akceptuje |
| | | **Branche:** `Schilder` (lub wybierz z listy jeśli jest) | |
| | | **Regio:** `Noord-Brabant` (lub `Nederland`) | |
| 3 | Auto | **Voertuig:** medium bus / Vito-Transporter (`bus_l`) | Vehicle picker |
| | | **Gebruik:** `Zakelijk` | |
| 4 | Marketing | **Doelgroep:** `Woningeigenaren en VvE's` | |
| | | **Diensten (max 3):** `Binnen- en buitenschilderwerk`, `Behangen` | |
| | | **Uitstraling:** `Strak` / balanced | |
| 5 | CTA | **Telefoon:** `06-98765432` | Exact string z briefu |
| | | **Website:** `www.janssen-schilder.nl` | Exact — bez https, bez literówek |
| 6 | Logo | Upload `schilder-janssen-logo.png` z `docs/ops/inspire-v2/logos/` | Status: logo uploaded |
| 7 | Kleuren | `#1A5276` + `#FFFFFF` (of kies blauw/wit) | |
| 8 | Budget | **Range:** `€600–1000` | |
| | | **Flexibiliteit:** flexibel als het ontwerp klopt | |
| 9 | Summary | Przeczytaj podsumowanie | SKU Standard + Premium + ceny |
| | | Klik **Bevestig** / confirm brief | |
| 10 | Results | Scroll w dół | **Jouw 2 ontwerpen** — 2 mockupy |
| | | | Disclaimer NL (inspiratie, geen drukbestand) |
| | | | **Start in de Wizard →** widoczny |

---

## Teksty do powiedzenia na głos (opcjonalnie, cicho)

Nagranie może być bez voice-over — montaż z hook slide EN. Jeśli nagrywasz głos NL:

- *"Ik ben schilder. Mijn bus moet professional ogen, maar ik wil eerst richting zien voordat ik bestel."*
- *"Twee opties: Standard en Premium — dat is duidelijk."*
- *"Dit is inspiratie — geen drukklare files. Dat snap ik."*

---

## Gates jakości (STOP jeśli fail)

| Gate | Pass |
|------|------|
| Hero | „Ontwerp je bus — gratis” (nie „binnenkort”) |
| Chat | NL konsultant, nie offline placeholder |
| Summary | Standard + Premium z SKU |
| CTA exact | `06-98765432` + `www.janssen-schilder.nl` w briefie |
| Results | 2 mockupy + disclaimer + Wizard button |
| Honesty | Bez fixture URL, bez fake „live” |

---

## Po nagraniu

1. Wytnij do 60–75s wg [storyboard](./2026-07-10-inspire-video-storyboard.md).
2. Opcjonalnie: wyciągnij 3 klatki do carousel (slides 2–4) — zastąp fallback PNG.
3. Opublikuj post z [v2 draft](./2026-07-10-inspire-build-in-public-v2.md).
