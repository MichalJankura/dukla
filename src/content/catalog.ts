import type { GalleryItem, MenuItem } from '@/features/catalog/types';

export const galleryItems: GalleryItem[] = [
  {
    src: '/ig/dukla-ig-dj-pult.webp',
    alt: 'DJ kontrolér v Dukle v modrom svetle',
    width: 900,
    height: 1600,
    caption: 'Za pultom',
    focus: '50% 55%',
  },
  {
    src: '/ig/dukla-ig-trabant.webp',
    alt: 'Trabant ako DJ pult nad parketom, laserové svetlá',
    width: 720,
    height: 960,
    caption: 'Trabant nad parketom',
  },
  {
    src: '/ig/dukla-ig-parket.webp',
    alt: 'Tanec na parkete vo fialovom svetle',
    width: 987,
    height: 1600,
    caption: 'Parket',
  },
];

const BUDVAR_POST = 'https://www.instagram.com/reel/DeCxG19REtX/';

export const menuItems: MenuItem[] = [
  {
    id: 'budvar-10',
    category: 'Pivo',
    name: 'Budvar 10°',
    note: 'Svetlé výčapné',
    price: 1.5,
    promo: true,
    image: { src: '/ig/dukla-ig-budvar-10.webp', alt: 'Krígeľ Budvar 10°', width: 640, height: 940 },
    instagramUrl: BUDVAR_POST,
  },
  {
    id: 'budvar-12',
    category: 'Pivo',
    name: 'Budvar 12°',
    note: 'Svetlý ležiak',
    price: 2.5,
    promo: true,
    image: { src: '/ig/dukla-ig-budvar-12.webp', alt: 'Krígeľ Budvar 12°', width: 640, height: 940 },
    instagramUrl: BUDVAR_POST,
  },
  // TODO: doplniť skutočné položky, ceny a fotky z nápojového lístka.
  { id: 'koktail', category: 'Koktaily', name: '[Signature drink]', note: '[Zloženie]', price: null },
  { id: 'kava', category: 'Cez deň', name: '[Káva]', note: 'Utorok až nedeľa', price: null },
];
