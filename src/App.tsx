import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SessionVibes } from './components/SessionVibes';
import { CounselorsSection } from './components/CounselorsSection';
import { BookingForm } from './components/BookingForm';
import { DonorsSection } from './components/DonorsSection';
import { FaqSection } from './components/FaqSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ReviewSection } from './components/ReviewSection';
import { Footer } from './components/Footer';
import { SessionTone } from './types';
import { Volume2, VolumeX, ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedTone, setSelectedTone] = useState<SessionTone>('serious');
  const [selectedCounselorPref, setSelectedCounselorPref] = useState<string>(
    'Both of Us (Duo Session)'
  );
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectVibe = (tone: SessionTone, counselorPref?: string) => {
    setSelectedTone(tone);
    if (counselorPref) {
      setSelectedCounselorPref(counselorPref);
    }
    scrollToBooking();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Subtle synthesized soothing sanctuary ambient audio (Web Audio API)
  const toggleAmbientSound = () => {
    if (isAmbientPlaying) {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(
          0.0001,
          audioContextRef.current.currentTime,
          0.3
        );
        setTimeout(() => {
          audioContextRef.current?.suspend();
          setIsAmbientPlaying(false);
        }, 350);
      }
    } else {
      try {
        if (!audioContextRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          const ctx = new AudioContextClass();
          audioContextRef.current = ctx;

          // Pink/Rain noise generator
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.04;
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          // Lowpass filter for soft soothing sanctuary rainfall
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(650, ctx.currentTime);

          // Gentle gain
          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
          gainNodeRef.current = masterGain;

          whiteNoise.connect(filter);
          filter.connect(masterGain);
          masterGain.connect(ctx.destination);

          whiteNoise.start();
        } else {
          audioContextRef.current.resume();
          if (gainNodeRef.current) {
            gainNodeRef.current.gain.setTargetAtTime(
              0.06,
              audioContextRef.current.currentTime,
              0.3
            );
          }
        }
        setIsAmbientPlaying(true);
      } catch (err) {
        console.error('Audio playback error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar onBookClick={scrollToBooking} />

      <main className="flex-1">
        {/* Split Hero Section (Empath.ph style) */}
        <HeroSection onBookClick={scrollToBooking} />

        {/* About Section (Principles of Walang Sigawan) */}
        <AboutSection />

        {/* Choose Your Session Vibe Section (3 Cards) */}
        <SessionVibes onSelectVibe={handleSelectVibe} />

        {/* Meet Your Counselors Section (3D Minecraft Heads & Editable Bios) */}
        <CounselorsSection />

        {/* Interactive Date & Time Booking Form */}
        <BookingForm
          initialTone={selectedTone}
          initialCounselorPref={selectedCounselorPref}
        />

        {/* Donors & Sponsorship Section */}
        <DonorsSection />

        {/* FAQs Section */}
        <FaqSection />

        {/* Client Testimonials / Wall of Love Section */}
        <TestimonialsSection />

        {/* Client Feedback / Leave a Review Section */}
        <ReviewSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Utilities (Sanctuary Sound & Back To Top) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
        {/* Ambient rain toggle */}
        <button
          onClick={toggleAmbientSound}
          title={
            isAmbientPlaying
              ? 'Mute sanctuary ambient sound'
              : 'Play relaxing sanctuary rain sound'
          }
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full backdrop-blur-md border shadow-md transition-all text-xs font-medium cursor-pointer ${
            isAmbientPlaying
              ? 'bg-neutral-900 text-white border-neutral-900 ring-2 ring-neutral-400'
              : 'bg-white/90 text-neutral-800 border-neutral-200 hover:bg-white hover:shadow-lg'
          }`}
        >
          {isAmbientPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span className="hidden sm:inline">Sanctuary Rain On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">Ambient Rain</span>
            </>
          )}
        </button>

        {/* Back to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            title="Back to top"
            className="p-2.5 rounded-full bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-100 shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
