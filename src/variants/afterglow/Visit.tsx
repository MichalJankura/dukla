import { openingRows } from '@/features/venue/hours';
import type { Venue } from '@/features/venue/types';
import { cn } from '@/lib/cn';
import { MapEmbed } from '@/ui/MapEmbed';
import { Reveal } from '@/ui/motion/Reveal';
import { STAGGER_SECONDS } from '@/ui/motion/presets';
import { container, Eyebrow, PillLink, sectionTitle } from './ui';

export function Visit({ venue }: { venue: Venue }) {
  const { address, links } = venue;

  return (
    <section id="kontakt" className="bg-ag-pale-gray px-6 py-20 text-ag-ink-900 md:py-32">
      <div className={cn(container, 'grid items-stretch gap-12 lg:grid-cols-2')}>
        <Reveal className="flex flex-col gap-7">
          <Eyebrow onLight>Kontakt</Eyebrow>
          <h2 className={sectionTitle}>Príď za nami.</h2>
          <address className="text-[21px] leading-[1.4] font-semibold not-italic">
            {address.street}
            <br />
            {address.postalCode} {address.city}
            <br />
            <span className="font-normal text-ag-gray-600">{address.country}</span>
          </address>
          <dl className="m-0 border-t border-ag-gray-300">
            {openingRows(venue.hours).map((row) => (
              <div
                key={row.label}
                className="flex justify-between gap-4 border-b border-ag-gray-300 py-4 text-[17px]"
              >
                <dt>
                  {row.label}
                  {row.hint && <span className="text-ag-gray-600"> · {row.hint}</span>}
                </dt>
                <dd className={cn('m-0 font-semibold', row.closed && 'text-ag-gray-600')}>{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <PillLink href={links.maps} tone="ink">
              Navigovať
            </PillLink>
            <PillLink href={links.instagram} tone="ghost-light">
              Instagram {links.instagramHandle}
            </PillLink>
          </div>
        </Reveal>

        <Reveal delay={STAGGER_SECONDS} className="flex">
          <MapEmbed
            src={links.mapEmbed}
            title={`Mapa: ${venue.name}`}
            className="min-h-[440px] flex-1 rounded-ag-xl border border-ag-gray-300 bg-ag-white"
          />
        </Reveal>
      </div>
    </section>
  );
}
