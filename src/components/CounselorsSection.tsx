import React, { useState } from 'react';
import { Heart, Shield, RefreshCw } from 'lucide-react';
import { Counselor } from '../types';

const COUNSELORS: Counselor[] = [
  {
    id: 'counselor-1',
    name: 'Pinatsummarsx',
    ign: 'Pinatsummarsx',
    role: 'Lead Counselor & Calming Anchor',
    specialty: 'Active Listening & Burnout Care',
    bio: 'Dedicated to holding a peaceful, non-confrontational space. Specializes in helping players unpack real-life stress, digital fatigue, and server drama with zero judgment.',
  },
  {
    id: 'counselor-2',
    name: 'Marbinnn',
    ign: 'marbinnn',
    role: 'Co-Counselor & Sanctuary Host',
    specialty: 'Perspective Sharing & Roleplay Therapy',
    bio: 'Brings gentle warmth, virtual tea hospitality, and thoughtful comedic timing. Loves improvising lighthearted roleplay scenarios or providing reassuring companionship.',
  },
  {
    id: 'counselor-3',
    name: 'DK San',
    ign: 'DikoySan',
    role: 'Counselor',
    specialty: 'Roleplay Therapy & Perspective Sharing',
    bio: 'A calm presence, an open mind, and probably a cup of virtual tea ready for you. DK San offers a safe space to vent, reflect, share perspectives, or simply take a breather from the chaos. Believes in listening before judging, understanding before reacting, and finding humor even on difficult days. Whether you need a different point of view, a little encouragement, or someone to sit with you through an awkward roleplay scenario, youre welcome here.',
  },
  {
    id: 'counselor-4',
    name: 'seddd',
    ign: 'seddd',
    role: 'Counselor & Sanctuary Companion',
    specialty: 'Casual Venting & Server Life',
    bio: 'Easygoing, grounded, and always down to chill at the birch table. Seddd brings a relaxed vibe to help take the edge off a stressful day—whether you want to rant about lost diamonds or just need a calm voice while you mine.',
    isCracked: true,
  },
];

export const CounselorsSection: React.FC = () => {
  // Timestamp-based cache buster ensures browser always fetches the latest Minecraft skin
  const [cacheKey, setCacheKey] = useState<number>(() => Date.now());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [refreshedNotice, setRefreshedNotice] = useState<boolean>(false);

  const handleRefreshSkins = () => {
    setIsRefreshing(true);
    setRefreshedNotice(false);
    const newTimestamp = Date.now();
    setCacheKey(newTimestamp);

    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshedNotice(true);
      setTimeout(() => setRefreshedNotice(false), 2500);
    }, 700);
  };

  return (
    <section id="counselors" className="py-20 bg-[#FAF9F6] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 shadow-2xs">
              <Heart className="w-3.5 h-3.5 text-neutral-900" />
              <span>Meet Your Hosts</span>
            </div>

            {/* Quick Skin Refresh Button */}
            <button
              onClick={handleRefreshSkins}
              disabled={isRefreshing}
              title="Force refresh Minecraft skins from Mojang servers"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-neutral-900' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : refreshedNotice ? 'Skins Updated!' : 'Sync Skins'}</span>
            </button>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Meet the Counselors
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Every session is guided by friendly, approachable hosts. Pinatsummarsx, Marbinnn, DK San, and seddd are here to hold space, listen, and share virtual tea with you at the birch table.
          </p>
        </div>

        {/* 4-Card Minimalist Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {COUNSELORS.map((counselor, idx) => (
            <div
              key={counselor.id}
              className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 shadow-xs relative transition-all duration-300 hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  {/* 3D Minecraft Head Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-neutral-100 border border-neutral-200 p-1 flex items-center justify-center overflow-hidden shadow-2xs">
                      <img
                        key={`${counselor.ign}-${cacheKey}`}
                        src={counselor.customAvatar || `https://mc-heads.net/avatar/${encodeURIComponent(counselor.ign)}/100?v=${cacheKey}`}
                        alt={counselor.name}
                        className="w-full h-full object-contain rounded-xl"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://mc-heads.net/avatar/Steve/100?v=${cacheKey}`;
                        }}
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-neutral-900 text-white text-[10px] font-mono font-medium shadow-xs">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Name & Title (with strict min-w-0 & word wrapping to avoid overflow) */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3
                      className="text-lg font-bold text-neutral-900 tracking-tight break-words leading-tight"
                      title={counselor.name}
                    >
                      {counselor.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider truncate">
                      IGN: <span className="font-mono text-neutral-900">@{counselor.ign}</span>
                    </p>
                    <p className="text-xs font-medium text-neutral-700 leading-snug">
                      {counselor.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="pt-1">
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {counselor.bio}
                  </p>
                </div>
              </div>

              {/* Specialization Tag */}
              <div className="mt-5 pt-4 border-t border-neutral-100 text-xs">
                <div className="flex items-start gap-2 text-neutral-600">
                  <Shield className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                  <div className="min-w-0 text-xs leading-snug">
                    <span className="font-semibold text-neutral-800">Focus: </span>
                    <span className="text-neutral-600 break-words">{counselor.specialty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
