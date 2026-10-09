import { formatDayHours, formatNightSummary } from '@/features/venue/hours';
import type { Venue } from '@/features/venue/types';
import { cn } from '@/lib/cn';
import { MoonIcon, SunIcon } from '@/ui/icons';
import { Reveal } from '@/ui/motion/Reveal';
import { STAGGER_SECONDS } from '@/ui/motion/presets';
import { container, Eyebrow, liftOnHover, sectionTitle } from './ui';

/** The concept's hinge: a pale "day" chapter holding a black "night" card. */
export function DayNight({ venue }: { venue: Venue }) {
  return (
    <section id="den-noc" className="mt-20 bg-ag-pale-gray px-6 py-20 text-ag-ink-900 md:mt-32 md:py-32">
      <div className={container}>
        <Reveal className="mx-auto mb-10 flex max-w-[720px] flex-col items-center gap-4 text-center md:mb-16">
          <Eyebrow onLight>Day &amp; Night</Eyebrow>
          <h2 className={sectionTitle}>
            Dva svety.
            <br />
            Jedna adresa.
          </h2>
          <p className="m-0 text-ag-body text-ag-gray-600">
            Cez deň sedíš pri káve uprostred námestia. V piatok a sobotu večer sa to isté miesto mení na klub.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="flex">
            <article
              className={cn(
                'flex min-h-[380px] flex-1 flex-col gap-4 rounded-ag-xl border border-ag-gray-300 bg-ag-white p-7 md:p-11',
                liftOnHover,
              )}
            >
              <SunIcon size={44} className="text-dukla-cyan-ink" />
              <Eyebrow onLight>Deň</Eyebrow>
              <h3 className="m-0 font-ag-display text-ag-card-title">Káva a drinky priamo na námestí.</h3>
              <p className="m-0 text-ag-body text-ag-gray-600">
                Otvorené denne okrem pondelka. Miesto na kávu, stretnutie s priateľmi alebo prvý drink dňa.
              </p>
              <p className="m-0 mt-auto border-t border-ag-gray-300 pt-5 text-ag-body-emphasis">
                {venue.hours.day.label} · {formatDayHours(venue.hours.day)}
              </p>
            </article>
          </Reveal>

          <Reveal delay={STAGGER_SECONDS} className="flex">
            <article
              className={cn(
                'flex min-h-[380px] flex-1 flex-col gap-4 rounded-ag-xl border border-ag-black bg-ag-black p-7 text-ag-pale-gray md:p-11',
                liftOnHover,
              )}
            >
              <MoonIcon size={44} className="text-dukla-cyan" />
              <Eyebrow>Noc</Eyebrow>
              <h3 className="m-0 font-ag-display text-ag-card-title">DJ, svetlá a parket do tretej.</h3>
              <p className="m-0 text-ag-body text-ag-gray-300">
                Každý piatok a sobotu sa svetlá stlmia. Tematické večery, DJ za pultom a akcie na bare.
              </p>
              <p className="m-0 mt-auto border-t border-ag-gray-700 pt-5 text-ag-body-emphasis text-dukla-cyan">
                {formatNightSummary(venue.hours.night)}
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
