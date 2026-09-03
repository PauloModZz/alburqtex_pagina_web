import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where, type Timestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

export interface ApprovedComment {
  id: string;
  uid: string;
  displayName: string;
  rating: number;
  text: string;
  fotoUrl?: string;
  createdAt: Timestamp | null;
}

/**
 * Comentarios reales ya aprobados (colección `comentarios`, status ==
 * 'aprobado') — la misma fuente que usa CommentsSection en el inicio. Se
 * comparte aquí para que /clientes muestre testimonios reales sin duplicar
 * la consulta ni inventar una segunda estructura de datos de reseñas.
 */
export function useApprovedComments() {
  const [comments, setComments] = useState<ApprovedComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, 'comentarios'), where('status', '==', 'aprobado'), orderBy('createdAt', 'desc'));
    getDocs(q)
      .then((snap) => setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ApprovedComment)))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, []);

  return { comments, loading };
}
