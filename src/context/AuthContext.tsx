import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updatePassword as firebaseUpdatePassword,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, runTransaction } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';
import { isValidPhone, isValidUsername, normalizePhone, normalizeUsername, resolveEmailFromIdentifier } from '../lib/identifiers';
import { clearAttempts, getAttemptState, minutesRemaining, needsCaptcha, recordFailedAttempt } from '../lib/loginAttempts';

function friendlyAuthError(code: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Usuario, correo, teléfono o contraseña incorrectos.';
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con ese correo.';
    case 'auth/weak-password':
      return 'La contraseña es demasiado débil.';
    case 'auth/invalid-email':
      return 'Ingresa un correo válido.';
    case 'auth/requires-recent-login':
      return 'Por seguridad, vuelve a iniciar sesión antes de cambiar tu contraseña.';
    default:
      return 'Ocurrió un error. Intenta de nuevo.';
  }
}

export interface SignUpData {
  username: string;
  email: string;
  phone: string;
  password: string;
}

export interface SignInResult {
  error: string | null;
  showCaptcha?: boolean;
  lockedUntil?: Date | null;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<{ error: string | null }>;
  signIn: (identifier: string, password: string) => Promise<SignInResult>;
  signOut: () => Promise<void>;
  resetPassword: (identifier: string) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    async signUp({ username, email, phone, password }) {
      if (!isValidUsername(username)) {
        return { error: 'El nombre de usuario debe tener al menos 3 caracteres (letras, números, "_" o ".").' };
      }
      if (!isValidPhone(phone)) {
        return { error: 'Ingresa un número de teléfono válido.' };
      }

      const usernameKey = normalizeUsername(username);
      const phoneKey = normalizePhone(phone);

      let createdUid: string | null = null;
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        createdUid = cred.user.uid;
        await updateProfile(cred.user, { displayName: username });

        // Reserve the username/phone as lookup docs so login can resolve
        // them back to this email. Firestore's create-vs-update rules
        // guarantee two people can't grab the same username/phone.
        await runTransaction(db, async (tx) => {
          const usernameRef = doc(db, 'usernames', usernameKey);
          const phoneRef = doc(db, 'telefonos', phoneKey);
          const [usernameSnap, phoneSnap] = await Promise.all([tx.get(usernameRef), tx.get(phoneRef)]);
          if (usernameSnap.exists()) throw new Error('username-taken');
          if (phoneSnap.exists()) throw new Error('phone-taken');
          tx.set(usernameRef, { uid: cred.user.uid, email });
          tx.set(phoneRef, { uid: cred.user.uid, email });
          tx.set(doc(db, 'usuarios', cred.user.uid), { username, email, phone, createdAt: new Date().toISOString() });
        });

        await sendEmailVerification(cred.user);
        return { error: null };
      } catch (e) {
        // Roll back the auth account if the username/phone reservation failed,
        // so the person can just try again with a different one.
        if (createdUid && auth.currentUser) {
          await deleteUser(auth.currentUser).catch(() => {});
        }
        const message = e instanceof Error ? e.message : '';
        if (message === 'username-taken') return { error: 'Ese nombre de usuario ya está en uso.' };
        if (message === 'phone-taken') return { error: 'Ese número de teléfono ya está registrado.' };
        return { error: friendlyAuthError((e as { code?: string }).code ?? '') };
      }
    },
    async signIn(identifier, password) {
      const email = await resolveEmailFromIdentifier(identifier);
      if (!email) return { error: 'No encontramos una cuenta con ese usuario, correo o teléfono.' };

      // Persisted in Firestore (not just component state) so a page reload
      // or a different device can't be used to dodge the lockout.
      const current = await getAttemptState(email);
      if (current.lockedUntil && current.lockedUntil.getTime() > Date.now()) {
        const mins = minutesRemaining(current.lockedUntil);
        return {
          error: current.mustReset
            ? `Por seguridad te enviamos un correo para restablecer tu contraseña. Vuelve a intentar en ${mins} min.`
            : `Demasiados intentos fallidos. Intenta de nuevo en ${mins} min.`,
          showCaptcha: needsCaptcha(current),
          lockedUntil: current.lockedUntil,
        };
      }

      try {
        await signInWithEmailAndPassword(auth, email, password);
        await clearAttempts(email);
        return { error: null };
      } catch (e) {
        const code = (e as { code?: string }).code ?? '';
        const isWrongCredential =
          code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found';
        if (!isWrongCredential) {
          return { error: friendlyAuthError(code) };
        }

        const updated = await recordFailedAttempt(email);
        if (updated.mustReset) {
          return {
            error: 'Detectamos demasiados intentos fallidos. Te enviamos un correo para que restablezcas tu contraseña.',
            showCaptcha: true,
            lockedUntil: updated.lockedUntil,
          };
        }
        if (updated.lockedUntil) {
          const mins = minutesRemaining(updated.lockedUntil);
          return {
            error: `Demasiados intentos fallidos. Intenta de nuevo en ${mins} min.`,
            showCaptcha: needsCaptcha(updated),
            lockedUntil: updated.lockedUntil,
          };
        }
        if (needsCaptcha(updated)) {
          return {
            error: `Usuario, correo, teléfono o contraseña incorrectos (intento ${updated.failedCount}). Completa la verificación para seguir intentando.`,
            showCaptcha: true,
            lockedUntil: null,
          };
        }
        return { error: 'Usuario, correo, teléfono o contraseña incorrectos.', showCaptcha: false, lockedUntil: null };
      }
    },
    async signOut() {
      await firebaseSignOut(auth);
    },
    async resetPassword(identifier) {
      try {
        const email = await resolveEmailFromIdentifier(identifier);
        if (!email) return { error: 'No encontramos una cuenta con ese usuario, correo o teléfono.' };
        await sendPasswordResetEmail(auth, email);
        return { error: null };
      } catch (e) {
        return { error: friendlyAuthError((e as { code?: string }).code ?? '') };
      }
    },
    async updatePassword(password) {
      try {
        if (!auth.currentUser) return { error: 'No hay sesión activa.' };
        await firebaseUpdatePassword(auth.currentUser, password);
        return { error: null };
      } catch (e) {
        return { error: friendlyAuthError((e as { code?: string }).code ?? '') };
      }
    },
    async signInWithGoogle() {
      try {
        await signInWithPopup(auth, googleProvider);
        return { error: null };
      } catch (e) {
        const code = (e as { code?: string }).code ?? '';
        if (code === 'auth/popup-closed-by-user') {
          return { error: 'Se cerró la ventana antes de completar el inicio de sesión.' };
        }
        // Google bloquea su propio inicio de sesión dentro de navegadores
        // integrados (el de Telegram, WhatsApp, Instagram, etc. al abrir un
        // link sin salir de la app) — no es un problema de esta web, y no
        // hay forma de arreglarlo desde el código: hay que salir a un
        // navegador real, o usar usuario/correo y contraseña en su lugar.
        if (
          code === 'auth/popup-blocked' ||
          code === 'auth/operation-not-supported-in-this-environment' ||
          code === 'auth/internal-error' ||
          code === 'auth/unauthorized-domain'
        ) {
          return {
            error:
              'Este navegador no permite iniciar sesión con Google (pasa dentro de apps como Telegram o WhatsApp). Abre este enlace en Chrome o Safari, o inicia sesión con tu usuario/correo y contraseña.',
          };
        }
        return { error: friendlyAuthError(code) };
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
