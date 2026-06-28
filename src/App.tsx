import React, { useState, useEffect } from 'react';
import { NavbarTheme, GoldStyle, LogoAlign, HighlightStyle, CartItem, WishlistItem } from './types';
import AnnouncementBar from './components/AnnouncementBar';
import LuxuryNavbar from './components/LuxuryNavbar';
import SearchDrawer from './components/SearchDrawer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import InteractiveShowcase from './components/InteractiveShowcase';

const LUXURY_CATALOG = [
  { id: 'item-1', name: 'Maison Silk Slip Dress', price: 890, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=300&auto=format&fit=crop', inStock: true },
  { id: 'item-2', name: 'Sovereign Cashmere Overcoat', price: 2450, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop', inStock: true },
  { id: 'item-3', name: 'Monarch Linen Tailored Blazer', price: 1250, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300&auto=format&fit=crop', inStock: true },
  { id: 'item-4', name: 'Signature Calfskin Chelsea Boots', price: 950, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=300&auto=format&fit=crop', inStock: true },
  { id: 'item-5', name: '18K Aurelia Initial Signet Ring', price: 1800, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300&auto=format&fit=crop', inStock: true },
  { id: 'item-6', name: 'Classic Gold Leaf Silk Scarf', price: 380, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop', inStock: true },
];

export default function App() {
  // Navigation & theme states
  const [theme, setTheme] = useState<NavbarTheme>('dark');
  const [goldStyle, setGoldStyle] = useState<GoldStyle>('classic');
  const [logoAlign, setLogoAlign] = useState<LogoAlign>('center');
  const [highlightStyle, setHighlightStyle] = useState<HighlightStyle>('underline');
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);
  const [simulatedScroll, setSimulatedScroll] = useState(false);

  // Drawer modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Bag and Wishlist items states (Prepopulated with 1 premium item for tactile demonstration)
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'item-1',
      name: 'Maison Silk Slip Dress',
      price: 890,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=300&auto=format&fit=crop',
      quantity: 1,
      size: 'S'
    }
  ]);

  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: 'item-3',
      name: 'Monarch Linen Tailored Blazer',
      price: 1250,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300&auto=format&fit=crop',
      inStock: true
    }
  ]);

  // Sync simulated scroll to window scroll position for full-viewport effect
  useEffect(() => {
    if (simulatedScroll) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [simulatedScroll]);

  // Cart operations
  const handleAddToCart = (item: { id: string; name: string; price: number; image: string }) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === item.id);
      if (existing) {
        return prevCart.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [
        ...prevCart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
          size: 'M', // default size
        },
      ];
    });
    // Open cart drawer immediately to provide elite feedback
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Wishlist operations
  const handleAddToWishlist = (item: { id: string; name: string; price: number; image: string }) => {
    setWishlist((prevWish) => {
      const exists = prevWish.some((w) => w.id === item.id);
      if (exists) return prevWish; // Already wishlisted
      return [
        ...prevWish,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          inStock: true,
        },
      ];
    });
    // Open wishlist drawer immediately to show dynamic entry
    setIsWishlistOpen(true);
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist((prevWish) => prevWish.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (item: WishlistItem) => {
    // 1. Remove from Wishlist
    handleRemoveFromWishlist(item.id);
    // 2. Add to Cart
    handleAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  // Quick sandbox adder
  const handleAddMockItem = (type: 'cart' | 'wishlist', itemId: string) => {
    const catalogItem = LUXURY_CATALOG.find((x) => x.id === itemId);
    if (!catalogItem) return;

    if (type === 'cart') {
      handleAddToCart(catalogItem);
    } else {
      handleAddToWishlist(catalogItem);
    }
  };

  const handleClearAll = () => {
    setCart([]);
    setWishlist([]);
  };

  // Total cart quantities
  const totalCartCount = cart.reduce((acc, c) => acc + c.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <div
      id="app-root-container"
      className={`min-h-screen transition-all duration-700 ease-in-out font-sans ${
        theme === 'light' 
          ? 'bg-[#faf9f6] text-neutral-950' 
          : 'bg-[#050505] text-white'
      }`}
    >
      {/* 1. Scrolling Luxury Announcement Bar */}
      <AnnouncementBar goldStyle={goldStyle} isEnabled={announcementEnabled} />

      {/* 2. Primary Luxury Responsive Navigation Bar */}
      <LuxuryNavbar
        theme={theme}
        goldStyle={goldStyle}
        logoAlign={logoAlign}
        highlightStyle={highlightStyle}
        cartCount={totalCartCount}
        wishlistCount={wishlistCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Spacer representing actual page layout */}
      <div className="h-6" />

      {/* 3. Interactive Showcase Studio */}
      <InteractiveShowcase
        theme={theme}
        setTheme={setTheme}
        goldStyle={goldStyle}
        setGoldStyle={setGoldStyle}
        logoAlign={logoAlign}
        setLogoAlign={setLogoAlign}
        highlightStyle={highlightStyle}
        setHighlightStyle={setHighlightStyle}
        onAddMockItem={handleAddMockItem}
        onClearAll={handleClearAll}
        announcementEnabled={announcementEnabled}
        setAnnouncementEnabled={setAnnouncementEnabled}
        simulatedScroll={simulatedScroll}
        setSimulatedScroll={setSimulatedScroll}
      />

      {/* 4. Functional Drawer overlays */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        goldStyle={goldStyle}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        goldStyle={goldStyle}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
        goldStyle={goldStyle}
      />
    </div>
  );
}
