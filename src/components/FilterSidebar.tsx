'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  fabrics: string[];
  colors: string[];
  occasions: string[];
  selectedFabrics: string[];
  selectedColors: string[];
  selectedOccasions: string[];
  onFabricChange: (fabric: string) => void;
  onColorChange: (color: string) => void;
  onOccasionChange: (occasion: string) => void;
  onClearAll: () => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
}

function FilterSection({
  title,
  isOpen,
  toggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[var(--color-border)] pb-4">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <span className="font-display text-sm font-semibold text-[var(--color-cream)] uppercase tracking-wider">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--color-text-dim)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-1.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FilterSidebar({
  fabrics,
  colors,
  occasions,
  selectedFabrics,
  selectedColors,
  selectedOccasions,
  onFabricChange,
  onColorChange,
  onOccasionChange,
  onClearAll,
  priceRange,
  onPriceRangeChange,
  maxPrice,
}: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    fabric: true,
    color: true,
    occasion: true,
    price: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasFilters =
    selectedFabrics.length > 0 ||
    selectedColors.length > 0 ||
    selectedOccasions.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice;

  const filterContent = (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-[var(--color-cream)] flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[var(--color-gold)]" />
          Filters
        </h2>
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="text-xs text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="divider-gold" />

      {/* Fabric */}
      <FilterSection
        title="Fabric"
        isOpen={openSections.fabric}
        toggle={() => toggleSection('fabric')}
      >
        {fabrics.map((fabric) => (
          <label
            key={fabric}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                selectedFabrics.includes(fabric)
                  ? 'bg-[var(--color-gold)] border-[var(--color-gold)]'
                  : 'border-[var(--color-border)] group-hover:border-[var(--color-gold-dark)]'
              }`}
            >
              {selectedFabrics.includes(fabric) && (
                <svg className="w-3 h-3 text-[var(--color-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span
              className={`text-sm transition-colors duration-200 ${
                selectedFabrics.includes(fabric)
                  ? 'text-[var(--color-gold)]'
                  : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-cream)]'
              }`}
              onClick={() => onFabricChange(fabric)}
            >
              {fabric}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Color */}
      <FilterSection
        title="Color"
        isOpen={openSections.color}
        toggle={() => toggleSection('color')}
      >
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`chip text-xs ${selectedColors.includes(color) ? 'active' : ''}`}
            >
              {color}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Occasion */}
      <FilterSection
        title="Occasion"
        isOpen={openSections.occasion}
        toggle={() => toggleSection('occasion')}
      >
        {occasions.map((occasion) => (
          <label
            key={occasion}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                selectedOccasions.includes(occasion)
                  ? 'bg-[var(--color-gold)] border-[var(--color-gold)]'
                  : 'border-[var(--color-border)] group-hover:border-[var(--color-gold-dark)]'
              }`}
            >
              {selectedOccasions.includes(occasion) && (
                <svg className="w-3 h-3 text-[var(--color-bg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span
              className={`text-sm transition-colors duration-200 ${
                selectedOccasions.includes(occasion)
                  ? 'text-[var(--color-gold)]'
                  : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-cream)]'
              }`}
              onClick={() => onOccasionChange(occasion)}
            >
              {occasion}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price */}
      <FilterSection
        title="Price Range"
        isOpen={openSections.price}
        toggle={() => toggleSection('price')}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-[var(--color-text-dim)] uppercase">Min</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  onPriceRangeChange([Number(e.target.value), priceRange[1]])
                }
                className="w-full mt-1 px-3 py-1.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                min={0}
              />
            </div>
            <span className="text-[var(--color-text-dim)] mt-5">—</span>
            <div className="flex-1">
              <label className="text-[10px] text-[var(--color-text-dim)] uppercase">Max</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  onPriceRangeChange([priceRange[0], Number(e.target.value)])
                }
                className="w-full mt-1 px-3 py-1.5 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                min={0}
              />
            </div>
          </div>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-muted)] hover:border-[var(--color-gold)] transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {hasFilters && (
          <span className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
          {filterContent}
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-80 bg-[var(--color-bg)] border-r border-[var(--color-border)] z-[70] lg:hidden overflow-y-auto p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-semibold text-[var(--color-cream)]">
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--color-text-muted)]" />
                </button>
              </div>
              {filterContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
