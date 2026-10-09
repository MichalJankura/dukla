import type { Venue } from '@/features/venue/types';

const MAPS_QUERY = encodeURIComponent('Námestie sv. Mikuláša 27, 064 01 Stará Ľubovňa');

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
  ageNotice: 'Alkoholické nápoje podávame iba osobám starším ako 18 rokov.',
};
