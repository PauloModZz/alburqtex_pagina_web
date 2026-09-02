import { useState, type FormEvent } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isFirebaseConfigured } from '../../lib/firebase';
import { checkPasswordStrength, isValidEmail } from '../../lib/validators';
import { isValidUsername } from '../../lib/identifiers';
import { DEFAULT_COUNTRY, toE164, type CountryCode } from '../../lib/phone';
import PhoneInput from '../PhoneInput';
import TurnstileWidget from './TurnstileWidget';
import SiteNav from '../layout/SiteNav';

const GOLD = '#C9973F';
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
const CAPTCHA_AFTER_ATTEMPTS = 3;

type Mode = 'login' | 'register' | 'forgot';

interface AuthPageProps {
  onBack: () => void;
  onAuthenticated: () => void;
}

export default function AuthPage({ onBack, onAuthenticated }: AuthPageProps) {
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
            El sistema de cuentas todavía no está conectado. El dueño del sitio necesita configurar
            un proyecto de Firebase (ver <code className="text-xs bg-black/5 px-1.5 py-0.5 rounded">SETUP.md</code>) antes de que el registro e inicio de sesión funcionen.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/70 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={2.25} />
            Volver
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
      setError('Completa la verificación de seguridad.');
      return;
    }

    if (mode === 'forgot') {
      if (!identifier.trim()) {
        setError('Ingresa tu usuario, correo o teléfono.');
        return;
      }
      setSubmitting(true);
      const { error: err } = await resetPassword(identifier.trim());
      setSubmitting(false);
      if (err) {
        setError(err);
        return;
      }
      setInfo('Te enviamos un correo con instrucciones para restablecer tu contraseña.');
      return;
    }

    if (mode === 'register') {
      if (!isValidUsername(username)) {
        setError('El usuario debe tener al menos 3 caracteres (letras, números, "_" o ".").');
        return;
      }
      if (!isValidEmail(email)) {
        setError('Ingresa un correo válido.');
        return;
      }
      const e164Phone = toE164(phone, phoneCountry);
      if (!e164Phone) {
        setError('Ingresa un número de teléfono válido para el país elegido.');
        return;
      }
      if (!passwordCheck.valid) {
        setError('La contraseña no cumple los requisitos mínimos.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
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
      setInfo('¡Cuenta creada! Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.');
      setMode('login');
      return;
    }

    // login
    if (!identifier.trim()) {
      setError('Ingresa tu usuario, correo o teléfono.');
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
          Volver
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
          {mode === 'login' && 'Iniciar sesión'}
          {mode === 'register' && 'Crear cuenta'}
          {mode === 'forgot' && 'Recuperar contraseña'}
        </h1>
        <p className="text-sm text-black/50 mb-8">
          {mode === 'login' && 'Ingresa con tu usuario, correo o teléfono.'}
          {mode === 'register' && 'Regístrate para hacer pedidos directamente desde la web.'}
          {mode === 'forgot' && 'Te enviaremos un enlace al correo de tu cuenta.'}
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
              Continuar con Google
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />
              <span className="text-xs text-black/35 uppercase tracking-widest">o</span>
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
                placeholder="Nombre de usuario"
                className="w-full text-sm rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors"
                autoComplete="username"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="w-full text-sm rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors"
                autoComplete="email"
              />
              <PhoneInput
                country={phoneCountry}
                onCountryChange={setPhoneCountry}
                value={phone}
                onChange={setPhone}
              />
            </>
          )}

          {mode !== 'register' && (
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Usuario, correo o teléfono"
              className="w-full text-sm rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors"
              autoComplete="username"
            />
          )}

          {mode !== 'forgot' && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full text-sm rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors"
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
          )}

          {mode === 'register' && password.length > 0 && (
            <ul className="text-xs space-y-1 -mt-1 pl-1">
              {[
                { label: 'Al menos 8 caracteres', ok: password.length >= 8 },
                { label: 'Al menos una letra', ok: /[a-zA-Z]/.test(password) },
                { label: 'Al menos un número', ok: /[0-9]/.test(password) },
              ].map((req) => (
                <li key={req.label} className="flex items-center gap-1.5">
                  {req.ok ? (
                    <Check size={12} strokeWidth={3} className="text-green-600" />
                  ) : (
                    <X size={12} strokeWidth={3} className="text-black/25" />
                  )}
                  <span className={req.ok ? 'text-black/50' : 'text-black/35'}>{req.label}</span>
                </li>
              ))}
            </ul>
          )}

          {mode === 'register' && (
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
              className="w-full text-sm rounded-full border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors"
              autoComplete="new-password"
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
              ¿Olvidaste tu contraseña?
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
              ? 'Un momento...'
              : mode === 'login'
                ? 'Iniciar sesión'
                : mode === 'register'
                  ? 'Crear cuenta'
                  : 'Enviar enlace'}
          </button>
        </form>

        <p className="text-sm text-black/50 text-center mt-6">
          {mode === 'login' && (
            <>
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => {
                  resetMessages();
                  setMode('register');
                }}
                className="font-semibold text-black hover:underline"
                style={{ color: GOLD }}
              >
                Regístrate
              </button>
            </>
          )}
          {(mode === 'register' || mode === 'forgot') && (
            <>
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => {
                  resetMessages();
                  setMode('login');
                }}
                className="font-semibold hover:underline"
                style={{ color: GOLD }}
              >
                Inicia sesión
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
