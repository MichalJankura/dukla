export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'sk_SK',
  /** Raw value; validated against the variant registry in src/variants. */
  defaultVariant: process.env.NEXT_PUBLIC_VARIANT,
  showVariantSwitch: process.env.NEXT_PUBLIC_SHOW_VARIANT_SWITCH === 'true',
} as const;

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.url).toString();
}
