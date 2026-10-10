import { absoluteUrl } from '@/config/site';
import { zonedDateTime, addDays } from '@/features/events/date';
import type { PartyView } from '@/features/events/types';
import type { Operator } from '@/features/legal/operator';
import { openingHoursSpecification } from '@/features/venue/hours';
import type { Venue } from '@/features/venue/types';

function postalAddress(venue: Venue) {
  return {
    '@type': 'PostalAddress',
    streetAddress: venue.address.street,
    postalCode: venue.address.postalCode,
    addressLocality: venue.address.city,
    addressCountry: venue.address.countryCode,
  };
}

export function venueJsonLd(venue: Venue, operator: Operator) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: venue.name,
    url: absoluteUrl('/'),
    image: absoluteUrl(venue.heroImage.src),
    logo: absoluteUrl('/brand/dukla-logo.webp'),
    address: postalAddress(venue),
    sameAs: [venue.links.instagram, venue.links.facebook],
    openingHoursSpecification: openingHoursSpecification(venue.hours.night),
    parentOrganization: {
      '@type': 'Organization',
      legalName: operator.name,
      taxID: operator.dic,
      vatID: operator.icDph,
      address: {
        '@type': 'PostalAddress',
        streetAddress: operator.address.street,
        postalCode: operator.address.postalCode,
        addressLocality: operator.address.city,
        addressCountry: operator.address.countryCode,
      },
      ...(operator.email ? { email: operator.email } : {}),
    },
  };
}

/** Night ends after midnight: end time earlier than start time rolls to the next day. */
function endDateTime(event: PartyView, closes: string): string {
  const endDate = closes < event.startTime ? addDays(event.date, 1) : event.date;
  return zonedDateTime(endDate, closes);
}

export function eventsJsonLd(events: readonly PartyView[], venue: Venue) {
  const closes = venue.hours.night[0]?.closes ?? '03:00';
  return events
    .filter((event) => !event.tba)
    .map((event) => ({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `${event.title} · ${venue.shortName}`,
      startDate: zonedDateTime(event.date, event.startTime),
      endDate: endDateTime(event, closes),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: { '@type': 'Place', name: venue.name, address: postalAddress(venue) },
      organizer: { '@type': 'Organization', name: venue.name, url: absoluteUrl('/') },
      ...(event.description ? { description: event.description } : {}),
      ...(event.poster ? { image: absoluteUrl(event.poster.src) } : {}),
      ...(event.lineup?.length
        ? { performer: event.lineup.map((name) => ({ '@type': 'Person', name })) }
        : {}),
      ...(event.entry?.[0]
        ? {
            offers: {
              '@type': 'Offer',
              price: event.entry[0].price,
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              url: event.instagramUrl ?? venue.links.instagram,
            },
          }
        : {}),
    }));
}
