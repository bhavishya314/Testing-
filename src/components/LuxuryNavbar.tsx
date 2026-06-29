import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles, User, MapPin } from 'lucide-react';
import { NavbarTheme, GoldStyle, LogoAlign, HighlightStyle } from '../types';

interface LuxuryNavbarProps {
  theme: NavbarTheme;
  goldStyle: GoldStyle;
  logoAlign: LogoAlign;
  highlightStyle: HighlightStyle;
  cartCount: number;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  currentPage?: 'home' | 'shop';
  onNavigate?: (page: 'home' | 'shop', category?: string | null) => void;
}

const MENU_ITEMS = [
  { name: 'Home', hasDropdown: false },
  { 
    name: 'Shop', 
    hasDropdown: true,
    dropdownItems: [
      { title: 'The Cruise Collection', desc: 'Summer linens, resort silks & tailored swim', highlight: true },
      { title: 'Ready-to-Wear', desc: 'Fine Italian cashmere, silk slips & tailored outerwear' },
      { title: 'Haute Couture', desc: 'Bespoke, hand-crafted masterpieces' },
      { title: 'Fine Accessories', desc: 'Signature calfskin bags, silk scarves & fine jewel' },
    ]
  },
  { 
    name: 'About', 
    hasDropdown: true,
    dropdownItems: [
      { title: 'Maison Heritage', desc: 'A legacy of fine tailoring founded in 1924' },
      { title: 'Ateliers & Craft', desc: 'Sourcing organic wools & sustainable silks' },
      { title: 'Our Salons', desc: 'Visit our physical salons in Paris, Milan & Tokyo' },
    ]
  },
  { name: 'Contact', hasDropdown: false }
];

export default function LuxuryNavbar({
  theme,
  goldStyle,
  logoAlign,
  highlightStyle,
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  currentPage = 'home',
  onNavigate,
}: LuxuryNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Monitor scroll height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gold color values
  const getGoldColor = () => {
    if (goldStyle === 'champagne') return 'text-[#dfba73]';
    if (goldStyle === 'bright') return 'text-[#ffd700]';
    return 'text-[#c5a880]'; // classic
  };

  const getGoldHoverColor = () => {
    if (goldStyle === 'champagne') return 'hover:text-[#dfba73]';
    if (goldStyle === 'bright') return 'hover:text-[#ffd700]';
    return 'hover:text-[#c5a880]'; // classic
  };

  const getGoldBg = () => {
    if (goldStyle === 'champagne') return 'bg-[#dfba73]';
    if (goldStyle === 'bright') return 'bg-[#ffd700]';
    return 'bg-[#c5a880]'; // classic
  };

  const getGoldBorder = () => {
    if (goldStyle === 'champagne') return 'border-[#dfba73]';
    if (goldStyle === 'bright') return 'border-[#ffd700]';
    return 'border-[#c5a880]'; // classic
  };

  // Theme-based style classes
  const getNavbarStyles = () => {
    const isFloating = isScrolled;
    
    if (theme === 'dark') {
      return {
        bg: isFloating ? 'bg-[#0a0a0ae6] border-b border-neutral-900 shadow-2xl backdrop-blur-md' : 'bg-[#0a0a0a] border-b border-transparent',
        text: 'text-neutral-300',
        activeText: 'text-white',
        border: 'border-neutral-900',
      };
    } else if (theme === 'glass') {
      return {
        bg: isFloating 
          ? 'bg-black/40 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl' 
          : 'bg-black/10 border-b border-transparent backdrop-blur-sm',
        text: 'text-neutral-200',
        activeText: 'text-white',
        border: 'border-white/10',
      };
    } else { // light
      return {
        bg: isFloating ? 'bg-white/95 border-b border-neutral-100 shadow-md backdrop-blur-md' : 'bg-white border-b border-transparent',
        text: 'text-neutral-700',
        activeText: 'text-black',
        border: 'border-neutral-100',
      };
    }
  };

  const styles = getNavbarStyles();

  // Handle active highlight animation
  const renderHighlight = (itemName: string) => {
    const isHovered = hoveredItem === itemName;
    if (!isHovered) return null;

    if (highlightStyle === 'underline') {
      return (
        <motion.div
          layoutId="nav-highlight"
          className={`absolute bottom-[-18px] left-0 right-0 h-[1.5px] rounded-full ${getGoldBg()}`}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      );
    }

    if (highlightStyle === 'dot') {
      return (
        <motion.div
          layoutId="nav-highlight"
          className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${getGoldBg()}`}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      );
    }

    if (highlightStyle === 'minimal-glow') {
      return (
        <motion.div
          layoutId="nav-highlight"
          className="absolute inset-0 -z-10 rounded-md bg-neutral-950/5 dark:bg-white/5 backdrop-blur-sm"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      );
    }

    return null; // For 'gold-text', CSS color class handles it
  };

  return (
    <>
      <nav
        id="luxury-navbar"
        className={`sticky top-0 z-40 w-full transition-all duration-500 ease-out py-4 md:py-5 ${styles.bg}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Main Flex Grid Wrapper */}
          <div className="flex items-center justify-between relative h-10">
            
            {/* 1. Hamburger (Mobile only) - ALWAYS Left */}
            <div className="flex md:hidden shrink-0">
              <button
                id="mobile-menu-trigger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 -ml-2 rounded-full transition-colors duration-300 hover:bg-white/5 ${styles.text}`}
                aria-label="Toggle navigation menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* 2. Left Aligned Layout */}
            {logoAlign === 'left' && (
              <div className="hidden md:flex items-center gap-10">
                {/* Logo */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.('home');
                  }}
                  className={`font-serif tracking-[0.25em] text-2xl font-bold transition-all duration-300 flex flex-col justify-center select-none ${getGoldColor()}`}
                >
                  <span>AURELIA</span>
                  <span className="font-sans text-[6px] tracking-[0.55em] text-neutral-400 font-light mt-0.5 uppercase text-center">
                    Maison d'Élégance
                  </span>
                </a>

                {/* Navigation Menu Links */}
                <div className="flex items-center gap-8">
                  {MENU_ITEMS.map((item) => (
                    <div
                      key={item.name}
                      className="relative py-2"
                      onMouseEnter={() => {
                        setHoveredItem(item.name);
                        if (item.hasDropdown) setActiveDropdown(item.name);
                      }}
                      onMouseLeave={() => {
                        setHoveredItem(null);
                        setActiveDropdown(null);
                      }}
                    >
                      <button
                        id={`nav-link-${item.name.toLowerCase()}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.name === 'Home') onNavigate?.('home');
                          else if (item.name === 'Shop') onNavigate?.('shop');
                        }}
                        className={`font-sans text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                          hoveredItem === item.name || (item.name === 'Home' && currentPage === 'home') || (item.name === 'Shop' && currentPage === 'shop')
                            ? (highlightStyle === 'gold-text' ? getGoldColor() : styles.activeText)
                            : styles.text
                        }`}
                      >
                        {item.name}
                        {item.hasDropdown && (
                          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : 'rotate-0'}`} />
                        )}
                      </button>

                      {renderHighlight(item.name)}

                      {/* Dropdown Menu Overlay */}
                      {item.hasDropdown && (
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              id={`dropdown-${item.name.toLowerCase()}`}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                              className="absolute top-full left-[-20px] mt-4 w-72 bg-[#0d0d0df5] border border-neutral-900 rounded-lg p-5 shadow-2xl backdrop-blur-xl z-50 text-white"
                            >
                              <div className="space-y-4">
                                <h4 className={`font-serif text-[10px] tracking-[0.3em] uppercase pb-2 border-b border-neutral-900 flex items-center gap-2 ${getGoldColor()}`}>
                                  <Sparkles className="w-3 h-3" />
                                  {item.name} COLLECTIONS
                                </h4>
                                <div className="space-y-3">
                                  {item.dropdownItems?.map((drop) => (
                                    <div
                                      key={drop.title}
                                      onClick={() => {
                                        setActiveDropdown(null);
                                        if (item.name === 'Shop') {
                                          onNavigate?.('shop', drop.title);
                                        }
                                      }}
                                      className="group/item cursor-pointer p-2 rounded hover:bg-white/5 transition-all duration-300"
                                    >
                                      <div className="flex items-center gap-1.5">
                                        <h5 className="font-sans text-[11px] tracking-wider uppercase font-semibold text-neutral-200 group-hover/item:text-white transition-colors">
                                          {drop.title}
                                        </h5>
                                        {('highlight' in drop) && (
                                          <span className={`text-[7px] font-sans font-bold tracking-widest px-1.5 py-0.5 rounded-full uppercase scale-90 shrink-0 ${getGoldBg()} text-black`}>
                                            New
                                          </span>
                                        )}
                                      </div>
                                      <p className="font-sans text-[10px] text-neutral-400 group-hover/item:text-neutral-300 leading-normal mt-0.5">
                                        {drop.desc}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Center Aligned Layout */}
            {logoAlign === 'center' && (
              <div className="hidden md:flex items-center gap-8 absolute left-0">
                {MENU_ITEMS.map((item) => (
                  <div
                    key={item.name}
                    className="relative py-2"
                    onMouseEnter={() => {
                      setHoveredItem(item.name);
                      if (item.hasDropdown) setActiveDropdown(item.name);
                    }}
                    onMouseLeave={() => {
                      setHoveredItem(null);
                      setActiveDropdown(null);
                    }}
                  >
                    <button
                      id={`nav-link-${item.name.toLowerCase()}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.name === 'Home') onNavigate?.('home');
                        else if (item.name === 'Shop') onNavigate?.('shop');
                      }}
                      className={`font-sans text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                        hoveredItem === item.name || (item.name === 'Home' && currentPage === 'home') || (item.name === 'Shop' && currentPage === 'shop')
                          ? (highlightStyle === 'gold-text' ? getGoldColor() : styles.activeText)
                          : styles.text
                      }`}
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : 'rotate-0'}`} />
                      )}
                    </button>

                    {renderHighlight(item.name)}

                    {/* Dropdown Menu Overlay */}
                    {item.hasDropdown && (
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            id={`dropdown-${item.name.toLowerCase()}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="absolute top-full left-[-20px] mt-4 w-72 bg-[#0d0d0df5] border border-neutral-900 rounded-lg p-5 shadow-2xl backdrop-blur-xl z-50 text-white"
                          >
                            <div className="space-y-4">
                              <h4 className={`font-serif text-[10px] tracking-[0.3em] uppercase pb-2 border-b border-neutral-900 flex items-center gap-2 ${getGoldColor()}`}>
                                <Sparkles className="w-3 h-3" />
                                {item.name} COLLECTIONS
                              </h4>
                              <div className="space-y-3">
                                {item.dropdownItems?.map((drop) => (
                                  <div
                                    key={drop.title}
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      if (item.name === 'Shop') {
                                        onNavigate?.('shop', drop.title);
                                      }
                                    }}
                                    className="group/item cursor-pointer p-2 rounded hover:bg-white/5 transition-all duration-300"
                                  >
                                    <div className="flex items-center gap-1.5">
                                      <h5 className="font-sans text-[11px] tracking-wider uppercase font-semibold text-neutral-200 group-hover/item:text-white transition-colors">
                                        {drop.title}
                                      </h5>
                                      {('highlight' in drop) && (
                                        <span className={`text-[7px] font-sans font-bold tracking-widest px-1.5 py-0.5 rounded-full uppercase scale-90 shrink-0 ${getGoldBg()} text-black`}>
                                          New
                                        </span>
                                      )}
                                    </div>
                                    <p className="font-sans text-[10px] text-neutral-400 group-hover/item:text-neutral-300 leading-normal mt-0.5">
                                      {drop.desc}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 4. Logo - Center Aligned Mode */}
            {logoAlign === 'center' && (
              <div className="absolute left-1/2 -translate-x-1/2 flex justify-center">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.('home');
                  }}
                  className={`font-serif tracking-[0.25em] text-2xl font-bold transition-all duration-300 flex flex-col justify-center select-none ${getGoldColor()}`}
                >
                  <span>AURELIA</span>
                  <span className="font-sans text-[6px] tracking-[0.55em] text-neutral-400 font-light mt-0.5 uppercase text-center">
                    Maison d'Élégance
                  </span>
                </a>
              </div>
            )}

            {/* 5. Logo - Fallback/Responsive for Mobile Center */}
            {logoAlign === 'left' && (
              <div className="flex md:hidden absolute left-1/2 -translate-x-1/2 justify-center">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.('home');
                  }}
                  className={`font-serif tracking-[0.25em] text-xl font-bold transition-all duration-300 flex flex-col justify-center select-none ${getGoldColor()}`}
                >
                  <span>AURELIA</span>
                </a>
              </div>
            )}

            {/* 6. Utility Icons - ALWAYS Right */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              
              {/* Optional Boutique Info Icon */}
              <div className="hidden lg:flex items-center gap-1.5 pr-2 border-r border-neutral-900/10 dark:border-white/5 mr-2">
                <MapPin className={`w-3.5 h-3.5 ${getGoldColor()}`} />
                <span className={`font-sans text-[9px] tracking-widest text-neutral-400 font-light uppercase`}>
                  Paris Salon
                </span>
              </div>

              {/* Search Icon */}
              <button
                id="search-trigger"
                onClick={onOpenSearch}
                className={`p-2 rounded-full transition-all duration-300 hover:bg-neutral-950/5 dark:hover:bg-white/5 group relative ${styles.text}`}
                aria-label="Search"
              >
                <Search className={`w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110 ${getGoldHoverColor()}`} />
              </button>

              {/* Wishlist Icon */}
              <button
                id="wishlist-trigger"
                onClick={onOpenWishlist}
                className={`p-2 rounded-full transition-all duration-300 hover:bg-neutral-950/5 dark:hover:bg-white/5 group relative ${styles.text}`}
                aria-label="Wishlist"
              >
                <Heart className={`w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110 ${getGoldHoverColor()}`} />
                {wishlistCount > 0 && (
                  <motion.span
                    id="wishlist-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute top-0.5 right-0.5 min-w-[15px] h-[15px] text-[8px] font-sans font-extrabold flex items-center justify-center rounded-full text-black shadow-lg ${getGoldBg()}`}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </button>

              {/* Cart Icon */}
              <button
                id="cart-trigger"
                onClick={onOpenCart}
                className={`p-2 rounded-full transition-all duration-300 hover:bg-neutral-950/5 dark:hover:bg-white/5 group relative ${styles.text}`}
                aria-label="Shopping Cart"
              >
                <ShoppingBag className={`w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110 ${getGoldHoverColor()}`} />
                {cartCount > 0 && (
                  <motion.span
                    id="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute top-0.5 right-0.5 min-w-[15px] h-[15px] text-[8px] font-sans font-extrabold flex items-center justify-center rounded-full text-black shadow-lg ${getGoldBg()}`}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* 7. Responsive Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-x-0 top-[60px] z-30 md:hidden bg-[#0a0a0afb] border-b border-neutral-900 text-white flex flex-col backdrop-blur-2xl shadow-2xl overflow-hidden`}
          >
            <div className="px-6 py-8 space-y-6">
              
              {/* Luxury Accent */}
              <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
                <Sparkles className={`w-3.5 h-3.5 ${getGoldColor()}`} />
                <span className="font-serif text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
                  AURELIA Digital Atelier
                </span>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-4">
                {MENU_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        if (item.name === 'Home') onNavigate?.('home');
                        else if (item.name === 'Shop') onNavigate?.('shop');
                      }}
                      className={`font-serif text-lg tracking-widest uppercase transition-all duration-300 flex items-center justify-between ${getGoldHoverColor()}`}
                    >
                      <span>{item.name}</span>
                      <span className="font-sans text-[9px] tracking-normal text-neutral-500 uppercase group-hover:text-white transition-colors">
                        {item.hasDropdown ? 'Explore' : 'Go'} →
                      </span>
                    </a>
                    {item.hasDropdown && (
                      <div className="pl-4 mt-2 border-l border-neutral-900 space-y-2">
                        {item.dropdownItems?.slice(0, 3).map((sub, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              if (item.name === 'Shop') {
                                onNavigate?.('shop', sub.title);
                              }
                            }}
                            className="text-xs text-neutral-400 font-sans font-light hover:text-white transition-colors cursor-pointer"
                          >
                            {sub.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Additional Services */}
              <div className="pt-6 border-t border-neutral-900 flex flex-col gap-3 font-sans text-xs">
                <div className="flex items-center gap-3 text-neutral-400">
                  <User className="w-4 h-4" />
                  <span>My Maison Account</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <MapPin className="w-4 h-4" />
                  <span>Find Nearest Salon (Paris, Milan, NY)</span>
                </div>
              </div>

              {/* Promo Banner inside Mobile Menu */}
              <div className="p-4 rounded border border-neutral-900 bg-neutral-950 text-center">
                <p className="font-serif text-[10px] tracking-widest text-[#dfba73] uppercase mb-1">
                  Complimentary Signature Casing
                </p>
                <p className="font-sans text-[10px] text-neutral-500">
                  All bespoke knitwear and premium accessories ship in silk bags.
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
