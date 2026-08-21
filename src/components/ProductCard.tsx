'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/lib/supabase';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
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

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group block"
    >
      <Link href={`/product/${product.slug}`}>
        <div className="bg-[#FFFDF8] border border-[#E2D7C3] hover:border-[#C59B27] rounded-lg p-2.5 transition-all duration-300 shadow-xs hover:shadow-lg">
          {/* Image Frame */}
          <div className="relative aspect-[3/4] overflow-hidden rounded bg-[#F3EDE0] border border-[#C59B27]/20">
            <img
              src={product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'}
              alt={product.name}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80';
              }}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Wishlist Heart Icon (Reference image inspired) */}
            <button
              onClick={handleToggleLike}
              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#FAF6EE]/80 backdrop-blur-xs flex items-center justify-center text-[#6A091A] hover:bg-[#6A091A] hover:text-[#E8C86B] transition-colors z-10 shadow-xs"
              aria-label="Add to wishlist"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-[#6A091A] text-[#6A091A]' : ''}`} />
            </button>

            {/* Quick Add overlay */}
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-[#6A091A]/80 via-[#6A091A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className="btn-maroon-gold text-xs py-1.5 px-4 rounded-full w-full font-serif font-medium flex items-center justify-center gap-1.5"
              >
                {added ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    ADDED TO BAG
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    QUICK ADD
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Product Details (Ref image alignment: title + price centered/left) */}
          <div className="pt-3 pb-1 px-1 text-center">
            <h3 className="font-serif font-medium text-sm sm:text-base text-[#241416] group-hover:text-[#6A091A] transition-colors truncate">
              {product.name}
            </h3>

            <div className="flex items-center justify-center gap-2 mt-1 font-serif">
              <span className="text-[#6A091A] font-bold text-sm sm:text-base">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-[#7C6354] line-through">
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
