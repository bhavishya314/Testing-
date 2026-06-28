import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { GoldStyle } from '../types';

interface CategoryItem {
  id: string;
  title: string;
  count: string;
  image: string;
}

interface ShopByCategoryProps {
  goldStyle: GoldStyle;
  onCategoryClick?: (categoryName: string) => void;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-women',
    title: 'Women',
    count: '42 Products',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'cat-men',
    title: 'Men',
    count: '36 Products',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'cat-hoodies',
    title: 'Hoodies',
    count: '18 Products',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'cat-tshirts',
    title: 'T-Shirts',
    count: '24 Products',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'cat-sneakers',
    title: 'Sneakers',
    count: '15 Products',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'cat-accessories',
    title: 'Accessories',
    count: '29 Products',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
  }
];

export default function ShopByCategory({ goldStyle, onCategoryClick }: ShopByCategoryProps) {
  const getGoldColor = () => {
    if (goldStyle === 'champagne') return 'text-[#dfba73]';
    if (goldStyle === 'bright') return 'text-[#ffd700]';
    return 'text-[#c5a880]'; // classic
  };

  const getGoldBg = () => {
    if (goldStyle === 'champagne') return 'bg-[#dfba73] text-black';
    if (goldStyle === 'bright') return 'bg-[#ffd700] text-black';
    return 'bg-[#c5a880] text-black'; // classic
  };

  const getGoldBorder = () => {
    if (goldStyle === 'champagne') return 'border-[#dfba73]';
    if (goldStyle === 'bright') return 'border-[#ffd700]';
    return 'border-[#c5a880]'; // classic
  };

  const getGoldBorderClass = () => {
    if (goldStyle === 'champagne') return 'group-hover:border-[#dfba73]/80';
    if (goldStyle === 'bright') return 'group-hover:border-[#ffd700]/80';
    return 'group-hover:border-[#c5a880]/80'; // classic
  };

  const getGoldGlow = () => {
    if (goldStyle === 'champagne') return 'group-hover:shadow-[0_0_20px_rgba(223,186,115,0.25)]';
    if (goldStyle === 'bright') return 'group-hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]';
    return 'group-hover:shadow-[0_0_20px_rgba(197,168,128,0.25)]'; // classic
  };

  return (
    <section id="shop-by-category-section" className="py-24 px-6 md:px-12 bg-[#050505] text-white relative">
      {/* Decorative Line dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900/60 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className={`w-6 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
            <span className={`font-serif text-[10px] tracking-[0.4em] uppercase ${getGoldColor()}`}>
              Exquisite Selection
            </span>
            <span className={`w-6 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-widest text-white uppercase">
            Shop By <span className={getGoldColor()}>Category</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-lg mx-auto">
            Immerse yourself in structured lines and luxurious materials designed for effortless, everyday architectural layering.
          </p>
        </div>

        {/* Categories Grid: 3 columns desktop, 2 columns tablet, 2 columns mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => {
            return (
              <motion.div
                id={`category-card-${cat.id}`}
                key={cat.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onCategoryClick?.(cat.title)}
                className={`group relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950 cursor-pointer transition-all duration-500 ease-out ${getGoldBorderClass()} ${getGoldGlow()}`}
              >
                {/* Product Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.7] group-hover:brightness-[0.6] grayscale-[0.2]"
                />

                {/* Elegant Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end items-start z-10 space-y-3">
                  <div className="space-y-1">
                    {/* Product count */}
                    <span className={`block font-sans text-[9px] md:text-[10px] tracking-widest uppercase font-light text-neutral-400 group-hover:text-neutral-200 transition-colors`}>
                      {cat.count}
                    </span>
                    {/* Category Title */}
                    <h3 className="font-serif text-lg md:text-2xl tracking-wide text-white font-normal uppercase">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Explore button inside category */}
                  <div
                    id={`category-explore-${cat.id}`}
                    className="flex items-center gap-1.5 pt-1 overflow-hidden"
                  >
                    <span className={`font-sans text-[10px] tracking-[0.2em] font-semibold uppercase group-hover:mr-1 transition-all duration-300 ${getGoldColor()}`}>
                      Explore
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300 ${getGoldColor()}`} />
                  </div>
                </div>

                {/* Fine luxury border animation line around the card (appears on hover) */}
                <div className={`absolute inset-0 border border-transparent rounded-2xl group-hover:border-inherit transition-colors duration-500 pointer-events-none`} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
