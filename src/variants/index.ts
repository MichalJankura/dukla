import type { ComponentType } from 'react';
import { siteConfig } from '@/config/site';
import { AfterglowPage } from './afterglow/AfterglowPage';
import { BlackoutPage } from './blackout/BlackoutPage';
import type { VariantPageProps } from './types';

export const variants = {
  afterglow: { label: 'A · Afterglow', Page: AfterglowPage },
  blackout: { label: 'B · Blackout', Page: BlackoutPage },
} satisfies Record<string, { label: string; Page: ComponentType<VariantPageProps> }>;

export type VariantId = keyof typeof variants;

export const variantIds = Object.keys(variants) as VariantId[];

export function isVariantId(value: unknown): value is VariantId {
  return typeof value === 'string' && value in variants;
}

export const defaultVariant: VariantId = isVariantId(siteConfig.defaultVariant)
  ? siteConfig.defaultVariant
  : 'afterglow';
