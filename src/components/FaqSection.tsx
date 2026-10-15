import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Bakit "Therapy Na Walang Sigawan"?',
    answer:
      'We noticed how easy it is for online gaming, family environments, and social media to become excessively loud, aggressive, and overwhelming. Our sanctuary is founded on a single non-negotiable rule: no yelling, no talking down, and no invalidating your feelings. We communicate with quiet warmth.',
  },
  {
    question: 'Is this real professional medical therapy or peer support / roleplay?',
    answer:
      'Therapy Na Walang Sigawan is a peer-run emotional sanctuary and roleplay check-in space within Minecraft, created for compassionate listening, stress relief, and fun stream content. It is NOT a clinical psychiatric or medical service. If you are in crisis, we strongly encourage reaching out to professional mental health hotlines.',
  },
  {
    question: 'Can I stream our session on Twitch or YouTube?',
    answer:
      'Yes! Just pick "Lighthearted RP (Stream Vibe)" when booking. We will gladly participate in character lore, hilarious diagnoses, and entertaining counseling banter for your viewers. If you choose "Serious / Safe Space", we guarantee 100% confidentiality—no streaming, no recordings.',
  },
  {
    question: 'How do we connect during our booked appointment?',
    answer:
      'Once your booking is confirmed, we will reach out to you via your Discord username. We will provide our private Minecraft server IP and invite you to our calm voice channel. All you need to do is show up in-game and take a seat at our birch table.',
  },
  {
    question: 'What if I am shy and don\'t want to talk too much on mic?',
    answer:
      'That is completely okay! You can communicate through Minecraft in-game or Discord text chat, or just listen to us while sitting by the campfire. You set the pace entirely.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#FAF9F6] border-t border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-900" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600 text-sm max-w-xl mx-auto">
            Everything you need to know about preparing for your Minecraft sanctuary session.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white border border-neutral-200/90 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-neutral-50/60 transition-colors cursor-pointer"
                >
                  <span className="text-base font-bold text-neutral-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-neutral-900' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100/60 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ethical / Wellness Disclaimer Notice */}
        <div className="mt-12 p-5 rounded-2xl bg-white border border-neutral-200 flex items-start gap-3.5 text-xs text-neutral-500 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
          <p>
            <strong>Sanctuary Note:</strong> Therapy Na Walang Sigawan is a peer support community and Minecraft interactive experience. For clinical emergencies or urgent psychological care in the Philippines, please call the NCMH Crisis Hotline at 1553 or 0917-899-USAP (8727).
          </p>
        </div>

      </div>
    </section>
  );
};
