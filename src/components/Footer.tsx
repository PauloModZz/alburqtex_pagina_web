import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK } from '../data/products';
import { FacebookIcon, InstagramIcon, TikTokIcon } from './icons/SocialIcons';
import { useLanguage } from '../context/LanguageContext';

const GOLD = '#C9973F';

const SOCIALS = [
  { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/alburqtex/' },
  { icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com/alburqtex' },
  { icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@alburqtex.ec' },
];

const LEGAL_LINKS = [
  { label: 'Términos y condiciones', labelEn: 'Terms and conditions', id: 'productos' },
  { label: 'Política de privacidad', labelEn: 'Privacy policy', id: 'privacidad' },
  { label: 'Política de cookies', labelEn: 'Cookie policy', id: 'cookies' },
  { label: 'Envíos y devoluciones', labelEn: 'Shipping and returns', id: 'devoluciones' },
];

const EXPLORE_LINKS = [
  { label: 'Preguntas frecuentes', labelEn: 'Frequently asked questions', to: '/preguntas-frecuentes' },
  { label: 'Galería de trabajos', labelEn: 'Work gallery', to: '/galeria' },
  { label: 'Guía de tallas', labelEn: 'Size guide', to: '/guia-de-tallas' },
  { label: 'Clientes y testimonios', labelEn: 'Clients and testimonials', to: '/clientes' },
  { label: 'Blog', labelEn: 'Blog', to: '/blog' },
];

interface FooterProps {
  onOpenLegal: (sectionId?: string) => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  const year = new Date().getFullYear();
  const { isEnglish, localizePath } = useLanguage();

  return (
    <footer style={{ backgroundColor: '#141414', fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-14 sm:pt-20 pb-8">
        <div className="grid sm:grid-cols-5 gap-10 sm:gap-8 mb-14">
          <div className="sm:col-span-2">
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: '28px',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              Alburqtex
            </span>
            <p className="text-sm text-white/50 mt-3 leading-relaxed max-w-xs">
              {isEnglish
                ? 'High-quality garment manufacturing, embroidery, printing and sublimation. Made in Guayaquil for individuals, institutions and companies.'
                : 'Confección, bordado, estampado y sublimado de alto nivel. Desde Guayaquil para ti, para instituciones y empresas. Fabricamos y personalizamos con calidad y confianza.'}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{isEnglish ? 'Explore' : 'Explora'}</p>
            <ul className="space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={localizePath(link.to)} className="text-sm text-white/50 hover:text-white transition-colors">
                    {isEnglish ? link.labelEn : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{isEnglish ? 'Contact' : 'Contacto'}</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-3"
            >
              <MessageCircle size={16} strokeWidth={2} style={{ color: GOLD }} />
              {isEnglish ? 'Message us on WhatsApp' : 'Escríbenos por WhatsApp'}
            </a>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              Calle El Oro 1303, entre Antepara y Machala
              <br />
              Guayaquil, Ecuador
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Icon width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Legal</p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onOpenLegal(link.id)}
                    className="text-sm text-white/50 hover:text-white transition-colors text-left"
                  >
                    {isEnglish ? link.labelEn : link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-xs text-white/35">
            © {year} Alburqtex. {isEnglish ? 'All rights reserved. Made in Ecuador.' : 'Todos los derechos reservados. Hecho en Ecuador.'}
          </p>
          <button
            type="button"
            onClick={() => onOpenLegal()}
            className="text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-2 text-left sm:text-right"
          >
            {isEnglish ? 'View all legal terms' : 'Ver todos los términos legales'}
          </button>
        </div>
      </div>
    </footer>
  );
}
