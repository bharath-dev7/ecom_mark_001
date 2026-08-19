'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { categoriesData, mockProducts } from '@/lib/mockData';
import { SectionDivider, RoyalElephant, FestiveEmblemBadge } from '@/components/OrnamentalIcons';

export default function HomePage() {
  const featured = mockProducts;

  return (
    <div className="bg-[#FAF6EE] text-[#241416] font-serif">
      {/* 1. Hero Carousel / Banner Section */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#38030B]">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=85"
            alt="Royal Heritage Sarees"
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#38030B]/90 via-[#38030B]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#38030B] via-transparent to-[#38030B]/70" />
        </div>

        {/* Jharokha Arch Overlay Border */}
        <div className="absolute inset-4 sm:inset-8 border border-[#C59B27]/40 pointer-events-none rounded-xl z-10 flex flex-col justify-between p-4">
          <div className="flex justify-between text-[#C59B27] text-sm">
            <span>❖</span>
            <span>❖</span>
          </div>
          <div className="flex justify-between text-[#C59B27] text-sm">
            <span>❖</span>
            <span>❖</span>
          </div>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text Column */}
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.15] text-[#FAF6EE] mb-6">
                Grace in every drape. <br />
                <span className="text-[#E8C86B] italic font-normal">Tradition in every thread.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-[#EBE2D0] max-w-lg mb-8 font-sans font-light leading-relaxed"
            >
              Discover the finest curated collection of handloom sarees that celebrate your heritage, elegance, and timeless grace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href="/shop"
                className="btn-maroon-gold inline-flex items-center gap-3 text-sm tracking-widest font-semibold px-8 py-3.5 rounded-full uppercase"
              >
                SHOP NOW
                <ArrowRight className="w-4 h-4 text-[#E8C86B]" />
              </Link>
            </motion.div>
          </div>

          {/* Right Emblem Badge (Festive Badge floating emblem) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block"
          >
            <FestiveEmblemBadge text="FESTIVE COLLECTION '24" />
          </motion.div>
        </div>
      </section>

      {/* 2. Category Explorer Section ("EXPLORE CATEGORIES") */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionDivider title="EXPLORE CATEGORIES" />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center mt-10">
          {categoriesData.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <Link href={`/shop?category=${cat.slug}`} className="flex flex-col items-center">
                {/* Circular Gold Filigree Ring */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#C59B27] via-[#E8C86B] to-[#997517] shadow-md group-hover:scale-105 transition-transform duration-300 relative">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#FAF6EE] relative bg-[#F3EDE0]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {cat.badge && (
                      <div className="absolute inset-0 bg-[#6A091A]/80 flex items-center justify-center p-1 text-center">
                        <span className="text-[10px] font-bold text-[#E8C86B] tracking-wider leading-tight">
                          {cat.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Label */}
                <span className="mt-3 text-xs sm:text-sm font-semibold tracking-wider text-[#6A091A] uppercase group-hover:text-[#C59B27] transition-colors">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Festive Promotional Banner ("WEDDING SEASON SPECIAL") */}
      <section className="my-16 bg-[#4A0512] border-y-2 border-[#C59B27] py-12 px-6 relative overflow-hidden text-[#E8C86B]">
        {/* Damask Pattern Glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#E8C86B_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-left">
          {/* Left Royal Elephant */}
          <div className="hidden lg:block opacity-90 hover:scale-105 transition-transform">
            <RoyalElephant className="w-36 h-28" />
          </div>

          {/* Center Text Offer */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-serif tracking-[0.3em] text-[#E8C86B] uppercase border-y border-[#C59B27]/40 py-1 px-4">
              ❖ WEDDING SEASON SPECIAL ❖
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider text-[#FFFDF8] uppercase leading-tight">
              UPTO 30% OFF
            </h2>

            <p className="font-serif text-sm tracking-[0.2em] text-[#E8C86B] uppercase">
              ON SELECTED COLLECTIONS
            </p>

            <Link
              href="/shop"
              className="mt-4 btn-gold-outline text-xs tracking-widest px-8 py-2.5 rounded-full font-bold bg-[#6A091A] text-[#E8C86B] border-[#E8C86B] hover:bg-[#E8C86B] hover:text-[#4A0512]"
            >
              SHOP THE LOOK
            </Link>
          </div>

          {/* Right Royal Elephant (Mirrored) */}
          <div className="hidden lg:block opacity-90 transform -scale-x-100 hover:scale-x-[-1.05] hover:scale-y-[1.05] transition-transform">
            <RoyalElephant className="w-36 h-28" />
          </div>
        </div>
      </section>

      {/* 4. New Arrivals Grid ("NEW ARRIVALS") */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionDivider title="NEW ARRIVALS" />

        {/* 5-Column Product Layout matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
          {featured.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="btn-maroon-gold inline-flex items-center gap-2 text-xs tracking-widest font-bold px-10 py-3.5 rounded-full uppercase"
          >
            VIEW ALL COLLECTIONS
          </Link>
        </div>
      </section>

      {/* 5. Heritage Craftsmanship Story Section */}
      <section className="py-16 bg-[#F3EDE0] border-t border-[#C59B27]/40 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="text-xs font-serif tracking-[0.3em] text-[#C59B27] uppercase">❖ HERITAGE & HANDLOOM ❖</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6A091A]">
            Crafted by Master Weavers Across India
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#7C6354] leading-relaxed max-w-2xl mx-auto">
            From the sacred looms of Varanasi to the heritage temples of Kanchipuram, every saree in our boutique is ethically sourced and woven with authentic gold zari threads.
          </p>
        </div>
      </section>
    </div>
  );
}
