import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Mail } from 'lucide-react';

export default function HomeContactCTA() {
  const navigate = useNavigate();

  const handleGoToContact = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#120E0C] text-white overflow-hidden border-t border-white/10">
      {/* Background Architectural Texture overlay */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img
          src="/images/arch-hero-1.jpg"
          alt="SpaceMELD Studio Architectural Texture"
          className="w-full h-full object-cover filter grayscale"
        />
      </div>

      {/* Ambient Animated Gold Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#c48b57]/25 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.22, 0.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] bg-[#c48b57]/20 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          onClick={handleGoToContact}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.015 }}
          className="group cursor-pointer rounded-sm border border-white/15 hover:border-[#c48b57]/70 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-10 sm:p-16 md:p-20 transition-all duration-700 shadow-[0_25px_60px_rgba(0,0,0,0.55)] hover:shadow-[0_30px_80px_rgba(196,139,87,0.25)] flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Animated Shine Sweep Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Tagline */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-sm bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.28em] text-[#c48b57] mb-8">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>INITIATE A DIALOGUE</span>
          </div>

          {/* Massive Editorial Invitation Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-['Cormorant_Garamond'] uppercase tracking-tight text-white mb-6 leading-[1.08] group-hover:text-[#c48b57] transition-colors duration-500">
            Have a Project in Mind?
            <br />
            <span className="font-normal text-white group-hover:text-white transition-colors">
              Let’s Build Something Iconic.
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Whether you envision a bespoke biophilic residence, commercial landmark, or parametric interior, our architects are ready to transform your ambition into spatial perfection.
          </p>

          {/* Animated Contact CTA Button */}
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-4 px-9 py-5 rounded-sm bg-[#c48b57] text-[#1A1412] font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] shadow-[0_10px_35px_rgba(196,139,87,0.45)] group-hover:bg-white group-hover:text-[#1A1412] transition-all duration-500"
          >
            <Mail className="w-4 h-4" />
            <span>TRANSMIT YOUR INQUIRY</span>
            <span className="w-7 h-7 rounded-sm bg-[#1A1412] text-white flex items-center justify-center group-hover:bg-[#c48b57] transition-colors">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </motion.div>

          {/* Subtext indicator */}
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500 mt-6 group-hover:text-gray-300 transition-colors">
            Click Anywhere to Open Studio Contact Portal
          </span>
        </motion.div>
      </div>
    </section>
  );
}
