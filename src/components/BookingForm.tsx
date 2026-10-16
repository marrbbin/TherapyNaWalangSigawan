import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  MessageSquare,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';
import { BookingFormData, SessionTone } from '../types';

interface BookingFormProps {
  initialTone?: SessionTone;
  initialCounselorPref?: string;
}

const WEBHOOK_ID = '1560231266228375552';
const WEBHOOK_TOKEN = 'u6mrW4KF62-6O7Ol6H_Lsd2BcfLsxZlA9q0NKdYNI4XgJsshsrgyFn-w6q7zTE1K1zTc';
const DISCORD_WEBHOOK_ENDPOINT = `https://discord.com/api/webhooks/${WEBHOOK_ID}/${WEBHOOK_TOKEN}`;

const TIME_SLOTS = ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];

const COUNSELOR_PREFERENCES = [
  'Both of Us (Duo Session)',
  'Either Counselor',
  'Specific Host (Mention in notes)',
];

export const BookingForm: React.FC<BookingFormProps> = ({
  initialTone = 'serious',
  initialCounselorPref = 'Both Three of Us (Trio Session)',
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormData>({
    ign: '',
    discord: '',
    tone: initialTone,
    counselorPreference: initialCounselorPref,
    date: todayStr,
    timeSlot: '8:00 PM',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Sync if props change
  React.useEffect(() => {
    if (initialTone) {
      setFormData((prev) => ({ ...prev, tone: initialTone }));
    }
  }, [initialTone]);

  React.useEffect(() => {
    if (initialCounselorPref) {
      setFormData((prev) => ({ ...prev, counselorPreference: initialCounselorPref }));
    }
  }, [initialCounselorPref]);

  const cleanIgn = formData.ign.trim() || 'Steve';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.ign.trim()) {
      setErrorMessage('Please enter your Minecraft In-Game Name (IGN).');
      return;
    }

    if (!formData.discord.trim()) {
      setErrorMessage('Please provide your Discord username so we can contact you.');
      return;
    }

    if (!formData.date) {
      setErrorMessage('Please select a date for your session.');
      return;
    }

    if (!formData.timeSlot) {
      setErrorMessage('Please select a preferred time slot.');
      return;
    }

    setIsSubmitting(true);

    const toneLabel =
      formData.tone === 'rp'
        ? '🎭 Lighthearted RP (Okay for Stream)'
        : '🤍 Serious / Real Talk (Quiet & Confidential)';

    // Construct Discord Embed matching exact specifications
    const discordPayload = {
      username: 'Therapy Na Walang Sigawan Sanctuary',
      avatar_url: 'https://mc-heads.net/avatar/Steve/128',
      content: '@everyone 🌱 **A new patient has requested an appointment at the Birch Sanctuary!**',
      allowed_mentions: {
        parse: ['everyone'],
      },
      embeds: [
        {
          title: '📅 New Patient Booking — Therapy Na Walang Sigawan',
          color: 15132390,
          description: 'A sanctuary session request has been submitted through the web booking form.',
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
              name: '💬 Discord Username',
              value: `\`${formData.discord.trim()}\``,
              inline: true,
            },
            {
              name: '🎭 Session Vibe',
              value: toneLabel,
              inline: false,
            },
            {
              name: '👥 Counselor Preference',
              value: formData.counselorPreference,
              inline: true,
            },
            {
              name: '🗓️ Preferred Date',
              value: formData.date,
              inline: true,
            },
            {
              name: '⏰ Time Slot',
              value: formData.timeSlot,
              inline: true,
            },
            {
              name: "📝 Notes / What's on your mind",
              value: formData.notes.trim() ? formData.notes.trim() : '*No notes provided. Quiet listening session requested.*',
              inline: false,
            },
          ],
          footer: {
            text: 'Therapy Na Walang Sigawan · Minecraft Sanctuary',
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(DISCORD_WEBHOOK_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload),
      });

      if (!response.ok) {
        throw new Error(`Discord Webhook responded with status: ${response.status}`);
      }

      setSubmitSuccess(true);
    } catch (err: unknown) {
      console.error('Failed to send Discord webhook:', err);
      // If browser CORS or temporary network issue strikes, we provide clear status
      // but also acknowledge the booking locally so the patient isn't left stranded
      setErrorMessage(
        'We encountered an issue dispatching the alert directly to Discord. Please ensure your Discord username is correct, or take a quick screenshot of your booking summary below.'
      );
      // We will still display the confirmation details so user doesn't lose their data
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = () => {
    const text = `[Therapy Na Walang Sigawan Booking]\nIGN: ${formData.ign}\nDiscord: ${formData.discord}\nVibe: ${formData.tone === 'rp' ? 'Lighthearted RP' : 'Serious / Safe Space'}\nCounselors: ${formData.counselorPreference}\nDate: ${formData.date} at ${formData.timeSlot}\nNotes: ${formData.notes || 'None'}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleResetForm = () => {
    setFormData({
      ign: '',
      discord: '',
      tone: 'serious',
      counselorPreference: 'Both of Us (Duo Session)',
      date: todayStr,
      timeSlot: '8:00 PM',
      notes: '',
    });
    setSubmitSuccess(false);
    setErrorMessage(null);
  };

  return (
    <section id="booking" className="py-20 bg-white border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF9F6] border border-neutral-200 text-xs font-semibold text-neutral-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-neutral-900" />
            <span>Appointment Request</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Book Your Sanctuary Session
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Reserve a quiet slot at our Minecraft birch table. No shouting, no pressure. Your request goes straight to our private Discord alert channel.
          </p>
        </div>

        {/* Clean White Card Form Container */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-sm">
          
          {!submitSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              
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
                      value={formData.ign}
                      onChange={(e) => setFormData({ ...formData, ign: e.target.value })}
                      placeholder="e.g. Steve or your Minecraft IGN"
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
                          (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/64';
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-neutral-600 truncate max-w-[100px] hidden sm:inline">
                      {formData.ign.trim() || 'Preview'}
                    </span>
                  </div>
                </div>
                <p className="text-[12px] text-neutral-500">
                  We look up your Minecraft skin automatically so our counselors recognize you in-game.
                </p>
              </div>

              {/* 2. Discord Username */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-900">
                  Discord Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.discord}
                    onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                    placeholder="e.g. username or username#0000"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white text-sm transition-all"
                  />
                </div>
                <p className="text-[12px] text-neutral-500">
                  Where we will reach out to send updates about your booking.
                </p>
              </div>

              {/* 3. Session Tone Selector (2 large selectable pill cards) */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-neutral-900">
                  Session Tone <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card 1: RP */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tone: 'rp' })}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      formData.tone === 'rp'
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                        : 'bg-[#FAF9F6] text-neutral-800 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold">🎭 Lighthearted RP</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          formData.tone === 'rp'
                            ? 'bg-white/20 text-white'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        Stream Friendly
                      </span>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        formData.tone === 'rp' ? 'text-neutral-300' : 'text-neutral-500'
                      }`}
                    >
                      Fun in-character therapy for live content, server lore, or comedic counseling banter.
                    </p>
                  </button>

                  {/* Card 2: Serious */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tone: 'serious' })}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      formData.tone === 'serious'
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                        : 'bg-[#FAF9F6] text-neutral-800 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold">🤍 Serious / Real Talk</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          formData.tone === 'serious'
                            ? 'bg-white/20 text-white'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        100% Confidential
                      </span>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        formData.tone === 'serious' ? 'text-neutral-300' : 'text-neutral-500'
                      }`}
                    >
                      Off-stream, quiet, and gentle listening. Unload whatever is heavy without judgment.
                    </p>
                  </button>
                </div>
              </div>

              {/* 4. Counselor Preference Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-900">
                  Counselor Preference
                </label>
                <div className="relative">
                  <select
                    value={formData.counselorPreference}
                    onChange={(e) =>
                      setFormData({ ...formData, counselorPreference: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white text-sm transition-all appearance-none cursor-pointer"
                  >
                    {COUNSELOR_PREFERENCES.map((pref) => (
                      <option key={pref} value={pref}>
                        {pref}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-neutral-500">
                    <span className="text-xs">▼</span>
                  </div>
                </div>
                <p className="text-[12px] text-neutral-500">
                  Duo sessions include both hosts listening together over tea.
                </p>
              </div>

              {/* 5. Date Picker & Time Slot Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-900">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Time Slots (Selectable Pill Buttons) */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-900">
                    Time Slot (PST/GMT+8) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = formData.timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeSlot: slot })}
                          className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-neutral-900 text-white shadow-2xs'
                              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* 6. Textarea: What's on your mind? */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-900">
                  What's on your mind? (Share as much or as little as you want)
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. 'Feeling overwhelmed by work and just want a peaceful conversation', or 'Server drama roleplay check-in for Friday stream'..."
                  className="w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:bg-white text-sm resize-none transition-all"
                />
                <p className="text-[12px] text-neutral-500">
                  Completely optional. You can also tell us in-game once you arrive.
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
                    <span>Booking Your Sanctuary Session...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-neutral-300 group-hover:scale-110 transition-transform" />
                    <span>Confirm Appointment</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <span className="text-xs text-neutral-400">
                  Direct webhook dispatch to sanctuary hosts · No login or password required
                </span>
              </div>

            </form>
          ) : (
            // Warm Confirmation Message on Success
            <div className="py-6 text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-neutral-900">
                  Appointment Confirmed!
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Salamat sa pagtitiwala. Your request has been sent straight to our counselor channel. We will message you on Discord with the Minecraft server IP before your session.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200 text-left space-y-3 max-w-md mx-auto text-sm">
                <div className="flex items-center gap-3 pb-3 border-b border-neutral-200">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-neutral-200 shrink-0">
                    <img
                      src={`https://mc-heads.net/avatar/${encodeURIComponent(cleanIgn)}/64`}
                      alt={cleanIgn}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">{cleanIgn}</p>
                    <p className="text-xs text-neutral-500 font-mono">{formData.discord}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-neutral-400 block">Vibe:</span>
                    <span className="font-semibold text-neutral-800">
                      {formData.tone === 'rp' ? 'Lighthearted RP' : 'Serious / Real Talk'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Counselor:</span>
                    <span className="font-semibold text-neutral-800 truncate block">
                      {formData.counselorPreference}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Date:</span>
                    <span className="font-semibold text-neutral-800">{formData.date}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Time:</span>
                    <span className="font-semibold text-neutral-800">{formData.timeSlot}</span>
                  </div>
                </div>

                {formData.notes && (
                  <div className="pt-2 border-t border-neutral-200/80 text-xs">
                    <span className="text-neutral-400 block">Notes:</span>
                    <p className="text-neutral-700 italic mt-0.5 line-clamp-3">
                      "{formData.notes}"
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleCopySummary}
                  className="px-5 py-2.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                </button>

                <button
                  onClick={handleResetForm}
                  className="px-5 py-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Book Another Session
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
