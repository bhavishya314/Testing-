import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { GoldStyle } from '../types';

interface NewArrivalProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
}

interface NewArrivalsProps {
  goldStyle: GoldStyle;
  wishlistIds: string[];
  onAddToCart: (item: { id: string; name: string; price: number; image: string; size?: string; color?: string }) => void;
  onAddToWishlist: (item: { id: string; name: string; price: number; image: string }) => void;
  onRemoveFromWishlist: (id: string) => void;
  onProductClick?: (product: any) => void;
}

const NEW_ARRIVALS_PRODUCTS: NewArrivalProduct[] = [
  {
    id: 'new-1',
    name: 'Aurelia Ribbed Cashmere Knit',
    category: 'Knitwear',
    price: 680,
    originalPrice: 850,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    rating: 5.0
  },
  {
    id: 'new-2',
    name: 'Satin Pleated Wide-Leg Trousers',
    category: 'Trousers',
    price: 520,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop',
    rating: 4.8
  },
  {
    id: 'new-3',
    name: 'Monogram Jacquard Wool Poncho',
    category: 'Outerwear',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
    rating: 4.9
  },
  {
    id: 'new-4',
    name: 'Cropped Tweed Bouclé Jacket',
    category: 'Outerwear',
    price: 1450,
    originalPrice: 1750,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600&auto=format&fit=crop',
    rating: 5.0
  },
  {
    id: 'new-5',
    name: 'Classic Gold Accent Leather Belt',
    category: 'Accessories',
    price: 310,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    rating: 4.7
  },
  {
    id: 'new-6',
    name: 'Atelier Silk-Lined Leather Gloves',
    category: 'Accessories',
    price: 450,
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop',
    rating: 4.9
  },
  {
    id: 'new-7',
    name: 'Crescent Moon Gold Link Bracelet',
    category: 'Jewelry',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop',
    rating: 5.0
  },
  {
    id: 'new-8',
    name: 'Sovereign Velvet Evening Clutch',
    category: 'Bags',
    price: 880,
    originalPrice: 1100,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc15a4a0?q=80&w=600&auto=format&fit=crop',
    rating: 4.8
  }
];

export default function NewArrivals({
  goldStyle,
  wishlistIds,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onProductClick,
}: NewArrivalsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [addedNotifyId, setAddedNotifyId] = useState<string | null>(null);
  
  // Touch swipe states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Responsive items count configuration
  const [visibleItemsCount, setVisibleItemsCount] = useState(4);

  // Handle window resizing to adjust visible items count dynamically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItemsCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItemsCount(2);
      } else if (window.innerWidth < 1280) {
        setVisibleItemsCount(3);
      } else {
        setVisibleItemsCount(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalProducts = NEW_ARRIVALS_PRODUCTS.length;
  const maxIndex = Math.max(0, totalProducts - visibleItemsCount);

  // Auto-scroll loop
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= maxIndex) {
          return 0; // wrap back to start
        }
        return prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Stylings
  const getGoldColor = () => {
    if (goldStyle === 'champagne') return 'text-[#dfba73]';
    if (goldStyle === 'bright') return 'text-[#ffd700]';
    return 'text-[#c5a880]'; // classic
  };

  const getGoldBg = () => {
    if (goldStyle === 'champagne') return 'bg-[#dfba73] hover:bg-[#e6ca95] text-black';
    if (goldStyle === 'bright') return 'bg-[#ffd700] hover:bg-[#ffe04c] text-black';
    return 'bg-[#c5a880] hover:bg-[#d4ba97] text-black'; // classic
  };

  const getGoldBorder = () => {
    if (goldStyle === 'champagne') return 'border-[#dfba73] text-[#dfba73]';
    if (goldStyle === 'bright') return 'border-[#ffd700] text-[#ffd700]';
    return 'border-[#c5a880] text-[#c5a880]'; // classic
  };

  const getGoldGlow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_0_20px_rgba(223,186,115,0.2)] hover:border-[#dfba73]/40';
    if (goldStyle === 'bright') return 'hover:shadow-[0_0_25px_rgba(255,215,0,0.25)] hover:border-[#ffd700]/40';
    return 'hover:shadow-[0_0_20px_rgba(197,168,128,0.2)] hover:border-[#c5a880]/40'; // classic
  };

  const getButtonGlow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_0_12px_rgba(223,186,115,0.5)]';
    if (goldStyle === 'bright') return 'hover:shadow-[0_0_12px_rgba(255,215,0,0.6)]';
    return 'hover:shadow-[0_0_12px_rgba(197,168,128,0.5)]'; // classic
  };

  const handleWishlistToggle = (prod: NewArrivalProduct) => {
    if (wishlistIds.includes(prod.id)) {
      onRemoveFromWishlist(prod.id);
    } else {
      onAddToWishlist({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
      });
    }
  };

  const handleAddToCartClick = (prod: NewArrivalProduct) => {
    onAddToCart({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
    });
    setAddedNotifyId(prod.id);
    setTimeout(() => setAddedNotifyId(null), 2000);
  };

  return (
    <section
      id="new-arrivals-section"
      className="py-24 px-6 md:px-12 bg-[#050505] text-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative grids */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900/60 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header containing title and navigation buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
              <span className={`font-serif text-[10px] tracking-[0.4em] uppercase ${getGoldColor()}`}>
                Fresh Releases
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-widest text-white uppercase leading-tight">
              New <span className={getGoldColor()}>Arrivals</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
              Introducing the season's newest architectural garments. Sculpted silhouettes engineered with fluid drapes and premium organic stitching.
            </p>
          </div>

          {/* Navigation Arrows for desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="prev-new-arrivals"
              onClick={handlePrev}
              className="p-3 rounded-full border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300 text-neutral-400 hover:text-white"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="next-new-arrivals"
              onClick={handleNext}
              className="p-3 rounded-full border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300 text-neutral-400 hover:text-white"
              aria-label="Next items"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slider Container */}
        <div
          id="new-arrivals-carousel-viewport"
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider Inner Track */}
          <motion.div
            id="new-arrivals-track"
            className="flex"
            animate={{
              transform: `translateX(-${(currentIndex * (100 / visibleItemsCount))}%)`,
            }}
            transition={{ type: 'spring', damping: 28, stiffness: 180 }}
          >
            {NEW_ARRIVALS_PRODUCTS.map((prod) => {
              const isWishlisted = wishlistIds.includes(prod.id);
              return (
                <div
                  id={`arrival-card-${prod.id}`}
                  key={prod.id}
                  className="px-3 shrink-0"
                  style={{ width: `${100 / visibleItemsCount}%` }}
                >
                  <div className={`group relative flex flex-col justify-between h-full bg-neutral-950/25 border border-neutral-900/60 rounded-2xl overflow-hidden p-3 transition-all duration-500 ease-out hover:-translate-y-2 ${getGoldGlow()}`}>
                    
                    {/* Image Box */}
                    <div 
                      onClick={() => onProductClick?.(prod)}
                      className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900 mb-4 group/img cursor-pointer"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Luxury overlay */}
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/40 transition-colors duration-500" />

                      {/* Badges and actions */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                        {/* Elegant "NEW" Badge */}
                        <div className={`flex items-center gap-1 px-2.5 py-1 bg-black/90 backdrop-blur-md border border-[#c5a880]/30 rounded-sm shadow-md`}>
                          <Sparkles className={`w-2.5 h-2.5 animate-pulse ${getGoldColor()}`} />
                          <span className={`font-sans text-[7px] md:text-[8px] tracking-[0.25em] font-semibold uppercase ${getGoldColor()}`}>
                            NEW
                          </span>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          id={`arrival-wishlist-toggle-${prod.id}`}
                          onClick={() => handleWishlistToggle(prod)}
                          className="p-2 rounded-full backdrop-blur-md border border-neutral-800/80 bg-black/50 hover:bg-black text-white hover:scale-110 active:scale-90 transition-all duration-300"
                          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 transition-colors duration-300 ${
                              isWishlisted ? `fill-current ${getGoldColor()}` : 'text-neutral-400 hover:text-white'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Add to Cart Overlay slide-in */}
                      <div className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
                        <button
                          id={`arrival-add-to-cart-${prod.id}`}
                          onClick={() => handleAddToCartClick(prod)}
                          className={`w-full py-3 rounded-lg text-[10px] font-sans font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${getGoldBg()} ${getButtonGlow()}`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          {addedNotifyId === prod.id ? 'Added to Bag' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 px-1">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-2.5 h-2.5 ${
                                i < Math.floor(prod.rating)
                                  ? 'fill-current text-amber-500'
                                  : 'text-neutral-700'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-sans text-[8px] text-neutral-500">
                          (New Release)
                        </span>
                      </div>

                      {/* Title & Price */}
                      <div className="flex justify-between items-start gap-2">
                        <h3 
                          onClick={() => onProductClick?.(prod)}
                          className="font-serif text-sm tracking-wide text-neutral-200 group-hover:text-white transition-colors line-clamp-1 cursor-pointer hover:underline"
                        >
                          {prod.name}
                        </h3>
                        <div className="flex flex-col items-end shrink-0">
                          {prod.originalPrice && (
                            <span className="font-sans text-[9px] text-neutral-500 line-through">
                              ${prod.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className={`font-sans text-xs font-semibold ${getGoldColor()}`}>
                            ${prod.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Dynamic Pagination dots / indicators for tablet/mobile */}
        <div className="flex justify-center items-center gap-2 pt-4">
          {[...Array(maxIndex + 1)].map((_, idx) => (
            <button
              id={`arrival-dot-${idx}`}
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentIndex === idx
                  ? `w-8 ${getGoldBg()}`
                  : 'w-2 bg-neutral-800 hover:bg-neutral-700'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
