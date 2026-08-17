'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/lib/supabase';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      fabric: product.fabric,
      image: product.images[0] || '',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="card-hover rounded-2xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-gold)]/30">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-bg-elevated)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-dark)]/10 via-[var(--color-bg-elevated)] to-[var(--color-bg-card)] flex items-center justify-center">
              <span className="text-6xl opacity-60 group-hover:scale-110 transition-transform duration-500">
                🥻
              </span>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.featured && (
                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[var(--color-gold)] text-[var(--color-bg)]">
                  Featured
                </span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-red-600 text-white">
                  {discount}% Off
                </span>
              )}
              {!product.in_stock && (
                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[var(--color-bg)]/80 text-[var(--color-text-muted)] border border-[var(--color-border)]">
                  Sold Out
                </span>
              )}
            </div>

            {/* Add to cart overlay */}
            {product.in_stock && (
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-[var(--color-gold)] text-[var(--color-bg)] hover:bg-[var(--color-gold-light)]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="chip text-[10px]">{product.fabric}</span>
              <span className="chip text-[10px]">{product.occasion}</span>
            </div>
            <h3 className="font-display text-base font-semibold text-[var(--color-cream)] truncate group-hover:text-[var(--color-gold)] transition-colors duration-200">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="font-body font-bold text-lg text-[var(--color-gold)]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-sm text-[var(--color-text-dim)] line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
