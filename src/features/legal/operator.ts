/** The legal entity running the venue (prevádzkovateľ), as shown in the footer and the cookie policy. */
export interface Operator {
  name: string;
  address: { street: string; postalCode: string; city: string; countryCode: string };
  ico: string;
  dic: string;
  icDph: string;
  /** Commercial register entry, e.g. court, section and file number. */
  register: { court: string; section: string; file: string };
  /** Contact e-mail; required for online services by Act No. 22/2004 Coll. — shown once known. */
  email: string | null;
}

export function formatOperatorAddress(operator: Operator): string {
  const { street, postalCode, city } = operator.address;
  return `${street}, ${postalCode} ${city}`;
}

/** ["IČO: …", "DIČ: …", "IČ DPH: …"] */
export function operatorTaxIds(operator: Operator): string[] {
  return [`IČO: ${operator.ico}`, `DIČ: ${operator.dic}`, `IČ DPH: ${operator.icDph}`];
}

/** "Zapísaná v Obchodnom registri Okresného súdu Prešov, oddiel Sro, vložka č. 50694/P" */
export function formatRegisterEntry(operator: Operator): string {
  const { court, section, file } = operator.register;
  return `Zapísaná v Obchodnom registri ${court}, oddiel ${section}, vložka č. ${file}`;
}
