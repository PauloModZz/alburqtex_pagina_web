import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import PageFooter from '../layout/PageFooter';
import WhatsAppFloatButton from '../layout/WhatsAppFloatButton';
import Reveal from '../layout/Reveal';
import { BLOG_POSTS, CATEGORIA_LABEL, type Categoria } from '../../data/blog';
import { useSeo } from '../../lib/seo';

const GOLD = '#C9973F';
const PAGE_SIZE = 9;

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogIndexPage() {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useSeo({
    title: 'Blog — Confección y bordado',
    description:
      'Guías prácticas sobre confección de uniformes, bordado, archivos de logo, precios, cuidado de prendas y planificación de pedidos para empresas.',
    path: '/blog',
  });

  const featured = BLOG_POSTS.find((p) => p.destacado) ?? BLOG_POSTS[0];
  const rest = useMemo(
    () =>
      BLOG_POSTS.filter((p) => p.slug !== featured.slug).filter((p) => !categoria || p.categoria === categoria),
    [categoria, featured.slug],
  );

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}>
      <PageHeader
        eyebrow="Aprende"
        title="Blog"
        description="Guías directas, sin relleno, sobre confección, bordado, archivos, precios, cuidados y uniformes para empresas."
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategoria(null)}
            className="text-xs font-semibold rounded-full px-3.5 py-2 border transition-colors"
            style={
              categoria === null
                ? { backgroundColor: '#141414', color: '#fff', borderColor: '#141414' }
                : { backgroundColor: 'transparent', color: '#141414', borderColor: 'rgba(0,0,0,0.15)' }
            }
          >
            Todas
          </button>
          {(Object.keys(CATEGORIA_LABEL) as Categoria[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoria(cat)}
              className="text-xs font-semibold rounded-full px-3.5 py-2 border transition-colors"
              style={
                categoria === cat
                  ? { backgroundColor: '#141414', color: '#fff', borderColor: '#141414' }
                  : { backgroundColor: 'transparent', color: '#141414', borderColor: 'rgba(0,0,0,0.15)' }
              }
            >
              {CATEGORIA_LABEL[cat]}
            </button>
          ))}
        </div>
        {!categoria && (
          <Reveal>
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid sm:grid-cols-[1.1fr_1fr] gap-6 rounded-2xl overflow-hidden bg-white border mb-12 transition-shadow hover:shadow-lg"
            style={{ borderColor: 'rgba(0,0,0,0.07)' }}
          >
            <div
              className="aspect-[16/10] sm:aspect-auto flex items-center justify-center p-8"
              style={{ backgroundColor: 'rgba(201,151,63,0.12)' }}
            >
              <span
                style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(28px, 5vw, 44px)', color: GOLD, lineHeight: 1.05, textTransform: 'uppercase' }}
              >
                {featured.titulo}
              </span>
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <span className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: GOLD }}>
                Destacado · {CATEGORIA_LABEL[featured.categoria]}
              </span>
              <h2 className="text-xl font-bold text-black/90 mb-3 leading-snug">{featured.titulo}</h2>
              <p className="text-sm text-black/55 leading-relaxed mb-4">{featured.extracto}</p>
              <div className="flex items-center gap-3 text-xs text-black/40 mb-4">
                <span>{formatFecha(featured.fecha)}</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} strokeWidth={2} />
                  {featured.tiempoLectura} min
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-black/85 group-hover:gap-2.5 transition-all">
                Leer artículo <ArrowRight size={15} strokeWidth={2.25} />
              </span>
            </div>
          </Link>
          </Reveal>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.slice(0, visible).map((post, i) => (
            <Reveal key={post.slug} delay={(i % 6) * 70} className="h-full">
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white border transition-shadow hover:shadow-lg"
                style={{ borderColor: 'rgba(0,0,0,0.06)' }}
              >
                <div
                  className="aspect-[16/10] flex items-center justify-center p-6"
                  style={{ backgroundColor: 'rgba(201,151,63,0.08)' }}
                >
                  <span className="text-xs font-semibold text-center text-black/40 leading-snug">{CATEGORIA_LABEL[post.categoria]}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: GOLD }}>
                    {CATEGORIA_LABEL[post.categoria]}
                  </span>
                  <h3 className="text-sm font-bold text-black/85 leading-snug mb-2 group-hover:underline">{post.titulo}</h3>
                  <p className="text-xs text-black/50 leading-relaxed mb-3 line-clamp-3">{post.extracto}</p>
                  <div className="mt-auto flex items-center gap-3 text-[11px] text-black/40">
                    <span>{formatFecha(post.fecha)}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} strokeWidth={2} />
                      {post.tiempoLectura} min
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {rest.length === 0 && (
          <p className="text-sm text-black/40 text-center py-16">Todavía no hay artículos en esta categoría.</p>
        )}

        {visible < rest.length && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide border transition-colors hover:bg-black/5"
              style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#141414' }}
            >
              Ver más artículos
            </button>
          </div>
        )}
      </main>

      <PageFooter />
      <WhatsAppFloatButton message="Hola, vi el blog de Alburqtex y quisiera más información." />
    </div>
  );
}
