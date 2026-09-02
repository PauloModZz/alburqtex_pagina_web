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

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{ backgroundColor: 'rgba(250,247,242,0.95)', backdropFilter: 'blur(8px)', borderColor: 'rgba(0,0,0,0.08)' }}
    >
      <SiteNav />
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-5 pb-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/70 hover:text-black transition-colors mb-4"
        >
          <ArrowLeft size={16} strokeWidth={2.25} />
          Inicio
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
