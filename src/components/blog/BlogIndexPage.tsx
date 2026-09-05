import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import PageFooter from '../layout/PageFooter';
import WhatsAppFloatButton from '../layout/WhatsAppFloatButton';
import Reveal from '../layout/Reveal';
import { BLOG_POSTS, CATEGORIA_LABEL, type Categoria } from '../../data/blog';
import { useSeo } from '../../lib/seo';
import { useLanguage } from '../../context/LanguageContext';
import { BLOG_EN } from '../../data/en';

const GOLD = '#C9973F';
const PAGE_SIZE = 9;
const CATEGORY_GROUPS: { label: string; items: Categoria[] }[] = [
  { label: 'Lo que hacemos', items: ['bordado', 'estampado', 'sublimacion', 'confeccion'] },
  { label: 'Guías prácticas', items: ['antes-de-pedir', 'cuidados', 'para-empresas'] },
];

const CATEGORY_EN: Record<Categoria, string> = {
  'antes-de-pedir': 'Before ordering', bordado: 'Embroidery', estampado: 'Printing', sublimacion: 'Sublimation',
  confeccion: 'Manufacturing', cuidados: 'Care', 'para-empresas': 'For companies',
};

function formatFecha(iso: string, isEnglish: boolean) {
  return new Date(iso).toLocaleDateString(isEnglish ? 'en-US' : 'es-EC', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogIndexPage() {
  const { isEnglish, localizePath } = useLanguage();
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useSeo({
    title: isEnglish ? 'Blog — Custom apparel and textile production' : 'Blog — Personalización y confección textil',
    description:
      isEnglish ? 'Practical guides to embroidery, textile printing, sublimation, custom garment manufacturing, apparel care and company uniforms.' : 'Guías prácticas sobre bordado, estampado, sublimación, confección textil, cuidados y planificación de uniformes para empresas.',
    path: '/blog',
  });

  const featured = BLOG_POSTS.find((p) => p.destacado) ?? BLOG_POSTS[0];
  const categoryCounts = useMemo(
    () =>
      BLOG_POSTS.reduce<Partial<Record<Categoria, number>>>((counts, post) => {
        counts[post.categoria] = (counts[post.categoria] ?? 0) + 1;
        return counts;
      }, {}),
    [],
  );
  const rest = useMemo(
    () =>
      BLOG_POSTS.filter((p) => p.slug !== featured.slug).filter((p) => !categoria || p.categoria === categoria),
    [categoria, featured.slug],
  );

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}>
      <PageHeader
        eyebrow={isEnglish ? 'Learn' : 'Aprende'}
        title="Blog"
        description={isEnglish ? 'Straightforward guides to embroidery, printing, sublimation, custom apparel, garment care and company uniforms.' : 'Guías directas sobre bordado, estampado, sublimación, confección textil, cuidados y uniformes para empresas.'}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <section
          aria-label={isEnglish ? 'Filter articles by topic' : 'Filtrar artículos por tema'}
          className="mb-12 overflow-hidden rounded-2xl border bg-white"
          style={{ borderColor: 'rgba(0,0,0,0.08)' }}
        >
          <div className="flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{isEnglish ? 'Workshop index' : 'Índice del taller'}</p>
              <h2 className="mt-1 text-lg font-bold text-black/90">{isEnglish ? 'Explore by topic' : 'Explora por tema'}</h2>
            </div>
            <button
              type="button"
              onClick={() => setCategoria(null)}
              aria-pressed={categoria === null}
              className="group inline-flex w-fit items-center gap-3 rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: categoria === null ? '#141414' : '#FAF7F2',
                color: categoria === null ? '#fff' : '#141414',
                borderColor: categoria === null ? '#141414' : 'rgba(0,0,0,0.1)',
                '--tw-ring-color': GOLD,
              } as CSSProperties}
            >
              {isEnglish ? 'View all' : 'Ver todos'}
              <span className={categoria === null ? 'text-white/55' : 'text-black/35'}>{BLOG_POSTS.length}</span>
            </button>
          </div>

          <div className="grid gap-0 sm:grid-cols-2 sm:divide-x" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
            {CATEGORY_GROUPS.map((group, groupIndex) => (
              <div key={group.label} className="min-w-0 px-5 py-5 sm:px-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">{isEnglish ? (groupIndex === 0 ? 'What we do' : 'Practical guides') : group.label}</p>
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap">
                  {group.items.map((cat) => {
                    const active = categoria === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategoria(active ? null : cat)}
                        aria-pressed={active}
                        className="relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-lg border px-3.5 py-2.5 text-xs font-semibold transition-all hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        style={{
                          backgroundColor: active ? '#141414' : '#fff',
                          color: active ? '#fff' : '#141414',
                          borderColor: active ? '#141414' : 'rgba(0,0,0,0.11)',
                          '--tw-ring-color': GOLD,
                        } as CSSProperties}
                      >
                        <span
                          aria-hidden="true"
                          className="h-4 w-0.5 rounded-full transition-colors"
                          style={{ backgroundColor: active ? GOLD : 'rgba(201,151,63,0.38)' }}
                        />
                        {isEnglish ? CATEGORY_EN[cat] : CATEGORIA_LABEL[cat]}
                        <span className={active ? 'text-white/45' : 'text-black/30'}>{categoryCounts[cat] ?? 0}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
        {!categoria && (
          <Reveal>
          <Link
            to={localizePath(`/blog/${featured.slug}`)}
            className="group grid sm:grid-cols-[1.1fr_1fr] gap-6 rounded-2xl overflow-hidden bg-white border mb-12 transition-shadow hover:shadow-lg"
            style={{ borderColor: 'rgba(0,0,0,0.07)' }}
          >
            <div className="aspect-[16/10] sm:aspect-auto overflow-hidden bg-black/5">
              <img
                src={featured.imagen}
                alt={isEnglish ? BLOG_EN[featured.slug]?.imageAlt ?? featured.imagenAlt : featured.imagenAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fetchPriority="high"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <span className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: GOLD }}>
                {isEnglish ? 'Featured' : 'Destacado'} · {isEnglish ? CATEGORY_EN[featured.categoria] : CATEGORIA_LABEL[featured.categoria]}
              </span>
              <h2 className="text-xl font-bold text-black/90 mb-3 leading-snug">{isEnglish ? BLOG_EN[featured.slug]?.title ?? featured.titulo : featured.titulo}</h2>
              <p className="text-sm text-black/55 leading-relaxed mb-4">{isEnglish ? BLOG_EN[featured.slug]?.excerpt ?? featured.extracto : featured.extracto}</p>
              <div className="flex items-center gap-3 text-xs text-black/40 mb-4">
                <span>{formatFecha(featured.fecha, isEnglish)}</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} strokeWidth={2} />
                  {featured.tiempoLectura} min
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-black/85 group-hover:gap-2.5 transition-all">
                {isEnglish ? 'Read article' : 'Leer artículo'} <ArrowRight size={15} strokeWidth={2.25} />
              </span>
            </div>
          </Link>
          </Reveal>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.slice(0, visible).map((post, i) => (
            <Reveal key={post.slug} delay={(i % 6) * 70} className="h-full">
              <Link
                to={localizePath(`/blog/${post.slug}`)}
                className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white border transition-shadow hover:shadow-lg"
                style={{ borderColor: 'rgba(0,0,0,0.06)' }}
              >
                <div className="aspect-[16/10] overflow-hidden bg-black/5">
                  <img
                    src={post.imagen}
                    alt={isEnglish ? BLOG_EN[post.slug]?.imageAlt ?? post.imagenAlt : post.imagenAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: GOLD }}>
                    {isEnglish ? CATEGORY_EN[post.categoria] : CATEGORIA_LABEL[post.categoria]}
                  </span>
                  <h3 className="text-sm font-bold text-black/85 leading-snug mb-2 group-hover:underline">{isEnglish ? BLOG_EN[post.slug]?.title ?? post.titulo : post.titulo}</h3>
                  <p className="text-xs text-black/50 leading-relaxed mb-3 line-clamp-3">{isEnglish ? BLOG_EN[post.slug]?.excerpt ?? post.extracto : post.extracto}</p>
                  <div className="mt-auto flex items-center gap-3 text-[11px] text-black/40">
                    <span>{formatFecha(post.fecha, isEnglish)}</span>
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
          <p className="text-sm text-black/40 text-center py-16">{isEnglish ? 'There are no articles in this category yet.' : 'Todavía no hay artículos en esta categoría.'}</p>
        )}

        {visible < rest.length && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide border transition-colors hover:bg-black/5"
              style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#141414' }}
            >
              {isEnglish ? 'View more articles' : 'Ver más artículos'}
            </button>
          </div>
        )}
      </main>

      <PageFooter />
      <WhatsAppFloatButton message={isEnglish ? 'Hello, I read the Alburqtex blog and would like more information.' : 'Hola, vi el blog de Alburqtex y quisiera más información.'} />
    </div>
  );
}
