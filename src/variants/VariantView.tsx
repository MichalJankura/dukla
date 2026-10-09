import { galleryItems, menuItems } from '@/content/catalog';
import { venue } from '@/content/venue';
import { siteConfig } from '@/config/site';
import { getEventsSnapshot } from '@/features/events/events.repo';
import { eventsJsonLd } from '@/features/seo/jsonLd';
import { JsonLd } from '@/ui/JsonLd';
import { VariantSwitch } from './VariantSwitch';
import { variantIds, variants, type VariantId } from './index';

/** Server entry for a page: gathers data once and hands it to the chosen variant. */
export function VariantView({ id }: { id: VariantId }) {
  const events = getEventsSnapshot();
  const { Page } = variants[id];

  return (
    <>
      <Page events={events} venue={venue} gallery={galleryItems} menu={menuItems} />
      <JsonLd data={eventsJsonLd(events.upcoming, venue)} />
      {siteConfig.showVariantSwitch && (
        <VariantSwitch
          current={id}
          options={variantIds.map((variant) => ({ id: variant, label: variants[variant].label }))}
        />
      )}
    </>
  );
}
