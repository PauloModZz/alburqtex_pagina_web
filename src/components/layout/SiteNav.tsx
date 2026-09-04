import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SITE_NAV_LINKS } from '../../data/navLinks';

const GOLD = '#C9973F';

/**
 * Menú fijo, visible en cualquier página y sin importar cuánto se haya
 * scrolleado — antes estos enlaces solo vivían al fondo del todo, en el
 * footer, y nadie los encontraba sin bajar hasta el final.
 */
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [location.pathname]);

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
    <div ref={ref} className="fixed top-4 right-4 sm:top-6 sm:right-6" style={{ zIndex: 90 }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      >
        {open ? <X size={19} strokeWidth={2.25} color="#141414" /> : <Menu size={19} strokeWidth={2.25} color="#141414" />}
      </button>

      {open && (
        <nav
          aria-label="Menú principal"
          className="absolute top-14 right-0 w-64 rounded-2xl bg-white shadow-xl border overflow-hidden py-2"
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
