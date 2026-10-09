import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, Oswald } from 'next/font/google';
import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';
import { venue } from '@/content/venue';
import { venueJsonLd } from '@/features/seo/jsonLd';
import { JsonLd } from '@/ui/JsonLd';
import { SmoothScroll } from '@/ui/motion/SmoothScroll';
import '@/styles/globals.css';

// Stand-ins the design systems name for their proprietary faces; latin-ext covers Slovak diacritics.
const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });
const interTight = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600'],
  variable: '--font-inter-tight',
  display: 'swap',
});
const oswald = Oswald({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600'],
  variable: '--font-oswald',
  display: 'swap',
});

const description =
  'Day & night bar na Námestí sv. Mikuláša v Starej Ľubovni. Cez deň káva a drinky, v piatok a sobotu DJ a parket od 19:00 do 03:00.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${venue.name} · Stará Ľubovňa`, template: `%s · ${venue.shortName}` },
  description,
  applicationName: venue.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: venue.name,
    title: `${venue.name} · Stará Ľubovňa`,
    description,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sk" className={`${inter.variable} ${interTight.variable} ${oswald.variable}`}>
      <body>
        {children}
        <SmoothScroll />
        <JsonLd data={venueJsonLd(venue)} />
      </body>
    </html>
  );
}
