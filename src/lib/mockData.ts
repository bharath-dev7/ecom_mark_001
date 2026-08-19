import { Product } from './supabase';

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  badge?: string;
}

export const categoriesData: CategoryItem[] = [
  {
    id: '1',
    name: 'SILK SAREES',
    slug: 'silk-sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'BANARASI',
    slug: 'banarasi',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    name: 'KANCHIPURAM',
    slug: 'kanchipuram',
    image: 'https://images.unsplash.com/photo-1610030469668-9861616c68b7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    name: 'COTTON SAREES',
    slug: 'cotton-sarees',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    name: 'CHIFFON',
    slug: 'chiffon',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '6',
    name: 'LEHENGAS',
    slug: 'lehengas',
    image: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '7',
    name: 'SALE',
    slug: 'sale',
    badge: 'UPTO 50% OFF',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Royal Banarasi Silk Saree',
    slug: 'royal-banarasi-silk-saree',
    price: 3499,
    mrp: 5999,
    fabric: 'Pure Silk',
    color: 'Red & Gold',
    occasion: 'Wedding & Festive',
    region: 'Varanasi',
    description:
      'Opulent Royal Banarasi silk saree woven with golden zari brocade motifs across rich crimson red silk. Complete with traditional intricate border.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    ],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mehendi Green Kanjivaram Saree',
    slug: 'mehendi-green-kanjivaram-saree',
    price: 4299,
    mrp: 6999,
    fabric: 'Kanjivaram Silk',
    color: 'Mehendi Green',
    occasion: 'Wedding',
    region: 'Kanchipuram',
    description:
      'Authentic Kanchipuram silk saree in mehendi green featuring contrasting crimson pallu and heavy gold thread weaving.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469668-9861616c68b7?auto=format&fit=crop&w=800&q=80',
    ],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Peach Gold Tissue Saree',
    slug: 'peach-gold-tissue-saree',
    price: 2699,
    mrp: 4499,
    fabric: 'Tissue Silk',
    color: 'Peach Gold',
    occasion: 'Festive',
    region: 'Chanderi',
    description:
      'Luminous peach gold tissue silk saree with shimmering golden sheen and delicate hand-carved golden pallu flourishes.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    ],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Navy Blue Woven Saree',
    slug: 'navy-blue-woven-saree',
    price: 3199,
    mrp: 4999,
    fabric: 'Pure Woven Silk',
    color: 'Navy Blue',
    occasion: 'Reception',
    region: 'Bengal',
    description:
      'Regal navy blue woven saree adorned with antique silver-gold zari booti work and opulent royal temple pallu.',
    images: [
      'https://images.unsplash.com/photo-1610030469668-9861616c68b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=800&q=80',
    ],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Rose Pink Organza Saree',
    slug: 'rose-pink-organza-saree',
    price: 2499,
    mrp: 3999,
    fabric: 'Organza',
    color: 'Rose Pink',
    occasion: 'Party & Festive',
    region: 'Jaipur',
    description:
      'Ethereal rose pink organza saree decorated with delicate embroidery, scalloped gold wire border, and floral hand craftsmanship.',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
];

export function getUniqueFabrics(): string[] {
  return [...new Set(mockProducts.map((p) => p.fabric))];
}

export function getUniqueColors(): string[] {
  return [...new Set(mockProducts.map((p) => p.color))];
}

export function getUniqueOccasions(): string[] {
  return [...new Set(mockProducts.map((p) => p.occasion))];
}

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((p) => p.featured);
}
