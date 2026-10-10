import type { Operator } from '@/features/legal/operator';

/** Prevádzkovateľ podniku a webu. Zdroj: údaje od klienta (10. 10. 2026). */
export const operator: Operator = {
  name: 'emel RE s. r. o.',
  address: { street: 'Zámocká 706/1', postalCode: '064 01', city: 'Stará Ľubovňa', countryCode: 'SK' },
  ico: '57172501',
  dic: '2122613295',
  icDph: 'SK2122613295',
  register: { court: 'Okresného súdu Prešov', section: 'Sro', file: '50694/P' },
  email: null, // TODO: kontaktný e-mail prevádzkovateľa (§ 4 zákona č. 22/2004 Z. z.)
};
