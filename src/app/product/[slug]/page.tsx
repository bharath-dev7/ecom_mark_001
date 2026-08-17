'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, ChevronLeft, Minus, Plus, MapPin, Sparkles, Package } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { getProductBySlug, mockProducts } from '@/lib/mockData';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 page-enter">
        <span className="text-6xl mb-4">🥻</span>
        <h1 className="font-display text-2xl font-bold text-[var(--color-cream)] mb-2">
          Saree Not Found
        </h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          This saree may have been removed or the link is incorrect.
        </p>
        <Link href="/shop" className="btn-gold text-sm">
          Browse Collection
        </Link>
      </div>
    );
  }

  const discount = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        fabric: product.fabric,
        image: product.images[0] || '',
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related products (same fabric, excluding current)
  const related = mockProducts
    .filter((p) => p.id !== product.id && (p.fabric === product.fabric || p.occasion === product.occasion))
    .slice(0, 4);

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-dim)]">
          <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--color-gold)] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[var(--color-text-muted)] truncate">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-dark)]/10 via-[var(--color-bg-elevated)] to-[var(--color-bg-card)] flex items-center justify-center">
                <span className="text-[120px] opacity-60">🥻</span>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[var(--color-gold)] text-[var(--color-bg)]">
                    Featured
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-red-600 text-white">
                    {discount}% Off
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col"
          >
            {/* Tags */}
            <div className="flex items-center gap-2 mb-4">
              <span className="chip">{product.fabric}</span>
              <span className="chip">{product.occasion}</span>
              <span className="chip">{product.color}</span>
            </div>

            {/* Name */}
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-cream)] mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-body text-3xl font-bold text-[var(--color-gold)]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <>
                  <span className="text-lg text-[var(--color-text-dim)] line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-semibold text-green-500">
                    Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-2.5 h-2.5 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`}
              />
              <span className={`text-sm font-medium ${product.in_stock ? 'text-green-500' : 'text-red-400'}`}>
                {product.in_stock ? 'In Stock' : 'Sold Out'}
              </span>
            </div>

            {/* Description */}
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
                <Sparkles className="w-4 h-4 text-[var(--color-gold)] mb-2" />
                <p className="text-xs text-[var(--color-text-dim)]">Fabric</p>
                <p className="text-sm font-medium text-[var(--color-cream)]">{product.fabric}</p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
                <Package className="w-4 h-4 text-[var(--color-gold)] mb-2" />
                <p className="text-xs text-[var(--color-text-dim)]">Color</p>
                <p className="text-sm font-medium text-[var(--color-cream)]">{product.color}</p>
              </div>
              {product.region && (
                <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] col-span-2">
                  <MapPin className="w-4 h-4 text-[var(--color-gold)] mb-2" />
                  <p className="text-xs text-[var(--color-text-dim)]">Origin</p>
                  <p className="text-sm font-medium text-[var(--color-cream)]">{product.region}</p>
                </div>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            {product.in_stock && (
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-1 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[var(--color-bg-elevated)] transition-colors"
                  >
                    <Minus className="w-4 h-4 text-[var(--color-text-muted)]" />
                  </button>
                  <span className="w-10 text-center font-medium text-[var(--color-cream)]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[var(--color-bg-elevated)] transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[var(--color-text-muted)]" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'btn-gold'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Bag!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag — ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="divider-gold mb-12" />
            <h2 className="font-display text-2xl font-bold text-[var(--color-cream)] mb-8">
              You May Also <span className="text-gradient-gold">Like</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
