import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  X,
  Eye,
  Star,
  ArrowRight
} from 'lucide-react';
import { WishlistItem, GoldStyle } from '../types';
import { SHOP_PRODUCTS } from './ShopPage';

interface WishlistPageProps {
  goldStyle: GoldStyle;
  wishlistItems: WishlistItem[];
  onRemoveFromWishlist: (id: string) => void;
  onMoveToCart: (item: WishlistItem) => void;
  onBackToShop: () => void;
  onProductClick?: (product: any) => void;
  onClearWishlist?: () => void;
}

export default function WishlistPage({
  goldStyle,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart,
  onBackToShop,
  onProductClick,
  onClearWishlist
}: WishlistPageProps) {
  // Local state for interactive size/color picker before moving to bag
  const [selectedItemForSize, setSelectedItemForSize] = useState<WishlistItem | null>(null);
  const [chosenSize, setChosenSize] = useState<string>('M');
  const [chosenColor, setChosenColor] = useState<string>('Noir');

  const getGoldColor = () => {
    if (goldStyle === 'champagne') return 'text-[#dfba73]';
    if (goldStyle === 'bright') return 'text-[#ffd700]';
    return 'text-[#c5a880]'; // classic
  };

  const getGoldBg = () => {
    if (goldStyle === 'champagne') return 'bg-[#dfba73]';
    if (goldStyle === 'bright') return 'bg-[#ffd700]';
    return 'bg-[#c5a880]'; // classic
  };

  const getGoldBorder = () => {
    if (goldStyle === 'champagne') return 'border-[#dfba73]/30 focus:border-[#dfba73]';
    if (goldStyle === 'bright') return 'border-[#ffd700]/30 focus:border-[#ffd700]';
    return 'border-[#c5a880]/30 focus:border-[#c5a880]'; // classic
  };

  const getGoldBtnClass = () => {
    if (goldStyle === 'champagne') return 'bg-[#dfba73] text-black hover:bg-[#e4ca93]';
    if (goldStyle === 'bright') return 'bg-[#ffd700] text-black hover:bg-[#ffe14d]';
    return 'bg-[#c5a880] text-black hover:bg-[#d6be9a]'; // classic
  };

  const getGoldHoverColor = () => {
    if (goldStyle === 'champagne') return 'hover:text-[#dfba73]';
    if (goldStyle === 'bright') return 'hover:text-[#ffd700]';
    return 'hover:text-[#c5a880]';
  };

  const getGoldBorderClass = () => {
    if (goldStyle === 'champagne') return 'border-[#dfba73] hover:bg-[#dfba73]/10';
    if (goldStyle === 'bright') return 'border-[#ffd700] hover:bg-[#ffd700]/10';
    return 'border-[#c5a880] hover:bg-[#c5a880]/10';
  };

  // Helper to get category and extra details of a product
  const getProductDetails = (item: WishlistItem) => {
    const matched = SHOP_PRODUCTS.find((p) => p.id === item.id || p.name === item.name);
    return {
      category: matched?.category || 'Ready-to-Wear',
      sizes: matched?.sizes || ['XS', 'S', 'M', 'L', 'XL'],
      colors: matched?.colors || ['Noir', 'Champagne', 'Bespoke White'],
      description: matched?.description || 'Exquisite luxury handmade couture piece designed for the discerning individual.',
      badge: matched?.badge || null,
      rating: matched?.rating || 5,
      reviews: matched?.reviews || 24
    };
  };

  const handleOpenQuickMove = (item: WishlistItem) => {
    const details = getProductDetails(item);
    setSelectedItemForSize(item);
    setChosenSize(details.sizes[0] || 'M');
    setChosenColor(details.colors[0] || 'Noir');
  };

  const handleConfirmMoveToCart = () => {
    if (!selectedItemForSize) return;

    // Use customized sizes if moving to cart
    onMoveToCart({
      ...selectedItemForSize,
      size: chosenSize,
      color: chosenColor,
    } as any);

    setSelectedItemForSize(null);
  };

  return (
    <div id="dedicated-wishlist-page" className="relative w-full py-16 px-4 md:px-8 max-w-7xl mx-auto min-h-[70vh] text-white">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900 pb-6 mb-10 gap-4">
        <div>
          <span className={`text-[10px] tracking-[0.3em] uppercase ${getGoldColor()} block mb-2 font-semibold`}>
            Your Coveted Selection
          </span>
          <h1 className="font-serif text-3xl md:text-4xl tracking-wide font-medium flex items-center gap-3">
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="text-sm bg-neutral-900 border border-neutral-800 text-neutral-400 px-3 py-1 rounded-full font-sans font-normal">
                {wishlistItems.length} Piece{wishlistItems.length > 1 ? 's' : ''}
              </span>
            )}
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          {wishlistItems.length > 0 && onClearWishlist && (
            <button
              id="clear-wishlist-all"
              onClick={onClearWishlist}
              className="text-xs font-sans tracking-widest uppercase text-neutral-500 hover:text-red-400 transition-all duration-300"
            >
              Clear All Items
            </button>
          )}

          <button
            id="wishlist-continue-shopping-top"
            onClick={onBackToShop}
            className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-neutral-400 hover:text-white transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Continue Shopping
          </button>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        /* Empty Wishlist State */
        <motion.div 
          id="wishlist-empty-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-neutral-950/50 filter blur-xl scale-125" />
            <div className="relative p-6 rounded-full border border-neutral-900 bg-neutral-950/40">
              <Heart className="w-16 h-16 text-neutral-700" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className={`absolute -top-1 -right-1 p-1.5 rounded-full border border-neutral-800 bg-black ${getGoldColor()}`}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>

          <h3 className="font-serif text-xl tracking-wide font-medium text-neutral-200 mb-3">
            Your Wishlist is Empty
          </h3>
          <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed mb-8">
            Keep track of the garments and hand-cut luxury outerwear you desire most. Save your boutique favorites here to easily buy or share later.
          </p>

          <button
            id="wishlist-start-shopping"
            onClick={onBackToShop}
            className={`px-10 py-4 text-xs font-sans font-bold tracking-[0.25em] uppercase rounded-sm transition-all duration-300 shadow-md ${getGoldBtnClass()}`}
          >
            Continue Shopping
          </button>
        </motion.div>
      ) : (
        /* Wishlist Items Responsive Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {wishlistItems.map((item) => {
              const details = getProductDetails(item);
              return (
                <motion.div
                  id={`wishlist-page-card-${item.id}`}
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col justify-between bg-neutral-950/25 border border-neutral-900/60 rounded-xl overflow-hidden p-3.5 transition-all duration-500 hover:-translate-y-1.5 hover:border-neutral-800/80 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Image and Interactive Overlays */}
                  <div 
                    onClick={() => onProductClick?.(SHOP_PRODUCTS.find(p => p.id === item.id) || item)}
                    className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-900 mb-4 group/img cursor-pointer"
                  >
                    {/* Badge */}
                    {details.badge && (
                      <span className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-md border border-neutral-800 text-[9px] tracking-[0.2em] px-2.5 py-1 text-white uppercase font-sans font-semibold rounded-sm">
                        {details.badge}
                      </span>
                    )}

                    {/* Delete Shortcut from Grid */}
                    <button
                      id={`wishlist-page-remove-${item.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWishlist(item.id);
                      }}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 backdrop-blur-md border border-neutral-800/60 text-neutral-400 hover:text-red-400 transition-colors duration-300"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Hover Quick View Panel overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                      <p className="text-[11px] font-sans text-neutral-300 font-light line-clamp-3 mb-4 leading-relaxed">
                        {details.description}
                      </p>

                      <button
                        id={`wishlist-page-quickview-${item.id}`}
                        onClick={() => onProductClick?.(SHOP_PRODUCTS.find(p => p.id === item.id) || item)}
                        className="w-full py-2 bg-neutral-900/80 hover:bg-neutral-800 text-white text-[10px] tracking-widest font-sans uppercase rounded border border-neutral-800 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Full Details
                      </button>
                    </div>
                  </div>

                  {/* Details section */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Rating */}
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-[9px] tracking-[0.25em] uppercase font-bold ${getGoldColor()}`}>
                          {details.category}
                        </span>
                        
                        <span className="flex items-center gap-1 text-[10px] text-neutral-500 font-sans">
                          <Star className="w-3 h-3 text-amber-500 fill-current" />
                          {details.rating}.0
                        </span>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => onProductClick?.(SHOP_PRODUCTS.find(p => p.id === item.id) || item)}
                        className="font-serif text-base tracking-wide text-neutral-200 group-hover:text-white transition-colors cursor-pointer hover:underline line-clamp-1"
                      >
                        {item.name}
                      </h3>

                      {/* Stock Status & Price */}
                      <div className="flex justify-between items-center mt-2.5 mb-4">
                        <span className={`text-[10px] tracking-widest uppercase flex items-center gap-1.5 font-sans font-medium ${
                          item.inStock ? 'text-emerald-500' : 'text-neutral-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.inStock ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
                          {item.inStock ? 'In Stock' : 'Bespoke Only'}
                        </span>

                        <span className="font-mono text-sm font-semibold text-neutral-300">
                          ${item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Move to Bag Button */}
                    <div className="space-y-2 pt-2 border-t border-neutral-900/50">
                      <button
                        id={`wishlist-page-movetobag-${item.id}`}
                        onClick={() => handleOpenQuickMove(item)}
                        className={`w-full py-3 text-[10px] font-sans font-bold tracking-[0.2em] uppercase rounded border transition-all duration-300 flex items-center justify-center gap-2 ${getGoldBorderClass()}`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Move to Bag
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Quick Move Size & Color Selector Drawer Modal */}
      <AnimatePresence>
        {selectedItemForSize && (
          <>
            {/* Backdrop */}
            <motion.div
              id="wishlist-size-picker-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItemForSize(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />

            {/* Selector Card Modal */}
            <motion.div
              id="wishlist-size-picker-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-[15%] left-[5%] right-[5%] md:left-[50%] md:translate-x-[-50%] md:translate-y-0 z-50 w-[90%] md:w-full md:max-w-md bg-[#0d0d0d] border border-neutral-900 text-white rounded-md p-5 sm:p-6 shadow-2xl space-y-6"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-16 h-20 rounded bg-neutral-900 overflow-hidden shrink-0 border border-neutral-900">
                    <img 
                      src={selectedItemForSize.image} 
                      alt={selectedItemForSize.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className={`text-[9px] tracking-[0.2em] uppercase font-bold ${getGoldColor()} block mb-1`}>
                      Choose Preferences
                    </span>
                    <h4 className="font-serif text-base tracking-wide font-medium">
                      {selectedItemForSize.name}
                    </h4>
                    <p className="font-mono text-xs text-neutral-400 mt-1">
                      ${selectedItemForSize.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  id="close-quick-picker-btn"
                  onClick={() => setSelectedItemForSize(null)}
                  className="p-1 rounded hover:bg-neutral-900 transition-colors text-neutral-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Selector content */}
              <div className="space-y-4 font-sans text-xs">
                {/* Size Choice */}
                <div className="space-y-2">
                  <span className="text-[10px] tracking-wider text-neutral-400 uppercase">Select Size</span>
                  <div className="flex flex-wrap gap-2">
                    {getProductDetails(selectedItemForSize).sizes.map((size) => (
                      <button
                        id={`wishlist-picker-size-${size}`}
                        key={size}
                        onClick={() => setChosenSize(size)}
                        className={`min-w-[40px] px-3 py-2 text-center rounded text-xs border transition-all duration-300 ${
                          chosenSize === size
                            ? `${getGoldBg()} text-black border-transparent font-semibold`
                            : 'border-neutral-900 bg-neutral-950/40 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Choice */}
                <div className="space-y-2">
                  <span className="text-[10px] tracking-wider text-neutral-400 uppercase">Select Color</span>
                  <div className="flex flex-wrap gap-2">
                    {getProductDetails(selectedItemForSize).colors.map((color) => (
                      <button
                        id={`wishlist-picker-color-${color}`}
                        key={color}
                        onClick={() => setChosenColor(color)}
                        className={`px-3 py-2 text-center rounded text-xs border transition-all duration-300 ${
                          chosenColor === color
                            ? `${getGoldBg()} text-black border-transparent font-semibold`
                            : 'border-neutral-900 bg-neutral-950/40 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Confirm Action Button */}
              <button
                id="wishlist-confirm-move-btn"
                onClick={handleConfirmMoveToCart}
                className={`w-full py-3 text-xs font-sans font-bold tracking-[0.25em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${getGoldBtnClass()}`}
              >
                <ShoppingBag className="w-4 h-4" />
                Add & Remove from Wishlist
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
