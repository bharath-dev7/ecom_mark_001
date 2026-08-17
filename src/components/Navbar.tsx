'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Menu, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } =
    useCartStore();

  // Hydration-safe total
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;
  const totalPrice = mounted ? getTotalPrice() : 0;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold tracking-tight">
                सारी
              </span>
              <span className="hidden sm:block font-display text-lg text-[var(--color-text-muted)] italic">
                Collection
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative font-body text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors duration-200 py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Cart button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors duration-200"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 text-[var(--color-cream)]" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-gold)] text-[var(--color-bg)] text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5 text-[var(--color-cream)]" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden glass border-t border-[var(--color-border)] overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 font-body text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-bg)] border-l border-[var(--color-border)] z-[70] flex flex-col"
            >
              {/* Cart Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
                <h2 className="font-display text-xl font-semibold text-[var(--color-cream)]">
                  Shopping Bag
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--color-text-muted)]" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-16 h-16 text-[var(--color-text-dim)] mb-4" />
                    <p className="font-display text-lg text-[var(--color-text-muted)]">
                      Your bag is empty
                    </p>
                    <p className="text-sm text-[var(--color-text-dim)] mt-2">
                      Add beautiful sarees to get started
                    </p>
                    <Link
                      href="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="btn-gold mt-6 text-sm"
                    >
                      Browse Collection
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4 p-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]"
                    >
                      <div className="w-20 h-24 rounded-lg bg-[var(--color-bg-elevated)] overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-gold-dark)]/20 to-[var(--color-bg-elevated)] flex items-center justify-center">
                          <span className="text-2xl">🥻</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-body font-medium text-sm text-[var(--color-cream)] truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[var(--color-text-dim)] mt-0.5">
                          {item.fabric}
                        </p>
                        <p className="text-[var(--color-gold)] font-semibold text-sm mt-1">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-gold)] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-gold)] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1.5 rounded-md hover:bg-red-900/30 transition-colors group"
                          >
                            <Trash2 className="w-4 h-4 text-[var(--color-text-dim)] group-hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {items.length > 0 && (
                <div className="border-t border-[var(--color-border)] px-6 py-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-text-muted)]">
                      Subtotal
                    </span>
                    <span className="font-display text-xl font-semibold text-[var(--color-gold)]">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-gold block w-full text-center text-sm"
                  >
                    View Cart & Checkout
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
