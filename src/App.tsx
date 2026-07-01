import React, { useState, useEffect, useRef } from 'react';
import { NavbarTheme, GoldStyle, LogoAlign, HighlightStyle, CartItem, WishlistItem } from './types';
import AnnouncementBar from './components/AnnouncementBar';
import LuxuryNavbar from './components/LuxuryNavbar';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import ShopByCategory from './components/ShopByCategory';
import NewArrivals from './components/NewArrivals';
import WhyShopWithUs from './components/WhyShopWithUs';
import CustomerReviews from './components/CustomerReviews';
import InstagramGallery from './components/InstagramGallery';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import SearchDrawer from './components/SearchDrawer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import InteractiveShowcase from './components/InteractiveShowcase';
import ShopPage, { Product, SHOP_PRODUCTS } from './components/ShopPage';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import ContactPage from './components/ContactPage';

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
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'details' | 'cart' | 'wishlist' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Keep track of scroll positions for each page
  const scrollPositionsRef = useRef<Record<string, number>>({});

  // Refs to prevent stale closures in history listeners
  const currentPageRef = useRef(currentPage);
  const selectedProductRef = useRef(selectedProduct);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    selectedProductRef.current = selectedProduct;
  }, [selectedProduct]);

  // Replace initial state on load to have correct structure
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ page: 'home', productId: null, category: null }, '');
    }
  }, []);

  // Handle navigation from internal items or navbar
  const handleNavigate = (
    page: 'home' | 'shop' | 'details' | 'cart' | 'wishlist' | 'contact',
    category?: string | null,
    product?: Product | null,
    isPopState = false
  ) => {
    // 1. Save scroll position of the page we are leaving (unless it's popstate back/forward, which is already saved)
    if (!isPopState) {
      scrollPositionsRef.current[currentPageRef.current] = window.scrollY;
    }

    setCurrentPage(page);
    setSelectedCategory(category || null);
    
    if (product) {
      setSelectedProduct(product);
    } else if (page !== 'details' && page !== 'cart' && page !== 'wishlist') {
      setSelectedProduct(null);
    }

    // 2. Manage browser history state
    if (!isPopState) {
      const stateObj = {
        page,
        productId: product?.id || (page === 'details' ? selectedProductRef.current?.id : null),
        category: category || null
      };
      window.history.pushState(stateObj, '');
    }

    // 3. Restore or smooth scroll
    const targetScroll = scrollPositionsRef.current[page] || 0;
    setTimeout(() => {
      window.scrollTo({
        top: targetScroll,
        behavior: isPopState ? 'auto' : 'smooth'
      });
    }, 40);
  };

  // Handle browser back / forward navigation (PopState)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state) {
        const matchedProduct = state.productId ? SHOP_PRODUCTS.find(p => p.id === state.productId) : null;
        handleNavigate(state.page, state.category, matchedProduct, true);
      } else {
        // Fallback to home
        handleNavigate('home', null, null, true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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
  const handleAddToCart = (item: { id: string; name: string; price: number; image: string; size?: string; color?: string }) => {
    setCart((prevCart) => {
      const targetSize = item.size || 'M';
      const targetColor = item.color || 'Noir';
      const existing = prevCart.find((c) => c.id === item.id && c.size === targetSize && (c.color || 'Noir') === targetColor);
      if (existing) {
        return prevCart.map((c) => (c.id === item.id && c.size === targetSize && (c.color || 'Noir') === targetColor ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [
        ...prevCart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
          size: targetSize,
          color: targetColor,
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

  const handleMoveToCart = (item: WishlistItem & { size?: string; color?: string }) => {
    // 1. Remove from Wishlist
    handleRemoveFromWishlist(item.id);
    // 2. Add to Cart
    handleAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: item.size,
      color: item.color,
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
        onOpenCart={() => handleNavigate('cart')}
        onOpenWishlist={() => handleNavigate('wishlist')}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {currentPage === 'home' ? (
        <>
          {/* 3. Luxury Premium Full-screen Hero Section */}
          <HeroSection
            goldStyle={goldStyle}
            onShopClick={() => handleNavigate('shop')}
            onExploreClick={() => {
              const featured = document.getElementById('featured-products-section');
              featured?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 4. Featured Couture Products Section */}
          <FeaturedProducts
            goldStyle={goldStyle}
            wishlistIds={wishlist.map((item) => item.id)}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onProductClick={(p) => {
              const fullProd = SHOP_PRODUCTS.find((x) => x.id === p.id || x.name === p.name) || SHOP_PRODUCTS[0];
              handleNavigate('details', null, fullProd);
            }}
          />

          {/* New Arrivals Section */}
          <NewArrivals
            goldStyle={goldStyle}
            wishlistIds={wishlist.map((item) => item.id)}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onProductClick={(p) => {
              const fullProd = SHOP_PRODUCTS.find((x) => x.id === p.id || x.name === p.name) || SHOP_PRODUCTS[0];
              handleNavigate('details', null, fullProd);
            }}
          />

          {/* 5. Shop By Category Section */}
          <ShopByCategory
            goldStyle={goldStyle}
            onCategoryClick={(categoryName) => handleNavigate('shop', categoryName)}
          />

          {/* Customer Reviews Section */}
          <CustomerReviews goldStyle={goldStyle} />

          {/* Premium Newsletter Section */}
          <Newsletter goldStyle={goldStyle} />
        </>
      ) : currentPage === 'shop' ? (
        <ShopPage
          goldStyle={goldStyle}
          initialCategory={selectedCategory}
          wishlistIds={wishlist.map((item) => item.id)}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onBackToHome={() => handleNavigate('home')}
          onProductClick={(p) => {
            handleNavigate('details', null, p);
          }}
        />
      ) : currentPage === 'cart' ? (
        <CartPage
          goldStyle={goldStyle}
          cartItems={cart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onBackToShop={() => handleNavigate('shop')}
          onClearCart={() => setCart([])}
          onProductClick={(p) => {
            handleNavigate('details', null, p);
          }}
        />
      ) : currentPage === 'wishlist' ? (
        <WishlistPage
          goldStyle={goldStyle}
          wishlistItems={wishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onMoveToCart={handleMoveToCart}
          onBackToShop={() => handleNavigate('shop')}
          onProductClick={(p) => {
            handleNavigate('details', null, p);
          }}
          onClearWishlist={() => setWishlist([])}
        />
      ) : currentPage === 'contact' ? (
        <ContactPage
          goldStyle={goldStyle}
          onBackToHome={() => handleNavigate('home')}
          onBackToShop={() => handleNavigate('shop')}
        />
      ) : (
        <ProductDetails
          goldStyle={goldStyle}
          product={selectedProduct || SHOP_PRODUCTS[0]}
          wishlistIds={wishlist.map((item) => item.id)}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onBack={() => handleNavigate('shop')}
          onSelectProduct={(p) => {
            const fullProd = SHOP_PRODUCTS.find((x) => x.id === p.id || x.name === p.name) || p;
            handleNavigate('details', null, fullProd);
          }}
        />
      )}

      {/* Premium Footer Section */}
      <Footer goldStyle={goldStyle} onNavigate={handleNavigate} />



      {/* 4. Functional Drawer overlays */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        goldStyle={goldStyle}
        onAddToCart={handleAddToCart}
        onProductClick={(p) => {
          const fullProd = SHOP_PRODUCTS.find((x) => x.id === p.id || x.name === p.name) || p;
          handleNavigate('details', null, fullProd);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        goldStyle={goldStyle}
        onViewCartPage={() => handleNavigate('cart')}
        onProductClick={(p) => {
          const fullProd = SHOP_PRODUCTS.find((x) => x.id === p.id || x.name === p.name) || p;
          handleNavigate('details', null, fullProd);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
        goldStyle={goldStyle}
        onViewWishlistPage={() => handleNavigate('wishlist')}
        onProductClick={(p) => {
          const fullProd = SHOP_PRODUCTS.find((x) => x.id === p.id || x.name === p.name) || p;
          handleNavigate('details', null, fullProd);
        }}
      />
    </div>
  );
}
