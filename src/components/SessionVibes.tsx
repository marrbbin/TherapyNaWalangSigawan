import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SessionTone } from '../types';

interface SessionVibesProps {
  onSelectVibe: (tone: SessionTone, counselorPref?: string) => void;
}

export const SessionVibes: React.FC<SessionVibesProps> = ({ onSelectVibe }) => {
  const vibes = [
    {
      id: 'rp' as SessionTone,
      title: 'Lighthearted RP Session (Stream Vibe)',
      subtitle: 'Comedic & Content-Friendly',
      description:
        'Fun in-character therapy for stream content, comedic server drama, or Minecraft shenanigans. We play along with your character lore, server feuds, or chaotic mining burnout.',
      image: 'https://www.image2url.com/r2/default/images/1792063192144-4206560c-2ee0-472b-96ff-2f446966899a.png',
      fallbackColor: 'from-amber-100 to-orange-100',
      badge: '🎭 Stream Vibe',
      features: ['Stream / Recording friendly', 'Improvised funny diagnoses', 'In-character Minecraft lore'],
      counselorPref: 'Both of Us (Duo Session)',
    },
    {
      id: 'serious' as SessionTone,
      title: 'Genuine Heart-to-Heart (Serious / Safe Space)',
      subtitle: 'Quiet, Sincere & Confidential',
      description:
        'Need someone to actually listen? A calm, gentle conversation at our birch table with zero shouting and zero judgment. A grounded breathing room to unload your real-life stress.',
      image: 'https://www.image2url.com/r2/default/images/1792063342427-334a6121-7928-4319-a480-399e815dafc1.png',
      fallbackColor: 'from-emerald-50 to-teal-100',
      badge: '🤍 Safe & Confidential',
      features: ['100% Off-stream privacy', 'Active empathetic listening', 'Unhurried, peaceful pacing'],
      counselorPref: 'Both of Us (Duo Session)',
    },
    {
      id: 'duo' as const,
      tone: 'serious' as SessionTone,
      title: 'Duo / Co-Counseling Hangout',
      subtitle: 'Warm Tea & Shared Perspectives',
      description:
        'Sit down with both of us over virtual tea to unpack whatever is on your mind at your own pace. Two caring viewpoints helping you see things clearer in a relaxed atmosphere.',
      image: 'https://www.image2url.com/r2/default/images/1792063495261-67fb880d-d650-4098-bb8c-81a856503e4e.png',
      fallbackColor: 'from-stone-100 to-amber-50',
      badge: '🍵 Dual Support',
      features: ['Two dedicated listeners', 'Casual tea table atmosphere', 'Flexible topic exploration'],
      counselorPref: 'Both of Us (Duo Session)',
    },
  ];

  return (
    <section id="session-vibes" className="py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            Tailored Experiences
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Choose Your Session Vibe
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Every session is custom-tailored to what you need right now. Whether you're entertaining an audience or searching for genuine quiet peace, we welcome you.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vibes.map((vibe) => (
            <div
              key={vibe.title}
              className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Showcase on top */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={vibe.image}
                    alt={vibe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gradient if network image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle Top Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-neutral-200 text-neutral-800 text-xs font-semibold px-3 py-1 rounded-full shadow-2xs">
                    {vibe.badge}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-neutral-500 tracking-wide">
                      {vibe.subtitle}
                    </p>
                    <h3 className="text-xl font-bold text-neutral-900 tracking-tight leading-snug">
                      {vibe.title}
                    </h3>
                  </div>

                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {vibe.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
                    {vibe.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button at Bottom */}
              <div className="p-7 pt-0">
                <button
                  onClick={() => {
                    const toneToSet = vibe.id === 'rp' ? 'rp' : 'serious';
                    onSelectVibe(toneToSet, vibe.counselorPref);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full border border-neutral-200 bg-neutral-50 hover:bg-neutral-900 hover:text-white text-neutral-800 text-sm font-semibold transition-all duration-200 cursor-pointer shadow-2xs group-hover:border-neutral-900"
                >
                  <span>Select This Vibe</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
