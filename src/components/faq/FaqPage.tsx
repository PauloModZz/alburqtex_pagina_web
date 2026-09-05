import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Link2, MessageCircle, Search } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import PageFooter from '../layout/PageFooter';
import WhatsAppFloatButton from '../layout/WhatsAppFloatButton';
import { FAQ_CATEGORIES, FAQ_ALL_ITEMS } from '../../data/faq';
import { BLOG_POSTS_BY_SLUG } from '../../data/blog';
import { WHATSAPP_LINK } from '../../data/products';
import { useSeo, useJsonLd, SITE_URL } from '../../lib/seo';
import { useLanguage } from '../../context/LanguageContext';
import { BLOG_EN, FAQ_CATEGORY_EN, FAQ_EN } from '../../data/en';

const RELATED_ARTICLE_SLUGS = ['que-archivo-necesito', 'que-es-el-ponchado', 'de-que-depende-el-precio'];

const GOLD = '#C9973F';

export default function FaqPage() {
  const { isEnglish, localizePath } = useLanguage();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useSeo({
    title: isEnglish ? 'Frequently asked questions' : 'Preguntas frecuentes',
    description:
      isEnglish ? 'Answers about minimum orders, logo files, garment manufacturing, embroidery, textile printing, lead times, pricing and guarantees.' : 'Resolvemos las dudas más comunes sobre pedidos mínimos, archivos para bordar tu logo, tiempos de entrega, precios y garantías en Alburqtex.',
    path: '/preguntas-frecuentes',
  });

  useJsonLd('faq-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ALL_ITEMS.map((item) => ({
      '@type': 'Question',
      name: isEnglish ? FAQ_EN[item.id]?.question ?? item.question : item.question,
      acceptedAnswer: { '@type': 'Answer', text: isEnglish ? FAQ_EN[item.id]?.answer ?? item.answer : item.answer },
    })),
  });

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const details = document.getElementById(id);
      if (details instanceof HTMLDetailsElement) {
        details.open = true;
        details.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [location.hash]);

  const localizedCategories = useMemo(() => FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    title: isEnglish ? FAQ_CATEGORY_EN[cat.id] ?? cat.title : cat.title,
    items: cat.items.map((item) => isEnglish ? { ...item, ...FAQ_EN[item.id] } : item),
  })), [isEnglish]);
  const query = search.trim().toLowerCase();
  const filteredCategories = useMemo(() => {
    if (!query) return localizedCategories;
    return localizedCategories.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) => item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query),
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [query, localizedCategories]);

  const copyLink = (id: string) => {
    const url = `${SITE_URL}${localizePath('/preguntas-frecuentes')}#${id}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1800);
    });
  };

  let globalIndex = -1;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}>
      <PageHeader
        eyebrow={isEnglish ? 'Help' : 'Ayuda'}
        title={isEnglish ? 'Frequently asked questions' : 'Preguntas frecuentes'}
        description={isEnglish ? 'Clear answers before ordering custom apparel. If your question is not here, message us directly on WhatsApp.' : 'Todo lo que suelen preguntarnos antes de pedir un bordado — si no encuentras tu respuesta aquí, te contestamos directo por WhatsApp.'}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div className="relative mb-10 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35" strokeWidth={2} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isEnglish ? 'Search by keyword (file, minimum, deadline...)' : 'Busca por palabra clave (ej. archivo, mínimo, plazo...)'}
            aria-label={isEnglish ? 'Search frequently asked questions' : 'Buscar en preguntas frecuentes'}
            className="w-full text-sm rounded-full border border-black/10 bg-white pl-10 pr-4 py-3 outline-none focus:border-black/30 transition-colors"
          />
        </div>
        {filteredCategories.length === 0 ? (
          <p className="text-sm text-black/45 text-center py-16">
            {isEnglish ? `No questions match “${search}”. Try another word or message us directly.` : `No encontramos preguntas con "${search}". Prueba con otra palabra o escríbenos directo.`}
          </p>
        ) : (
          <div className="flex flex-col gap-10">
            {filteredCategories.map((cat) => (
              <section key={cat.id} aria-labelledby={`heading-${cat.id}`}>
                <h2
                  id={`heading-${cat.id}`}
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: GOLD, letterSpacing: '0.14em' }}
                >
                  {cat.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {cat.items.map((item) => {
                    globalIndex += 1;
                    return (
                      <details
                        key={item.id}
                        id={item.id}
                        open={globalIndex === 0 && !query}
                        className="group scroll-mt-28 rounded-2xl bg-white border overflow-hidden"
                        style={{ borderColor: 'rgba(0,0,0,0.07)' }}
                      >
                        <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-black/85 select-none">
                          {item.question}
                          <span
                            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-black/40 transition-transform group-open:rotate-45"
                            style={{ border: '1.5px solid rgba(0,0,0,0.15)' }}
                            aria-hidden="true"
                          >
                            +
                          </span>
                        </summary>
                        <div className="px-5 pb-5 pt-0">
                          <p className="text-sm text-black/60 leading-relaxed mb-3">{item.answer}</p>
                          <button
                            type="button"
                            onClick={() => copyLink(item.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-black/40 hover:text-black transition-colors"
                          >
                            <Link2 size={13} strokeWidth={2.25} />
                            {copiedId === item.id ? (isEnglish ? 'Link copied' : 'Enlace copiado') : isEnglish ? 'Copy link to this question' : 'Copiar enlace a esta pregunta'}
                          </button>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-4">{isEnglish ? 'Continue reading on the blog' : 'Sigue leyendo en el blog'}</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {RELATED_ARTICLE_SLUGS.map((slug) => {
              const post = BLOG_POSTS_BY_SLUG[slug];
              if (!post) return null;
              return (
                <Link
                  key={slug}
                  to={localizePath(`/blog/${slug}`)}
                  className="group rounded-2xl border p-4 bg-white hover:shadow-md transition-shadow"
                  style={{ borderColor: 'rgba(0,0,0,0.07)' }}
                >
                  <p className="text-sm font-semibold text-black/85 leading-snug mb-2">{isEnglish ? BLOG_EN[slug]?.title ?? post.titulo : post.titulo}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-black/45 group-hover:gap-1.5 transition-all">
                    {isEnglish ? 'Read' : 'Leer'} <ArrowRight size={12} strokeWidth={2.25} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div
          className="mt-8 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between border"
          style={{ borderColor: 'rgba(0,0,0,0.08)', backgroundColor: 'rgba(201,151,63,0.06)' }}
        >
          <div>
            <p className="text-sm font-semibold text-black/85 mb-1">{isEnglish ? 'Did not find your answer?' : '¿No encontraste tu respuesta?'}</p>
            <p className="text-sm text-black/55">{isEnglish ? 'Message us and we will reply personally.' : 'Escríbenos directo y te contestamos personalmente.'}</p>
          </div>
          <a
            href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hola, tengo una pregunta que no encontré en las preguntas frecuentes:')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shrink-0"
            style={{ backgroundColor: '#141414' }}
          >
            <MessageCircle size={16} strokeWidth={2.25} />
            {isEnglish ? 'Ask on WhatsApp' : 'Preguntar por WhatsApp'}
          </a>
        </div>
      </main>

      <PageFooter />
      <WhatsAppFloatButton message={isEnglish ? 'Hello, I read the FAQ and would like to ask something else.' : 'Hola, vi las preguntas frecuentes de la web y quisiera consultar algo más.'} />
    </div>
  );
}
