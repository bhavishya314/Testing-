import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Heart, Trash2 } from 'lucide-react';
import { WishlistItem, GoldStyle } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: WishlistItem[];
  onRemoveFromWishlist: (id: string) => void;
  onMoveToCart: (item: WishlistItem) => void;
  goldStyle: GoldStyle;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart,
  goldStyle,
}: WishlistDrawerProps) {
  
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
    if (goldStyle === 'champagne') return 'border-[#dfba73] hover:bg-[#dfba73]/10';
    if (goldStyle === 'bright') return 'border-[#ffd700] hover:bg-[#ffd700]/10';
    return 'border-[#c5a880] hover:bg-[#c5a880]/10'; // classic
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            id="wishlist-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            id="wishlist-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0e0e0e] text-white border-l border-neutral-900 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-900">
              <div className="flex items-center gap-2">
                <Heart className={`w-5 h-5 fill-current ${getGoldColor()}`} />
                <h3 className="font-serif text-lg tracking-wider font-medium">My Wishlist</h3>
                <span className="bg-neutral-900 text-[10px] tracking-normal font-sans text-neutral-400 px-2 py-0.5 rounded-full font-semibold">
                  {wishlistItems.length}
                </span>
              </div>
              <button
                id="close-wishlist-btn"
                onClick={onClose}
                className="p-2 rounded-full border border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
              {wishlistItems.length > 0 ? (
                wishlistItems.map((item) => (
                  <motion.div
                    id={`wishlist-item-${item.id}`}
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4 p-3 rounded-lg border border-neutral-900 bg-neutral-950/40 relative group hover:border-neutral-800 transition-all duration-300"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 overflow-hidden rounded bg-neutral-900 shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-sm tracking-wide text-neutral-200 font-medium">
                            {item.name}
                          </h4>
                          <button
                            id={`wishlist-delete-${item.id}`}
                            onClick={() => onRemoveFromWishlist(item.id)}
                            className="text-neutral-500 hover:text-red-400 p-1 rounded hover:bg-neutral-900 transition-all duration-300 shrink-0"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className={`font-sans text-xs font-semibold mt-1 ${getGoldColor()}`}>
                          ${item.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] tracking-widest uppercase ${item.inStock ? 'text-emerald-500' : 'text-neutral-500'}`}>
                          {item.inStock ? 'In Stock' : 'Bespoke Order'}
                        </span>
                        <button
                          id={`wishlist-movetobag-${item.id}`}
                          onClick={() => onMoveToCart(item)}
                          className={`flex items-center gap-1 px-3 py-1.5 text-[9px] font-sans font-semibold tracking-widest uppercase border rounded transition-all duration-300 ${getGoldBorder()}`}
                        >
                          <ShoppingBag className="w-2.5 h-2.5" />
                          Move to Bag
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                  <div className="p-4 rounded-full bg-neutral-950 border border-neutral-900">
                    <Heart className="w-8 h-8 text-neutral-600" />
                  </div>
                  <div>
                    <h5 className="font-serif text-sm tracking-widest text-neutral-400 uppercase font-medium">
                      Your Boutique Wishlist is Empty
                    </h5>
                    <p className="font-sans text-xs text-neutral-500 max-w-xs mt-2 leading-relaxed">
                      Save items from our couture galleries to keep track of your coveted luxury pieces.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-neutral-900 bg-neutral-950/80 space-y-4">
              <p className="text-[10px] text-neutral-400 font-sans text-center leading-relaxed">
                Wishlist items are held for 30 days. Stock status is live from our Paris & Milan salons.
              </p>
              <button
                id="wishlist-close-panel-btn"
                onClick={onClose}
                className="w-full py-3 bg-white text-black font-sans font-semibold text-[11px] tracking-[0.2em] uppercase rounded-sm hover:bg-neutral-200 active:scale-98 transition-all duration-300"
              >
                Continue Exploring
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
