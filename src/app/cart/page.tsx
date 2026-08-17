'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } =
    useCartStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="shimmer w-80 h-40 rounded-2xl" />
      </div>
    );
  }

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 page-enter">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag className="w-20 h-20 text-[var(--color-text-dim)] mx-auto mb-6" />
          <h1 className="font-display text-2xl font-bold text-[var(--color-cream)] mb-2">
            Your Bag is Empty
          </h1>
          <p className="text-[var(--color-text-muted)] mb-8 max-w-sm mx-auto">
            Looks like you haven&apos;t added any sarees yet. Let&apos;s find something beautiful for you.
          </p>
          <Link href="/shop" className="btn-gold inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Browse Collection
          </Link>
        </motion.div>
      </div>
    );
  }

  const whatsappLink = getWhatsAppLink(items, totalPrice);

  return (
    <div className="page-enter">
      <section className="py-10 sm:py-14 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-cream)] mb-2"
          >
            Shopping <span className="text-gradient-gold">Bag</span>
          </motion.h1>
          <p className="text-[var(--color-text-muted)]">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-gold)]/20 transition-colors"
                >
                  {/* Image */}
                  <Link
                    href={`/product/${item.slug}`}
                    className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl bg-[var(--color-bg-elevated)] overflow-hidden flex-shrink-0"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-gold-dark)]/10 to-[var(--color-bg-elevated)] flex items-center justify-center">
                      <span className="text-4xl">🥻</span>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-display text-base sm:text-lg font-semibold text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors truncate block"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-[var(--color-text-dim)] mt-1">
                        {item.fabric}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 sm:mt-0">
                      {/* Quantity */}
                      <div className="flex items-center gap-1 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-[var(--color-bg-card)] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[var(--color-cream)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-[var(--color-bg-card)] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                        </button>
                      </div>

                      {/* Price + Remove */}
                      <div className="flex items-center gap-3">
                        <span className="font-body font-bold text-lg text-[var(--color-gold)]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 rounded-lg hover:bg-red-900/30 transition-colors group"
                        >
                          <Trash2 className="w-4 h-4 text-[var(--color-text-dim)] group-hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Clear Cart */}
              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/shop"
                  className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-gold)] transition-colors inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-400/70 hover:text-red-400 transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] space-y-6">
                <h2 className="font-display text-lg font-semibold text-[var(--color-cream)]">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[var(--color-text-muted)]">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-text-muted)]">
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="divider-gold" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-[var(--color-cream)]">Total</span>
                    <span className="text-[var(--color-gold)]">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Checkout */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 bg-green-600 hover:bg-green-500 text-white hover:shadow-lg hover:shadow-green-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Checkout via WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>

                <p className="text-[10px] text-[var(--color-text-dim)] text-center leading-relaxed">
                  You&apos;ll be redirected to WhatsApp with your order details.
                  We&apos;ll confirm availability and share payment options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
