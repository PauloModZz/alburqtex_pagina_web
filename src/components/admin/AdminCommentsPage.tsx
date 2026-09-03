import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where, type Timestamp } from 'firebase/firestore';
import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../layout/PageHeader';
import StarRating from '../StarRating';
import AuthPage from '../auth/AuthPage';
import { useAuth } from '../../context/AuthContext';
import { db, isFirebaseConfigured } from '../../lib/firebase';
import { useSeo } from '../../lib/seo';

// Único correo que puede aprobar/rechazar — debe coincidir exactamente con
// isAdmin() en firestore.rules, que es lo que de verdad protege los datos.
// Esta comprobación aquí es solo para mostrar la interfaz correcta; quien
// no sea este correo no puede leer/escribir los comentarios de todas
// formas, aunque burle esta pantalla.
const ADMIN_EMAIL = 'paulo.abad10200@gmail.com';

interface PendingComment {
  id: string;
  uid: string;
  displayName: string;
  rating: number;
  text: string;
  fotoUrl?: string;
  createdAt: Timestamp | null;
}

export default function AdminCommentsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [comments, setComments] = useState<PendingComment[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  useSeo({
    title: 'Comentarios pendientes',
    description: 'Panel de moderación de comentarios de Alburqtex.',
    path: '/admin/comentarios',
  });

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, 'comentarios'), where('status', '==', 'pendiente'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as PendingComment));
    });
    return unsubscribe;
  }, [isAdmin]);

  const approve = async (id: string) => {
    setBusyId(id);
    try {
      await updateDoc(doc(db, 'comentarios', id), { status: 'aprobado' });
    } finally {
      setBusyId(null);
    }
  };

  const reject = async (id: string) => {
    setBusyId(id);
    try {
      await deleteDoc(doc(db, 'comentarios', id));
    } finally {
      setBusyId(null);
    }
  };

  if (!isFirebaseConfigured) return null;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#FAF7F2', fontFamily: 'Inter, sans-serif' }}>
      <PageHeader
        eyebrow="Panel"
        title="Comentarios pendientes"
        description="Revisa, aprueba o rechaza los comentarios que dejan los clientes antes de que se publiquen."
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        {loading ? null : !user ? (
          <AuthPage onBack={() => navigate('/')} onAuthenticated={() => {}} />
        ) : !isAdmin ? (
          <p className="text-sm text-black/60">
            Esta cuenta no tiene acceso a este panel. Inicia sesión con la cuenta de administrador.
          </p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-black/40">No hay comentarios pendientes por revisar.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {comments.map((c) => (
              <div key={c.id} className="rounded-2xl overflow-hidden bg-white border" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                {c.fotoUrl && <img src={c.fotoUrl} alt="" className="w-full max-h-72 object-cover" />}
                <div className="p-5">
                  <StarRating value={c.rating} size={16} />
                  <p className="text-sm text-black/80 leading-relaxed mt-3 mb-2">&ldquo;{c.text}&rdquo;</p>
                  <p className="text-xs font-semibold text-black/40 mb-4">— {c.displayName}</p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => approve(c.id)}
                      disabled={busyId === c.id}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] disabled:opacity-50"
                      style={{ backgroundColor: '#141414' }}
                    >
                      <Check size={16} strokeWidth={2.5} />
                      Aprobar
                    </button>
                    <button
                      type="button"
                      onClick={() => reject(c.id)}
                      disabled={busyId === c.id}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-semibold uppercase tracking-wide border transition-colors hover:bg-black/5 disabled:opacity-50"
                      style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#141414' }}
                    >
                      <X size={16} strokeWidth={2.5} />
                      Rechazar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
