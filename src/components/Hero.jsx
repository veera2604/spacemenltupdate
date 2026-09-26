import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 1,
    number: '01 — 03',
    image: '/home_projects/Homepage_1_Green_frame.jpg',
    subtitle: 'Luxury Residential Villa',
    title: 'GREEN FRAME VILLA',
    location: 'Bengaluru, India',
    link: '/project/greenframe',
  },
  {
    id: 2,
    number: '02 — 03',
    image: '/PROJECTS/Suriya_-_D/K.jpg.jpeg',
    subtitle: 'Residential Villa',
    title: 'THE BRICK CANVAS',
    location: 'Kallakurichi, India',
    link: '/project/suriya',
  },
  {
    id: 3,
    number: '03 — 03',
    image: '/home_projects/Homepage_3_Shadow_box.png',
    subtitle: 'Residential Villa & Interiors',
    title: 'SHADOW BOX',
    location: 'Vellore, India',
    link: '/project/rajesh',
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Automatically advance to the next slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (

    <section id="home" className="relative w-full h-[calc(100vh-60px)] min-h-[500px] flex items-center justify-center bg-[#181412] overflow-hidden border-none shadow-none">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#181412] overflow-hidden border-none"
        >
          {/* Main Full-Bleed Image spanning 100% width from left to right */}
          <div className="absolute inset-0 z-10 w-full h-full overflow-hidden">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].location}
              className="w-full h-full object-cover object-center transition-transform duration-1000 border-none outline-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Layer 2: Dark gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 sm:from-black/65 via-black/35 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />
        </motion.div>
      </AnimatePresence>

      {/* Project Title & "OPEN PROJECT" Link */}
      <div className="hero-text-container absolute left-2 sm:left-12 md:left-20 lg:left-32 top-1/2 -translate-y-1/2 z-20 max-w-[calc(100vw-80px)] sm:max-w-xl md:max-w-2xl text-left pointer-events-auto">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-gray-300 mb-2 sm:mb-3 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {slides[currentSlide].number}
          </div>
          <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-[68px] font-light text-white tracking-tight leading-[1.1] uppercase font-['Cormorant_Garamond'] mb-4 sm:mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] break-words max-w-full">
            {slides[currentSlide].title}
          </h1>
          <div
            onClick={() => navigate(slides[currentSlide].link)}
            className="inline-flex items-center gap-3 sm:gap-4 cursor-pointer group"
          >
            <span className="text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.25em] font-bold text-white group-hover:text-[#c48b57] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Open Project
            </span>
            <div className="w-10 sm:w-16 md:w-20 h-[2px] bg-white group-hover:bg-[#c48b57] group-hover:w-24 transition-all duration-300 shadow-lg" />
          </div>
        </motion.div>
      </div>

      {/* Animated Left Architectural Circle-Arrow Button */}
      <motion.button
        onClick={prevSlide}
        animate={{ x: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92, x: -10 }}
        className="absolute left-1 sm:left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center group focus:outline-none cursor-pointer p-1"
        aria-label="Previous Slide"
      >
        <svg
          viewBox="0 0 110 70"
          className="w-10 h-7 sm:w-14 sm:h-9 md:w-20 md:h-12 text-white/90 group-hover:text-white transition-all duration-500 overflow-visible group-hover:drop-shadow-[0_0_14px_rgba(196,139,87,0.7)]"
          style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0px 0px 12px rgba(0,0,0,0.7))' }}
          fill="none"
        >
          {/* Outer circle with gap on left */}
          <path
            d="M 47.8 42 A 25.2 25.2 0 1 0 47.8 28"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="group-hover:stroke-[#c48b57] transition-all duration-500"
          />
          {/* Arrow shaft & curved hook */}
          <path
            d="M 32 35 L 73 35 C 85 35, 90 48, 80 60"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-2 group-hover:stroke-[#c48b57] transition-all duration-500 ease-out"
          />
          {/* Hollow Triangular Arrowhead */}
          <polygon
            points="32,29 20.8,35 32,41"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="none"
            className="group-hover:-translate-x-2 group-hover:stroke-[#c48b57] transition-all duration-500 ease-out"
          />
        </svg>
      </motion.button>

      {/* Animated Right Architectural Circle-Arrow Button */}
      <motion.button
        onClick={nextSlide}
        animate={{ x: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92, x: 10 }}
        className="absolute right-1 sm:right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center group focus:outline-none cursor-pointer p-1"
        aria-label="Next Slide"
      >
        <svg
          viewBox="0 0 110 70"
          className="w-10 h-7 sm:w-14 sm:h-9 md:w-20 md:h-12 text-white/90 group-hover:text-white transition-all duration-500 overflow-visible group-hover:drop-shadow-[0_0_14px_rgba(196,139,87,0.7)]"
          style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0px 0px 12px rgba(0,0,0,0.7))' }}
          fill="none"
        >
          {/* Outer circle with gap on right */}
          <path
            d="M 62.2 42 A 25.2 25.2 0 1 1 62.2 28"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="group-hover:stroke-[#c48b57] transition-all duration-500"
          />
          {/* Arrow shaft & curved hook */}
          <path
            d="M 78 35 L 37 35 C 25 35, 20 48, 30 60"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-2 group-hover:stroke-[#c48b57] transition-all duration-500 ease-out"
          />
          {/* Hollow Triangular Arrowhead */}
          <polygon
            points="78,29 89.2,35 78,41"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="none"
            className="group-hover:translate-x-2 group-hover:stroke-[#c48b57] transition-all duration-500 ease-out"
          />
        </svg>
      </motion.button>

      {/* Centered Slide Indicators Matching Reference Screenshot */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className="group relative py-2 focus:outline-none cursor-pointer"
            aria-label={`Slide ${idx + 1}`}
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx
                ? 'w-10 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                : 'w-2 bg-white/40 group-hover:bg-white/70'
                }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}