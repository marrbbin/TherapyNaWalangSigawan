import React from 'react';
import { Heart, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  ign: string;
  rating: number;
  comment: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    ign: 'marbinnn',
    rating: 5,
    comment: 'PWEDE TO',
  },
  {
    id: 'test-2',
    ign: 'WintyMinty',
    rating: 5,
    comment: 'Akala ko sisigawan ako, pero di pala. Solid counselors!',
  },
  {
    id: 'test-3',
    ign: 'Pinatsummarsx',
    rating: 5,
    comment: 'halimawww',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-[#FAF9F6] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-neutral-900" />
            <span>Wall of Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Client Testimonials
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Real stories and thoughts from players who sat down with us at the birch table for a quiet conversation.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-neutral-200 rounded-3xl p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Quote mark accent in corner */}
              <div className="absolute top-6 right-6 text-neutral-200 group-hover:text-neutral-300 transition-colors pointer-events-none">
                <Quote className="w-8 h-8" />
              </div>

              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-neutral-400 text-xs font-mono ml-1.5">
                    ({review.rating}.0)
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-neutral-800 text-sm font-medium leading-relaxed italic pr-4">
                  "{review.comment}"
                </p>
              </div>

              {/* Patient Profile Footer */}
              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center gap-3.5">
                {/* Minecraft Avatar */}
                <div className="w-11 h-11 rounded-xl bg-neutral-100 border border-neutral-200 p-0.5 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                  <img
                    src={`https://mc-heads.net/avatar/${encodeURIComponent(review.ign)}/80`}
                    alt={review.ign}
                    className="w-full h-full object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://mc-heads.net/avatar/Steve/80';
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-sm text-neutral-900 truncate">
                    {review.ign}
                  </p>
                  <p className="text-[11px] font-mono text-neutral-500 truncate">
                    @{review.ign}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
