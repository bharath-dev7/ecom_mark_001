'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, Minus, Plus, MapPin, Sparkles, Package, Heart, ZoomIn, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { getProductBySlug, getAllProducts } from '@/lib/productService';
import { Product } from '@/lib/supabase';
import { mockProducts } from '@/lib/mockData';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'origin' | 'care' | 'artistry'>('origin');
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const [fetchedProduct, catalog] = await Promise.all([
        getProductBySlug(slug),
        getAllProducts(),
      ]);
      setProduct(fetchedProduct);
      setAllProducts(catalog);
      setLoading(false);
    }
    if (slug) {
      loadProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#FAF6EE] font-serif py-16">
        <div className="w-8 h-8 border-2 border-[#6A091A] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="font-serif text-sm text-[#7C6354]">Loading weave specification...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-[#FAF6EE] font-serif py-16">
        <span className="text-5xl mb-4">🥻</span>
        <h1 className="font-serif text-2xl font-bold text-[#6A091A] mb-2">
          Saree Specification Not Found
        </h1>
        <p className="text-sm font-sans text-[#8C6B4F] mb-6">
          This piece may have been acquired or the link location is altered.
        </p>
        <Link href="/shop" className="btn-maroon-gold text-xs font-bold tracking-widest px-6 py-3 rounded-full uppercase">
          EXPLORE COLLECTIONS
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

  const related = allProducts
    .filter((p) => p.id !== product.id && (p.fabric === product.fabric || p.occasion === product.occasion))
    .slice(0, 4);

  const mainImage = product.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85';

  return (
    <div className="bg-[#FAF6EE] min-h-screen text-[#241416]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#C59B27]/40 text-xs font-serif tracking-wider uppercase">
        <div className="flex items-center gap-2 text-[#8C6B4F]">
          <Link href="/" className="hover:text-[#6A091A] transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#6A091A] transition-colors">SHOP</Link>
          <span>/</span>
          <span className="text-[#6A091A] font-bold truncate">{product.name}</span>
        </div>
      </div>

      {/* Product Detail Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Image Showcase (Strict Aspect 3:4 & Click to Zoom) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#FFFDF8] border border-[#C59B27]/40 p-2 shadow-sm group">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover rounded cursor-zoom-in"
                onClick={() => setIsZoomOpen(true)}
              />

              {/* Click to Zoom Overlay Indicator */}
              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-4 right-4 bg-[#6A091A] text-[#FAF6EE] border border-[#C59B27] px-3 py-1.5 rounded-full text-xs font-sans font-medium flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity shadow-md"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#E8C86B]" />
                Inspect Weave Detail
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF6EE]/90 flex items-center justify-center text-[#6A091A] hover:bg-[#6A091A] hover:text-[#E8C86B] transition-colors shadow-sm"
                aria-label="Add to Wishlist"
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-[#6A091A] text-[#6A091A]' : ''}`} />
              </button>

              {/* Discount Tag */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-[#6A091A] text-[#E8C86B] border border-[#C59B27] text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {discount}% OFF
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col space-y-6"
          >
            <div>
              <span className="text-xs font-sans tracking-[0.2em] text-[#C59B27] uppercase font-semibold">
                ❖ {product.fabric} • {product.occasion}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6A091A] mt-1.5">
                {product.name}
              </h1>
            </div>

            {/* Price (Playfair Display) */}
            <div className="flex items-baseline gap-4 border-y border-[#C59B27]/40 py-3">
              <span className="font-playfair text-3xl font-bold text-[#6A091A]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <>
                  <span className="font-sans text-base text-[#8C6B4F] line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="font-sans text-xs font-bold text-[#0D3B2E] uppercase">
                    SAVE ₹{(product.mrp - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* Body Copy (Outfit Sans-serif) */}
            <p className="text-sm font-sans text-[#241416] leading-relaxed">
              {product.description}
            </p>

            {/* Specification Badges */}
            <div className="grid grid-cols-3 gap-3 font-sans">
              <div className="p-3 bg-[#FFFDF8] border border-[#C59B27]/40 rounded text-center">
                <Sparkles className="w-4 h-4 text-[#C59B27] mx-auto mb-1" />
                <p className="text-[10px] text-[#8C6B4F] uppercase tracking-wider">Fabric</p>
                <p className="text-xs font-semibold text-[#241416]">{product.fabric}</p>
              </div>
              <div className="p-3 bg-[#FFFDF8] border border-[#C59B27]/40 rounded text-center">
                <Package className="w-4 h-4 text-[#C59B27] mx-auto mb-1" />
                <p className="text-[10px] text-[#8C6B4F] uppercase tracking-wider">Shade</p>
                <p className="text-xs font-semibold text-[#241416]">{product.color}</p>
              </div>
              <div className="p-3 bg-[#FFFDF8] border border-[#C59B27]/40 rounded text-center">
                <MapPin className="w-4 h-4 text-[#C59B27] mx-auto mb-1" />
                <p className="text-[10px] text-[#8C6B4F] uppercase tracking-wider">Origin</p>
                <p className="text-xs font-semibold text-[#241416]">{product.region || 'India'}</p>
              </div>
            </div>

            {/* Quantity + Add to Bag CTA */}
            {product.in_stock && (
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex items-center justify-center gap-2 bg-[#FFFDF8] border border-[#C59B27]/40 rounded-full px-4 py-2 font-sans">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-[#6A091A] hover:bg-[#6A091A] hover:text-[#E8C86B] rounded-full transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-semibold text-sm text-[#241416]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-[#6A091A] hover:bg-[#6A091A] hover:text-[#E8C86B] rounded-full transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className="btn-maroon-gold flex-1 py-3.5 rounded-full font-sans font-semibold text-xs tracking-widest flex items-center justify-center gap-2 uppercase shadow-md"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      ADDED TO ROYAL BAG!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#E8C86B]" />
                      ADD TO BAG — ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Fabric Story Accordion (Design System Spec Note) */}
            <div className="mt-6 border border-[#C59B27]/40 rounded-lg bg-[#FFFDF8] overflow-hidden font-sans">
              <div className="bg-[#F3EDE0] px-4 py-3 border-b border-[#C59B27]/40 flex items-center justify-between">
                <span className="font-serif font-bold text-xs text-[#6A091A] uppercase tracking-wider">
                  ❖ HERITAGE WEAVE & CARE STORY
                </span>
              </div>
              <div className="flex border-b border-[#C59B27]/30 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('origin')}
                  className={`flex-1 py-2 px-3 text-center transition-colors ${
                    activeTab === 'origin' ? 'bg-[#6A091A] text-[#FAF6EE] font-bold' : 'text-[#8C6B4F] hover:text-[#6A091A]'
                  }`}
                >
                  Weave Artistry
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`flex-1 py-2 px-3 text-center transition-colors ${
                    activeTab === 'care' ? 'bg-[#6A091A] text-[#FAF6EE] font-bold' : 'text-[#8C6B4F] hover:text-[#6A091A]'
                  }`}
                >
                  Saree Care
                </button>
              </div>
              <div className="p-4 text-xs text-[#241416] leading-relaxed">
                {activeTab === 'origin' && (
                  <p>
                    Handwoven by traditional master artisans using genuine gold-lacquered zari threads on heritage pit-looms. Each saree embodies centuries of uncompromised Indian handloom expertise.
                  </p>
                )}
                {activeTab === 'care' && (
                  <p>
                    Dry clean only to maintain zari luster and thread integrity. Store wrapped in pure unbleached muslin cloth away from direct moisture or heat.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-[#C59B27]/40 pt-12">
            <h2 className="font-serif text-2xl font-bold text-[#6A091A] text-center mb-8 uppercase tracking-wider">
              ❖ YOU MAY ALSO ADMIRE ❖
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Image Inspection Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#241416]/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setIsZoomOpen(false)}
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#6A091A] text-[#FAF6EE] border border-[#C59B27] hover:bg-[#4A0512] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl max-h-[90vh] overflow-auto rounded-lg border-2 border-[#C59B27] p-2 bg-[#FFFDF8]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={mainImage} alt={product.name} className="w-full h-auto rounded max-h-[85vh] object-contain mx-auto" />
              <p className="text-center font-serif text-xs text-[#6A091A] mt-2 font-bold uppercase tracking-wider">
                ❖ {product.name} — WEAVE TEXTURE DETAIL
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
