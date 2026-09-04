import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, Check, LogOut, X } from 'lucide-react';
import { collection, getDocs, orderBy, query, where, type Timestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { checkPasswordStrength, PASSWORD_REQUIREMENTS } from '../../lib/validators';
import { sizeLabel } from '../../lib/format';
import SiteNav from '../layout/SiteNav';

const STATUS_LABEL: Record<string, string> = {
  pendiente: 'Pendiente de revisión',
  cotizado: 'Cotizado',
  confirmado: 'Confirmado',
  en_produccion: 'En producción',
  completado: 'Completado',
  cancelado: 'Cancelado',
};

interface OrderItem {
  sku: string;
  productName: string;
  size: string;
  quantity: number;
  hasName: boolean;
  nameText: string | null;
  hasLogo: boolean;
}

interface Order {
  id: string;
  status: string;
  notes: string | null;
  createdAt: Timestamp | null;
  items: OrderItem[];
}

interface AccountPageProps {
  onBack: () => void;
}

export default function AccountPage({ onBack }: AccountPageProps) {
  const { user, signOut, updatePassword } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'pedidos'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    getDocs(q).then((snap) => {
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Order));
      setLoadingOrders(false);
    });
  }, [user]);

  // Safety net: this screen should only ever be reached while logged in.
  // If it isn't (e.g. cancelling out of login), bounce back instead of
  // rendering blank.
  useEffect(() => {
    if (!user) onBack();
  }, [user, onBack]);

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordMessage(null);
    const check = checkPasswordStrength(newPassword);
    if (!check.valid) {
      setPasswordError('La contraseña no cumple los requisitos mínimos.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden.');
      return;
    }
    const { error } = await updatePassword(newPassword);
    if (error) {
      setPasswordError(error);
      return;
    }
    setPasswordMessage('Contraseña actualizada.');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordForm(false);
  };

  if (!user) return null;

  const fullName = user.displayName || user.email;

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
            Volver
          </button>
          <h1
            style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(28px, 5vw, 44px)', textTransform: 'uppercase', color: '#141414' }}
          >
            Mi cuenta
          </h1>
          <p className="text-sm text-black/50 mt-1">
            {fullName} · {user.email}
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 pt-6 pb-24">
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            type="button"
            onClick={() => setShowPasswordForm((v) => !v)}
            className="text-xs font-semibold uppercase tracking-wide rounded-full px-4 py-2.5 border transition-colors hover:bg-black/5"
            style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#141414' }}
          >
            Cambiar contraseña
          </button>
          <button
            type="button"
            onClick={() => void signOut().then(onBack)}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide rounded-full px-4 py-2.5 border transition-colors hover:bg-black/5"
            style={{ borderColor: 'rgba(0,0,0,0.15)', color: '#141414' }}
          >
            <LogOut size={14} strokeWidth={2.25} />
            Cerrar sesión
          </button>
        </div>

        {showPasswordForm && (
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-white rounded-2xl border p-5 mb-10 flex flex-col gap-3 max-w-sm"
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
              className="w-full text-sm rounded-full border border-black/10 px-4 py-2.5 outline-none focus:border-black/30 transition-colors"
            />
            {newPassword.length > 0 && (
              <ul className="text-xs grid grid-cols-2 gap-x-3 gap-y-1 pl-1">
                {PASSWORD_REQUIREMENTS.map((req) => {
                  const ok = req.test(newPassword);
                  return (
                    <li key={req.label} className="flex items-center gap-1.5">
                      {ok ? (
                        <Check size={12} strokeWidth={3} className="text-green-600 shrink-0" />
                      ) : (
                        <X size={12} strokeWidth={3} className="text-black/25 shrink-0" />
                      )}
                      <span className={ok ? 'text-black/50' : 'text-black/35'}>{req.label}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar nueva contraseña"
              className="w-full text-sm rounded-full border border-black/10 px-4 py-2.5 outline-none focus:border-black/30 transition-colors"
            />
            {passwordError && <p className="text-xs text-red-600">{passwordError}</p>}
            <button
              type="submit"
              className="rounded-full py-2.5 text-sm font-semibold uppercase tracking-wide text-white"
              style={{ backgroundColor: '#141414' }}
            >
              Guardar
            </button>
          </form>
        )}
        {passwordMessage && <p className="text-xs text-green-700 mb-8 -mt-6">{passwordMessage}</p>}

        <p className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-4">Mis pedidos</p>
        {loadingOrders ? (
          <p className="text-sm text-black/40">Cargando...</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-black/40">Todavía no tienes pedidos registrados.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border p-5" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#C9973F' }}>
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                  <span className="text-xs text-black/40">
                    {order.createdAt?.toDate().toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric' }) ?? ''}
                  </span>
                </div>
                <ul className="space-y-1">
                  {order.items.map((item, i) => (
                    <li key={i} className="text-sm text-black/70">
                      {item.quantity}x {item.productName} — {sizeLabel(item.size).toLowerCase()}
                      {item.hasName && ` · nombre: "${item.nameText}"`}
                      {item.hasLogo && ' · con logo'}
                    </li>
                  ))}
                </ul>
                {order.notes && <p className="text-xs text-black/40 italic mt-2">"{order.notes}"</p>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
