'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Truck, ShieldCheck, MessageCircle } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, mockProducts } from '@/lib/mockData';

const categories = [
  { name: 'Silk', emoji: '✨', description: 'Luxurious silk weaves', count: mockProducts.filter(p => p.fabric === 'Silk' || p.fabric === 'Tussar Silk').length },
  { name: 'Cotton', emoji: '🌿', description: 'Breezy cotton comfort', count: mockProducts.filter(p => p.fabric === 'Cotton').length },
  { name: 'Georgette', emoji: '🌸', description: 'Flowing elegance', count: mockProducts.filter(p => p.fabric === 'Georgette').length },
  { name: 'Linen', emoji: '🍃', description: 'Eco-chic drapes', count: mockProducts.filter(p => p.fabric === 'Linen').length },
  { name: 'Crepe', emoji: '🎭', description: 'Royal textures', count: mockProducts.filter(p => p.fabric === 'Crepe').length },
  { name: 'Wedding', emoji: '💍', description: 'Bridal collection', count: mockProducts.filter(p => p.occasion === 'Wedding').length },
];

const features = [
  { icon: Sparkles, title: 'Handpicked Quality', description: 'Every saree is carefully selected from master weavers' },
  { icon: Truck, title: 'Pan-India Delivery', description: 'Free shipping on orders above ₹5,000' },
  { icon: ShieldCheck, title: 'Authenticity Guaranteed', description: '100% genuine handloom products' },
  { icon: MessageCircle, title: 'WhatsApp Ordering', description: 'Easy checkout via WhatsApp chat' },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)] via-[#1a1510] to-[var(--color-bg)]" />
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a853' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Handcrafted with Love
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              <span className="text-[var(--color-cream)]">Timeless</span>
              <br />
              <span className="text-gradient-gold">Indian Sarees</span>
              <br />
              <span className="text-[var(--color-cream)]">Woven for You</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-lg sm:text-xl text-[var(--color-text-muted)] max-w-xl mb-8 leading-relaxed"
            >
              Explore our curated collection of handloom sarees from
              India&apos;s finest weaving traditions — from Kanjivaram silks to
              Chanderi cottons.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/shop" className="btn-gold inline-flex items-center gap-2 text-base">
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="btn-outline inline-flex items-center gap-2 text-base">
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 flex items-center justify-center mx-auto">
                  <feature.icon className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <h3 className="font-display text-sm font-semibold text-[var(--color-cream)]">
                  {feature.title}
                </h3>
                <p className="text-xs text-[var(--color-text-dim)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-cream)] mb-3"
            >
              Featured <span className="text-gradient-gold">Sarees</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[var(--color-text-muted)] max-w-lg mx-auto"
            >
              Hand-selected pieces from our latest collection
            </motion.p>
            <div className="divider-gold max-w-xs mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="btn-outline inline-flex items-center gap-2">
              View All Sarees
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-20 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-cream)] mb-3"
            >
              Browse by <span className="text-gradient-gold">Category</span>
            </motion.h2>
            <div className="divider-gold max-w-xs mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href="/shop"
                  className="block p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 card-hover text-center group"
                >
                  <span className="text-3xl block mb-3">{cat.emoji}</span>
                  <h3 className="font-display text-sm font-semibold text-[var(--color-cream)] group-hover:text-[var(--color-gold)] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-[var(--color-text-dim)] mt-1">
                    {cat.description}
                  </p>
                  <span className="text-[10px] text-[var(--color-gold)] mt-2 block">
                    {cat.count} items
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(212,168,83,0.15), rgba(28,25,23,0.9), rgba(212,168,83,0.1))',
              border: '1px solid rgba(212,168,83,0.2)',
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-cream)] mb-4">
                Order via <span className="text-gradient-gold">WhatsApp</span>
              </h2>
              <p className="text-[var(--color-text-muted)] max-w-lg mx-auto mb-8">
                Simply add sarees to your bag, and checkout instantly via WhatsApp.
                We&apos;ll confirm your order and arrange delivery — no complex
                payment gateways needed.
              </p>
              <Link href="/shop" className="btn-gold inline-flex items-center gap-2 text-base">
                <MessageCircle className="w-4 h-4" />
                Start Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
