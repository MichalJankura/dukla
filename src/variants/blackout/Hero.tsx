import Image from 'next/image';
import type { ReactNode } from 'react';
import { formatNightSummary, weekdayName } from '@/features/venue/hours';
import type { Venue } from '@/features/venue/types';
import { cn } from '@/lib/cn';
import { LoopVideo } from '@/ui/media/LoopVideo';
import { page, Pill } from './ui';

/** Phones get the loop as background (below md); desktops as a card (lg and up). */
const PHONE = '(max-width: 767px)';
const DESKTOP = '(min-width: 1024px)';

/** One line of the headline, revealed from below its own mask. */
function Line({
  children,
  delayMs,
  className,
}: {
  children: ReactNode;
  delayMs: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <span className={cn('block animate-line-up', className)} style={{ animationDelay: `${delayMs}ms` }}>
        {children}
      </span>
    </span>
  );
}

export function Hero({ venue }: { venue: Venue }) {
  const nights = venue.hours.night.map((slot) => `${weekdayName(slot.day)}.`);

  return (
    <section
      id="top"
      className="relative isolate flex aspect-[540/848] max-h-[92svh] min-h-[560px] w-full items-end overflow-hidden bg-bo-grey-800 md:aspect-video md:max-h-[900px]"
    >
      {/* Phones: the portrait loop is the background. */}
      <div className="absolute inset-0 md:hidden">
        <LoopVideo video={venue.heroVideo} media={PHONE} sizes="100vw" controlClassName="top-4 right-4" />
      </div>
      {/* Tablet and desktop: the interior photo, slowly zooming. */}
      <div className="absolute inset-0 hidden animate-ken-burns md:block">
        <Image
          src={venue.heroImage.src}
          alt={venue.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '50% 40%' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(17_17_17/0.88)_0%,rgb(17_17_17/0.6)_35%,rgb(17_17_17/0)_70%)]" />

      <div
        className={cn(
          page,
          'relative z-10 flex flex-col gap-6 pb-8 md:pb-12 lg:pr-[280px] lg:pb-16 xl:pr-[320px]',
        )}
      >
        {/* Desktop: the loop as a story card, sharp-cornered like all photography here. */}
        <div className="absolute right-12 bottom-16 hidden aspect-[540/848] w-[220px] overflow-hidden bg-bo-grey-800 ring-1 ring-white/15 lg:block xl:w-[260px]">
          <LoopVideo
            video={venue.heroVideo}
            media={DESKTOP}
            sizes="260px"
            controlClassName="right-2 bottom-2"
          />
          <span className="absolute top-3 left-3 z-10 rounded-bo-pill bg-dukla-cyan px-2.5 text-bo-small text-bo-black">
            Z parketu
          </span>
        </div>
        <span className="animate-fade-in self-start rounded-bo-pill border border-dukla-cyan px-3.5 py-1.5 text-bo-caption text-dukla-cyan [animation-delay:450ms]">
          {formatNightSummary(venue.hours.night)}
        </span>
        <h1 className="m-0 font-bo-display text-[3rem] leading-[0.9] font-medium text-white uppercase sm:text-[4rem] lg:text-bo-display">
          {nights.map((night, index) => (
            <Line key={night} delayMs={index * 120}>
              {night}
            </Line>
          ))}
          <Line delayMs={nights.length * 120} className="text-dukla-cyan">
            {venue.shortName}.
          </Line>
        </h1>
        <div className="flex animate-fade-in flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:450ms]">
          <p className="m-0 max-w-[460px] text-bo-body text-bo-grey-200">
            Day &amp; night bar na Námestí sv. Mikuláša 27 v Starej Ľubovni. DJ, svetlá a parket do tretej
            ráno.
          </p>
          <div className="flex flex-wrap gap-2">
            <Pill href="#program">Pozrieť program</Pill>
            <Pill href={venue.links.instagram} tone="outline">
              Instagram
            </Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
