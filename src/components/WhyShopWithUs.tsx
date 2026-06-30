import React from 'react';
import { motion } from 'motion/react';
import { Truck, RotateCcw, ShieldCheck, Gem, Sparkles } from 'lucide-react';
import { GoldStyle } from '../types';

interface WhyShopWithUsProps {
  goldStyle: GoldStyle;
}

interface FeatureItem {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'feat-shipping',
    icon: Truck,
    title: 'Complimentary Express Shipping',
    desc: 'Worldwide priority delivery via DHL Express inside our signature luxury linen-box packaging.',
  },
  {
    id: 'feat-returns',
    icon: RotateCcw,
    title: 'Flawless White-Glove Returns',
    desc: 'Complimentary home collections and hassle-free returns within 30 days of receipt.',
  },
  {
    id: 'feat-payments',
    icon: ShieldCheck,
    title: 'Secure Bespoke Checkout',
    desc: 'State-of-the-art 256-bit encryption protecting your financial details and transaction privacy.',
  },
  {
    id: 'feat-quality',
    icon: Gem,
    title: 'Paris Atelier Quality',
    desc: 'Handcrafted masterpieces sourced from organic Italian cashmere, fine silk, and solid gold trims.',
  }
];

export default function WhyShopWithUs({ goldStyle }: WhyShopWithUsProps) {
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
    if (goldStyle === 'champagne') return 'border-[#dfba73]/20 group-hover:border-[#dfba73]/40';
    if (goldStyle === 'bright') return 'border-[#ffd700]/20 group-hover:border-[#ffd700]/40';
    return 'border-[#c5a880]/20 group-hover:border-[#c5a880]/40'; // classic
  };

  const getCardHoverShadow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_15px_40px_rgba(223,186,115,0.06)]';
    if (goldStyle === 'bright') return 'hover:shadow-[0_15px_40px_rgba(255,215,0,0.08)]';
    return 'hover:shadow-[0_15px_40px_rgba(197,168,128,0.06)]'; // classic
  };

  return (
    <section id="why-shop-section" className="py-24 px-6 md:px-12 bg-[#050505] text-white relative overflow-hidden">
      {/* Decorative vector grid elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-950 rounded-full blur-[160px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className={`w-6 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
            <span className={`font-serif text-[10px] tracking-[0.4em] uppercase ${getGoldColor()}`}>
              The Maison Standard
            </span>
            <span className={`w-6 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            Why Shop <span className={getGoldColor()}>With Us</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed max-w-lg mx-auto">
            From our dedicated Parisian designers to your doorstep, every detail of the AURELIA experience is tailored to represent absolute elegance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                id={`why-card-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col justify-between p-8 bg-neutral-950/40 border rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 ${getGoldBorder()} ${getCardHoverShadow()}`}
              >
                {/* Subtle internal gold gradient background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent rounded-2xl pointer-events-none" />
                
                <div className="space-y-6">
                  {/* Icon Wrapper */}
                  <div className="inline-flex p-3 rounded-xl bg-neutral-900/60 border border-neutral-850 text-white group-hover:bg-neutral-900 group-hover:scale-110 transition-all duration-300">
                    <Icon className={`w-5 h-5 group-hover:rotate-6 transition-transform duration-300 ${getGoldColor()}`} />
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-sm tracking-widest uppercase font-medium text-neutral-200 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11px] md:text-xs text-neutral-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Decorative golden corner line */}
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-transparent group-hover:border-white/10 transition-all duration-500 rounded-br-sm" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
