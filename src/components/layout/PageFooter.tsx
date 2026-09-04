import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

/** Footer ya existente, conectado a la ruta real /legal para las páginas nuevas. */
export default function PageFooter() {
  const navigate = useNavigate();
  return <Footer onOpenLegal={(sectionId) => navigate(sectionId ? `/legal?section=${sectionId}` : '/legal')} />;
}
