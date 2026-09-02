import { ImageOff } from 'lucide-react';

const GOLD = '#C9973F';

interface GalleryPlaceholderProps {
  label: string;
  className?: string;
}

/**
 * Todavía no hay fotos reales de los trabajos (ver src/data/imagenes-pendientes.md).
 * Mismo patrón visual que ya usa CatalogPage para productos sin foto — no es un
 * banco de imágenes externo, es un bloque propio en los colores de la marca.
 */
export default function GalleryPlaceholder({ label, className }: GalleryPlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 text-center px-4 ${className ?? ''}`}
      style={{ backgroundColor: 'rgba(201,151,63,0.08)' }}
      role="img"
      aria-label={`Foto pendiente: ${label}`}
    >
      <ImageOff size={26} strokeWidth={1.5} style={{ color: GOLD }} />
      <span className="text-xs font-medium text-black/45 leading-snug max-w-[220px]">{label}</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-black/25">Foto próximamente</span>
    </div>
  );
}
