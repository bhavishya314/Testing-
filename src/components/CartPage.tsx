import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Percent, 
  Truck, 
  CreditCard, 
  MessageSquare, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Gift,
  ShieldCheck
} from 'lucide-react';
import { CartItem, GoldStyle } from '../types';

interface CartPageProps {
  goldStyle: GoldStyle;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveFromCart: (id: string) => void;
  onBackToShop: () => void;
  onClearCart?: () => void;
  onProductClick?: (product: any) => void;
}

const SHIPPING_THRESHOLD = 1500;
const STANDARD_SHIPPING_COST = 45;

export default function CartPage({
  goldStyle,
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  onBackToShop,
  onClearCart,
  onProductClick
}: CartPageProps) {
  // Coupon Code State
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Gift wrapping state
  const [giftWrap, setGiftWrap] = useState(false);

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'card'
  });

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

  const getGoldGlow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_0_20px_rgba(223,186,115,0.15)]';
    if (goldStyle === 'bright') return 'hover:shadow-[0_0_25px_rgba(255,215,0,0.2)]';
    return 'hover:shadow-[0_0_20px_rgba(197,168,128,0.15)]';
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const discountAmount = appliedDiscount ? Math.round(subtotal * (appliedDiscount.percent / 100)) : 0;
  const isFreeShipping = subtotal >= SHIPPING_THRESHOLD;
  const shippingCost = totalItems > 0 ? (isFreeShipping ? 0 : STANDARD_SHIPPING_COST) : 0;
  const giftWrapCost = giftWrap ? 25 : 0;
  const finalTotal = subtotal - discountAmount + shippingCost + giftWrapCost;

  // Coupon application handler
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setCouponError('Please enter a couture promo code');
      return;
    }

    if (code === 'AURELIA10') {
      setAppliedDiscount({ code: 'AURELIA10', percent: 10 });
      setCouponSuccess('Couture discount of 10% successfully applied.');
    } else if (code === 'GOLD20') {
      setAppliedDiscount({ code: 'GOLD20', percent: 20 });
      setCouponSuccess('VIP Golden discount of 20% successfully applied.');
    } else if (code === 'MAISON50') {
      setAppliedDiscount({ code: 'MAISON50', percent: 50 });
      setCouponSuccess('Maison Private Collection 50% discount applied.');
    } else {
      setCouponError('Invalid promo code. Please enter a valid elite invitation code.');
    }
    setCouponInput('');
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(null);
    setCouponSuccess('');
    setCouponError('');
  };

  // WhatsApp Purchase link builder
  const handleWhatsAppBuy = () => {
    const phone = '15550199'; // Simulated boutique number
    let text = `*AURELIA COUTURE ORDER OVERVIEW*\n`;
    text += `Hello Aurelia Concierge, I would like to place an order for the following items:\n\n`;
    
    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n`;
      text += `   - Qty: ${item.quantity}\n`;
      text += `   - Size: ${item.size}\n`;
      text += `   - Color: ${item.color || 'Noir'}\n`;
      text += `   - Price: $${(item.price * item.quantity).toLocaleString()}\n\n`;
    });

    if (giftWrap) {
      text += `*Signature Gift Packaging:* Yes (+$25)\n`;
    }
    if (appliedDiscount) {
      text += `*Promo Code Applied:* ${appliedDiscount.code} (-${appliedDiscount.percent}%)\n`;
    }
    
    text += `*Couture Subtotal:* $${subtotal.toLocaleString()}\n`;
    text += `*Courier Express Shipping:* ${shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}\n`;
    text += `*Estimated Final Total:* $${finalTotal.toLocaleString()}\n\n`;
    text += `Please guide me on completing my bespoke payment. Thank you!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
  };

  // Simulated Checkout process
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.fullName || !shippingForm.email || !shippingForm.address || !shippingForm.city) {
      alert('Please fill in all requested fields to finalize your luxury shipment.');
      return;
    }
    setCheckoutStep('success');
  };

  const handleOrderSuccessClose = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep('details');
    // Clear cart if onClearCart is provided
    if (onClearCart) {
      onClearCart();
    }
  };

  return (
    <div id="dedicated-cart-page" className="relative w-full py-16 px-4 md:px-8 max-w-7xl mx-auto min-h-[70vh] text-white">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900 pb-6 mb-10 gap-4">
        <div>
          <span className={`text-[10px] tracking-[0.3em] uppercase ${getGoldColor()} block mb-2 font-semibold`}>
            Your Personal Curation
          </span>
          <h1 className="font-serif text-3xl md:text-4xl tracking-wide font-medium">
            Shopping Bag
          </h1>
        </div>
        
        <button
          id="cart-continue-shopping-top"
          onClick={onBackToShop}
          className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-neutral-400 hover:text-white transition-all duration-300 self-start md:self-auto group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart State */
        <motion.div 
          id="cart-empty-state"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-neutral-950/50 filter blur-xl scale-125" />
            <div className="relative p-6 rounded-full border border-neutral-900 bg-neutral-950/40">
              <ShoppingBag className="w-16 h-16 text-neutral-700" />
            </div>
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className={`absolute -top-1 -right-1 p-1.5 rounded-full border border-neutral-800 bg-black ${getGoldColor()}`}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>

          <h3 className="font-serif text-xl tracking-wide font-medium text-neutral-200 mb-3">
            Your Atelier Bag is Empty
          </h3>
          <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed mb-8">
            Discover our luxury hand-stitched tailoring, bespoke outerwear, and exquisite silk slip dresses to add premium items to your collection.
          </p>

          <button
            id="cart-start-shopping"
            onClick={onBackToShop}
            className={`px-10 py-4 text-xs font-sans font-bold tracking-[0.25em] uppercase rounded-sm transition-all duration-300 shadow-md ${getGoldBtnClass()}`}
          >
            Start Shopping
          </button>
        </motion.div>
      ) : (
        /* Cart Layout Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* List of Cart Items (8 Cols on Large Screens) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="hidden md:grid grid-cols-12 gap-4 text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-sans border-b border-neutral-900 pb-3 px-4">
              <span className="col-span-6">Product details</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Price</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  id={`cart-page-item-${item.id}`}
                  key={`${item.id}-${item.size}-${item.color || 'Noir'}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-5 rounded-lg border border-neutral-900 bg-neutral-950/20 backdrop-blur-sm items-center hover:border-neutral-800/80 transition-all duration-300 group"
                >
                  {/* Left Column: Image & Details */}
                  <div className="col-span-1 md:col-span-6 flex gap-4">
                    {/* Image */}
                    <div 
                      onClick={() => onProductClick?.(item)}
                      className="w-20 md:w-24 h-28 md:h-32 rounded bg-neutral-900 overflow-hidden shrink-0 relative border border-neutral-900 cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>

                    {/* Meta details */}
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <span className={`text-[9px] tracking-[0.2em] uppercase ${getGoldColor()} font-semibold block mb-1`}>
                          Couture Series
                        </span>
                        <h3 
                          onClick={() => onProductClick?.(item)}
                          className="font-serif text-base text-neutral-100 group-hover:text-white transition-colors duration-300 cursor-pointer hover:underline"
                        >
                          {item.name}
                        </h3>
                        
                        {/* Selected Attributes */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-400 font-sans font-light mt-2">
                          <span className="flex items-center gap-1.5">
                            Size: <strong className="text-white font-medium">{item.size}</strong>
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 hidden sm:inline" />
                          <span className="flex items-center gap-1.5">
                            Color: <strong className="text-white font-medium">{item.color || 'Noir'}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Remove item button for mobile */}
                      <button
                        id={`cart-page-remove-btn-${item.id}`}
                        onClick={() => onRemoveFromCart(item.id)}
                        className="flex items-center gap-1.5 text-[10px] tracking-wider text-neutral-500 hover:text-red-400 transition-colors duration-300 self-start mt-3 font-sans uppercase"
                        title="Remove piece"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove Item
                      </button>
                    </div>
                  </div>

                  {/* Middle Column: Quantity Selector */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center border-t border-b border-neutral-900/40 md:border-none py-2 md:py-0">
                    <span className="md:hidden text-xs text-neutral-500 font-sans uppercase">Quantity</span>
                    <div className="flex items-center rounded bg-black/40 border border-neutral-900 p-1">
                      <button
                        id={`cart-page-qty-dec-${item.id}`}
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-sans font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        id={`cart-page-qty-inc-${item.id}`}
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Price Column */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center py-1 md:py-0 text-right">
                    <span className="md:hidden text-xs text-neutral-500 font-sans uppercase">Price</span>
                    <span className="font-mono text-sm text-neutral-400 font-light">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Subtotal Column */}
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center py-1 md:py-0 text-right">
                    <span className="md:hidden text-xs text-neutral-500 font-sans uppercase">Subtotal</span>
                    <span className={`font-mono text-sm font-semibold ${getGoldColor()}`}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>

            {/* Free Luxury Express Shipping Bar */}
            <div className="p-5 rounded-lg border border-neutral-900 bg-neutral-950/40 space-y-3">
              <div className="flex items-start gap-3.5">
                <Truck className={`w-5 h-5 shrink-0 mt-0.5 ${getGoldColor()}`} />
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-medium tracking-wide">
                    {isFreeShipping 
                      ? 'Complimentary Express Courier Activated' 
                      : 'Complimentary Worldwide Express Courier'}
                  </h4>
                  <p className="font-sans text-xs text-neutral-400 leading-normal font-light">
                    {isFreeShipping 
                      ? 'Your order qualifies for complimentary priority packaging and express global air courier.' 
                      : `Add only $${(SHIPPING_THRESHOLD - subtotal).toLocaleString()} more to activate complimentary priority global delivery.`}
                  </p>
                </div>
              </div>
              <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-700 ease-out rounded-full ${getGoldBg()}`}
                  style={{ width: `${Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Signature Gift Packaging option */}
            <div className="p-5 rounded-lg border border-neutral-900 bg-neutral-950/10 hover:border-neutral-800 transition-all duration-300 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <Gift className={`w-5 h-5 mt-0.5 ${getGoldColor()}`} />
                <div>
                  <h4 className="font-serif text-sm font-medium tracking-wide text-neutral-200">
                    Bespoke Signature Gift Casing
                  </h4>
                  <p className="font-sans text-xs text-neutral-400 font-light leading-normal mt-0.5">
                    Our luxury solid linen-box, nested with tissue wrap, sealed with hot wax and secured with thick silk ribbon. Perfect for direct prestige gifts (+ $25).
                  </p>
                </div>
              </div>

              <button
                id="cart-page-gift-wrap-toggle"
                onClick={() => setGiftWrap(!giftWrap)}
                className={`w-12 h-6 rounded-full p-0.5 transition-all duration-500 shrink-0 ${giftWrap ? getGoldBg() : 'bg-neutral-800'}`}
                aria-label="Toggle Signature Gift Packaging"
              >
                <div 
                  className={`bg-black w-5 h-5 rounded-full shadow-md transform transition-all duration-300 ${giftWrap ? 'translate-x-6' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 md:p-8 rounded-lg border border-neutral-900 bg-[#0c0c0c] space-y-6 sticky top-28">
              <h2 className="font-serif text-lg tracking-wider font-medium border-b border-neutral-900 pb-4">
                Order Summary
              </h2>

              {/* Promo Code Input Box */}
              <form onSubmit={handleApplyCoupon} className="space-y-2.5">
                <label className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 block font-sans">
                  Have a Couture Invitation Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g., GOLD20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 text-xs font-sans bg-black border border-neutral-800 rounded-sm focus:outline-none focus:border-neutral-600 transition-all uppercase placeholder:text-neutral-700 placeholder:normal-case"
                  />
                  <button
                    id="cart-apply-promo-btn"
                    type="submit"
                    className="px-4 py-2 text-xs font-sans font-bold uppercase border border-neutral-800 hover:border-neutral-500 bg-neutral-900 rounded-sm transition-all duration-300"
                  >
                    Apply
                  </button>
                </div>

                {couponError && (
                  <p className="text-[11px] text-red-400 font-sans font-light">
                    {couponError}
                  </p>
                )}

                {couponSuccess && (
                  <p className="text-[11px] text-emerald-400 font-sans font-light flex items-center gap-1">
                    <Check className="w-3 h-3" /> {couponSuccess}
                  </p>
                )}
              </form>

              {/* Breakdowns */}
              <div className="space-y-3 text-xs font-sans text-neutral-400">
                <div className="flex justify-between">
                  <span className="font-light">Total pieces ({totalItems})</span>
                  <span className="font-mono text-neutral-200">${subtotal.toLocaleString()}</span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-400">
                    <span className="flex items-center gap-1 font-light">
                      <Percent className="w-3 h-3" />
                      Promo Discount ({appliedDiscount.code})
                    </span>
                    <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                {giftWrap && (
                  <div className="flex justify-between">
                    <span className="font-light">Signature Gift Casing</span>
                    <span className="font-mono text-neutral-200">$25</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="font-light">Express Air Courier Delivery</span>
                  <span className={shippingCost === 0 ? `font-semibold ${getGoldColor()}` : 'font-mono text-neutral-200'}>
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toLocaleString()}`}
                  </span>
                </div>

                <div className="h-px bg-neutral-900 my-4" />

                <div className="flex justify-between items-end text-sm text-white">
                  <span className="font-serif text-neutral-200 font-medium tracking-wide">Estimated Total</span>
                  <div className="text-right">
                    {appliedDiscount && (
                      <span className="font-mono text-[11px] text-neutral-500 line-through block mb-0.5">
                        ${(subtotal + shippingCost + giftWrapCost).toLocaleString()}
                      </span>
                    )}
                    <span className={`font-mono text-lg font-semibold block ${getGoldColor()}`}>
                      ${finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Stack */}
              <div className="space-y-3 pt-4">
                {/* Proceed to checkout (demo) */}
                <button
                  id="cart-proceed-checkout"
                  onClick={() => setIsCheckoutOpen(true)}
                  className={`w-full py-4 text-xs font-sans font-bold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer ${getGoldBtnClass()} ${getGoldGlow()}`}
                >
                  <CreditCard className="w-4 h-4" />
                  Proceed to Checkout
                </button>

                {/* Buy on WhatsApp */}
                <button
                  id="cart-buy-whatsapp"
                  onClick={handleWhatsAppBuy}
                  className="w-full py-4 text-xs font-sans font-medium tracking-[0.15em] uppercase rounded-sm transition-all duration-300 border border-emerald-800 hover:border-emerald-600 bg-emerald-950/25 hover:bg-emerald-900/10 text-emerald-400 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Order via WhatsApp
                </button>

                {/* Continue Shopping secondary link */}
                <button
                  id="cart-continue-shopping-bottom"
                  onClick={onBackToShop}
                  className="w-full py-3 text-[11px] font-sans font-light tracking-widest uppercase text-neutral-500 hover:text-white transition-colors text-center"
                >
                  Continue Browsing
                </button>
              </div>

              {/* Secure checkout assurances */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-sans font-light border-t border-neutral-900 pt-4">
                <ShieldCheck className={`w-3.5 h-3.5 ${getGoldColor()}`} />
                <span>Secure SSL Checkout Process</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Luxury Checkout Modal Overlay */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="checkout-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              id="checkout-modal-container"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-4 md:inset-auto md:top-[12%] md:left-[50%] md:translate-x-[-50%] z-50 md:w-full md:max-w-2xl bg-[#090909] border border-neutral-900 text-white rounded-md shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-neutral-900 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded bg-neutral-950 border border-neutral-800 ${getGoldColor()}`}>
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg tracking-wide font-medium">AURELIA COUTURE</h3>
                    <p className="text-[9px] font-sans uppercase tracking-[0.15em] text-neutral-500">Maison Payment Terminal</p>
                  </div>
                </div>

                <button
                  id="checkout-modal-close"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-neutral-500 hover:text-white p-1 rounded hover:bg-neutral-900 transition-colors"
                >
                  Close
                </button>
              </div>

              {checkoutStep === 'details' ? (
                /* Step 1: Input shipping and billing details */
                <form onSubmit={handleCheckoutSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
                  <div>
                    <h4 className="font-serif text-sm tracking-widest uppercase text-neutral-300 mb-4 flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${getGoldColor()}`} />
                      1. Express Shipment Logistics
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] tracking-wider text-neutral-400 uppercase font-sans">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-neutral-600" />
                          <input
                            required
                            type="text"
                            placeholder="Lord / Lady Sterling"
                            value={shippingForm.fullName}
                            onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 text-xs font-sans bg-black border border-neutral-800 rounded-sm focus:outline-none focus:border-neutral-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] tracking-wider text-neutral-400 uppercase font-sans">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-neutral-600" />
                          <input
                            required
                            type="email"
                            placeholder="prestige@aurelia.com"
                            value={shippingForm.email}
                            onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 text-xs font-sans bg-black border border-neutral-800 rounded-sm focus:outline-none focus:border-neutral-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] tracking-wider text-neutral-400 uppercase font-sans">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 w-4 h-4 text-neutral-600" />
                          <input
                            required
                            type="tel"
                            placeholder="+1 (555) 900-2000"
                            value={shippingForm.phone}
                            onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 text-xs font-sans bg-black border border-neutral-800 rounded-sm focus:outline-none focus:border-neutral-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] tracking-wider text-neutral-400 uppercase font-sans">Country *</label>
                        <select
                          value={shippingForm.country}
                          onChange={(e) => setShippingForm({ ...shippingForm, country: e.target.value })}
                          className="w-full px-3 py-2 text-xs font-sans bg-black border border-neutral-800 rounded-sm focus:outline-none focus:border-neutral-500 transition-colors h-[34px] text-neutral-300"
                        >
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="France">France</option>
                          <option value="Italy">Italy</option>
                          <option value="Japan">Japan</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Monaco">Monaco</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-[10px] tracking-wider text-neutral-400 uppercase font-sans">Delivery Address *</label>
                        <input
                          required
                          type="text"
                          placeholder="Fifth Avenue Manhattan Apartment 4B"
                          value={shippingForm.address}
                          onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                          className="w-full px-4 py-2 text-xs font-sans bg-black border border-neutral-800 rounded-sm focus:outline-none focus:border-neutral-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] tracking-wider text-neutral-400 uppercase font-sans">City *</label>
                        <input
                          required
                          type="text"
                          placeholder="New York"
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                          className="w-full px-4 py-2 text-xs font-sans bg-black border border-neutral-800 rounded-sm focus:outline-none focus:border-neutral-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] tracking-wider text-neutral-400 uppercase font-sans">Postal / ZIP Code *</label>
                        <input
                          required
                          type="text"
                          placeholder="10001"
                          value={shippingForm.postalCode}
                          onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                          className="w-full px-4 py-2 text-xs font-sans bg-black border border-neutral-800 rounded-sm focus:outline-none focus:border-neutral-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-900 pt-5">
                    <h4 className="font-serif text-sm tracking-widest uppercase text-neutral-300 mb-4 flex items-center gap-2">
                      <CreditCard className={`w-4 h-4 ${getGoldColor()}`} />
                      2. Secure Couture Payment
                    </h4>

                    <div className="bg-neutral-950 border border-neutral-900 rounded p-4 space-y-4">
                      <div className="flex items-center gap-3 border-b border-neutral-900 pb-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center border-yellow-500`}>
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        </div>
                        <span className="text-xs font-sans font-medium text-neutral-200">Demonstration Elite Sandbox Card</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-[9px] tracking-wide text-neutral-500 uppercase font-sans">Card Number</label>
                          <input
                            type="text"
                            disabled
                            placeholder="4111 2222 3333 4444"
                            className="w-full px-4 py-2 text-xs font-mono bg-black/40 border border-neutral-900 rounded-sm text-neutral-400 cursor-not-allowed"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] tracking-wide text-neutral-500 uppercase font-sans">Exp Date</label>
                          <input
                            type="text"
                            disabled
                            placeholder="12/28"
                            className="w-full px-4 py-2 text-xs font-mono bg-black/40 border border-neutral-900 rounded-sm text-neutral-400 cursor-not-allowed"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] tracking-wide text-neutral-500 uppercase font-sans">Security Code (CVV)</label>
                          <input
                            type="text"
                            disabled
                            placeholder="***"
                            className="w-full px-4 py-2 text-xs font-mono bg-black/40 border border-neutral-900 rounded-sm text-neutral-400 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Footer bar inside Checkout Modal */}
                  <div className="p-4 bg-black border border-neutral-900 flex justify-between items-center rounded-sm">
                    <div>
                      <span className="text-[10px] text-neutral-500 font-sans block">TOTAL PAYMENT DUE</span>
                      <span className={`font-mono text-base font-bold ${getGoldColor()}`}>${finalTotal.toLocaleString()}</span>
                    </div>

                    <button
                      id="checkout-finalize-demo"
                      type="submit"
                      className={`px-8 py-3 text-xs font-sans font-bold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-md ${getGoldBtnClass()}`}
                    >
                      Authorize Payment
                    </button>
                  </div>
                </form>
              ) : (
                /* Step 2: Checkout Success Receipt */
                <motion.div 
                  id="checkout-success-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 overflow-y-auto p-8 text-center flex flex-col items-center justify-center space-y-6"
                >
                  <div className="p-4 rounded-full bg-emerald-950/40 border border-emerald-800 text-emerald-400 relative">
                    <Check className="w-12 h-12" />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      className="absolute inset-0 rounded-full border border-emerald-800/40 filter blur-sm scale-125"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className={`text-[10px] tracking-[0.35em] uppercase font-bold ${getGoldColor()}`}>
                      Prestige Order Authenticated
                    </span>
                    <h4 className="font-serif text-2xl tracking-wide font-medium">
                      Thank You For Your Patronage, {shippingForm.fullName}
                    </h4>
                    <p className="font-sans text-xs text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
                      A confirmation has been sent to <strong className="text-neutral-200">{shippingForm.email}</strong>. Our Parisian atelier is currently preparing your handmade clothing for immediate shipment.
                    </p>
                  </div>

                  {/* Order detail card */}
                  <div className="w-full max-w-md p-5 rounded border border-neutral-900 bg-neutral-950/60 text-left font-sans space-y-3 text-xs">
                    <div className="flex justify-between text-neutral-500">
                      <span>Order Reference</span>
                      <span className="font-mono text-neutral-200 font-medium">#AUR-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>

                    <div className="flex justify-between text-neutral-500">
                      <span>Express Courier</span>
                      <span className="text-neutral-200">DHL Couture Express</span>
                    </div>

                    <div className="flex justify-between text-neutral-500">
                      <span>Destination City</span>
                      <span className="text-neutral-200">{shippingForm.city}, {shippingForm.country}</span>
                    </div>

                    <div className="border-t border-neutral-900 pt-3 flex justify-between items-center">
                      <span className="font-serif text-sm font-medium">Bespoke Total Paid</span>
                      <span className={`font-mono text-base font-semibold ${getGoldColor()}`}>${finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    id="checkout-success-continue"
                    onClick={handleOrderSuccessClose}
                    className={`px-10 py-3.5 text-xs font-sans font-bold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-lg ${getGoldBtnClass()}`}
                  >
                    Return to Atelier
                  </button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
