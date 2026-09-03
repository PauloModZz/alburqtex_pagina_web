import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ImagePlus, X } from 'lucide-react';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { useApprovedComments } from '../lib/useApprovedComments';
import { useAuth } from '../context/AuthContext';
import { notifyNewComment } from '../lib/telegram';
import { compressImage } from '../lib/image';
import StarRating from './StarRating';
import Reveal from './layout/Reveal';

const GOLD = '#C9973F';
const MAX_LENGTH = 500;
const LINK_PATTERN = /(https?:\/\/|www\.)/i;
const MAX_SHOWN = 6;
// Límite generoso sobre el archivo ORIGINAL (antes de comprimir) — la foto
// que de verdad se guarda siempre queda muy por debajo de esto, ver image.ts.
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

interface CommentsSectionProps {
  onRequireAuth: () => void;
}

export default function CommentsSection({ onRequireAuth }: CommentsSectionProps) {
  const { user } = useAuth();
  const { comments, loading } = useApprovedComments();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const average = comments.length ? comments.reduce((sum, c) => sum + c.rating, 0) / comments.length : 0;

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Elige un archivo de imagen.');
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setError('La foto no puede pesar más de 5MB.');
      return;
    }
    setError(null);
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      onRequireAuth();
      return;
    }
    if (rating < 1) {
      setError('Elige una calificación de estrellas.');
      return;
    }
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Escribe tu comentario.');
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Máximo ${MAX_LENGTH} caracteres.`);
      return;
    }
    if (LINK_PATTERN.test(trimmed)) {
      setError('No se permiten enlaces en los comentarios.');
      return;
    }

    setSubmitting(true);
    try {
      const fotoUrl = photo ? await compressImage(photo) : undefined;

      const displayName = user.displayName || 'Cliente Alburqtex';
      await addDoc(collection(db, 'comentarios'), {
        uid: user.uid,
        displayName,
        rating,
        text: trimmed,
        ...(fotoUrl ? { fotoUrl } : {}),
        status: 'pendiente',
        createdAt: serverTimestamp(),
      });

      // Aviso de mejor esfuerzo — si falla, el comentario ya quedó guardado
      // y sigue visible en /admin/comentarios de todas formas.
      notifyNewComment({ displayName, rating, text: trimmed, photoDataUri: fotoUrl });

      setSent(true);
      setText('');
      setRating(0);
      removePhoto();
    } catch {
      setError('No se pudo enviar tu comentario. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isFirebaseConfigured) return null;

  return (
    <section
      className="w-full border-t"
      style={{ backgroundColor: '#FAF7F2', borderColor: 'rgba(0,0,0,0.06)', fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: GOLD, letterSpacing: '0.18em' }}>
          Opiniones
        </span>
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 mb-8">
          <h2
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(26px, 3.6vw, 38px)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#141414',
            }}
          >
            Lo que dicen nuestros clientes
          </h2>
          {comments.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating value={Math.round(average)} size={16} />
              <span className="text-sm text-black/50">
                {average.toFixed(1)} · {comments.length} comentario{comments.length === 1 ? '' : 's'}
              </span>
            </div>
          )}
        </div>

        {!loading && comments.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {comments.slice(0, MAX_SHOWN).map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <div className="h-full rounded-2xl overflow-hidden bg-white border" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                  {c.fotoUrl && (
                    <img src={c.fotoUrl} alt="" loading="lazy" className="w-full h-40 object-cover" />
                  )}
                  <div className="p-5">
                    <StarRating value={c.rating} size={13} />
                    <p className="text-sm text-black/70 leading-relaxed mt-3 mb-4">&ldquo;{c.text}&rdquo;</p>
                    <p className="text-xs font-semibold text-black/40">— {c.displayName}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
        {!loading && comments.length === 0 && (
          <p className="text-sm text-black/40 mb-10">Todavía no hay comentarios — ¡sé el primero en dejar uno!</p>
        )}

        <div className="max-w-md rounded-2xl p-6 bg-white border" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
          {sent ? (
            <p className="text-sm text-black/70">
              ¡Gracias por tu comentario! Lo revisamos y aparecerá publicado en unos minutos.
            </p>
          ) : !user ? (
            <>
              <p className="text-sm text-black/60 mb-4">Inicia sesión para dejar tu comentario.</p>
              <button
                type="button"
                onClick={onRequireAuth}
                className="rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: '#141414' }}
              >
                Iniciar sesión
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-black/50">Tu calificación</p>
              <StarRating value={rating} onChange={setRating} size={24} />
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                maxLength={MAX_LENGTH}
                placeholder="Cuéntanos cómo fue tu experiencia..."
                className="w-full text-sm rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30 transition-colors resize-none"
              />

              {photoPreview ? (
                <div className="relative w-24 h-24">
                  <img src={photoPreview} alt="" className="w-24 h-24 object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={removePhoto}
                    aria-label="Quitar foto"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black/80 text-white flex items-center justify-center"
                  >
                    <X size={13} strokeWidth={2.5} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 self-start text-xs font-semibold text-black/50 hover:text-black/80 transition-colors"
                >
                  <ImagePlus size={16} strokeWidth={2} />
                  Agregar una foto (opcional)
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] disabled:opacity-50"
                style={{ backgroundColor: '#141414' }}
              >
                {submitting ? 'Enviando...' : 'Enviar comentario'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
