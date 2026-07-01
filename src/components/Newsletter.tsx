import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';
import { GoldStyle } from '../types';

interface NewsletterProps {
  goldStyle: GoldStyle;
}

export default function Newsletter({ goldStyle }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (goldStyle === 'champagne') return 'focus:border-[#dfba73] focus:ring-[#dfba73]/10';
    if (goldStyle === 'bright') return 'focus:border-[#ffd700] focus:ring-[#ffd700]/10';
    return 'focus:border-[#c5a880] focus:ring-[#c5a880]/10'; // classic
  };

  const getButtonGlow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_0_20px_rgba(223,186,115,0.45)]';
    if (goldStyle === 'bright') return 'hover:shadow-[0_0_25px_rgba(255,215,0,0.55)]';
    return 'hover:shadow-[0_0_20px_rgba(197,168,128,0.45)]'; // classic
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate premium API subscription delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1200);
  };

  return (
    <section id="newsletter-section" className="py-16 md:py-20 px-6 md:px-12 bg-[#050505] text-white relative overflow-hidden">
      {/* Structural visual split borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900/60 to-transparent" />
      
      {/* Intricate premium circular grid line background */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neutral-950 rounded-full blur-[180px] opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          id="newsletter-container"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-neutral-950/40 border border-neutral-900/80 rounded-3xl p-8 md:p-16 space-y-8 backdrop-blur-md relative overflow-hidden"
        >
          {/* Subtle gold line highlights at the top corners */}
          <div className={`absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-${goldStyle === 'champagne' ? '[#dfba73]' : goldStyle === 'bright' ? '[#ffd700]' : '[#c5a880]'}/20 to-transparent`} />

          {/* Icon Badge */}
          <div className="inline-flex p-3 rounded-full bg-neutral-900/60 border border-neutral-850 text-white mb-2">
            <Mail className={`w-6 h-6 ${getGoldColor()}`} />
          </div>

          {/* Headers */}
          <div className="space-y-3 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <span className={`w-4 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
              <span className={`font-serif text-[9px] tracking-[0.4em] uppercase ${getGoldColor()}`}>
                Maison Privilege
              </span>
              <span className={`w-4 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
              Join the <span className={getGoldColor()}>AURELIA</span> Community
            </h2>
            <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
              Receive bespoke announcements, priority access to seasonal drops, early invitations to private showroom collections, and member-only privilege offerings.
            </p>
          </div>

          {/* Form and Status Messages */}
          <div className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  id="newsletter-form"
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="relative flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-4 flex items-center text-neutral-500 pointer-events-none">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        id="newsletter-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        disabled={isSubmitting}
                        className={`w-full pl-11 pr-4 py-3.5 bg-black/60 border border-neutral-850 rounded-lg text-xs font-sans tracking-wide text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all duration-300 disabled:opacity-50 ${getGoldBorderClass()}`}
                      />
                    </div>
                    
                    <button
                      id="newsletter-subscribe-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3.5 rounded-lg font-sans font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all duration-300 shrink-0 transform active:scale-98 cursor-pointer ${getGoldBg()} ${getButtonGlow()} disabled:opacity-50`}
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  id="newsletter-success-block"
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-850 flex flex-col items-center space-y-3"
                >
                  <div className={`p-2.5 rounded-full bg-neutral-950 border border-neutral-800 text-white ${getGoldColor()}`}>
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm tracking-widest text-white uppercase font-semibold">
                      Welcome to the Club
                    </h3>
                    <p className="font-sans text-[11px] text-neutral-400 font-light">
                      Your privilege membership has been authorized. Check your inbox for the invitation.
                    </p>
                  </div>
                  <button
                    id="newsletter-reset-btn"
                    onClick={() => setIsSubmitted(false)}
                    className={`text-[9px] font-sans tracking-widest uppercase transition-colors hover:text-white ${getGoldColor()}`}
                  >
                    Subscribe another email
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Privacy footer */}
          <div className="space-y-1.5 max-w-sm mx-auto pt-2">
            <p className="font-sans text-[10px] text-neutral-500 font-light leading-relaxed">
              By subscribing, you agree to our <span className="text-neutral-400 underline cursor-pointer hover:text-neutral-300">Privacy Policy</span> and consent to receive our promotional newsletters.
            </p>
            <p className="font-sans text-[9px] text-neutral-600 font-light">
              You can unsubscribe at any time. Secure unsubscribe link provided in every drop.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
