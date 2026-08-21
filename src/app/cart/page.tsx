'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, MessageCircle, ArrowLeft, ArrowRight, MapPin, User, Phone, X, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { createOrder } from '@/lib/orderService';
import { useToast } from '@/components/Toast';
import { useState, useEffect } from 'react';

interface CheckoutForm {
  name: string;
  phone: string;
  city: string;
  pincode: string;
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCartStore();
  const { addToast } = useToast();

  const [mounted, setMounted] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    name: '',
    phone: '',
    city: '',
    pincode: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<CheckoutForm>>({});

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

  const validateForm = (): boolean => {
    const errors: Partial<CheckoutForm> = {};

    if (!checkoutForm.name.trim() || checkoutForm.name.trim().length < 2) {
      errors.name = 'Please enter your full name';
    }

    const phoneClean = checkoutForm.phone.replace(/\s+/g, '');
    if (!/^(\+91)?[6-9]\d{9}$/.test(phoneClean)) {
      errors.phone = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!checkoutForm.city.trim() || checkoutForm.city.trim().length < 2) {
      errors.city = 'Please enter your city name';
    }

    if (!/^\d{6}$/.test(checkoutForm.pincode.trim())) {
      errors.pincode = 'Enter a valid 6-digit pincode';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutSubmit = async () => {
    if (!validateForm()) return;

    setCheckoutLoading(true);

    try {
      // 1. Persist order to database
      const orderResult = await createOrder({
        customerName: checkoutForm.name.trim(),
        phone: checkoutForm.phone.replace(/\s+/g, ''),
        city: checkoutForm.city.trim(),
        pincode: checkoutForm.pincode.trim(),
        items,
        totalAmount: totalPrice,
      });

      // 2. Generate WhatsApp link with order details
      const whatsappLink = getWhatsAppLink(
        items,
        totalPrice,
        {
          name: checkoutForm.name.trim(),
          phone: checkoutForm.phone.replace(/\s+/g, ''),
          city: checkoutForm.city.trim(),
          pincode: checkoutForm.pincode.trim(),
        },
        orderResult.orderId || undefined
      );

      // 3. Show success toast
      addToast({
        type: 'success',
        title: 'Order Placed Successfully!',
        message: `Order ${orderResult.orderId} recorded. Redirecting to WhatsApp...`,
        duration: 5000,
      });

      // 4. Clear cart and close modal
      setShowCheckoutModal(false);
      clearCart();

      // 5. Redirect to WhatsApp
      setTimeout(() => {
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
      }, 500);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Checkout Error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

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
                        onClick={() => {
                          removeItem(item.id);
                          addToast({ type: 'info', title: 'Item Removed', message: `${item.name} removed from bag.` });
                        }}
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
                onClick={() => {
                  clearCart();
                  addToast({ type: 'info', title: 'Bag Cleared', message: 'All items have been removed.' });
                }}
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

              {/* Checkout Button — opens address modal */}
              <button
                onClick={() => setShowCheckoutModal(true)}
                className="btn-maroon-gold w-full py-3.5 rounded-full font-semibold text-xs tracking-widest flex items-center justify-center gap-2 shadow-md uppercase"
              >
                <MessageCircle className="w-4 h-4 text-[#E8C86B]" />
                PROCEED TO CHECKOUT
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-[#8C6B4F] text-center leading-relaxed">
                You&apos;ll be asked for delivery details, then redirected to WhatsApp with a pre-filled order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout / Address Capture Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckoutModal(false)}
              className="fixed inset-0 bg-[#38030B]/60 backdrop-blur-xs z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md bg-[#FAF6EE] border-2 border-[#C59B27] rounded-lg z-[70] p-6 shadow-2xl font-serif max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C59B27]">
                <h2 className="font-serif text-lg font-bold text-[#6A091A] uppercase tracking-wider">
                  DELIVERY DETAILS
                </h2>
                <button onClick={() => setShowCheckoutModal(false)} className="p-1 text-[#6A091A]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs font-sans text-[#7C6354] mb-4">
                Provide your contact and delivery details. Your order will be recorded and you&apos;ll be redirected to WhatsApp for instant confirmation.
              </p>

              <div className="space-y-4 font-sans text-xs">
                {/* Full Name */}
                <div>
                  <label className="font-serif font-bold text-[#7C6354] uppercase block mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C59B27]" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className={`w-full px-4 py-2.5 rounded bg-[#FFFDF8] border text-sm text-[#241416] placeholder:text-[#7C6354] focus:outline-none ${
                      formErrors.name ? 'border-red-400 focus:border-red-500' : 'border-[#C59B27]/40 focus:border-[#6A091A]'
                    }`}
                  />
                  {formErrors.name && <p className="text-red-600 text-[11px] mt-1">{formErrors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="font-serif font-bold text-[#7C6354] uppercase block mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-4 py-2.5 rounded bg-[#FFFDF8] border text-sm text-[#241416] placeholder:text-[#7C6354] focus:outline-none ${
                      formErrors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#C59B27]/40 focus:border-[#6A091A]'
                    }`}
                  />
                  {formErrors.phone && <p className="text-red-600 text-[11px] mt-1">{formErrors.phone}</p>}
                </div>

                {/* City & Pincode */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-serif font-bold text-[#7C6354] uppercase block mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                      City
                    </label>
                    <input
                      type="text"
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                      placeholder="e.g. Hyderabad"
                      className={`w-full px-3 py-2.5 rounded bg-[#FFFDF8] border text-sm text-[#241416] placeholder:text-[#7C6354] focus:outline-none ${
                        formErrors.city ? 'border-red-400 focus:border-red-500' : 'border-[#C59B27]/40 focus:border-[#6A091A]'
                      }`}
                    />
                    {formErrors.city && <p className="text-red-600 text-[11px] mt-1">{formErrors.city}</p>}
                  </div>
                  <div>
                    <label className="font-serif font-bold text-[#7C6354] uppercase block mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={checkoutForm.pincode}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value.replace(/\D/g, '') })}
                      placeholder="e.g. 500001"
                      className={`w-full px-3 py-2.5 rounded bg-[#FFFDF8] border text-sm text-[#241416] placeholder:text-[#7C6354] focus:outline-none ${
                        formErrors.pincode ? 'border-red-400 focus:border-red-500' : 'border-[#C59B27]/40 focus:border-[#6A091A]'
                      }`}
                    />
                    {formErrors.pincode && <p className="text-red-600 text-[11px] mt-1">{formErrors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* Order Summary in Modal */}
              <div className="mt-5 p-3 rounded bg-[#FFFDF8] border border-[#C59B27]/40 text-xs font-sans">
                <div className="flex justify-between text-[#8C6B4F]">
                  <span>{totalItems} items</span>
                  <span className="font-bold text-[#6A091A]">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#8C6B4F] mt-1">
                  <span>Shipping</span>
                  <span className="text-[#0D3B2E] font-bold">FREE</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={handleCheckoutSubmit}
                disabled={checkoutLoading}
                className="mt-5 btn-maroon-gold w-full py-3.5 rounded-full font-semibold text-xs tracking-widest flex items-center justify-center gap-2 shadow-md uppercase disabled:opacity-60"
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    PLACING ORDER...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4 text-[#E8C86B]" />
                    PLACE ORDER & OPEN WHATSAPP
                  </>
                )}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
