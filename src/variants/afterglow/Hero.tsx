import Image from 'next/image';
import { formatDayMonth, weekdayLong } from '@/features/events/date';
import { formatLineup } from '@/features/events/format';
import type { EventsSnapshot } from '@/features/events/types';
import { formatNightLong } from '@/features/venue/hours';
import type { Venue } from '@/features/venue/types';
import { MapPinIcon } from '@/ui/icons';
import { ParallaxImage } from '@/ui/motion/ParallaxImage';
import { container, PillLink } from './ui';

const SPOTLIGHT_LABEL = { today: 'Dnes večer', tomorrow: 'Zajtra', upcoming: 'Najbližšie' } as const;

export function Hero({ venue, events }: { venue: Venue; events: EventsSnapshot }) {
  const next = events.tonight ?? events.upcoming[0] ?? null;

  return (
    <section id="top" className="overflow-hidden px-6 pt-16 md:pt-28">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-6 text-center">
        <div className="animate-rise">
          <Image
            src="/brand/dukla-mark.webp"
            alt=""
            width={132}
            height={110}
            priority
            className="h-auto w-[88px] animate-glow md:w-[132px]"
          />
        </div>
        <p className="m-0 animate-rise text-sm font-semibold tracking-[0.16em] text-dukla-cyan uppercase [animation-delay:80ms]">
          {formatNightLong(venue.hours.night)}
        </p>
        <h1 className="m-0 animate-rise font-ag-display text-[2.75rem] leading-[1.05] font-semibold tracking-[-0.015em] [animation-delay:160ms] sm:text-ag-hero-l md:text-ag-hero-xl">
          Svetlá zhasnú.
          <br />
          Dukla sa rozsvieti.
        </h1>
        <p className="m-0 max-w-[620px] animate-rise text-ag-body text-ag-gray-500 [animation-delay:240ms] md:text-[21px] md:leading-normal">
          Day &amp; night bar na Námestí sv. Mikuláša v Starej Ľubovni. Cez deň káva a drinky, cez víkend DJ,
          svetlá a parket do tretej ráno.
        </p>
        <div className="mt-2 flex animate-rise flex-wrap justify-center gap-3 [animation-delay:320ms]">
          <PillLink href="#program">Pozrieť program</PillLink>
          <PillLink href={venue.links.instagram} tone="ghost">
            Napísať na Instagram ›
          </PillLink>
        </div>
      </div>

      <div className={`${container} mt-12 animate-rise [animation-delay:440ms] md:mt-20`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-ag-xl border border-ag-graphite-d bg-ag-graphite-a sm:aspect-video md:rounded-ag-2xl">
          <ParallaxImage
            image={venue.heroImage}
            sizes="(min-width: 1168px) 1120px, 100vw"
            priority
            objectPosition="50% 45%"
          />
          <p className="absolute bottom-4 left-4 m-0 inline-flex items-center gap-2 rounded-ag-pill bg-ag-black/60 px-4 py-2.5 text-xs text-ag-pale-gray backdrop-blur-md md:bottom-5 md:left-5">
            <MapPinIcon size={14} strokeWidth={2} className="text-dukla-cyan" />
            {venue.address.street.replace('svätého', 'sv.')}, {venue.address.city}
          </p>
        </div>
      </div>

      {next && next.status !== 'past' && (
        <div className={`${container} mt-6`}>
          <a
            href="#program"
            className="group flex flex-wrap items-center gap-x-5 gap-y-2.5 rounded-ag-lg border border-ag-graphite-d bg-ag-graphite-a px-6 py-4.5 text-ag-pale-gray transition-[transform,border-color] duration-500 ease-dukla hover:-translate-y-1 hover:border-dukla-cyan/65"
          >
            <span className="size-2.5 shrink-0 animate-ping-soft rounded-full bg-dukla-cyan" />
            <span className="text-xs font-semibold tracking-[0.14em] text-dukla-cyan uppercase">
              {SPOTLIGHT_LABEL[next.status]}
            </span>
            <span className="text-ag-body-emphasis">
              {[next.title, formatLineup(next.lineup)].filter(Boolean).join(' · ')}
            </span>
            <span className="text-ag-body text-ag-gray-300">
              {weekdayLong(next.date)} {formatDayMonth(next.date)} · od {next.startTime}
            </span>
            <span className="ml-auto text-ag-control text-dukla-cyan transition-transform duration-300 group-hover:translate-x-1">
              Detail ›
            </span>
          </a>
        </div>
      )}
    </section>
  );
}
