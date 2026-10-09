import { formatShortDate } from './date';
import type { EntryTier, PartyView, TimelineStatus } from './types';

const priceFormatters = new Map<number, Intl.NumberFormat>();

/** 1.5 → "1,50 €", 3 → "3 €" (Slovak format, non-breaking space before the sign). */
export function formatPrice(amount: number): string {
  const fractionDigits = Number.isInteger(amount) ? 0 : 2;
  let formatter = priceFormatters.get(fractionDigits);
  if (!formatter) {
    formatter = new Intl.NumberFormat('sk-SK', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
    priceFormatters.set(fractionDigits, formatter);
  }
  return formatter.format(amount);
}

/** [{3, until 22:00}, {5}] → "3 € do 22:00, potom 5 €" */
export function formatEntry(entry: readonly EntryTier[] | undefined): string | null {
  if (!entry || entry.length === 0) return null;
  return entry
    .map((tier, index) => {
      const price = formatPrice(tier.price);
      const prefix = index === 0 ? '' : 'potom ';
      return tier.until ? `${prefix}${price} do ${tier.until}` : `${prefix}${price}`;
    })
    .join(', ');
}

export function formatLineup(lineup: readonly string[] | undefined): string | null {
  return lineup && lineup.length > 0 ? lineup.join(', ') : null;
}

/** "DJ Yany · 21:00 · vstup 3 € do 22:00, potom 5 €" */
export function formatPartyMeta(event: PartyView): string {
  const entry = formatEntry(event.entry);
  return [formatLineup(event.lineup), event.startTime, entry && `vstup ${entry}`].filter(Boolean).join(' · ');
}

export function statusLabel(status: TimelineStatus, date: string): string {
  switch (status) {
    case 'today':
      return 'Dnes večer';
    case 'tomorrow':
      return 'Zajtra';
    case 'upcoming':
      return formatShortDate(date);
    case 'past':
      return 'Archív';
  }
}
