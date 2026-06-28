import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { GoldStyle } from '../types';

interface Review {
  id: string;
  name: string;
  location: string;
  photo: string;
  rating: number;
  date: string;
  text: string;
  itemPurchased: string;
}

interface CustomerReviewsProps {
  goldStyle: GoldStyle;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Alessandra de Luca',
    location: 'Milan, Italy',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'June 12, 2026',
    text: 'The Sovereign Cashmere Overcoat is an absolute masterpiece of tailoring. The heavy double-faced weight drapes elegantly, and the pure Italian cashmere is exceptionally soft to the touch. This is sustainable luxury at its finest.',
    itemPurchased: 'Sovereign Cashmere Overcoat'
  },
  {
    id: 'rev-2',
    name: 'Marcus Vance',
    location: 'London, UK',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'May 28, 2026',
    text: 'Incredibly impressed by the Signature Calfskin Chelsea Boots. Florence leather crafting excels here—the hand-burnished details are stunning and the Goodyear-welted soles are built to endure. Worth every single cent.',
    itemPurchased: 'Signature Calfskin Chelsea Boots'
  },
  {
    id: 'rev-3',
    name: 'Serena Sterling',
    location: 'New York, USA',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'April 19, 2026',
    text: 'I wore the Empress Velvet Corset Gown to a gala and received countless compliments. The structured internal boning shapes the silhouette wonderfully while the silk-velvet feels absolutely majestic. Masterfully designed!',
    itemPurchased: 'Empress Velvet Corset Gown'
  },
  {
    id: 'rev-4',
    name: 'Charles Sterling',
    location: 'Paris, France',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'May 04, 2026',
    text: 'The 18K Aurelia Signet Ring carries a weight of prestige. You can tell it was individually hand-engraved by true master goldsmiths. The gold tone has a deep, classic warmth that is impossible to replicate with fast fashion jewelry.',
    itemPurchased: '18K Aurelia Signet Ring'
  },
  {
    id: 'rev-5',
    name: 'Charlotte Dubois',
    location: 'Geneva, Switzerland',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'March 29, 2026',
    text: 'AURELIA’s Maison Silk Slip Dress feels like second skin. Bias-cut Mulberry silk contours and flows effortlessly with every movement. This is high couture brought directly to our daily lifestyles.',
    itemPurchased: 'Maison Silk Slip Dress'
  },
  {
    id: 'rev-6',
    name: 'Julian Thorne',
    location: 'Tokyo, Japan',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'June 22, 2026',
    text: 'The Monarch Linen Tailored Blazer represents flawless luxury tailoring. Sourced from authentic Irish linen, it remains remarkably breathable in humid weather while holding a sharp, crisp shoulder line.',
    itemPurchased: 'Monarch Linen Tailored Blazer'
  }
];

export default function CustomerReviews({ goldStyle }: CustomerReviewsProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive state detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    if (goldStyle === 'champagne') return 'hover:border-[#dfba73]/30';
    if (goldStyle === 'bright') return 'hover:border-[#ffd700]/30';
    return 'hover:border-[#c5a880]/30'; // classic
  };

  const getCardHoverShadow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_20px_45px_rgba(223,186,115,0.07)]';
    if (goldStyle === 'bright') return 'hover:shadow-[0_20px_45px_rgba(255,215,0,0.09)]';
    return 'hover:shadow-[0_20px_45px_rgba(197,168,128,0.07)]'; // classic
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  // Simple swipe gesture coordinates
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section id="customer-reviews-section" className="py-24 px-6 md:px-12 bg-[#050505] text-white relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900/60 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neutral-950 rounded-full blur-[140px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Title Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className={`w-6 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
            <span className={`font-serif text-[10px] tracking-[0.4em] uppercase ${getGoldColor()}`}>
              Collector Testimonials
            </span>
            <span className={`w-6 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-widest text-white uppercase">
            Maison <span className={getGoldColor()}>Voices</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-lg mx-auto">
            Discover how global fashion collectors and style connoisseurs describe their luxury tactile experiences with our couture releases.
          </p>
        </div>

        {/* Desktop View: Responsive 3-Column Grid */}
        {!isMobile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS.map((rev, idx) => (
              <motion.div
                id={`desktop-review-card-${rev.id}`}
                key={rev.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col justify-between p-8 rounded-2xl bg-neutral-950/45 border border-neutral-900/60 transition-all duration-500 ease-out hover:-translate-y-2 ${getGoldBorder()} ${getCardHoverShadow()}`}
              >
                {/* Accent design touches */}
                <Quote className={`absolute top-6 right-6 w-8 h-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 ${getGoldColor()}`} />

                <div className="space-y-6">
                  {/* Rating block & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-500" />
                      ))}
                    </div>
                    <span className="font-sans text-[9px] text-neutral-500 tracking-widest uppercase">
                      {rev.date}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="font-sans text-[11px] md:text-xs text-neutral-300 font-light leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                {/* Profile detail section */}
                <div className="pt-6 mt-6 border-t border-neutral-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.photo}
                      alt={rev.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 rounded-full object-cover border border-neutral-900 filter grayscale brightness-95"
                    />
                    <div>
                      <h4 className="font-serif text-xs tracking-wider text-neutral-200 group-hover:text-white transition-colors">
                        {rev.name}
                      </h4>
                      <span className="block font-sans text-[9px] text-neutral-500">
                        {rev.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-[8px] font-sans font-semibold tracking-widest uppercase text-neutral-400 bg-neutral-900/50 px-2 py-0.5 rounded border border-neutral-850">
                      <CheckCircle className={`w-2.5 h-2.5 ${getGoldColor()}`} />
                      <span>Verified</span>
                    </div>
                    <span className={`text-[7px] font-sans tracking-wider text-neutral-600 truncate max-w-[110px]`}>
                      {rev.itemPurchased}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Mobile View: Swipeable Carousel Card */
          <div
            id="mobile-reviews-carousel"
            className="relative px-2 py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="overflow-hidden">
              <motion.div
                id="mobile-reviews-track"
                className="flex"
                animate={{ transform: `translateX(-${activeSlide * 100}%)` }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              >
                {REVIEWS.map((rev) => (
                  <div key={rev.id} className="w-full shrink-0 px-2">
                    <div className={`relative flex flex-col justify-between p-7 rounded-2xl bg-neutral-950/60 border border-neutral-900/80 min-h-[300px]`}>
                      <Quote className={`absolute top-5 right-5 w-8 h-8 opacity-[0.04] ${getGoldColor()}`} />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-500" />
                            ))}
                          </div>
                          <span className="font-sans text-[9px] text-neutral-500 tracking-wider">
                            {rev.date}
                          </span>
                        </div>

                        <p className="font-sans text-xs text-neutral-200 font-light leading-relaxed italic">
                          "{rev.text}"
                        </p>
                      </div>

                      <div className="pt-5 mt-5 border-t border-neutral-900/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.photo}
                            alt={rev.name}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="w-8 h-8 rounded-full object-cover border border-neutral-900 grayscale"
                          />
                          <div>
                            <h4 className="font-serif text-xs tracking-wider text-neutral-200">
                              {rev.name}
                            </h4>
                            <span className="block font-sans text-[9px] text-neutral-500">
                              {rev.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1 text-[8px] font-sans text-neutral-400 bg-neutral-900/50 px-2 py-0.5 rounded border border-neutral-850">
                            <CheckCircle className={`w-2.5 h-2.5 ${getGoldColor()}`} />
                            <span>Verified</span>
                          </div>
                          <span className="text-[7px] font-sans text-neutral-600 truncate max-w-[90px]">
                            {rev.itemPurchased}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Micro Navigation Bar & Indicators */}
            <div className="flex items-center justify-between mt-6 px-2">
              <div className="flex gap-1">
                {REVIEWS.map((_, idx) => (
                  <button
                    id={`mobile-indicator-dot-${idx}`}
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeSlide === idx ? `w-6 ${getGoldBg()}` : 'w-1.5 bg-neutral-800'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  id="mobile-review-prev-btn"
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-neutral-900 bg-neutral-950 text-neutral-400"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  id="mobile-review-next-btn"
                  onClick={handleNext}
                  className="p-2 rounded-full border border-neutral-900 bg-neutral-950 text-neutral-400"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
