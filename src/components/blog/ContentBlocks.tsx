import { ArrowRight, Info, Lightbulb, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ContentBlock } from '../../data/blog';

const GOLD = '#C9973F';

const CALLOUT_STYLE = {
  consejo: { icon: Lightbulb, label: 'Consejo', color: '#2E7D32' },
  advertencia: { icon: TriangleAlert, label: 'Advertencia', color: '#B3261E' },
  dato: { icon: Info, label: 'Dato', color: '#1565C0' },
};

export default function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2
              key={i}
              id={block.id}
              className="scroll-mt-28 text-lg sm:text-xl font-bold text-black/90 mt-4"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === 'p') {
          return (
            <p key={i} className="text-[15px] text-black/65 leading-[1.8] max-w-[68ch]">
              {block.text}
            </p>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul key={i} className="flex flex-col gap-2 max-w-[68ch]">
              {block.items.map((item, j) => (
                <li key={j} className="text-[15px] text-black/65 leading-relaxed flex gap-2.5">
                  <span style={{ color: GOLD }} className="shrink-0">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'callout') {
          const { icon: Icon, label, color } = CALLOUT_STYLE[block.kind];
          return (
            <div
              key={i}
              className="max-w-[68ch] rounded-2xl p-5 flex gap-3"
              style={{ backgroundColor: `${color}0F`, border: `1px solid ${color}33` }}
            >
              <Icon size={18} strokeWidth={2.25} style={{ color }} className="shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color }}>
                  {label}
                </p>
                <p className="text-sm text-black/70 leading-relaxed">{block.text}</p>
              </div>
            </div>
          );
        }
        if (block.type === 'link') {
          return (
            <Link
              key={i}
              to={block.href}
              className="group max-w-[68ch] rounded-2xl p-5 flex items-center justify-between gap-4 border transition-colors hover:bg-black/[0.02]"
              style={{ borderColor: 'rgba(0,0,0,0.1)' }}
            >
              <div>
                <p className="text-sm font-bold text-black/85 mb-1">{block.label}</p>
                <p className="text-xs text-black/50 leading-relaxed">{block.description}</p>
              </div>
              <ArrowRight size={18} strokeWidth={2.25} className="shrink-0 text-black/40 group-hover:translate-x-1 transition-transform" />
            </Link>
          );
        }
        if (block.type === 'table') {
          return (
            <div key={i} className="max-w-[68ch] overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                    {block.headers.map((h, k) => (
                      <th key={k} className="text-left py-2 pr-4 font-semibold text-black/70 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr key={r} className="border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                      {row.map((cell, c) => (
                        <td key={c} className="py-2 pr-4 text-black/60">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
