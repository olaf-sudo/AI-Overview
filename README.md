# AI Overview — landingspagina

Next.js (App Router) + TypeScript + Tailwind CSS v4. Statisch te bouwen, klaar voor Vercel.
Gebouwd op de handoff `design_handoff_ai_overview_landing/`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Opbouw

Een statische homepage: geen API-routes, geen state. Het domeinveld in de hero en in
de slotkaart doet bewust niets.

| Map | Inhoud |
|---|---|
| `app/globals.css` | Design tokens (`@theme`), basisstijlen, herbruikbare klassen en alle beweging |
| `app/layout.tsx` | Fonts, metadata, Lenis |
| `app/page.tsx` | De hero, met daaronder de uitleg als één vel |
| `components/Hero.tsx` | De hero (Figtree), naar het ontwerp `AI Overview Landing.dc.html` |
| `components/HeroScroll.tsx` | De twee kleine client-stukjes van de hero: de scroll-out en een formulier dat niets doet |
| `components/` | Verder één component per uitlegsectie plus de gedeelde bouwstenen |
| `lib/content.ts` | **Alle copy en data op één plek** (Engels) |

### Beweging

Bewust rustig. Inhoud komt op met **alleen een opacity fade**, zonder verschuiving of
schaal. Alle beweging staat in één blok onderin `app/globals.css`.

- **Hero scroll-out.** Scroll je voorbij de hero, dan schuift de uitleg als een vel met afgeronde bovenhoeken over de hero heen, terwijl de hero-inhoud op halve snelheid naar boven wegschaalt (tot 92%) en vervaagt. `HeroScroll` zet daarvoor alleen drie CSS-variabelen. Is de hero hoger dan het scherm (kleine telefoons), dan start het effect pas als de onderkant in beeld is, zodat het invoerveld bereikbaar blijft.
- **In de hero** draait het sterretje bij het laden binnen en fonkelt het daarna elke vier seconden, met een halo, een mini-ster en een lichtstreep over "AI Overview" — allemaal uit het ontwerp. De lichtstreep gebruikt `mix-blend-mode: screen`; daarom heeft `.hero-out` een eigen witte achtergrond (zie de toelichting in `globals.css`).
- **`<Reveal>`** verzorgt de fades in de uitleg, puur in CSS: `animation-timeline: view()` koppelt de fade aan de scrollpositie. Geen JavaScript. Browsers die dat nog niet kunnen, tonen de inhoud meteen.
- **Prijzen en FAQ** werken zonder JavaScript. De tempo-schakelaar is een groep radioknoppen; CSS (`:has()`, `.pricing` in `globals.css`) licht het bijbehorende plan uit. De FAQ is native `<details>` met één gedeelde `name`, zodat de browser zelf één vraag tegelijk open houdt.
- **Proceskaarten** in "How it works" stapelen sticky op elkaar. Schuift de volgende kaart eroverheen, dan krimpt de onderste naar 92% en kantelt hij 1,5°, om en om naar links en rechts; de kaart bovenop blijft volle maat. Dat doet `<StackCards>` met twee CSS-variabelen per kaart (`.stack-card`).
- **Lenis** (`components/SmoothScroll.tsx`) voor de smooth scroll. Licht afgesteld met `lerp: 0.28` (standaard is 0.1); lager zetten geeft meer naijlen, hoger voelt bijna native.
- **`<PixelField>`** is het stippenveld in de slotkaart; de stippen ademen van de buitenrand naar binnen. De lime knop ernaast heeft een glans (`.sheen`) en een zachte gloed (`.glow-pulse`). Dezelfde golf loopt door de stippenpijl in de Google-sectie.
- Alles staat stil bij `prefers-reduced-motion: reduce`; Lenis en de scroll-out starten dan niet.

### Achtergrond

De uitleg staat op `bg-paper`, met witte banden voor de cijferbalk, het rapport en de
vergelijking. De Google-sectie is warm beige (`bg-beige`, `#F2F0E9`, de tint van het
rapportvenster) in plaats van het oorspronkelijke verzadigde blauw; daarom is de tekst
daar donker en zijn de cijfers ultramarijn in plaats van lime.

### Typografie

Overal Figtree, net als de hero: koppen in 700, tekst in 400–600, cijfers in 600 met
even brede cijfers (`tabular-nums`); ook de kleine labels in kapitalen zijn Figtree.
Het pixelfont, Archivo, Fraunces en Geist Mono uit eerdere versies zijn weg: er
wordt nog maar één lettertype geladen.

### Header en footer

Bovenaan staat geen vaste navigatie. Zodra het logo in de hero onder de bovenrand
schuift, glijdt er een header in met het merkvinkje uit de handoff (7×7 ronde stippen)
en "AI Overview"; de stippen ploppen daarbij van links naar rechts in. Rechts staat
één knop terug naar het invoerveld (`components/SiteHeader.tsx`). Het favicon
(`app/icon.svg`) is hetzelfde vinkje. De footer is alleen een klein tekstje onder de
slotkaart.

### Box-sizing en de referentie

De designreferentie is een prototype zonder CSS-reset en gebruikt dus `content-box`.
Elementen daarin met zowel een vaste maat als padding of een rand renderen daardoor
groter dan de opgegeven maat. Om op 1280 px gelijk te staan aan de referentie is dat
hier overgenomen:

- container: 1200 px inhoud plus 24 px padding (`max-width: 1248px`)
- FAQ-sectie: 820 px plus padding (`868px`)
- invoerpil hero 630 px, slotkaart 588 px
- de drie proceskaart-visuals: 240 px plus padding (`box-content`)
- de AI-logocirkels, de expertfoto en de batterij (`box-content`)

Wil je in plaats daarvan de tokens uit de README letterlijk aanhouden (container 1200 px
totaal, dus 1152 px inhoud), pas dan `.container-page` in `app/globals.css` aan en haal de
`box-content`-klassen weg.

## Meting

| | Desktop | Mobiel |
|---|---|---|
| Performance | 100 | 98 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |

Wat v2 sneller maakt dan v1 (mobiel, gesimuleerd 4G):

| | v1 | v2 |
|---|---|---|
| Performance | 97 | 98 |
| LCP | 2,6 s | 2,3 s |
| Interactief | 2,7 s | 2,5 s |
| Lettertypes | 43 KB | 20 KB |
| Afbeeldingen bij laden | 56 KB | 3 KB |
| Favicon | 26 KB | 0,8 KB |

Secties buiten beeld hebben `content-visibility: auto` (`.cv-auto`): de browser
tekent ze pas als je in de buurt komt, laadt hun afbeeldingen dan pas en pauzeert
zolang de stippenanimaties. De rest van de JavaScript is vrijwel alleen nog Next en
React zelf. Geprobeerd en weer teruggedraaid: de CSS in de HTML inlinen (`inlineCss`)
maakte het in deze meting iets trager, omdat Next de CSS dan drie keer meestuurt.

In de hero wijkt één kleur af van het ontwerp: de "+1" in de bronchip is `#6b6d6b` in
plaats van `#757775`, omdat die op `#f2f3f4` maar 4,06:1 contrast haalde (minimaal 4,5:1).

## Versies

De map is een git-repository. `v1` (tag, en de branch `main`) is de laatste versie
van vóór de Mobbin-ronde; de nieuwe versie staat op de branch `v2`.

Terug naar v1:

```bash
git switch main
```

Weer naar v2:

```bash
git switch v2
```

Een draaiende `npm run dev` pikt de wissel vanzelf op.

## Taal

De site is Engels (`lang="en"`). Alle zichtbare tekst staat in `lib/content.ts`, op een
handvol schermlezer-teksten na die daar ook vandaan komen. Een tweede taal toevoegen is
dus vooral dat bestand kopiëren.

Bewust niet vertaald: eigennamen in de voorbeelddata (de plaatsnamen Zwolle, Kampen
en Breda, en de kennisbank-URL in proceskaart 2) en de ankers `#hoe` en `#prijzen`.
Zeg het als je die ook om wilt zetten.

## Nog aan te leveren

- [ ] **KvK- en btw-nummer** (`FOOTER.kvk`, `FOOTER.vat`)
- [ ] **Linkdoelen**: Mail ons, Meer over de expert, Plan een kennismaking, "Bureau? Vanaf €79 per klant", Contact, Privacy, Voorwaarden — staan nu op `#`
- [ ] **Bron bij 8%** controleren (`GOOGLE.stats[1].src`)
- [ ] **`<title>` en meta description** definitief laten vaststellen (`app/layout.tsx`)
- [ ] **Wat het domeinveld moet doen.** Nu doet het bewust niets (`QuietForm` in `components/HeroScroll.tsx`); daar komt later de koppeling
- [ ] **Analytics** aankoppelen (`lib/analytics.ts`); de klikken op plannen, tempo en expert worden al afgevuurd
