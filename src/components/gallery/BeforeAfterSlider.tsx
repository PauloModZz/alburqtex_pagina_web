import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
}

/** Comparador antes/después. Ratón y dedo vía pointer events; teclado con flechas en el separador. */
export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel, afterLabel }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden select-none touch-none"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Capa base: "después", siempre a tamaño completo. */}
      <div className="absolute inset-0">
        <img src={afterSrc} alt={afterLabel} loading="lazy" className="h-full w-full object-cover" />
      </div>
      {/* Capa "antes", también a tamaño completo pero recortada con clip-path
          según la posición del separador — así nunca se reescala, solo se
          revela/oculta, sin depender de medir el ancho del contenedor. */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeSrc} alt={beforeLabel} loading="lazy" className="h-full w-full object-cover" />
      </div>

      <div className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest text-white/90 bg-black/50 rounded-full px-2.5 py-1">
        Antes
      </div>
      <div className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-widest text-white/90 bg-black/50 rounded-full px-2.5 py-1">
        Después
      </div>

      <div className="absolute top-0 bottom-0" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
        <div className="w-0.5 h-full bg-white" />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Deslizar para comparar antes y después"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onPointerDown={onPointerDown}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing outline-none focus-visible:ring-2"
          style={{ ['--tw-ring-color' as string]: '#C9973F' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 6L2 12L8 18" stroke="#141414" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 6L22 12L16 18" stroke="#141414" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
