import type { Metadata } from 'next';
import { getProductBySlug } from '@/lib/productService';

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);
    if (!product) {
      return {
        title: 'Saree Not Found | ZEYANA',
        description: 'This saree may have been acquired or the link is no longer valid.',
      };
    }

    const title = `${product.name} | ZEYANA Sarees`;
    const description = product.description
      || `Discover the ${product.name} — a premium ${product.fabric} saree in ${product.color}, perfect for ${product.occasion}. Shop at ZEYANA.`;
    const image = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: 'ZEYANA | Sarees & Royal Ethnic Collection',
      description: 'Discover India\'s finest handloom sarees.',
    };
  }
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return <>{children}</>;
}
