import React from 'react';
import { VolumeX, Home, MessageSquareQuote, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            About Our Sanctuary
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            A quiet sanctuary when the world gets too loud.
          </h2>
          <p className="text-neutral-600 leading-relaxed text-base">
            Modern internet spaces and gaming servers are often filled with shouting, toxic banter, and relentless pressure. 
            <strong> Therapy Na Walang Sigawan</strong> was created to be the exact opposite: a cozy Minecraft retreat where two friends sit with you and simply listen.
          </p>
        </div>

        {/* 3 Pillar Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-[#FAF9F6] border border-neutral-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-300 transition-all shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 text-neutral-900 flex items-center justify-center shadow-2xs">
                <VolumeX className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">
                01. Ang Pangako: Walang Sigawan
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Zero yelling, zero talking over you, zero hostile judgments. We hold space using gentle, respectful voices. Even in intense roleplay, the atmosphere remains respectful and grounded.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-200/60 text-xs text-neutral-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
              <span>Quiet, safe communication always</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#FAF9F6] border border-neutral-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-300 transition-all shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 text-neutral-900 flex items-center justify-center shadow-2xs">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">
                02. The Birch Sanctuary
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Our in-game room is custom built with birch wood planks, soft lantern glow, a soothing fireplace, and tea mugs on the counter. It provides a comforting virtual physical anchor while you chat.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-200/60 text-xs text-neutral-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neutral-700" />
              <span>Aesthetic in-game ambiance</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#FAF9F6] border border-neutral-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-300 transition-all shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 text-neutral-900 flex items-center justify-center shadow-2xs">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">
                03. Two Counselors, One Patient
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                You get the warmth of two supportive hosts. Whether you want thoughtful emotional reflections or comedic duo banter for your live stream, we balance each other to support you best.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-200/60 text-xs text-neutral-500 flex items-center gap-2">
              <MessageSquareQuote className="w-4 h-4 text-neutral-700" />
              <span>Attentive duo presence</span>
            </div>
          </div>

        </div>

        {/* Clean Editorial Quote Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-[#FAF9F6] border border-neutral-200/80 text-center max-w-3xl mx-auto space-y-2">
          <p className="text-base sm:text-lg italic text-neutral-800 font-editorial">
            "Hindi mo kailangang magpanggap na okay ka rito. Umupo ka lang, humigop ng tsaa, at pag-usapan natin."
          </p>
          <div className="text-xs text-neutral-500">
            <span>Therapy Na Walang Sigawan Sanctuary Philosophy</span>
          </div>
        </div>

      </div>
    </section>
  );
};
