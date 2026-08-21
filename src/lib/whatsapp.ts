import { CartItem } from '@/store/cartStore';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919347365885';

export interface CustomerDetails {
  name: string;
  phone: string;
  city: string;
  pincode: string;
}

export function formatCartForWhatsApp(
  items: CartItem[],
  total: number,
  customer?: CustomerDetails,
  orderId?: string
): string {
  const header = '❖ *NEW ROYAL ORDER — ZEYANA SAREES* ❖\n\n';

  const orderLine = orderId ? `📋 *Order ID:* ${orderId}\n\n` : '';

  const customerLines = customer
    ? `👤 *Customer:* ${customer.name}\n📱 *Phone:* ${customer.phone}\n📍 *Delivery:* ${customer.city} — ${customer.pincode}\n\n`
    : '';

  const itemLines = items
    .map(
      (item, i) =>
        `${i + 1}. *${item.name}*\n   Weave / Fabric: ${item.fabric}\n   Quantity: ${item.quantity}\n   Price: ₹${item.price.toLocaleString('en-IN')} × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
    )
    .join('\n\n');

  const footer = `\n\n-------------------------------\n💰 *TOTAL AMOUNT: ₹${total.toLocaleString('en-IN')}*\n\nKindly confirm availability and share payment/delivery steps. Thank you! 🙏`;

  return header + orderLine + customerLines + itemLines + footer;
}

export function getWhatsAppLink(
  items: CartItem[],
  total: number,
  customer?: CustomerDetails,
  orderId?: string
): string {
  const message = formatCartForWhatsApp(items, total, customer, orderId);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
