import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, RefreshCw, Scale } from 'lucide-react';
import { GoldStyle } from '../types';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: 'privacy' | 'terms' | 'returns';
  goldStyle: GoldStyle;
}

export default function PolicyModal({ isOpen, onClose, initialType, goldStyle }: PolicyModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'returns'>(initialType);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialType);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialType]);

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
    if (goldStyle === 'champagne') return 'border-[#dfba73]/30';
    if (goldStyle === 'bright') return 'border-[#ffd700]/30';
    return 'border-[#c5a880]/30'; // classic
  };

  const tabs = [
    { id: 'privacy' as const, label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms' as const, label: 'Terms of Service', icon: Scale },
    { id: 'returns' as const, label: 'Returns & Exchange', icon: RefreshCw },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#030303]/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-[#090909] border border-neutral-900 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10"
          >
            {/* Top architectural glow lines */}
            <div className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent ${getGoldBg()}`} />

            {/* Header Section */}
            <div className="p-6 md:p-8 border-b border-neutral-900 flex items-center justify-between shrink-0">
              <div className="space-y-1.5">
                <span className={`font-serif text-[9px] tracking-[0.3em] uppercase ${getGoldColor()}`}>
                  AURELIA Legal Atelier
                </span>
                <h2 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-white">
                  Corporate Policies
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-neutral-900 hover:border-neutral-800 text-neutral-400 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Close policies modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 md:px-8 py-3 bg-[#050505] border-b border-neutral-900/40 shrink-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-sm font-sans text-xs tracking-wider uppercase flex items-center gap-2 transition-all duration-300 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? `${getGoldColor()} bg-neutral-950/80 border ${getGoldBorder()}`
                        : 'text-neutral-500 hover:text-neutral-300 border border-transparent'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-neutral-400 font-sans text-xs md:text-sm leading-relaxed font-light scrollbar-thin">
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      1. Integrity & Commitment
                    </h3>
                    <p>
                      At AURELIA, your privacy is fundamental to our core artisanal philosophy. We design secure, custom encrypted pipelines to protect every aspect of your boutique shopping transactions, private concierge consults, and custom atelier fit histories.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      2. Personal Information Collected
                    </h3>
                    <p>
                      We collect relevant customer details strictly necessary to process your haute couture orders, bespoke tailored modifications, and high-security checkout sequences:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1.5 pl-2 text-neutral-500">
                      <li>Full Name, Delivery & Billing addresses</li>
                      <li>Contact methods including WhatsApp handles, email, and secure phone numbers</li>
                      <li>Tailoring and physical measurements for optimal high-fashion sizing</li>
                      <li>Cryptographically secured transaction records</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      3. Data Protection Safeguards
                    </h3>
                    <p>
                      Every transaction is encrypted in transit using industry-standard TLS 1.3 protocol and processed through audited, tokenized payment pathways. No complete credit card credentials or bank keys are ever cached or stored within our localized databases.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      4. Your Corporate Rights
                    </h3>
                    <p>
                      You retain full control over your private couture records. At any point, you may contact our private client concierge team to request complete extraction of your sizing metrics, profile deletion, or withdrawal from our exclusive capsule newsletters.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      1. Scope & Acceptance
                    </h3>
                    <p>
                      By accessing the AURELIA digital atelier, you agree to comply with our Terms of Service. Every order placed represents a binding agreement for our master couturiers to prepare and handcraft your specified capsule choices.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      2. Luxury Pricing & Custom Taxes
                    </h3>
                    <p>
                      Prices listed on the website are displayed in USD ($) and are subject to adjustment without prior announcement. International duties, import taxes, and localized carrier fees are calculated securely at handover or paid directly to courier partners depending on destination policies.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      3. Custom Tailoring Agreement
                    </h3>
                    <p>
                      For items requiring custom tailoring, bespoke measurements provided by the client are processed immediately into physical fabric patterns. It is the buyer's sole responsibility to provide precise dimensions. Custom altered garments are uniquely yours and excluded from standard cancellations.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      4. Intellectual Property
                    </h3>
                    <p>
                      The designs, visual styling, custom gold trims, fabric patterns, imagery, and text showcased on AURELIA are protected by international trademark and design patents. Any reproduction or unauthorized commercial exploitation is strictly prohibited.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'returns' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      1. Effortless return window
                    </h3>
                    <p>
                      We strive to ensure your AURELIA selection perfectly coordinates with your lifestyle. If you are not fully captivated by your luxury order, you may initiate an exchange or return for store credit or refund within 30 days of delivery receipt.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      2. Elite Return Specifications
                    </h3>
                    <p>
                      To qualify for a complimentary return or exchange loop, items must be in original pristine condition:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1.5 pl-2 text-neutral-500">
                      <li>Unworn, unwashed, and completely unaltered</li>
                      <li>Secure custom gold boutique tags must remain attached</li>
                      <li>Returned inside the original climate-regulated linen gift box</li>
                      <li>Excludes bespoke gold-embellished tailoring or final-sale couture runs</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      3. Process & Verification
                    </h3>
                    <p>
                      Returns are subjected to thorough manual review by our quality control specialists in Paris upon receipt. Once approved, refunds are credited back to your original source of payment within 5–7 business days.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm md:text-base text-white font-medium tracking-wide mb-2 uppercase">
                      4. Complimentary Courier Exchange
                    </h3>
                    <p>
                      We provide custom prepaid shipping labels via FedEx or DHL for all qualified returns. Contact our Private Concierge at <span className={getGoldColor()}>concierge@aureliacouture.com</span> to receive your shipping manifest and schedule an exclusive carrier home pickup.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer section inside modal */}
            <div className="p-6 bg-[#050505] border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 text-center sm:text-left">
              <span className="font-sans text-[10px] text-neutral-600 font-light">
                Document Code: AUR-POL-2026-v2.1 • Last Revised July 2026
              </span>
              <button
                onClick={onClose}
                className={`px-6 py-2.5 font-sans font-semibold text-[10px] tracking-widest uppercase rounded-sm cursor-pointer transition-all duration-300 hover:opacity-90 active:scale-95 text-black ${getGoldBg()}`}
              >
                Acknowledge & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
