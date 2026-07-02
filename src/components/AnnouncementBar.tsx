import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { GoldStyle } from '../types';

interface AnnouncementBarProps {
  goldStyle: GoldStyle;
  isEnabled: boolean;
}

const MESSAGES = [
  'COMPLIMENTARY DHL EXPRESS DELIVERY FOR ORDERS OVER $1,500',
  'MAISON AURELIA COUTURE: BOOK PARIS SHOWROOM APPOINTMENTS',
  'AUTUMN/WINTER Ready-To-Wear Now Debutting',
  'DISCOVER THE SOLSTICE JEWELRY & GEMSTONE LINE',
];

export default function AnnouncementBar({ goldStyle, isEnabled }: AnnouncementBarProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isEnabled]);

  const getGoldColor = () => {
    if (goldStyle === 'champagne') return 'text-[#dfba73]';
    if (goldStyle === 'bright') return 'text-[#ffd700]';
    return 'text-[#c5a880]'; // classic
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
  };

  if (isDismissed || !isEnabled) return null;

  return (
    <div
      id="announcement-bar"
      className="bg-[#050505] text-neutral-400 border-b border-neutral-950 font-sans text-[10px] tracking-[0.2em] uppercase py-2 px-4 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Nav Controls - Left */}
        <button
          id="announcement-prev-btn"
          onClick={handlePrev}
          className="p-1 text-neutral-500 hover:text-white transition-colors duration-300 hidden sm:block shrink-0"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Scrolling/Sliding Message */}
        <div className="flex-1 flex justify-center items-center gap-2 overflow-hidden text-center mx-4">
          <Sparkles className={`w-3 h-3 animate-pulse shrink-0 ${getGoldColor()}`} />
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIdx}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="font-medium inline-block text-[7px] sm:text-[9px] md:text-[10px] tracking-wider sm:tracking-[0.25em]"
            >
              {MESSAGES[currentIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Nav Controls - Right */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            id="announcement-next-btn"
            onClick={handleNext}
            className="p-1 text-neutral-500 hover:text-white transition-colors duration-300 hidden sm:block"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          
          <button
            id="announcement-dismiss-btn"
            onClick={() => setIsDismissed(true)}
            className="p-1 text-neutral-500 hover:text-white transition-colors duration-300"
            title="Dismiss announcements"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
