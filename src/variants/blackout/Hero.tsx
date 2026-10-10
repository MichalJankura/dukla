import Image from 'next/image';
import type { ReactNode } from 'react';
import { formatNightSummary, weekdayName } from '@/features/venue/hours';
import type { Venue } from '@/features/venue/types';
import { cn } from '@/lib/cn';
import { page, Pill } from './ui';

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
      className="relative isolate flex aspect-[4/3] min-h-[560px] w-full items-end overflow-hidden bg-bo-grey-800 sm:aspect-video lg:max-h-[900px]"
    >
      <div className="absolute inset-0 -z-10 animate-ken-burns">
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
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(17_17_17/0.88)_0%,rgb(17_17_17/0.6)_35%,rgb(17_17_17/0)_70%)]" />

      <div className={cn(page, 'flex flex-col gap-6 pb-8 md:pb-12 lg:pb-16')}>
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
