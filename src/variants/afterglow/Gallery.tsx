import Image from 'next/image';
import type { GalleryItem } from '@/features/catalog/types';
import type { Venue } from '@/features/venue/types';
import { linkTargetProps } from '@/lib/cn';
import { InstagramIcon } from '@/ui/icons';
import { Reveal } from '@/ui/motion/Reveal';
import { STAGGER_SECONDS } from '@/ui/motion/presets';
import { container, Eyebrow, sectionTitle } from './ui';

export function Gallery({ items, venue }: { items: readonly GalleryItem[]; venue: Venue }) {
  const { instagram, instagramHandle } = venue.links;

  return (
    <section id="galeria" className="bg-ag-black px-6 py-20 md:py-32">
      <div className={container}>
        <Reveal className="mx-auto mb-10 flex max-w-[680px] flex-col items-center gap-4 text-center md:mb-14">
          <Eyebrow>Galéria</Eyebrow>
          <h2 className={sectionTitle}>Atmosféra Dukly.</h2>
          <p className="m-0 text-ag-body text-ag-gray-500">
            Zábery z našich večerov. Ďalšie každý víkend na{' '}
            <a
              href={instagram}
              {...linkTargetProps(instagram)}
              className="text-dukla-cyan hover:text-dukla-glow"
            >
              {instagramHandle}
            </a>
            .
          </p>
        </Reveal>

        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal as="li" key={item.src} delay={index * STAGGER_SECONDS}>
              <figure className="m-0 flex flex-col gap-3">
                <div className="group relative aspect-[3/4] overflow-hidden rounded-ag-xl bg-ag-graphite-a">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 270px, 50vw"
                    className="object-cover transition-transform duration-900 ease-dukla group-hover:scale-105"
                    style={item.focus ? { objectPosition: item.focus } : undefined}
                  />
                </div>
                <figcaption className="text-ag-control text-ag-gray-500">{item.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
          <Reveal as="li" delay={items.length * STAGGER_SECONDS}>
            <a
              href={instagram}
              {...linkTargetProps(instagram)}
              className="flex aspect-[3/4] flex-col justify-between rounded-ag-xl border border-ag-gray-700 bg-ag-graphite-a p-6 text-ag-pale-gray transition-[transform,border-color] duration-500 ease-dukla hover:-translate-y-1 hover:border-dukla-cyan/65 md:p-8"
            >
              <InstagramIcon size={40} className="text-dukla-cyan" />
              <span className="flex flex-col gap-2.5">
                <span className="font-ag-display text-ag-card-title">Sleduj nás</span>
                <span className="hidden text-ag-body text-ag-gray-300 sm:block">
                  Plagáty, fotky a stories z každého víkendu.
                </span>
                <span className="text-ag-body-emphasis text-dukla-cyan">{instagramHandle} ›</span>
              </span>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
