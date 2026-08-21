'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import { SectionDivider } from '@/components/OrnamentalIcons';
import { getAllProducts } from '@/lib/productService';
import { Product } from '@/lib/supabase';
import { mockProducts } from '@/lib/mockData';

function ShopPageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [initialFiltersApplied, setInitialFiltersApplied] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      if (data.length > 0) {
        const max = Math.max(...data.map((p) => p.price));
        setPriceRange([0, max]);
      }

      // Apply URL query parameters as initial filters
      const categoryParam = searchParams.get('category');
      const fabricParam = searchParams.get('fabric');
      const occasionParam = searchParams.get('occasion');
      const searchParam = searchParams.get('search') || searchParams.get('q');

      if (categoryParam && data.length > 0) {
        // Match category slug against product fabric, occasion, or name fields
        const categoryLower = categoryParam.toLowerCase().replace(/-/g, ' ');
        const matchingFabrics = Array.from(new Set(data.map((p) => p.fabric)))
          .filter((f) => f.toLowerCase().includes(categoryLower) || categoryLower.includes(f.toLowerCase()));
        const matchingOccasions = Array.from(new Set(data.map((p) => p.occasion)))
          .filter((o) => o.toLowerCase().includes(categoryLower) || categoryLower.includes(o.toLowerCase()));

        if (matchingFabrics.length > 0) {
          setSelectedFabrics(matchingFabrics);
        } else if (matchingOccasions.length > 0) {
          setSelectedOccasions(matchingOccasions);
        } else {
          // Fallback: set as search text so the user still sees related results
          setSearch(categoryParam.replace(/-/g, ' '));
        }
      }

      if (fabricParam) {
        const matchingFabrics = Array.from(new Set(data.map((p) => p.fabric)))
          .filter((f) => f.toLowerCase().includes(fabricParam.toLowerCase()));
        if (matchingFabrics.length > 0) setSelectedFabrics((prev) => [...new Set([...prev, ...matchingFabrics])]);
      }

      if (occasionParam) {
        const matchingOccasions = Array.from(new Set(data.map((p) => p.occasion)))
          .filter((o) => o.toLowerCase().includes(occasionParam.toLowerCase()));
        if (matchingOccasions.length > 0) setSelectedOccasions((prev) => [...new Set([...prev, ...matchingOccasions])]);
      }

      if (searchParam) {
        setSearch(searchParam);
      }

      setInitialFiltersApplied(true);
      setLoading(false);
    }
    loadData();
  }, [searchParams]);


  const fabrics = useMemo(() => Array.from(new Set(products.map((p) => p.fabric))), [products]);
  const colors = useMemo(() => Array.from(new Set(products.map((p) => p.color))), [products]);
  const occasions = useMemo(() => Array.from(new Set(products.map((p) => p.occasion))), [products]);
  const maxPrice = useMemo(() => (products.length > 0 ? Math.max(...products.map((p) => p.price)) : 20000), [products]);

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: (v: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((s) => s !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.occasion.toLowerCase().includes(q) ||
          (p.region && p.region.toLowerCase().includes(q))
      );
    }

    // Filters
    if (selectedFabrics.length > 0) {
      result = result.filter((p) => selectedFabrics.includes(p.fabric));
    }
    if (selectedColors.length > 0) {
      result = result.filter((p) => selectedColors.includes(p.color));
    }
    if (selectedOccasions.length > 0) {
      result = result.filter((p) => selectedOccasions.includes(p.occasion));
    }

    // Price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, search, selectedFabrics, selectedColors, selectedOccasions, priceRange, sortBy]);

  const clearAll = () => {
    setSelectedFabrics([]);
    setSelectedColors([]);
    setSelectedOccasions([]);
    setPriceRange([0, maxPrice]);
    setSearch('');
  };

  return (
    <div className="bg-[#FAF6EE] min-h-screen font-serif text-[#241416]">
      {/* Header Banner */}
      <section className="py-12 bg-[#38030B] border-b-2 border-[#C59B27] text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionDivider title="ROYAL BOUTIQUE CATALOG" />
          <p className="text-xs sm:text-sm font-sans tracking-[0.2em] text-[#E8C86B] uppercase mt-2">
            EXPLORE {products.length} HANDWOVEN SAREES & LEHENGAS
          </p>
        </div>
      </section>

      {/* Catalog Content */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Controls: Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C59B27]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by weave, fabric (Silk, Banarasi), color..."
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#FFFDF8] border border-[#C59B27]/40 text-sm font-sans text-[#241416] placeholder:text-[#7C6354] focus:border-[#6A091A] focus:outline-none"
            />
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#FFFDF8] border border-[#C59B27]/40 text-xs font-serif font-semibold uppercase tracking-wider text-[#6A091A] focus:border-[#6A091A] focus:outline-none cursor-pointer"
          >
            <option value="featured">❖ FEATURED FIRST</option>
            <option value="price-asc">❖ PRICE: LOW TO HIGH</option>
            <option value="price-desc">❖ PRICE: HIGH TO LOW</option>
            <option value="name">❖ NAME A-Z</option>
          </select>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <FilterSidebar
              fabrics={fabrics}
              colors={colors}
              occasions={occasions}
              selectedFabrics={selectedFabrics}
              selectedColors={selectedColors}
              selectedOccasions={selectedOccasions}
              onFabricChange={(f) => toggleFilter(f, selectedFabrics, setSelectedFabrics)}
              onColorChange={(c) => toggleFilter(c, selectedColors, setSelectedColors)}
              onOccasionChange={(o) => toggleFilter(o, selectedOccasions, setSelectedOccasions)}
              onClearAll={clearAll}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              fabrics={fabrics}
              colors={colors}
              occasions={occasions}
              selectedFabrics={selectedFabrics}
              selectedColors={selectedColors}
              selectedOccasions={selectedOccasions}
              onFabricChange={(f) => toggleFilter(f, selectedFabrics, setSelectedFabrics)}
              onColorChange={(c) => toggleFilter(c, selectedColors, setSelectedColors)}
              onOccasionChange={(o) => toggleFilter(o, selectedOccasions, setSelectedOccasions)}
              onClearAll={clearAll}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-[#FFFDF8] rounded-lg border border-[#E2D7C3]">
                <Loader2 className="w-8 h-8 text-[#6A091A] animate-spin mb-3" />
                <p className="font-serif text-sm text-[#7C6354]">Curating boutique catalog...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#FFFDF8] rounded-lg border border-[#E2D7C3] p-8">
                <span className="text-5xl block mb-4">🥻</span>
                <h3 className="font-serif text-2xl font-semibold text-[#6A091A] mb-2">
                  No Sarees Found Matching Criteria
                </h3>
                <p className="text-sm font-sans text-[#7C6354] mb-6">
                  Please try resetting your search term or adjusting filter values.
                </p>
                <button
                  onClick={clearAll}
                  className="btn-maroon-gold text-xs px-6 py-2.5 rounded-full uppercase"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6 border-b border-[#C59B27]/30 pb-2">
                  <span className="text-xs font-serif tracking-wider uppercase text-[#7C6354]">
                    SHOWING {filteredProducts.length} OF {products.length} SAREES
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FAF6EE]">
          <Loader2 className="w-8 h-8 text-[#6A091A] animate-spin mb-3" />
          <p className="font-serif text-sm text-[#7C6354]">Loading boutique catalog...</p>
        </div>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}
