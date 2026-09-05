import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, Sparkles, Play, ChevronRight, ChevronLeft } from 'lucide-react';

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
    image: '/home_projects/Homepage_2_Brick_Canvas.png',
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
              className="w-full h-full object-cover object-center block transition-transform duration-1000 border-none outline-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Layer 2: Dark gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 sm:from-black/65 via-black/35 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />
        </motion.div>
      </AnimatePresence>

      {/* Project Title & "OPEN PROJECT" Link */}
      <div className="absolute left-4 sm:left-12 md:left-20 lg:left-32 top-1/2 -translate-y-1/2 z-20 max-w-[calc(100vw-80px)] sm:max-w-xl md:max-w-2xl text-left pointer-events-auto">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-gray-300 mb-2 sm:mb-3 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {slides[currentSlide].number}
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[76px] font-light text-white tracking-tight leading-[1.1] uppercase font-['Cormorant_Garamond'] mb-4 sm:mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] break-words max-w-full">
            {slides[currentSlide].title}
          </h1>
          <div
            onClick={() => navigate(slides[currentSlide].link)}
            className="inline-flex items-center gap-3 sm:gap-4 cursor-pointer group"
          >
            <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-white group-hover:text-[#c48b57] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Open Project
            </span>
            <div className="w-10 sm:w-16 md:w-20 h-[2px] bg-white group-hover:bg-[#c48b57] group-hover:w-24 transition-all duration-300 shadow-lg" />
          </div>
        </motion.div>
      </div>

      {/* Animated Left Architectural Circle-Arrow Button */}
      <button
        onClick={prevSlide}
        className="absolute left-1 sm:left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center group focus:outline-none cursor-pointer p-1"
        aria-label="Previous Slide"
      >
        <svg
          viewBox="0 0 110 70"
          className="w-10 h-7 sm:w-14 sm:h-9 md:w-20 md:h-12 text-white/90 group-hover:text-white transition-all duration-500 overflow-visible"
          style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0px 0px 12px rgba(0,0,0,0.7))' }}
          fill="none"
        >
          <circle
            cx="70"
            cy="35"
            r="26"
            stroke="currentColor"
            strokeWidth="1.5"
            className="group-hover:stroke-[#c48b57] transition-colors duration-500"
          />
          <line
            x1="88"
            y1="35"
            x2="22"
            y2="35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="group-hover:-translate-x-2 transition-transform duration-500 ease-out"
          />
          <polyline
            points="32,26 21,35 32,44"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="group-hover:-translate-x-2 transition-transform duration-500 ease-out"
          />
        </svg>
      </button>

      {/* Animated Right Architectural Circle-Arrow Button */}
      <button
        onClick={nextSlide}
        className="absolute right-1 sm:right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center group focus:outline-none cursor-pointer p-1"
        aria-label="Next Slide"
      >
        <svg
          viewBox="0 0 110 70"
          className="w-10 h-7 sm:w-14 sm:h-9 md:w-20 md:h-12 text-white/90 group-hover:text-white transition-all duration-500 overflow-visible"
          style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0px 0px 12px rgba(0,0,0,0.7))' }}
          fill="none"
        >
          <circle
            cx="40"
            cy="35"
            r="26"
            stroke="currentColor"
            strokeWidth="1.5"
            className="group-hover:stroke-[#c48b57] transition-colors duration-500"
          />
          <line
            x1="22"
            y1="35"
            x2="88"
            y2="35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="group-hover:translate-x-2 transition-transform duration-500 ease-out"
          />
          <polyline
            points="78,26 89,35 78,44"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="group-hover:translate-x-2 transition-transform duration-500 ease-out"
          />
        </svg>
      </button>

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