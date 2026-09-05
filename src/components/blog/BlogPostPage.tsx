import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Check, Clock, Link2, MessageCircle } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import PageFooter from '../layout/PageFooter';
import WhatsAppFloatButton from '../layout/WhatsAppFloatButton';
import ContentBlocks from './ContentBlocks';
import { BLOG_POSTS_BY_SLUG, CATEGORIA_LABEL } from '../../data/blog';
import { WHATSAPP_LINK } from '../../data/products';
import { useSeo, useJsonLd, SITE_URL, SITE_NAME } from '../../lib/seo';
import { useLanguage } from '../../context/LanguageContext';
import { BLOG_EN } from '../../data/en';
import type { Categoria } from '../../data/blog';

const GOLD = '#C9973F';

const CATEGORY_EN: Record<Categoria, string> = {
  'antes-de-pedir': 'Before ordering', bordado: 'Embroidery', estampado: 'Printing', sublimacion: 'Sublimation',
  confeccion: 'Manufacturing', cuidados: 'Care', 'para-empresas': 'For companies',
};

function formatFecha(iso: string, isEnglish: boolean) {
  return new Date(iso).toLocaleDateString(isEnglish ? 'en-US' : 'es-EC', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPostPage() {
  const { isEnglish, localizePath } = useLanguage();
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const post = slug ? BLOG_POSTS_BY_SLUG[slug] : undefined;
  const english = post && isEnglish ? BLOG_EN[post.slug] : undefined;
  const body = english?.body ?? post?.cuerpo ?? [];
  const [activeId, setActiveId] = useState<string>('');
  const sectionIds = (body.filter((b) => b.type === 'h2') as { id: string }[]).map((b) => b.id);

  useSeo(
    post
      ? {
          title: english?.metaTitle ?? post.metaTitulo,
          description: english?.metaDescription ?? post.metaDescripcion,
          path: `/blog/${post.slug}`,
          image: `${SITE_URL}${post.imagen}`,
        }
      : { title: 'Blog', description: isEnglish ? 'Alburqtex textile production blog' : 'Blog de Alburqtex', path: '/blog' },
  );

  useJsonLd(
    'article-jsonld',
    post
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: english?.title ?? post.titulo,
          description: english?.metaDescription ?? post.metaDescripcion,
          datePublished: post.fecha,
          author: { '@type': 'Organization', name: SITE_NAME },
          mainEntityOfPage: `${SITE_URL}${isEnglish ? '/en' : ''}/blog/${post.slug}`,
          image: `${SITE_URL}${post.imagen}`,
        }
      : null,
  );

  // Resalta en el índice lateral la sección que se está viendo — mismo
  // efecto que en Legal y Guía de tallas.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds.join(',')]);

  if (!post) return <Navigate to={localizePath('/blog')} replace />;

  const toc = body.filter((b) => b.type === 'h2') as { type: 'h2'; text: string; id: string }[];
  const relacionados = post.relacionados.map((s) => BLOG_POSTS_BY_SLUG[s]).filter(Boolean).slice(0, 3);
  const shareUrl = `${SITE_URL}${isEnglish ? '/en' : ''}/blog/${post.slug}`;

  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const midIndex = Math.floor(body.length / 2);
  const firstHalf = body.slice(0, midIndex);
  const secondHalf = body.slice(midIndex);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}>
      <PageHeader eyebrow={isEnglish ? CATEGORY_EN[post.categoria] : CATEGORIA_LABEL[post.categoria]} title={english?.title ?? post.titulo} />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <figure className="aspect-[16/8] overflow-hidden rounded-2xl mb-8 bg-black/5">
          <img src={post.imagen} alt={english?.imageAlt ?? post.imagenAlt} className="w-full h-full object-cover" fetchPriority="high" />
        </figure>
        <div className="flex items-center gap-4 text-xs text-black/45 mb-10 max-w-[68ch]">
          <span>{formatFecha(post.fecha, isEnglish)}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} strokeWidth={2} />
            {post.tiempoLectura} {isEnglish ? 'min read' : 'min de lectura'}
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
              <p className="text-sm text-black/70">{isEnglish ? 'Have a specific project? We can advise you directly on WhatsApp.' : '¿Tienes un caso puntual? Te asesoramos directo por WhatsApp.'}</p>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(isEnglish ? `Hello, I read the article “${english?.title ?? post.titulo}” and have a question.` : `Hola, leí el artículo "${post.titulo}" y tengo una consulta.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shrink-0"
                style={{ backgroundColor: '#141414' }}
              >
                <MessageCircle size={15} strokeWidth={2.25} />
                {isEnglish ? 'Ask us' : 'Consultar'}
              </a>
            </div>

            <ContentBlocks blocks={secondHalf} />

            <div className="max-w-[68ch] flex items-center gap-4 mt-10 pt-6 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              <span className="text-xs font-semibold uppercase tracking-widest text-black/40">{isEnglish ? 'Share' : 'Compartir'}</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.titulo} — ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isEnglish ? 'Share on WhatsApp' : 'Compartir por WhatsApp'}
                className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-black/5 transition-colors"
                style={{ borderColor: 'rgba(0,0,0,0.15)' }}
              >
                <MessageCircle size={15} strokeWidth={2} />
              </a>
              <button
                type="button"
                onClick={copyLink}
                aria-label={isEnglish ? 'Copy link' : 'Copiar enlace'}
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
              <p className="text-sm font-semibold text-black/85">{isEnglish ? 'Ready to request a quote?' : '¿Listo para cotizar tu bordado?'}</p>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(isEnglish ? 'Hello, I read the Alburqtex blog and would like a quote.' : 'Hola, leí el blog de Alburqtex y quiero cotizar mi pedido.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shrink-0"
                style={{ backgroundColor: '#141414' }}
              >
                {isEnglish ? 'Request a quote' : 'Cotizar ahora'}
                <ArrowRight size={16} strokeWidth={2.25} />
              </a>
            </div>

            {relacionados.length > 0 && (
              <div className="mt-14">
                <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-4">{isEnglish ? 'Related articles' : 'Artículos relacionados'}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relacionados.map((r) => (
                    <Link
                      key={r.slug}
                      to={localizePath(`/blog/${r.slug}`)}
                      className="rounded-2xl border p-4 hover:shadow-md transition-shadow bg-white"
                      style={{ borderColor: 'rgba(0,0,0,0.07)' }}
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
                        {isEnglish ? CATEGORY_EN[r.categoria] : CATEGORIA_LABEL[r.categoria]}
                      </span>
                      <p className="text-sm font-semibold text-black/85 mt-1.5 leading-snug">{isEnglish ? BLOG_EN[r.slug]?.title ?? r.titulo : r.titulo}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {toc.length > 0 && (
            <nav className="hidden lg:block sticky top-28 self-start" aria-label={isEnglish ? 'Article contents' : 'Contenido del artículo'}>
              <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">{isEnglish ? 'In this article' : 'En este artículo'}</p>
              <ul className="space-y-2.5 border-l" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                {toc.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="text-xs transition-colors leading-snug block border-l-2 pl-3 -ml-px"
                      style={
                        activeId === h.id
                          ? { color: '#141414', fontWeight: 700, borderColor: GOLD }
                          : { color: 'rgba(0,0,0,0.55)', borderColor: 'transparent' }
                      }
                    >
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
      <WhatsAppFloatButton message={isEnglish ? `Hello, I read “${english?.title ?? post.titulo}” and have a question.` : `Hola, leí "${post.titulo}" en el blog y tengo una pregunta.`} />
    </div>
  );
}
