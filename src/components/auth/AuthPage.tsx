import { useState, type FormEvent } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isFirebaseConfigured } from '../../lib/firebase';
import { checkPasswordStrength, isValidEmail, PASSWORD_REQUIREMENTS } from '../../lib/validators';
import { isValidUsername } from '../../lib/identifiers';
import { DEFAULT_COUNTRY, toE164, type CountryCode } from '../../lib/phone';
import PhoneInput from '../PhoneInput';
import TurnstileWidget from './TurnstileWidget';
import SiteNav from '../layout/SiteNav';
import { useLanguage } from '../../context/LanguageContext';

const GOLD = '#C9973F';
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
const CAPTCHA_AFTER_ATTEMPTS = 3;

type Mode = 'login' | 'register' | 'forgot';

/** Mensaje de validación en vivo bajo un campo — verde si cumple, rojo si no. */
function FieldHint({ show, ok, okLabel, badLabel }: { show: boolean; ok: boolean; okLabel: string; badLabel: string }) {
  if (!show) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs -mt-1.5 pl-1">
      {ok ? (
        <Check size={12} strokeWidth={3} className="text-green-600 shrink-0" />
      ) : (
        <X size={12} strokeWidth={3} className="text-red-500 shrink-0" />
      )}
      <span className={ok ? 'text-black/50' : 'text-red-600'}>{ok ? okLabel : badLabel}</span>
    </p>
  );
}

interface AuthPageProps {
  onBack: () => void;
  onAuthenticated: () => void;
}

export default function AuthPage({ onBack, onAuthenticated }: AuthPageProps) {
  const { isEnglish } = useLanguage();
  const { signIn, signUp, resetPassword, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [identifier, setIdentifier] = useState(''); // login/forgot: correo, usuario o teléfono
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [registerAttempts, setRegisterAttempts] = useState(0);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loginShowCaptcha, setLoginShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | undefined>(undefined);

  const needsCaptcha =
    Boolean(TURNSTILE_SITE_KEY) &&
    (mode === 'register' ? registerAttempts >= CAPTCHA_AFTER_ATTEMPTS - 1 : mode === 'login' ? loginShowCaptcha : false);
  const passwordCheck = checkPasswordStrength(password);

  if (!isFirebaseConfigured) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center px-4"
        style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}
      >
        <SiteNav />
        <div className="max-w-md text-center">
          <p className="text-sm text-black/60 leading-relaxed mb-6">
            {isEnglish ? 'The account system is not configured yet. Firebase must be connected before registration and sign-in can work.' : <>El sistema de cuentas todavía no está conectado. El dueño del sitio necesita configurar un proyecto de Firebase (ver <code className="text-xs bg-black/5 px-1.5 py-0.5 rounded">SETUP.md</code>) antes de que el registro e inicio de sesión funcionen.</>}
          </p>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/70 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={2.25} />
            {isEnglish ? 'Back' : 'Volver'}
          </button>
        </div>
      </div>
    );
  }

  const resetMessages = () => {
    setError(null);
    setInfo(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (needsCaptcha && !captchaToken) {
      setError(isEnglish ? 'Complete the security verification.' : 'Completa la verificación de seguridad.');
      return;
    }

    if (mode === 'forgot') {
      if (!identifier.trim()) {
        setError(isEnglish ? 'Enter your username, email or phone number.' : 'Ingresa tu usuario, correo o teléfono.');
        return;
      }
      setSubmitting(true);
      const { error: err } = await resetPassword(identifier.trim());
      setSubmitting(false);
      if (err) {
        setError(err);
        return;
      }
      setInfo(isEnglish ? 'We sent password reset instructions to your email.' : 'Te enviamos un correo con instrucciones para restablecer tu contraseña.');
      return;
    }

    if (mode === 'register') {
      if (!isValidUsername(username)) {
        setError(isEnglish ? 'The username must contain at least 3 characters: letters, numbers, “_” or “.”.' : 'El usuario debe tener al menos 3 caracteres (letras, números, "_" o ".").');
        return;
      }
      if (!isValidEmail(email)) {
        setError(isEnglish ? 'Enter a valid email address.' : 'Ingresa un correo válido.');
        return;
      }
      const e164Phone = toE164(phone, phoneCountry);
      if (!e164Phone) {
        setError(isEnglish ? 'Enter a valid phone number for the selected country.' : 'Ingresa un número de teléfono válido para el país elegido.');
        return;
      }
      if (!passwordCheck.valid) {
        setError(isEnglish ? 'The password does not meet the minimum requirements.' : 'La contraseña no cumple los requisitos mínimos.');
        return;
      }
      if (password !== confirmPassword) {
        setError(isEnglish ? 'Passwords do not match.' : 'Las contraseñas no coinciden.');
        return;
      }
      setSubmitting(true);
      const { error: err } = await signUp({ username: username.trim(), email: email.trim(), phone: e164Phone, password });
      setSubmitting(false);
      if (err) {
        setError(err);
        setRegisterAttempts((a) => a + 1);
        return;
      }
      setInfo(isEnglish ? 'Account created! Check your email before signing in.' : '¡Cuenta creada! Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.');
      setMode('login');
      return;
    }

    // login
    if (!identifier.trim()) {
      setError(isEnglish ? 'Enter your username, email or phone number.' : 'Ingresa tu usuario, correo o teléfono.');
      return;
    }
    setSubmitting(true);
    const { error: err, showCaptcha } = await signIn(identifier.trim(), password);
    setSubmitting(false);
    if (err) {
      setError(err);
      setLoginShowCaptcha(Boolean(showCaptcha));
      setCaptchaToken(undefined);
      return;
    }
    onAuthenticated();
  };

  const handleGoogle = async () => {
    resetMessages();
    setSubmitting(true);
    const { error: err } = await signInWithGoogle();
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    onAuthenticated();
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}
    >
      <SiteNav />
      <div className="w-full max-w-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/60 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={16} strokeWidth={2.25} />
          {isEnglish ? 'Back' : 'Volver'}
        </button>

        <h1
          className="mb-1"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: '32px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#141414',
          }}
        >
          {mode === 'login' && (isEnglish ? 'Sign in' : 'Iniciar sesión')}
          {mode === 'register' && (isEnglish ? 'Create account' : 'Crear cuenta')}
          {mode === 'forgot' && (isEnglish ? 'Reset password' : 'Recuperar contraseña')}
        </h1>
        <p className="text-sm text-black/50 mb-8">
          {mode === 'login' && (isEnglish ? 'Use your username, email or phone number.' : 'Ingresa con tu usuario, correo o teléfono.')}
          {mode === 'register' && (isEnglish ? 'Register to place orders directly on the website.' : 'Regístrate para hacer pedidos directamente desde la web.')}
          {mode === 'forgot' && (isEnglish ? 'We will send a reset link to your account email.' : 'Te enviaremos un enlace al correo de tu cuenta.')}
        </p>

        {mode !== 'forgot' && (
          <>
            <button
              type="button"
              onClick={handleGoogle}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold border transition-colors hover:bg-black/5 disabled:opacity-50 mb-6"
              style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#141414' }}
            >
              {isEnglish ? 'Continue with Google' : 'Continuar con Google'}
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />
              <span className="text-xs text-black/35 uppercase tracking-widest">{isEnglish ? 'or' : 'o'}</span>
              <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {mode === 'register' && (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={isEnglish ? 'Username' : 'Nombre de usuario'}
                className="w-full text-sm rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors"
                autoComplete="username"
              />
              <FieldHint
                show={username.length > 0}
                ok={isValidUsername(username)}
                okLabel={isEnglish ? 'Valid username' : 'Usuario válido'}
                badLabel={isEnglish ? 'At least 3 characters: letters, numbers, “_” or “.”' : 'Mínimo 3 caracteres: letras, números, "_" o "."'}
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isEnglish ? 'Email address' : 'Correo electrónico'}
                className="w-full text-sm rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors"
                autoComplete="email"
              />
              <FieldHint
                show={email.length > 0}
                ok={isValidEmail(email)}
                okLabel={isEnglish ? 'Valid email' : 'Correo válido'}
                badLabel={isEnglish ? 'Enter a valid email address' : 'Ingresa un correo válido (ej: nombre@correo.com)'}
              />

              <PhoneInput
                country={phoneCountry}
                onCountryChange={setPhoneCountry}
                value={phone}
                onChange={setPhone}
              />
              <FieldHint
                show={phone.length > 0}
                ok={toE164(phone, phoneCountry) !== null}
                okLabel={isEnglish ? 'Valid number' : 'Número válido'}
                badLabel={isEnglish ? 'Enter a valid number for the selected country' : 'Ingresa un número válido para el país elegido'}
              />
            </>
          )}

          {mode !== 'register' && (
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={isEnglish ? 'Username, email or phone' : 'Usuario, correo o teléfono'}
              className="w-full text-sm rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors"
              autoComplete="username"
            />
          )}

          {mode !== 'forgot' && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              placeholder={isEnglish ? 'Password' : 'Contraseña'}
              className="w-full text-sm rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors"
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
          )}

          {mode === 'register' && (passwordFocused || password.length > 0) && (
            <ul className="text-xs grid grid-cols-2 gap-x-3 gap-y-1 -mt-1 pl-1">
              {PASSWORD_REQUIREMENTS.map((req) => {
                const ok = req.test(password);
                return (
                  <li key={req.label} className="flex items-center gap-1.5 transition-colors">
                    {ok ? (
                      <Check size={12} strokeWidth={3} className="text-green-600 shrink-0" />
                    ) : (
                      <X size={12} strokeWidth={3} className="text-black/25 shrink-0" />
                    )}
                    <span className={ok ? 'text-black/50' : 'text-black/35'}>{req.label}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {mode === 'register' && (
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={isEnglish ? 'Confirm password' : 'Confirmar contraseña'}
              className="w-full text-sm rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors"
              autoComplete="new-password"
            />
          )}

          {mode === 'register' && (
            <FieldHint
              show={confirmPassword.length > 0}
              ok={confirmPassword === password}
              okLabel={isEnglish ? 'Passwords match' : 'Las contraseñas coinciden'}
              badLabel={isEnglish ? 'Passwords do not match' : 'Las contraseñas no coinciden'}
            />
          )}

          {mode === 'login' && (
            <button
              type="button"
              onClick={() => {
                resetMessages();
                setMode('forgot');
              }}
              className="text-xs text-black/45 hover:text-black text-left transition-colors -mt-1"
            >
              {isEnglish ? 'Forgot your password?' : '¿Olvidaste tu contraseña?'}
            </button>
          )}

          {needsCaptcha && TURNSTILE_SITE_KEY && (
            <div className="pt-1">
              <TurnstileWidget siteKey={TURNSTILE_SITE_KEY} onVerify={setCaptchaToken} onExpire={() => setCaptchaToken(undefined)} />
            </div>
          )}

          {error && <p className="text-xs text-red-600">{error}</p>}
          {info && <p className="text-xs text-green-700">{info}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 mt-1"
            style={{ backgroundColor: '#141414' }}
          >
            {submitting
              ? (isEnglish ? 'Please wait...' : 'Un momento...')
              : mode === 'login'
                ? (isEnglish ? 'Sign in' : 'Iniciar sesión')
                : mode === 'register'
                  ? (isEnglish ? 'Create account' : 'Crear cuenta')
                  : (isEnglish ? 'Send reset link' : 'Enviar enlace')}
          </button>
        </form>

        <p className="text-sm text-black/50 text-center mt-6">
          {mode === 'login' && (
            <>
              {isEnglish ? 'New to Alburqtex? ' : '¿No tienes cuenta? '}
              <button
                type="button"
                onClick={() => {
                  resetMessages();
                  setMode('register');
                }}
                className="font-semibold text-black hover:underline"
                style={{ color: GOLD }}
              >
                {isEnglish ? 'Create an account' : 'Regístrate'}
              </button>
            </>
          )}
          {(mode === 'register' || mode === 'forgot') && (
            <>
              {isEnglish ? 'Already have an account? ' : '¿Ya tienes cuenta? '}
              <button
                type="button"
                onClick={() => {
                  resetMessages();
                  setMode('login');
                }}
                className="font-semibold hover:underline"
                style={{ color: GOLD }}
              >
                {isEnglish ? 'Sign in' : 'Inicia sesión'}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
