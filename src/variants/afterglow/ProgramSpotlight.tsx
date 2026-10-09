'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type PanInfo, type Variants } from 'motion/react';
import { useState, type ReactNode } from 'react';
import { formatDayMonth, weekdayLong } from '@/features/events/date';
import { formatEntry, formatLineup, formatPrice, statusLabel } from '@/features/events/format';
import type { EventView, PartyView, PromoView, TimelineStatus } from '@/features/events/types';
import { cn } from '@/lib/cn';
import { ChevronLeftIcon, ChevronRightIcon } from '@/ui/icons';
import { EASE_OUT } from '@/ui/motion/presets';
import { PillLink } from './ui';

const SWIPE_THRESHOLD_PX = 80;

const slideVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction >= 0 ? 28 : -28 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction >= 0 ? -28 : 28 }),
};

interface ProgramSpotlightProps {
  slides: EventView[];
  reserveUrl: string;
  /** Section heading rendered next to the carousel controls. */
  header: ReactNode;
}

/** Spotlight carousel: one night (or bar offer) at a time; buttons, dots and swipe. */
export function ProgramSpotlight({ slides, reserveUrl, header }: ProgramSpotlightProps) {
  const [[index, direction], setPosition] = useState<[number, number]>([0, 0]);
  const reduceMotion = useReducedMotion();
  const count = slides.length;
  const slide = slides[Math.min(index, count - 1)];

  const step = (delta: number) => setPosition(([current]) => [(current + delta + count) % count, delta]);
  const jump = (target: number) => setPosition(([current]) => [target, target >= current ? 1 : -1]);
  const onDragEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_THRESHOLD_PX) step(1);
    else if (info.offset.x >= SWIPE_THRESHOLD_PX) step(-1);
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Program na tento víkend">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        {header}
        {count > 1 && (
          <div className="flex items-center gap-3">
            <span aria-live="polite" className="min-w-12 text-center text-ag-control text-ag-gray-500">
              {index + 1} / {count}
            </span>
            <RoundButton label="Predchádzajúci" onClick={() => step(-1)}>
              <ChevronLeftIcon size={20} />
            </RoundButton>
            <RoundButton label="Ďalší" onClick={() => step(1)}>
              <ChevronRightIcon size={20} />
            </RoundButton>
          </div>
        )}
      </div>

      {slide && (
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.article
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: EASE_OUT }}
            drag={count > 1 && !reduceMotion ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            aria-roledescription="slide"
            aria-label={`${index + 1} z ${count}: ${slide.title}`}
            className="flex touch-pan-y flex-wrap overflow-hidden rounded-ag-xl bg-ag-graphite-a md:rounded-ag-2xl"
          >
            <SlideMedia slide={slide} />
            <div className="flex flex-[1_1_380px] flex-col justify-center gap-5 p-7 md:p-14">
              {slide.kind === 'party' ? (
                <PartyBody event={slide} reserveUrl={reserveUrl} />
              ) : (
                <PromoBody promo={slide} />
              )}
            </div>
          </motion.article>
        </AnimatePresence>
      )}

      {count > 1 && (
        <div className="mt-4 flex justify-center gap-1">
          {slides.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Zobraziť: ${item.title}`}
              aria-current={itemIndex === index || undefined}
              onClick={() => jump(itemIndex)}
              className="cursor-pointer px-1.5 py-[18px]"
            >
              <span
                className={cn(
                  'block h-2 rounded-ag-pill transition-[width,background-color] duration-300',
                  itemIndex === index ? 'w-7 bg-dukla-cyan' : 'w-2 bg-ag-gray-700',
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function RoundButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-ag-graphite-d text-ag-pale-gray transition-[background-color,color,transform] duration-200 hover:bg-ag-gray-700 hover:text-dukla-cyan active:scale-[0.92]"
    >
      {children}
    </button>
  );
}

function SlideMedia({ slide }: { slide: EventView }) {
  return (
    <div className="group/media relative aspect-[4/5] max-h-[620px] flex-[1_1_380px] overflow-hidden bg-ag-graphite-d">
      {slide.poster ? (
        <Image
          src={slide.poster.src}
          alt={slide.poster.alt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          draggable={false}
          className="object-cover transition-transform duration-900 ease-dukla group-hover/media:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ag-gray-500">
          <Image src="/brand/dukla-mark.webp" alt="" width={96} height={80} className="opacity-50" />
          <span className="text-ag-body-emphasis">Plagát čoskoro</span>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status, date }: { status: TimelineStatus; date: string }) {
  if (status === 'today') {
    return (
      <span className="inline-flex items-center gap-2 self-start rounded-ag-pill bg-dukla-cyan px-3.5 py-1.5 text-xs font-semibold text-ag-black">
        <span className="size-1.5 animate-pulse rounded-full bg-ag-black" />
        Dnes večer
      </span>
    );
  }
  return (
    <span className="self-start rounded-ag-pill border border-dukla-cyan px-3.5 py-1.5 text-xs font-semibold text-dukla-cyan">
      {statusLabel(status, date)}
    </span>
  );
}

interface Fact {
  label: string;
  value: string;
}

function PartyBody({ event, reserveUrl }: { event: PartyView; reserveUrl: string }) {
  const facts = [
    {
      label: 'Začiatok',
      value: event.doorsTime ? `${event.startTime} (otvorené od ${event.doorsTime})` : event.startTime,
    },
    { label: 'Hudba', value: formatLineup(event.lineup) },
    { label: 'Vstup', value: formatEntry(event.entry) },
  ].filter((fact): fact is Fact => Boolean(fact.value));

  return (
    <>
      <StatusBadge status={event.status} date={event.date} />
      <div className="flex items-baseline gap-4">
        <span className="font-ag-display text-[3.5rem] leading-none font-semibold tracking-[-0.015em] md:text-[5rem]">
          {formatDayMonth(event.date)}
        </span>
        <span className="text-ag-subhead text-ag-gray-500">{weekdayLong(event.date)}</span>
      </div>
      <h3 className="m-0 font-ag-display text-ag-product-heading">{event.title}</h3>
      {event.description && (
        <p className="m-0 max-w-[440px] text-ag-body text-ag-gray-300">{event.description}</p>
      )}
      <dl className="m-0 flex flex-wrap gap-x-10 gap-y-3 border-y border-ag-gray-700 py-5">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-xs text-ag-gray-300">{fact.label}</dt>
            <dd className="m-0 mt-1 text-ag-body-emphasis">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-3">
        <PillLink href={reserveUrl}>Rezervovať stôl</PillLink>
        {event.instagramUrl && (
          <PillLink href={event.instagramUrl} tone="ghost">
            Detail na Instagrame ›
          </PillLink>
        )}
      </div>
    </>
  );
}

function PromoBody({ promo }: { promo: PromoView }) {
  return (
    <>
      <span className="self-start rounded-ag-pill border border-dukla-cyan px-3.5 py-1.5 text-xs font-semibold text-dukla-cyan">
        Akcia na bare
      </span>
      <h3 className="m-0 font-ag-display text-ag-product-heading">{promo.title}</h3>
      <div className="flex flex-wrap gap-4">
        {promo.highlights.map((highlight) => (
          <div key={highlight.label} className="flex-[1_1_160px] rounded-ag-lg bg-ag-graphite-d p-6">
            <div className="text-ag-control text-ag-gray-300">{highlight.label}</div>
            <div className="mt-1.5 font-ag-display text-5xl leading-none font-semibold text-dukla-cyan">
              {formatPrice(highlight.price)}
            </div>
          </div>
        ))}
      </div>
      {promo.description && <p className="m-0 text-ag-control text-ag-gray-300">{promo.description}</p>}
      <div className="flex flex-wrap gap-3">
        <PillLink href="#bar">Pozrieť bar</PillLink>
        {promo.instagramUrl && (
          <PillLink href={promo.instagramUrl} tone="ghost">
            Na Instagrame ›
          </PillLink>
        )}
      </div>
    </>
  );
}
