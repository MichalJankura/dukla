# DUKLA day & night bar — web

Web pre bar a nočný klub DUKLA (Námestie svätého Mikuláša 27, Stará Ľubovňa).
Jeden kód, **dva vizuálne varianty** nad spoločnými dátami a logikou:

| Variant                          | Dizajn systém              | Charakter                                                                                                                      |
| -------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **A · Afterglow** (`/afterglow`) | Apple-inspired             | Pokojný, kinematografický. Striedanie čiernych „nočných“ a svetlých „denných“ kapitol, pulzujúca žiara loga, karusel programu. |
| **B · Blackout** (`/blackout`)   | Nike-inspired (tmavá téma) | Plagátový, hlasný. Kondenzované verzálky, fotky od okraja po okraj, cyan ticker, mriežka plagátov s filtrom.                   |

Úvodná stránka `/` zobrazí variant z `NEXT_PUBLIC_VARIANT`. Obe preview routy majú `noindex` a kanonickú adresu `/`.

## Spustenie

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

| Príkaz                          | Čo robí                                                               |
| ------------------------------- | --------------------------------------------------------------------- |
| `npm run dev` / `npm run build` | vývoj / statický export do `out/` (pred oboma sa vygenerujú tokeny)   |
| `npm run check`                 | tokeny + TypeScript + ESLint + testy                                  |
| `npm test`                      | unit testy domény (Vitest)                                            |
| `npm run tokens`                | znovu vygeneruje `src/styles/tokens.generated.css` z `design/tokens/` |

## Technológie a prečo

- **Next.js 16 (App Router) so statickým exportom** (`output: 'export'`): build vytvorí čisté HTML/CSS/JS v `out/`, ktoré beží na bezplatnom statickom hostingu. Navyše SEO metadáta, JSON-LD (`BarOrPub` a `Event`), sitemap a fonty hostované s webom.
- **Štítky „Dnes / Zajtra / Archív“ sa počítajú v prehliadači** (`useLiveEvents`): HTML sa vygeneruje pre deň buildu, po načítaní ich prepočíta podľa hodín návštevníka, takže sedia aj bez nového buildu.
- **React 19 + TypeScript (strict)**.
- **Tailwind CSS v4**: tokeny oboch dizajn systémov sa generujú do `@theme` s prefixmi `ag-*` (Afterglow) a `bo-*` (Blackout), farby značky sú `dukla-*`.
- **Motion** (Framer Motion) na komponentové animácie, **GSAP + ScrollTrigger** na scroll choreografiu, **Lenis** na plynulý scroll.
- **Three.js zámerne nie**: pridal by ~150 kB JS a zhoršil výkon na mobiloch. Žiaru loga rieši CSS. Kandidát na v2 (3D „D“ v hero).

## Štruktúra

```
design/tokens/          exporty dizajn systémov (zdroj pravdy pre farby, typo, rádiusy)
scripts/build-tokens.mjs  generátor Tailwind @theme
public/brand, public/ig  logo a fotky pripravené pre web (WebP)
assets/                  lokálne podklady (varianty loga, originály z IG) — nie sú v gite
src/
├─ app/                  routy, layout (fonty, metadata), robots, sitemap, ikony
├─ config/site.ts        env konfigurácia
├─ content/              OBSAH: program, podnik, galéria, bar  ← tu sa upravuje web
├─ features/             DOMÉNA: čistý TypeScript s testami
│  ├─ events/            typy, dátumy (Europe/Bratislava), stav eventu, filter, formátovanie
│  ├─ venue/             otváracie hodiny
│  ├─ catalog/           typy galérie a baru
│  └─ seo/               JSON-LD
├─ ui/                   zdieľané primitíva (ikony, mapa, JSON-LD) a motion/*
└─ variants/
   ├─ afterglow/         sekcie variantu A
   ├─ blackout/          sekcie variantu B
   ├─ index.ts           register variantov
   └─ VariantView.tsx    načíta dáta a vyrenderuje zvolený variant
```

**Pravidlo vrstiev:** komponenty vo `variants/` nikdy nefetchujú ani nepočítajú dátumy. Stránka variantu získa `EventsSnapshot` z hooku `useLiveEvents` (logika je v `features/events/`) a posiela ho sekciám, takže výmena vizuálu nemení logiku.

## Ako upraviť obsah

- **Nový event:** pridaj záznam do `src/content/events.ts` (dátum `YYYY-MM-DD`, čas `HH:mm`, plagát do `public/ig/`). Stav „Dnes / Zajtra / Archív“ sa určí sám. Noc patrí k dňu, kedy začala, až do 05:00 rána.
- **Neohlásená noc:** `tba: true` zobrazí „Ohlásime čoskoro“ a vynechá ju zo štruktúrovaných dát.
- **Vstupné:** `entry: [{ price: 3, until: '22:00' }, { price: 5 }]` sa zobrazí ako „vstup 3 € do 22:00, potom 5 €“.
- **Otváracie hodiny, odkazy:** `src/content/venue.ts`.

## Nasadenie (DigitalOcean App Platform, Static Site)

1. **Create App → GitHub →** repo `MichalJankura/dukla`, vetva `main`, _Autodeploy_ zapnutý (každý push = nový build).
2. Typ **Static Site**, buildpack **Node.js**.
   - Build command: `npm run build`
   - **Output directory: `out`** — musí byť vyplnené; inak App Platform nájde `public/` a zverejní len obrázky.
   - Error document: `404.html`
3. **Environment variables** (scope _Build time_ — `NEXT_PUBLIC_*` sa vkladajú do HTML pri builde):

   | Premenná                          | Hodnota                            |
   | --------------------------------- | ---------------------------------- |
   | `NEXT_PUBLIC_SITE_URL`            | `https://duklaclub.me`             |
   | `NEXT_PUBLIC_VARIANT`             | `afterglow` alebo `blackout`       |
   | `NEXT_PUBLIC_SHOW_VARIANT_SWITCH` | `true` počas výberu, potom `false` |

4. Región **Frankfurt (fra)** — najbližšie k Slovensku.

Rovnaké nastavenie je v [`.do/app.yaml`](.do/app.yaml) (dá sa použiť cez `doctl apps create --spec .do/app.yaml`).

Statický výstup si vieš pozrieť aj lokálne: `npm run build` a potom `npm run preview` (alebo `python -m http.server -d out`).

Obmedzenia statického režimu: žiadny server, takže ani optimalizácia obrázkov za behu (obrázky v `public/` sú už v WebP) a žiadne HTTP hlavičky z `next.config.ts`. Zmena obsahu = push do `main` → DigitalOcean spraví nový build.

**Doména `duklaclub.me` (Namecheap):** v App Platform → _Settings → Domains_ pridaj `duklaclub.me` a `www.duklaclub.me`. DigitalOcean ukáže, aké DNS záznamy nastaviť v Namecheap (_Domain List → Manage → Advanced DNS_); HTTPS certifikát vystaví sám.

## Otvorené body (TODO)

- [ ] Denné otváracie hodiny (FB uvádza „okrem pondelka otvorené denne“). Zatiaľ sa zobrazuje `[HODINY]`.
- [ ] Cena vstupu na Oktoberfest (plagát je orezaný).
- [ ] Položky baru: koktaily, káva, ceny, nápojový lístok (PDF).
- [ ] Výber finálneho variantu → `NEXT_PUBLIC_VARIANT`, vypnúť prepínač.
- [ ] v2: napojenie Instagram Graph API pre galériu (vyžaduje Business účet prepojený s FB stránkou), alebo headless CMS pre program.

Animácie a ich pravidlá sú popísané v [docs/ANIMACIE.md](docs/ANIMACIE.md).
