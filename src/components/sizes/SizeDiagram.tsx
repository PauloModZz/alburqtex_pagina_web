import type { MedidaCampo } from '../../data/tallas';

const GOLD = '#C9973F';

interface SizeDiagramProps {
  image: string;
  alt: string;
  campos: MedidaCampo[];
  valores: Record<string, number>;
  unidad: 'cm' | 'in';
}

export default function SizeDiagram({ image, alt, campos, valores, unidad }: SizeDiagramProps) {
  const fmt = (cm: number) => (unidad === 'cm' ? `${cm} cm` : `${Math.round(cm * 0.3937 * 10) / 10} in`);

  return (
    <figure
      className="relative w-full aspect-square overflow-hidden rounded-2xl border bg-[#202222]"
      style={{ borderColor: 'rgba(0,0,0,0.12)' }}
    >
      <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      {campos.map((campo) => (
        <div
          key={campo.key}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${campo.anchor.x}%`, top: `${campo.anchor.y}%` }}
        >
          <span
            className="block rounded-full px-2 py-1 text-[10px] font-bold whitespace-nowrap shadow-lg ring-1 ring-black/10"
            style={{ backgroundColor: GOLD, color: '#141414' }}
          >
            {campo.label}: {fmt(valores[campo.key] ?? 0)}
          </span>
        </div>
      ))}
    </figure>
  );
}
