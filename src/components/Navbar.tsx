'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Menu, Trash2, Search, Heart, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { RoyalCrestLogo } from './OrnamentalIcons';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;
  const totalPrice = mounted ? getTotalPrice() : 0;

  const leftLinks = [
    { href: '/', label: 'HOME' },
    { href: '/shop?category=sarees', label: 'SAREES' },
    { href: '/shop?sort=newest', label: 'NEW ARRIVALS' },
  ];

  const rightLinks = [
    { href: '/shop', label: 'COLLECTIONS' },
    { href: '/about', label: 'ABOUT US' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#FAF6EE] border-b border-[#C59B27] ${
          isScrolled ? 'shadow-md shadow-[#6A091A]/10' : ''
        }`}
      >
        {/* Top Announcement Bar */}
        <div className="bg-[#6A091A] text-[#E8C86B] text-[11px] font-serif tracking-[0.2em] uppercase text-center py-1.5 px-4 flex items-center justify-center gap-2 border-b border-[#C59B27]/40">
          <span>❖</span>
          <span>COMPLIMENTARY SHIPPING ACROSS INDIA ON ALL PREPAID ORDERS</span>
          <span>❖</span>
        </div>

        {/* Main Navbar Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Left Nav (Desktop) */}
            <div className="hidden lg:flex items-center gap-6 text-[13px] font-serif tracking-[0.15em] font-medium text-[#241416]">
              {leftLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#6A091A] transition-colors relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C59B27] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#6A091A] hover:bg-[#F3EDE0] rounded-md transition-colors"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Centered Royal Logo Crest */}
            <Link href="/" className="group flex items-center justify-center my-1">
              <RoyalCrestLogo className="scale-90 sm:scale-100" />
            </Link>

            {/* Right Nav (Desktop) & Icons */}
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="hidden lg:flex items-center gap-6 text-[13px] font-serif tracking-[0.15em] font-medium text-[#241416]">
                {rightLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-[#6A091A] transition-colors relative group py-1"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C59B27] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>

              {/* Action Icons: Search, Account, Cart */}
              <div className="flex items-center gap-3 border-l border-[#C59B27]/40 pl-4">
                <Link href="/shop" className="p-1.5 text-[#6A091A] hover:text-[#C59B27] transition-colors" aria-label="Search">
                  <Search className="w-5 h-5" />
                </Link>

                <Link href="/admin" className="hidden sm:block p-1.5 text-[#6A091A] hover:text-[#C59B27] transition-colors" aria-label="Account">
                  <User className="w-5 h-5" />
                </Link>

                {/* Shopping Bag Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-1.5 text-[#6A091A] hover:text-[#C59B27] transition-colors"
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-[#6A091A] text-[#E8C86B] border border-[#C59B27] text-[10px] font-serif font-bold rounded-full flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-[#FAF6EE] border-t border-[#C59B27] overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4 font-serif tracking-[0.15em] text-[#6A091A]">
                {[...leftLinks, ...rightLinks].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-sm border-b border-[#E8C86B]/40 hover:text-[#C59B27] transition-colors"
                  >
                    ❖ {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Shopping Bag Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-[#38030B]/60 backdrop-blur-xs z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF6EE] border-l-2 border-[#C59B27] z-[70] flex flex-col shadow-2xl"
            >
              {/* Cart Drawer Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#6A091A] text-[#E8C86B] border-b border-[#C59B27]">
                <div className="flex items-center gap-2 font-serif text-lg tracking-wider uppercase">
                  <span>❖</span>
                  <h2>Royal Shopping Bag</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Drawer Items */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-[#C59B27] mb-4 stroke-1" />
                    <p className="font-serif text-xl text-[#6A091A]">Your Shopping Bag is Empty</p>
                    <p className="text-sm text-[#7C6354] mt-2 font-serif">
                      Explore our handloom heritage collections to adorn your wardrobe.
                    </p>
                    <Link
                      href="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="btn-maroon-gold mt-6 text-sm px-6 py-2.5 rounded-full"
                    >
                      EXPLORE COLLECTIONS
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex gap-4 p-4 bg-[#FFFDF8] border border-[#D6B458] rounded-md shadow-xs"
                    >
                      <div className="w-20 h-24 rounded bg-[#F3EDE0] overflow-hidden flex-shrink-0 border border-[#C59B27]/30">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#6A091A]/10 flex items-center justify-center text-2xl">
                            🥻
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-semibold text-base text-[#6A091A] truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#7C6354] mt-0.5">{item.fabric}</p>
                        <p className="text-[#C59B27] font-serif font-bold text-sm mt-1">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-[#F3EDE0] border border-[#C59B27] text-[#6A091A] flex items-center justify-center hover:bg-[#6A091A] hover:text-[#E8C86B] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-serif font-bold w-6 text-center text-[#241416]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-[#F3EDE0] border border-[#C59B27] text-[#6A091A] flex items-center justify-center hover:bg-[#6A091A] hover:text-[#E8C86B] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1 text-[#7C6354] hover:text-[#6A091A] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Cart Drawer Footer */}
              {items.length > 0 && (
                <div className="border-t border-[#C59B27] bg-[#F3EDE0] px-6 py-5 space-y-4">
                  <div className="flex justify-between items-center font-serif">
                    <span className="text-[#7C6354] tracking-wider uppercase text-sm">TOTAL AMOUNT</span>
                    <span className="text-2xl font-bold text-[#6A091A]">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-maroon-gold block w-full text-center py-3 text-sm rounded-full tracking-widest font-bold"
                  >
                    PROCEED TO CHECKOUT
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
