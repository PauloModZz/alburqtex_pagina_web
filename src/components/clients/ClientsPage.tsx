import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import PageFooter from '../layout/PageFooter';
import WhatsAppFloatButton from '../layout/WhatsAppFloatButton';
import StarRating from '../StarRating';
import Reveal from '../layout/Reveal';
import { CLIENTS, type SectorCliente } from '../../data/clientes';
import { useApprovedComments } from '../../lib/useApprovedComments';
import { WHATSAPP_LINK } from '../../data/products';
import { useSeo, useJsonLd } from '../../lib/seo';

const GOLD = '#C9973F';

export default function ClientsPage() {
  const { comments, loading } = useApprovedComments();

  useSeo({
    title: 'Clientes y testimonios',
    description:
      'Empresas, instituciones y personas que ya confiaron en Alburqtex para confeccionar y bordar sus uniformes, prendas corporativas y piezas personalizadas.',
    path: '/clientes',
  });

  const bySector = useMemo(() => {
    const map = new Map<SectorCliente, number>();
    CLIENTS.forEach((c) => map.set(c.sector, (map.get(c.sector) ?? 0) + 1));
    return Array.from(map.entries());
  }, []);

  const average = comments.length ? comments.reduce((s, c) => s + c.rating, 0) / comments.length : 0;

  useJsonLd(
    'reviews-jsonld',
    comments.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Alburqtex',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: average.toFixed(1),
            reviewCount: comments.length,
          },
          review: comments.slice(0, 20).map((c) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: c.displayName },
            reviewRating: { '@type': 'Rating', ratingValue: c.rating, bestRating: 5 },
            reviewBody: c.text,
          })),
        }
      : null,
  );

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}>
      <PageHeader
        eyebrow="Confianza"
        title="Clientes y testimonios"
        description="Empresas, instituciones y personas particulares que ya bordaron con nosotros."
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        {/* Logos de clientes */}
        <section>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {bySector.map(([sector, count]) => (
              <span
                key={sector}
                className="text-xs font-semibold rounded-full px-3 py-1.5"
                style={{ backgroundColor: 'rgba(201,151,63,0.1)', color: '#8a6a2a' }}
              >
                {count} {sector.toLowerCase()}
              </span>
            ))}
          </div>
          <Reveal className="flex flex-wrap items-center gap-4 sm:gap-5">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                title={client.name}
                className="group flex items-center justify-center bg-white rounded-xl border p-3.5 transition-transform duration-200 hover:scale-105"
                style={{ borderColor: 'rgba(0,0,0,0.06)', width: 128, height: 128 }}
              >
                <img
                  src={client.img}
                  alt={client.name}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain rounded-md grayscale group-hover:grayscale-0 transition-[filter] duration-300"
                />
              </div>
            ))}
          </Reveal>
        </section>

        {/* Bloque de confianza */}
        <section className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: 'Años de experiencia', value: '+20' },
            { label: 'Prendas bordadas al año', value: '+9,000' },
            { label: 'Clientes recurrentes', value: '100%' },
            { label: 'Sectores atendidos', value: String(bySector.length) },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(22px, 3vw, 32px)', color: '#141414', lineHeight: 1 }}>
                {stat.value}
              </div>
              <p className="text-xs text-black/50 mt-2 leading-snug">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Testimonios reales */}
        <section className="mt-16">
          <span className="text-xs font-semibold uppercase tracking-widest block mb-2" style={{ color: GOLD }}>
            Testimonios
          </span>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xl font-bold text-black/90">Lo que dicen quienes ya pidieron con nosotros</h2>
            {comments.length > 0 && (
              <span className="flex items-center gap-1.5 text-sm text-black/50 shrink-0">
                <StarRating value={Math.round(average)} size={14} />
                {average.toFixed(1)}
              </span>
            )}
          </div>

          {!loading && comments.length === 0 && (
            <div className="rounded-2xl border p-10 text-center" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              <p className="text-sm text-black/45">Estamos recogiendo las opiniones de nuestros clientes.</p>
            </div>
          )}

          {comments.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comments.map((c, i) => (
                <Reveal key={c.id} delay={(i % 6) * 70}>
                  <div className="rounded-2xl overflow-hidden bg-white border" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                    {c.fotoUrl && (
                      <img src={c.fotoUrl} alt="" loading="lazy" className="w-full h-40 object-cover" />
                    )}
                    <div className="p-5">
                      <StarRating value={c.rating} size={13} />
                      <p className="text-sm text-black/70 leading-relaxed mt-3 mb-4">&ldquo;{c.text}&rdquo;</p>
                      <p className="text-xs font-semibold text-black/40">— {c.displayName}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
          <p className="text-xs text-black/35 mt-4">
            Estos testimonios son comentarios reales enviados por clientes desde nuestra web, revisados antes de
            publicarse.
          </p>
        </section>

        {/* Casos de éxito */}
        <section className="mt-16">
          <span className="text-xs font-semibold uppercase tracking-widest block mb-2" style={{ color: GOLD }}>
            Casos
          </span>
          <h2 className="text-xl font-bold text-black/90 mb-6">Casos de éxito</h2>
          <div className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <p className="text-sm font-bold text-black/85 mb-5">Ser el proveedor de bordado de confianza para toda la producción de una marca</p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: GOLD }}>El reto</p>
                <p className="text-sm text-black/60 leading-relaxed">
                  Marcas como D&apos;Casa y Pisadas, además de instituciones como la Armada del Ecuador, el Ejército
                  Ecuatoriano y el Colegio Alemán Humboldt, necesitaban un solo proveedor de bordado confiable para
                  toda su producción recurrente — no pedidos sueltos de vez en cuando, sino un socio que sostuviera
                  el volumen mes a mes sin fallar.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: GOLD }}>Qué hicimos</p>
                <p className="text-sm text-black/60 leading-relaxed">
                  Nos convertimos en su distribuidor y proveedor oficial de bordado, asumiendo toda la producción de
                  forma continua en vez de trabajar pedido por pedido. Con D&apos;Casa, por ejemplo, eso significa
                  bordar el 100% de sus prendas personalizadas.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: GOLD }}>El resultado</p>
                <p className="text-sm text-black/60 leading-relaxed">
                  En meses de alta demanda llegamos a producir hasta <strong className="text-black/80">1,000 piezas individuales</strong> solo
                  para D&apos;Casa — el mismo nivel de volumen que sostenemos con Pisadas y con las demás
                  instituciones que ya confían en nosotros.
                </p>
              </div>
            </div>
          </div>
          <Link
            to="/galeria"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black/70 hover:text-black transition-colors"
          >
            Mientras tanto, mira trabajos reales en la galería
            <ArrowRight size={14} strokeWidth={2.25} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

        <div
          className="mt-16 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between border"
          style={{ borderColor: 'rgba(0,0,0,0.08)', backgroundColor: 'rgba(201,151,63,0.06)' }}
        >
          <p className="text-sm font-semibold text-black/85">¿Quieres ser el próximo caso? Cotiza tu pedido.</p>
          <a
            href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hola, vi la página de clientes y testimonios y quiero cotizar mi pedido.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shrink-0"
            style={{ backgroundColor: '#141414' }}
          >
            Cotiza tu pedido
            <ArrowRight size={16} strokeWidth={2.25} />
          </a>
        </div>
      </main>

      <PageFooter />
      <WhatsAppFloatButton message="Hola, vi la página de clientes y testimonios y quiero hacer un pedido." />
    </div>
  );
}
