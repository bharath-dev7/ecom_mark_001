import { Product } from './supabase';

// Mock product data used when Supabase is not configured yet
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Royal Kanjivaram Silk',
    slug: 'royal-kanjivaram-silk',
    price: 12999,
    mrp: 18999,
    fabric: 'Silk',
    color: 'Red',
    occasion: 'Wedding',
    region: 'Tamil Nadu',
    description:
      'A magnificent Kanjivaram silk saree handwoven by master artisans of Tamil Nadu. Features intricate zari work with traditional temple border design. This timeless piece is perfect for weddings and grand celebrations.',
    images: [
      '/images/saree-1.jpg',
      '/images/saree-1b.jpg',
    ],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Banarasi Brocade Elegance',
    slug: 'banarasi-brocade-elegance',
    price: 9499,
    mrp: 14999,
    fabric: 'Silk',
    color: 'Gold',
    occasion: 'Wedding',
    region: 'Varanasi',
    description:
      'An exquisite Banarasi brocade saree featuring opulent gold zari weaving on luxurious silk. Each thread tells a story of centuries-old craftsmanship from the looms of Varanasi.',
    images: [
      '/images/saree-2.jpg',
      '/images/saree-2b.jpg',
    ],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Chanderi Cotton Breeze',
    slug: 'chanderi-cotton-breeze',
    price: 3499,
    mrp: 5999,
    fabric: 'Cotton',
    color: 'Blue',
    occasion: 'Casual',
    region: 'Madhya Pradesh',
    description:
      'A lightweight Chanderi cotton saree with delicate hand-block prints. Perfect for daily elegance and casual gatherings. The sheer texture and golden border add a touch of sophistication.',
    images: [
      '/images/saree-3.jpg',
      '/images/saree-3b.jpg',
    ],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Mysore Crepe Royale',
    slug: 'mysore-crepe-royale',
    price: 6999,
    mrp: 9999,
    fabric: 'Crepe',
    color: 'Purple',
    occasion: 'Festival',
    region: 'Karnataka',
    description:
      'A luxurious Mysore crepe silk saree in regal purple with a contrast pallu featuring traditional Mysore motifs. Ideal for festive occasions and temple visits.',
    images: [
      '/images/saree-4.jpg',
      '/images/saree-4b.jpg',
    ],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Tussar Silk Heritage',
    slug: 'tussar-silk-heritage',
    price: 7999,
    mrp: 11999,
    fabric: 'Tussar Silk',
    color: 'Beige',
    occasion: 'Festival',
    region: 'Bihar',
    description:
      'A handloom Tussar silk saree in natural golden beige, featuring traditional Madhubani-inspired prints. The earthy tones and organic texture make this a collector\'s delight.',
    images: [
      '/images/saree-5.jpg',
      '/images/saree-5b.jpg',
    ],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Georgette Garden Dream',
    slug: 'georgette-garden-dream',
    price: 4299,
    mrp: 6999,
    fabric: 'Georgette',
    color: 'Pink',
    occasion: 'Party',
    region: 'Rajasthan',
    description:
      'A flowing georgette saree adorned with digital floral prints and sequin work border. This contemporary piece is perfect for cocktail parties and evening events.',
    images: [
      '/images/saree-6.jpg',
      '/images/saree-6b.jpg',
    ],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Linen Summer Charm',
    slug: 'linen-summer-charm',
    price: 2999,
    mrp: 4499,
    fabric: 'Linen',
    color: 'Green',
    occasion: 'Casual',
    region: 'West Bengal',
    description:
      'A crisp linen saree in refreshing green with minimalist handloom stripes. Perfect for summer outings and office wear. Breathable, eco-friendly, and effortlessly chic.',
    images: [
      '/images/saree-7.jpg',
      '/images/saree-7b.jpg',
    ],
    in_stock: false,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Patola Double Ikat',
    slug: 'patola-double-ikat',
    price: 24999,
    mrp: 35000,
    fabric: 'Silk',
    color: 'Red',
    occasion: 'Wedding',
    region: 'Gujarat',
    description:
      'A rare Patola double ikat silk saree from Patan, Gujarat. Each saree takes months of meticulous craftsmanship. The geometric patterns and vibrant colors are a testament to India\'s rich textile heritage.',
    images: [
      '/images/saree-8.jpg',
      '/images/saree-8b.jpg',
    ],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
];

// Helper to get unique values for filters
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
