import type { OpeningSlot, Venue, Weekday } from './types';

const SHORT: Record<Weekday, string> = { 0: 'Ne', 1: 'Po', 2: 'Ut', 3: 'St', 4: 'Št', 5: 'Pi', 6: 'So' };
const LONG: Record<Weekday, string> = {
  0: 'Nedeľa',
  1: 'Pondelok',
  2: 'Utorok',
  3: 'Streda',
  4: 'Štvrtok',
  5: 'Piatok',
  6: 'Sobota',
};
const SCHEMA_DAYS: Record<Weekday, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

export const weekdayName = (day: Weekday): string => LONG[day];

export function formatTimeRange(opens: string, closes: string): string {
  return `${opens} – ${closes}`;
}

/** [Fri 19–03, Sat 19–03] → "Pi – So · 19:00 – 03:00" (assumes one shared time range). */
export function formatNightSummary(slots: readonly OpeningSlot[]): string {
  const first = slots[0];
  const last = slots[slots.length - 1];
  if (!first || !last) return '';
  const days = first.day === last.day ? SHORT[first.day] : `${SHORT[first.day]} – ${SHORT[last.day]}`;
  return `${days} · ${formatTimeRange(first.opens, first.closes)}`;
}

export function formatDayHours(day: Venue['hours']['day']): string {
  return day.opens && day.closes ? formatTimeRange(day.opens, day.closes) : '[HODINY]';
}

/** "Piatok · Sobota · 19:00 – 03:00" */
export function formatNightLong(slots: readonly OpeningSlot[]): string {
  const first = slots[0];
  if (!first) return '';
  return [...slots.map((slot) => LONG[slot.day]), formatTimeRange(first.opens, first.closes)].join(' · ');
}

export interface OpeningRow {
  label: string;
  hint?: string;
  value: string;
  closed?: boolean;
}

/** Rows for an opening-hours table: party nights, the day bar, closed days. */
export function openingRows(hours: Venue['hours']): OpeningRow[] {
  return [
    ...hours.night.map((slot) => ({
      label: LONG[slot.day],
      hint: 'noc',
      value: formatTimeRange(slot.opens, slot.closes),
    })),
    { label: hours.day.label, hint: 'deň', value: formatDayHours(hours.day) },
    { label: hours.closedLabel, value: 'Zatvorené', closed: true },
  ];
}

/** schema.org OpeningHoursSpecification for the confirmed slots. */
export function openingHoursSpecification(slots: readonly OpeningSlot[]) {
  return slots.map((slot) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${SCHEMA_DAYS[slot.day]}`,
    opens: slot.opens,
    closes: slot.closes,
  }));
}
