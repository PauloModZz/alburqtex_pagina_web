import { useEffect } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { LEGAL_LAST_UPDATED, LEGAL_SECTIONS } from '../data/legal';
import { WHATSAPP_LINK } from '../data/products';

const GOLD = '#C9973F';

interface LegalPageProps {
  onBack: () => void;
  scrollToId?: string;
}

export default function LegalPage({ onBack, scrollToId }: LegalPageProps) {
  useEffect(() => {
    if (scrollToId) {
      document.getElementById(scrollToId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [scrollToId]);

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}
    >
      <header className="border-b" style={{ backgroundColor: '#FAF7F2', borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-5 pb-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/70 hover:text-black transition-colors mb-4"
          >
            <ArrowLeft size={16} strokeWidth={2.25} />
            Volver
          </button>
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
            Legal
          </h1>
          <p className="text-xs text-black/45 mt-2">Última actualización: {LEGAL_LAST_UPDATED}</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14 grid lg:grid-cols-[220px_1fr] gap-10">
        {/* Tabla de contenidos */}
        <nav className="hidden lg:block sticky top-28 self-start">
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">
            Contenido
          </p>
          <ul className="space-y-2">
            {LEGAL_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-xs text-black/55 hover:text-black transition-colors leading-snug block"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contenido */}
        <div className="max-w-2xl">
          <p className="text-sm text-black/55 leading-relaxed mb-12">
            Este documento reúne nuestros Términos y Condiciones, Política de Privacidad, Política de
            Cookies y Política de Envíos y Devoluciones en un solo lugar, conforme al marco legal
            ecuatoriano de comercio electrónico y protección de datos.
          </p>

          <div className="space-y-12">
            {LEGAL_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-base sm:text-lg font-bold text-black/90 mb-4">{section.title}</h2>
                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="text-sm text-black/60 leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-black/60 leading-relaxed flex gap-2">
                        <span style={{ color: GOLD }}>—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div
            className="mt-14 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between border"
            style={{ borderColor: 'rgba(0,0,0,0.08)' }}
          >
            <p className="text-sm text-black/60">¿Tienes dudas sobre estos términos o tu pedido?</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shrink-0"
              style={{ backgroundColor: '#141414' }}
            >
              <MessageCircle size={16} strokeWidth={2.25} />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
