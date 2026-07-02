import React from 'react';
import { motion } from 'motion/react';
import { Sliders, Sparkles, Plus, Heart, ShoppingBag, Eye, HelpCircle, RefreshCw } from 'lucide-react';
import { NavbarTheme, GoldStyle, LogoAlign, HighlightStyle, CartItem, WishlistItem } from '../types';

interface InteractiveShowcaseProps {
  theme: NavbarTheme;
  setTheme: (t: NavbarTheme) => void;
  goldStyle: GoldStyle;
  setGoldStyle: (g: GoldStyle) => void;
  logoAlign: LogoAlign;
  setLogoAlign: (l: LogoAlign) => void;
  highlightStyle: HighlightStyle;
  setHighlightStyle: (h: HighlightStyle) => void;
  onAddMockItem: (type: 'cart' | 'wishlist', itemId: string) => void;
  onClearAll: () => void;
  announcementEnabled: boolean;
  setAnnouncementEnabled: (b: boolean) => void;
  simulatedScroll: boolean;
  setSimulatedScroll: (b: boolean) => void;
}

const SAMPLE_COUTURE = [
  { id: 'item-1', name: 'Maison Silk Slip Dress', price: 890, type: 'cart' as const, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=300&auto=format&fit=crop' },
  { id: 'item-2', name: 'Sovereign Cashmere Coat', price: 2450, type: 'cart' as const, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop' },
  { id: 'item-3', name: 'Monarch Linen Blazer', price: 1250, type: 'wishlist' as const, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300&auto=format&fit=crop' },
  { id: 'item-5', name: '18K Aurelia Signet Ring', price: 1800, type: 'wishlist' as const, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300&auto=format&fit=crop' },
];

export default function InteractiveShowcase({
  theme,
  setTheme,
  goldStyle,
  setGoldStyle,
  logoAlign,
  setLogoAlign,
  highlightStyle,
  setHighlightStyle,
  onAddMockItem,
  onClearAll,
  announcementEnabled,
  setAnnouncementEnabled,
  simulatedScroll,
  setSimulatedScroll,
}: InteractiveShowcaseProps) {

  // Dynamic gold colors
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
    if (goldStyle === 'champagne') return 'border-[#dfba73] hover:border-[#dfba73]';
    if (goldStyle === 'bright') return 'border-[#ffd700] hover:border-[#ffd700]';
    return 'border-[#c5a880] hover:border-[#c5a880]'; // classic
  };

  return (
    <div id="interactive-stage" className="relative w-full min-h-[calc(100vh-140px)] flex flex-col justify-between py-12 px-6 md:px-12 max-w-7xl mx-auto z-10">
      
      {/* Visual Title Header */}
      <div className="space-y-4 max-w-xl">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-8 h-[1px] ${getGoldBg()}`} />
          <span className={`font-serif text-[10px] tracking-[0.4em] uppercase ${getGoldColor()}`}>
            Atelier Interactive Room
          </span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-normal text-white tracking-wide leading-tight">
          Crafting the <span className={getGoldColor()}>AURELIA</span> Header Experience
        </h1>
        <p className="font-sans text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
          Experience the premium tactile controls of our luxury header. Swap styling parameters, trigger sticky scroll-conversion, and populate the checkout logs directly in this interactive sandbox studio.
        </p>
      </div>

      {/* Main Studio Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-stretch">
        
        {/* LEFT COLUMN: Controls Dashboard */}
        <div className="lg:col-span-7 bg-[#0b0b0b] border border-neutral-900 rounded-xl p-6 md:p-8 space-y-8 shadow-2xl flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Subsection header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
              <div className="flex items-center gap-2">
                <Sliders className={`w-4 h-4 ${getGoldColor()}`} />
                <span className="font-serif text-xs tracking-wider text-white uppercase">Design Customization</span>
              </div>
              <button
                id="reset-dashboard-btn"
                onClick={onClearAll}
                className="flex items-center gap-1.5 font-sans text-[9px] tracking-widest text-neutral-500 hover:text-white uppercase transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Clear Sandbox
              </button>
            </div>

            {/* Row 1: Theme & Logo Alignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Navbar Theme Control */}
              <div className="space-y-2">
                <label className="font-sans text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">
                  Header Theme
                </label>
                <div className="grid grid-cols-3 gap-2 bg-neutral-950 p-1 rounded-lg border border-neutral-900">
                  {(['light', 'dark', 'glass'] as NavbarTheme[]).map((t) => (
                    <button
                      id={`theme-btn-${t}`}
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`py-1.5 text-[9px] font-sans font-medium tracking-widest uppercase rounded transition-all duration-300 ${
                        theme === t 
                          ? `${getGoldBg()} text-black font-bold shadow-md`
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Alignment Control */}
              <div className="space-y-2">
                <label className="font-sans text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">
                  Brand Logo Position
                </label>
                <div className="grid grid-cols-2 gap-2 bg-neutral-950 p-1 rounded-lg border border-neutral-900">
                  {(['left', 'center'] as LogoAlign[]).map((align) => (
                    <button
                      id={`align-btn-${align}`}
                      key={align}
                      onClick={() => setLogoAlign(align)}
                      className={`py-1.5 text-[9px] font-sans font-medium tracking-widest uppercase rounded transition-all duration-300 ${
                        logoAlign === align 
                          ? `${getGoldBg()} text-black font-bold shadow-md`
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Row 2: Gold Color Tone & Hover Active Highlight Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Gold Shades Preset */}
              <div className="space-y-2">
                <label className="font-sans text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">
                  Gold Accent Hue
                </label>
                <div className="grid grid-cols-3 gap-2 bg-neutral-950 p-1 rounded-lg border border-neutral-900">
                  {(['champagne', 'classic', 'bright'] as GoldStyle[]).map((g) => (
                    <button
                      id={`gold-btn-${g}`}
                      key={g}
                      onClick={() => setGoldStyle(g)}
                      className={`py-1.5 text-[9px] font-sans font-medium tracking-widest uppercase rounded transition-all duration-300 ${
                        goldStyle === g 
                          ? 'bg-neutral-850 text-white font-bold border border-neutral-700 shadow-md'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          g === 'champagne' ? 'bg-[#dfba73]' : g === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'
                        }`} />
                        {g}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Link Highlight Style */}
              <div className="space-y-2">
                <label className="font-sans text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">
                  Hover Active Indicator
                </label>
                <div className="grid grid-cols-2 gap-2 bg-neutral-950 p-1 rounded-lg border border-neutral-900">
                  {(['underline', 'dot', 'gold-text', 'minimal-glow'] as HighlightStyle[]).map((h) => (
                    <button
                      id={`highlight-btn-${h}`}
                      key={h}
                      onClick={() => setHighlightStyle(h)}
                      className={`py-1.5 text-[8px] font-sans font-medium tracking-wider uppercase rounded transition-all duration-300 ${
                        highlightStyle === h 
                          ? `${getGoldBg()} text-black font-bold shadow-md`
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      {h.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Row 3: Announcement bar & Simulated Scroll Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              <div className="flex items-center justify-between p-3.5 bg-neutral-950 border border-neutral-900 rounded-lg">
                <div>
                  <span className="font-serif text-[11px] text-white block tracking-wider uppercase font-medium">
                    Announcement Ticker
                  </span>
                  <span className="font-sans text-[9px] text-neutral-500">
                    Sliding top header bar
                  </span>
                </div>
                <button
                  id="announcement-toggle"
                  onClick={() => setAnnouncementEnabled(!announcementEnabled)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-all duration-300 ${announcementEnabled ? getGoldBg() : 'bg-neutral-800'}`}
                >
                  <div className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${announcementEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-neutral-950 border border-neutral-900 rounded-lg">
                <div>
                  <span className="font-serif text-[11px] text-white block tracking-wider uppercase font-medium">
                    Force Sticky Mode
                  </span>
                  <span className="font-sans text-[9px] text-neutral-500">
                    Simulates window scrolled down
                  </span>
                </div>
                <button
                  id="sticky-toggle"
                  onClick={() => setSimulatedScroll(!simulatedScroll)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-all duration-300 ${simulatedScroll ? getGoldBg() : 'bg-neutral-800'}`}
                >
                  <div className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${simulatedScroll ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>

            </div>

          </div>

          {/* Sandbox interactive actions */}
          <div className="pt-6 border-t border-neutral-900 space-y-4">
            <h4 className="font-sans text-[10px] tracking-widest text-neutral-500 uppercase font-bold">
              Tactile Badge Toggles
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SAMPLE_COUTURE.map((item) => (
                <button
                  id={`add-sandbox-item-${item.id}`}
                  key={`${item.id}-${item.type}`}
                  onClick={() => onAddMockItem(item.type, item.id)}
                  className="p-2.5 rounded border border-neutral-900 bg-neutral-950 hover:bg-neutral-900/40 text-left hover:border-neutral-800 transition-all duration-300 group relative"
                >
                  <div className="w-full h-16 rounded overflow-hidden mb-2 bg-neutral-900 relative">
                    <img src={item.image} alt={item.name} referrerPolicy="no-referrer" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h5 className="font-serif text-[10px] tracking-wide text-neutral-300 group-hover:text-white truncate block">
                    {item.name}
                  </h5>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-sans text-[9px] text-neutral-500 font-semibold">
                      ${item.price}
                    </span>
                    {item.type === 'cart' ? (
                      <span className="flex items-center gap-0.5 text-[8px] font-sans text-neutral-400 tracking-widest font-semibold uppercase">
                        <ShoppingBag className={`w-2.5 h-2.5 ${getGoldColor()}`} />
                        + Bag
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5 text-[8px] font-sans text-neutral-400 tracking-widest font-semibold uppercase">
                        <Heart className={`w-2.5 h-2.5 fill-current ${getGoldColor()}`} />
                        + Wish
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Luxury Aesthetic Window / Card */}
        <div className="lg:col-span-5 bg-[#0a0a0a] border border-neutral-900 rounded-xl overflow-hidden shadow-2xl relative flex flex-col justify-between">
          {/* Decorative Atelier Frame */}
          <div className="absolute inset-0 bg-radial-gradient from-neutral-950/20 to-black pointer-events-none" />
          
          {/* Header Tag */}
          <div className="p-6 border-b border-neutral-900 bg-neutral-950/30 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Eye className={`w-3.5 h-3.5 ${getGoldColor()}`} />
              <span className="font-serif text-[9px] tracking-[0.3em] uppercase text-neutral-400">
                L'ATELIER PREVIEW
              </span>
            </div>
            <span className="text-[8px] tracking-[0.2em] uppercase font-sans text-emerald-500 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-900/30">
              Interactive
            </span>
          </div>

          {/* Large display image representing a luxury collection */}
          <div className="flex-1 min-h-[220px] relative overflow-hidden group flex items-center justify-center p-8">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop"
              alt="Maison Aurelia Editorial"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-35 filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

            <div className="relative text-center space-y-3 max-w-xs z-10">
              <span className={`font-serif text-[11px] tracking-[0.35em] block uppercase ${getGoldColor()}`}>
                AUTUMN/WINTER 2026
              </span>
              <h2 className="font-serif text-2xl tracking-widest text-white uppercase font-light">
                Le Jardin Perdu
              </h2>
              <p className="font-sans text-[10px] tracking-wider text-neutral-400 leading-relaxed font-light">
                A study on Italian structured knitwear, silk georgette slips, and heritage brass hardware.
              </p>
              <button
                id="view-collection-request"
                className={`inline-block border text-[9px] font-sans font-bold tracking-[0.25em] uppercase px-5 py-2.5 transition-all duration-300 mt-2 ${getGoldBorder()} ${getGoldColor()}`}
              >
                Request Access
              </button>
            </div>
          </div>

          {/* Bottom active spec details */}
          <div className="p-6 bg-neutral-950/70 border-t border-neutral-900 space-y-4">
            <div className="space-y-2">
              <h4 className="font-serif text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-semibold">
                ACTIVE CONFIGURATION LOGS
              </h4>
              <div className="grid grid-cols-2 gap-4 text-[10px] font-sans tracking-wide">
                <div>
                  <span className="text-neutral-500 block">Atmospheric Hue:</span>
                  <span className="text-neutral-300 uppercase font-semibold">{theme === 'glass' ? 'Melted Acrylic' : theme}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Logo Spacing:</span>
                  <span className="text-neutral-300 uppercase font-semibold">{logoAlign === 'left' ? 'Left Banner' : 'Symmetrical Center'}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Gold Carats:</span>
                  <span className="text-neutral-300 uppercase font-semibold">{goldStyle === 'champagne' ? '14K Champagne' : goldStyle === 'bright' ? '24K Bright Leaf' : '18K Classic Aurelia'}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Trigger:</span>
                  <span className="text-neutral-300 uppercase font-semibold">{highlightStyle}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Exquisite footer with system compliance and standards */}
      <div className="border-t border-neutral-900/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] tracking-widest text-neutral-500 uppercase font-sans">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${getGoldBg()}`} />
          <span>Maison Aurelia Header System v1.0.0</span>
        </div>
        <span>Designed in Paris & Milan · Handmade Web Quality</span>
      </div>

    </div>
  );
}
