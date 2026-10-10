import { describe, expect, it } from 'vitest';
import { venue } from '@/content/venue';
import { eventsJsonLd } from '@/features/seo/jsonLd';
import { getEventsSnapshot } from '@/features/events/events.repo';
import type { EventRecord } from '@/features/events/types';
import { formatDayHours, formatNightSummary, openingHoursSpecification } from './hours';

describe('opening hours', () => {
  it('summarises party nights', () => {
    expect(formatNightSummary(venue.hours.night)).toBe('Pi – So · 19:00 – 03:00');
  });

  it('shows a placeholder until day hours are confirmed', () => {
    expect(formatDayHours({ label: 'Ut – Ne', opens: null, closes: null })).toBe('[HODINY]');
    expect(formatDayHours({ label: 'Ut – Ne', opens: '10:00', closes: '18:00' })).toBe('10:00 – 18:00');
  });

  it('maps slots to schema.org days', () => {
    expect(openingHoursSpecification(venue.hours.night)[0]).toMatchObject({
      dayOfWeek: 'https://schema.org/Friday',
      opens: '19:00',
      closes: '03:00',
    });
  });
});

describe('event structured data', () => {
  // Own fixtures, so editing the real program never breaks this test.
  const records: EventRecord[] = [
    {
      id: 'fri',
      kind: 'party',
      title: 'Piatok',
      date: '2026-10-09',
      startTime: '19:00',
      entry: [{ price: 3 }],
    },
    { id: 'sat', kind: 'party', title: 'Sobota', date: '2026-10-10', startTime: '19:00', tba: true },
  ];

  it('ends after midnight on the next day and skips unannounced nights', () => {
    const snapshot = getEventsSnapshot(new Date('2026-10-09T18:00:00Z'), records);
    const [first, ...rest] = eventsJsonLd(snapshot.upcoming, venue);
    expect(first).toMatchObject({
      startDate: '2026-10-09T19:00:00+02:00',
      endDate: '2026-10-10T03:00:00+02:00',
      offers: { price: 3, priceCurrency: 'EUR' },
    });
    expect(rest).toHaveLength(0);
  });
});
