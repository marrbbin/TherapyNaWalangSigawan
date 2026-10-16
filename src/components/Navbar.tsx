import React, { useState, useEffect } from 'react';
import { Menu, X, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Session Vibes', href: '#session-vibes' },
    { label: 'Counselors', href: '#counselors' },
    { label: 'Wall of Love', href: '#testimonials' },
    { label: 'Donors', href: '#donors' },
    { label: 'Feedback', href: '#reviews' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs py-3.5'
          : 'bg-[#FAF9F6]/90 backdrop-blur-sm border-b border-neutral-200/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Brand Wordmark (Left) */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-neutral-900 group whitespace-nowrap shrink-0"
          >
            <span className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center transition-transform group-hover:scale-105 duration-200 shadow-xs">
              <HeartHandshake className="w-4 h-4 text-neutral-100" />
            </span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-neutral-900">
              Therapy Na Walang Sigawan
            </span>
          </a>

          {/* Navigation Links (Center) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-neutral-900 transition-colors whitespace-nowrap py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-neutral-900 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onBookClick}
              className="bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-200 rounded-full px-6 py-2.5 text-sm font-medium shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
            >
              Book a Session
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-neutral-700 hover:text-neutral-950 py-2 border-b border-neutral-100"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="mt-2 w-full bg-neutral-900 text-white rounded-full py-3 text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer text-center"
            >
              Book a Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
