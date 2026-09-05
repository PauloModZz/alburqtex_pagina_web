import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import { useLanguage } from '../../context/LanguageContext';

/** Footer ya existente, conectado a la ruta real /legal para las páginas nuevas. */
export default function PageFooter() {
  const navigate = useNavigate();
  const { localizePath } = useLanguage();
  return <Footer onOpenLegal={(sectionId) => navigate(localizePath(sectionId ? `/legal?section=${sectionId}` : '/legal'))} />;
}
