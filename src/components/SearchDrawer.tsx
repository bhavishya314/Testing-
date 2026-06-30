import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { GoldStyle } from '../types';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  goldStyle: GoldStyle;
  onAddToCart: (item: { id: string; name: string; price: number; image: string; size?: string; color?: string }) => void;
}

const LUXURY_CATALOG = [
  { id: 'item-1', name: 'Maison Silk Slip Dress', price: 890, category: 'Dresses', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=300&auto=format&fit=crop' },
  { id: 'item-2', name: 'Sovereign Cashmere Overcoat', price: 2450, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop' },
  { id: 'item-3', name: 'Monarch Linen Tailored Blazer', price: 1250, category: 'Suits & Blazers', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300&auto=format&fit=crop' },
  { id: 'item-4', name: 'Signature Calfskin Chelsea Boots', price: 950, category: 'Footwear', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=300&auto=format&fit=crop' },
  { id: 'item-5', name: '18K Aurelia Initial Signet Ring', price: 1800, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300&auto=format&fit=crop' },
  { id: 'item-6', name: 'Classic Gold Leaf Silk Scarf', price: 380, category: 'Accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop' },
];

const POPULAR_SUGGESTIONS = [
  'Silk Slip',
  'Cashmere',
  'Gold Leaf',
  'Cruise 2026 Collection',
];

export default function SearchDrawer({ isOpen, onClose, goldStyle, onAddToCart }: SearchDrawerProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(LUXURY_CATALOG);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(LUXURY_CATALOG);
    } else {
      const filtered = LUXURY_CATALOG.filter(
        item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  // Handle gold style hex mapping
  const getGoldColor = () => {
    if (goldStyle === 'champagne') return 'text-[#dfba73]';
    if (goldStyle === 'bright') return 'text-[#ffd700]';
    return 'text-[#c5a880]'; // classic
  };

  const getGoldBorder = () => {
    if (goldStyle === 'champagne') return 'border-[#dfba73]';
    if (goldStyle === 'bright') return 'border-[#ffd700]';
    return 'border-[#c5a880]'; // classic
  };

  const getGoldBg = () => {
    if (goldStyle === 'champagne') return 'bg-[#dfba73]';
    if (goldStyle === 'bright') return 'bg-[#ffd700]';
    return 'bg-[#c5a880]'; // classic
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0af5] text-white backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 md:px-16 md:py-8 border-b border-neutral-900">
            <span className={`font-serif tracking-[0.3em] text-lg font-semibold ${getGoldColor()}`}>
              AURELIA
            </span>
            <button
              id="close-search-btn"
              onClick={onClose}
              className="flex items-center gap-2 group text-neutral-400 hover:text-white transition-colors duration-300"
            >
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium">Close</span>
              <div className="p-1.5 rounded-full border border-neutral-800 group-hover:border-neutral-600 transition-colors duration-300">
                <X className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Search Stage */}
          <div className="flex-1 overflow-y-auto px-6 py-12 md:px-16 max-w-5xl mx-auto w-full">
            {/* Search Input Container */}
            <div className="relative mb-12">
              <Search className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400 ${getGoldColor()}`} />
              <input
                id="luxury-search-input"
                ref={inputRef}
                type="text"
                placeholder="Search our haute collections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full bg-transparent pl-10 pr-4 pb-4 font-serif text-2xl md:text-4xl tracking-wide placeholder-neutral-600 border-b border-neutral-800 focus:border-b focus:outline-none transition-all duration-500 ${getGoldBorder()}`}
              />
            </div>

            {/* Content Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Popular suggestions & info */}
              <div className="lg:col-span-4 space-y-8">
                <div>
                  <h4 className="font-sans text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold mb-4">
                    Popular Inquiries
                  </h4>
                  <div className="flex flex-col gap-3">
                    {POPULAR_SUGGESTIONS.map((sug, idx) => (
                      <button
                        id={`popular-sug-${idx}`}
                        key={sug}
                        onClick={() => setQuery(sug)}
                        className="flex items-center gap-2 group text-left text-neutral-300 hover:text-white font-sans text-sm tracking-wide transition-all duration-300"
                      >
                        <ArrowRight className={`w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${getGoldColor()}`} />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{sug}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 border border-neutral-900 bg-neutral-950/40 rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className={`w-4 h-4 ${getGoldColor()}`} />
                    <span className={`font-serif text-xs tracking-wider ${getGoldColor()}`}>
                      AURELIA CONCIERGE
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    Enjoy complimentary courier shipping and signature gift casing on all orders of fine silks and wools.
                  </p>
                </div>
              </div>

              {/* Right Column: Live Results */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex justify-between items-center border-b border-neutral-900 pb-2">
                  <h4 className="font-sans text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold">
                    Collections & Items ({results.length})
                  </h4>
                  {query && (
                    <button
                      id="clear-query-btn"
                      onClick={() => setQuery('')}
                      className="font-sans text-[10px] tracking-widest text-neutral-400 hover:text-white uppercase font-light"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>

                {results.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                    {results.map((item) => (
                      <div
                        id={`search-item-${item.id}`}
                        key={item.id}
                        className="flex gap-4 p-3 border border-neutral-900/60 bg-neutral-950/20 hover:border-neutral-800 rounded-lg group transition-all duration-300"
                      >
                        <div className="w-20 h-24 overflow-hidden rounded bg-neutral-900 shrink-0 relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col justify-between py-1 flex-1">
                          <div>
                            <span className="font-sans text-[9px] tracking-widest text-neutral-500 uppercase">
                              {item.category}
                            </span>
                            <h5 className="font-serif text-sm tracking-wide text-neutral-100 group-hover:text-white mt-1">
                              {item.name}
                            </h5>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`font-sans text-xs font-semibold ${getGoldColor()}`}>
                              ${item.price.toLocaleString()}
                            </span>
                            <button
                              id={`search-add-cart-${item.id}`}
                              onClick={() => onAddToCart(item)}
                              className={`font-sans text-[10px] tracking-widest font-semibold uppercase hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${getGoldColor()}`}
                            >
                              + Quick Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-neutral-500 font-sans font-light">
                    No couture items matched your inquiry.
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
