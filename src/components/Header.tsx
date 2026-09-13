import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenPilotModal: () => void;
}

export function Header({ onOpenPilotModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '3D Telemetry', href: '#3d-telemetry' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Why now', href: '#why-now' },
    { label: 'Who it’s for', href: '#who-its-for' },
    { label: 'Pilot', href: '#pilot' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full border-b border-[#E2E4E8] bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <a
          href="#"
          id="brand-logo-link"
          className="flex items-center gap-2.5 text-[#161B22] focus:outline-none focus:ring-2 focus:ring-[#3A5A73] focus:ring-offset-2 rounded-[2px]"
          aria-label="Undercurrent Homepage"
        >
          {/* Logo Mark: Minimalist technical upstream telemetry glyph */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#161B22]"
            aria-hidden="true"
          >
            <rect x="2" y="3" width="7" height="7" rx="1" fill="#161B22" />
            <rect x="15" y="14" width="7" height="7" rx="1" stroke="#161B22" strokeWidth="1.5" />
            <path
              d="M9 6.5H18.5V14"
              stroke="#3A5A73"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <circle cx="5.5" cy="6.5" r="1.5" fill="#C97F2A" />
            <circle cx="18.5" cy="17.5" r="1.5" fill="#3A5A73" />
          </svg>
          <span className="font-semibold text-lg tracking-tight text-[#161B22]">
            Undercurrent
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-wide text-[#3A5A73] bg-[#F7F7F4] border border-[#E2E4E8] px-1.5 py-0.5 rounded-[3px]">
            TIER-2+ TELEMETRY
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          id="desktop-navigation"
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#161B22]"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#161B22] transition-colors hover:text-[#3A5A73] focus:outline-none focus:ring-2 focus:ring-[#3A5A73] rounded-[2px] px-1 py-0.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="header-pilot-cta-btn"
            type="button"
            onClick={onOpenPilotModal}
            className="inline-flex items-center justify-center rounded-[4px] bg-[#161B22] px-3.5 py-2 text-xs font-mono font-medium text-white transition-colors hover:bg-[#3A5A73] focus:outline-none focus:ring-2 focus:ring-[#161B22] focus:ring-offset-2 cursor-pointer shadow-xs"
          >
            Apply for a pilot
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-[4px] text-[#161B22] hover:bg-[#F7F7F4] focus:outline-none focus:ring-2 focus:ring-[#3A5A73]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="border-b border-[#E2E4E8] bg-white px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#161B22] hover:text-[#3A5A73] py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                id="mobile-pilot-cta-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPilotModal();
                }}
                className="w-full text-center rounded-[4px] bg-[#161B22] px-3 py-2 text-xs font-mono font-medium text-white hover:bg-[#3A5A73]"
              >
                Apply for a pilot
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
