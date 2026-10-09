import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isVariantId, variantIds, variants } from '@/variants';
import { VariantView } from '@/variants/VariantView';

export const dynamicParams = false;

interface VariantPageProps {
  params: Promise<{ variant: string }>;
}

export function generateStaticParams() {
  return variantIds.map((variant) => ({ variant }));
}

export async function generateMetadata({ params }: VariantPageProps): Promise<Metadata> {
  const { variant } = await params;
  if (!isVariantId(variant)) return {};
  // Preview routes for the client; the canonical page is "/".
  return {
    title: `Variant ${variants[variant].label}`,
    alternates: { canonical: '/' },
    robots: { index: false },
  };
}

export default async function VariantPage({ params }: VariantPageProps) {
  const { variant } = await params;
  if (!isVariantId(variant)) notFound();
  return <VariantView id={variant} />;
}
