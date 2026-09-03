import { useEffect, useState, type FormEvent } from 'react';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { UserPlus, X } from 'lucide-react';
import { db } from '../../lib/firebase';

interface Recipient {
  chatId: string;
  label: string;
}

/**
 * Quién más recibe el aviso de Telegram por comentario nuevo, aparte del
 * admin (que ya está fijo por variable de entorno). Cada persona consigue
 * su propio chat_id mandándole cualquier mensaje al bot @AlburqtexAvisosBot
 * — no hay forma de "invitar" desde acá, Telegram no lo permite sin que
 * la otra persona le escriba al bot primero.
 */
export default function AdminRecipients() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [label, setLabel] = useState('');
  const [chatId, setChatId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'telegramRecipients'), (snap) => {
      setRecipients(snap.docs.map((d) => ({ chatId: d.id, label: (d.data().label as string) || d.id })));
    });
    return unsubscribe;
  }, []);

  const addRecipient = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const id = chatId.trim();
    if (!/^-?\d+$/.test(id)) {
      setError('El chat ID es solo números (puede empezar con "-").');
      return;
    }
    setSaving(true);
    try {
      await setDoc(doc(db, 'telegramRecipients', id), { label: label.trim() || id });
      setLabel('');
      setChatId('');
    } catch {
      setError('No se pudo agregar. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const removeRecipient = (id: string) => deleteDoc(doc(db, 'telegramRecipients', id));

  return (
    <div className="mb-10 rounded-2xl bg-white border p-5" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/60"
      >
        <UserPlus size={15} strokeWidth={2.25} />
        Personas con acceso ({recipients.length + 1})
        <span className="text-black/30">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="mt-4">
          <p className="text-xs text-black/45 leading-relaxed mb-4">
            Además de ti, estas personas también reciben el aviso de Telegram y pueden aprobar/rechazar. Para
            agregar a alguien, que haga 2 cosas en Telegram (una sola vez): 1) escribirle cualquier mensaje a{' '}
            <strong>@AlburqtexAvisosBot</strong> (así el bot puede escribirle a ella); 2) escribirle a{' '}
            <strong>@userinfobot</strong>, que le responde al toque con su "Id" (un número). Que te mande ese
            número por WhatsApp y lo pegas aquí.
          </p>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center justify-between rounded-xl px-3 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
              <span className="text-sm font-medium text-black/70">Tú (administrador principal)</span>
            </div>
            {recipients.map((r) => (
              <div key={r.chatId} className="flex items-center justify-between rounded-xl px-3 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
                <span className="text-sm text-black/70">
                  {r.label} <span className="text-black/35">· {r.chatId}</span>
                </span>
                <button type="button" onClick={() => removeRecipient(r.chatId)} aria-label="Quitar" className="text-black/40 hover:text-black/80">
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={addRecipient} className="flex flex-col sm:flex-row gap-2">
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Nombre (opcional)"
              className="flex-1 text-sm rounded-full border border-black/10 bg-white px-4 py-2.5 outline-none focus:border-black/30 transition-colors"
            />
            <input
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="Chat ID de Telegram"
              inputMode="numeric"
              className="flex-1 text-sm rounded-full border border-black/10 bg-white px-4 py-2.5 outline-none focus:border-black/30 transition-colors"
            />
            <button
              type="submit"
              disabled={saving || !chatId.trim()}
              className="rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white disabled:opacity-50"
              style={{ backgroundColor: '#141414' }}
            >
              Agregar
            </button>
          </form>
          {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
}
