import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryPiece } from '../../data/galeria';
import { PRENDA_LABEL, TECNICA_LABEL, SECTOR_LABEL } from '../../data/galeria';

interface LightboxProps {
  piece: GalleryPiece;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ piece, onClose, onPrev, onNext }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
    return () => {
      previouslyFocused.current?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Tab') {
        // Foco atrapado dentro del modal.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: 'rgba(15,15,15,0.92)' }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={piece.titulo}
        className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="aspect-[4/3] w-full">
            <img src={`/${piece.imagen}`} alt={piece.titulo} className="h-full w-full object-cover" />
          </div>
          {piece.esImagenReferencial && (
            <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              Imagen referencial
            </span>
          )}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
          >
            <X size={18} strokeWidth={2.25} />
          </button>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Trabajo anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
          >
            <ChevronLeft size={20} strokeWidth={2.25} />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Siguiente trabajo"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
          >
            <ChevronRight size={20} strokeWidth={2.25} />
          </button>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9973F' }}>
            {PRENDA_LABEL[piece.prenda]} · {TECNICA_LABEL[piece.tecnica]} · {SECTOR_LABEL[piece.sector]}
          </p>
          <h3 className="text-lg font-bold text-black/90 mb-2">{piece.titulo}</h3>
          <p className="text-sm text-black/60 leading-relaxed mb-3">{piece.reto}</p>
          <p className="text-xs text-black/40">
            ≈ {piece.puntadasAprox.toLocaleString('es-EC')} puntadas · {piece.coloresHilo} color
            {piece.coloresHilo === 1 ? '' : 'es'} de hilo
          </p>
        </div>
      </div>
    </div>
  );
}
