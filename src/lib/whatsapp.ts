import { CartItem } from '@/store/cartStore';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919347365885';

export function formatCartForWhatsApp(items: CartItem[], total: number): string {
  const header = '❖ *NEW ROYAL ORDER — ZEYANA SAREES* ❖\n\n';

  const itemLines = items
    .map(
      (item, i) =>
        `${i + 1}. *${item.name}*\n   Weave / Fabric: ${item.fabric}\n   Quantity: ${item.quantity}\n   Price: ₹${item.price.toLocaleString('en-IN')} × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
    )
    .join('\n\n');

  const footer = `\n\n-------------------------------\n💰 *TOTAL AMOUNT: ₹${total.toLocaleString('en-IN')}*\n\nKindly confirm availability and share payment/delivery steps. Thank you! 🙏`;

  return header + itemLines + footer;
}

export function getWhatsAppLink(items: CartItem[], total: number): string {
  const message = formatCartForWhatsApp(items, total);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
