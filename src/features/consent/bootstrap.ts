import { CONSENT_MAX_AGE_MS, CONSENT_STORAGE_KEY, CONSENT_VERSION, isMeasurementId } from './consent';

/**
 * Inline <head> script, run before any other script: sets Google Consent Mode v2 defaults to
 * "denied", restores a stored grant and queues the GA4 config. gtag.js itself is only loaded
 * after consent (see ui/consent/Analytics), so nothing is sent to Google without it.
 */
export function consentBootstrapScript(measurementId: string): string {
  if (!isMeasurementId(measurementId)) throw new Error(`Invalid GA4 measurement ID: ${measurementId}`);
  return [
    'window.dataLayer=window.dataLayer||[];',
    'function gtag(){dataLayer.push(arguments);}',
    'window.gtag=gtag;',
    "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});",
    'try{',
    `var c=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})||'null');`,
    `if(c&&c.version===${CONSENT_VERSION}&&c.analytics===true&&Date.now()-Date.parse(c.decidedAt)<=${CONSENT_MAX_AGE_MS}){`,
    "gtag('consent','update',{analytics_storage:'granted'});",
    '}',
    '}catch(e){}',
    "gtag('js',new Date());",
    `gtag('config',${JSON.stringify(measurementId)});`,
  ].join('');
}
