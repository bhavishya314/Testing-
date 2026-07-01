import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle } from 'lucide-react';
import { GoldStyle } from '../types';

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}

interface CustomerReviewsProps {
  goldStyle: GoldStyle;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Sophia Martinez',
    location: 'New York, USA',
    rating: 5,
    text: 'The quality exceeded my expectations. Every detail feels premium.',
  },
  {
    id: 'rev-2',
    name: 'Luca Bianchi',
    location: 'Milan, Italy',
    rating: 5,
    text: 'Beautiful craftsmanship and elegant packaging. Highly recommended.',
  },
  {
    id: 'rev-3',
    name: 'Emily Carter',
    location: 'London, UK',
    rating: 5,
    text: 'The fit was perfect and the material feels luxurious.',
  },
  {
    id: 'rev-4',
    name: 'Arjun Mehta',
    location: 'Mumbai, India',
    rating: 5,
    text: 'Luxury that truly feels worth the investment.',
  },
];

export default function CustomerReviews({ goldStyle }: CustomerReviewsProps) {
  const getGoldColor = () => {
    if (goldStyle === 'champagne') return 'text-[#dfba73]';
    if (goldStyle === 'bright') return 'text-[#ffd700]';
    return 'text-[#c5a880]'; // classic
  };

  const getGoldBorder = () => {
    if (goldStyle === 'champagne') return 'hover:border-[#dfba73]/30';
    if (goldStyle === 'bright') return 'hover:border-[#ffd700]/30';
    return 'hover:border-[#c5a880]/30'; // classic
  };

  const getCardHoverShadow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_15px_30px_rgba(223,186,115,0.06)]';
    if (goldStyle === 'bright') return 'hover:shadow-[0_15px_30px_rgba(255,215,0,0.08)]';
    return 'hover:shadow-[0_15px_30px_rgba(197,168,128,0.06)]'; // classic
  };

  return (
    <section id="customer-reviews-section" className="py-10 md:py-12 px-6 md:px-12 bg-white dark:bg-[#050505] text-neutral-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-900/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-900/60 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neutral-100 dark:bg-neutral-950 rounded-full blur-[140px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className={`w-4 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
            <span className={`font-serif text-[9px] tracking-[0.25em] uppercase ${getGoldColor()}`}>
              CUSTOMER REVIEWS
            </span>
            <span className={`w-4 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            What Our Customers Say
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-lg mx-auto">
            Trusted by shoppers worldwide.
          </p>
        </div>

        {/* Clean responsive grid of review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              id={`customer-review-card-${rev.id}`}
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`group relative flex flex-col justify-between p-5 rounded-xl bg-neutral-50 dark:bg-neutral-950/45 border border-neutral-200 dark:border-neutral-900/60 transition-all duration-300 hover:scale-[1.01] hover:border-neutral-300 dark:hover:border-neutral-800 ${getGoldBorder()} ${getCardHoverShadow()}`}
            >
              <div className="space-y-3">
                {/* Stars ⭐⭐⭐⭐⭐ */}
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-500" />
                  ))}
                </div>

                {/* Short review (2-3 lines max) */}
                <p className="font-sans text-xs text-neutral-600 dark:text-neutral-300 font-light leading-relaxed italic line-clamp-3">
                  "{rev.text}"
                </p>
              </div>

              {/* Customer Profile & Badge */}
              <div className="pt-4 mt-4 border-t border-neutral-200/50 dark:border-neutral-900/60 flex flex-col gap-2">
                <div>
                  <h4 className="font-serif text-xs font-semibold tracking-wide text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                    {rev.name}
                  </h4>
                  <span className="block font-sans text-[10px] text-neutral-500 dark:text-neutral-500">
                    {rev.location}
                  </span>
                </div>

                {/* Verified Purchase Badge */}
                <div className="flex items-center gap-1 self-start text-[8px] font-sans font-semibold tracking-widest uppercase text-neutral-500 dark:text-neutral-400 bg-neutral-200/50 dark:bg-neutral-900/50 px-2 py-0.5 rounded border border-neutral-300/30 dark:border-neutral-850">
                  <CheckCircle className={`w-2.5 h-2.5 ${getGoldColor()}`} />
                  <span>Verified Purchase</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
