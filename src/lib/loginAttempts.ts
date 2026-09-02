import { deleteDoc, doc, getDoc, serverTimestamp, setDoc, type Timestamp } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from './firebase';

const CAPTCHA_AFTER = 3;
const LOCK_AFTER = 5;
const RESET_AFTER = 10;
const LOCK_MINUTES = 5;
const HARD_LOCK_MINUTES = 15;
const RESEND_COOLDOWN_MINUTES = 10;
const FIRESTORE_TIMEOUT_MS = 4000;

export interface AttemptState {
  failedCount: number;
  lockedUntil: Date | null;
  mustReset: boolean;
}

const NO_ATTEMPTS: AttemptState = { failedCount: 0, lockedUntil: null, mustReset: false };

function keyFor(email: string) {
  return email.trim().toLowerCase();
}

function toDate(ts: Timestamp | null | undefined): Date | null {
  return ts ? ts.toDate() : null;
}

/**
 * This whole feature is a bonus layer on top of Firebase's own login
 * protection — if Firestore is unreachable or not set up yet, we must never
 * let it hang or block a real login attempt. Anything that takes longer
 * than a few seconds is treated as "no extra protection available right
 * now" instead of freezing the button forever.
 */
function withTimeout<T>(promise: Promise<T>, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallback), FIRESTORE_TIMEOUT_MS);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      () => {
        clearTimeout(timer);
        resolve(fallback);
      },
    );
  });
}

export async function getAttemptState(email: string): Promise<AttemptState> {
  return withTimeout(
    (async () => {
      const snap = await getDoc(doc(db, 'loginAttempts', keyFor(email)));
      if (!snap.exists()) return NO_ATTEMPTS;
      const data = snap.data();
      return {
        failedCount: data.failedCount ?? 0,
        lockedUntil: toDate(data.lockedUntil),
        mustReset: Boolean(data.mustReset),
      };
    })(),
    NO_ATTEMPTS,
  );
}

/** Call after a wrong password. Escalates captcha / temporary lockout / forced reset. */
export async function recordFailedAttempt(email: string): Promise<AttemptState> {
  const key = keyFor(email);
  const ref = doc(db, 'loginAttempts', key);
  const snap = await withTimeout(getDoc(ref), null);
  if (!snap) return NO_ATTEMPTS; // couldn't reach Firestore — don't escalate blindly
  const prev = snap.exists() ? snap.data() : null;
  const failedCount = (prev?.failedCount ?? 0) + 1;

  let lockedUntil: Date | null = null;
  if (failedCount >= RESET_AFTER) {
    lockedUntil = new Date(Date.now() + HARD_LOCK_MINUTES * 60_000);
  } else if (failedCount >= LOCK_AFTER) {
    lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60_000);
  }
  const mustReset = failedCount >= RESET_AFTER;

  const lastResetEmailAt: Date | null = toDate(prev?.lastResetEmailAt);
  const shouldSendResetEmail =
    mustReset && (!lastResetEmailAt || Date.now() - lastResetEmailAt.getTime() > RESEND_COOLDOWN_MINUTES * 60_000);

  if (shouldSendResetEmail) {
    await withTimeout(sendPasswordResetEmail(auth, email).catch(() => {}), undefined);
  }

  // Best-effort persistence: the caller already has the computed state to
  // act on immediately, so a slow/unreachable write shouldn't hold it up.
  void withTimeout(
    setDoc(
      ref,
      {
        failedCount,
        lockedUntil,
        mustReset,
        lastFailedAt: serverTimestamp(),
        ...(shouldSendResetEmail ? { lastResetEmailAt: serverTimestamp() } : {}),
      },
      { merge: true },
    ).catch(() => {}),
    undefined,
  );

  return { failedCount, lockedUntil, mustReset };
}

/** Call after a successful login to wipe the record for this account. */
export async function clearAttempts(email: string): Promise<void> {
  void withTimeout(deleteDoc(doc(db, 'loginAttempts', keyFor(email))).catch(() => {}), undefined);
}

export function needsCaptcha(state: AttemptState): boolean {
  return state.failedCount >= CAPTCHA_AFTER;
}

export function minutesRemaining(lockedUntil: Date): number {
  return Math.max(1, Math.ceil((lockedUntil.getTime() - Date.now()) / 60_000));
}
