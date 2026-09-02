import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    const container = document.getElementById('main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-white text-[#1A1412] border-t border-gray-200 relative">
      <div className="w-full px-8 sm:px-12 md:px-16 pt-10 sm:pt-14 pb-12 sm:pb-16 flex flex-col lg:flex-row justify-between items-start lg:items-stretch min-h-[300px] gap-12 lg:gap-10">

        {/* LEFT COLUMN: Logo (Top), Legal/Copyright (Bottom) */}
        <div className="flex flex-col justify-between items-start lg:w-1/2">
          {/* Top Left: Logo */}
          <div className="mb-10 lg:mb-0 -mt-2 sm:-mt-4 lg:-mt-6">
            <img
              src="/Latest_LOGO SM title block_15-05-2026_222.png"
              alt="SpaceMELD Architects"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain transform origin-top-left"
            />
          </div>

          {/* Bottom Left: Legal Links & Copyright */}
          <div className="flex flex-col items-start mt-auto">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.15em] text-[#1A1412] mb-3">
              <a href="/contact" className="hover:text-[#c48b57] transition-colors">
                PRIVACY POLICY
              </a>
              <a href="/contact" className="hover:text-[#c48b57] transition-colors">
                TERMS OF ARCHITECTURAL SERVICE
              </a>
              <a href="/contact" className="hover:text-[#c48b57] transition-colors">
                COOKIE PREFERENCES
              </a>
            </div>

            <p className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.14em] text-[#1A1412] whitespace-nowrap">
              © {new Date().getFullYear()} SPACEMELD ARCHITECTS PRIVATE LIMITED. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Right-aligned block positioned on the right side */}
        <div className="flex flex-col items-end w-full lg:w-auto mt-6 lg:mt-4 xl:mt-5 gap-6 lg:ml-auto">

          {/* Top Right: Email */}
          <a
            href="mailto:info@spacemeldarchitects.com"
            className="text-sm sm:text-base md:text-lg font-light tracking-wide text-[#1A1412] hover:text-[#c48b57] transition-colors">
            info@spacemeldarchitects.com
          </a>

          {/* Middle Right: Build Your Vision Button */}
          <a
            href="/contact"
            className="flex items-center gap-3 bg-[#1A1412] hover:bg-[#c48b57] text-white px-8 py-3.5 rounded-full transition-all duration-300 group shadow-md hover:shadow-lg my-2 lg:my-0"
          >
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#c48b57] group-hover:text-white transition-colors">
              <path d="M14 1.5C14 0.95 13.55 0.5 13 0.5H2C1.45 0.5 1 0.95 1 1.5M14 1.5V10.5C14 11.05 13.55 11.5 13 11.5H2C1.45 11.5 1 11.05 1 10.5V1.5M14 1.5L7.5 5.5L1 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mt-0.5">BUILD YOUR VISION</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#c48b57] group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>

          {/* Bottom Right: Social Links & Back to Top */}
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-end gap-6 mt-auto pt-2">
            <div className="flex flex-wrap items-center justify-end gap-5 sm:gap-6 text-xs sm:text-sm font-sans text-[#1A1412] tracking-wider">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#c48b57] transition-colors flex items-center gap-1"
              >
                <span className="text-[#1A1412]">.</span>Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#c48b57] transition-colors flex items-center gap-1"
              >
                <span className="text-[#1A1412]">.</span>Instagram
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#c48b57] transition-colors flex items-center gap-1"
              >
                <span className="text-[#1A1412]">.</span>Behance
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#c48b57] transition-colors flex items-center gap-1"
              >
                <span className="text-[#1A1412]">.</span>Linkedin
              </a>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#c48b57] text-gray-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm shrink-0"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
