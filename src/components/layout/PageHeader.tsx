import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import SiteNav from './SiteNav';

const GOLD = '#C9973F';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  extra?: ReactNode;
}

/** Encabezado compartido por las páginas nuevas — mismo patrón que ya usa LegalPage. */
export default function PageHeader({ eyebrow, title, description, extra }: PageHeaderProps) {
  const navigate = useNavigate();

  // Vuelve a la página anterior de verdad (guía de tallas, catálogo, un
  // artículo del blog...), no siempre al inicio. Si no hay una página
  // anterior dentro del sitio (se entró directo por un link externo), no
  // hay a dónde "volver" dentro del historial, así que ahí sí cae al inicio.
  const handleBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx;
    if (typeof idx === 'number' && idx > 0) navigate(-1);
    else navigate('/');
  };

  return (
    <header className="border-b" style={{ backgroundColor: '#FAF7F2', borderColor: 'rgba(0,0,0,0.08)' }}>
      <SiteNav />
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-5 pb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/70 hover:text-black transition-colors mb-4"
        >
          <ArrowLeft size={16} strokeWidth={2.25} />
          Volver
        </button>
        <span
          className="text-xs font-semibold uppercase tracking-widest block mb-2"
          style={{ color: GOLD, letterSpacing: '0.18em' }}
        >
          {eyebrow}
        </span>
        <h1
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(28px, 5vw, 48px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#141414',
          }}
        >
          {title}
        </h1>
        {description && <p className="text-sm text-black/55 mt-3 max-w-2xl leading-relaxed">{description}</p>}
        {extra}
      </div>
    </header>
  );
}
