import { useNavigate, useSearchParams } from 'react-router-dom';
import LegalPage from '../LegalPage';
import { useSeo } from '../../lib/seo';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Punto de entrada por URL real (/legal?section=privacidad) a la página legal
 * que ya existía — LegalPage no se tocó, esto solo la monta desde afuera de
 * AppShell para que las páginas nuevas puedan enlazarla con una URL de verdad.
 */
export default function LegalPageRoute() {
  const { isEnglish, localizePath } = useLanguage();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useSeo({
    title: isEnglish ? 'Terms, privacy and cookies' : 'Términos, privacidad y cookies',
    description: isEnglish ? 'Alburqtex terms, privacy, cookie, shipping and returns policies.' : 'Términos y condiciones, política de privacidad, cookies y envíos/devoluciones de Alburqtex.',
    path: '/legal',
  });

  return <LegalPage onBack={() => navigate(localizePath('/'))} scrollToId={params.get('section') ?? undefined} />;
}
