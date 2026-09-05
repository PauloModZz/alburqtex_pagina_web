import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type Language = 'es' | 'en';

interface LanguageContextValue {
  language: Language;
  isEnglish: boolean;
  localizePath: (path: string) => string;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = 'alburqtex-language';

function withoutEnglishPrefix(path: string) {
  const clean = path.replace(/^\/en(?=\/|$)/, '');
  return clean || '/';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isEnglish = /^\/en(?:\/|$)/.test(location.pathname);
  const language: Language = isEnglish ? 'en' : 'es';

  useEffect(() => {
    document.documentElement.lang = language;
    // Preserve first-visit browser detection: do not write Spanish before the
    // following effect has had a chance to inspect an empty preference.
    if (location.pathname !== '/' || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, language);
    }
  }, [language, location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const saved = localStorage.getItem(STORAGE_KEY);
    const preferred = navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es';
    if ((saved ?? preferred) === 'en') navigate('/en', { replace: true });
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (!isEnglish) return;
    const keepEnglish = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target === '_blank' || anchor.origin !== window.location.origin) return;
      const target = new URL(anchor.href);
      if (target.pathname.startsWith('/en') || target.pathname.startsWith('/assets')) return;
      event.preventDefault();
      navigate(`/en${target.pathname === '/' ? '' : target.pathname}${target.search}${target.hash}`);
    };
    document.addEventListener('click', keepEnglish, true);
    return () => document.removeEventListener('click', keepEnglish, true);
  }, [isEnglish, navigate]);

  const localizePath = (path: string) => {
    if (!path.startsWith('/')) return path;
    const spanishPath = withoutEnglishPrefix(path);
    return isEnglish ? `/en${spanishPath === '/' ? '' : spanishPath}` : spanishPath;
  };

  const setLanguage = (nextLanguage: Language) => {
    localStorage.setItem(STORAGE_KEY, nextLanguage);
    const spanishPath = withoutEnglishPrefix(location.pathname);
    const pathname = nextLanguage === 'en' ? `/en${spanishPath === '/' ? '' : spanishPath}` : spanishPath;
    navigate(`${pathname}${location.search}${location.hash}`);
  };

  return (
    <LanguageContext.Provider value={{ language, isEnglish, localizePath, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  return value;
}
