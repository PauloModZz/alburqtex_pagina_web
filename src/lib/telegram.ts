const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined;

export const isTelegramConfigured = Boolean(BOT_TOKEN && CHAT_ID);

const API_BASE = () => `https://api.telegram.org/bot${BOT_TOKEN}`;
const ADMIN_URL = 'https://alburqtex-web.web.app/admin/comentarios';

export interface NewCommentNotification {
  displayName: string;
  rating: number;
  text: string;
  /** Data URI (data:image/jpeg;base64,...) — no hay Storage, así que la
   *  foto viaja como archivo real en el propio POST, no como URL. */
  photoDataUri?: string | null;
}

/** Convierte un data URI a Blob para poder adjuntarlo como archivo real. */
function dataUriToBlob(dataUri: string): Blob {
  const [header, base64] = dataUri.split(',');
  const mime = header.match(/data:(.*?);base64/)?.[1] ?? 'image/jpeg';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

/**
 * Avisa por Telegram cuando entra un comentario nuevo pendiente de revisar.
 * Se llama directo desde el navegador de quien comenta (mismo patrón que
 * el aviso de pedidos por EmailJS) — no hay servidor propio, así que esto
 * nunca debe bloquear ni romper el envío del comentario si falla.
 */
export async function notifyNewComment({ displayName, rating, text, photoDataUri }: NewCommentNotification): Promise<void> {
  if (!isTelegramConfigured) return;

  const stars = '⭐'.repeat(rating);
  const caption =
    `🆕 Comentario nuevo — Alburqtex\n\n` +
    `${stars}\n` +
    `${displayName}\n\n` +
    `"${text}"\n\n` +
    `Revisar y aprobar: ${ADMIN_URL}`;

  try {
    if (photoDataUri) {
      const form = new FormData();
      form.append('chat_id', CHAT_ID!);
      form.append('caption', caption);
      form.append('photo', dataUriToBlob(photoDataUri), 'foto.jpg');
      await fetch(`${API_BASE()}/sendPhoto`, { method: 'POST', body: form });
    } else {
      await fetch(`${API_BASE()}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: caption }),
      });
    }
  } catch {
    // Aviso de mejor esfuerzo solamente — el comentario ya se guardó bien;
    // sigue apareciendo en /admin/comentarios aunque el aviso falle.
  }
}
