import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, Gift, Truck } from 'lucide-react';
import { CartItem, GoldStyle } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveFromCart: (id: string) => void;
  goldStyle: GoldStyle;
}

const SHIPPING_THRESHOLD = 1500; // Free luxury express shipping above $1500

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  goldStyle,
}: CartDrawerProps) {
  const [giftWrap, setGiftWrap] = useState(false);

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

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const giftWrapCost = giftWrap ? 25 : 0;
  const total = subtotal + giftWrapCost;

  // Shipping progress calculation
  const shippingProgress = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);
  const amountLeftForFreeShipping = SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0e0e0e] text-white border-l border-neutral-900 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-900">
              <div className="flex items-center gap-2">
                <ShoppingBag className={`w-5 h-5 ${getGoldColor()}`} />
                <h3 className="font-serif text-lg tracking-wider font-medium">Shopping Bag</h3>
                <span className="bg-neutral-900 text-[10px] tracking-normal font-sans text-neutral-400 px-2 py-0.5 rounded-full font-semibold">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                id="close-cart-btn"
                onClick={onClose}
                className="p-2 rounded-full border border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Luxury Delivery Progress Tracker */}
            {subtotal > 0 && (
              <div className="px-6 py-4 bg-neutral-950/80 border-b border-neutral-900 space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="flex items-center gap-1.5 text-neutral-300 font-light">
                    <Truck className={`w-3.5 h-3.5 ${getGoldColor()}`} />
                    {shippingProgress >= 100
                      ? 'Complimentary Express Delivery Activated'
                      : 'Exclusive Express Courier Shipping'}
                  </span>
                  <span className={`font-semibold ${getGoldColor()}`}>
                    {shippingProgress >= 100 ? 'Complimentary' : `$${amountLeftForFreeShipping.toLocaleString()} away`}
                  </span>
                </div>
                <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${getGoldBg()}`}
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div
                    id={`cart-item-${item.id}`}
                    key={`${item.id}-${item.size}`}
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
                            id={`cart-delete-${item.id}-${item.size}`}
                            onClick={() => onRemoveFromCart(item.id)}
                            className="text-neutral-500 hover:text-red-400 p-1 rounded hover:bg-neutral-900 transition-all duration-300 shrink-0"
                            title="Remove from bag"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] tracking-wide text-neutral-400 font-sans mt-0.5">
                          <span>Size: <strong className="text-white font-medium">{item.size}</strong></span>
                        </div>
                        <p className={`font-sans text-xs font-semibold mt-1.5 ${getGoldColor()}`}>
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded bg-neutral-950 border border-neutral-900 p-0.5">
                          <button
                            id={`cart-qty-dec-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-sans font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            id={`cart-qty-inc-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                  <div className="p-4 rounded-full bg-neutral-950 border border-neutral-900">
                    <ShoppingBag className="w-8 h-8 text-neutral-600" />
                  </div>
                  <div>
                    <h5 className="font-serif text-sm tracking-widest text-neutral-400 uppercase font-medium">
                      Your Shopping Bag is Empty
                    </h5>
                    <p className="font-sans text-xs text-neutral-500 max-w-xs mt-2 leading-relaxed">
                      Select items from our ready-to-wear or accessories collections to view them in your bag.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Gift Wrap & Summary Footer */}
            {cartItems.length > 0 && (
              <div className="px-6 py-4 bg-neutral-950/80 border-t border-b border-neutral-900 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-2.5">
                    <Gift className={`w-4 h-4 mt-0.5 ${getGoldColor()}`} />
                    <div>
                      <span className="font-serif text-xs text-neutral-200 tracking-wide block font-medium">
                        Signature Gift Box Casing
                      </span>
                      <span className="font-sans text-[10px] text-neutral-500 leading-normal block">
                        Our premium linen-box, wrapped in thick silk ribbon + $25.
                      </span>
                    </div>
                  </div>
                  <button
                    id="gift-wrap-toggle"
                    onClick={() => setGiftWrap(!giftWrap)}
                    className={`w-10 h-5 rounded-full p-0.5 transition-all duration-300 ${giftWrap ? getGoldBg() : 'bg-neutral-800'}`}
                  >
                    <div
                      className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${giftWrap ? 'translate-x-5' : 'translate-x-0'}`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Summary & Checkout */}
            <div className="p-6 bg-neutral-950 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans text-neutral-400">
                  <span>Couture Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {giftWrap && (
                  <div className="flex justify-between text-xs font-sans text-neutral-400">
                    <span>Maison Gift Packaging</span>
                    <span>$25</span>
                  </div>
                )}
                <div className="flex justify-between text-xs font-sans text-neutral-400">
                  <span>Express Courier Delivery</span>
                  <span className={shippingProgress >= 100 ? getGoldColor() : ''}>
                    {shippingProgress >= 100 ? 'Complimentary' : 'Calculated next'}
                  </span>
                </div>
                <div className="h-px bg-neutral-900 my-2" />
                <div className="flex justify-between text-sm font-serif">
                  <span className="font-medium">Estimated Total</span>
                  <span className={`font-semibold ${getGoldColor()}`}>
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                id="checkout-btn"
                disabled={cartItems.length === 0}
                className={`w-full py-3.5 font-sans font-bold text-xs tracking-[0.25em] uppercase rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${getGoldBtnClass()}`}
              >
                Proceed to Checkout
              </button>
              <p className="text-[9px] text-neutral-600 font-sans text-center leading-normal">
                Secure transactions protected by 256-bit encryption. Duties and taxes calculated at courier handover.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
