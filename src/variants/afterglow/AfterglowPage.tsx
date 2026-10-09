import type { VariantPageProps } from '../types';
import { Bar } from './Bar';
import { DayNight } from './DayNight';
import { Footer } from './Footer';
import { Gallery } from './Gallery';
import { Hero } from './Hero';
import { Nav } from './Nav';
import { Program } from './Program';
import { Visit } from './Visit';

/**
 * Variant A · Afterglow (Apple-inspired system).
 * Cinematic and calm: the scroll alternates black "night" and pale "day" chapters,
 * the logo's glow is the only light source, Dukla cyan replaces the system's blue.
 */
export function AfterglowPage({ events, venue, gallery, menu }: VariantPageProps) {
  return (
    <div data-variant="afterglow" className="min-h-dvh bg-ag-black font-ag-text text-ag-pale-gray">
      <Nav venue={venue} />
      <main>
        <Hero venue={venue} events={events} />
        <DayNight venue={venue} />
        <Program events={events} venue={venue} />
        <Bar menu={menu} venue={venue} />
        <Gallery items={gallery} venue={venue} />
        <Visit venue={venue} />
      </main>
      <Footer venue={venue} />
    </div>
  );
}
