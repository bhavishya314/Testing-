import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, Sparkles, ArrowLeft, CheckCircle2, Globe } from 'lucide-react';
import { GoldStyle } from '../types';

interface ContactPageProps {
  goldStyle: GoldStyle;
  onBackToHome: () => void;
  onBackToShop: () => void;
}

export default function ContactPage({ goldStyle, onBackToHome, onBackToShop }: ContactPageProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

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

  const getGoldHoverBg = () => {
    if (goldStyle === 'champagne') return 'hover:bg-[#e6ca95]';
    if (goldStyle === 'bright') return 'hover:bg-[#ffe04c]';
    return 'hover:bg-[#d4ba97]'; // classic
  };

  const getGoldBorder = () => {
    if (goldStyle === 'champagne') return 'border-[#dfba73]/30 focus:border-[#dfba73]';
    if (goldStyle === 'bright') return 'border-[#ffd700]/30 focus:border-[#ffd700]';
    return 'border-[#c5a880]/30 focus:border-[#c5a880]'; // classic
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate premium boutique service submission
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    setFormSubmitted(false);
  };

  return (
    <motion.div
      id="contact-page-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20"
    >
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-12 border-b border-neutral-900 pb-6">
        <button
          onClick={onBackToHome}
          className="group flex items-center gap-2 text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>
        <span className={`font-serif text-[10px] tracking-[0.3em] uppercase ${getGoldColor()} flex items-center gap-1.5`}>
          <Sparkles className="w-3.5 h-3.5" />
          Maison Concierge
        </span>
      </div>

      {/* Main Grid: Contact Channels & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column (5 Cols): Premium Info & Quick Channels */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              L'Atelier <span className={getGoldColor()}>Concierge</span>
            </h1>
            <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
              Our private client specialists are available globally to assist you with bespoke fitting requests, product inquiries, order tracking, and custom design consultation.
            </p>
          </div>

          {/* Quick Communication Channels */}
          <div className="space-y-4">
            <h2 className="font-serif text-[11px] tracking-[0.25em] uppercase text-neutral-300 font-semibold border-b border-neutral-900 pb-3">
              Direct Channels
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {/* WhatsApp (Instant Private chat) */}
              <a
                href="https://wa.me/33140205050?text=Hello%20Aurelia%20Concierge"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-lg bg-neutral-950/60 border border-neutral-900 hover:border-emerald-500/30 transition-all duration-300 flex items-start gap-4"
              >
                <div className="p-3 rounded-full bg-emerald-950/30 border border-emerald-900/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xs md:text-sm text-white font-medium group-hover:text-emerald-400 transition-colors">
                    WhatsApp Client Chat
                  </h3>
                  <p className="font-sans text-[11px] text-neutral-400 font-light">
                    Real-time boutique assistance
                  </p>
                  <span className="inline-block font-sans text-[9px] text-emerald-500 tracking-wider font-semibold uppercase pt-1">
                    Typically Replies in Minutes
                  </span>
                </div>
              </a>

              {/* Private Email */}
              <a
                href="mailto:concierge@aurelia.com"
                className="group p-5 rounded-lg bg-neutral-950/60 border border-neutral-900 hover:border-amber-500/30 transition-all duration-300 flex items-start gap-4"
              >
                <div className={`p-3 rounded-full bg-neutral-900 border border-neutral-800 ${getGoldColor()} group-hover:bg-white group-hover:text-black transition-all duration-300`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xs md:text-sm text-white font-medium group-hover:text-amber-400 transition-colors">
                    Private Concierge Email
                  </h3>
                  <p className="font-sans text-[11px] text-neutral-400 font-light">
                    concierge@aurelia.com
                  </p>
                  <span className="inline-block font-sans text-[9px] text-neutral-500 tracking-wider font-semibold uppercase pt-1">
                    Guaranteed Same-day Response
                  </span>
                </div>
              </a>

              {/* Voice Assistance */}
              <a
                href="tel:+33140205050"
                className="group p-5 rounded-lg bg-neutral-950/60 border border-neutral-900 hover:border-blue-500/30 transition-all duration-300 flex items-start gap-4"
              >
                <div className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xs md:text-sm text-white font-medium group-hover:text-blue-400 transition-colors">
                    Telephone Assistance
                  </h3>
                  <p className="font-sans text-[11px] text-neutral-400 font-light">
                    +33 (0) 1 40 20 50 50
                  </p>
                  <span className="inline-block font-sans text-[9px] text-neutral-500 tracking-wider font-semibold uppercase pt-1">
                    Mon–Fri, 9:00 AM – 6:00 PM CET
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Maison Salons Section */}
          <div className="space-y-4">
            <h2 className="font-serif text-[11px] tracking-[0.25em] uppercase text-neutral-300 font-semibold border-b border-neutral-900 pb-3">
              Our Physical Salons
            </h2>
            <div className="space-y-3 font-sans text-xs text-neutral-400 font-light">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif text-[11px] uppercase tracking-wider font-bold">Paris flagship salon</strong>
                  <span>22 Place Vendôme, 75001 Paris, France</span>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif text-[11px] uppercase tracking-wider font-bold">milan private showroom</strong>
                  <span>Via Montenapoleone 8, 20121 Milan, Italy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3 pt-2">
            <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-neutral-500 font-semibold">
              Connect Globally
            </span>
            <div className="flex items-center gap-2.5">
              {[
                { name: 'Instagram', href: 'https://instagram.com' },
                { name: 'Facebook', href: 'https://facebook.com' },
                { name: 'X', href: 'https://twitter.com' },
                { name: 'Pinterest', href: 'https://pinterest.com' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded border border-neutral-900 bg-neutral-950 hover:bg-white hover:text-black text-neutral-400 font-sans text-[10px] font-bold tracking-widest uppercase transition-all duration-300"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Contact Form Card */}
        <div className="lg:col-span-7 bg-neutral-950/40 border border-neutral-900 p-8 md:p-10 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-neutral-900 rounded-full blur-[80px] opacity-20 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="font-serif text-xl font-bold text-white">Send a Private Message</h2>
                  <p className="font-sans text-[11px] text-neutral-500 font-light">
                    Fields marked with an asterisk (*) are required.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block font-sans text-[10px] tracking-wider uppercase text-neutral-400 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jean Laurent"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-black/60 border ${getGoldBorder()} rounded-md px-4 py-3 font-sans text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-opacity-40 transition-all duration-300`}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block font-sans text-[10px] tracking-wider uppercase text-neutral-400 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. j.laurent@luxury.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-black/60 border ${getGoldBorder()} rounded-md px-4 py-3 font-sans text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-opacity-40 transition-all duration-300`}
                    />
                  </div>
                </div>

                {/* Subject Selector */}
                <div className="space-y-2">
                  <label className="block font-sans text-[10px] tracking-wider uppercase text-neutral-400 font-medium">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full bg-black/60 border ${getGoldBorder()} rounded-md px-4 py-3 font-sans text-xs text-white focus:outline-none transition-all duration-300 cursor-pointer`}
                  >
                    <option value="General Inquiry" className="bg-neutral-950">General Inquiry</option>
                    <option value="Custom Tailoring & Fitting" className="bg-neutral-950">Custom Tailoring & Fitting</option>
                    <option value="Bespoke Order Status" className="bg-neutral-950">Bespoke Order Status</option>
                    <option value="Press & Careers" className="bg-neutral-950">Press & Careers</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="block font-sans text-[10px] tracking-wider uppercase text-neutral-400 font-medium">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your request with details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-black/60 border ${getGoldBorder()} rounded-md px-4 py-3 font-sans text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-opacity-40 transition-all duration-300 resize-none`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-4 rounded-md font-sans text-[11px] tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${getGoldBg()} ${getGoldHoverBg()} text-black`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit message to Salon</span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="submission-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="inline-flex p-4 rounded-full bg-neutral-900 border border-neutral-800 text-amber-500 mb-2">
                  <CheckCircle2 className={`w-12 h-12 ${getGoldColor()}`} />
                </div>
                
                <div className="space-y-2 max-w-md mx-auto">
                  <h2 className="font-serif text-2xl font-bold text-white">Transmission Successful</h2>
                  <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your inquiry regarding <span className="text-white italic">"{formData.subject}"</span> has been transmitted to our Paris salon.
                  </p>
                  <p className="font-sans text-xs text-neutral-500">
                    A dedicated client specialist will review your files and contact you shortly.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6 max-w-sm mx-auto">
                  <button
                    onClick={handleResetForm}
                    className="flex-1 py-3 px-4 rounded border border-neutral-800 hover:border-neutral-500 text-neutral-400 hover:text-white font-sans text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer bg-transparent"
                  >
                    Send Another
                  </button>
                  <button
                    onClick={onBackToShop}
                    className={`flex-1 py-3 px-4 rounded font-sans text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer ${getGoldBg()} ${getGoldHoverBg()} text-black`}
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
