import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowUpRight } from 'lucide-react';
import SmoothScroll from '../components/SmoothScroll';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import HomeAboutSection from '../components/HomeAboutSection';
import Statistics from '../components/Statistics';
import HomeServicesSection from '../components/HomeServicesSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  const navigate = useNavigate();
  const [showFloating, setShowFloating] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 450;
      setShowFloating(!isNearBottom);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoToContact = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SmoothScroll>
      <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-[#c48b57] selection:text-white overflow-x-hidden">
        <Navigation />
        <main>
          {/* HERO SECTION */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Hero />
          </motion.div>

          {/* ABOUT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <HomeAboutSection />
          </motion.div>

          {/* EXPERTISE/SERVICES SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <HomeServicesSection />
          </motion.div>

          {/* STATISTICS SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Statistics />
          </motion.div>

          {/* TESTIMONIALS SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Testimonials />
          </motion.div>
        </main>
        <Footer />

        {/* FLOATING ANIMATED CONTACT LINK (VISIBLE AT ALL TIMES EXCEPT BOTTOM) */}
        <AnimatePresence>
          {showFloating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto"
            >
              <motion.button
                onClick={handleGoToContact}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-[#1A1412] text-white text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] font-bold shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-[#c48b57]/60 hover:bg-[#c48b57] hover:text-[#1A1412] hover:border-[#1A1412] transition-all duration-300"
              >
                {/* Pulsing Gold Ring */}
                <span className="absolute -inset-1 rounded-full bg-[#c48b57]/30 animate-ping pointer-events-none" />

                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c48b57] group-hover:text-[#1A1412] transition-colors" />
                <span>BUILD YOUR VISION</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 group-hover:bg-[#1A1412] text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}
