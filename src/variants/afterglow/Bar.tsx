import type { MenuItem } from '@/features/catalog/types';
import { formatPrice } from '@/features/events/format';
import type { Venue } from '@/features/venue/types';
import { cn, linkTargetProps } from '@/lib/cn';
import { Reveal } from '@/ui/motion/Reveal';
import { STAGGER_SECONDS } from '@/ui/motion/presets';
import { container, Eyebrow, liftOnHover } from './ui';

/** The system's "transaction mode": white ground, denser tiles. */
export function Bar({ menu, venue }: { menu: readonly MenuItem[]; venue: Venue }) {
  const drinksMenu = venue.links.drinksMenu;

  return (
    <section id="bar" className="bg-ag-white px-6 py-18 text-ag-ink-900 md:py-28">
      <div className={container}>
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="flex flex-col gap-3">
            <Eyebrow onLight>Bar</Eyebrow>
            <h2 className="m-0 font-ag-display text-ag-product-heading">Na bare.</h2>
          </div>
          {drinksMenu && (
            <a
              href={drinksMenu}
              {...linkTargetProps(drinksMenu)}
              className="py-3 text-[17px] text-dukla-cyan-ink hover:underline"
            >
              Celý nápojový lístok ›
            </a>
          )}
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {menu.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * STAGGER_SECONDS} className="flex">
              <article
                className={cn(
                  'flex min-h-[220px] flex-1 flex-col gap-2 rounded-ag-lg border border-ag-pale-gray bg-ag-pale-gray p-7',
                  liftOnHover,
                )}
              >
                <span
                  className={cn(
                    'text-xs font-semibold tracking-[0.12em] uppercase',
                    item.promo ? 'text-dukla-cyan-ink' : 'text-ag-gray-600',
                  )}
                >
                  {item.category}
                  {item.promo && ' · akcia'}
                </span>
                <h3 className="m-0 font-ag-display text-ag-card-title">{item.name}</h3>
                <span className="text-ag-control text-ag-gray-600">{item.note}</span>
                <span className="mt-auto pt-4 text-ag-body-emphasis">
                  {item.price === null ? '—' : formatPrice(item.price)}
                </span>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
