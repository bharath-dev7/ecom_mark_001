'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCartStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF6EE]">
        <div className="w-80 h-40 bg-[#F3EDE0] animate-pulse rounded-lg border border-[#C59B27]/40" />
      </div>
    );
  }

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#FAF6EE] font-sans py-16">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md bg-[#FFFDF8] p-8 rounded-lg border border-[#C59B27]/40 shadow-xs"
        >
          <ShoppingBag className="w-16 h-16 text-[#C59B27] mx-auto mb-4 stroke-1" />
          <h1 className="font-serif text-2xl font-bold text-[#6A091A] uppercase tracking-wider mb-2">
            Your Bag is Empty
          </h1>
          <p className="text-sm text-[#8C6B4F] mb-6">
            Adorn your closet with India&apos;s finest handloom heritage sarees and lehengas.
          </p>
          <Link
            href="/shop"
            className="btn-maroon-gold inline-flex items-center gap-2 text-xs font-semibold tracking-widest px-6 py-3 rounded-full uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            BROWSE COLLECTIONS
          </Link>
        </motion.div>
      </div>
    );
  }

  const whatsappLink = getWhatsAppLink(items, totalPrice);

  return (
    <div className="bg-[#FAF6EE] min-h-screen font-sans text-[#241416]">
      {/* Calm Header */}
      <section className="py-10 bg-[#6A091A] text-[#FAF6EE] border-b border-[#C59B27] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider uppercase">
            YOUR SHOPPING BAG
          </h1>
          <p className="text-xs tracking-widest text-[#E8C86B] uppercase mt-1">
            {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'} IN YOUR BAG
          </p>
        </div>
      </section>

      {/* Clean Conversion-Focused Body */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 p-4 rounded-lg bg-[#FFFDF8] border border-[#C59B27]/40 shadow-xs"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="w-20 h-24 sm:w-24 sm:h-28 rounded bg-[#F3EDE0] overflow-hidden flex-shrink-0 border border-[#C59B27]/30"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#6A091A]/10 flex items-center justify-center text-3xl">
                      🥻
                    </div>
                  )}
                </Link>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-serif text-base font-bold text-[#6A091A] hover:text-[#C59B27] transition-colors truncate block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-[#8C6B4F] mt-0.5">{item.fabric}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 bg-[#FAF6EE] border border-[#C59B27]/40 rounded px-1 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#6A091A] hover:bg-[#6A091A] hover:text-[#E8C86B] rounded transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#241416]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#6A091A] hover:bg-[#6A091A] hover:text-[#E8C86B] rounded transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-playfair font-bold text-base text-[#6A091A]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-[#8C6B4F] hover:text-[#6A091A] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex justify-between items-center pt-3">
              <Link
                href="/shop"
                className="text-xs font-semibold tracking-wider text-[#6A091A] hover:text-[#C59B27] uppercase inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                CONTINUE SHOPPING
              </Link>
              <button
                onClick={clearCart}
                className="text-xs font-semibold tracking-wider text-red-700 hover:underline uppercase"
              >
                CLEAR BAG
              </button>
            </div>
          </div>

          {/* Prominent WhatsApp Conversion Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-lg bg-[#FFFDF8] border border-[#C59B27]/40 space-y-6 shadow-sm">
              <h2 className="font-serif text-base font-bold text-[#6A091A] uppercase tracking-wider border-b border-[#C59B27]/30 pb-2">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#8C6B4F]">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-bold text-[#241416]">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#8C6B4F]">
                  <span>Shipping Across India</span>
                  <span className="text-[#0D3B2E] font-bold uppercase">FREE</span>
                </div>
                <div className="h-[1px] bg-[#C59B27]/30" />
                <div className="flex justify-between font-bold text-base text-[#6A091A]">
                  <span>TOTAL AMOUNT</span>
                  <span className="font-playfair text-lg">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Prominent CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maroon-gold w-full py-3.5 rounded-full font-semibold text-xs tracking-widest flex items-center justify-center gap-2 shadow-md uppercase"
              >
                <MessageCircle className="w-4 h-4 text-[#E8C86B]" />
                CHECKOUT VIA WHATSAPP
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-[10px] text-[#8C6B4F] text-center leading-relaxed">
                Direct WhatsApp ordering: You will be redirected with pre-filled saree order details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
