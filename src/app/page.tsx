import { defaultVariant } from '@/variants';
import { VariantView } from '@/variants/VariantView';

export default function HomePage() {
  return <VariantView id={defaultVariant} />;
}
