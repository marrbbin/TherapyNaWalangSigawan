import React from 'react';
import { Heart, Shield } from 'lucide-react';
import { Counselor } from '../types';

const COUNSELORS: Counselor[] = [
  {
    id: 'counselor-1',
    name: 'PINATSUMARSX',
    ign: 'PINATSUMARSX',
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
];

export const CounselorsSection: React.FC = () => {
  return (
    <section id="counselors" className="py-20 bg-[#FAF9F6] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-neutral-900" />
            <span>Meet Your Hosts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Meet the Counselors
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Every session is guided by two friendly, approachable hosts. PINATSUMARSX and Marbinnn are here to hold space, listen, and share virtual tea with you at the birch table.
          </p>
        </div>

        {/* 2-Card Minimalist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {COUNSELORS.map((counselor, idx) => (
            <div
              key={counselor.id}
              className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-xs relative transition-all duration-300 hover:shadow-md"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  {/* 3D Minecraft Head Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-neutral-100 border border-neutral-200 p-1 flex items-center justify-center overflow-hidden shadow-2xs">
                      <img
                        src={`https://mc-heads.net/avatar/${encodeURIComponent(counselor.ign)}/100`}
                        alt={counselor.name}
                        className="w-full h-full object-contain rounded-xl"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/100';
                        }}
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-neutral-900 text-white text-[10px] font-mono font-medium">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Name & Title */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-neutral-900">
                      {counselor.name}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      IGN: <span className="font-mono text-neutral-900">@{counselor.ign}</span>
                    </p>
                    <p className="text-sm font-medium text-neutral-700">
                      {counselor.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="pt-2">
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {counselor.bio}
                  </p>
                </div>

                {/* Specialization Tag */}
                <div className="pt-4 border-t border-neutral-100 text-xs">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Shield className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                    <span className="font-semibold text-neutral-800">Focus:</span>
                    <span>{counselor.specialty}</span>
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
