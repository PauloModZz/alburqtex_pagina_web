import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Check, Clock, Link2, MessageCircle } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import PageFooter from '../layout/PageFooter';
import WhatsAppFloatButton from '../layout/WhatsAppFloatButton';
import ContentBlocks from './ContentBlocks';
import { BLOG_POSTS_BY_SLUG, CATEGORIA_LABEL } from '../../data/blog';
import { WHATSAPP_LINK } from '../../data/products';
import { useSeo, useJsonLd, SITE_URL, SITE_NAME } from '../../lib/seo';

const GOLD = '#C9973F';

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const post = slug ? BLOG_POSTS_BY_SLUG[slug] : undefined;

  useSeo(
    post
      ? {
          title: post.metaTitulo,
          description: post.metaDescripcion,
          path: `/blog/${post.slug}`,
          image: `${SITE_URL}${post.imagen}`,
        }
      : { title: 'Blog', description: 'Blog de Alburqtex', path: '/blog' },
  );

  useJsonLd(
    'article-jsonld',
    post
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.titulo,
          description: post.metaDescripcion,
          datePublished: post.fecha,
          author: { '@type': 'Organization', name: SITE_NAME },
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          image: `${SITE_URL}${post.imagen}`,
        }
      : null,
  );

  if (!post) return <Navigate to="/blog" replace />;

  const toc = post.cuerpo.filter((b) => b.type === 'h2') as { type: 'h2'; text: string; id: string }[];
  const relacionados = post.relacionados.map((s) => BLOG_POSTS_BY_SLUG[s]).filter(Boolean).slice(0, 3);
  const shareUrl = `${SITE_URL}/blog/${post.slug}`;

  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const midIndex = Math.floor(post.cuerpo.length / 2);
  const firstHalf = post.cuerpo.slice(0, midIndex);
  const secondHalf = post.cuerpo.slice(midIndex);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}>
      <PageHeader eyebrow={CATEGORIA_LABEL[post.categoria]} title={post.titulo} />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <figure className="aspect-[16/8] overflow-hidden rounded-2xl mb-8 bg-black/5">
          <img src={post.imagen} alt={post.imagenAlt} className="w-full h-full object-cover" fetchPriority="high" />
        </figure>
        <div className="flex items-center gap-4 text-xs text-black/45 mb-10 max-w-[68ch]">
          <span>{formatFecha(post.fecha)}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} strokeWidth={2} />
            {post.tiempoLectura} min de lectura
          </span>
          <span>{post.autor}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_220px] gap-10">
          <article>
            <ContentBlocks blocks={firstHalf} />

            <div
              className="max-w-[68ch] my-8 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
              style={{ backgroundColor: 'rgba(201,151,63,0.08)' }}
            >
              <p className="text-sm text-black/70">¿Tienes un caso puntual? Te asesoramos directo por WhatsApp.</p>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Hola, leí el artículo "${post.titulo}" y tengo una consulta.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shrink-0"
                style={{ backgroundColor: '#141414' }}
              >
                <MessageCircle size={15} strokeWidth={2.25} />
                Consultar
              </a>
            </div>

            <ContentBlocks blocks={secondHalf} />

            <div className="max-w-[68ch] flex items-center gap-4 mt-10 pt-6 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              <span className="text-xs font-semibold uppercase tracking-widest text-black/40">Compartir</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.titulo} — ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir por WhatsApp"
                className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-black/5 transition-colors"
                style={{ borderColor: 'rgba(0,0,0,0.15)' }}
              >
                <MessageCircle size={15} strokeWidth={2} />
              </a>
              <button
                type="button"
                onClick={copyLink}
                aria-label="Copiar enlace"
                className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-black/5 transition-colors"
                style={{ borderColor: 'rgba(0,0,0,0.15)' }}
              >
                {copied ? <Check size={15} strokeWidth={2.25} /> : <Link2 size={15} strokeWidth={2} />}
              </button>
            </div>

            <div
              className="max-w-[68ch] mt-10 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-4 justify-between border"
              style={{ borderColor: 'rgba(0,0,0,0.08)' }}
            >
              <p className="text-sm font-semibold text-black/85">¿Listo para cotizar tu bordado?</p>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hola, leí el blog de Alburqtex y quiero cotizar mi pedido.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shrink-0"
                style={{ backgroundColor: '#141414' }}
              >
                Cotizar ahora
                <ArrowRight size={16} strokeWidth={2.25} />
              </a>
            </div>

            {relacionados.length > 0 && (
              <div className="mt-14">
                <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-4">Artículos relacionados</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relacionados.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/blog/${r.slug}`}
                      className="rounded-2xl border p-4 hover:shadow-md transition-shadow bg-white"
                      style={{ borderColor: 'rgba(0,0,0,0.07)' }}
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
                        {CATEGORIA_LABEL[r.categoria]}
                      </span>
                      <p className="text-sm font-semibold text-black/85 mt-1.5 leading-snug">{r.titulo}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {toc.length > 0 && (
            <nav className="hidden lg:block sticky top-28 self-start" aria-label="Contenido del artículo">
              <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">En este artículo</p>
              <ul className="space-y-2.5 border-l" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                {toc.map((h) => (
                  <li key={h.id} className="pl-3 -ml-px border-l-2 border-transparent hover:border-black/30">
                    <a href={`#${h.id}`} className="text-xs text-black/55 hover:text-black transition-colors leading-snug block">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      <PageFooter />
      <WhatsAppFloatButton message={`Hola, leí "${post.titulo}" en el blog y tengo una pregunta.`} />
    </div>
  );
}
