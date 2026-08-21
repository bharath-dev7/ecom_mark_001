import { supabase, isSupabaseConfigured } from './supabase';
import { CartItem } from '@/store/cartStore';

export interface OrderPayload {
  customerName: string;
  phone: string;
  city: string;
  pincode: string;
  items: CartItem[];
  totalAmount: number;
}

export interface OrderResult {
  success: boolean;
  orderId: string | null;
  error?: string;
}

/**
 * Persists an order to the Supabase `orders` table before WhatsApp redirect.
 * In demo mode (no Supabase), generates a local order ID.
 */
export async function createOrder(payload: OrderPayload): Promise<OrderResult> {
  const orderId = `ZEY-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  if (!isSupabaseConfigured()) {
    // Demo mode — return a fake order ID
    return { success: true, orderId };
  }

  try {
    const orderData = {
      customer_name: payload.customerName,
      phone: payload.phone,
      total_amount: payload.totalAmount,
      items: payload.items.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        fabric: item.fabric,
        quantity: item.quantity,
      })),
      status: 'Pending',
    };

    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select('id')
      .single();

    if (error) {
      console.error('Order insertion error:', error);
      // Fallback: still allow WhatsApp checkout but warn
      return { success: true, orderId, error: error.message };
    }

    return { success: true, orderId: data?.id || orderId };
  } catch (err: any) {
    console.error('Order creation failed:', err);
    return { success: true, orderId, error: err.message };
  }
}
