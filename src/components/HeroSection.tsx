import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { GoldStyle } from '../types';

interface HeroSectionProps {
  goldStyle: GoldStyle;
  onShopClick?: () => void;
  onExploreClick?: () => void;
}

export default function HeroSection({ goldStyle, onShopClick, onExploreClick }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  // Handle gentle scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gold color mapping to match current selection
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

  const getGoldBorder = () => {
    if (goldStyle === 'champagne') return 'border-[#dfba73] text-[#dfba73] hover:bg-[#dfba73]/10';
    if (goldStyle === 'bright') return 'border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700]/10';
    return 'border-[#c5a880] text-[#c5a880] hover:bg-[#c5a880]/10'; // classic
  };

  const getGoldBadgeBg = () => {
    if (goldStyle === 'champagne') return 'bg-[#dfba73]/10 border-[#dfba73]/20';
    if (goldStyle === 'bright') return 'bg-[#ffd700]/10 border-[#ffd700]/20';
    return 'bg-[#c5a880]/10 border-[#c5a880]/20'; // classic
  };

  // Subtle Parallax translation calculation (capped for smooth scrolling boundaries)
  const parallaxTranslation = Math.min(scrollY * 0.12, 120);

  return (
    <section
      id="aurelia-hero-section"
      className="relative w-full h-[calc(100vh-100px)] min-h-[650px] lg:h-[calc(100vh-76px)] flex items-stretch overflow-hidden bg-[#050505] text-white"
    >
      {/* Absolute Decorative Background Elements */}
      
      {/* Radial ambient glow in bottom left corner */}
      <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] bg-neutral-950 rounded-full blur-[140px] opacity-40 pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-stretch h-full">
        
        {/* LEFT COLUMN: Highly refined typographical context */}
        <div className="lg:col-span-6 flex flex-col justify-center px-6 md:px-16 py-12 lg:py-0 z-10 relative">
          
          <div className="space-y-6 md:space-y-8 max-w-xl">
            
            {/* 1. Small Label: NEW COLLECTION 2026 */}
            <motion.div
              id="hero-badge-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex"
            >
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] md:text-[10px] tracking-[0.3em] font-sans font-medium uppercase ${getGoldBadgeBg()} ${getGoldColor()}`}>
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>NEW COLLECTION 2026</span>
              </div>
            </motion.div>

            {/* 2. Main Headline: Wear Confidence. */}
            <div className="space-y-1">
              <motion.h1
                id="hero-headline"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal tracking-wide text-white leading-[1.05]"
              >
                Wear <br />
                <span className={`font-light italic ${getGoldColor()}`}>Confidence.</span>
              </motion.h1>
            </div>

            {/* 3. Subtitle */}
            <motion.p
              id="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-neutral-400 text-sm md:text-base leading-relaxed font-light tracking-wide max-w-md"
            >
              Timeless streetwear crafted for those who lead, not follow. Experiencing the pure touch of raw organic cashmere and premium structure silhouettes.
            </motion.p>

            {/* 4. Action Buttons */}
            <motion.div
              id="hero-cta-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* Shop Now Button */}
              <button
                id="hero-shop-now-btn"
                onClick={onShopClick}
                className={`py-4 px-8 font-sans font-bold text-xs tracking-[0.25em] uppercase rounded-sm shadow-xl flex items-center justify-center gap-2 group transition-all duration-300 transform active:scale-98 cursor-pointer ${getGoldBg()}`}
              >
                <span>Shop Now</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>

              {/* Explore Collection Button */}
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className={`py-4 px-8 font-sans font-bold text-xs tracking-[0.25em] uppercase rounded-sm border flex items-center justify-center gap-2 group transition-all duration-300 transform active:scale-98 cursor-pointer ${getGoldBorder()}`}
              >
                <span>Explore Collection</span>
              </button>
            </motion.div>

          </div>

        </div>

        {/* RIGHT COLUMN: Premium Fashion Editorial Image with Scroll Parallax */}
        <div className="lg:col-span-6 relative overflow-hidden bg-neutral-950 flex items-stretch">
          
          {/* Main Visual Image Wrapper for Parallax effect */}
          <div
            className="absolute inset-0 w-full h-[120%] transition-transform duration-100 ease-out"
            style={{
              transform: `translateY(${parallaxTranslation}px)`,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop"
              alt="AURELIA Luxury Streetwear Editorial"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter grayscale contrast-[1.1] brightness-[0.85] hover:brightness-[0.95] hover:grayscale-0 transition-all duration-1000 ease-out"
            />
          </div>

          {/* Luxury dark gradient overlay with subtle gold edge glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

        </div>

      </div>
    </section>
  );
}
