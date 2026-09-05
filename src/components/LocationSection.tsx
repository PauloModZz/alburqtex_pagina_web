import { ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

const GOLD = '#C9973F';
const LAT = -2.2125178;
const LNG = -79.8974074;
const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/irbmqr5seb6GuHrL8';
const EMBED_SRC = `https://www.google.com/maps?q=${LAT},${LNG}&z=17&output=embed`;

export default function LocationSection() {
  const { isEnglish } = useLanguage();
  return (
    <section
      className="w-full border-t"
      style={{ backgroundColor: '#FAF7F2', borderColor: 'rgba(0,0,0,0.06)', fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: GOLD, letterSpacing: '0.18em' }}
        >
          {isEnglish ? 'Visit us' : 'Visítanos'}
        </span>
        <h2
          className="mt-3 mb-8"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#141414',
          }}
        >
          {isEnglish ? 'Where to find us' : 'Dónde encontrarnos'}
        </h2>

        <div
          className="grid lg:grid-cols-[1fr_1.3fr] rounded-3xl overflow-hidden border shadow-sm"
          style={{ borderColor: 'rgba(0,0,0,0.08)' }}
        >
          <div
            className="p-8 sm:p-12 flex flex-col justify-center"
            style={{ backgroundColor: '#141414' }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: 'rgba(201,151,63,0.16)' }}
            >
              <MapPin size={20} strokeWidth={2} style={{ color: GOLD }} />
            </div>
            <p className="text-base sm:text-lg text-white leading-relaxed mb-1">
              Calle El Oro 1303, entre Antepara y Machala
            </p>
            <p className="text-sm text-white/50 mb-8">{isEnglish ? 'across from the Metrovía · Guayaquil, Ecuador' : 'diagonal a la Metrovía · Guayaquil, Ecuador'}</p>

            <div className="flex flex-col gap-3">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wide transition-transform duration-200 hover:scale-[1.03]"
                style={{ backgroundColor: GOLD, color: '#141414' }}
              >
                {isEnglish ? 'Open in Google Maps' : 'Abrir en Google Maps'}
                <ExternalLink size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wide border border-white/25 text-white transition-colors duration-200 hover:bg-white/10"
              >
                <MessageCircle size={16} strokeWidth={2.25} />
                {isEnglish ? 'Message us on WhatsApp' : 'Escríbenos por WhatsApp'}
              </a>
            </div>
          </div>

          <div className="relative min-h-[320px] lg:min-h-0">
            <iframe
              title={isEnglish ? 'Alburqtex location on Google Maps' : 'Ubicación de Alburqtex en Google Maps'}
              src={EMBED_SRC}
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', inset: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div
              className="absolute top-4 left-4 flex items-center gap-1.5 bg-white rounded-full pl-2.5 pr-3.5 py-2 text-xs font-semibold shadow-md"
              style={{ color: '#141414' }}
            >
              <MapPin size={13} strokeWidth={2.5} style={{ color: GOLD }} />
              Alburqtex
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
