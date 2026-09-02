import { initializeApp, getApps } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

export const isFirebaseConfigured = Boolean(
  config.apiKey && config.projectId && !config.projectId.includes('tu-proyecto'),
);

// When the real credentials haven't been set yet, we still initialize against
// harmless placeholders so importing this module never crashes the whole
// app — screens that need it show a clear "not configured" state instead.
const app =
  getApps()[0] ??
  initializeApp(
    isFirebaseConfigured
      ? config
      : {
          apiKey: 'placeholder',
          authDomain: 'placeholder.firebaseapp.com',
          projectId: 'placeholder',
          messagingSenderId: '0',
          appId: 'placeholder',
        },
  );

export const auth = getAuth(app);
export const db = getFirestore(app);

// App Check protege las llamadas a Auth/Firestore/Storage contra bots y
// abuso automatizado. Es opcional mientras no tengas una site key de
// reCAPTCHA v3 (ver SETUP.md) — sin ella, el sitio funciona igual.
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
if (isFirebaseConfigured && recaptchaSiteKey) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaSiteKey),
    isTokenAutoRefreshEnabled: true,
  });
}
