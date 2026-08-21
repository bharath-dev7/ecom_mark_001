import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/productService';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zeyana.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic product pages
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    productPages = products.map((product) => ({
      url: `${BASE_URL}/product/${product.slug}`,
      lastModified: new Date(product.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // Gracefully handle — sitemap will still include static pages
  }

  return [...staticPages, ...productPages];
}
