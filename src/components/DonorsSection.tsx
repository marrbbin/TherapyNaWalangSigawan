import React from 'react';
import { Gift } from 'lucide-react';
import { Donor } from '../types';

/**
 * SANCTUARY DONORS & SPONSORS LIST
 * 
 * Add donor entries here with their `id` and `ign`.
 * Their Minecraft player head will load automatically.
 */
export const DONORS: Donor[] = [
  {
    id: '1',
    ign: 'WintyMinty',
  },
];

export const DonorsSection: React.FC = () => {
  return (
    <section id="donors" className="py-20 bg-[#FAF9F6] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 shadow-2xs">
            <Gift className="w-3.5 h-3.5 text-neutral-900" />
            <span>Sanctuary Patrons & Sponsors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Donors & Supporters
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Special thanks to the generous players and sponsors who support our Minecraft counseling sanctuary. Their contributions help keep our birch table open and judgment-free.
          </p>
        </div>

        {/* Donors Grid - Clean ID and IGN Only */}
        {DONORS.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
            {DONORS.map((donor) => (
              <div
                key={donor.id}
                className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-3 group"
              >
                {/* Minecraft Player Head Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-neutral-100 border border-neutral-200 p-1 flex items-center justify-center overflow-hidden shadow-2xs group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={`https://mc-heads.net/avatar/${encodeURIComponent(donor.ign)}/80?v=${Date.now()}`}
                      alt={donor.ign}
                      className="w-full h-full object-contain rounded-xl"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/80';
                      }}
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-neutral-900 text-white text-[10px] font-mono font-semibold shadow-xs">
                    #{donor.id}
                  </span>
                </div>

                {/* IGN Display */}
                <div className="w-full min-w-0">
                  <h3 className="font-bold text-base text-neutral-900 truncate">
                    {donor.ign}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500 truncate mt-0.5">
                    @{donor.ign}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-neutral-200 rounded-3xl p-8 max-w-md mx-auto space-y-3">
            <Gift className="w-8 h-8 text-neutral-400 mx-auto" />
            <h4 className="font-bold text-neutral-900">No Donors Listed Yet</h4>
            <p className="text-xs text-neutral-500">
              Sanctuary sponsors will appear here.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
