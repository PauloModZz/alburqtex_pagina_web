import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import SiteNav from './layout/SiteNav';
import { useLanguage } from '../context/LanguageContext';

const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.08'/></svg>`;
const GRAIN_DATA_URI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(GRAIN_SVG)}`;

const EASE = 'cubic-bezier(0.4,0,0.2,1)';
const TRANSITION_MS = 650;

const GHOST_TEXT_STYLE: CSSProperties = {
  fontFamily: "'Anton', sans-serif",
  fontSize: 'clamp(90px, 28vw, 380px)',
  fontWeight: 900,
  lineHeight: 1,
  textTransform: 'uppercase',
  letterSpacing: '-0.02em',
  whiteSpace: 'nowrap',
};

type Role = 'center' | 'left' | 'right' | 'back';

function roleStyle(role: Role, isMobile: boolean): CSSProperties {
  switch (role) {
    case 'center':
      return {
        left: '50%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
        width: isMobile ? '92vw' : 'min(56vw, 760px)',
        bottom: isMobile ? '17%' : '-2%',
      };
    case 'left':
      return {
        left: isMobile ? '20%' : '30%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        width: isMobile ? '23vw' : 'min(17vw, 230px)',
        bottom: isMobile ? '32%' : '12%',
      };
    case 'right':
      return {
        left: isMobile ? '80%' : '70%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        width: isMobile ? '23vw' : 'min(17vw, 230px)',
        bottom: isMobile ? '32%' : '12%',
      };
    case 'back':
      return {
        left: '50%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(4px)',
        opacity: 1,
        zIndex: 5,
        width: isMobile ? '18vw' : 'min(14vw, 190px)',
        bottom: isMobile ? '32%' : '12%',
      };
  }
}

interface HeroProps {
  onOpenCatalog: () => void;
}

export default function Hero({ onOpenCatalog }: HeroProps) {
  const { isEnglish } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );
  const unlockRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const referenceWordRef = useRef<HTMLSpanElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);
  const [ghostScaleX, setGhostScaleX] = useState(1);
  const ghostWord = isEnglish
    ? ({ BORDADO: 'EMBROIDERY', ESTAMPADO: 'PRINTING', SUBLIMADO: 'SUBLIMATION' }[PRODUCTS[activeIndex].ghostWord] ?? PRODUCTS[activeIndex].ghostWord)
    : PRODUCTS[activeIndex].ghostWord;

  // Usa la palabra española de cada técnica como caja de referencia. La
  // traducción conserva exactamente su alto y se escala solo en horizontal
  // para ocupar el mismo ancho, aunque tenga más o menos letras.
  useLayoutEffect(() => {
    const measure = () => {
      const referenceWidth = referenceWordRef.current?.getBoundingClientRect().width ?? 0;
      const activeWidth = activeWordRef.current?.getBoundingClientRect().width ?? 0;
      if (referenceWidth > 0 && activeWidth > 0) {
        setGhostScaleX(referenceWidth / activeWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeIndex, isMobile, isEnglish]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    return () => {
      if (unlockRef.current) clearTimeout(unlockRef.current);
    };
  }, []);

  const navigate = (dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) =>
      dir === 'next'
        ? (prev + 1) % PRODUCTS.length
        : (prev + PRODUCTS.length - 1) % PRODUCTS.length,
    );
    unlockRef.current = setTimeout(() => setIsAnimating(false), TRANSITION_MS);
  };

  const count = PRODUCTS.length;
  const center = activeIndex;
  const left = (activeIndex + count - 1) % count;
  const right = (activeIndex + 1) % count;
  // "back" only exists as a distinct slot once there are 4+ items — with 3
  // items it would land on the same index as "left", so it's skipped.
  const back = count > 3 ? (activeIndex + 2) % count : null;

  const roleByIndex: Record<number, Role> = {
    [center]: 'center',
    [left]: 'left',
    [right]: 'right',
  };
  if (back !== null) roleByIndex[back] = 'back';

  const active = PRODUCTS[activeIndex];

  return (
    <div
      style={{
        backgroundColor: active.bg,
        transition: `background-color ${TRANSITION_MS}ms ${EASE}`,
        fontFamily: 'Inter, sans-serif',
      }}
      className="relative w-full overflow-hidden"
    >
      <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("${GRAIN_DATA_URI}")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {PRODUCTS.map((product, index) => {
            const role = roleByIndex[index];
            if (!role) return null;
            const style = roleStyle(role, isMobile);
            return (
              <div
                key={product.sku}
                style={{
                  position: 'absolute',
                  aspectRatio: '1 / 1',
                  transition: `transform ${TRANSITION_MS}ms ${EASE}, filter ${TRANSITION_MS}ms ${EASE}, opacity ${TRANSITION_MS}ms ${EASE}, left ${TRANSITION_MS}ms ${EASE}`,
                  willChange: 'transform, filter, opacity',
                  ...style,
                }}
              >
                <img
                  src={product.src}
                  alt={product.name}
                  loading={role === 'center' ? 'eager' : 'lazy'}
                  fetchPriority={role === 'center' ? 'high' : 'auto'}
                  decoding="async"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                    transform: `scale(${product.visualScale})`,
                    transformOrigin: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Giant ghost text: changes per product to name its technique.
            Sits behind the product (z-index below the carousel) — parked
            high enough that it lands on the narrow collar/shoulders area
            instead of the wide torso, so the garment covers as little of
            the word as possible. */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2, top: '6%' }}
        >
          <span
            key={`${activeIndex}-${isEnglish ? 'en' : 'es'}`}
            style={{
              ...GHOST_TEXT_STYLE,
              color: '#fff',
              opacity: 1,
              transform: `scaleX(${ghostScaleX})`,
              transformOrigin: 'center',
              animation: `ghostFadeIn ${TRANSITION_MS}ms ${EASE}`,
            }}
          >
            {ghostWord}
          </span>
        </div>

        {/* Copias invisibles solo para medir anchos reales (sin transform) —
            position:fixed las saca del flujo, no afectan el layout visible. */}
        <span
          ref={referenceWordRef}
          aria-hidden="true"
          style={{ ...GHOST_TEXT_STYLE, position: 'fixed', top: 0, left: 0, visibility: 'hidden' }}
        >
          {active.ghostWord}
        </span>
        <span
          key={`${activeIndex}-${isEnglish ? 'en' : 'es'}`}
          ref={activeWordRef}
          aria-hidden="true"
          style={{ ...GHOST_TEXT_STYLE, position: 'fixed', top: 0, left: 0, visibility: 'hidden' }}
        >
          {ghostWord}
        </span>

        {/* Brand label */}
        <div
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase text-white"
          style={{ zIndex: 60, opacity: 0.9, letterSpacing: '0.18em' }}
        >
          Alburqtex
        </div>

        <SiteNav />

        {/* Bottom-left: info about the workshop (not the product) + carousel nav */}
        <div
          className="absolute bottom-12 left-4 sm:bottom-32 sm:left-24"
          style={{ zIndex: 60, maxWidth: 340 }}
        >
          <p
            className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] text-white"
            style={{ opacity: 0.95, letterSpacing: '0.02em' }}
          >
            {isEnglish ? 'Textile customization workshop' : 'Taller de personalización textil'}
          </p>
          <p
            className="hidden sm:block text-xs sm:text-sm text-white mb-4 sm:mb-5"
            style={{ opacity: 0.85, lineHeight: 1.6 }}
          >
            {isEnglish
              ? 'High-quality garment manufacturing, embroidery, printing and sublimation. Made in Guayaquil for individuals, institutions and companies, with craftsmanship you can trust.'
              : 'Confección, bordado, estampado y sublimado de alto nivel. Desde Guayaquil para ti, para instituciones y empresas. Fabricamos y personalizamos con calidad y confianza.'}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('prev')}
              aria-label="Anterior"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-transparent flex items-center justify-center text-white transition-transform duration-150 hover:scale-[1.08]"
              style={{ border: '2px solid white' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={() => navigate('next')}
              aria-label="Siguiente"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-transparent flex items-center justify-center text-white transition-transform duration-150 hover:scale-[1.08]"
              style={{ border: '2px solid white' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Bottom-right catalog CTA */}
        <button
          type="button"
          onClick={onOpenCatalog}
          className="group absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center bg-transparent no-underline text-white transition-all duration-200 hover:scale-105"
          style={{ zIndex: 60, opacity: 0.95, transformOrigin: 'right center' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.95')}
        >
          <span
            className="transition-[letter-spacing] duration-200 group-hover:tracking-wide"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(20px, 4vw, 56px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            {isEnglish ? 'View catalog' : 'Ver catálogo'}
          </span>
          <ArrowRight
            className="w-5 h-5 sm:w-8 sm:h-8 ml-2 transition-transform duration-200 group-hover:translate-x-1.5"
            strokeWidth={2.25}
          />
        </button>
      </div>
    </div>
  );
}
