import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';
import { operator } from '@/content/operator';
import { venue } from '@/content/venue';
import { CONSENT_STORAGE_KEY } from '@/features/consent/consent';
import { formatOperatorAddress, formatRegisterEntry, operatorTaxIds } from '@/features/legal/operator';
import { CookieSettingsButton } from '@/ui/consent/CookieSettingsButton';

export const metadata: Metadata = {
  title: 'Zásady cookies',
  description: `Aké cookies používa web ${venue.name} a ako zmeniť súhlas.`,
  alternates: { canonical: '/cookies/' },
};

const UPDATED = '10. 10. 2026';

interface CookieRow {
  name: string;
  category: 'Nevyhnutné' | 'Analytické';
  purpose: string;
  lifetime: string;
  provider: string;
}

function cookieRows(measurementId: string | null): CookieRow[] {
  const rows: CookieRow[] = [
    {
      name: `${CONSENT_STORAGE_KEY} (local storage)`,
      category: 'Nevyhnutné',
      purpose: 'Zapamätá si vašu voľbu v cookie lište.',
      lifetime: '12 mesiacov',
      provider: new URL(siteConfig.url).hostname,
    },
  ];
  if (measurementId) {
    rows.push(
      {
        name: '_ga',
        category: 'Analytické',
        purpose: 'Rozlišuje návštevníkov pre štatistiku návštevnosti.',
        lifetime: '2 roky',
        provider: 'Google (Google Analytics 4)',
      },
      {
        name: `_ga_${measurementId.replace(/^G-/, '')}`,
        category: 'Analytické',
        purpose: 'Uchováva stav návštevy pre štatistiku návštevnosti.',
        lifetime: '2 roky',
        provider: 'Google (Google Analytics 4)',
      },
    );
  }
  return rows;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="m-0 font-ag-display text-ag-utility-heading text-ag-pale-gray">{title}</h2>
      {children}
    </section>
  );
}

export default function CookiesPage() {
  const rows = cookieRows(siteConfig.gaMeasurementId);
  const link = 'text-dukla-cyan underline-offset-2 hover:underline';

  return (
    <main className="min-h-dvh bg-ag-black px-6 py-12 font-ag-text text-ag-body text-ag-gray-300 md:py-20">
      <div className="mx-auto flex max-w-[760px] flex-col gap-10">
        <Link href="/" className="flex w-fit items-center gap-3 py-2" aria-label={`${venue.shortName}, úvod`}>
          <Image src="/brand/dukla-mark.webp" alt="" width={36} height={30} />
          <Image src="/brand/dukla-wordtype.webp" alt="" width={102} height={17} />
        </Link>

        <header className="flex flex-col gap-3">
          <h1 className="m-0 font-ag-display text-[2.25rem] leading-[1.08] font-semibold text-ag-pale-gray md:text-ag-section">
            Zásady cookies
          </h1>
          <p className="m-0">
            Táto stránka vysvetľuje, aké cookies a podobné technológie používa web {venue.name} a ako môžete
            svoj súhlas kedykoľvek zmeniť. Posledná aktualizácia: {UPDATED}.
          </p>
        </header>

        <Section title="Prevádzkovateľ">
          <address className="not-italic">
            {operator.name}
            <br />
            {formatOperatorAddress(operator)}
            <br />
            {operatorTaxIds(operator).join(' · ')}
            <br />
            {formatRegisterEntry(operator)}
            {operator.email && (
              <>
                <br />
                <a href={`mailto:${operator.email}`} className={link}>
                  {operator.email}
                </a>
              </>
            )}
          </address>
        </Section>

        <Section title="Čo ukladáme">
          <p className="m-0">
            Nevyhnutné úložisko používame vždy, lebo bez neho by sme si nezapamätali vašu voľbu. Analytické
            cookies sa uložia až po vašom súhlase. Dovtedy sa knižnica Google Analytics vôbec nenačíta.
          </p>
          <div className="overflow-x-auto rounded-ag-lg border border-ag-graphite-d">
            <table className="w-full min-w-[560px] border-collapse text-left text-ag-control">
              <thead className="bg-ag-graphite-a text-ag-pale-gray">
                <tr>
                  <th className="px-4 py-3 font-semibold">Názov</th>
                  <th className="px-4 py-3 font-semibold">Kategória</th>
                  <th className="px-4 py-3 font-semibold">Účel</th>
                  <th className="px-4 py-3 font-semibold">Platnosť</th>
                  <th className="px-4 py-3 font-semibold">Poskytovateľ</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name} className="border-t border-ag-graphite-d align-top">
                    <td className="px-4 py-3 font-mono text-xs text-ag-pale-gray">{row.name}</td>
                    <td className="px-4 py-3">{row.category}</td>
                    <td className="px-4 py-3">{row.purpose}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.lifetime}</td>
                    <td className="px-4 py-3">{row.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {siteConfig.gaMeasurementId && (
          <Section title="Google Analytics">
            <p className="m-0">
              Štatistiku návštevnosti spracúva Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
              Írsko. Pomáha nám zistiť, ktoré časti webu ľudia čítajú. Viac v{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                zásadách ochrany súkromia Google
              </a>
              .
            </p>
          </Section>
        )}

        <Section title="Obsah tretích strán">
          <p className="m-0">
            V sekcii Kontakt je vložená mapa Google. Pri jej zobrazení Google spracúva vašu IP adresu a môže
            ukladať vlastné cookies podľa svojich zásad. Odkazy na Instagram a Facebook vedú na stránky
            spoločnosti Meta, ktoré majú vlastné pravidlá.
          </p>
        </Section>

        <Section title="Ako zmeniť súhlas">
          <p className="m-0">
            Súhlas môžete kedykoľvek zmeniť alebo odvolať. Po odvolaní analytické cookies vymažeme. Cookies
            môžete mazať aj v nastaveniach prehliadača.
          </p>
          <CookieSettingsButton className="inline-flex min-h-12 w-fit cursor-pointer items-center rounded-ag-pill bg-dukla-cyan px-7 text-[17px] font-medium text-ag-black transition-colors hover:bg-dukla-glow" />
        </Section>

        <Link href="/" className={`w-fit py-2 ${link}`}>
          ← Späť na web
        </Link>
      </div>
    </main>
  );
}
