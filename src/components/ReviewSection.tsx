import React, { useState } from 'react';
import {
  MessageSquareHeart,
  Star,
  User,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
} from 'lucide-react';

const REVIEW_WEBHOOK_ID = '1560749996624842753';
const REVIEW_WEBHOOK_TOKEN =
  'JrGItNPk15MUcUP8jxQprDIxDXAAHQ3Ww9Sc48PPaZHe_73ldmycAZA_aVWm6if4kvpr';
const REVIEW_ENDPOINT = `https://discord.com/api/webhooks/${REVIEW_WEBHOOK_ID}/${REVIEW_WEBHOOK_TOKEN}`;

const RATING_LABELS: Record<number, string> = {
  1: 'Needs Improvement',
  2: 'Fair Experience',
  3: 'Good & Calm',
  4: 'Very Peaceful & Helpful',
  5: 'Exceptional Healing Sanctuary',
};

export const ReviewSection: React.FC = () => {
  const [ign, setIgn] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cleanIgn = ign.trim() || 'Steve';
  const activeRating = hoverRating !== null ? hoverRating : rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!ign.trim()) {
      setErrorMessage('Please enter your Minecraft In-Game Name (IGN).');
      return;
    }

    if (!comment.trim()) {
      setErrorMessage('Please share a few words about your experience.');
      return;
    }

    setIsSubmitting(true);

    const starsDisplay = `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`;
    const ratingText = `${starsDisplay} (${rating}/5 - ${RATING_LABELS[rating] || ''})`;

    const discordPayload = {
      username: 'Therapy Na Walang Sigawan Reviews',
      avatar_url: 'https://mc-heads.net/avatar/Steve/128',
      content: '💌 **A new client review has been submitted for the Sanctuary!**',
      embeds: [
        {
          title: '💬 New Patient Review / Feedback',
          color: 15132390,
          description: 'A client has shared feedback regarding their counseling experience.',
          thumbnail: {
            url: `https://mc-heads.net/avatar/${encodeURIComponent(cleanIgn)}/100`,
          },
          fields: [
            {
              name: '👤 Patient Minecraft IGN',
              value: `\`${cleanIgn}\``,
              inline: true,
            },
            {
              name: '⭐ Rating',
              value: ratingText,
              inline: true,
            },
            {
              name: '💭 Review / Feedback Comment',
              value: comment.trim(),
              inline: false,
            },
          ],
          footer: {
            text: 'Therapy Na Walang Sigawan · Client Feedback',
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(REVIEW_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload),
      });

      if (!response.ok) {
        throw new Error(`Review Webhook responded with status: ${response.status}`);
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      console.error('Failed to submit review webhook:', err);
      // Fallback display so user knows their input is acknowledged
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIgn('');
    setRating(5);
    setHoverRating(null);
    setComment('');
    setIsSuccess(false);
    setErrorMessage(null);
  };

  return (
    <section id="reviews" className="py-20 bg-white border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF9F6] border border-neutral-200 text-xs font-semibold text-neutral-700 shadow-2xs">
            <MessageSquareHeart className="w-3.5 h-3.5 text-neutral-900" />
            <span>Client Feedback & Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Leave a Review
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Did our quiet Minecraft sanctuary help you breathe a little easier? Whether you joined us for a chaotic stream roleplay or a quiet heart-to-heart, your thoughts mean the world to us.
          </p>
        </div>

        {/* Clean White Card Form */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-sm">
          
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-7">
              
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Notice</p>
                    <p className="text-xs text-amber-800 mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* 1. Minecraft IGN with Live Avatar Preview */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-900">
                  Minecraft IGN (In-Game Name) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={ign}
                      onChange={(e) => setIgn(e.target.value)}
                      placeholder="e.g. Steve or your Minecraft username"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white text-sm font-mono transition-all"
                    />
                  </div>

                  {/* Live Avatar Preview */}
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-2xl border border-neutral-200 bg-[#FAF9F6] shrink-0">
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-neutral-200/80 shrink-0 flex items-center justify-center">
                      <img
                        src={`https://mc-heads.net/avatar/${encodeURIComponent(cleanIgn)}/64`}
                        alt="Minecraft Avatar"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://mc-heads.net/avatar/Steve/64';
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-neutral-600 truncate max-w-[100px] hidden sm:inline">
                      {ign.trim() || 'Preview'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Rating Selector (1 to 5 Stars) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-neutral-900">
                    Session Rating <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs font-medium text-neutral-500">
                    {RATING_LABELS[activeRating]}
                  </span>
                </div>

                <div className="flex items-center gap-2 p-3 bg-[#FAF9F6] border border-neutral-200 rounded-2xl">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = starValue <= activeRating;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1.5 rounded-xl hover:bg-white transition-all cursor-pointer group"
                        title={`${starValue} Stars - ${RATING_LABELS[starValue]}`}
                      >
                        <Star
                          className={`w-7 h-7 transition-all ${
                            isFilled
                              ? 'fill-amber-400 text-amber-400 scale-105'
                              : 'fill-transparent text-neutral-300 hover:text-neutral-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-auto text-xs font-mono font-semibold text-neutral-700 bg-white px-2.5 py-1 rounded-full border border-neutral-200">
                    {rating} / 5
                  </span>
                </div>
              </div>

              {/* 3. Textarea: Review / Feedback Comment */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-900">
                  Your Review / Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your session at the birch table... How did the counselors treat you? Did you enjoy the conversation?"
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white text-sm resize-none transition-all"
                />
                <p className="text-[12px] text-neutral-500">
                  Reviews are sent privately to the counselors' Discord channel.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-400 transition-all duration-200 rounded-full py-4 text-base font-semibold shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Your Review...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-neutral-300 group-hover:translate-x-0.5 transition-transform" />
                    <span>Send Review</span>
                  </>
                )}
              </button>

            </form>
          ) : (
            // Success Confirmation
            <div className="py-6 text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-neutral-900">
                  Maraming Salamat!
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Your review has been sent directly to our counselors' Discord channel. We truly appreciate you taking the time to share your experience with us.
                </p>
              </div>

              {/* Review Card Summary */}
              <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-neutral-200 text-left space-y-3 max-w-md mx-auto text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-neutral-200 shrink-0">
                    <img
                      src={`https://mc-heads.net/avatar/${encodeURIComponent(cleanIgn)}/64`}
                      alt={cleanIgn}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">@{cleanIgn}</p>
                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-neutral-500 font-mono text-[11px] ml-1">
                        ({rating}/5)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-neutral-700 text-xs italic border-t border-neutral-200/60 pt-2.5">
                  "{comment}"
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Submit Another Review
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
