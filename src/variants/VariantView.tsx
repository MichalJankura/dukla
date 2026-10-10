import { galleryItems, menuItems } from '@/content/catalog';
import { operator } from '@/content/operator';
import { venue } from '@/content/venue';
import { siteConfig } from '@/config/site';
import { getEventsSnapshot } from '@/features/events/events.repo';
import { eventsJsonLd } from '@/features/seo/jsonLd';
import { JsonLd } from '@/ui/JsonLd';
import { VariantSwitch } from './VariantSwitch';
import { variantIds, variants, type VariantId } from './index';

/**
 * Build-time entry for a page. The program is snapshotted for the build day (static HTML,
 * structured data); the variant re-evaluates it in the browser via useLiveEvents.
 */
export function VariantView({ id }: { id: VariantId }) {
  const events = getEventsSnapshot();
  const { Page } = variants[id];

  return (
    <>
      <Page
        buildDay={events.businessDay}
        venue={venue}
        gallery={galleryItems}
        menu={menuItems}
        operator={operator}
      />
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
