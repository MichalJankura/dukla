import { isMeasurementId } from '@/features/consent/consent';

/** Production GA4 property; local development only tracks when NEXT_PUBLIC_GA_ID is set. */
const PRODUCTION_GA_ID = 'G-5QQ4H9GZST';
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? (process.env.NODE_ENV === 'production' ? PRODUCTION_GA_ID : '');

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://duklaclub.me',
  locale: 'sk_SK',
  /** Raw value; validated against the variant registry in src/variants. */
  defaultVariant: process.env.NEXT_PUBLIC_VARIANT,
  showVariantSwitch: process.env.NEXT_PUBLIC_SHOW_VARIANT_SWITCH === 'true',
  /** GA4 measurement ID, or null when analytics is off. */
  gaMeasurementId: isMeasurementId(gaId) ? gaId : null,
} as const;

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.url).toString();
}
