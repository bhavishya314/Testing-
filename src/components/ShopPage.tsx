import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, Eye, ShoppingBag, X, SlidersHorizontal, Search, RotateCcw, ChevronDown, Check, ArrowRight, Sparkles } from 'lucide-react';
import { GoldStyle } from '../types';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: 'NEW' | 'SALE' | 'LIMITED' | 'BESTSELLER';
  rating: number;
  reviews: number;
  description: string;
  sizes: string[];
  details: string[];
  gender: 'Women' | 'Men' | 'Unisex';
  type: 'Dress' | 'Overcoat' | 'Blazer' | 'Boots' | 'Ring' | 'Scarf' | 'Gown' | 'Trench' | 'Shirt' | 'Shorts' | 'Bag' | 'Aviators' | 'Vest' | 'Trouser' | 'Blouse' | 'Loafers' | 'Choker' | 'Jacket' | 'Kaftan' | 'Tote' | 'Hat' | 'Duffle' | 'Hoodie' | 'T-Shirt' | 'Sneakers';
}

const SHOP_PRODUCTS: Product[] = [
  {
    id: 'shop-1',
    name: 'Maison Silk Slip Dress',
    category: 'Ready-to-Wear',
    price: 890,
    originalPrice: 1100,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
    badge: 'SALE',
    rating: 5,
    reviews: 28,
    description: 'A flawless bias-cut garment in organic Mulberry silk. Flows like water, feels like a gentle breeze.',
    sizes: ['XS', 'S', 'M', 'L'],
    details: ['100% Organic Mulberry Silk', 'Bias-cut drape silhouette', 'Hand-stitched hems', 'Made in Italy'],
    gender: 'Women',
    type: 'Dress'
  },
  {
    id: 'shop-2',
    name: 'Sovereign Cashmere Overcoat',
    category: 'Ready-to-Wear',
    price: 2450,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
    badge: 'BESTSELLER',
    rating: 5,
    reviews: 42,
    description: 'Double-faced premium Italian cashmere coat offering warmth with absolute structural lightweight luxury.',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['100% Italian Cashmere', 'Double-faced weight structure', 'Bespoke horn buttons', 'Hand-tailored in Milan'],
    gender: 'Unisex',
    type: 'Overcoat'
  },
  {
    id: 'shop-3',
    name: 'Monarch Linen Tailored Blazer',
    category: 'Ready-to-Wear',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    badge: 'NEW',
    rating: 5,
    reviews: 19,
    description: 'Tailored from pure Irish linen, this structured blazer carries a crisp shoulder and clean breathability.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: ['100% Authentic Irish Linen', 'Crisp structured padded shoulder', 'Silk jacquard lining', 'Double-vent rear design'],
    gender: 'Men',
    type: 'Blazer'
  },
  {
    id: 'shop-4',
    name: 'Signature Calfskin Chelsea Boots',
    category: 'Accessories',
    price: 950,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop',
    badge: 'BESTSELLER',
    rating: 5,
    reviews: 37,
    description: 'Hand-burnished Italian calfskin leather with a Goodyear-welted durable sole, custom-crafted in Florence.',
    sizes: ['38', '39', '40', '41', '42', '43'],
    details: ['Hand-burnished Calfskin Leather', 'Goodyear-welted sole construction', 'Custom elastic inserts', 'Crafted in Florence, Italy'],
    gender: 'Unisex',
    type: 'Boots'
  },
  {
    id: 'shop-5',
    name: '18K Aurelia Initial Signet Ring',
    category: 'Accessories',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    badge: 'LIMITED',
    rating: 5,
    reviews: 12,
    description: 'Solid 18K gold hand-engraved by true master goldsmiths. Rich deep golden tone.',
    sizes: ['6', '7', '8', '9', '10'],
    details: ['Solid 18K Gold', 'Hand-engraved initials', 'Polished mirror finish', 'Includes certificate of origin'],
    gender: 'Unisex',
    type: 'Ring'
  },
  {
    id: 'shop-6',
    name: 'Classic Gold Leaf Silk Scarf',
    category: 'Accessories',
    price: 380,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
    badge: 'NEW',
    rating: 5,
    reviews: 24,
    description: 'Gilded leaf pattern printed meticulously on exquisite silk twill with hand-rolled edges.',
    sizes: ['One Size'],
    details: ['100% Silk Twill', 'Hand-rolled edges', '24K gold foil print infusion', '90cm x 90cm square'],
    gender: 'Women',
    type: 'Scarf'
  },
  {
    id: 'shop-7',
    name: 'Empress Velvet Gown',
    category: 'Haute Couture',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop',
    badge: 'LIMITED',
    rating: 5,
    reviews: 8,
    description: 'A sculptural silk-velvet masterwork with a structured corset bodice and an elegant floor-sweeping train.',
    sizes: ['XS', 'S', 'M', 'L'],
    details: ['Silk-velvet premium blend', 'Structured internal steel boning', 'Invisible side zipper closure', 'Handmade in Paris'],
    gender: 'Women',
    type: 'Gown'
  },
  {
    id: 'shop-8',
    name: 'Imperator Leather Trench Coat',
    category: 'Haute Couture',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop',
    badge: 'LIMITED',
    rating: 5,
    reviews: 11,
    description: 'Full-grain glove-tanned lambskin trench coat, featuring gold-plated hardwares.',
    sizes: ['S', 'M', 'L'],
    details: ['Glove-tanned full grain lambskin', '24K Gold-plated brass hardware', 'Detachable waist belt', 'Silk satin interior lining'],
    gender: 'Unisex',
    type: 'Trench'
  },
  {
    id: 'shop-9',
    name: 'Classic Riviera Linen Shirt',
    category: 'Cruise Collection',
    price: 450,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
    badge: 'NEW',
    rating: 5,
    reviews: 15,
    description: 'An exceptionally breathable linen shirt styled with a classic camp collar for luxury travel.',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['100% French linen', 'Authentic mother of pearl buttons', 'Relaxed resort fit', 'Pre-washed for ultimate softness'],
    gender: 'Men',
    type: 'Shirt'
  },
  {
    id: 'shop-10',
    name: 'Aurelia Silk Resort Shorts',
    category: 'Cruise Collection',
    price: 520,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop',
    badge: 'NEW',
    rating: 5,
    reviews: 14,
    description: 'Luxurious silk knit lounge shorts with tailored side pockets and a subtle gold leaf print.',
    sizes: ['S', 'M', 'L'],
    details: ['90% Mulberry Silk, 10% Lycra', 'Drawstring waist with gold aglets', 'Seamless pockets', 'Relaxed tailored hem'],
    gender: 'Unisex',
    type: 'Shorts'
  },
  {
    id: 'shop-11',
    name: 'Maison Croco Duffle Bag',
    category: 'Accessories',
    price: 3400,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop',
    badge: 'LIMITED',
    rating: 5,
    reviews: 10,
    description: 'Exquisite alligator-embossed calfskin bag with a hand-stitched leather handle.',
    sizes: ['One Size'],
    details: ['Crocodile-embossed leather', 'Bespoke hand-stitching', 'Removable shoulder strap', 'Suede lining'],
    gender: 'Unisex',
    type: 'Bag'
  },
  {
    id: 'shop-12',
    name: 'Bespoke Gold-Plated Aviators',
    category: 'Accessories',
    price: 680,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
    badge: 'BESTSELLER',
    rating: 5,
    reviews: 25,
    description: 'Titanium aviators plated in 18K yellow gold with high-contrast polarized lenses.',
    sizes: ['One Size'],
    details: ['Pure Japanese Titanium frames', '18K Gold-plated accents', 'Anti-reflective polarized lenses', 'Leather hard case included'],
    gender: 'Unisex',
    type: 'Aviators'
  },
  {
    id: 'shop-13',
    name: 'Elysian Cashmere Knit Vest',
    category: 'Ready-to-Wear',
    price: 790,
    originalPrice: 950,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
    badge: 'SALE',
    rating: 5,
    reviews: 22,
    description: 'Finely knit cashmere blend vest with structured ribbed trims and a modern v-neck silhouette.',
    sizes: ['XS', 'S', 'M', 'L'],
    details: ['70% Cashmere, 30% Mulberry Silk', 'Fine 12-gauge knit construction', 'Hand-washed styling', 'Breathable cozy comfort'],
    gender: 'Women',
    type: 'Vest'
  },
  {
    id: 'shop-14',
    name: 'Sartorial Linen Trouser',
    category: 'Ready-to-Wear',
    price: 650,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop',
    badge: 'NEW',
    rating: 5,
    reviews: 16,
    description: 'Wide-leg tailored trousers cut from structured high-weight linen. Sleek hook-and-bar waistband.',
    sizes: ['36', '38', '40', '42', '44'],
    details: ['100% High-weight European Linen', 'Unfinished hems for custom tailoring', 'Slanted front pockets', 'Made in Portugal'],
    gender: 'Women',
    type: 'Trouser'
  },
  {
    id: 'shop-15',
    name: 'Aurelia Silk Wrap Blouse',
    category: 'Ready-to-Wear',
    price: 720,
    image: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=600&auto=format&fit=crop',
    badge: 'BESTSELLER',
    rating: 5,
    reviews: 31,
    description: 'Lustrous heavy silk satin blouse with an adjustable wrap sash and elegant buttoned cuffs.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: ['100% Heavy Silk Satin', 'Adjustable wrap tie closure', 'Gathered details at shoulders', 'Gold-rimmed pearl buttons'],
    gender: 'Women',
    type: 'Blouse'
  },
  {
    id: 'shop-16',
    name: 'Monarch Gold-Tasseled Loafers',
    category: 'Accessories',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop',
    badge: 'NEW',
    rating: 5,
    reviews: 18,
    description: 'Plush black velvet loafers adorned with fine 18K gold-plated metal tassels and leather lining.',
    sizes: ['39', '40', '41', '42', '43', '44'],
    details: ['Premium Italian Cotton Velvet', '18K gold-plated tassels', 'Hand-stitched leather sole', 'Extra-padded insole comfort'],
    gender: 'Men',
    type: 'Loafers'
  },
  {
    id: 'shop-17',
    name: 'Celestial Pearl Choker',
    category: 'Accessories',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    badge: 'LIMITED',
    rating: 5,
    reviews: 9,
    description: 'Hand-selected Akoya saltwater pearls on an 18K yellow gold adjustable chain with diamond accents.',
    sizes: ['One Size'],
    details: ['Hand-selected Akoya Pearls', 'Solid 18K Yellow Gold clasp', 'Genuine round brilliant cut diamonds', 'Gift box and certificate included'],
    gender: 'Women',
    type: 'Choker'
  },
  {
    id: 'shop-18',
    name: 'Bespoke Velvet Dinner Jacket',
    category: 'Haute Couture',
    price: 2950,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
    badge: 'BESTSELLER',
    rating: 5,
    reviews: 14,
    description: 'Decadent silk-velvet dinner jacket with a faille silk shawl lapel. Masterfully tailored.',
    sizes: ['46', '48', '50', '52', '54'],
    details: ['French Silk Velvet Body', '100% Faille Silk shawl lapel', 'Satin-wrapped button enclosure', 'Traditional canvas construction'],
    gender: 'Men',
    type: 'Jacket'
  },
  {
    id: 'shop-19',
    name: 'Bespoke Silk Tuxedo Shirt',
    category: 'Haute Couture',
    price: 950,
    image: 'https://images.unsplash.com/photo-1621570019587-6d385f28661d?q=80&w=600&auto=format&fit=crop',
    badge: 'NEW',
    rating: 5,
    reviews: 12,
    description: 'White silk-georgette tuxedo shirt featuring hand-pleated bib details and gold cuff studs.',
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['100% Silk Georgette fabric', 'Hand-pleated front bib design', 'Concealed button placket', 'Includes solid gold cuff studs'],
    gender: 'Men',
    type: 'Shirt'
  },
  {
    id: 'shop-20',
    name: 'L\'Amour Silk Evening Gown',
    category: 'Haute Couture',
    price: 4950,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
    badge: 'LIMITED',
    rating: 5,
    reviews: 7,
    description: 'Ethereal asymmetrical gown draped in French silk chiffon. Flowing sheer elegance.',
    sizes: ['XS', 'S', 'M'],
    details: ['100% French Silk Chiffon', 'Hand-draped asymmetric bodice', 'High-slit leg styling', 'Built-in support structure'],
    gender: 'Women',
    type: 'Gown'
  },
  {
    id: 'shop-21',
    name: 'Resort Silk Kaftan',
    category: 'Cruise Collection',
    price: 850,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
    badge: 'NEW',
    rating: 5,
    reviews: 11,
    description: 'Breezy printed resort kaftan with hand-applied crystals and a shimmering metallic gold hem.',
    sizes: ['One Size'],
    details: ['100% Habotai Silk', 'Swarovski crystal embellishments', 'Relaxed split-neck design', 'Loose fluid fit'],
    gender: 'Women',
    type: 'Kaftan'
  },
  {
    id: 'shop-22',
    name: 'Antibes Crochet Tote',
    category: 'Cruise Collection',
    price: 620,
    originalPrice: 750,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    badge: 'SALE',
    rating: 5,
    reviews: 13,
    description: 'Raffia crochet tote bag with premium leather trim handles and a gold logo tag.',
    sizes: ['One Size'],
    details: ['100% Sustainable Raffia', 'Full-grain leather handles', 'Internal zip pocket', 'Bespoke gold logo plaque'],
    gender: 'Women',
    type: 'Tote'
  },
  {
    id: 'shop-23',
    name: 'Aurelia Archival Hoodie',
    category: 'Hoodies',
    price: 850,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    badge: 'NEW',
    rating: 5,
    reviews: 33,
    description: 'An oversized, heavyweight loopback knit cotton hoodie with silk hood linings and solid gold aglets.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: ['100% heavy 500gsm organic cotton', 'Sandwashed silk hood interior lining', 'Heavy golden metal drawcord aglets', 'Embossed subtle chest branding'],
    gender: 'Unisex',
    type: 'Hoodie'
  },
  {
    id: 'shop-24',
    name: 'Vanguard Gilded Trainers',
    category: 'Sneakers',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
    badge: 'LIMITED',
    rating: 5,
    reviews: 21,
    description: 'Deconstructed panels of Italian calf suede and gold-leaf micro-mesh. Set on high-density orthotic outsoles.',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    details: ['Italian Calf Suede and Mesh', 'Hand-painted metallic details', 'Eco-friendly breathable orthotic footbed', 'Made in Italy'],
    gender: 'Unisex',
    type: 'Sneakers'
  }
];

interface ShopPageProps {
  goldStyle: GoldStyle;
  wishlistIds: string[];
  onAddToCart: (item: { id: string; name: string; price: number; image: string }) => void;
  onAddToWishlist: (item: { id: string; name: string; price: number; image: string }) => void;
  onRemoveFromWishlist: (id: string) => void;
  initialCategory?: string | null;
  onBackToHome: () => void;
}

export default function ShopPage({
  goldStyle,
  wishlistIds,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
  initialCategory = null,
  onBackToHome
}: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSize, setActiveSize] = useState<string>('');
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  // Set initial category if routed dynamically
  React.useEffect(() => {
    if (initialCategory) {
      // Normalise categories from parent mappings
      const catLower = initialCategory.toLowerCase();
      if (catLower === 'women') setSelectedCategory('Women');
      else if (catLower === 'men') setSelectedCategory('Men');
      else if (catLower === 'hoodies') setSelectedCategory('Hoodies');
      else if (catLower === 't-shirts' || catLower === 'tshirts') setSelectedCategory('T-Shirts');
      else if (catLower === 'sneakers') setSelectedCategory('Sneakers');
      else if (catLower === 'accessories' || catLower === 'fine accessories') setSelectedCategory('Accessories');
      else if (catLower === 'ready-to-wear') setSelectedCategory('Ready-to-Wear');
      else if (catLower === 'haute couture') setSelectedCategory('Haute Couture');
      else if (catLower === 'the cruise collection' || catLower === 'cruise collection') setSelectedCategory('Cruise Collection');
      else setSelectedCategory('All');
      
      // Scroll to shop header
      const header = document.getElementById('shop-top-header');
      header?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [initialCategory]);

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

  const getGoldBorderClass = () => {
    if (goldStyle === 'champagne') return 'focus:border-[#dfba73]/40 border-neutral-900 group-hover:border-[#dfba73]/30';
    if (goldStyle === 'bright') return 'focus:border-[#ffd700]/40 border-neutral-900 group-hover:border-[#ffd700]/30';
    return 'focus:border-[#c5a880]/40 border-neutral-900 group-hover:border-[#c5a880]/30'; // classic
  };

  const getButtonGlow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_0_15px_rgba(223,186,115,0.35)]';
    if (goldStyle === 'bright') return 'hover:shadow-[0_0_20px_rgba(255,215,0,0.45)]';
    return 'hover:shadow-[0_0_15px_rgba(197,168,128,0.35)]'; // classic
  };

  const getBadgeStyles = (badge: 'NEW' | 'SALE' | 'LIMITED' | 'BESTSELLER') => {
    if (badge === 'NEW') return `${getGoldColor()} border-${goldStyle === 'champagne' ? '[#dfba73]' : goldStyle === 'bright' ? '[#ffd700]' : '[#c5a880]'}/30 bg-black/40`;
    if (badge === 'SALE') return 'text-red-400 border-red-500/20 bg-red-950/20';
    if (badge === 'LIMITED') return 'text-purple-400 border-purple-500/20 bg-purple-950/20';
    return 'text-blue-400 border-blue-500/20 bg-blue-950/20';
  };

  // List of active filters to render in header
  const CATEGORY_TABS = ['All', 'Ready-to-Wear', 'Haute Couture', 'Cruise Collection', 'Accessories', 'Women', 'Men', 'Hoodies', 'Sneakers'];

  // Handle wishlist toggle safely
  const handleWishlistToggle = (prod: Product) => {
    if (wishlistIds.includes(prod.id)) {
      onRemoveFromWishlist(prod.id);
    } else {
      onAddToWishlist({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image
      });
    }
  };

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter((prod) => {
      // 1. Category filter
      let matchesCategory = true;
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Women') {
          matchesCategory = prod.gender === 'Women' || prod.gender === 'Unisex';
        } else if (selectedCategory === 'Men') {
          matchesCategory = prod.gender === 'Men' || prod.gender === 'Unisex';
        } else {
          matchesCategory = prod.category === selectedCategory;
        }
      }

      // 2. Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        matchesSearch =
          prod.name.toLowerCase().includes(query) ||
          prod.category.toLowerCase().includes(query) ||
          prod.description.toLowerCase().includes(query) ||
          prod.type.toLowerCase().includes(query);
      }

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      // 3. Sorting
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return 0; // featured/default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Set default size when Quick View opens
  const handleOpenQuickView = (prod: Product) => {
    setSelectedProduct(prod);
    if (prod.sizes && prod.sizes.length > 0) {
      setActiveSize(prod.sizes[0]);
    } else {
      setActiveSize('');
    }
  };

  return (
    <div id="shop-page-wrapper" className="min-h-screen bg-[#050505] text-white pt-12">
      
      {/* 1. Header & Breadcrumb */}
      <header id="shop-top-header" className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 relative overflow-hidden">
        {/* Subtle grid accent background */}
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-neutral-950 rounded-full blur-[100px] opacity-25 pointer-events-none" />
        
        <div className="space-y-4 max-w-2xl relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] font-sans tracking-[0.2em] text-neutral-500 uppercase">
            <button onClick={onBackToHome} className="hover:text-white transition-colors cursor-pointer">Home</button>
            <span>/</span>
            <span className={getGoldColor()}>Shop</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
              <span className={`font-serif text-[10px] tracking-[0.4em] uppercase ${getGoldColor()}`}>
                Aurelia Catalog
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-[0.1em] text-white uppercase leading-none">
              Shop <span className={getGoldColor()}>Couture</span>
            </h1>
            <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
              Discover timeless luxury pieces crafted for modern style. From bespoke hand-draped gowns in the Paris atelier to tailored Italian cashmere layers, every piece is made with ethical fine silk and solid gold trims.
            </p>
          </div>
        </div>
      </header>

      {/* 2. Controls Area (Category, Search, Sorting) */}
      <section id="shop-controls-bar" className="sticky top-[72px] z-20 bg-[#050505]/90 backdrop-blur-xl border-y border-neutral-900/60 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories Horizontal Scroll */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-2 pb-2 md:pb-0">
            {CATEGORY_TABS.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  id={`shop-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    // scroll to top of product grid safely
                    document.getElementById('shop-grid-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`px-4 py-2 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? `${getGoldBg()} text-black font-semibold scale-102`
                      : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-900 hover:border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search and Sorting controls */}
          <div className="w-full md:w-auto flex items-center justify-end gap-3 self-stretch md:self-auto">
            {/* Real-time search inside the Shop page */}
            <div className="relative flex-1 md:w-60">
              <span className="absolute inset-y-0 left-3 flex items-center text-neutral-500 pointer-events-none">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                id="shop-internal-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection..."
                className="w-full pl-9 pr-4 py-2 bg-neutral-950/80 border border-neutral-900 focus:outline-none focus:border-neutral-700 rounded-full text-[11px] font-sans tracking-wide text-white placeholder-neutral-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-3 flex items-center text-neutral-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sorting Select */}
            <div className="relative shrink-0">
              <select
                id="shop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2 bg-neutral-950 border border-neutral-900 focus:outline-none focus:border-neutral-700 rounded-full text-[11px] font-sans font-medium tracking-wide text-neutral-300 cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-neutral-500">
                <ChevronDown className="w-3 h-3" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Products Listing Section */}
      <main id="shop-grid-section" className="max-w-7xl mx-auto px-6 md:px-12 py-16 min-h-[60vh] space-y-12">
        
        {/* Results Counter / Filter tags */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-900 pb-4">
          <p className="font-sans text-[11px] text-neutral-400 tracking-wider">
            Showing <span className="text-white font-medium">{filteredProducts.length}</span> of 24 masterpieces
          </p>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="flex items-center gap-1.5 font-sans text-[10px] text-neutral-500 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear all filters</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-neutral-950 border border-neutral-900 text-neutral-500">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg tracking-widest uppercase">No Masterpieces Found</h3>
              <p className="font-sans text-xs text-neutral-500 max-w-sm mx-auto">
                We couldn't find any clothing matching your criteria. Try adjusting your search query or selecting another catalog tab.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className={`px-6 py-2.5 rounded-sm font-sans font-bold text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${getGoldBg()}`}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 4. Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod, index) => {
              const isWishlisted = wishlistIds.includes(prod.id);
              
              return (
                <motion.article
                  id={`product-card-${prod.id}`}
                  key={prod.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col justify-between bg-neutral-950/20 border border-neutral-900/60 rounded-xl overflow-hidden p-3 hover:-translate-y-2 hover:border-neutral-800 transition-all duration-500 ease-out"
                >
                  {/* Top Interactive Anchor Area */}
                  <div>
                    {/* Media container */}
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-neutral-950">
                      {/* Image zoom on hover */}
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />

                      {/* Floating badging */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {prod.badge && (
                          <span className={`px-2 py-0.5 border text-[7px] font-sans tracking-[0.2em] font-semibold uppercase rounded-sm shadow-sm ${getBadgeStyles(prod.badge)}`}>
                            {prod.badge}
                          </span>
                        )}
                      </div>

                      {/* Floating action: Wishlist button */}
                      <button
                        id={`wishlist-toggle-${prod.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleWishlistToggle(prod);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border border-neutral-900 bg-black/40 text-white hover:bg-black active:scale-90 transition-all duration-300 cursor-pointer"
                        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-300'}`} />
                      </button>

                      {/* Centered Actions on Hover */}
                      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 space-y-2">
                        {/* Quick View Button */}
                        <button
                          id={`quick-view-${prod.id}`}
                          onClick={() => handleOpenQuickView(prod)}
                          className="w-full py-2.5 bg-black/80 hover:bg-black border border-neutral-850 backdrop-blur-md rounded-sm text-[10px] font-sans font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer hover:border-neutral-700 text-white"
                        >
                          <Eye className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Quick View</span>
                        </button>

                        {/* Add To Cart Quick Action */}
                        <button
                          id={`quick-add-${prod.id}`}
                          onClick={() => onAddToCart({ id: prod.id, name: prod.name, price: prod.price, image: prod.image })}
                          className={`w-full py-2.5 rounded-sm text-[10px] font-sans font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${getGoldBg()} ${getButtonGlow()}`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="mt-4 space-y-1 px-1">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[9px] tracking-widest text-neutral-500 uppercase font-light">
                          {prod.category}
                        </span>
                        
                        {/* Rating stars */}
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      <h3 className="font-serif text-[12px] md:text-sm tracking-wide text-neutral-200 group-hover:text-white transition-colors uppercase font-normal truncate">
                        {prod.name}
                      </h3>
                    </div>
                  </div>

                  {/* Pricing / Bottom Row */}
                  <div className="mt-2 pt-2 border-t border-neutral-900/60 flex items-center justify-between px-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-[12px] md:text-sm font-semibold tracking-wider text-white">
                        ${prod.price.toLocaleString()}
                      </span>
                      {prod.originalPrice && (
                        <span className="font-sans text-[10px] line-through text-neutral-500 tracking-wider">
                          ${prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="font-sans text-[9px] text-neutral-500">
                      {prod.reviews} reviews
                    </span>
                  </div>

                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

      </main>

      {/* 5. IMMERSIVE COMPREHENSIVE QUICK VIEW MODAL OVERLAY */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl max-h-[90vh] z-50 bg-[#0e0e0e] border border-neutral-900 rounded-lg shadow-2xl flex flex-col md:flex-row overflow-y-auto no-scrollbar md:overflow-hidden text-white"
            >
              {/* Close Button */}
              <button
                id="quickview-modal-close"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-neutral-900 bg-neutral-950/80 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-300 z-10 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Grid part left: Hero Image */}
              <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto md:h-full relative bg-neutral-950">
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

              {/* Grid part right: Full specifications and controls */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-full space-y-6">
                
                <div className="space-y-4">
                  {/* Category, rating and badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 md:pt-0">
                    <span className="font-sans text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
                      {selectedProduct.category}
                    </span>
                    {selectedProduct.badge && (
                      <span className={`px-2 py-0.5 border text-[7px] font-sans tracking-[0.2em] font-semibold uppercase rounded-sm shadow-sm ${getBadgeStyles(selectedProduct.badge)}`}>
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>

                  {/* Title and Rating metrics */}
                  <div className="space-y-2">
                    <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-white uppercase leading-tight">
                      {selectedProduct.name}
                    </h2>
                    
                    {/* Ratings */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="font-sans text-xs text-neutral-400">
                        {selectedProduct.rating} / 5.0 &nbsp;•&nbsp; ({selectedProduct.reviews} collector reviews)
                      </span>
                    </div>
                  </div>

                  {/* Pricing block */}
                  <div className="flex items-baseline gap-3 pt-1">
                    {selectedProduct.originalPrice && (
                      <span className="font-sans text-sm line-through text-neutral-500 tracking-wider">
                        ${selectedProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="font-sans text-xl md:text-2xl font-bold tracking-wider">
                      ${selectedProduct.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Divider line */}
                  <div className="h-px bg-neutral-900" />

                  {/* Narrative descriptions */}
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                    {selectedProduct.description}
                  </p>

                  {/* Size selectors if applicable */}
                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-[11px] font-sans tracking-wider uppercase text-neutral-400">
                        <span>Select Size</span>
                        <span className="text-white underline cursor-pointer hover:text-neutral-300">Size Guide</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setActiveSize(sz)}
                            className={`px-4 py-2 border text-xs font-sans font-bold uppercase transition-all duration-300 cursor-pointer rounded-md ${
                              activeSize === sz
                                ? `${getGoldBg()} border-transparent text-black scale-102`
                                : 'border-neutral-900 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specifications checklist bullets */}
                  <div className="space-y-2">
                    <span className="block font-sans text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">
                      Composition & Craft:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {selectedProduct.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2 font-sans text-[10px] text-neutral-400 font-light leading-relaxed">
                          <Check className={`w-3 h-3 mt-0.5 shrink-0 ${getGoldColor()}`} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Adding Callbacks Controls */}
                <div className="pt-4 border-t border-neutral-900 flex items-center gap-3">
                  <button
                    id="modal-add-to-cart"
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
                    <span>Add to Bag</span>
                  </button>

                  <button
                    id="modal-toggle-wishlist"
                    onClick={() => {
                      handleWishlistToggle(selectedProduct);
                    }}
                    className={`px-4 py-3 border border-neutral-900 bg-neutral-950 hover:border-neutral-700 rounded-sm flex items-center justify-center transition-all duration-300 cursor-pointer text-white`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-4 h-4 ${wishlistIds.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-neutral-400 hover:text-white'}`} />
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
