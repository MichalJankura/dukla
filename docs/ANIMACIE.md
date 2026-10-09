# Animácie

Každá animácia má jedno miesto v kóde a rešpektuje `prefers-reduced-motion`.
Vyberaj nástroj podľa toho, čo animácia robí:

| Typ                                                                            | Nástroj                                    | Kde                                                      |
| ------------------------------------------------------------------------------ | ------------------------------------------ | -------------------------------------------------------- |
| Jednorazové pri načítaní, slučky (žiara, pulz, Ken Burns, titulok po riadkoch) | **CSS keyframes** cez Tailwind `animate-*` | `src/styles/globals.css` → `@theme`                      |
| Vstup do obrazovky, stav komponentu (reveal, karusel, filter, swipe)           | **Motion**                                 | `src/ui/motion/Reveal.tsx`, `Drift.tsx`, `presets.ts`    |
| Naviazané na pozíciu scrollu (parallax, ticker reagujúci na rýchlosť)          | **GSAP + ScrollTrigger**                   | `src/ui/motion/useParallax.ts`, `Marquee.tsx`, `gsap.ts` |
| Plynulý scroll a kotvy                                                         | **Lenis** (poháňaný tickerom GSAP)         | `src/ui/motion/SmoothScroll.tsx`                         |
| Hover a focus                                                                  | **CSS transitions** (triedy Tailwind)      | priamo v komponentoch                                    |

## Katalóg

| Animácia                | Variant | Spúšťač                                    | Časovanie                                                                                             | Implementácia                                          |
| ----------------------- | ------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Reveal sekcií           | A + B   | vstup do viewportu (raz)                   | 600 ms, `cubic-bezier(.2,.7,.2,1)`, stagger 80 ms                                                     | `<Reveal delay={i * STAGGER_SECONDS}>`                 |
| Nástup hero             | A       | načítanie                                  | 900 ms, oneskorenia 0–440 ms                                                                          | `animate-rise [animation-delay:…]`                     |
| Žiara D-loga            | A       | slučka                                     | 3,2 s ease-in-out                                                                                     | `animate-glow` (drop-shadow v cyan)                    |
| Parallax hero fotky     | A       | scroll (scrub)                             | ±6 % posun, scale 1.12                                                                                | `<ParallaxImage>` → `useParallax`                      |
| Karusel programu        | A       | tlačidlá, bodky, swipe                     | 450 ms slide + fade, prah swipu 80 px                                                                 | `ProgramSpotlight.tsx` (`AnimatePresence`, `drag="x"`) |
| Titulok po riadkoch     | B       | načítanie                                  | 1 s, +120 ms na riadok, maska zdola                                                                   | `Line` v `blackout/Hero.tsx` (`animate-line-up`)       |
| Ken Burns na hero       | B       | slučka                                     | 20 s, alternate                                                                                       | `animate-ken-burns`                                    |
| Ticker                  | B       | slučka, zrýchli pri scrolle, hover = pauza | 36 s / slučka, × až 4 podľa rýchlosti                                                                 | `<Marquee>`                                            |
| „Deň aj noc.“ do strany | B       | scroll                                     | ±6 %                                                                                                  | `<Drift>` (Motion `useScroll`)                         |
| Filter programu         | B       | klik                                       | layout 300 ms, exit scale 0.96                                                                        | `ProgramGrid.tsx` (`layout`, `popLayout`)              |
| Hover tlačidiel         | A + B   | hover, focus, stlačenie                    | 200 ms; A navyše cyan žiara a `scale(.97)`                                                            | `PillLink` / `Pill`                                    |
| Hover kariet            | A + B   | hover                                      | A: zdvih 4 px + cyan okraj · B: zoom 1.04, cyan linka, archív z č/b do farby; 300–900 ms `ease-dukla` | `liftOnHover`, `group-hover:*`                         |

## Pravidlá

1. **Reduced motion.** Globálne pravidlo v `globals.css` skráti CSS animácie aj prechody. Motion komponenty čítajú `useReducedMotion()`, GSAP beží len v `gsap.matchMedia(NO_REDUCED_MOTION)`, Lenis sa vtedy nespustí.
2. **Animuj len `transform` a `opacity`** (výnimka: `filter` pri žiare a č/b plagátoch). Žiadne animácie `width`, `top` ani `margin`.
3. **Jedno easovanie:** `EASE_OUT` v JS a `--ease-dukla` v CSS sú tá istá krivka.
4. **GSAP vždy cez `useGSAP`** so `scope` a s `matchMedia().revert()` v cleanup, aby po odchode zo stránky neostali ScrollTriggery.
5. **Server Components ostávajú serverové:** animovaný obal (`Reveal`, `Drift`) je klientsky, obsah doňho ide ako `children`.

## Pridanie novej animácie

```tsx
// Reveal pri scrolle
<Reveal delay={STAGGER_SECONDS}>…</Reveal>

// Parallax fotka (rodič musí mať relative + overflow-hidden + rozmer)
<div className="relative aspect-video overflow-hidden">
  <ParallaxImage image={photo} sizes="100vw" amount={8} />
</div>

// Nová CSS slučka: do @theme v globals.css
--animate-flicker: dukla-flicker 2s steps(2) infinite;
@keyframes dukla-flicker { … }
// použitie: className="animate-flicker"
```
