import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const zikzakMenuItems = [
  { name: 'Our Story', href: '/about' },
  { name: 'Expertise', href: '/services' },
  { name: 'Our Works', href: '/works' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

const topNavLinks = [
  { name: 'OUR STORY', href: '/about', match: (path) => path === '/about' },
  { name: 'EXPERTISE', href: '/services', match: (path) => path === '/services' || path === '/stack' },
  { name: 'OUR WORKS', href: '/works', match: (path) => path === '/works' || path === '/projects' || path.startsWith('/project/') },
  { name: 'CAREERS', href: '/careers', match: (path) => path === '/careers' },
  { name: 'CONTACT', href: '/contact', match: (path) => path === '/contact' },
];

export default function Navigation({ hideSpacer = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    if (href === '/' || href === '#home') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* FIXED PREMIUM STICKY HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out flex items-center ${scrolled
          ? 'h-[68px] md:h-[76px] bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-gray-200/60'
          : 'h-[80px] md:h-[92px] bg-white border-b border-transparent'
          }`}
      >
        <div className="w-full flex items-center justify-between px-6 sm:px-12 md:px-16 max-w-[1900px] mx-auto h-full">
          {/* Left: Company Logo */}
          <div className="flex items-center justify-start h-full pl-1 sm:pl-2">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="flex items-center group cursor-pointer z-10"
              aria-label="SpaceMELD Home"
            >
              <img
                src="/Latest_LOGO SM title block_15-05-2026_222.png"
                alt="SpaceMELD Architecture Studio Logo"
                className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 origin-left ${scrolled ? 'h-[46px] sm:h-[52px] md:h-[58px]' : 'h-[58px] sm:h-[68px] md:h-[76px]'
                  }`}
              />
            </a>
          </div>

          {/* Right Corner: Navigation Links + Menu Button */}
          <div className="flex items-center justify-end gap-8 xl:gap-12 h-full">
            {!isHome && (
              <nav className="hidden lg:flex items-center gap-6 xl:gap-9 text-xs sm:text-sm font-sans uppercase tracking-[0.2em]">
                {topNavLinks.map((item) => {
                  const isActive = item.match(location.pathname);
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`transition-all duration-300 cursor-pointer ${isActive
                        ? 'text-[#C86446] font-extrabold opacity-100 border-b-2 border-[#C86446] pb-1'
                        : 'text-[#1A1412] font-semibold opacity-70 hover:opacity-100 hover:text-[#C86446]'
                        }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </nav>
            )}

            {/* Architectural Hamburger / Menu Button (Top-Right Corner) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-3.5 group cursor-pointer py-2 px-3 hover:opacity-75 transition-opacity"
              aria-label="Open menu"
            >
              <span className="text-xs font-mono uppercase tracking-[0.3em] font-bold text-[#1A1412]"></span>
              <div className="flex flex-col gap-1.5 w-6 sm:w-7">
                <span className="w-full h-[2px] bg-[#1A1412] group-hover:w-4 transition-all duration-300 ml-auto" />
                <span className="w-full h-[2px] bg-[#1A1412]" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* SPACER SO HERO IMAGE SITS RIGHT BELOW */}
      {!hideSpacer && (
        <div className={`w-full ${scrolled ? 'h-[64px] md:h-[72px]' : 'h-[72px] md:h-[82px]'} transition-all duration-300 bg-transparent`} />
      )}

      {/* ZIKZAK FULL-SCREEN DARK OVERLAY MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#181818] text-white z-50 flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center justify-between w-full"
            >
              <a
                href="/"
                onClick={(e) => handleNavClick(e, '/')}
                className="cursor-pointer"
              >
                <img
                  src="/Latest_LOGO SM title block_15-05-2026_222.png"
                  alt="SpaceMELD Logo"
                  style={{ clipPath: 'inset(4px)' }}
                  className="h-12 md:h-16 w-auto object-contain brightness-0 invert"
                />
              </a>

              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 group cursor-pointer text-gray-400 hover:text-white transition-colors py-2 px-3"
                aria-label="Close menu"
              >
                <span className="text-xs font-mono uppercase tracking-[0.3em]">
                  Close
                </span>
                <X className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Center: Refined ZIKZAK Typography Menu */}
            <div className="flex flex-col items-center justify-center text-center my-auto w-full max-w-4xl mx-auto divide-y divide-white/[0.06]">
              {zikzakMenuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
                  className="group relative w-full py-5 sm:py-6 block cursor-pointer transition-colors"
                >
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-mono text-gray-500 tracking-widest group-hover:text-[#c48b57] transition-colors">
                    {item.index}
                  </span>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight text-[#8c8c8c] group-hover:text-white transition-all duration-300 block pt-1">
                    {item.name}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Bottom Footer inside Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-full border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.25em] text-gray-400"
            >
              <div className="flex flex-wrap items-center gap-6">
                <a href="#facebook" className="hover:text-white transition-colors">
                  .Facebook
                </a>
                <a href="#instagram" className="hover:text-white transition-colors">
                  .Instagram
                </a>
                <a href="#behance" className="hover:text-white transition-colors">
                  .Behance
                </a>
                <a href="#linkedin" className="hover:text-white transition-colors">
                  .Linkedin
                </a>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white font-bold cursor-pointer">EN</span>
                <span className="text-gray-500 hover:text-white cursor-pointer transition-colors">
                  UA
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}