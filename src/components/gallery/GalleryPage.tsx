import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ChevronDown, SlidersHorizontal } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import PageFooter from '../layout/PageFooter';
import WhatsAppFloatButton from '../layout/WhatsAppFloatButton';
import Lightbox from './Lightbox';
import BeforeAfterSlider from './BeforeAfterSlider';
import Reveal from '../layout/Reveal';
import {
  GALLERY_PIECES,
  MACRO_SHOT,
  PRENDA_LABEL,
  TECNICA_LABEL,
  SECTOR_LABEL,
  type Prenda,
  type Tecnica,
  type Sector,
} from '../../data/galeria';
import { WHATSAPP_LINK } from '../../data/products';
import { useSeo, useJsonLd, SITE_URL } from '../../lib/seo';
import { useLanguage } from '../../context/LanguageContext';
import { GALLERY_EN, GALLERY_LABELS_EN } from '../../data/en';

const GOLD = '#C9973F';

function FilterGroup<T extends string>({
  label,
  options,
  labels,
  active,
  onToggle,
}: {
  label: string;
  options: T[];
  labels: Record<T, string>;
  active: T | null;
  onToggle: (value: T) => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-black/40 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className="text-xs font-semibold rounded-full px-3.5 py-2 border transition-colors"
            style={
              active === opt
                ? { backgroundColor: '#141414', color: '#fff', borderColor: '#141414' }
                : { backgroundColor: 'transparent', color: '#141414', borderColor: 'rgba(0,0,0,0.15)' }
            }
          >
            {labels[opt]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const { isEnglish, localizePath } = useLanguage();
  const [params, setParams] = useSearchParams();
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const prendaFilter = (params.get('prenda') as Prenda) || null;
  const tecnicaFilter = (params.get('tecnica') as Tecnica) || null;
  const sectorFilter = (params.get('sector') as Sector) || null;
  const activeFilterCount = [prendaFilter, tecnicaFilter, sectorFilter].filter(Boolean).length;
  const [filtersOpen, setFiltersOpen] = useState(activeFilterCount > 0);

  useSeo({
    title: isEnglish ? 'Custom textile work gallery' : 'Galería de trabajos textiles',
    description:
      isEnglish
        ? 'Portfolio of embroidery, textile printing, sublimation and custom garment manufacturing in Guayaquil, Ecuador.'
        : 'Muestras de bordado, estampado, sublimación y confección textil en prendas y uniformes — filtra por prenda, técnica o sector.',
    path: '/galeria',
  });

  const filtered = useMemo(
    () =>
      GALLERY_PIECES.filter(
        (p) =>
          (!prendaFilter || p.prenda === prendaFilter) &&
          (!tecnicaFilter || p.tecnica === tecnicaFilter) &&
          (!sectorFilter || p.sector === sectorFilter),
      ),
    [prendaFilter, tecnicaFilter, sectorFilter],
  );

  useJsonLd(
    'gallery-jsonld',
    filtered.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: isEnglish ? 'Custom textile work gallery — Alburqtex' : 'Galería de trabajos textiles — Alburqtex',
          image: filtered.map((p) => ({
            '@type': 'ImageObject',
            name: isEnglish ? GALLERY_EN[p.id]?.title ?? p.titulo : p.titulo,
            description: isEnglish ? GALLERY_EN[p.id]?.challenge ?? p.reto : p.reto,
            contentUrl: `${SITE_URL}/${p.imagen}`,
          })),
        }
      : null,
  );

  const toggleParam = (key: 'prenda' | 'tecnica' | 'sector', value: string) => {
    const next = new URLSearchParams(params);
    if (params.get(key) === value) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const lightboxIndex = filtered.findIndex((p) => p.id === lightboxId);
  const lightboxPiece = lightboxIndex >= 0 ? filtered[lightboxIndex] : null;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}>
      <PageHeader
        eyebrow={isEnglish ? 'Portfolio' : 'Portafolio'}
        title={isEnglish ? 'Work gallery' : 'Galería de trabajos'}
        description={isEnglish ? 'Embroidery, printing, sublimation and garment manufacturing for apparel, uniforms and accessories. Filter by technique, garment or industry.' : 'Bordado, estampado, sublimación y confección textil en prendas, uniformes y accesorios. Filtra por técnica, prenda o sector para encontrar una referencia para tu proyecto.'}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="inline-flex items-center gap-2 rounded-full pl-4 pr-3.5 py-2.5 text-xs font-semibold uppercase tracking-widest border transition-colors"
            style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#141414', backgroundColor: filtersOpen ? 'rgba(0,0,0,0.04)' : 'transparent' }}
          >
            <SlidersHorizontal size={14} strokeWidth={2.25} />
            {isEnglish ? 'Filters' : 'Filtros'}
            {activeFilterCount > 0 && (
              <span
                className="rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: GOLD, color: '#fff' }}
              >
                {activeFilterCount}
              </span>
            )}
            <ChevronDown
              size={14}
              strokeWidth={2.5}
              className="transition-transform duration-200"
              style={{ transform: filtersOpen ? 'rotate(180deg)' : 'none' }}
            />
          </button>

          {filtersOpen && (
            <div
              className="mt-4 flex flex-col sm:flex-row flex-wrap gap-6 rounded-2xl border p-5"
              style={{ borderColor: 'rgba(0,0,0,0.07)', backgroundColor: 'rgba(255,255,255,0.6)' }}
            >
              <FilterGroup
                label={isEnglish ? 'Garment' : 'Prenda'}
                options={Object.keys(PRENDA_LABEL) as Prenda[]}
                labels={(isEnglish ? GALLERY_LABELS_EN.prendas : PRENDA_LABEL) as Record<Prenda, string>}
                active={prendaFilter}
                onToggle={(v) => toggleParam('prenda', v)}
              />
              <FilterGroup
                label={isEnglish ? 'Technique' : 'Técnica'}
                options={Object.keys(TECNICA_LABEL) as Tecnica[]}
                labels={(isEnglish ? GALLERY_LABELS_EN.tecnicas : TECNICA_LABEL) as Record<Tecnica, string>}
                active={tecnicaFilter}
                onToggle={(v) => toggleParam('tecnica', v)}
              />
              <FilterGroup
                label={isEnglish ? 'Industry' : 'Sector'}
                options={Object.keys(SECTOR_LABEL) as Sector[]}
                labels={(isEnglish ? GALLERY_LABELS_EN.sectores : SECTOR_LABEL) as Record<Sector, string>}
                active={sectorFilter}
                onToggle={(v) => toggleParam('sector', v)}
              />
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-black/40 text-center py-20">
            {isEnglish ? 'No work matches this filter combination yet—try removing one.' : 'No hay trabajos con esa combinación de filtros todavía — prueba quitando alguno.'}
          </p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {filtered.map((piece, i) => (
              <Reveal key={piece.id} delay={(i % 6) * 70} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setLightboxId(piece.id)}
                className="group block w-full rounded-2xl overflow-hidden bg-white border text-left transition-shadow hover:shadow-lg"
                style={{ borderColor: 'rgba(0,0,0,0.06)' }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
                  <img
                    src={`/${piece.imagen}`}
                    alt={piece.titulo}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                  {piece.esImagenReferencial && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                      {isEnglish ? 'Reference image' : 'Imagen referencial'}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: GOLD }}>
                    {isEnglish ? GALLERY_LABELS_EN.prendas[piece.prenda] : PRENDA_LABEL[piece.prenda]} · {isEnglish ? GALLERY_LABELS_EN.tecnicas[piece.tecnica] : TECNICA_LABEL[piece.tecnica]}
                  </p>
                  <h3 className="text-sm font-semibold text-black/85 leading-snug">{isEnglish ? GALLERY_EN[piece.id]?.title ?? piece.titulo : piece.titulo}</h3>
                  <p className="text-xs text-black/45 mt-1">{isEnglish ? GALLERY_LABELS_EN.sectores[piece.sector] : SECTOR_LABEL[piece.sector]}</p>
                </div>
              </button>
              </Reveal>
            ))}
          </div>
        )}

        {/* Detalle de acabado */}
        <section className="mt-16">
          <span className="text-xs font-semibold uppercase tracking-widest block mb-3" style={{ color: GOLD, letterSpacing: '0.14em' }}>
            {isEnglish ? 'A closer look at the finish' : MACRO_SHOT.titulo}
          </span>
          <div className="rounded-2xl overflow-hidden aspect-[21/9]">
            <img
              src={`/${MACRO_SHOT.imagen}`}
              alt={isEnglish ? 'Close-up of the stitching and textile finish' : MACRO_SHOT.descripcion}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Antes / después */}
        <section className="mt-16 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest block mb-3" style={{ color: GOLD, letterSpacing: '0.14em' }}>
            {isEnglish ? 'From design to garment' : 'Del diseño a la prenda'}
          </span>
          <h2 className="text-lg font-bold text-black/90 mb-4">{isEnglish ? 'Compare the original design with the finished result' : 'Así se ve el logo original junto al resultado final'}</h2>
          <BeforeAfterSlider
            beforeSrc="/galeria/antes-logo-restaurante-original.jpg"
            afterSrc="/galeria/mandil-cocina-nombre-chef.jpg"
            beforeLabel={isEnglish ? 'Original reference design' : 'Diseño original de referencia'}
            afterLabel={isEnglish ? 'Finished embroidery simulation' : 'Simulación del bordado terminado sobre la prenda'}
          />
        </section>

        <div className="mt-16 grid sm:grid-cols-2 gap-4">
          <Link
            to={localizePath('/guia-de-tallas#tejidos')}
            className="rounded-2xl border p-5 bg-white hover:shadow-md transition-shadow"
            style={{ borderColor: 'rgba(0,0,0,0.07)' }}
          >
            <p className="text-sm font-semibold text-black/85 mb-1">{isEnglish ? 'Which fabric suits your project?' : '¿Qué tela conviene para tu proyecto?'}</p>
            <p className="text-xs text-black/50">{isEnglish ? 'Compare fabrics for embroidery, printing, sublimation or manufacturing.' : 'Compara tejidos para bordar, estampar, sublimar o confeccionar.'}</p>
          </Link>
          <Link
            to={localizePath('/preguntas-frecuentes')}
            className="rounded-2xl border p-5 bg-white hover:shadow-md transition-shadow"
            style={{ borderColor: 'rgba(0,0,0,0.07)' }}
          >
            <p className="text-sm font-semibold text-black/85 mb-1">{isEnglish ? 'Questions about files or pricing?' : '¿Dudas sobre archivos o precios?'}</p>
            <p className="text-xs text-black/50">{isEnglish ? 'Find clear answers in our frequently asked questions.' : 'Resolvemos lo más preguntado en preguntas frecuentes.'}</p>
          </Link>
        </div>

        <div
          className="mt-6 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between border"
          style={{ borderColor: 'rgba(0,0,0,0.08)', backgroundColor: 'rgba(201,151,63,0.06)' }}
        >
          <p className="text-sm font-semibold text-black/85">{isEnglish ? 'Want something like this? Tell us about your project.' : '¿Quieres algo así? Cuéntanos tu proyecto.'}</p>
          <a
            href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hola, vi la galería de trabajos y quiero cotizar algo parecido.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shrink-0"
            style={{ backgroundColor: '#141414' }}
          >
            {isEnglish ? 'Request a quote' : 'Cotiza tu proyecto'}
            <ArrowRight size={16} strokeWidth={2.25} />
          </a>
        </div>
      </main>

      <PageFooter />
      <WhatsAppFloatButton message="Hola, vi la galería de trabajos y me interesa algo parecido." />

      {lightboxPiece && (
        <Lightbox
          piece={lightboxPiece}
          language={isEnglish ? 'en' : 'es'}
          onClose={() => setLightboxId(null)}
          onPrev={() => setLightboxId(filtered[(lightboxIndex - 1 + filtered.length) % filtered.length].id)}
          onNext={() => setLightboxId(filtered[(lightboxIndex + 1) % filtered.length].id)}
        />
      )}
    </div>
  );
}
