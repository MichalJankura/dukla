import { describe, expect, it } from 'vitest';
import { getEventsSnapshot, snapshotForBusinessDay } from './events.repo';
import { countByFilter, filterEvents } from './filter';
import { formatEntry, formatPartyMeta, formatPrice } from './format';
import { timelineStatus } from './status';
import type { EventRecord } from './types';

const nbsp = (value: string) => value.replaceAll(String.fromCharCode(0xa0), ' ');

const records: EventRecord[] = [
  { id: 'a', kind: 'party', title: 'A', date: '2026-10-09', startTime: '19:00', lineup: ['DJ Lukas'] },
  { id: 'b', kind: 'party', title: 'B', date: '2026-10-10', startTime: '19:00', tba: true },
  { id: 'c', kind: 'party', title: 'C', date: '2026-10-17', startTime: '20:00' },
  {
    id: 'd',
    kind: 'party',
    title: 'D',
    date: '2026-10-03',
    startTime: '21:00',
    lineup: ['DJ Yany'],
    entry: [{ price: 3, until: '22:00' }, { price: 5 }],
  },
  { id: 'e', kind: 'party', title: 'E', date: '2026-09-26', startTime: '19:00' },
  { id: 'p', kind: 'promo', title: 'Promo', highlights: [{ label: 'Budvar 10°', price: 1.5 }] },
];

// Friday 9 Oct 2026, 20:00 in Bratislava.
const snapshot = getEventsSnapshot(new Date('2026-10-09T18:00:00Z'), records);

describe('timelineStatus', () => {
  it('classifies dates relative to the business day', () => {
    expect(timelineStatus('2026-10-09', '2026-10-09')).toBe('today');
    expect(timelineStatus('2026-10-10', '2026-10-09')).toBe('tomorrow');
    expect(timelineStatus('2026-10-17', '2026-10-09')).toBe('upcoming');
    expect(timelineStatus('2026-10-03', '2026-10-09')).toBe('past');
  });
});

describe('getEventsSnapshot', () => {
  it('splits and orders the program', () => {
    expect(snapshot.tonight?.id).toBe('a');
    expect(snapshot.upcoming.map((e) => e.id)).toEqual(['a', 'b', 'c']);
    expect(snapshot.past.map((e) => e.id)).toEqual(['d', 'e']);
    expect(snapshot.promos.map((e) => e.id)).toEqual(['p']);
  });

  it('features the next two nights followed by promos', () => {
    expect(snapshot.featured.map((e) => e.id)).toEqual(['a', 'b', 'p']);
  });

  it('drops nights that passed without being announced', () => {
    const later = snapshotForBusinessDay('2026-10-11', records);
    expect(later.tonight).toBeNull();
    expect(later.upcoming.map((e) => e.id)).toEqual(['c']);
    expect(later.past.map((e) => e.id)).toEqual(['a', 'd', 'e']);
  });
});

describe('filterEvents', () => {
  const parties = [...snapshot.upcoming, ...snapshot.past];

  it('filters by upcoming and archive', () => {
    expect(filterEvents(parties, 'next').map((e) => e.id)).toEqual(['a', 'b', 'c']);
    expect(filterEvents(parties, 'past').map((e) => e.id)).toEqual(['d', 'e']);
    expect(filterEvents(parties, 'all').map((e) => e.id)).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it('counts each filter', () => {
    expect(countByFilter(parties)).toEqual({ all: 5, next: 3, past: 2 });
  });
});

describe('formatting', () => {
  it('formats prices the Slovak way', () => {
    expect(nbsp(formatPrice(1.5))).toBe('1,50 €');
    expect(nbsp(formatPrice(3))).toBe('3 €');
  });

  it('describes tiered entry and party meta', () => {
    const night = snapshot.past[0];
    expect(night).toBeDefined();
    expect(nbsp(formatEntry(night?.entry) ?? '')).toBe('3 € do 22:00, potom 5 €');
    expect(nbsp(formatPartyMeta(night!))).toBe('DJ Yany · 21:00 · vstup 3 € do 22:00, potom 5 €');
    expect(formatEntry(undefined)).toBeNull();
  });
});
