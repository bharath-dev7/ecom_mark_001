import { supabase, isSupabaseConfigured, Product } from '@/lib/supabase';
import { mockProducts } from '@/lib/mockData';

let cacheProducts: Product[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute in-memory cache

/**
 * Fetch all saree products dynamically from Supabase if available, with graceful mockData fallback.
 */
export async function getAllProducts(forceRefresh = false): Promise<Product[]> {
  const now = Date.now();
  if (!forceRefresh && cacheProducts && now - cacheTimestamp < CACHE_TTL_MS) {
    return cacheProducts;
  }

  if (!isSupabaseConfigured()) {
    cacheProducts = mockProducts;
    cacheTimestamp = now;
    return mockProducts;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, price, mrp, fabric, color, occasion, region, description, images, in_stock, featured, created_at')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase products fetch failed or empty, using mock catalog fallback:', error);
      cacheProducts = mockProducts;
      cacheTimestamp = now;
      return mockProducts;
    }

    cacheProducts = data as Product[];
    cacheTimestamp = now;
    return cacheProducts;
  } catch (err) {
    console.error('Error fetching products:', err);
    return mockProducts;
  }
}

/**
 * Fetch single product specification by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return mockProducts.find((p) => p.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return data as Product;
    }

    // Fallback to mock search
    return mockProducts.find((p) => p.slug === slug) || null;
  } catch {
    return mockProducts.find((p) => p.slug === slug) || null;
  }
}

/**
 * Invalidate in-memory products cache
 */
export function invalidateProductsCache() {
  cacheProducts = null;
  cacheTimestamp = 0;
}
