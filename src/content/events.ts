import type { EventRecord } from '@/features/events/types';

/**
 * Program podniku.
 * Zdroj: plagáty na Instagrame @dukla.sl (stav k 9. 10. 2026).
 * Dátumy sú lokálne (Europe/Bratislava), časy 24-hodinové.
 */
export const eventRecords = [
  {
    id: '2026-10-09-oktoberfest',
    kind: 'party',
    title: 'Oktoberfest',
    date: '2026-10-09',
    startTime: '19:00',
    lineup: ['DJ Lukas'],
    description: 'DJ Lukas za pultom, pivo a bavorská nálada až do tretej ráno.',
    // TODO: cena vstupu je na plagáte orezaná — doplniť `entry`.
    poster: {
      src: '/ig/dukla-ig-oktoberfest.webp',
      alt: 'Plagát Oktoberfest, piatok 9. 10., DJ Lukas',
      width: 960,
      height: 1200,
    },
    instagramUrl: 'https://www.instagram.com/p/DeKYp0nmylD/',
  },
  {
    id: '2026-10-10-sobota',
    kind: 'party',
    title: 'Sobota v Dukle',
    date: '2026-10-10',
    startTime: '19:00',
    tba: true,
    description: 'Line-up a tému večera ohlásime na Instagrame.',
  },
  {
    id: '2026-10-03-noc-plna-piva',
    kind: 'party',
    title: 'Noc plná piva',
    date: '2026-10-03',
    startTime: '21:00',
    lineup: ['DJ Yany'],
    entry: [{ price: 3, until: '22:00' }, { price: 5 }],
    poster: {
      src: '/ig/dukla-ig-noc-plna-piva.webp',
      alt: 'Plagát Noc plná piva, sobota 3. 10., DJ Yany',
      width: 900,
      height: 1600,
    },
    instagramUrl: 'https://www.instagram.com/reel/Dd9bB0wx0Yh/',
  },
  {
    id: '2026-09-26-pokracujeme',
    kind: 'party',
    title: 'Pokračujeme! Párty',
    date: '2026-09-26',
    doorsTime: '16:00',
    startTime: '19:00',
    lineup: ['DJ Yany'],
    poster: {
      src: '/ig/dukla-ig-pokracujeme.webp',
      alt: 'Plagát Pokračujeme! Párty s DJ Yany, 26. 9.',
      width: 1200,
      height: 1600,
    },
    instagramUrl: 'https://www.instagram.com/p/Ddvw_PrxVF7/',
  },
  {
    id: 'promo-budvar',
    kind: 'promo',
    title: 'Budvar za pár drobných',
    description: 'Pivná akcia z nášho Instagramu.',
    highlights: [
      { label: 'Budvar 10°', price: 1.5 },
      { label: 'Budvar 12°', price: 2.5 },
    ],
    poster: {
      src: '/ig/dukla-ig-budvar.webp',
      alt: 'Plagát akcie Budvar: 10° za 1,50 €, 12° za 2,50 €',
      width: 640,
      height: 763,
    },
    instagramUrl: 'https://www.instagram.com/reel/DeCxG19REtX/',
  },
] satisfies EventRecord[];
