'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, LayoutGrid, List } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import {
  mockProducts,
  getUniqueFabrics,
  getUniqueColors,
  getUniqueOccasions,
} from '@/lib/mockData';

export default function ShopPage() {
  const [search, setSearch] = useState('');
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const maxPrice = Math.max(...mockProducts.map((p) => p.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  const fabrics = getUniqueFabrics();
  const colors = getUniqueColors();
  const occasions = getUniqueOccasions();

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
    let result = mockProducts;

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
  }, [search, selectedFabrics, selectedColors, selectedOccasions, priceRange, sortBy]);

  const clearAll = () => {
    setSelectedFabrics([]);
    setSelectedColors([]);
    setSelectedOccasions([]);
    setPriceRange([0, maxPrice]);
    setSearch('');
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="py-10 sm:py-14 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-cream)] mb-2"
          >
            Our <span className="text-gradient-gold">Collection</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[var(--color-text-muted)]"
          >
            {mockProducts.length} handpicked sarees from across India
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar: Search + Sort + Mobile Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-dim)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, fabric, color, occasion..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] focus:border-[var(--color-gold)] focus:outline-none transition-colors cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>

            {/* Mobile Filter */}
            <FilterSidebar
              fabrics={fabrics}
              colors={colors}
              occasions={occasions}
              selectedFabrics={selectedFabrics}
              selectedColors={selectedColors}
              selectedOccasions={selectedOccasions}
              onFabricChange={(f) =>
                toggleFilter(f, selectedFabrics, setSelectedFabrics)
              }
              onColorChange={(c) =>
                toggleFilter(c, selectedColors, setSelectedColors)
              }
              onOccasionChange={(o) =>
                toggleFilter(o, selectedOccasions, setSelectedOccasions)
              }
              onClearAll={clearAll}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={maxPrice}
            />
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar
                fabrics={fabrics}
                colors={colors}
                occasions={occasions}
                selectedFabrics={selectedFabrics}
                selectedColors={selectedColors}
                selectedOccasions={selectedOccasions}
                onFabricChange={(f) =>
                  toggleFilter(f, selectedFabrics, setSelectedFabrics)
                }
                onColorChange={(c) =>
                  toggleFilter(c, selectedColors, setSelectedColors)
                }
                onOccasionChange={(o) =>
                  toggleFilter(o, selectedOccasions, setSelectedOccasions)
                }
                onClearAll={clearAll}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                maxPrice={maxPrice}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-6xl mb-4">🥻</p>
                  <h3 className="font-display text-xl text-[var(--color-cream)] mb-2">
                    No sarees found
                  </h3>
                  <p className="text-[var(--color-text-dim)] mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <button onClick={clearAll} className="btn-outline text-sm">
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[var(--color-text-dim)] mb-4">
                    Showing {filteredProducts.length} of {mockProducts.length} sarees
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
