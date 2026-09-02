import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { isValidEmail } from './validators';
import { guessE164 } from './phone';

export function normalizeUsername(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_.]/g, '');
}

/**
 * Canonical lookup key for a phone number. Real numbers are stored/keyed by
 * their E.164 digits (e.g. "+593991234567" -> "593991234567"), never by
 * however many digits someone happened to type — see lib/phone.ts for the
 * real per-country validation this relies on.
 */
export function normalizePhone(raw: string): string {
  const e164 = guessE164(raw);
  return e164 ? e164.replace(/\D/g, '') : legacyNormalizePhone(raw);
}

/**
 * Pre-this-change accounts may have been keyed by raw digits with no
 * country-aware parsing. Kept only so login-by-phone still resolves those
 * older records — never used for new writes.
 */
export function legacyNormalizePhone(raw: string): string {
  return raw.replace(/\D/g, '');
}

export function isValidUsername(raw: string): boolean {
  const normalized = normalizeUsername(raw);
  return normalized.length >= 3 && normalized === raw.trim().toLowerCase();
}

/** True if `raw` is a real, correctly-formatted phone number (E.164, or a national number we can default to Ecuador). */
export function isValidPhone(raw: string): boolean {
  return guessE164(raw) !== null;
}

/**
 * Turns whatever the user typed in the login field (correo, usuario o
 * teléfono) into the real email Firebase Auth needs. Returns null if
 * nothing matches.
 */
export async function resolveEmailFromIdentifier(identifier: string): Promise<string | null> {
  const trimmed = identifier.trim();
  if (!trimmed) return null;

  if (isValidEmail(trimmed)) return trimmed;

  const usernameSnap = await getDoc(doc(db, 'usernames', normalizeUsername(trimmed)));
  if (usernameSnap.exists()) return (usernameSnap.data().email as string) ?? null;

  const digits = normalizePhone(trimmed);
  if (digits.length >= 7) {
    const phoneSnap = await getDoc(doc(db, 'telefonos', digits));
    if (phoneSnap.exists()) return (phoneSnap.data().email as string) ?? null;
  }

  // Compatibilidad con cuentas registradas antes de validar por país: esas
  // quedaron guardadas con la clave antigua (solo dígitos, tal cual se
  // escribieron), que puede no coincidir con la clave E.164 de arriba.
  const legacyDigits = legacyNormalizePhone(trimmed);
  if (legacyDigits.length >= 7 && legacyDigits !== digits) {
    const legacySnap = await getDoc(doc(db, 'telefonos', legacyDigits));
    if (legacySnap.exists()) return (legacySnap.data().email as string) ?? null;
  }

  return null;
}
