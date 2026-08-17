'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Award, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Craft',
      description:
        'We partner directly with artisan weavers to preserve centuries-old techniques and ensure fair wages.',
    },
    {
      icon: Sparkles,
      title: 'Authenticity First',
      description:
        'Every saree is sourced directly from its region of origin — no middlemen, no compromise on quality.',
    },
    {
      icon: Award,
      title: 'Curated Excellence',
      description:
        'Our team hand-selects each piece, ensuring only the finest craftsmanship reaches your wardrobe.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description:
        'By choosing us, you support a network of over 200 weaver families across India.',
    },
  ];

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-[var(--color-surface)] border-b border-[var(--color-border)] overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl font-bold text-[var(--color-cream)] mb-6"
          >
            Our <span className="text-gradient-gold">Story</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="divider-gold max-w-xs mx-auto mb-8" />
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl mx-auto">
              Born from a deep love for India&apos;s textile heritage, सारी Collection
              is on a mission to bring the finest handloom sarees from master
              artisans directly to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-cream)]">
                A Thread of <span className="text-gradient-gold">Tradition</span>
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                India&apos;s handloom tradition spans thousands of years. Each region
                has its own unique weaving style — from the opulent Kanjivaram silks
                of Tamil Nadu to the delicate Chanderi cottons of Madhya Pradesh.
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                We travel across the country, visiting weaving clusters and
                meeting the artisans who pour their hearts into every thread.
                Our curated collection brings you the very best of this rich
                heritage.
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                With our simple WhatsApp ordering process, we&apos;ve made it
                effortless to own a piece of India&apos;s living textile legacy —
                no complicated checkouts, just genuine human connection.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-dark)]/10 via-[var(--color-bg-elevated)] to-[var(--color-bg-card)] flex items-center justify-center">
                <span className="text-[100px]">🧶</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-cream)] mb-3">
              What We <span className="text-gradient-gold">Stand For</span>
            </h2>
            <div className="divider-gold max-w-xs mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] card-hover text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-[var(--color-gold)]" />
                </div>
                <h3 className="font-display text-base font-semibold text-[var(--color-cream)] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-[var(--color-cream)] mb-4">
            Ready to find your perfect saree?
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8">
            Browse our collection and order directly via WhatsApp.
          </p>
          <Link href="/shop" className="btn-gold inline-flex items-center gap-2 text-base">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
