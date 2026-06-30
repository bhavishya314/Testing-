import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, Heart, ShoppingBag, Share2, ArrowLeft, Check, 
  MessageCircle, Truck, RefreshCw, ShieldCheck, ChevronDown, 
  ChevronUp, Sparkles, AlertCircle, Copy, CheckCircle2
} from 'lucide-react';
import { GoldStyle, CartItem } from '../types';
import { Product, SHOP_PRODUCTS, PRODUCT_COLORS } from './ShopPage';

interface ProductDetailsProps {
  goldStyle: GoldStyle;
  product: Product;
  wishlistIds: string[];
  onAddToCart: (item: { id: string; name: string; price: number; image: string }) => void;
  onAddToWishlist: (item: { id: string; name: string; price: number; image: string }) => void;
  onRemoveFromWishlist: (id: string) => void;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

// Map high-quality alternate fashion images based on category or name
const getProductGallery = (prod: Product): string[] => {
  const baseImage = prod.image;
  
  // High-fashion details and alternate angles
  const alternates: Record<string, string[]> = {
    'dress': [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600&auto=format&fit=crop'
    ],
    'outerwear': [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop'
    ],
    'accessories': [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop'
    ],
    'jewelry': [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop'
    ],
    'footwear': [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=600&auto=format&fit=crop'
    ]
  };

  const lowerCat = prod.category.toLowerCase();
  const lowerType = prod.type.toLowerCase();
  const lowerName = prod.name.toLowerCase();

  let selectedAlts = alternates.dress;

  if (lowerCat.includes('jewelry') || lowerType.includes('ring') || lowerType.includes('choker')) {
    selectedAlts = alternates.jewelry;
  } else if (lowerCat.includes('accessories') || lowerType.includes('scarf') || lowerType.includes('bag') || lowerType.includes('hat') || lowerType.includes('tote')) {
    selectedAlts = alternates.accessories;
  } else if (lowerCat.includes('footwear') || lowerType.includes('boots') || lowerType.includes('loafers') || lowerType.includes('sneakers')) {
    selectedAlts = alternates.footwear;
  } else if (lowerCat.includes('outerwear') || lowerType.includes('coat') || lowerType.includes('jacket') || lowerType.includes('blazer') || lowerType.includes('trench')) {
    selectedAlts = alternates.outerwear;
  } else if (lowerName.includes('dress') || lowerName.includes('gown') || lowerName.includes('kaftan') || lowerType.includes('gown')) {
    selectedAlts = alternates.dress;
  }

  return [baseImage, ...selectedAlts];
};

export default function ProductDetails({
  goldStyle,
  product,
  wishlistIds,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onBack,
  onSelectProduct
}: ProductDetailsProps) {
  
  const galleryImages = useMemo(() => getProductGallery(product), [product]);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  
  const colors = useMemo(() => PRODUCT_COLORS[product.id] || ['Black', 'White', 'Gold'], [product.id]);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || 'Black');
  const [quantity, setQuantity] = useState<number>(1);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'features' | 'shipping' | 'reviews'>('features');
  
  // Image Zoom State
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });

  // Update active image when product changes
  React.useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizes[0] || 'M');
    const prodColors = PRODUCT_COLORS[product.id] || ['Black', 'White', 'Gold'];
    setSelectedColor(prodColors[0] || 'Black');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const getGoldColor = () => {
    if (goldStyle === 'champagne') return 'text-[#dfba73]';
    if (goldStyle === 'bright') return 'text-[#ffd700]';
    return 'text-[#c5a880]';
  };

  const getGoldBg = () => {
    if (goldStyle === 'champagne') return 'bg-[#dfba73] hover:bg-[#d0a75c]';
    if (goldStyle === 'bright') return 'bg-[#ffd700] hover:bg-[#e6c200]';
    return 'bg-[#c5a880] hover:bg-[#b5956a]';
  };

  const getGoldBorder = () => {
    if (goldStyle === 'champagne') return 'border-[#dfba73]/40 focus:border-[#dfba73]';
    if (goldStyle === 'bright') return 'border-[#ffd700]/40 focus:border-[#ffd700]';
    return 'border-[#c5a880]/40 focus:border-[#c5a880]';
  };

  const getButtonGlow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_0_20px_rgba(223,186,115,0.4)]';
    if (goldStyle === 'bright') return 'hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]';
    return 'hover:shadow-[0_0_20px_rgba(197,168,128,0.4)]';
  };

  const isWishlisted = wishlistIds.includes(product.id);

  // Zoom feature coordinates calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${activeImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  const handleWhatsApp = () => {
    const text = `Hello AURELIA, I would like to purchase the following masterpiece:\n\n*${product.name}*\nBrand: AURELIA\nCategory: ${product.category}\nSize: ${selectedSize}\nColor: ${selectedColor}\nQuantity: ${quantity}\nPrice: $${(product.price * quantity).toLocaleString()}\n\nPlease advise on custom styling or tailoring availability!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/1234567890?text=${encodedText}`, '_blank');
  };

  // 4 Related Products of similar category or gender
  const relatedProducts = useMemo(() => {
    return SHOP_PRODUCTS
      .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
      .slice(0, 4);
  }, [product]);

  // Premium pre-baked reviews list
  const reviewData = useMemo(() => {
    return [
      {
        author: "Eleanora V.",
        date: "May 12, 2026",
        rating: 5,
        title: "Absolute Masterpiece",
        text: "The fabric weight is incredible—flows exactly like water. The hand-finished seams and exquisite tailored drape are what you expect from haute couture. Aurelia remains unmatched.",
        verified: true,
        helpfulness: 14
      },
      {
        author: "Maximilian K.",
        date: "April 28, 2026",
        rating: 5,
        title: "Impeccable Craftsmanship",
        text: "A standout addition to my wardrobe. The custom color holds beautifully under warm evening lights. It fits precisely to size. Phenomenal shipping experience too, arrived in an exquisite gift chest.",
        verified: true,
        helpfulness: 9
      }
    ];
  }, []);

  return (
    <div id="product-details-view" className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      
      {/* Breadcrumbs & Navigation Back */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <button 
          id="product-back-button"
          onClick={onBack}
          className="group flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 duration-300" />
          Back to collection
        </button>
        
        <div className="hidden sm:flex items-center gap-2 text-[9px] font-sans text-neutral-500 uppercase tracking-widest">
          <span className="hover:text-white transition-colors cursor-pointer" onClick={onBack}>Shop</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className={getGoldColor()}>{product.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Image Gallery (lg:col-span-7) */}
        <section id="gallery-container" className="lg:col-span-7 space-y-4">
          {/* Main Display Image */}
          <div 
            id="main-image-viewport"
            className="relative bg-neutral-950 aspect-[4/5] border border-neutral-900/60 overflow-hidden cursor-zoom-in group rounded-sm"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Standard display image */}
            <img 
              src={activeImage} 
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:opacity-0"
            />
            
            {/* Zoom display overlay */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={zoomStyle}
            />

            {/* Discount / Special Badges */}
            {product.originalPrice && (
              <span className="absolute top-4 left-4 bg-red-950/80 text-red-400 border border-red-900/30 px-3 py-1 text-[8px] font-sans font-bold tracking-[0.2em] uppercase rounded-sm">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
              </span>
            )}
            {!product.originalPrice && product.badge && (
              <span className={`absolute top-4 left-4 border px-3 py-1 text-[8px] font-sans font-bold tracking-[0.2em] uppercase rounded-sm ${
                product.badge === 'NEW' 
                  ? `${getGoldColor()} border-neutral-800 bg-black/80` 
                  : 'bg-black/80 border-neutral-800 text-neutral-300'
              }`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails row below */}
          <div id="thumbnails-tray" className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
            {galleryImages.map((img, idx) => {
              const isActive = activeImage === img;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative shrink-0 w-20 md:w-24 aspect-[4/5] bg-neutral-950 border rounded-sm overflow-hidden transition-all duration-300 hover:opacity-100 cursor-pointer ${
                    isActive 
                      ? 'border-white/90 ring-1 ring-white/25 scale-102 opacity-100' 
                      : 'border-neutral-900 opacity-60'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} thumbnail ${idx + 1}`} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              );
            })}
          </div>
        </section>

        {/* Right Column: Information Panel (lg:col-span-5) */}
        <section id="product-info-panel" className="lg:col-span-5 flex flex-col justify-between space-y-8">
          
          {/* Brand, Name, Category and Price Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-extrabold tracking-[0.3em] text-neutral-500 uppercase">
                AURELIA COUTURE
              </span>
              <span className="text-[10px] font-sans text-neutral-400 tracking-wider">
                Ref: {product.id.toUpperCase()}
              </span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-wide text-neutral-100 leading-tight">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-800'}`} 
                  />
                ))}
                <span className="font-sans text-[11px] font-medium text-neutral-300 ml-1">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="h-3 w-px bg-neutral-800" />
              <button 
                onClick={() => {
                  setActiveTab('reviews');
                  document.getElementById('tabs-navigation')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="font-sans text-[10px] text-neutral-400 hover:text-white underline cursor-pointer"
              >
                {product.reviews} customer reviews
              </button>
            </div>

            {/* Pricing Tag */}
            <div className="flex items-baseline gap-4 pt-2">
              <span className={`font-serif text-2xl md:text-3xl ${getGoldColor()} font-medium`}>
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="font-serif text-sm text-neutral-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-sans text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded-sm">
                    Save ${(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Dynamic Configuration Selectors */}
          <div className="space-y-6 pt-4 border-t border-neutral-900/60">
            {/* Color Option Selector */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-[11px] font-sans uppercase tracking-[0.2em] text-neutral-400">
                <span>Color: <strong className="text-white font-normal">{selectedColor}</strong></span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((color) => {
                  const isColorActive = selectedColor === color;
                  
                  // Map name to real elegant hex colors for custom visual circles
                  const colorMap: Record<string, string> = {
                    'Black': '#111111',
                    'White': '#ffffff',
                    'Gold': goldStyle === 'champagne' ? '#dfba73' : goldStyle === 'bright' ? '#ffd700' : '#c5a880',
                    'Beige': '#d4bba7',
                    'Emerald': '#065f46',
                    'Crimson': '#991b1b',
                    'Blue': '#1e3a8a',
                    'Grey': '#4b5563'
                  };
                  const hex = colorMap[color] || '#444';

                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full cursor-pointer transition-all duration-300 relative border flex items-center justify-center ${
                        isColorActive 
                          ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.25)]' 
                          : 'border-neutral-900 hover:border-neutral-700'
                      }`}
                      style={{ backgroundColor: hex }}
                      title={color}
                      aria-label={`Select color ${color}`}
                    >
                      {isColorActive && (
                        <Check className={`w-3.5 h-3.5 ${color === 'White' || color === 'Beige' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Option Selector */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-[11px] font-sans uppercase tracking-[0.2em] text-neutral-400">
                <span>Size: <strong className="text-white font-normal">{selectedSize}</strong></span>
                <button className="text-[10px] text-neutral-500 hover:text-white underline lowercase cursor-pointer">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => {
                  const isSizeActive = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[42px] height-[40px] px-3 py-2 text-[10px] font-sans font-bold uppercase tracking-widest rounded-sm border transition-all duration-300 cursor-pointer ${
                        isSizeActive
                          ? `${getGoldBg()} border-transparent text-black font-semibold scale-102`
                          : 'bg-neutral-950 text-neutral-400 border-neutral-900 hover:text-white hover:border-neutral-800'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-neutral-400">Quantity</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-neutral-950 border border-neutral-900 rounded-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3.5 py-2 text-neutral-500 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-500 transition-colors duration-300 cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 font-mono text-xs w-10 text-center text-neutral-200">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-neutral-500 hover:text-white transition-colors duration-300 cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-[10px] font-sans text-neutral-500 italic">In Stock - Ready to Tailor</span>
              </div>
            </div>
          </div>

          {/* Elite Order Buttons Tray */}
          <div className="space-y-3.5 pt-6 border-t border-neutral-900/60">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Add to Cart Action */}
              <button
                id="details-add-to-cart"
                onClick={() => {
                  // Multiply quantity inside add mechanism
                  for (let i = 0; i < quantity; i++) {
                    onAddToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image
                    });
                  }
                }}
                className={`w-full py-3.5 rounded-sm text-[10px] font-sans font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${getGoldBg()} text-black font-semibold ${getButtonGlow()}`}
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>

              {/* Add to Wishlist Action */}
              <button
                id="details-toggle-wishlist"
                onClick={() => {
                  if (isWishlisted) {
                    onRemoveFromWishlist(product.id);
                  } else {
                    onAddToWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image
                    });
                  }
                }}
                className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 rounded-sm text-[10px] font-sans font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer text-neutral-300 hover:text-white"
              >
                <Heart className={`w-4 h-4 transition-colors duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>

            </div>

            {/* WhatsApp Couture Consultation & Share */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Buy via WhatsApp Custom Order */}
              <button
                id="details-whatsapp-order"
                onClick={handleWhatsApp}
                className="w-full py-3 bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-900/40 text-emerald-400 hover:text-emerald-300 rounded-sm text-[10px] font-sans font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Buy via WhatsApp
              </button>

              {/* Share Masterpiece */}
              <button
                id="details-share"
                onClick={handleShare}
                className="w-full py-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 rounded-sm text-[10px] font-sans font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer text-neutral-400 hover:text-white relative"
              >
                {isCopied ? (
                  <>
                    <CheckCircle2 className={`w-4 h-4 ${getGoldColor()}`} />
                    <span className={getGoldColor()}>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    Share Product
                  </>
                )}
              </button>

            </div>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-900/60 text-center text-neutral-500 text-[9px] font-sans uppercase tracking-[0.15em] pt-4 mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <Truck className={`w-4 h-4 ${getGoldColor()}`} />
              <span>FedEx Priority</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 border-x border-neutral-900/60">
              <RefreshCw className={`w-4 h-4 ${getGoldColor()}`} />
              <span>Easy Exchanges</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className={`w-4 h-4 ${getGoldColor()}`} />
              <span>100% Authentic</span>
            </div>
          </div>

        </section>
      </main>

      {/* Tabs Section: Product Features, Shipping & Returns, Customer Reviews */}
      <section id="tabs-navigation" className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-neutral-900/60 mt-12">
        <div className="flex items-center justify-center border-b border-neutral-900 gap-6 md:gap-12 pb-px overflow-x-auto no-scrollbar">
          {[
            { id: 'features', label: 'Product Features' },
            { id: 'shipping', label: 'Shipping & Returns' },
            { id: 'reviews', label: `Reviews (${product.reviews})` }
          ].map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-[11px] font-sans font-bold tracking-[0.25em] uppercase border-b-2 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isTabActive 
                    ? 'border-white text-white font-bold' 
                    : 'border-transparent text-neutral-500 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="py-10 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-neutral-300 font-sans text-xs md:text-sm leading-relaxed"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-serif text-[15px] tracking-wide text-neutral-100 uppercase">
                      Couture Highlights
                    </h3>
                    <ul className="space-y-2.5">
                      {product.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-neutral-400">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${getGoldColor()}`} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-[15px] tracking-wide text-neutral-100 uppercase">
                      Sourcing & Care
                    </h3>
                    <p className="text-neutral-400 font-light">
                      AURELIA prioritizes high-altitude raw material sourcing under strict ecological oversight. To preserve the structure, weave complexity, and natural silk proteins or premium cashmere loft, we recommend dry cleaning under mild, certified organic green solvents only. Avoid machine tumbling or steam iron exposure.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-amber-500 bg-amber-950/20 border border-amber-900/30 px-3.5 py-2.5 rounded-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Complimentary complimentary premium garment bag and custom cedar hangers included.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-neutral-400 font-sans text-xs md:text-sm leading-relaxed font-light"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-serif text-[15px] tracking-wide text-neutral-100 uppercase font-normal">
                      Complimentary Global Shipping
                    </h3>
                    <p>
                      Every Aurelia creation is meticulously packaged by hand in our signature climate-regulated linen boxes. We offer complimentary insured FedEx Express or DHL Priority shipping worldwide.
                    </p>
                    <ul className="space-y-2">
                      <li>• North America & Europe: 1–3 Business Days</li>
                      <li>• Asia Pacific & Middle East: 2–4 Business Days</li>
                      <li>• Signature confirmation required on delivery</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-[15px] tracking-wide text-neutral-100 uppercase font-normal">
                      Artisan Return & Exchange Loop
                    </h3>
                    <p>
                      If your masterpiece does not fit precisely to your stature, we invite you to initiate an effortless complimentary exchange or return within 30 days of shipment receipt. 
                    </p>
                    <p>
                      Items must remain unworn, unaltered, and accompanied by security tags. Custom tailored alterations or gold-embellished details are final sale.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Visual Reviews breakdown panel */}
                <div className="bg-neutral-950/60 border border-neutral-900 p-6 md:p-8 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="text-center space-y-1">
                    <div className="font-serif text-4xl md:text-5xl tracking-tight text-white font-medium">
                      {product.rating.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center gap-0.5 text-amber-500 py-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-[10px] font-sans text-neutral-500 uppercase tracking-widest">
                      Based on {product.reviews} Master reviews
                    </p>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    {[
                      { stars: 5, pct: 92 },
                      { stars: 4, pct: 8 },
                      { stars: 3, pct: 0 },
                      { stars: 2, pct: 0 },
                      { stars: 1, pct: 0 }
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center gap-3 text-[10px] font-sans text-neutral-400">
                        <span className="w-12 text-right">{row.stars} Stars</span>
                        <div className="flex-1 bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'
                            }`}
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-neutral-500">{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual reviews stack */}
                <div className="space-y-6">
                  {reviewData.map((review, idx) => (
                    <div key={idx} className="bg-neutral-950/40 border border-neutral-900 p-6 rounded-sm space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-0.5 text-amber-500 mb-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <h4 className="font-serif text-sm tracking-wide text-neutral-100">
                            {review.title}
                          </h4>
                        </div>
                        <div className="text-right text-[10px] font-sans text-neutral-500">
                          <span>{review.author}</span>
                          {review.verified && (
                            <span className={`block ${getGoldColor()} text-[8px] tracking-wider uppercase mt-0.5`}>Verified Client</span>
                          )}
                        </div>
                      </div>

                      <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
                        {review.text}
                      </p>

                      <div className="flex items-center justify-between text-[9px] font-sans text-neutral-500 pt-2 border-t border-neutral-900/50">
                        <span>Posted on {review.date}</span>
                        <button className="hover:text-white transition-colors duration-300 cursor-pointer">
                          Was this helpful? ({review.helpfulness})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section id="related-products-section" className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-neutral-900/60 mt-12">
          <div className="text-center space-y-2 mb-12">
            <span className={`font-serif text-[10px] tracking-[0.4em] uppercase ${getGoldColor()}`}>
              Curated Selection
            </span>
            <h2 className="font-serif text-xl md:text-2xl tracking-widest text-neutral-100 uppercase">
              You May Also Admire
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => {
              const relatedIsWishlisted = wishlistIds.includes(p.id);
              return (
                <div 
                  key={p.id}
                  className="group block bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-all duration-500 rounded-sm overflow-hidden"
                >
                  <div 
                    onClick={() => onSelectProduct(p)}
                    className="relative aspect-[4/5] bg-neutral-950 overflow-hidden cursor-pointer"
                  >
                    <img 
                      src={p.image} 
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/30 transition-colors duration-500" />
                  </div>

                  <div className="p-3.5 space-y-1">
                    <span className="text-[8px] font-sans text-neutral-500 uppercase tracking-widest block">{p.category}</span>
                    <h3 
                      onClick={() => onSelectProduct(p)}
                      className="font-serif text-[11px] md:text-[12px] text-neutral-200 hover:text-white uppercase truncate cursor-pointer transition-colors duration-300"
                    >
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between pt-1">
                      <span className={`font-serif text-[11px] md:text-xs ${getGoldColor()}`}>
                        ${p.price.toLocaleString()}
                      </span>
                      <button 
                        onClick={() => onSelectProduct(p)}
                        className="text-[9px] font-sans font-bold text-neutral-400 hover:text-white uppercase tracking-widest transition-colors duration-300 cursor-pointer"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
