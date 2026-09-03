import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined;
const PRIMARY_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined;

export const isTelegramConfigured = Boolean(BOT_TOKEN && PRIMARY_CHAT_ID);

const API_BASE = () => `https://api.telegram.org/bot${BOT_TOKEN}`;
const ADMIN_URL = 'https://alburqtex-web.web.app/admin/comentarios';

export interface NewCommentNotification {
  id: string;
  approveToken: string;
  displayName: string;
  rating: number;
  text: string;
  /** Data URI (data:image/jpeg;base64,...) — no hay Storage, así que la
   *  foto viaja como archivo real en el propio POST, no como URL. */
  photoDataUri?: string | null;
}

/**
 * Código al azar, largo e imposible de adivinar, que se guarda en el propio
 * comentario y viaja en el link de "Aprobar"/"Rechazar" del aviso — es lo
 * que permite que ese botón funcione sin tener que iniciar sesión primero.
 */
export function generateApproveToken(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 36).toString(36)).join('');
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
 * Sin servidor propio, un botón de Telegram no puede "ejecutar" nada por su
 * cuenta (eso es `callback_data`, que necesita un bot con backend). Lo que
 * sí puede hacer sin backend es abrir un link (`url`) — así que cada botón
 * abre /admin/comentarios con la acción ya indicada en la URL; esa página,
 * si ya hay sesión de administrador, la aplica al toque y no hace falta
 * buscar el comentario en una lista.
 */
function approveRejectKeyboard(id: string, approveToken: string) {
  const base = `${ADMIN_URL}?id=${id}&token=${encodeURIComponent(approveToken)}`;
  return {
    inline_keyboard: [
      [
        { text: '✅ Aprobar', url: `${base}&action=approve` },
        { text: '❌ Rechazar', url: `${base}&action=reject` },
      ],
    ],
  };
}

/** El admin (correo fijo por variable de entorno) más quien se haya agregado desde /admin/comentarios. */
async function getRecipientChatIds(): Promise<string[]> {
  const ids = new Set<string>();
  if (PRIMARY_CHAT_ID) ids.add(PRIMARY_CHAT_ID);
  try {
    const snap = await getDocs(collection(db, 'telegramRecipients'));
    snap.forEach((d) => ids.add(d.id));
  } catch {
    // Si falla la lectura, al menos le llega al admin principal.
  }
  return Array.from(ids);
}

async function sendToOne(chatId: string, caption: string, keyboard: object, photoDataUri?: string | null) {
  if (photoDataUri) {
    const form = new FormData();
    form.append('chat_id', chatId);
    form.append('caption', caption);
    form.append('reply_markup', JSON.stringify(keyboard));
    form.append('photo', dataUriToBlob(photoDataUri), 'foto.jpg');
    await fetch(`${API_BASE()}/sendPhoto`, { method: 'POST', body: form });
  } else {
    await fetch(`${API_BASE()}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: caption, reply_markup: keyboard }),
    });
  }
}

/**
 * Avisa por Telegram (al admin y a quien más tenga acceso) cuando entra un
 * comentario nuevo pendiente de revisar. Se llama directo desde el
 * navegador de quien comenta (mismo patrón que el aviso de pedidos por
 * EmailJS) — no hay servidor propio, así que esto nunca debe bloquear ni
 * romper el envío del comentario si falla.
 */
export async function notifyNewComment({ id, approveToken, displayName, rating, text, photoDataUri }: NewCommentNotification): Promise<void> {
  if (!isTelegramConfigured) return;

  const stars = '⭐'.repeat(rating);
  const caption = `🆕 Comentario nuevo — Alburqtex\n\n${stars}\n${displayName}\n\n"${text}"`;
  const keyboard = approveRejectKeyboard(id, approveToken);

  try {
    const chatIds = await getRecipientChatIds();
    await Promise.allSettled(chatIds.map((chatId) => sendToOne(chatId, caption, keyboard, photoDataUri)));
  } catch {
    // Aviso de mejor esfuerzo solamente — el comentario ya se guardó bien;
    // sigue apareciendo en /admin/comentarios aunque el aviso falle.
  }
}
