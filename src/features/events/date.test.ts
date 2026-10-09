import { describe, expect, it } from 'vitest';
import { addDays, businessDay, formatShortDate, weekdayLong, zoneOffset, zonedDateTime } from './date';

describe('businessDay', () => {
  it('keeps the night on the day it started until 05:00 local time', () => {
    // 01:30 on Saturday 10 Oct in Bratislava (UTC+2) is still Friday night.
    expect(businessDay(new Date('2026-10-09T23:30:00Z'))).toBe('2026-10-09');
  });

  it('switches to the next day after the cutoff', () => {
    expect(businessDay(new Date('2026-10-10T03:30:00Z'))).toBe('2026-10-10');
  });
});

describe('calendar helpers', () => {
  it('adds days across month boundaries', () => {
    expect(addDays('2026-09-30', 1)).toBe('2026-10-01');
    expect(addDays('2026-10-01', -1)).toBe('2026-09-30');
  });

  it('formats Slovak weekday labels', () => {
    expect(formatShortDate('2026-10-09')).toBe('Pi 09.10.');
    expect(weekdayLong('2026-10-03')).toBe('Sobota');
  });
});

describe('zoned date-times', () => {
  it('uses summer and winter offsets', () => {
    expect(zoneOffset('2026-10-09')).toBe('+02:00');
    expect(zoneOffset('2026-11-06')).toBe('+01:00');
  });

  it('builds ISO strings for structured data', () => {
    expect(zonedDateTime('2026-10-09', '19:00')).toBe('2026-10-09T19:00:00+02:00');
  });
});
