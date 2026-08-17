import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    if (!supabaseUrl) {
      // Return a dummy client that won't be used — caller should check isConfigured()
      return createClient('https://placeholder.supabase.co', 'placeholder');
    }
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && url.length > 0;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabase() as any)[prop];
  },
});

// Type definitions for our database
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  mrp: number | null;
  fabric: string;
  color: string;
  occasion: string;
  region: string | null;
  description: string | null;
  images: string[];
  in_stock: boolean;
  featured: boolean;
  created_at: string;
}
