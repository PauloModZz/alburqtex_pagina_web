import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const CLIENT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export const isEmailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
export const isClientEmailConfigured = Boolean(SERVICE_ID && CLIENT_TEMPLATE_ID && PUBLIC_KEY);

export interface NewOrderEmailParams {
  client_name: string;
  client_username: string;
  client_email: string;
  client_phone: string;
  order_items: string;
  order_notes: string;
  order_total: string;
  order_date: string;
}

/**
 * Notifies the business by email that a new order came in. The actual
 * destination inbox (paulo.abad10200@gmail.com) is configured on the
 * EmailJS template itself, not sent from the client — see SETUP.md.
 * Never throws: a missing/broken email setup should never block an order
 * from being saved.
 */
export async function sendNewOrderNotification(params: NewOrderEmailParams): Promise<void> {
  if (!isEmailConfigured) return;
  try {
    await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, { ...params }, { publicKey: PUBLIC_KEY! });
  } catch {
    // Best-effort notification only — the order itself already saved fine.
  }
}

/**
 * Sends the client a confirmation that their order was received. Unlike the
 * business notification, this template's "To Email" is the dynamic
 * {{client_email}} variable, not a fixed inbox — see SETUP.md. Never
 * throws, same reasoning as sendNewOrderNotification.
 */
export async function sendClientOrderConfirmation(params: NewOrderEmailParams): Promise<void> {
  if (!isClientEmailConfigured) return;
  try {
    await emailjs.send(SERVICE_ID!, CLIENT_TEMPLATE_ID!, { ...params }, { publicKey: PUBLIC_KEY! });
  } catch {
    // Best-effort notification only — the order itself already saved fine.
  }
}
