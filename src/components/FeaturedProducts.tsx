import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Eye, Star, X, Sparkles, Check, ChevronRight } from 'lucide-react';
import { GoldStyle } from '../types';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: 'NEW' | 'BEST SELLER' | 'LIMITED';
  image: string;
  rating: number;
  reviews: number;
  description: string;
  details: string[];
  sizes: string[];
}

interface FeaturedProductsProps {
  goldStyle: GoldStyle;
  wishlistIds: string[];
  onAddToCart: (item: { id: string; name: string; price: number; image: string }) => void;
  onAddToWishlist: (item: { id: string; name: string; price: number; image: string }) => void;
  onRemoveFromWishlist: (id: string) => void;
  onProductClick?: (product: any) => void;
}

const PRODUCTS: Product[] = [
  {
    id: 'item-1',
    name: 'Maison Silk Slip Dress',
    category: 'Dresses',
    price: 890,
    originalPrice: 1150,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviews: 24,
    description: 'Cut from fluid Mulberry silk-satin, this bias-cut slip dress elegantly drapes the form. Completed with a sophisticated cowl neckline and adjustable crossover shoulder straps.',
    details: ['100% Organic Mulberry Silk', 'Bias-cut for a fluid silhouette', 'Cowl neckline', 'Dry clean only', 'Made in Italy'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'item-2',
    name: 'Sovereign Cashmere Overcoat',
    category: 'Outerwear',
    price: 2450,
    badge: 'LIMITED',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    reviews: 18,
    description: 'An unstructured double-breasted overcoat tailored from exceptional, heavyweight Italian double-faced cashmere. Features a hand-stitched finish and wide peak lapels.',
    details: ['100% Grade-A Mongolian Cashmere', 'Double-faced fabric construction', 'Hand-sewn edges', 'Relaxed tailored drape', 'Made in Italy'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'item-3',
    name: 'Monarch Linen Tailored Blazer',
    category: 'Suits & Blazers',
    price: 1250,
    originalPrice: 1550,
    badge: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviews: 31,
    description: 'Constructed from high-density Irish linen, this structured blazer brings summer sophistication to formalwear. Features padded shoulders, a tailored waist, and custom brass buttons.',
    details: ['100% Certified Irish Linen', 'Fully lined in premium cupro', 'Structured padded shoulders', 'Custom hand-finished brass buttons', 'Made in Portugal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'item-4',
    name: 'Signature Calfskin Chelsea Boots',
    category: 'Footwear',
    price: 950,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviews: 14,
    description: 'Expertly crafted in Florence from full-grain calfskin leather. Features hand-painted patina accents, robust elasticated side panels, and durable Goodyear-welted leather soles.',
    details: ['Full-grain Italian calfskin leather', 'Goodyear-welted leather sole', 'Hand-burnished toe box', 'Elasticated side gores', 'Made in Italy'],
    sizes: ['38', '39', '40', '41', '42', '43']
  },
  {
    id: 'item-5',
    name: '18K Aurelia Initial Signet Ring',
    category: 'Jewelry',
    price: 1800,
    badge: 'LIMITED',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    reviews: 9,
    description: 'Cast from solid 18-karat yellow gold, this classical signet ring is hand-engraved with the iconic Aurelia monogram. Polished to a brilliant finish by our master goldsmiths.',
    details: ['Solid 18K Yellow Gold', 'Average weight: 14.5 grams', 'Hand-engraved monogram detail', 'Sustainably sourced metals', 'Made in France'],
    sizes: ['6', '7', '8', '9']
  },
  {
    id: 'item-6',
    name: 'Classic Gold Leaf Silk Scarf',
    category: 'Accessories',
    price: 380,
    originalPrice: 480,
    badge: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviews: 42,
    description: 'A luxurious silk twill scarf printed with hand-illustrated baroque elements in gold leaf pigments. Hand-rolled and stitched hems complete this iconic Maison wardrobe staple.',
    details: ['100% Premium Silk Twill', 'Stunning hand-rolled hems', 'Baroque-inspired gold leaf print', 'Dimensions: 90cm x 90cm', 'Made in France'],
    sizes: ['One Size']
  },
  {
    id: 'item-7',
    name: 'Empress Velvet Corset Gown',
    category: 'Dresses',
    price: 3100,
    originalPrice: 3800,
    badge: 'LIMITED',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    reviews: 8,
    description: 'Crafted from rich silk-velvet with an exceptional pile. Features an internal structured corset bodice, a beautifully draped thigh-high split, and a delicate trailing hemline.',
    details: ['82% Rayon, 18% Silk velvet', 'Internal boned corset structure', 'Concealed rear zip closure', 'Thigh-high side slit', 'Made in France'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'item-8',
    name: 'Aurelia Monogram Leather Tote',
    category: 'Bags',
    price: 1650,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviews: 19,
    description: 'A structured everyday tote crafted from textured monogram saffiano leather. Features hand-painted edges, solid brass hardware, and a fully lined alcantara interior.',
    details: ['Saffiano textured calf leather', 'Embossed Maison monogram pattern', 'Golden brass hardware', 'Alcantara-lined interior pocket', 'Made in Italy'],
    sizes: ['Medium', 'Large']
  }
];

export default function FeaturedProducts({
  goldStyle,
  wishlistIds,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onProductClick,
}: FeaturedProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addedItemNotify, setAddedItemNotify] = useState<string | null>(null);

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

  const getGoldBadgeBg = () => {
    if (goldStyle === 'champagne') return 'bg-[#dfba73]/10 border-[#dfba73]/20';
    if (goldStyle === 'bright') return 'bg-[#ffd700]/10 border-[#ffd700]/20';
    return 'bg-[#c5a880]/10 border-[#c5a880]/20'; // classic
  };

  const getBadgeStyles = (badge?: 'NEW' | 'BEST SELLER' | 'LIMITED') => {
    if (!badge) return { className: '', style: {} };
    const isChampagne = goldStyle === 'champagne';
    const isBright = goldStyle === 'bright';
    const goldColor = isChampagne ? '#dfba73' : isBright ? '#ffd700' : '#c5a880';
    
    if (badge === 'NEW') {
      return {
        style: { borderColor: `${goldColor}40`, color: goldColor },
        className: 'bg-black/90 backdrop-blur-md font-sans text-[7px] md:text-[8px] tracking-[0.25em] font-semibold border uppercase px-2 py-0.5 rounded-sm shadow-sm'
      };
    }
    if (badge === 'LIMITED') {
      return {
        style: { borderColor: 'rgba(255,255,255,0.15)', color: '#ffffff' },
        className: 'bg-black/95 backdrop-blur-md font-sans text-[7px] md:text-[8px] tracking-[0.25em] font-light border uppercase px-2 py-0.5 rounded-sm shadow-sm'
      };
    }
    // BEST SELLER
    return {
      style: { backgroundColor: goldColor, color: '#000000' },
      className: 'font-sans text-[7px] md:text-[8px] tracking-[0.25em] font-bold uppercase px-2 py-0.5 rounded-sm shadow-md'
    };
  };

  const getCardHoverShadow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_20px_50px_rgba(223,186,115,0.14)] hover:border-[#dfba73]/30';
    if (goldStyle === 'bright') return 'hover:shadow-[0_20px_50px_rgba(255,215,0,0.18)] hover:border-[#ffd700]/30';
    return 'hover:shadow-[0_20px_50px_rgba(197,168,128,0.14)] hover:border-[#c5a880]/30'; // classic
  };

  const getButtonGlow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_0_15px_rgba(223,186,115,0.55)] hover:border-[#dfba73]';
    if (goldStyle === 'bright') return 'hover:shadow-[0_0_15px_rgba(255,215,0,0.7)] hover:border-[#ffd700]';
    return 'hover:shadow-[0_0_15px_rgba(197,168,128,0.55)] hover:border-[#c5a880]'; // classic
  };

  const getQuickViewGlow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_0_12px_rgba(223,186,115,0.35)] hover:border-[#dfba73]/50';
    if (goldStyle === 'bright') return 'hover:shadow-[0_0_12px_rgba(255,215,0,0.5)] hover:border-[#ffd700]/50';
    return 'hover:shadow-[0_0_12px_rgba(197,168,128,0.35)] hover:border-[#c5a880]/50'; // classic
  };

  const handleWishlistToggle = (prod: Product) => {
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

  const openQuickView = (prod: Product) => {
    setSelectedProduct(prod);
    setSelectedSize(prod.sizes[0]);
  };

  const handleQuickAdd = (prod: Product) => {
    onAddToCart({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
    });
    setAddedItemNotify(prod.id);
    setTimeout(() => setAddedItemNotify(null), 2000);
  };

  return (
    <section id="featured-products-section" className="py-24 px-6 md:px-12 bg-[#050505] text-white relative">
      {/* Background architectural details */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900 to-transparent" />
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className={`w-6 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
            <span className={`font-serif text-[10px] tracking-[0.4em] uppercase ${getGoldColor()}`}>
              Curated Collections
            </span>
            <span className={`w-6 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-widest text-white uppercase">
            Featured <span className={getGoldColor()}>Couture</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-lg mx-auto">
            Explore the latest Ready-To-Wear arrivals and high-end accessories tailored in our Parisian atelier. Finished with hand-painted trims and solid gold details.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {PRODUCTS.map((prod, index) => {
            const isWishlisted = wishlistIds.includes(prod.id);
            return (
              <motion.div
                id={`product-card-${prod.id}`}
                key={prod.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col justify-between bg-neutral-950/25 border border-neutral-900/60 rounded-lg overflow-hidden transition-all duration-500 ease-out p-3 hover:-translate-y-2 ${getCardHoverShadow()}`}
              >
                {/* Image Container with Hover Actions */}
                <div 
                  onClick={() => onProductClick?.(prod)}
                  className="relative aspect-[3/4] overflow-hidden rounded bg-neutral-900 mb-4 group/img cursor-pointer"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Luxury Darkening Overlay */}
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/45 transition-colors duration-500" />

                  {/* Top Tags & Wishlist Button */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                    <div className="flex flex-col gap-1.5 items-start">
                      <span className="bg-black/75 backdrop-blur-md border border-neutral-800/60 text-[7px] md:text-[8px] font-sans tracking-[0.15em] uppercase font-semibold text-neutral-300 px-2 py-0.5 rounded-sm shadow-sm">
                        {prod.category}
                      </span>
                      {prod.badge && (() => {
                        const bStyle = getBadgeStyles(prod.badge);
                        return (
                          <span
                            className={`${bStyle.className}`}
                            style={bStyle.style}
                          >
                            {prod.badge}
                          </span>
                        );
                      })()}
                    </div>
                    <button
                      id={`wishlist-toggle-${prod.id}`}
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

                  {/* Animated Hover Buttons - slide in from bottom */}
                  <div className="absolute inset-x-3 bottom-3 flex flex-col gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
                    {/* Quick View Button */}
                    <button
                      id={`quick-view-btn-${prod.id}`}
                      onClick={() => openQuickView(prod)}
                      className={`w-full py-2.5 bg-black/80 hover:bg-black border border-neutral-850 backdrop-blur-md rounded-sm text-[10px] font-sans font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${getQuickViewGlow()}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Quick View
                    </button>
                    
                    {/* Add To Cart Button */}
                    <button
                      id={`add-to-cart-btn-${prod.id}`}
                      onClick={() => handleQuickAdd(prod)}
                      className={`w-full py-2.5 rounded-sm text-[10px] font-sans font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${getGoldBg()} ${getButtonGlow()}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {addedItemNotify === prod.id ? 'Added to Bag' : 'Add to Cart'}
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="space-y-2 px-1">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(prod.rating)
                              ? 'fill-current text-amber-500'
                              : 'text-neutral-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-sans text-[9px] text-neutral-500">
                      ({prod.reviews})
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
                        <span className="font-sans text-[10px] text-neutral-500 line-through">
                          ${prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className={`font-sans text-xs font-semibold ${getGoldColor()}`}>
                        ${prod.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* QUICK VIEW ACCORDION MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              id="quickview-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              id="quickview-modal"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-x-4 bottom-4 top-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:h-auto max-h-[90vh] z-50 bg-[#0e0e0e] border border-neutral-900 rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden text-white"
            >
              {/* Close button */}
              <button
                id="close-quickview-btn"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-neutral-900 bg-neutral-950/80 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-300 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Side: Product Image Showcase */}
              <div className="w-full md:w-1/2 h-[300px] md:h-[550px] bg-neutral-950 relative shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0e0e0e]/20" />
              </div>

              {/* Right Side: Product Customization & Specs */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-sans text-[10px] tracking-[0.25em] text-neutral-500 uppercase font-semibold">
                      {selectedProduct.category}
                    </span>
                    {selectedProduct.badge && (() => {
                      const bStyle = getBadgeStyles(selectedProduct.badge);
                      return (
                        <span
                          className={`${bStyle.className} text-[7px] py-0.5 px-1.5`}
                          style={bStyle.style}
                        >
                          {selectedProduct.badge}
                        </span>
                      );
                    })()}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl tracking-wide text-white font-normal mt-2 mt-1">
                    {selectedProduct.name}
                  </h3>
                  
                  {/* Price & Rating */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-baseline gap-2">
                      {selectedProduct.originalPrice && (
                        <span className="font-sans text-sm text-neutral-500 line-through">
                          ${selectedProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className={`font-sans text-xl font-semibold ${getGoldColor()}`}>
                        ${selectedProduct.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-[1px] h-4 bg-neutral-800" />
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="font-sans text-xs text-neutral-200">
                        {selectedProduct.rating} / 5.0
                      </span>
                      <span className="font-sans text-xs text-neutral-500">
                        ({selectedProduct.reviews} collector reviews)
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-neutral-400 text-xs md:text-sm font-light leading-relaxed mt-4">
                    {selectedProduct.description}
                  </p>

                  {/* Size Selector */}
                  {selectedProduct.sizes.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between items-center text-[10px] tracking-widest text-neutral-400 uppercase font-bold">
                        <span>Select Size</span>
                        <span className={`underline font-light cursor-pointer ${getGoldColor()}`}>Size Guide</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((sz) => (
                          <button
                            id={`quickview-size-${sz}`}
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`px-4 py-2 border text-xs font-sans font-semibold tracking-wider transition-all duration-300 rounded ${
                              selectedSize === sz
                                ? `${getGoldBg()} border-transparent`
                                : 'border-neutral-900 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Product Highlights Accordion style */}
                  <div className="mt-6 pt-6 border-t border-neutral-900 space-y-2">
                    <h5 className="font-sans text-[10px] tracking-widest text-neutral-400 uppercase font-bold">
                      Atelier Crafting Details
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs font-sans font-light text-neutral-400">
                      {selectedProduct.details.map((detail, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className={`w-3 h-3 ${getGoldColor()}`} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Action Panel */}
                <div className="pt-6 border-t border-neutral-900 space-y-4">
                  <div className="flex gap-4">
                    <button
                      id="quickview-add-bag"
                      onClick={() => {
                        onAddToCart({
                          id: selectedProduct.id,
                          name: selectedProduct.name,
                          price: selectedProduct.price,
                          image: selectedProduct.image,
                        });
                        setSelectedProduct(null);
                      }}
                      className={`flex-1 py-3.5 rounded-sm font-sans font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${getGoldBg()} ${getButtonGlow()}`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Shopping Bag
                    </button>
                    
                    <button
                      id="quickview-wishlist"
                      onClick={() => {
                        handleWishlistToggle(selectedProduct);
                      }}
                      className="px-4 py-3 border border-neutral-900 bg-neutral-950 hover:border-neutral-700 rounded-sm flex items-center justify-center transition-all duration-300 cursor-pointer"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlistIds.includes(selectedProduct.id)
                            ? `fill-current ${getGoldColor()}`
                            : 'text-neutral-400'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[9px] text-neutral-600 font-sans text-center leading-normal">
                    Complementary couture packaging & priority DHL shipment included with this purchase.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
