import { useState } from 'react';
import { ImagePlus, Minus, Plus, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { CatalogProduct } from '../../data/catalog';

const GOLD = '#C9973F';

interface ProductOrderModalProps {
  product: CatalogProduct;
  onClose: () => void;
  onAdded: () => void;
}

export default function ProductOrderModal({ product, onClose, onAdded }: ProductOrderModalProps) {
  const { addItem } = useCart();
  const sizes = product.sizes
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const [size, setSize] = useState(sizes[0] ?? '');
  const [quantity, setQuantity] = useState(1);
  const [hasName, setHasName] = useState(false);
  const [nameText, setNameText] = useState('');
  const [hasLogo, setHasLogo] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!size) {
      setError('Elige una talla.');
      return;
    }
    if (hasName && !nameText.trim()) {
      setError('Escribe el nombre que llevará la prenda.');
      return;
    }

    addItem({
      sku: product.sku,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
      quantity,
      hasName,
      nameText: nameText.trim(),
      hasLogo,
      notes: notes.trim(),
    });
    onAdded();
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', fontFamily: 'Inter, sans-serif' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl overflow-y-auto max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 p-5 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
          <img src={product.image} alt={product.name} className="w-16 h-16 object-contain shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-black/90 leading-snug">{product.name}</p>
            <p className="text-xs text-black/45 mt-0.5">{product.material}</p>
            <p className="text-sm font-bold mt-1">${product.price.toFixed(2)}</p>
          </div>
          <button type="button" onClick={onClose} className="text-black/40 hover:text-black transition-colors">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-2 block">
              Talla
            </label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className="text-xs font-semibold rounded-full px-3.5 py-2 border transition-colors"
                  style={
                    size === s
                      ? { backgroundColor: '#141414', color: '#fff', borderColor: '#141414' }
                      : { backgroundColor: 'transparent', color: '#141414', borderColor: 'rgba(0,0,0,0.15)' }
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-2 block">
              Cantidad
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-black/5 transition-colors"
                style={{ borderColor: 'rgba(0,0,0,0.15)' }}
              >
                <Minus size={14} strokeWidth={2.5} />
              </button>
              <span className="text-sm font-semibold w-6 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-black/5 transition-colors"
                style={{ borderColor: 'rgba(0,0,0,0.15)' }}
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2.5 text-sm text-black/80 cursor-pointer">
            <input
              type="checkbox"
              checked={hasName}
              onChange={(e) => setHasName(e.target.checked)}
              className="w-4 h-4 accent-[#141414]"
            />
            ¿Lleva nombre bordado o estampado?
          </label>
          {hasName && (
            <input
              type="text"
              value={nameText}
              onChange={(e) => setNameText(e.target.value)}
              placeholder="Nombre exacto a personalizar"
              className="w-full text-sm rounded-full border border-black/10 bg-white px-4 py-2.5 outline-none focus:border-black/30 transition-colors -mt-2"
            />
          )}

          <label className="flex items-center gap-2.5 text-sm text-black/80 cursor-pointer">
            <input
              type="checkbox"
              checked={hasLogo}
              onChange={(e) => setHasLogo(e.target.checked)}
              className="w-4 h-4 accent-[#141414]"
            />
            ¿Quieres logo personalizado?
          </label>
          {hasLogo && (
            <div
              className="-mt-2 flex items-start gap-2.5 rounded-xl p-3 text-xs text-black/60 leading-relaxed"
              style={{ backgroundColor: 'rgba(201,151,63,0.08)' }}
            >
              <ImagePlus size={16} strokeWidth={2} className="shrink-0 mt-0.5" style={{ color: GOLD }} />
              <span>
                Anotado. Después de enviar tu pedido, coordina el archivo de tu logo con nosotros por
                WhatsApp.
              </span>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-2 block">
              Descripción / notas (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Color, ubicación del bordado, referencias, etc."
              className="w-full text-sm rounded-xl border border-black/10 bg-white px-4 py-2.5 outline-none focus:border-black/30 transition-colors resize-none"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-full py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: GOLD }}
          >
            Agregar al pedido
          </button>
        </div>
      </div>
    </div>
  );
}
