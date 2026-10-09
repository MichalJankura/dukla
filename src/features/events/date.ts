export const VENUE_TIME_ZONE = 'Europe/Bratislava';

/** A night out belongs to the day it started on until this hour the next morning. */
const BUSINESS_DAY_CUTOFF_HOURS = 5;

const WEEKDAYS_SHORT = ['Ne', 'Po', 'Ut', 'St', 'Št', 'Pi', 'So'] as const;
const WEEKDAYS_LONG = ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota'] as const;

/** Calendar date (YYYY-MM-DD) of an instant in the given time zone. */
export function isoDateInZone(instant: Date, timeZone: string = VENUE_TIME_ZONE): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(instant);
}

/** The venue's business day: 01:30 on Saturday still belongs to Friday night. */
export function businessDay(now: Date = new Date()): string {
  return isoDateInZone(new Date(now.getTime() - BUSINESS_DAY_CUTOFF_HOURS * 3_600_000));
}

function noonUtc(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00Z`);
}

export function addDays(isoDate: string, days: number): string {
  const date = noonUtc(isoDate);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function weekdayIndex(isoDate: string): number {
  return noonUtc(isoDate).getUTCDay();
}

export function weekdayShort(isoDate: string): string {
  return WEEKDAYS_SHORT[weekdayIndex(isoDate)] ?? '';
}

export function weekdayLong(isoDate: string): string {
  return WEEKDAYS_LONG[weekdayIndex(isoDate)] ?? '';
}

/** 2026-10-09 → "09.10." */
export function formatDayMonth(isoDate: string): string {
  const [, month, day] = isoDate.split('-');
  return `${day}.${month}.`;
}

/** 2026-10-09 → "Pi 09.10." */
export function formatShortDate(isoDate: string): string {
  return `${weekdayShort(isoDate)} ${formatDayMonth(isoDate)}`;
}

/** UTC offset of the venue's zone on a date, e.g. "+02:00" in summer time. */
export function zoneOffset(isoDate: string, time = '12:00', timeZone: string = VENUE_TIME_ZONE): string {
  const instant = new Date(`${isoDate}T${time}:00Z`);
  const name = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
    .formatToParts(instant)
    .find((part) => part.type === 'timeZoneName')?.value;
  const offset = name?.replace('GMT', '') ?? '';
  return offset === '' ? '+00:00' : offset;
}

/** Local date and time → ISO 8601 with the venue's offset, for structured data. */
export function zonedDateTime(isoDate: string, time: string): string {
  return `${isoDate}T${time}:00${zoneOffset(isoDate, time)}`;
}
