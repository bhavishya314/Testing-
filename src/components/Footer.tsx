import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, ArrowUpRight, Sparkles } from 'lucide-react';
import { GoldStyle } from '../types';

interface FooterProps {
  goldStyle: GoldStyle;
  onNavigate?: (page: 'home' | 'shop' | 'details' | 'cart' | 'wishlist' | 'contact', category?: string | null) => void;
}

export default function Footer({ goldStyle, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const getGoldColor = () => {
    if (goldStyle === 'champagne') return 'text-[#dfba73]';
    if (goldStyle === 'bright') return 'text-[#ffd700]';
    return 'text-[#c5a880]'; // classic
  };

  const getGoldHover = () => {
    if (goldStyle === 'champagne') return 'hover:text-[#dfba73]';
    if (goldStyle === 'bright') return 'hover:text-[#ffd700]';
    return 'hover:text-[#c5a880]'; // classic
  };

  const getGoldBg = () => {
    if (goldStyle === 'champagne') return 'bg-[#dfba73]';
    if (goldStyle === 'bright') return 'bg-[#ffd700]';
    return 'bg-[#c5a880]'; // classic
  };

  const getGoldBorder = () => {
    if (goldStyle === 'champagne') return 'border-[#dfba73]/20 focus-within:border-[#dfba73]/60';
    if (goldStyle === 'bright') return 'border-[#ffd700]/20 focus-within:border-[#ffd700]/60';
    return 'border-[#c5a880]/20 focus-within:border-[#c5a880]/60'; // classic
  };

  return (
    <footer id="aurelia-luxury-footer" className="bg-[#030303] text-white pt-24 pb-12 px-6 md:px-12 relative overflow-hidden border-t border-neutral-900/40">
      {/* Subtle architectural background grids */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neutral-950 rounded-full blur-[150px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Main 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: AURELIA logo and luxury brand description */}
          <div id="footer-col-brand" className="space-y-6">
            <div className="space-y-3">
              {/* Logo with gold accent */}
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${getGoldBg()}`} />
                <h2 id="footer-brand-logo" className="font-serif text-2xl tracking-[0.35em] uppercase font-bold text-white">
                  AURELIA
                </h2>
              </div>
              <p className="font-sans text-[11px] md:text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
                A legacy of timeless streetwear architecture, tailored in the heart of Paris. We source organic Italian cashmere, fine Mulberry silk, and 18K solid gold trims to elevate daily couture standards.
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`w-3 h-[1px] ${getGoldBg()}`} />
              <span className={`font-serif text-[9px] tracking-[0.3em] uppercase ${getGoldColor()}`}>
                Atelier Paris • Founded 1924
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div id="footer-col-quicklinks" className="space-y-5">
            <h3 className="font-serif text-[11px] tracking-[0.3em] uppercase font-semibold text-neutral-300">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', target: 'home' as const, category: null },
                { name: 'Shop', target: 'shop' as const, category: null },
                { name: 'Collections', target: 'shop' as const, category: null },
                { name: 'Contact', target: 'contact' as const, category: null }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    id={`footer-quicklink-${link.name.toLowerCase()}`}
                    href="#"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate(link.target, link.category);
                      }
                    }}
                    className={`font-sans text-xs text-neutral-400 font-light hover:pl-1.5 transition-all duration-300 flex items-center gap-1 group ${getGoldHover()}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-neutral-800 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Couture Categories */}
          <div id="footer-col-support" className="space-y-5">
            <h3 className="font-serif text-[11px] tracking-[0.3em] uppercase font-semibold text-neutral-300">
              Couture Categories
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Ready to Wear', target: 'shop' as const, category: 'Ready-to-Wear' },
                { name: 'Haute Couture', target: 'shop' as const, category: 'Haute Couture' },
                { name: 'Cruise Collection', target: 'shop' as const, category: 'Cruise Collection' },
                { name: 'Accessories', target: 'shop' as const, category: 'Accessories' }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    id={`footer-categorylink-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    href="#"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate(link.target, link.category);
                      }
                    }}
                    className={`font-sans text-xs text-neutral-400 font-light hover:pl-1.5 transition-all duration-300 flex items-center gap-1 group ${getGoldHover()}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-neutral-800 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div id="footer-col-contact" className="space-y-6">
            <div className="space-y-5">
              <h3 className="font-serif text-[11px] tracking-[0.3em] uppercase font-semibold text-neutral-300">
                Contact Us
              </h3>
              
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <Mail className={`w-4 h-4 shrink-0 mt-0.5 ${getGoldColor()}`} />
                  <a
                    id="footer-contact-email"
                    href="mailto:concierge@aurelia.com"
                    className="font-sans text-xs text-neutral-400 font-light hover:text-white transition-colors"
                  >
                    concierge@aurelia.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className={`w-4 h-4 shrink-0 mt-0.5 ${getGoldColor()}`} />
                  <a
                    id="footer-contact-phone"
                    href="tel:+33140205050"
                    className="font-sans text-xs text-neutral-400 font-light hover:text-white transition-colors"
                  >
                    +33 (0) 1 40 20 50 50
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${getGoldColor()}`} />
                  <span className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                    22 Place Vendôme, 75001 Paris, France
                  </span>
                </li>
              </ul>
            </div>

            {/* Social Icons (Instagram, Facebook, X, Pinterest) */}
            <div className="space-y-3">
              <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-neutral-500 font-semibold">
                Social Atelier
              </span>
              <div className="flex items-center gap-2.5">
                {[
                  {
                    name: 'Instagram',
                    id: 'footer-social-instagram',
                    href: 'https://instagram.com',
                    svg: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01"/>
                      </svg>
                    )
                  },
                  {
                    name: 'Facebook',
                    id: 'footer-social-facebook',
                    href: 'https://facebook.com',
                    svg: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                      </svg>
                    )
                  },
                  {
                    name: 'X',
                    id: 'footer-social-x',
                    href: 'https://twitter.com',
                    svg: (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    )
                  },
                  {
                    name: 'Pinterest',
                    id: 'footer-social-pinterest',
                    href: 'https://pinterest.com',
                    svg: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.18-.1-.95-.19-2.4.04-3.43.21-.93 1.37-5.83 1.37-5.83s-.35-.7-.35-1.74c0-1.63.95-2.85 2.13-2.85 1 0 1.49.75 1.49 1.66 0 1.01-.64 2.52-.97 3.92-.28 1.17.58 2.13 1.73 2.13 2.08 0 3.68-2.19 3.68-5.35 0-2.8-2.01-4.75-4.87-4.75-3.32 0-5.27 2.49-5.27 5.06 0 1 .39 2.08.87 2.67.1.1.11.2.08.31-.09.38-.3 1.23-.34 1.4-.06.23-.19.28-.43.17-1.61-.75-2.62-3.11-2.62-5.01 0-4.08 2.97-7.83 8.55-7.83 4.49 0 7.98 3.2 7.98 7.48 0 4.46-2.81 8.05-6.71 8.05-1.31 0-2.54-.68-2.96-1.48l-.81 3.08c-.29 1.12-1.09 2.53-1.63 3.4C8.94 23.82 10.43 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                      </svg>
                    )
                  }
                ].map((social) => (
                  <a
                    id={social.id}
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center hover:border-neutral-700"
                    aria-label={`Follow AURELIA on ${social.name}`}
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Elegant horizontal divider line */}
        <div className="relative pt-4">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-900/80 to-transparent" />
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[1px] ${getGoldBg()}`} />
        </div>

        {/* Bottom Section: Copyright and Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p id="footer-copyright" className="font-sans text-[10px] text-neutral-500 font-light tracking-wide">
            &copy; {currentYear} AURELIA S.A. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 font-sans text-[10px] text-neutral-500 font-light">
            <span>Designed with</span>
            <span className={`text-red-500 transition-transform duration-300 hover:scale-125 cursor-default`} aria-hidden="true">❤️</span>
            <span>for</span>
            <span className={`font-serif tracking-widest font-normal uppercase text-neutral-400 transition-colors ${getGoldColor()}`}>
              AURELIA
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
