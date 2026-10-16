import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Heart, Coffee } from 'lucide-react';

interface HeroSectionProps {
  onBookClick: () => void;
}

const DEFAULT_POSTER = 'https://cdn.phototourl.com/member/2026-10-16-4cfbdd1f-7c43-41c4-bb90-dbf362af659d.png';

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookClick }) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-neutral-200/20 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Hero Content) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 lg:pr-4">
            
            {/* Small Minimalist Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-2xs text-xs font-medium text-neutral-700">
              <span className="w-2 h-2 rounded-full bg-neutral-900" />
              <span>A safe and peaceful space for you</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.12] text-balance">
              Therapy Na Walang Sigawan
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl">
              Gentle Conversations, True Healing. Just the two of us holding a quiet, judgment-free space in Minecraft. Whether you want a fun roleplay check-in for the stream or a genuine, peaceful chat to get something off your chest.
            </p>

            {/* Action CTA & Micro Trust */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onBookClick}
                className="bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-200 rounded-full px-8 py-4 text-base font-semibold shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-center whitespace-nowrap"
              >
                Book Your Session Today
              </button>

              <a
                href="#about"
                className="px-6 py-4 rounded-full border border-neutral-200 bg-white text-neutral-800 text-base font-medium hover:bg-neutral-50 transition-colors text-center whitespace-nowrap"
              >
                Learn How It Works
              </a>
            </div>

            {/* Quick Guarantees / Reassurance */}
            <div className="pt-4 border-t border-neutral-200/60 w-full grid grid-cols-3 gap-4 text-neutral-600 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Zero shouting guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Confidential or streamable</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Cozy birch room setup</span>
              </div>
            </div>

          </div>

          {/* Right Column (Poster Showcase Card) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-md border border-neutral-200 bg-white group">
              
              {/* Poster Image / Fallback Sanctuary Canvas */}
              <div className="relative aspect-3/4 w-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                {!imageError ? (
                  <img
                    src={DEFAULT_POSTER}
                    alt="Therapy Na Walang Sigawan Sanctuary Poster"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      setImageError(true);
                    }}
                  />
                ) : (
                  // Aesthetic Fallback Container when /poster.jpg isn't present
                  <div className="w-full h-full bg-gradient-to-b from-[#F7F5EE] via-[#EFECE3] to-[#E3DFD4] p-8 flex flex-col justify-between text-neutral-900 relative">
                    {/* Decorative subtle sanctuary layout */}
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-sm">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Minecraft Sanctuary</p>
                        <h3 className="text-2xl font-bold font-editorial text-neutral-900">
                          Therapy Na Walang Sigawan
                        </h3>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          "Walang boses na tataas. Walang sermon. Makikinig lang kami."
                        </p>
                      </div>
                    </div>

                    {/* Sanctuary Cozy Graphic Illustration */}
                    <div className="my-auto py-6 flex flex-col items-center justify-center text-center">
                      <div className="relative w-44 h-44 rounded-2xl bg-white/70 backdrop-blur-xs border border-neutral-300/60 p-4 shadow-sm flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">🌱</span>
                          <span className="text-2xl">🪵</span>
                          <span className="text-2xl">☕</span>
                        </div>
                        <p className="text-xs font-semibold text-neutral-800">Two Cozy Chairs</p>
                        <p className="text-[11px] text-neutral-500 mt-1">One Birch Table · Warm Lantern Light</p>
                        <div className="mt-3 px-2.5 py-1 rounded-full bg-neutral-900/10 text-[10px] text-neutral-700 font-medium">
                          Safe & Calming In-Game Space
                        </div>
                      </div>
                    </div>

                    {/* Bottom poster caption */}
                    <div className="border-t border-neutral-300/50 pt-4 flex items-center justify-between text-xs text-neutral-600">
                      <span>Duo In-Game Counseling</span>
                      <span className="font-mono text-[11px] text-neutral-500">mc-sanctuary</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Showcase Card Footnote */}
              <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium text-neutral-900">Sanctuary Open</span>
                  <span className="text-neutral-400">·</span>
                  <span>Booking Active</span>
                </div>
                <span className="text-neutral-500 italic">2 Counselors Online</span>
              </div>

            </div>

            {/* Subtle decorative quote tag */}
            <p className="mt-3 text-center text-xs text-neutral-500 italic">
              "A quiet corner in the overworld to breathe, laugh, or unpack your week."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
