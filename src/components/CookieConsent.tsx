import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY = 'alburqtex-cookie-consent';

interface CookieConsentProps {
  onOpenLegal: (sectionId?: string) => void;
}

export default function CookieConsent({ onOpenLegal }: CookieConsentProps) {
  const { isEnglish } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : 'accepted';
    if (!saved) setVisible(true);
  }, []);

  const choose = (value: 'accepted' | 'rejected') => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[100] border-t"
      style={{ backgroundColor: '#141414', borderColor: 'rgba(255,255,255,0.1)', fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-xs sm:text-sm text-white/65 leading-relaxed max-w-2xl">
          {isEnglish
            ? 'We use essential storage to remember your preference. We do not use advertising or third-party analytics cookies. '
            : 'Usamos almacenamiento esencial para recordar tu preferencia. No usamos cookies de publicidad ni analítica de terceros. '}
          <button
            type="button"
            onClick={() => onOpenLegal('cookies')}
            className="underline underline-offset-2 hover:text-white transition-colors"
          >
            {isEnglish ? 'View cookie policy' : 'Ver política de cookies'}
          </button>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => choose('rejected')}
            className="text-xs font-semibold uppercase tracking-wide rounded-full px-4 py-2.5 border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-colors"
          >
            {isEnglish ? 'Reject' : 'Rechazar'}
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="text-xs font-semibold uppercase tracking-wide rounded-full px-4 py-2.5 text-black transition-colors"
            style={{ backgroundColor: '#C9973F' }}
          >
            {isEnglish ? 'Accept' : 'Aceptar'}
          </button>
        </div>
      </div>
    </div>
  );
}
