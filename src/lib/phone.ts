import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js/min';

export type { CountryCode };

export const DEFAULT_COUNTRY: CountryCode = 'EC';

export interface CountryOption {
  code: CountryCode;
  name: string;
  dial: string;
}

// Lista real y completa de países (ISO 3166-1) con su código de marcación,
// tomada de libphonenumber-js — no es una lista inventada a mano, así que
// cubre cualquier país que un cliente real pueda elegir.
const regionNames = typeof Intl !== 'undefined' && 'DisplayNames' in Intl
  ? new Intl.DisplayNames(['es'], { type: 'region' })
  : null;

export const COUNTRIES: CountryOption[] = getCountries()
  .map((code) => ({
    code,
    name: regionNames?.of(code) ?? code,
    dial: getCountryCallingCode(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'es'));

/**
 * Convierte un número nacional (sin código de país) a formato internacional
 * E.164 (ej. "+593991234567"), o null si no es válido. No solo cuenta
 * dígitos: valida contra el plan de numeración real de ese país.
 */
export function toE164(national: string, country: CountryCode): string | null {
  const parsed = parsePhoneNumberFromString(national, country);
  return parsed?.isValid() ? parsed.number : null;
}

/**
 * Intenta interpretar texto libre (como el campo único de login "usuario,
 * correo o teléfono") como un número de teléfono. Por defecto asume Ecuador
 * cuando la persona no escribió un "+código de país" explícito, ya que hoy
 * es el mercado real de Alburqtex.
 */
export function guessE164(raw: string, defaultCountry: CountryCode = DEFAULT_COUNTRY): string | null {
  const parsed = parsePhoneNumberFromString(raw, defaultCountry);
  return parsed?.isValid() ? parsed.number : null;
}
