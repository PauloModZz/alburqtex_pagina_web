import { useState } from 'react';
import { ArrowLeft, ArrowRight, ImagePlus, Info, Minus, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { WHATSAPP_LINK } from '../../data/products';
import { sizeLabel } from '../../lib/format';
import { DEFAULT_COUNTRY, toE164, type CountryCode } from '../../lib/phone';
import PhoneInput from '../PhoneInput';
import SiteNav from '../layout/SiteNav';
import { useLanguage } from '../../context/LanguageContext';
import { catalogTextEn } from '../../data/en';

interface CartPageProps {
  onBack: () => void;
  onRequireAuth: () => void;
  onOpenCatalog: () => void;
}

export default function CartPage({ onBack, onRequireAuth, onOpenCatalog }: CartPageProps) {
  const { isEnglish } = useLanguage();
  const { user } = useAuth();
  const { items, removeItem, updateQuantity, submitOrder } = useCart();
  const [orderNotes, setOrderNotes] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactPhoneCountry, setContactPhoneCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [lastContactPhone, setLastContactPhone] = useState('');

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = async () => {
    if (!user) {
      onRequireAuth();
      return;
    }
    const e164Phone = toE164(contactPhone, contactPhoneCountry);
    if (!e164Phone) {
      setError(isEnglish ? 'Enter a valid contact number so we can reach you.' : 'Ingresa un número de contacto válido para que podamos escribirte.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const { error: err } = await submitOrder({
      uid: user.uid,
      displayName: user.displayName ?? '',
      email: user.email ?? '',
      contactPhone: e164Phone,
      orderNotes: orderNotes.trim(),
    });
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    setLastContactPhone(e164Phone);
    setDone(true);
  };

  const whatsappSummary = () => {
    const lines = items.map(
      (i) =>
        `• ${i.name} — ${sizeLabel(i.size).toLowerCase()} x${i.quantity}${i.hasName ? ` — nombre: ${i.nameText}` : ''}${i.hasLogo ? ' — quiere logo personalizado (te paso el archivo por aquí)' : ''}`,
    );
    return [
      'Hola, acabo de registrar este pedido en la web:',
      `Nombre: ${user?.displayName ?? ''}`,
      `Correo: ${user?.email ?? ''}`,
      `Teléfono de contacto: ${lastContactPhone}`,
      '',
      ...lines,
      '',
      `Total estimado: $${total.toFixed(2)}`,
    ].join('\n');
  };

  if (done) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center px-4 text-center"
        style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}
      >
        <SiteNav />
        <div className="max-w-sm">
          <h1
            style={{ fontFamily: "'Anton', sans-serif", fontSize: '32px', textTransform: 'uppercase', color: '#141414' }}
            className="mb-3"
          >
            {isEnglish ? 'Order submitted!' : '¡Pedido enviado!'}
          </h1>
          <p className="text-sm text-black/60 mb-4 leading-relaxed">
            {isEnglish ? 'We received your order. Message us on WhatsApp with the button below to confirm payment and begin production.' : 'Registramos tu pedido. Para confirmarlo y comenzar a producirlo, escríbenos por WhatsApp con el botón de abajo — así te confirmamos el pago y arrancamos.'}
          </p>
          <div
            className="text-left rounded-2xl p-4 mb-8 text-xs text-black/60 leading-relaxed"
            style={{ backgroundColor: 'rgba(201,151,63,0.08)' }}
          >
            {isEnglish ? <><strong className="text-black/80">Payment methods:</strong> bank transfer, deposit or cash at the workshop. A <strong>50% deposit</strong> is required to begin personalized production.</> : <><strong className="text-black/80">Formas de pago:</strong> transferencia, depósito o efectivo (efectivo solo en el local). Todo se coordina por WhatsApp. Para iniciar la producción de tu pedido personalizado se requiere un <strong>abono del 50%</strong>.</>}
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={`${WHATSAPP_LINK}?text=${encodeURIComponent(whatsappSummary())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full py-3 text-sm font-semibold uppercase tracking-wide text-white"
              style={{ backgroundColor: '#141414' }}
            >
              {isEnglish ? 'Continue on WhatsApp' : 'Avisar por WhatsApp'}
            </a>
            <button
              type="button"
              onClick={onOpenCatalog}
              className="rounded-full py-3 text-sm font-semibold uppercase tracking-wide border"
              style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#141414' }}
            >
              {isEnglish ? 'Continue browsing the catalog' : 'Seguir viendo el catálogo'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}>
      <SiteNav />
      <header className="border-b" style={{ backgroundColor: '#FAF7F2', borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-5 pb-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/60 hover:text-black transition-colors mb-4"
          >
            <ArrowLeft size={16} strokeWidth={2.25} />
            {isEnglish ? 'Back' : 'Volver'}
          </button>
          <h1
            style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(28px, 5vw, 44px)', textTransform: 'uppercase', color: '#141414' }}
          >
            {isEnglish ? 'Your order' : 'Tu pedido'}
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 pt-6 pb-24">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-black/50 mb-6">{isEnglish ? 'You have not added any products yet.' : 'Todavía no agregaste productos a tu pedido.'}</p>
            <button
              type="button"
              onClick={onOpenCatalog}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
              style={{ backgroundColor: '#141414' }}
            >
              {isEnglish ? 'View catalog' : 'Ver catálogo'}
              <ArrowRight size={16} strokeWidth={2.25} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white rounded-2xl border p-4"
                  style={{ borderColor: 'rgba(0,0,0,0.06)' }}
                >
                  <img src={item.image} alt={isEnglish ? catalogTextEn(item.name) : item.name} className="w-16 h-16 object-contain shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-black/90">{isEnglish ? catalogTextEn(item.name) : item.name}</p>
                    <p className="text-xs text-black/45 mt-0.5">
                      {sizeLabel(item.size)}
                      {item.hasName && ` · ${isEnglish ? 'Name' : 'Nombre'}: "${item.nameText}"`}
                    </p>
                    {item.hasLogo && (
                      <p className="text-xs text-black/45 mt-0.5 flex items-center gap-1">
                        <ImagePlus size={12} strokeWidth={2} /> {isEnglish ? 'Custom logo requested' : 'Quiere logo personalizado'}
                      </p>
                    )}
                    {item.notes && <p className="text-xs text-black/40 mt-0.5 italic">"{item.notes}"</p>}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-black/5 transition-colors"
                        style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                      >
                        <Minus size={12} strokeWidth={2.5} />
                      </button>
                      <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-black/5 transition-colors"
                        style={{ borderColor: 'rgba(0,0,0,0.15)' }}
                      >
                        <Plus size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-black/30 hover:text-red-600 transition-colors"
                      aria-label={isEnglish ? 'Remove' : 'Quitar'}
                    >
                      <Trash2 size={16} strokeWidth={2} />
                    </button>
                    <span className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <label className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-2 block">
              {isEnglish ? 'Contact number' : 'Número de contacto'}
            </label>
            <div className="mb-4">
              <PhoneInput
                country={contactPhoneCountry}
                onCountryChange={setContactPhoneCountry}
                value={contactPhone}
                onChange={setContactPhone}
                placeholder={isEnglish ? 'Which number should we contact about this order?' : '¿A qué número te escribimos por este pedido?'}
              />
            </div>

            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              rows={3}
              placeholder={isEnglish ? 'General notes for the order (optional)' : 'Notas generales para todo el pedido (opcional)'}
              className="w-full text-sm rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors resize-none mb-6"
            />

            <div
              className="flex gap-3 rounded-2xl p-4 mb-6 text-xs text-black/60 leading-relaxed"
              style={{ backgroundColor: 'rgba(201,151,63,0.08)' }}
            >
              <Info size={16} strokeWidth={2} className="shrink-0 mt-0.5" style={{ color: '#C9973F' }} />
              <p>
                {isEnglish ? <>We accept <strong>bank transfer, deposit or cash</strong> at the workshop. Payment is coordinated through WhatsApp and a <strong>50% deposit</strong> starts personalized production.</> : <>Manejamos <strong>transferencia, depósito o efectivo</strong> (efectivo solo en el local) — todo se coordina por WhatsApp. Para comenzar tu pedido personalizado se requiere un <strong>abono del 50%</strong>.</>}
              </p>
            </div>

            <div className="flex items-center justify-between mb-2 text-sm text-black/50">
              <span>{isEnglish ? 'Estimate (final price confirmed in the quote)' : 'Estimado (precio final se confirma en la cotización)'}</span>
              <span className="font-bold text-black/90 text-base">${total.toFixed(2)}</span>
            </div>

            {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full rounded-full py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-[1.01] disabled:opacity-50"
              style={{ backgroundColor: '#141414' }}
            >
              {submitting ? (isEnglish ? 'Submitting...' : 'Enviando...') : user ? (isEnglish ? 'Submit order' : 'Finalizar pedido') : (isEnglish ? 'Sign in to finish' : 'Inicia sesión para finalizar')}
            </button>
          </>
        )}
      </main>
    </div>
  );
}
