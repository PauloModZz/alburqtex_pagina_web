import { createContext, useContext, useState, type ReactNode } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { sendClientOrderConfirmation, sendNewOrderNotification } from '../lib/email';
import { sizeLabel } from '../lib/format';

export interface CartItem {
  id: string;
  sku: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
  hasName: boolean;
  nameText: string;
  hasLogo: boolean;
  notes: string;
}

export interface SubmitOrderParams {
  uid: string;
  displayName: string;
  email: string;
  contactPhone: string;
  orderNotes: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  submitOrder: (params: SubmitOrderParams) => Promise<{ error: string | null }>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    setItems((prev) => [...prev, { ...item, id: crypto.randomUUID() }]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)));
  };

  const clearCart = () => setItems([]);

  const submitOrder = async ({
    uid,
    displayName,
    email,
    contactPhone,
    orderNotes,
  }: SubmitOrderParams): Promise<{ error: string | null }> => {
    if (items.length === 0) return { error: 'Tu carrito está vacío.' };

    try {
      const itemsPayload = items.map((item) => ({
        sku: item.sku,
        productName: item.name,
        size: item.size,
        quantity: item.quantity,
        unitPrice: item.price,
        hasName: item.hasName,
        nameText: item.hasName ? item.nameText : null,
        hasLogo: item.hasLogo,
        notes: item.notes || null,
      }));

      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

      await addDoc(collection(db, 'pedidos'), {
        userId: uid,
        contactPhone,
        status: 'pendiente',
        notes: orderNotes || null,
        items: itemsPayload,
        createdAt: serverTimestamp(),
      });

      const itemsSummary = items
        .map(
          (i) =>
            `${i.quantity}x ${i.name} (${sizeLabel(i.size)})${i.hasName ? ` — nombre: "${i.nameText}"` : ''}${i.hasLogo ? ' — quiere logo personalizado (coordinar archivo por WhatsApp)' : ''}`,
        )
        .join('\n');

      const emailParams = {
        client_name: displayName || 'Sin nombre',
        client_username: displayName || '',
        client_email: email,
        client_phone: contactPhone,
        order_items: itemsSummary,
        order_notes: orderNotes || '(sin notas)',
        order_total: `$${total.toFixed(2)}`,
        order_date: new Date().toLocaleString('es-EC'),
      };

      void sendNewOrderNotification(emailParams);
      void sendClientOrderConfirmation(emailParams);

      clearCart();
      return { error: null };
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'No se pudo enviar el pedido.' };
    }
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, submitOrder }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
