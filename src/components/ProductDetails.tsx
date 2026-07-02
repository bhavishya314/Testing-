import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../ThemeContext';
import { 
  Star, Heart, ShoppingBag, Share2, ArrowLeft, Check, 
  MessageCircle, Truck, RefreshCw, ShieldCheck, ChevronDown, 
  ChevronUp, Sparkles, AlertCircle, Copy, CheckCircle2
} from 'lucide-react';
import { GoldStyle, CartItem } from '../types';
import { Product, SHOP_PRODUCTS, PRODUCT_COLORS } from './ShopPage';
import { PRODUCT_VARIANTS } from '../data/productVariants';

interface ProductDetailsProps {
  theme?: string;
  goldStyle: GoldStyle;
  product: Product;
  wishlistIds: string[];
  onAddToCart: (item: { id: string; name: string; price: number; image: string; size?: string; color?: string }) => void;
  onAddToWishlist: (item: { id: string; name: string; price: number; image: string }) => void;
  onRemoveFromWishlist: (id: string) => void;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetails({
  theme = 'dark',
  goldStyle,
  product,
  wishlistIds,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  onBack,
  onSelectProduct
}: ProductDetailsProps) {
  
  const { theme: globalTheme } = useTheme();
  const isLight = globalTheme === 'light';

  // Safe fallback product values to prevent any rendering crash if product is partially populated (e.g. from Wishlist)
  const safeSizes = useMemo(() => product?.sizes || ['XS', 'S', 'M', 'L', 'XL'], [product?.sizes]);
  const safeDetails = useMemo(() => product?.details || ['100% Organic Materials', 'Premium Craftsmanship', 'Exclusive Limited Edition', 'Handcrafted in France'], [product?.details]);
  const safeDescription = product?.description || 'An exquisite masterwork of fine tailoring and handcrafted styling.';
  const safeRating = product?.rating || 5;
  const safeReviews = product?.reviews || 24;
  const safeCategory = product?.category || 'Ready-to-Wear';
  const safeGender = product?.gender || 'Women';
  const safeName = product?.name || 'AURELIA Haute Couture Item';
  const safePrice = product?.price || 0;
  const safeImage = product?.image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=300&auto=format&fit=crop';
  const safeOriginalPrice = product?.originalPrice;
  const safeBadge = product?.badge;
  const safeId = product?.id || 'unknown';

  const colors = useMemo(() => {
    const variants = PRODUCT_VARIANTS[safeId];
    if (variants && variants.length > 0) {
      return variants.map(v => v.color);
    }
    return PRODUCT_COLORS[safeId] || ['Black', 'White', 'Gold'];
  }, [safeId]);

  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || 'Black');
  
  // Return the selected variant's images or fall back to the main product image
  const galleryImages = useMemo(() => {
    const variants = PRODUCT_VARIANTS[safeId];
    if (!variants) {
      return [safeImage];
    }
    const currentVariant = variants.find(v => v.color === selectedColor);
    if (currentVariant && currentVariant.images && currentVariant.images.length > 0) {
      return currentVariant.images;
    }
    return [safeImage];
  }, [safeId, safeImage, selectedColor]);

  const selectedVariant = useMemo(() => {
    const variants = PRODUCT_VARIANTS[safeId];
    return variants?.find(v => v.color === selectedColor);
  }, [safeId, selectedColor]);

  const stockText = selectedVariant?.stockText || 'In Stock - Ready to Tailor';

  const [activeImage, setActiveImage] = useState<string>(safeImage);
  const [displayedImage, setDisplayedImage] = useState<string>(safeImage);
  const [imageOpacity, setImageOpacity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>(safeSizes[0] || 'M');
  
  // Sync activeImage whenever galleryImages changes (due to product or color selection)
  React.useEffect(() => {
    if (galleryImages && galleryImages.length > 0) {
      setActiveImage(galleryImages[0]);
    }
  }, [galleryImages]);

  // Preload all variant images of the active product so color transitions are instant
  React.useEffect(() => {
    const variants = PRODUCT_VARIANTS[safeId];
    if (variants) {
      variants.forEach((variant) => {
        if (variant.images) {
          variant.images.forEach((imgUrl) => {
            const img = new Image();
            img.src = imgUrl;
          });
        }
      });
    }
  }, [safeId]);

  // Pre-preload all images in current galleryImages
  React.useEffect(() => {
    if (galleryImages && galleryImages.length > 0) {
      galleryImages.forEach((imgUrl) => {
        const img = new Image();
        img.src = imgUrl;
      });
    }
  }, [galleryImages]);

  // Preload and transition effect
  React.useEffect(() => {
    if (!activeImage) return;
    if (activeImage === displayedImage) return;

    let isCancelled = false;

    // Preload the target image
    const img = new Image();
    img.src = activeImage;
    
    img.onload = () => {
      if (isCancelled) return;
      
      // Target image is loaded! Now do a smooth fade transition:
      // 1. Fade out the current image (100ms)
      setImageOpacity(0);
      
      setTimeout(() => {
        if (isCancelled) return;
        
        // 2. Switch the source
        setDisplayedImage(activeImage);
        
        // 3. Fade in the new image (100ms)
        setImageOpacity(1);
      }, 100); // 100ms fade-out
    };

    img.onerror = () => {
      if (isCancelled) return;
      // If variant images fail to load or are unavailable, gracefully fall back
      // and continue displaying the current image!
    };

    return () => {
      isCancelled = true;
    };
  }, [activeImage, displayedImage]);

  const [quantity, setQuantity] = useState<number>(1);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  
  // Image Zoom State
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });

  // Update active image when product changes
  React.useEffect(() => {
    const productVariants = PRODUCT_VARIANTS[safeId];
    const availableColors = (productVariants && productVariants.length > 0)
      ? productVariants.map(v => v.color)
      : (PRODUCT_COLORS[safeId] || ['Black', 'White', 'Gold']);
    
    const defaultColor = availableColors[0] || 'Black';
    
    let initialImage = safeImage;
    if (productVariants && productVariants.length > 0) {
      const firstVariant = productVariants.find(v => v.color === defaultColor);
      if (firstVariant && firstVariant.images && firstVariant.images.length > 0) {
        initialImage = firstVariant.images[0];
      }
    }

    setSelectedColor(defaultColor);
    setDisplayedImage(initialImage);
    setActiveImage(initialImage);
    setImageOpacity(1);
    setSelectedSize(safeSizes[0] || 'M');
    setQuantity(1);
    setZoomStyle({ display: 'none' });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [safeId, safeImage, safeSizes]);

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

  const isWishlisted = wishlistIds.includes(safeId);

  // Zoom feature coordinates calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${displayedImage})`,
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
    const text = `Hello AURELIA, I would like to purchase the following masterpiece:\n\n*${safeName}*\nBrand: AURELIA\nCategory: ${safeCategory}\nSize: ${selectedSize}\nColor: ${selectedColor}\nQuantity: ${quantity}\nPrice: $${(safePrice * quantity).toLocaleString()}\n\nPlease advise on custom styling or tailoring availability!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/33180059000?text=${encodedText}`, '_blank');
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // 4 Related Products of similar category or gender
  const relatedProducts = useMemo(() => {
    return SHOP_PRODUCTS
      .filter((p) => p.id !== safeId && (p.category === safeCategory || p.gender === safeGender))
      .slice(0, 4);
  }, [safeId, safeCategory, safeGender]);

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
    <div id="product-details-view" className={`min-h-screen pt-24 pb-16 transition-all duration-700 ease-in-out ${
      isLight 
        ? 'bg-[#faf9f6] text-neutral-900' 
        : 'bg-[#050505] text-white'
    }`}>
      
      {/* Breadcrumbs & Navigation Back */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <button 
          id="product-back-button"
          onClick={onBack}
          className={`group flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.25em] transition-colors duration-300 cursor-pointer ${
            isLight ? 'text-neutral-500 hover:text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 duration-300" />
          Back to collection
        </button>
        
        <div className={`hidden sm:flex items-center gap-2 text-[9px] font-sans uppercase tracking-widest ${
          isLight ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          <span className={`transition-colors cursor-pointer ${isLight ? 'hover:text-black' : 'hover:text-white'}`} onClick={onBack}>Shop</span>
          <span>/</span>
          <span>{safeCategory}</span>
          <span>/</span>
          <span className={getGoldColor()}>{safeName}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Image Gallery (lg:col-span-7) */}
        <section id="gallery-container" className="lg:col-span-7 space-y-4">
          {/* Main Display Image */}
          <div 
            id="main-image-viewport"
            className={`relative aspect-[4/5] border overflow-hidden cursor-zoom-in group rounded-sm ${
              isLight ? 'bg-[#f5f5f3] border-neutral-200' : 'bg-neutral-950 border-neutral-900/60'
            }`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Standard display image */}
            <img 
              src={displayedImage} 
              alt={safeName}
              referrerPolicy="no-referrer"
              style={{ opacity: imageOpacity }}
              className="w-full h-full object-cover object-center transition-opacity duration-150 group-hover:!opacity-0"
            />
            
            {/* Zoom display overlay */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={zoomStyle}
            />

            {/* Discount / Special Badges */}
            {safeOriginalPrice && (
              <span className="absolute top-4 left-4 bg-red-950/80 text-red-400 border border-red-900/30 px-3 py-1 text-[8px] font-sans font-bold tracking-[0.2em] uppercase rounded-sm">
                -{Math.round(((safeOriginalPrice - safePrice) / safeOriginalPrice) * 100)}% Off
              </span>
            )}
            {!safeOriginalPrice && safeBadge && (
              <span className={`absolute top-4 left-4 border px-3 py-1 text-[8px] font-sans font-bold tracking-[0.2em] uppercase rounded-sm ${
                safeBadge === 'NEW' 
                  ? `${getGoldColor()} border-neutral-800 bg-black/80` 
                  : 'bg-black/80 border-neutral-800 text-neutral-300'
              }`}>
                {safeBadge}
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
                  className={`relative shrink-0 w-20 md:w-24 aspect-[4/5] border rounded-sm overflow-hidden transition-all duration-300 hover:opacity-100 cursor-pointer ${
                    isLight ? 'bg-[#f5f5f3]' : 'bg-neutral-950'
                  } ${
                    isActive 
                      ? (isLight ? 'border-neutral-900 ring-1 ring-neutral-400 scale-102 opacity-100' : 'border-white/90 ring-1 ring-white/25 scale-102 opacity-100')
                      : (isLight ? 'border-neutral-200 opacity-60' : 'border-neutral-900 opacity-60')
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${safeName} thumbnail ${idx + 1}`} 
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
              <span className={`text-[10px] font-sans tracking-wider ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Ref: {safeId.toUpperCase()}
              </span>
            </div>

            <h1 className={`font-serif text-2xl md:text-3xl lg:text-4xl tracking-wide leading-tight ${
              isLight ? 'text-neutral-900' : 'text-neutral-100'
            }`}>
              {safeName}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < Math.floor(safeRating) ? 'fill-current' : (isLight ? 'text-neutral-300' : 'text-neutral-800')}`} 
                  />
                ))}
                <span className={`font-sans text-[11px] font-medium ml-1 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  {safeRating.toFixed(1)}
                </span>
              </div>
              <span className={`h-3 w-px ${isLight ? 'bg-neutral-200' : 'bg-neutral-800'}`} />
              <button 
                onClick={() => {
                  setOpenSections((prev) => ({ ...prev, reviews: true }));
                  setTimeout(() => {
                     document.getElementById('product-accordions')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
                }} 
                className={`font-sans text-[10px] underline cursor-pointer bg-transparent border-0 p-0 ${
                  isLight ? 'text-neutral-500 hover:text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {safeReviews} customer reviews
              </button>
            </div>

            {/* Pricing Tag */}
            <div className="flex items-baseline gap-4 pt-2">
              <span className={`font-serif text-2xl md:text-3xl ${getGoldColor()} font-medium`}>
                ${safePrice.toLocaleString()}
              </span>
              {safeOriginalPrice && (
                <>
                  <span className="font-serif text-sm text-neutral-500 line-through">
                    ${safeOriginalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-sans text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded-sm">
                    Save ${(safeOriginalPrice - safePrice).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className={`font-sans text-xs md:text-sm font-light leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              {safeDescription}
            </p>
          </div>

          {/* Dynamic Configuration Selectors */}
          <div className={`space-y-6 pt-4 border-t ${isLight ? 'border-neutral-200' : 'border-neutral-900/60'}`}>
            {/* Color Option Selector */}
            <div className="space-y-2.5">
              <div className={`flex justify-between items-center text-[11px] font-sans uppercase tracking-[0.2em] ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                <span>Color: <strong className={`font-normal ${isLight ? 'text-black' : 'text-white'}`}>{selectedColor}</strong></span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((color) => {
                  const isColorActive = selectedColor === color;
                  const variant = PRODUCT_VARIANTS[safeId]?.find(v => v.color === color);
                  const hasImages = PRODUCT_VARIANTS[safeId]
                    ? !!(variant && variant.images && variant.images.length > 0)
                    : true;
                  
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
                      disabled={!hasImages}
                      onClick={() => {
                        if (hasImages) {
                          setSelectedColor(color);
                        }
                      }}
                      className={`w-7 h-7 rounded-full transition-all duration-300 relative border flex items-center justify-center ${
                        !hasImages
                          ? 'opacity-30 cursor-not-allowed border-dashed border-neutral-700'
                          : isColorActive 
                            ? (isLight ? 'border-black scale-110 shadow-[0_0_12px_rgba(0,0,0,0.15)] cursor-pointer' : 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.25)] cursor-pointer')
                            : (isLight ? 'border-neutral-200 hover:border-neutral-400 cursor-pointer' : 'border-neutral-900 hover:border-neutral-700 cursor-pointer')
                      }`}
                      style={{ backgroundColor: hex }}
                      title={color + (!hasImages ? ' (Unavailable)' : '')}
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
              <div className={`flex justify-between items-center text-[11px] font-sans uppercase tracking-[0.2em] ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                <span>Size: <strong className={`font-normal ${isLight ? 'text-black' : 'text-white'}`}>{selectedSize}</strong></span>
                <button
                  onClick={() => {
                    setOpenSections((prev) => ({ ...prev, size_guide: true }));
                    setTimeout(() => {
                      document.getElementById('product-accordions')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                  }}
                  className="text-[10px] text-neutral-500 hover:text-white underline lowercase cursor-pointer bg-transparent border-0 p-0"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {safeSizes.map((sz) => {
                  const isSizeActive = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[42px] height-[40px] px-3 py-2 text-[10px] font-sans font-bold uppercase tracking-widest rounded-sm border transition-all duration-300 cursor-pointer ${
                        isSizeActive
                          ? `${getGoldBg()} border-transparent text-black font-semibold scale-102`
                          : (isLight 
                            ? 'bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-neutral-400' 
                            : 'bg-neutral-950 text-neutral-400 border-neutral-900 hover:text-white hover:border-neutral-800')
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
              <span className={`text-[11px] font-sans uppercase tracking-[0.2em] ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Quantity</span>
              <div className="flex items-center gap-3">
                <div className={`flex items-center rounded-sm border ${
                  isLight ? 'bg-white border-neutral-200' : 'bg-neutral-950 border-neutral-900'
                }`}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className={`px-3.5 py-2 disabled:opacity-30 transition-colors duration-300 cursor-pointer font-bold ${
                      isLight ? 'text-neutral-500 hover:text-black disabled:hover:text-neutral-500' : 'text-neutral-500 hover:text-white disabled:hover:text-neutral-500'
                    }`}
                  >
                    -
                  </button>
                  <span className={`px-4 font-mono text-xs w-10 text-center ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className={`px-3.5 py-2 transition-colors duration-300 cursor-pointer font-bold ${
                      isLight ? 'text-neutral-500 hover:text-black' : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    +
                  </button>
                </div>
                <span className="text-[10px] font-sans text-neutral-500 italic">{stockText}</span>
              </div>
            </div>
          </div>

          {/* Elite Order Buttons Tray */}
          <div className={`space-y-3.5 pt-6 border-t ${isLight ? 'border-neutral-200' : 'border-neutral-900/60'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Add to Cart Action */}
              <button
                id="details-add-to-cart"
                onClick={() => {
                  // Multiply quantity inside add mechanism
                  for (let i = 0; i < quantity; i++) {
                    onAddToCart({
                      id: safeId,
                      name: safeName,
                      price: safePrice,
                      image: activeImage,
                      size: selectedSize,
                      color: selectedColor,
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
                    onRemoveFromWishlist(safeId);
                  } else {
                    onAddToWishlist({
                      id: safeId,
                      name: safeName,
                      price: safePrice,
                      image: safeImage
                    });
                  }
                }}
                className={`w-full py-3.5 border rounded-sm text-[10px] font-sans font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  isLight 
                    ? 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-black' 
                    : 'bg-neutral-950 hover:bg-neutral-900 border-neutral-900 text-neutral-300 hover:text-white'
                }`}
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
          <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-900/60 text-center text-neutral-500 text-[8px] sm:text-[9px] font-sans uppercase tracking-wider sm:tracking-[0.15em] pt-4 mt-2">
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

      {/* Collapsible Accordions: Product Details, Care Instructions, Shipping & Returns, Customer Reviews, Size Guide */}
      <section id="product-accordions" className={`max-w-4xl mx-auto px-6 md:px-12 py-12 border-t mt-12 ${
        isLight ? 'border-neutral-200' : 'border-neutral-900/60'
      }`}>
        <div className={`divide-y ${isLight ? 'divide-neutral-200' : 'divide-neutral-900/60'}`}>
          {[
            {
              id: 'details',
              title: 'Product Details',
              content: (
                <div className={`font-sans text-xs md:text-sm leading-relaxed space-y-4 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  <p className={`font-light ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>{safeDescription}</p>
                  <div className="space-y-3">
                    <h4 className={`font-serif text-xs md:text-sm tracking-wider uppercase ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>Couture Highlights</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                      {safeDetails.map((detail, index) => (
                        <li key={index} className={`flex items-start gap-2.5 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${getGoldColor()}`} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            },
            {
              id: 'care',
              title: 'Care Instructions',
              content: (
                <div className={`font-sans text-xs md:text-sm leading-relaxed space-y-4 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  <p className="font-light">
                    AURELIA prioritizes high-altitude raw material sourcing under strict ecological oversight. To preserve the structure, weave complexity, and natural silk proteins or premium cashmere loft, we recommend dry cleaning under mild, certified organic green solvents only. Avoid machine tumbling or steam iron exposure.
                  </p>
                  <div className="flex items-center gap-2.5 text-[10px] text-amber-500 bg-amber-950/20 border border-amber-900/30 px-3.5 py-2.5 rounded-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Complimentary premium garment bag and custom cedar hangers included.</span>
                  </div>
                </div>
              )
            },
            {
              id: 'shipping',
              title: 'Shipping & Returns',
              content: (
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-xs md:text-sm leading-relaxed font-light ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  <div className="space-y-3">
                    <h4 className={`font-serif text-xs md:text-sm tracking-wider uppercase ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>
                      Complimentary Global Shipping
                    </h4>
                    <p className={isLight ? 'text-neutral-600' : 'text-neutral-400'}>
                      Every Aurelia creation is meticulously packaged by hand in our signature climate-regulated linen boxes. We offer complimentary insured FedEx Express or DHL Priority shipping worldwide.
                    </p>
                    <ul className="space-y-1 text-neutral-500">
                      <li>• North America & Europe: 1–3 Business Days</li>
                      <li>• Asia Pacific & Middle East: 2–4 Business Days</li>
                      <li>• Signature confirmation required on delivery</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className={`font-serif text-xs md:text-sm tracking-wider uppercase ${isLight ? 'text-neutral-800' : 'text-neutral-200'}`}>
                      Artisan Return & Exchange Loop
                    </h4>
                    <p className={isLight ? 'text-neutral-600' : 'text-neutral-400'}>
                      If your masterpiece does not fit precisely to your stature, we invite you to initiate an effortless complimentary exchange or return within 30 days of shipment receipt. 
                    </p>
                    <p className="text-neutral-500">
                      Items must remain unworn, unaltered, and accompanied by security tags. Custom tailored alterations or gold-embellished details are final sale.
                    </p>
                  </div>
                </div>
              )
            },
            {
              id: 'reviews',
              title: `Customer Reviews (${safeReviews})`,
              content: (
                <div className="space-y-6">
                  {/* Visual Reviews breakdown panel */}
                  <div className={`p-6 md:p-8 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center border ${
                    isLight ? 'bg-white border-neutral-200' : 'bg-neutral-950/60 border-neutral-900'
                  }`}>
                    <div className="text-center space-y-1">
                      <div className={`font-serif text-4xl md:text-5xl tracking-tight font-medium ${isLight ? 'text-black' : 'text-white'}`}>
                        {safeRating.toFixed(1)}
                      </div>
                      <div className="flex items-center justify-center gap-0.5 text-amber-500 py-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-[10px] font-sans text-neutral-500 uppercase tracking-widest">
                        Based on {safeReviews} Master reviews
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
                        <div key={row.stars} className={`flex items-center gap-3 text-[10px] font-sans ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                          <span className="w-12 text-right">{row.stars} Stars</span>
                          <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-neutral-100' : 'bg-neutral-900'}`}>
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
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
                    {reviewData.map((review, idx) => (
                      <div key={idx} className={`p-5 rounded-sm space-y-3 border ${
                        isLight ? 'bg-white border-neutral-200' : 'bg-neutral-950/40 border-neutral-900'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-0.5 text-amber-500 mb-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                            <h4 className={`font-serif text-sm tracking-wide ${isLight ? 'text-neutral-900' : 'text-neutral-100'}`}>
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

                        <p className={`font-sans text-xs md:text-sm leading-relaxed font-light ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                          {review.text}
                        </p>

                        <div className={`flex items-center justify-between text-[9px] font-sans text-neutral-500 pt-2 border-t ${
                          isLight ? 'border-neutral-200' : 'border-neutral-900/50'
                        }`}>
                          <span>Posted on {review.date}</span>
                          <button className={`hover:text-white transition-colors duration-300 cursor-pointer bg-transparent border-0 p-0 text-[9px] ${
                            isLight ? 'hover:text-black text-neutral-500' : 'hover:text-white text-neutral-400'
                          }`}>
                            Was this helpful? ({review.helpfulness})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            },
            {
              id: 'size_guide',
              title: 'Size Guide',
              content: (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className={`w-full text-left font-sans text-xs border-collapse ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                      <thead>
                        <tr className={`border-b uppercase tracking-wider text-[10px] ${
                          isLight ? 'border-neutral-200 text-neutral-800' : 'border-neutral-900 text-neutral-200'
                        }`}>
                          <th className="py-3 px-4 font-serif">Size</th>
                          <th className="py-3 px-4 font-serif">Bust / Chest</th>
                          <th className="py-3 px-4 font-serif">Waist</th>
                          <th className="py-3 px-4 font-serif">Hips</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isLight ? 'divide-neutral-100' : 'divide-neutral-900/50'}`}>
                        {[
                          { size: 'XS', bust: '32" - 33" (81-84 cm)', waist: '24" - 25" (61-64 cm)', hips: '34" - 35" (86-89 cm)' },
                          { size: 'S', bust: '34" - 35" (86-89 cm)', waist: '26" - 27" (66-69 cm)', hips: '36" - 37" (91-94 cm)' },
                          { size: 'M', bust: '36" - 37" (91-94 cm)', waist: '28" - 29" (71-74 cm)', hips: '38" - 39" (96-99 cm)' },
                          { size: 'L', bust: '38" - 40" (96-101 cm)', waist: '30" - 32" (76-81 cm)', hips: '40" - 42" (101-106 cm)' },
                          { size: 'XL', bust: '41" - 43" (104-109 cm)', waist: '33" - 35" (84-89 cm)', hips: '43" - 45" (109-114 cm)' }
                        ].map((row) => (
                          <tr key={row.size} className={`transition-colors ${isLight ? 'hover:bg-neutral-50' : 'hover:bg-neutral-950/40'}`}>
                            <td className={`py-3 px-4 font-serif font-bold ${isLight ? 'text-black' : 'text-white'}`}>{row.size}</td>
                            <td className="py-3 px-4">{row.bust}</td>
                            <td className="py-3 px-4">{row.waist}</td>
                            <td className="py-3 px-4">{row.hips}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-neutral-500 italic leading-relaxed text-center">
                    *Stated measurements reflect body contours. Standard fit aligns with typical high-couture sizing models. For bespoke tailoring requests, please contact our private concierge.
                  </p>
                </div>
              )
            }
          ].map((section) => {
            const isOpen = !!openSections[section.id];
            return (
              <div key={section.id} className="py-2">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full flex items-center justify-between py-4 text-left transition-colors cursor-pointer group ${
                    isLight ? 'hover:text-black' : 'hover:text-white'
                  }`}
                >
                  <span className={`font-serif text-[12px] md:text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
                    isLight ? 'text-neutral-700 group-hover:text-black' : 'text-neutral-300 group-hover:text-white'
                  }`}>
                    {section.title}
                  </span>
                  <span className="text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto", marginBottom: 16, marginTop: 4 },
                        collapsed: { opacity: 0, height: 0, marginBottom: 0, marginTop: 0 }
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section id="related-products-section" className={`max-w-7xl mx-auto px-6 md:px-12 py-12 border-t mt-12 ${
          isLight ? 'border-neutral-200' : 'border-neutral-900/60'
        }`}>
          <div className="text-center space-y-2 mb-12">
            <span className={`font-serif text-[10px] tracking-[0.4em] uppercase ${getGoldColor()}`}>
              Curated Selection
            </span>
            <h2 className={`font-serif text-xl md:text-2xl tracking-widest uppercase ${
              isLight ? 'text-neutral-900' : 'text-neutral-100'
            }`}>
              You May Also Admire
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => {
              const relatedIsWishlisted = wishlistIds.includes(p.id);
              return (
                <div 
                  key={p.id}
                  className={`group block transition-all duration-500 rounded-sm overflow-hidden border ${
                    isLight ? 'bg-white border-neutral-200 hover:border-neutral-300' : 'bg-neutral-950 border-neutral-900 hover:border-neutral-800'
                  }`}
                >
                  <div 
                    onClick={() => onSelectProduct(p)}
                    className={`relative aspect-[4/5] overflow-hidden cursor-pointer ${
                      isLight ? 'bg-[#f5f5f3]' : 'bg-neutral-950'
                    }`}
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
                      className={`font-serif text-[11px] md:text-[12px] uppercase truncate cursor-pointer transition-colors duration-300 ${
                        isLight ? 'text-neutral-800 hover:text-black' : 'text-neutral-200 hover:text-white'
                      }`}
                    >
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between pt-1">
                      <span className={`font-serif text-[11px] md:text-xs ${getGoldColor()}`}>
                        ${p.price.toLocaleString()}
                      </span>
                      <button 
                        onClick={() => onSelectProduct(p)}
                        className={`text-[9px] font-sans font-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer ${
                          isLight ? 'text-neutral-500 hover:text-black' : 'text-neutral-400 hover:text-white'
                        }`}
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
