import { describe, expect, it } from 'vitest';
import { operator } from '@/content/operator';
import { formatOperatorAddress, formatRegisterEntry, operatorTaxIds } from '@/features/legal/operator';
import { consentBootstrapScript } from './bootstrap';
import { CONSENT_MAX_AGE_MS, createConsent, isMeasurementId, parseConsent } from './consent';

const now = new Date('2026-10-10T12:00:00Z');

describe('parseConsent', () => {
  it('round-trips a fresh choice', () => {
    const choice = createConsent(true, now);
    expect(parseConsent(JSON.stringify(choice), now)).toEqual(choice);
  });

  it('asks again when nothing valid is stored', () => {
    expect(parseConsent(null, now)).toBeNull();
    expect(parseConsent('not json', now)).toBeNull();
    expect(
      parseConsent('{"version":1,"analytics":"yes","decidedAt":"2026-10-10T00:00:00Z"}', now),
    ).toBeNull();
    expect(parseConsent('{"version":0,"analytics":true,"decidedAt":"2026-10-10T00:00:00Z"}', now)).toBeNull();
  });

  it('expires after twelve months', () => {
    const old = createConsent(true, new Date(now.getTime() - CONSENT_MAX_AGE_MS - 1000));
    expect(parseConsent(JSON.stringify(old), now)).toBeNull();
  });
});

describe('consent bootstrap', () => {
  it('defaults to denied and only configures a valid measurement ID', () => {
    const script = consentBootstrapScript('G-5QQ4H9GZST');
    expect(script).toContain("analytics_storage:'denied'");
    expect(script).toContain('gtag(\'config\',"G-5QQ4H9GZST")');
    expect(script).not.toContain('googletagmanager.com');
    expect(isMeasurementId('G-5QQ4H9GZST')).toBe(true);
    expect(isMeasurementId("G-1');alert(1)//")).toBe(false);
    expect(() => consentBootstrapScript('UA-123')).toThrow();
  });
});

describe('operator details', () => {
  it('formats the legal footer lines', () => {
    expect(formatOperatorAddress(operator)).toBe('Zámocká 706/1, 064 01 Stará Ľubovňa');
    expect(operatorTaxIds(operator)).toEqual(['IČO: 57172501', 'DIČ: 2122613295', 'IČ DPH: SK2122613295']);
    expect(formatRegisterEntry(operator)).toBe(
      'Zapísaná v Obchodnom registri Okresného súdu Prešov, oddiel Sro, vložka č. 50694/P',
    );
  });
});
