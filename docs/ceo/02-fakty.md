# 02 — Fakty

Każdy fakt ma link i datę sprawdzenia. Sprawdził CEO QuietForge **2026-11-21, ok. 08:35 CET** (curl, DNS przez dns.google, RDAP SIDN, kod repo na commicie `ae365a0`).
Jeśli fakt się zmieni, poprawiamy go tutaj z nową datą. Rzeczy niesprawdzone są w `05-pytania.md`.

## Strona i hosting

| Fakt | Źródło | Sprawdzone |
| --- | --- | --- |
| https://quietforge.nl odpowiada HTTP 200, nagłówek `server: cloudflare`, `cf-ray` | https://quietforge.nl (curl -I) | 2026-11-21 |
| https://www.quietforge.nl przekierowuje 301 na https://quietforge.nl/ | https://www.quietforge.nl (curl -I) | 2026-11-21 |
| Strona to statyczny eksport Next.js (`output: 'export'`) dla Cloudflare Pages, projekt `dsaas-quietforge` | [next.config.ts](https://github.com/wozniaknorbert95-del/dsaas-quietforge/blob/ae365a0dda642a021ef9a89ea8b1a8c25172d620/next.config.ts), [wrangler.toml](https://github.com/wozniaknorbert95-del/dsaas-quietforge/blob/ae365a0dda642a021ef9a89ea8b1a8c25172d620/wrangler.toml) | 2026-11-21 |
| Ta sama strona jest pod https://dsaas-quietforge.pages.dev (200, Cloudflare) | https://dsaas-quietforge.pages.dev | 2026-11-21 |
| Stara kopia nadal działa publicznie na Vercel (`server: Vercel`) i pokazuje stare ceny (m.in. €2,500, €4,500, €7,900) | https://flexgrafik-services.vercel.app/pricing/ | 2026-11-21 |
| quietforge.flexgrafik.nl nie odpowiada (brak połączenia) | https://quietforge.flexgrafik.nl (curl) | 2026-11-21 |

## Domena, DNS, poczta

| Fakt | Źródło | Sprawdzone |
| --- | --- | --- |
| Serwery nazw quietforge.nl: collins.ns.cloudflare.com, ricardo.ns.cloudflare.com | https://rdap.sidn.nl/domain/quietforge.nl, https://dns.google/resolve?name=quietforge.nl&type=NS | 2026-11-21 |
| Domena zarejestrowana 2026-10-26; DNSSEC wyłączony (`delegationSigned: false`) | https://rdap.sidn.nl/domain/quietforge.nl | 2026-11-21 |
| A/AAAA quietforge.nl i www = adresy Cloudflare (104.21.16.157, 172.67.213.242) | https://dns.google/resolve?name=quietforge.nl&type=A | 2026-11-21 |
| MX quietforge.nl = aspmx1/aspmx2.migadu.com; SPF `include:spf.migadu.com -all`; DKIM key1–3 → Migadu; DMARC `p=quarantine` | https://dns.google/resolve?name=quietforge.nl&type=MX, …&type=TXT, _dmarc.quietforge.nl | 2026-11-21 |
| flexgrafik.nl nie istnieje w DNS (NXDOMAIN) | https://dns.google/resolve?name=flexgrafik.nl&type=A | 2026-11-21 |

## Oferta i kontakt (na żywej stronie)

| Fakt | Źródło | Sprawdzone |
| --- | --- | --- |
| Cennik skanów: €149 (Hours), €290 (Both-lanes), €490 (Decision) netto | https://quietforge.nl/pricing/ | 2026-11-21 |
| Formularz „Book a scan” wysyła dane do `/api/intake/`; GET na ten adres zwraca 405 (funkcja istnieje) | https://quietforge.nl/book-a-scan/, [functions/api/intake.ts](https://github.com/wozniaknorbert95-del/dsaas-quietforge/blob/ae365a0dda642a021ef9a89ea8b1a8c25172d620/functions/api/intake.ts) | 2026-11-21 |
| Publiczny adres e-mail na stronie to quietforge@flexgrafik.nl (domena nie istnieje — patrz wyżej) | https://quietforge.nl/legal/ | 2026-11-21 |
| Kontakt WhatsApp i LinkedIn (/in/flexgrafik-quietforge) są na stronie głównej; linki WhatsApp mają UTM (`utm_source=quietforge`) | https://quietforge.nl/ | 2026-11-21 |
| W HTML strony nie ma skryptu analityki (ani Umami, ani Google Analytics); kod GA istnieje, ale włącza się tylko z ID w buildzie | https://quietforge.nl/, [GoogleAnalytics.tsx](https://github.com/wozniaknorbert95-del/dsaas-quietforge/blob/ae365a0dda642a021ef9a89ea8b1a8c25172d620/src/components/analytics/GoogleAnalytics.tsx) | 2026-11-21 |
| Tytuł /proof/: „Proof: hours and money saved, verified by clients”; treść: jedyny przykład to FlexGrafik oznaczony „NOT A CLIENT CASE” i „Offline right now” | https://quietforge.nl/proof/ | 2026-11-21 |
| /privacy/, /cookies/, /contact/, /nl/ zwracają 404; stopka mówi „Service in EN and NL” | https://quietforge.nl/nl/ itd. | 2026-11-21 |
| /growth-os/ zwraca 200 (strona testowa platformy) | https://quietforge.nl/growth-os/ | 2026-11-21 |
| /legal/ wymienia „hosting (Vercel)” jako podprocesora | https://quietforge.nl/legal/ | 2026-11-21 |

## Klienci
Brak potwierdzonych płacących klientów w źródłach sprawdzonych 2026-11-21 (na /proof/ jedyny przykład to FlexGrafik z dopiskiem „Not a QuietForge client case”). Liczbę płacących klientów prowadzi Norbert — CEO jej nie zgaduje.
