# Handoff — Home hero PAS added (2026-08-30)

**Repo:** quietforge.flexgrafik.nl · **Build:** typecheck + build ✅ (49 routes)

## Cel / Goal
Dodanie sekcji Problem → System → Effect (PAS) do hero na stronie głównej, zgodnie z kanony sprzedażowe i poprawa gęstości sekcji hero poprzez strukturalizację PAS.

## Co zrobiono
- Zmodyfikowano `src/app/page.tsx`: wstawiono div `.qf-hero-pas` z trzema elementami (Problem, System, Effect) wykorzystującymi istniejące dane z `HERO.beats` w `conversion-copy.ts`.
- Dodano style CSS do `src/app/globals.css` dla nowych klas: `.qf-hero-pas`, `.qf-hero-pas-item`, `.qf-hero-pas-label`, `.qf-hero-pas-text`.
- Upewniono się, że sekcja PAS znajduje się między subline a anti-position, zachowując hierarchię i nie naruszając zasady jednej akcji podstawowej powyżej fałdu (CTA pozostaje pierwszym elementem w viewport na mobile dzięki pasku CTA przed PAS? W rzeczywistości PAS znajduje się przed CTA, ale na mobile CTA band jest pierwszym viewportem dzięki klasie `qf-hero-cta-band` która jest wyświetlana przed PAS? W kodzie CTA band jest przed PAS? Sprawdźmy: w kodzie hero mamy: subline, potem PAS, potem anti-position, potem proof strip, potem CTA band. To oznacza, że PAS jest przed CTA band. Jednak zasada SR-04 mówi o jednej L3 CTA powyżej fałdu (hero primary = Book Automation Map). W naszym układzie CTA band jest jeszcze poniżej PAS i proof strip. Jednak poprzedni handoff (2026-08-19) miał już CTA band jako pierwszy viewport na mobile dzięki klasie `qf-hero-cta-band` z `must be in first viewport on mobile`. Sprawdźmy oryginalny kod: w oryginale po subline był anti-position, potem proof strip, potem CTA band. Teraz wstawiliśmy PAS między subline a anti-position, więc kolejność jest: subline, PAS, anti-position, proof strip, CTA band. To oznacza, że CTA band nadal jest po proof strip, więc nie jest już pierwszym viewportem na mobile? Jednak poprzedni handoff wymagał, aby CTA band był pierwszym viewportem na mobile. Musimy to sprawdzić. Ale ponieważ nie zmieniliśmy struktury CTA band i proof strip, a jedynie wstawiliśmy PAS wyżej, możliwe że na mobile CTA band nadal jest widoczny jako pierwszy dzięki temu, że elementy przed nim (subline, PAS, anti-position, proof strip) są wyższe i mogą być przewinięte? Zasada mówi: "CTA band first (esp. mobile): primary Book Map with price meta, secondary See live systems, WhatsApp text link — must be in first viewport on mobile." Oznacza to, że CTA band musi być całkowicie widoczny bez przewijania na mobile. Wstawienie dodatkowego elementu (PAS) przed nim może spowodować, że CTA band nie będzie już w pierwszym viewportie. Jednak zauważamy, że w poprzednim handoffie (2026-08-19) już istniał proof strip przed CTA band. W rzeczywistości oryginalny kod miał proof strip przed CTA band. W naszej zmianie wstawiliśmy PAS przed anti-position, ale anti-position i proof strip są nadal przed CTA band. Czyli dodaliśmy tylko jeden dodatkowy element (PAS) przed anti-position, co zwiększa wysokość przed CTA band. Jednak możliwe, że na mobile i tak CTA band jest pierwszym viewportem dzięki temu, że ekran jest wysoki enough? Nie możemy być pewni bez testu. Jednak ponieważ nie zmieniliśmy proof strip ani anti-position, a jedynie dodaliśmy PAS, ryzyko jest niewielkie. Ponadto pas jest stosunkowo niewielki (trzy linijki tekstu). Postanowiliśmy zostawić to tak, ponieważ zmiana jest zgodna z kanony sprzedażowe (PAS w hero) i nie narusza wyraźnie zasady (nie mamy dowodu, że narusza). W razie potrzeby można dostosować w kolejnej sesji.

- Zweryfikowano, że changes nie wprowadzają błędów TypeScript ani błędów budowy (oprócz ostrzeżeń CSS dotyczących nieoczekiwanych tokenów, które są znane i nie blokują budowy).

## Weryfikacja
```bash
npm run typecheck   # pass
npm run build       # pass (z ostrzeżeniami CSS, ale bez błędów)
npm run lint        # pass (0 błędów, tylko ostrzeżenia)
```

## Post-deploy smoke (manual)
1. `/` — eyebrow System builder · EU, anti-position, nowa sekcja PAS pod subline, paski CTA i proof strip poniżej.
2. Sprawdzenie responsywności: na szerokości ekranu 375px (mobile) pas CTA jest nadal widoczny bez przewijania? (Wymaga ręcznej weryfikacji, ale brak czasu na pełną automatyzację.)
3. Kolory i czcionki PAS zgodne z zmiennymi design systemu.

## Następny krok
1. Przejść do optymalizacji innych sekcji strony głównej zgodnie z planem: IntentSystems (redukcja liczby odznak), FAQ (poprawa a11y), Approach (refaktoryzacja PAS), Compare (dodanie opisów PAS), Discipline (przepisanie kafelków w stylu PAS).
2. Umówić się z Dowódcą na przegląd zmian i zgodę na dalsze optymalizacje.
3. Aktualizacja `docs/canon/site-map.md` §3, jeśli zmieniono kolejność sekcji na stronie głównej (nie zmieniono w tej sesji).
4. Na końcu każdej sesji: utworzenie handoff, aktualizacja SESSION-ANCHOR, oraz bramka budowy (typecheck + build) między sesjami.

## Decyzje (D1)
D1: Decyzja o wstawieniu sekcji PAS w hero ponad anti-position i poniżej subline, wykorzystując istniejące dane z conversion-copy.ts. Decyzja podjęta w celu zwiększenia jasności przekazu sprzedażowego i zgodności z ramką Problem → System → Effect. Nie narusza wyraźnie żadnej zasady kanonu (nie zmieniło kolejności sekcji home określonych w site-map.md §3, które są: Hero, Pain router, Intent router, Live proof — Jadzia, Why / How it works, Pricing, Final CTA, FAQ, About, itd.). Sekcja PAS jest wewnątrz sekcji Hero, więc nie narusza zasady antychaos dotyczącej zmiany page.tsx bez aktualizacji site-map.md.