import type { Venue } from '@/features/venue/types';

// Google Maps lists the place as „Dukla café & bar“.
const MAPS_QUERY = encodeURIComponent('Dukla café & bar, Námestie sv. Mikuláša 27, 064 01 Stará Ľubovňa');

export const venue: Venue = {
  name: 'Dukla day & night bar',
  shortName: 'Dukla',
  tagline: 'Day & night bar',
  address: {
    street: 'Námestie svätého Mikuláša 27',
    postalCode: '064 01',
    city: 'Stará Ľubovňa',
    country: 'Slovensko',
    countryCode: 'SK',
  },
  links: {
    instagram: 'https://www.instagram.com/dukla.sl/',
    instagramHandle: '@dukla.sl',
    facebook: 'https://www.facebook.com/profile.php?id=61583574034296',
    maps: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2825.252563440016!2d20.689614600000002!3d49.3015671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473e1335002f5c11%3A0x8a6e7b27c6f125b0!2sDukla%20caf%C3%A9%20%26%20bar!5e1!3m2!1ssk!2ssk!4v1791628674466!5m2!1ssk!2ssk',
    drinksMenu: null, // TODO: nápojový lístok (PDF)
  },
  hours: {
    night: [
      { day: 5, opens: '19:00', closes: '03:00' },
      { day: 6, opens: '19:00', closes: '03:00' },
    ],
    // FB: „Okrem pondelka otvorené denne“. TODO: potvrdiť denné hodiny.
    day: { label: 'Utorok – nedeľa', opens: null, closes: null },
    closedLabel: 'Pondelok',
  },
  heroImage: {
    src: '/ig/dukla-ig-interier.webp',
    alt: 'Plný parket v Dukle pod disko guľou, vpravo Trabant ako DJ pult',
    width: 1440,
    height: 960,
  },
  heroVideo: {
    // H.264 MP4 only: plays everywhere (incl. iOS Safari) and the host serves it as video/mp4,
    // while it labels .webm as audio/webm.
    sources: [{ src: '/video/dukla-loop.mp4', type: 'video/mp4' }],
    poster: '/video/dukla-loop-poster.webp',
    width: 540,
    height: 848,
  },
};
