'use client';

import { useLiveEvents } from '@/features/events/useLiveEvents';
import { cn } from '@/lib/cn';
import type { VariantPageProps } from '../types';
import { Header } from './Header';
import { Hero } from './Hero';
import { ProgramGrid } from './ProgramGrid';
import { Bar, DayNight, Footer, Gallery, Visit } from './Sections';
import { Ticker, tickerItems } from './Ticker';
import { page, sectionY } from './ui';

/**
 * Variant B · Blackout (Nike-inspired system, dark theme).
 * Loud and poster-like: graphite grounds, condensed uppercase, edge-to-edge photography,
 * a dense flyer grid and a cyan ticker. Flat — colour comes from photos and Dukla cyan only.
 */
export function BlackoutPage({ buildDay, venue, gallery, menu, operator }: VariantPageProps) {
  const events = useLiveEvents(buildDay);

  return (
    <div data-variant="blackout" className="min-h-dvh bg-bo-grey-900 font-bo-text text-white">
      <Header venue={venue} events={events} />
      <main>
        <Hero venue={venue} />
        <Ticker items={tickerItems(events, venue)} />
        <section id="program" className={cn(page, sectionY)}>
          <ProgramGrid events={[...events.upcoming, ...events.past]} fallbackHref={venue.links.instagram} />
        </section>
        <DayNight venue={venue} />
        <Bar menu={menu} venue={venue} />
        <Gallery items={gallery} venue={venue} />
        <Visit venue={venue} />
      </main>
      <Footer venue={venue} operator={operator} year={events.businessDay.slice(0, 4)} />
    </div>
  );
}
