import { defaultVariant } from '@/variants';
import { VariantView } from '@/variants/VariantView';

/** Program "today" is recomputed hourly. */
export const revalidate = 3600;

export default function HomePage() {
  return <VariantView id={defaultVariant} />;
}
