'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Award, Users } from 'lucide-react';
import Link from 'next/link';
import { SectionDivider } from '@/components/OrnamentalIcons';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Craftsmanship',
      description:
        'We partner directly with artisan weaver clusters to preserve centuries-old handloom techniques and ensure fair compensation.',
    },
    {
      icon: Sparkles,
      title: 'Authentic Heritage',
      description:
        'Every saree is ethically sourced directly from its region of origin — Varanasi, Kanchipuram, Chanderi, and Bengal.',
    },
    {
      icon: Award,
      title: 'Curated Perfection',
      description:
        'Our textile connoisseurs hand-select each piece, ensuring only the finest zari weaves reach your royal wardrobe.',
    },
    {
      icon: Users,
      title: 'Artisan Empowerment',
      description:
        'By adorning yourself in ZEYANA, you directly support over 200 master weaver families across traditional Indian looms.',
    },
  ];

  return (
    <div className="bg-[#FAF6EE] min-h-screen font-serif text-[#241416]">
      {/* Header Banner */}
      <section className="py-14 bg-[#38030B] border-b-2 border-[#C59B27] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <SectionDivider title="OUR WEAVING HERITAGE" />
          <p className="text-xs sm:text-sm font-sans tracking-[0.2em] text-[#E8C86B] uppercase mt-2">
            PRESERVING CENTURIES OF INDIAN HANDLOOM ELEGANCE
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <h2 className="font-serif text-3xl font-bold text-[#6A091A] leading-tight">
              A Living Legacy of Gold Zari & Silk
            </h2>
            <p className="text-sm font-sans text-[#7C6354] leading-relaxed">
              India&apos;s textile heritage is an eternal tapestry woven across thousands of years. Each region holds its own sacred weaving motif — from the regal Kanjivaram silk sarees of Tamil Nadu to the golden Banarasi brocades of Varanasi.
            </p>
            <p className="text-sm font-sans text-[#7C6354] leading-relaxed">
              At ZEYANA, we travel directly to weaver clusters, meeting the master artisans who pour their soul into every loom warp and weft. Our boutique brings you the untamed grandeur of authentic Indian maximalism.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#C59B27] bg-[#FFFDF8] p-2 shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
              alt="Royal Handloom Saree"
              className="w-full h-full object-cover rounded"
            />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[#F3EDE0] border-y border-[#C59B27]/40 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionDivider title="WHAT WE STAND FOR" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-lg bg-[#FFFDF8] border border-[#E2D7C3] text-center shadow-xs"
              >
                <div className="w-12 h-12 rounded-full bg-[#6A091A] text-[#E8C86B] border border-[#C59B27] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#6A091A] mb-2 uppercase tracking-wider">
                  {value.title}
                </h3>
                <p className="text-xs font-sans text-[#7C6354] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center max-w-3xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold text-[#6A091A] uppercase tracking-wider mb-4">
          ADORN YOURSELF IN ROYAL TRADITION
        </h2>
        <p className="text-sm font-sans text-[#7C6354] mb-8">
          Explore our handcrafted collections and enjoy personalized concierge ordering directly on WhatsApp.
        </p>
        <Link
          href="/shop"
          className="btn-maroon-gold inline-flex items-center gap-2 text-xs font-bold tracking-widest px-8 py-3.5 rounded-full uppercase"
        >
          EXPLORE CATALOG
        </Link>
      </section>
    </div>
  );
}
