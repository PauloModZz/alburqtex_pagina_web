import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronDown, ImageOff, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { CATALOG, CATEGORIES, type CatalogProduct } from '../data/catalog';
import { WHATSAPP_LINK } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductOrderModal from './order/ProductOrderModal';
import { SITE_NAV_LINKS } from '../data/navLinks';

const GOLD = '#C9973F';

function InlineNavMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        className="text-black/60 hover:text-black transition-colors"
      >
        {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
      </button>
      {open && (
        <nav
          aria-label="Menú principal"
          className="absolute top-8 right-0 w-64 rounded-2xl bg-white shadow-xl border overflow-hidden py-2 z-50"
          style={{ borderColor: 'rgba(0,0,0,0.08)' }}
        >
          {SITE_NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-5 py-3 text-sm font-semibold text-black/75 hover:text-black transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

const CATEGORY_OPTIONS = ['Todas', ...CATEGORIES];

const CATEGORY_COUNTS: Record<string, number> = CATEGORY_OPTIONS.reduce(
  (acc, cat) => {
    acc[cat] = cat === 'Todas' ? CATALOG.length : CATALOG.filter((p) => p.category === cat).length;
    return acc;
  },
  {} as Record<string, number>,
);

function CategoryFilterBar({ category, onChange }: { category: string; onChange: (cat: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block mb-8">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 text-sm rounded-full border pl-4 pr-3 py-2.5 transition-colors"
        style={{
          borderColor: open ? '#141414' : 'rgba(0,0,0,0.15)',
          color: '#141414',
          backgroundColor: '#fff',
        }}
      >
        <span className="text-black/40">Categoría:</span>
        <span className="font-semibold">{category}</span>
        <ChevronDown
          size={16}
          strokeWidth={2.25}
          className="text-black/40 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Categorías"
          className="absolute left-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] max-h-80 overflow-y-auto rounded-2xl bg-white shadow-xl border py-2 z-30"
          style={{ borderColor: 'rgba(0,0,0,0.08)' }}
        >
          {CATEGORY_OPTIONS.map((opt) => {
            const isActive = category === opt;
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors hover:bg-black/5"
                style={{ color: isActive ? GOLD : '#141414', fontWeight: isActive ? 700 : 500 }}
              >
                <Check size={14} strokeWidth={2.5} className={isActive ? 'opacity-100' : 'opacity-0'} />
                <span className="flex-1">{opt}</span>
                <span className="text-xs text-black/35">{CATEGORY_COUNTS[opt]}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface CatalogPageProps {
  onBack: () => void;
  onOpenAccount: () => void;
  onOpenCart: () => void;
}

export default function CatalogPage({ onBack, onOpenAccount, onOpenCart }: CatalogPageProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [orderingProduct, setOrderingProduct] = useState<CatalogProduct | null>(null);
  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CATALOG.filter((p) => {
      const matchesCategory = category === 'Todas' || p.category === category;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}
    >
      <header className="border-b" style={{ backgroundColor: '#FAF7F2', borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/70 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={2.25} />
            Volver
          </button>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-widest text-black/40">
              {filtered.length} de {CATALOG.length} productos
            </span>
            <button
              type="button"
              onClick={onOpenAccount}
              aria-label="Mi cuenta"
              className="text-black/60 hover:text-black transition-colors"
            >
              <User size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              aria-label="Carrito"
              className="relative text-black/60 hover:text-black transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-[10px] font-bold text-white rounded-full w-4 h-4 flex items-center justify-center"
                  style={{ backgroundColor: GOLD }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <InlineNavMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <h1
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(32px, 6vw, 64px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#141414',
          }}
        >
          Catálogo Alburqtex
        </h1>
        <p className="text-sm text-black/55 mt-2 mb-5 max-w-xl">
          Confeccionamos y personalizamos con tu logo, nombre o escudo. Colores y cantidades a pedido — elaborado en Ecuador.
        </p>

        {/* Búsqueda: fila propia, no compite con las categorías */}
        <div className="relative max-w-sm mb-3">
          <Search
            size={16}
            strokeWidth={2.25}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/35"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto o material..."
            className="w-full text-sm rounded-full border border-black/10 bg-white pl-9 pr-4 py-2.5 outline-none focus:border-black/30 transition-colors"
          />
        </div>

        <CategoryFilterBar category={category} onChange={setCategory} />

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-black/40 text-sm">
            No se encontraron productos con esos filtros.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filtered.map((product) => {
              const whatsappHref = `${WHATSAPP_LINK}?text=${encodeURIComponent(
                `Hola, quiero cotizar: ${product.name} (${product.sku})`,
              )}`;
              return (
                <div
                  key={product.sku}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white border transition-shadow hover:shadow-lg"
                  style={{ borderColor: 'rgba(0,0,0,0.06)' }}
                >
                  <div className="h-40 sm:h-48 shrink-0 p-4 flex items-center justify-center bg-white">
                    {product.fotoReal ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 text-center px-2">
                        <ImageOff size={22} strokeWidth={1.75} className="text-black/25" />
                        <span className="text-[11px] font-medium text-black/35 leading-tight">
                          Foto próximamente
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 px-4 pb-4">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                      style={{ color: GOLD }}
                    >
                      {product.category}
                    </span>
                    <h3 className="text-sm font-semibold leading-snug text-black/90 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-black/45 mb-3 line-clamp-1">{product.material}</p>
                    <div className="mt-auto flex flex-col gap-2">
                      <span className="text-base font-bold text-black/90">
                        ${product.price.toFixed(2)}
                      </span>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-1 text-[11px] font-semibold uppercase tracking-wide rounded-full py-2 text-white transition-colors"
                        style={{ backgroundColor: '#141414' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#141414')}
                      >
                        Cotizar
                        <ArrowRight size={12} strokeWidth={2.5} />
                      </a>
                      <button
                        type="button"
                        onClick={() => setOrderingProduct(product)}
                        className="w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide rounded-full py-2 border transition-colors hover:bg-black/5"
                        style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#141414' }}
                      >
                        <ShoppingBag size={12} strokeWidth={2.25} />
                        Agregar al pedido
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {orderingProduct && (
        <ProductOrderModal
          product={orderingProduct}
          onClose={() => setOrderingProduct(null)}
          onAdded={() => setOrderingProduct(null)}
        />
      )}
    </div>
  );
}
