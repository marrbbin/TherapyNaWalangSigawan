import React from 'react';
import { HeartHandshake, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-neutral-100">
          
          {/* Brand Wordmark */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                <HeartHandshake className="w-3.5 h-3.5 text-neutral-100" />
              </span>
              <span className="text-base font-bold tracking-tight text-neutral-900">
                Therapy Na Walang Sigawan
              </span>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm">
              A peaceful two-person Minecraft counseling sanctuary. Gentle conversations, virtual tea, and zero shouting.
            </p>
          </div>

          {/* Nav links mirror */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-neutral-600">
            <a href="#about" className="hover:text-neutral-900 transition-colors">
              About Sanctuary
            </a>
            <a href="#session-vibes" className="hover:text-neutral-900 transition-colors">
              Session Vibes
            </a>
            <a href="#counselors" className="hover:text-neutral-900 transition-colors">
              Meet the Counselors
            </a>
            <a href="#booking" className="hover:text-neutral-900 transition-colors">
              Book Appointment
            </a>
            <a href="#donors" className="hover:text-neutral-900 transition-colors">
              Donors & Sponsors
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Therapy Na Walang Sigawan. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-neutral-400" />
              Minecraft Community Sanctuary
            </span>
            <span>·</span>
            <span>Made with care for peaceful gamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
