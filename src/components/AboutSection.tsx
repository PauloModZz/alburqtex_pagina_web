import { Award, MapPin, Package, Palette, Scissors, Shirt, Sparkles, Stamp } from 'lucide-react';
import Reveal from './layout/Reveal';

const GOLD = '#C9973F';

const STATS = [
  { icon: Award, value: '20+', label: 'Años de experiencia en el mercado' },
  { icon: Package, value: '100+', label: 'Productos personalizables' },
  { icon: Sparkles, value: '5', label: 'Técnicas: confección, bordado, estampado, sublimado y serigrafía' },
  { icon: MapPin, value: '100%', label: 'Hecho a pedido en Ecuador' },
];

const TECHNIQUES = [
  {
    icon: Shirt,
    title: 'Confección',
    desc: 'Fabricamos la prenda desde la tela: cortamos y cosemos uniformes, polos y ropa a medida, no solo decoramos prendas ya hechas.',
  },
  {
    icon: Scissors,
    title: 'Bordado',
    desc: 'Hilo de alta duración para logos y escudos. Ideal para uniformes ejecutivos, corporativos y equipos de trabajo.',
  },
  {
    icon: Sparkles,
    title: 'Estampado',
    desc: 'Diseños grandes de alto impacto en pecho o espalda. Perfecto para lanzamientos de marca y streetwear.',
  },
  {
    icon: Palette,
    title: 'Sublimado',
    desc: 'Color de borde a borde, sin límite de tonos. Ideal para uniformes deportivos y marcas llamativas.',
  },
  {
    icon: Stamp,
    title: 'Serigrafía',
    desc: 'Impresión resistente en tela, ideal para tirajes grandes con uno o varios colores sólidos.',
  },
];

export default function AboutSection() {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: GOLD, letterSpacing: '0.18em' }}
        >
          Quiénes somos
        </span>
        <h2
          className="mt-3 mb-6"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(36px, 6vw, 68px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#141414',
          }}
        >
          Sobre Alburqtex
        </h2>
        <p className="text-sm sm:text-base text-black/60 max-w-2xl leading-relaxed mb-14">
          Con más de 20 años en el mercado, somos un taller ecuatoriano de confección y
          personalización textil. Fabricamos uniformes, polos y prendas a medida desde la tela, y
          también trabajamos con negocios, empresas, instituciones y equipos que necesitan sus
          artículos con su propio logo, nombre o escudo — con bordado, estampado grande, sublimado
          100% o serigrafía, en los colores y cantidades que necesites.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} delay={i * 90}>
              <Icon size={20} strokeWidth={2} style={{ color: GOLD }} className="mb-3" />
              <div
                style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(28px, 4vw, 40px)', color: '#141414', lineHeight: 1 }}
              >
                {value}
              </div>
              <p className="text-xs sm:text-sm text-black/50 mt-2 leading-snug">{label}</p>
            </Reveal>
          ))}
        </div>

        {/* Techniques */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {TECHNIQUES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div
                className="h-full rounded-2xl p-6 sm:p-7 bg-white border transition-shadow hover:shadow-md"
                style={{ borderColor: 'rgba(0,0,0,0.06)' }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(201,151,63,0.12)' }}
                >
                  <Icon size={20} strokeWidth={2} style={{ color: GOLD }} />
                </div>
                <h3 className="text-base font-semibold text-black/90 mb-2">{title}</h3>
                <p className="text-sm text-black/55 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
