import Image from 'next/image';
import type { Venue } from '@/features/venue/types';
import { cn } from '@/lib/cn';
import { container, PillLink, sectionLinks } from './ui';

/** The system's one glass surface: translucent black with backdrop blur. */
export function Nav({ venue }: { venue: Venue }) {
  return (
    <header className="sticky top-0 z-50 border-b border-ag-graphite-d bg-ag-nav-bg-dark backdrop-blur-xl backdrop-saturate-[1.8]">
      <nav
        aria-label="Hlavná navigácia"
        className={cn(container, 'flex flex-wrap items-center justify-between gap-x-6 px-6 py-1')}
      >
        <a
          href="#top"
          aria-label={`${venue.shortName}, na začiatok`}
          className="flex items-center gap-2.5 py-2"
        >
          <Image src="/brand/dukla-mark.webp" alt="" width={30} height={25} priority />
          <Image src="/brand/dukla-wordtype.webp" alt="" width={90} height={15} priority />
        </a>
        <ul className="order-3 -mx-6 flex w-[calc(100%+3rem)] gap-7 overflow-x-auto px-6 text-ag-micro md:order-none md:mx-0 md:w-auto md:overflow-visible md:px-0">
          {sectionLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-4 whitespace-nowrap text-ag-nav-ink transition-colors duration-200 hover:text-dukla-cyan"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <PillLink href={venue.links.instagram} size="sm">
          Rezervovať stôl
        </PillLink>
      </nav>
    </header>
  );
}
