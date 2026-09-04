import { MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK } from '../../data/products';

interface WhatsAppFloatButtonProps {
  /** Mensaje ya redactado para esta página — precargado en WhatsApp, editable por el usuario antes de enviar. */
  message: string;
}

/** Botón flotante de WhatsApp, presente en las páginas nuevas, con mensaje distinto según desde dónde se abre. */
export default function WhatsAppFloatButton({ message }: WhatsAppFloatButtonProps) {
  const href = `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
      style={{ backgroundColor: '#1F1F1F', width: 56, height: 56 }}
    >
      <MessageCircle size={24} strokeWidth={2} color="#fff" />
    </a>
  );
}
