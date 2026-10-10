import Image from 'next/image';
import type { Operator } from '@/features/legal/operator';
import type { Venue } from '@/features/venue/types';
import { cn, linkTargetProps } from '@/lib/cn';
import { OperatorInfo } from '@/ui/OperatorInfo';
import { container, sectionLinks } from './ui';

export function Footer({ venue, operator, year }: { venue: Venue; operator: Operator; year: string }) {
  const { address, links } = venue;

  return (
    <footer className="border-t border-ag-graphite-d bg-ag-black px-6 pt-14 pb-10 text-ag-gray-500">
      <div className={cn(container, 'flex flex-col gap-8')}>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Image src="/brand/dukla-wordmark.webp" alt={venue.name} width={192} height={52} />
          <nav aria-label="Pätička">
            <ul className="flex flex-wrap gap-x-7 text-ag-micro">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="block py-3.5 text-ag-gray-300 hover:text-dukla-cyan">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={links.instagram}
                  {...linkTargetProps(links.instagram)}
                  className="block py-3.5 text-dukla-cyan hover:text-dukla-glow"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-4 border-t border-ag-graphite-d pt-6 text-ag-micro">
          <p className="m-0">
            © {year} {venue.name} · {address.street}, {address.postalCode} {address.city}
          </p>
          <OperatorInfo
            operator={operator}
            className="flex flex-col gap-1.5 leading-relaxed"
            linkClassName="py-2 text-ag-gray-300 hover:text-dukla-cyan"
          />
        </div>
      </div>
    </footer>
  );
}
