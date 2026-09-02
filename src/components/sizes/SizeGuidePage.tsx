import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Ruler, XCircle } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import PageFooter from '../layout/PageFooter';
import WhatsAppFloatButton from '../layout/WhatsAppFloatButton';
import SizeDiagram from './SizeDiagram';
import { SIZE_GUIDES, cmToInches, type GarmentSizeGuide } from '../../data/tallas';
import { TEJIDOS, RECEPTIVIDAD_LABEL, UBICACIONES_BORDADO } from '../../data/tejidos';
import { useSeo, useJsonLd } from '../../lib/seo';

const GOLD = '#C9973F';

const RECEPTIVIDAD_COLOR: Record<string, string> = {
  excelente: '#2E7D32',
  buena: '#6B8E23',
  'requiere-refuerzo': '#B8860B',
  'no-recomendado': '#B3261E',
};

function GarmentBlock({ guide, unidad }: { guide: GarmentSizeGuide; unidad: 'cm' | 'in' }) {
  const defaultIndex = guide.filas.findIndex((row) => row.talla === 'M');
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex >= 0 ? defaultIndex : Math.floor(guide.filas.length / 2));
  const selectedRow = guide.filas[selectedIndex] ?? guide.filas[0];
  const fmt = (cm: number) => (unidad === 'cm' ? cm : cmToInches(cm));
  const unitLabel = unidad === 'cm' ? 'cm' : 'in';

  return (
    <section id={guide.id} className="scroll-mt-28 py-12 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          <h2 className="text-xl font-bold text-black/90 mb-1">{guide.nombre}</h2>
          <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: GOLD }}>
            Calce {guide.calce}
          </p>
          <p className="text-sm text-black/55 mb-6">{guide.calceNota}</p>

          {/* Tabla en escritorio */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                  <th className="text-left py-2 pr-4 font-semibold text-black/70">Talla</th>
                  {guide.campos.map((c) => (
                    <th key={c.key} className="text-left py-2 pr-4 font-semibold text-black/70">
                      {c.label} ({unitLabel})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guide.filas.map((row, index) => (
                  <tr
                    key={row.talla}
                    className="border-b transition-colors"
                    style={{
                      borderColor: 'rgba(0,0,0,0.05)',
                      backgroundColor: index === selectedIndex ? 'rgba(201,151,63,0.1)' : 'transparent',
                    }}
                  >
                    <td className="py-2 pr-4 font-semibold text-black/80">
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className="rounded-full px-2 py-1 font-bold transition-colors"
                        style={index === selectedIndex ? { backgroundColor: GOLD, color: '#141414' } : undefined}
                        aria-pressed={index === selectedIndex}
                        aria-label={`Ver medidas de la talla ${row.talla} en el diagrama`}
                      >
                        {row.talla}
                      </button>
                    </td>
                    {guide.campos.map((c) => (
                      <td key={c.key} className="py-2 pr-4 text-black/60">
                        {fmt(row.medidasCm[c.key] ?? 0)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tarjetas en móvil */}
          <div className="sm:hidden flex flex-col gap-3">
            {guide.filas.map((row, index) => (
              <button
                type="button"
                key={row.talla}
                onClick={() => setSelectedIndex(index)}
                className="rounded-xl border p-4 text-left transition-colors"
                style={{
                  borderColor: index === selectedIndex ? GOLD : 'rgba(0,0,0,0.08)',
                  backgroundColor: index === selectedIndex ? 'rgba(201,151,63,0.1)' : 'transparent',
                }}
                aria-pressed={index === selectedIndex}
              >
                <p className="text-sm font-bold text-black/85 mb-2">{row.talla}</p>
                <ul className="text-xs text-black/60 space-y-1">
                  {guide.campos.map((c) => (
                    <li key={c.key} className="flex justify-between">
                      <span>{c.label}</span>
                      <span className="font-semibold text-black/75">
                        {fmt(row.medidasCm[c.key] ?? 0)} {unitLabel}
                      </span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          {guide.tallasNino && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">Tallas de niño</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {guide.tallasNino.map((row) => (
                  <div key={row.talla} className="rounded-xl border p-3" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                    <p className="text-xs font-bold text-black/80 mb-1.5">{row.talla}</p>
                    <ul className="text-[11px] text-black/55 space-y-0.5">
                      {guide.campos.map((c) => (
                        <li key={c.key}>
                          {c.label}: {fmt(row.medidasCm[c.key] ?? 0)} {unitLabel}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {guide.notas && <p className="text-xs text-black/45 italic mt-5 leading-relaxed">{guide.notas}</p>}
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-black/45">Talla US mostrada</span>
            <select
              value={selectedIndex}
              onChange={(event) => setSelectedIndex(Number(event.target.value))}
              className="rounded-full border bg-white px-3 py-1.5 text-xs font-bold text-black/80 outline-none focus:ring-2"
              style={{ borderColor: 'rgba(0,0,0,0.12)' }}
              aria-label={`Seleccionar talla para ${guide.nombre}`}
            >
              {guide.filas.map((row, index) => (
                <option key={row.talla} value={index}>{row.talla}</option>
              ))}
            </select>
          </div>
          <SizeDiagram
            image={guide.imagen}
            alt={`Diagrama de medición para ${guide.nombre}`}
            campos={guide.campos}
            valores={selectedRow.medidasCm}
            unidad={unidad}
          />
          <p className="text-[11px] text-black/35 text-center mt-2">
            Medidas de prenda en plano · talla US {selectedRow.talla} · ilustración no a escala.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function SizeGuidePage() {
  const [unidad, setUnidad] = useState<'cm' | 'in'>('cm');

  useSeo({
    title: 'Guía de tallas y tipos de prenda',
    description:
      'Tabla de tallas en centímetros y pulgadas para polos, camisetas, camisas, chompas, gorras, mandiles y más, más guía de tejidos y ubicaciones de bordado.',
    path: '/guia-de-tallas',
  });

  useJsonLd('howto-medirte-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cómo medirte bien antes de pedir tu talla',
    step: [
      { '@type': 'HowToStep', name: 'Usa una prenda que ya te quede bien', text: 'Mide una prenda que ya tengas y te calce bien, en lugar de medir tu cuerpo directamente — es más preciso y evita errores de postura al medir.' },
      { '@type': 'HowToStep', name: 'Ponla completamente plana', text: 'Extiende la prenda sobre una superficie plana, sin arrugas, y dóblala a la mitad si vas a medir el ancho de pecho.' },
      { '@type': 'HowToStep', name: 'Mide de costura a costura', text: 'Usa una cinta métrica y mide siempre de costura a costura, no "a ojo" — un par de centímetros de diferencia sí cambia de talla.' },
      { '@type': 'HowToStep', name: 'Compara con la tabla', text: 'Compara tus medidas con la tabla de esta página y, si quedas justo entre dos tallas, elige la más grande si el uso será para trabajo diario.' },
    ],
  });

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}>
      <PageHeader
        eyebrow="Antes de pedir"
        title="Guía de tallas"
        description="Tablas de referencia por tipo de prenda, cómo medirte bien, qué tejido conviene para bordar y dónde va el bordado en cada prenda."
        extra={
          <div className="mt-5 inline-flex rounded-full border p-1" style={{ borderColor: 'rgba(0,0,0,0.12)' }}>
            {(['cm', 'in'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnidad(u)}
                className="text-xs font-semibold uppercase tracking-wide rounded-full px-4 py-2 transition-colors"
                style={unidad === u ? { backgroundColor: '#141414', color: '#fff' } : { color: '#141414' }}
              >
                {u === 'cm' ? 'Centímetros' : 'Pulgadas'}
              </button>
            ))}
          </div>
        }
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14 grid lg:grid-cols-[220px_1fr] gap-10">
        <nav className="hidden lg:block sticky top-32 self-start" aria-label="Prendas">
          <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-3">Prendas</p>
          <ul className="space-y-2">
            {SIZE_GUIDES.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="text-xs text-black/55 hover:text-black transition-colors leading-snug block">
                  {g.nombre}
                </a>
              </li>
            ))}
            <li className="pt-2 mt-2 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              <a href="#como-medirte" className="text-xs text-black/55 hover:text-black transition-colors block py-1">
                Cómo medirte bien
              </a>
              <a href="#tejidos" className="text-xs text-black/55 hover:text-black transition-colors block py-1">
                Qué tejido elegir
              </a>
              <a href="#ubicaciones" className="text-xs text-black/55 hover:text-black transition-colors block py-1">
                Dónde va el bordado
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <div
            className="rounded-2xl p-4 mb-4 text-xs text-black/55 leading-relaxed"
            style={{ backgroundColor: 'rgba(201,151,63,0.08)' }}
          >
            Estas medidas son referenciales y varían un poco según el proveedor y el lote de tela. Para un pedido
            grande, siempre confirmamos una muestra antes de producir todo.
          </div>

          {SIZE_GUIDES.map((guide) => (
            <GarmentBlock key={guide.id} guide={guide} unidad={unidad} />
          ))}

          {/* Cómo medirte bien */}
          <section id="como-medirte" className="scroll-mt-28 py-12 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <span className="text-xs font-semibold uppercase tracking-widest block mb-3" style={{ color: GOLD }}>
              Antes de elegir talla
            </span>
            <h2 className="text-xl font-bold text-black/90 mb-6">Cómo medirte bien</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { n: 1, t: 'Usa una prenda que ya te quede bien', d: 'Es más preciso que medir el cuerpo directamente — evita errores de postura al medir.' },
                { n: 2, t: 'Ponla completamente plana', d: 'Sin arrugas, sobre una superficie plana. Dóblala a la mitad para medir el ancho de pecho.' },
                { n: 3, t: 'Mide de costura a costura', d: 'Con cinta métrica, nunca "a ojo" — unos centímetros de más o de menos sí cambian la talla.' },
                { n: 4, t: 'Compara con la tabla', d: 'Si quedas justo entre dos tallas y es para uso diario de trabajo, elige la más grande.' },
              ].map((step) => (
                <div key={step.n} className="rounded-2xl bg-white border p-5" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-3"
                    style={{ backgroundColor: GOLD, color: '#141414' }}
                  >
                    {step.n}
                  </div>
                  <p className="text-sm font-semibold text-black/85 mb-1.5">{step.t}</p>
                  <p className="text-xs text-black/55 leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tejidos */}
          <section id="tejidos" className="scroll-mt-28 py-12 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <span className="text-xs font-semibold uppercase tracking-widest block mb-3" style={{ color: GOLD }}>
              Qué prenda elegir para bordar
            </span>
            <h2 className="text-xl font-bold text-black/90 mb-6">Comparativa de tejidos</h2>
            <div className="flex flex-col gap-3">
              {TEJIDOS.map((t) => (
                <div key={t.id} className="rounded-2xl bg-white border p-5" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <p className="text-sm font-bold text-black/85">{t.nombre}</p>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ color: RECEPTIVIDAD_COLOR[t.receptividad], backgroundColor: `${RECEPTIVIDAD_COLOR[t.receptividad]}1A` }}
                    >
                      {t.receptividad === 'no-recomendado' ? (
                        <XCircle size={13} strokeWidth={2.5} />
                      ) : (
                        <CheckCircle2 size={13} strokeWidth={2.5} />
                      )}
                      {RECEPTIVIDAD_LABEL[t.receptividad]}
                    </span>
                  </div>
                  <p className="text-xs text-black/50 mb-1">
                    Gramaje recomendado: <strong className="text-black/70">{t.gramajeRecomendado}</strong> ·{' '}
                    {t.necesitaEntretela ? 'Necesita entretela o respaldo' : 'No necesita entretela'}
                  </p>
                  {t.advertencia && <p className="text-xs text-black/55 leading-relaxed mt-2">{t.advertencia}</p>}
                </div>
              ))}
            </div>
            <Link
              to="/blog/bordado-vs-estampado"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black/70 hover:text-black transition-colors"
            >
              ¿Bordado o estampado? Lee la comparativa completa
              <ArrowRight size={14} strokeWidth={2.25} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </section>

          {/* Ubicaciones */}
          <section id="ubicaciones" className="scroll-mt-28 py-12">
            <span className="text-xs font-semibold uppercase tracking-widest block mb-3" style={{ color: GOLD }}>
              Dónde va el bordado
            </span>
            <h2 className="text-xl font-bold text-black/90 mb-6">Ubicaciones y medida máxima</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {UBICACIONES_BORDADO.map((u) => (
                <div key={u.id} className="rounded-xl border p-4 flex items-center justify-between gap-3" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                  <div className="flex items-center gap-3">
                    <Ruler size={16} strokeWidth={2} style={{ color: GOLD }} />
                    <span className="text-sm text-black/80">{u.nombre}</span>
                  </div>
                  <span className="text-xs font-semibold text-black/50 whitespace-nowrap">{u.medidaMaxima}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-black/40 mt-4">
              Medidas máximas de referencia — según la prenda exacta y el bastidor disponible pueden variar un poco.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              <Link
                to="/blog/guia-ubicaciones-bordado"
                className="rounded-2xl border p-4 bg-white hover:shadow-md transition-shadow"
                style={{ borderColor: 'rgba(0,0,0,0.07)' }}
              >
                <p className="text-sm font-semibold text-black/85">Guía completa de ubicaciones</p>
                <p className="text-xs text-black/50 mt-1">Qué comunica cada zona y por qué elegirla.</p>
              </Link>
              <Link
                to="/blog/bordado-en-gorras"
                className="rounded-2xl border p-4 bg-white hover:shadow-md transition-shadow"
                style={{ borderColor: 'rgba(0,0,0,0.07)' }}
              >
                <p className="text-sm font-semibold text-black/85">Bordado en gorras</p>
                <p className="text-xs text-black/50 mt-1">Estructurada vs. no estructurada, plano vs. 3D.</p>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <PageFooter />
      <WhatsAppFloatButton message="Hola, tengo una duda sobre tallas o dónde ubicar el bordado en mi prenda." />
    </div>
  );
}
