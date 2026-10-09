import Image from 'next/image';
import type { GalleryItem, MenuItem } from '@/features/catalog/types';
import { formatPrice } from '@/features/events/format';
import { formatDayHours, formatNightSummary, openingRows } from '@/features/venue/hours';
import type { Venue } from '@/features/venue/types';
import { cn, linkTargetProps } from '@/lib/cn';
import { MapEmbed } from '@/ui/MapEmbed';
import { Drift } from '@/ui/motion/Drift';
import { Reveal } from '@/ui/motion/Reveal';
import { STAGGER_SECONDS } from '@/ui/motion/presets';
import { dividerBottom, dividerTop, display, page, Pill, sectionLinks, sectionY } from './ui';

export function DayNight({ venue }: { venue: Venue }) {
  return (
    <section aria-labelledby="den-noc-title" className={cn('overflow-hidden bg-bo-grey-800', sectionY)}>
      <Drift distance={6}>
        <h2
          id="den-noc-title"
          className="m-0 px-4 font-bo-display text-[4.5rem] leading-[0.9] font-medium whitespace-nowrap text-white uppercase md:px-6 md:text-[8rem] lg:px-12 lg:text-[12.5rem]"
        >
          Deň aj noc.
        </h2>
      </Drift>
      <div className={cn(page, 'mt-8 grid gap-3 md:mt-14 md:grid-cols-2')}>
        <Reveal className="flex flex-col gap-3 rounded-bo-container bg-bo-grey-900 p-6 lg:p-10">
          <span className="font-bo-display text-5xl leading-[0.9] font-medium uppercase">Deň</span>
          <p className="m-0 text-bo-body text-bo-grey-300">
            Otvorené denne okrem pondelka. Káva, drinky a stretnutia priamo na námestí.
          </p>
          <span className="text-bo-body-medium">
            {venue.hours.day.label} · {formatDayHours(venue.hours.day)}
          </span>
        </Reveal>
        <Reveal
          delay={STAGGER_SECONDS}
          className="flex flex-col gap-3 rounded-bo-container bg-bo-black p-6 lg:p-10"
        >
          <span className="font-bo-display text-5xl leading-[0.9] font-medium text-dukla-cyan uppercase">
            Noc
          </span>
          <p className="m-0 text-bo-body text-bo-grey-300">
            Každý piatok a sobotu. Tematické večery, DJ za pultom, akcie na bare.
          </p>
          <span className="text-bo-body-medium">{formatNightSummary(venue.hours.night)}</span>
        </Reveal>
      </div>
    </section>
  );
}

export function Bar({ menu, venue }: { menu: readonly MenuItem[]; venue: Venue }) {
  const drinksMenu = venue.links.drinksMenu;
  return (
    <section id="bar" className={cn(page, sectionY)}>
      <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 className="m-0 font-bo-heading text-bo-heading-1">Na bare</h2>
        {drinksMenu && (
          <a
            href={drinksMenu}
            {...linkTargetProps(drinksMenu)}
            className="py-2.5 text-bo-link text-dukla-cyan"
          >
            Nápojový lístok
          </a>
        )}
      </Reveal>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {menu.map((item, index) => (
          <Reveal as="li" key={item.id} delay={index * STAGGER_SECONDS}>
            <MenuTile item={item} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function MenuTile({ item }: { item: MenuItem }) {
  const body = (
    <>
      <div className="relative aspect-square overflow-hidden bg-bo-grey-800">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover object-bottom transition-transform duration-700 ease-dukla group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/brand/dukla-mark.webp" alt="" width={60} height={50} className="opacity-25" />
          </div>
        )}
        {item.promo && (
          <span className="absolute top-3 left-3 rounded-bo-pill bg-dukla-cyan px-2.5 text-bo-small text-bo-black">
            Akcia
          </span>
        )}
      </div>
      <div className="flex flex-col pt-3">
        <span className="text-bo-heading-3">{item.name}</span>
        <span className="text-bo-body text-bo-grey-400">{item.note}</span>
        <span className="mt-1 text-bo-caption">{item.price === null ? '—' : formatPrice(item.price)}</span>
      </div>
    </>
  );

  return item.instagramUrl ? (
    <a href={item.instagramUrl} {...linkTargetProps(item.instagramUrl)} className="group block text-white">
      {body}
    </a>
  ) : (
    <div className="group text-white">{body}</div>
  );
}

export function Gallery({ items, venue }: { items: readonly GalleryItem[]; venue: Venue }) {
  return (
    <section id="galeria" className={cn('pt-12 md:pt-16 lg:pt-20', dividerTop)}>
      <Reveal className={cn(page, 'mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4')}>
        <h2 className={display}>Z našich nocí</h2>
        <Pill href={venue.links.instagram} tone="outline" size="sm">
          Viac na {venue.links.instagramHandle}
        </Pill>
      </Reveal>
      <ul className="flex snap-x snap-mandatory gap-1 overflow-x-auto sm:grid sm:grid-cols-3 sm:overflow-visible">
        {items.map((item) => (
          <li
            key={item.src}
            className="group relative aspect-[3/4] w-[80vw] shrink-0 snap-start overflow-hidden bg-bo-grey-800 sm:w-auto"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 640px) 33vw, 80vw"
              className="object-cover transition-transform duration-700 ease-dukla group-hover:scale-105"
              style={item.focus ? { objectPosition: item.focus } : undefined}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Visit({ venue }: { venue: Venue }) {
  const { address, links } = venue;
  return (
    <section id="kontakt" className={cn(page, sectionY, 'grid gap-12 lg:grid-cols-2')}>
      <Reveal className="flex flex-col gap-7">
        <h2 className={display}>
          Nájdeš nás
          <br />
          na námestí.
        </h2>
        <address className="font-bo-heading text-bo-heading-2 not-italic">
          {address.street}
          <br />
          {address.postalCode} {address.city}, {address.country}
        </address>
        <dl className="m-0">
          {openingRows(venue.hours).map((row) => (
            <div
              key={row.label}
              className={cn(
                'flex justify-between gap-4 py-3.5 text-bo-body',
                dividerBottom,
                row.closed && 'text-bo-grey-400',
              )}
            >
              <dt>
                {row.label}
                {row.hint && `, ${row.hint}`}
              </dt>
              <dd className="m-0 font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-2">
          <Pill href={links.maps}>Navigovať</Pill>
          <Pill href={links.instagram} tone="outline">
            Napísať na Instagram
          </Pill>
        </div>
      </Reveal>
      <Reveal delay={STAGGER_SECONDS} className="flex">
        <MapEmbed
          tone="dark"
          query={`${address.street}, ${address.postalCode} ${address.city}`}
          title={`Mapa: ${venue.name}`}
          address={`${address.street}, ${address.city}`}
          className="min-h-[460px] flex-1 bg-bo-grey-800"
        />
      </Reveal>
    </section>
  );
}

export function Footer({ venue }: { venue: Venue }) {
  const { address, links } = venue;
  const column = 'flex flex-col text-bo-link-small';
  return (
    <footer className={cn('bg-bo-black text-bo-grey-400', dividerTop)}>
      <div className={cn(page, 'flex flex-col gap-10 pt-12 pb-8')}>
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div className="flex-[1_1_260px]">
            <Image src="/brand/dukla-wordmark.webp" alt={venue.name} width={207} height={56} />
          </div>
          <nav aria-label="Pätička" className={cn(column, 'flex-[0_1_180px]')}>
            <span className="mb-1.5 text-white">Navigácia</span>
            {sectionLinks.map((link) => (
              <a key={link.href} href={link.href} className="py-1 text-bo-grey-400 hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <div className={cn(column, 'flex-[0_1_240px]')}>
            <span className="mb-1.5 text-white">Kontakt</span>
            <span>{address.street}</span>
            <span>
              {address.postalCode} {address.city}
            </span>
            <a href={links.instagram} {...linkTargetProps(links.instagram)} className="py-1 text-dukla-cyan">
              Instagram {links.instagramHandle}
            </a>
          </div>
          <div className={cn(column, 'flex-[0_1_220px]')}>
            <span className="mb-1.5 text-white">Otvorené</span>
            <span>{formatNightSummary(venue.hours.night)}</span>
            <span>
              {venue.hours.day.label}, deň: {formatDayHours(venue.hours.day)}
            </span>
          </div>
        </div>
        <div className={cn('flex flex-wrap justify-between gap-x-6 gap-y-2 pt-5 text-bo-tiny', dividerTop)}>
          <span>
            © {new Date().getFullYear()} {venue.name}
          </span>
          <span>{venue.ageNotice}</span>
        </div>
      </div>
    </footer>
  );
}
