import React from 'react';
import { motion } from 'motion/react';
import { Instagram, ArrowUpRight, Sparkles } from 'lucide-react';
import { GoldStyle } from '../types';

interface InstagramPost {
  id: string;
  image: string;
  likes: string;
  comments: string;
}

interface InstagramGalleryProps {
  goldStyle: GoldStyle;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop',
    likes: '1.2k',
    comments: '48',
  },
  {
    id: 'post-2',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=400&auto=format&fit=crop',
    likes: '840',
    comments: '32',
  },
  {
    id: 'post-3',
    image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=400&auto=format&fit=crop',
    likes: '2.1k',
    comments: '95',
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=400&auto=format&fit=crop',
    likes: '1.5k',
    comments: '64',
  },
  {
    id: 'post-5',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=400&auto=format&fit=crop',
    likes: '980',
    comments: '41',
  },
  {
    id: 'post-6',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop',
    likes: '1.7k',
    comments: '78',
  },
  {
    id: 'post-7',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop',
    likes: '1.1k',
    comments: '53',
  },
  {
    id: 'post-8',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400&auto=format&fit=crop',
    likes: '2.4k',
    comments: '112',
  }
];

export default function InstagramGallery({ goldStyle }: InstagramGalleryProps) {
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
    if (goldStyle === 'champagne') return 'group-hover:border-[#dfba73]/40';
    if (goldStyle === 'bright') return 'group-hover:border-[#ffd700]/40';
    return 'group-hover:border-[#c5a880]/40'; // classic
  };

  const getButtonGlow = () => {
    if (goldStyle === 'champagne') return 'hover:shadow-[0_0_20px_rgba(223,186,115,0.45)]';
    if (goldStyle === 'bright') return 'hover:shadow-[0_0_25px_rgba(255,215,0,0.55)]';
    return 'hover:shadow-[0_0_20px_rgba(197,168,128,0.45)]'; // classic
  };

  return (
    <section id="instagram-gallery-section" className="py-24 px-6 md:px-12 bg-[#050505] text-white relative overflow-hidden">
      {/* Structural visual split borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-900/60 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-[1px] ${goldStyle === 'champagne' ? 'bg-[#dfba73]' : goldStyle === 'bright' ? 'bg-[#ffd700]' : 'bg-[#c5a880]'}`} />
              <span className={`font-serif text-[10px] tracking-[0.4em] uppercase ${getGoldColor()}`}>
                Maison Community
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-widest text-white uppercase leading-tight">
              Follow <span className={getGoldColor()}>@AURELIA</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
              Step inside our digital atelier. Tag <span className="text-white font-normal">#AureliaCouture</span> to share your bespoke streetwear pairings and get featured in our premium global catalog.
            </p>
          </div>

          {/* Follow Button */}
          <div className="shrink-0">
            <a
              id="instagram-follow-btn"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-sm font-sans font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 transform active:scale-98 shadow-lg ${getGoldBg()} ${getButtonGlow()}`}
            >
              <Instagram className="w-4 h-4" />
              <span>Follow on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Gallery Grid: 2 columns mobile, 4 columns tablet/desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {INSTAGRAM_POSTS.map((post, index) => {
            return (
              <motion.a
                id={`instagram-post-${post.id}`}
                key={post.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative aspect-square rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950 transition-all duration-500 ease-out ${getGoldBorderClass()}`}
              >
                {/* Instagram Image */}
                <img
                  src={post.image}
                  alt={`AURELIA Instagram Post ${post.id}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.8] group-hover:brightness-[0.4]"
                />

                {/* Subtle dark layout overlay (reinforced by hover states) */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-500 pointer-events-none" />

                {/* Luxury Hover Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 p-4 space-y-4">
                  {/* Central Instagram Icon with gold accent color */}
                  <div className={`p-3.5 rounded-full bg-black/60 border border-neutral-850 backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${getGoldColor()}`}>
                    <Instagram className="w-5 h-5" />
                  </div>

                  <div className="text-center space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    <span className="block font-sans text-[10px] tracking-[0.25em] font-bold text-white uppercase">
                      View Post
                    </span>
                    <span className="block font-sans text-[9px] tracking-wider text-neutral-400">
                      ♥ {post.likes} &nbsp; • &nbsp; 💬 {post.comments}
                    </span>
                  </div>
                </div>

                {/* Micro thin luxury corner accent marks on hover */}
                <div className="absolute inset-3 border border-transparent group-hover:border-white/5 rounded-xl transition-colors duration-500 pointer-events-none" />
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
