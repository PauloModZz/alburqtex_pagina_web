import { useState, type FormEvent } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { useApprovedComments } from '../lib/useApprovedComments';
import { useAuth } from '../context/AuthContext';
import StarRating from './StarRating';
import Reveal from './layout/Reveal';

const GOLD = '#C9973F';
const MAX_LENGTH = 500;
const LINK_PATTERN = /(https?:\/\/|www\.)/i;
const MAX_SHOWN = 6;

interface CommentsSectionProps {
  onRequireAuth: () => void;
}

export default function CommentsSection({ onRequireAuth }: CommentsSectionProps) {
  const { user } = useAuth();
  const { comments, loading } = useApprovedComments();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const average = comments.length ? comments.reduce((sum, c) => sum + c.rating, 0) / comments.length : 0;

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
      await addDoc(collection(db, 'comentarios'), {
        uid: user.uid,
        displayName: user.displayName || 'Cliente Alburqtex',
        rating,
        text: trimmed,
        status: 'pendiente',
        createdAt: serverTimestamp(),
      });
      setSent(true);
      setText('');
      setRating(0);
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
                <div className="h-full rounded-2xl p-5 bg-white border" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                  <StarRating value={c.rating} size={13} />
                  <p className="text-sm text-black/70 leading-relaxed mt-3 mb-4">&ldquo;{c.text}&rdquo;</p>
                  <p className="text-xs font-semibold text-black/40">— {c.displayName}</p>
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
            <p className="text-sm text-black/70">¡Gracias por tu comentario! Se publicará en breve.</p>
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
