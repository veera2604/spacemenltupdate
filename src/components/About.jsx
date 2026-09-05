import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Users,
  Lightbulb,
  Landmark,
  Box,
  Home,
  Pencil,
  Sprout,
  Maximize2,
  X,
} from 'lucide-react';

/* Exact SpaceMELD Studio Architects & Employees */
const employeesList = [
  {
    name: 'Suriya',
    role: 'CHIEF ARCHITECT',
    image: '/TEAM/SURIYA.jpg',
    imagePosition: 'object-center',
  },
  {
    name: 'Syed Bilal',
    role: 'PRINCIPAL ARCHITECT & MATERIALITY SPECIFIER',
    image: '/TEAM/BILAL.jpeg',
    imagePosition: 'object-center',
  },
  {
    name: 'Selvaraj',
    role: "CREATIVE DESIGN DIRECTOR \nARCHITECTURE & INTERIORS",
    image: '/TEAM/SELVA.JPG',
    imagePosition: 'object-[center_top]',
  },
  {
    name: 'Shivadharani',
    role: 'SENIOR ARCHITECT & INTERIOR DESIGNER',
    image: '/TEAM/SHIVADHARANI.jpeg',
    imagePosition: 'object-center',
  },
  {
    name: 'Raghuram',
    role: 'ARCHITECT & SENIOR PROJECT MANAGER',
    image: '/TEAM/RAGHU.jpeg',
    imagePosition: 'object-center',
  },
];

/*
  HEADER OFFSET
  The fixed top navigation bar in this app is ~84px tall on desktop/tablet
  and ~72px on mobile. Every viewport-height calculation in the hero below
  subtracts that offset so the hero never sits underneath the nav and never
  forces the page to scroll just to see the whole first section.
*/
const HEADER_OFFSET = {
  mobile: '72px',
  desktop: '84px',
};

export default function About({ showPeople = true, showProfileBanner = true, hideSubNav = false }) {
  const navigate = useNavigate();
  const [fullViewImage, setFullViewImage] = useState(null);

  const scrollTo = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* =========================================================================
          SECTION 1: STORY (EXACT PIXEL-FOR-PIXEL EDITORIAL LAYOUT)
         ========================================================================= */}
      {/* HERO STORY SECTION: Full Width (100vw) & Full Height (100vh) matching reference exactly */}
      <div id="story" className="w-full grid grid-cols-1 lg:grid-cols-12 about-section bg-[#F8F5F0] overflow-hidden relative font-['Manrope']">

        {/* IMAGE LAYER (Center & Right - overlaps under the black card) */}
        <div className="lg:col-start-4 lg:col-end-13 lg:row-start-1 relative z-0 flex justify-end h-[50vh] lg:h-full overflow-hidden">
          <img
            src="/images/about_hero_desk.png"
            alt="SpaceMELD Architectural Sketchbook & Workspace"
            className="w-full h-full object-cover object-[center_left] lg:object-[center_right] brightness-[0.95] scale-100 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
          />
          {/* Edge mask to blend into the cream background like a brush stroke */}
          <div className="absolute top-0 left-0 bottom-0 w-full lg:w-[50%] bg-gradient-to-r from-[#F8F5F0] via-[#F8F5F0]/80 sm:via-[#F8F5F0]/20 to-transparent pointer-events-none z-[1]" />
        </div>

        {/* LEFT CONTENT LAYER (Text - 35% of width) */}
        <div className="lg:col-start-1 lg:col-end-6 lg:row-start-1 flex flex-col justify-center px-8 sm:px-12 lg:pl-16 xl:pl-24 py-12 lg:py-0 relative z-10 pointer-events-none">

          {/* Bottom-Left Corner Architectural Sketch Wireframe */}
          <div className="hidden lg:block absolute bottom-0 left-0 pointer-events-none opacity-[0.25] z-0 translate-y-8 -translate-x-4">
            <svg className="w-[300px] xl:w-[400px] h-auto text-[#A66A2C]" viewBox="0 0 500 350" fill="none" stroke="currentColor" strokeWidth="0.8">
              <path d="M0 350 L0 220 L80 200 L180 240 L180 350 Z" />
              <path d="M80 200 L80 350" />
              <path d="M120 220 L120 350" />
              <line x1="0" y1="260" x2="180" y2="260" />
              <line x1="0" y1="300" x2="180" y2="300" />
              <path d="M160 350 L160 160 L280 120 L400 160 L400 350 Z" />
              <path d="M280 120 L280 350" />
              <polygon points="190,200 270,180 270,350 190,350" />
              <polygon points="290,180 370,200 370,350 290,350" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start pointer-events-auto relative z-10"
          >
            <div className="flex items-center gap-3.5 mb-3 sm:mb-4">
              <span className="font-['Manrope'] text-xs font-semibold tracking-[0.2em] uppercase text-[#A66A2C]">
                OUR STORY
              </span>
              <span className="w-10 sm:w-16 h-[1.5px] bg-[#A66A2C]" />
            </div>

            <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-normal text-[#111111] leading-[1.08] tracking-tight">
              <span className="block">Every space</span>
              <span className="block">begins with</span>
              <span className="font-['Allura'] text-6xl sm:text-7xl lg:text-[84px] xl:text-[96px] font-normal text-[#A66A2C] leading-[0.82] block mt-1 -ml-1">
                a story.
              </span>
            </h1>

            <p className="font-['Manrope'] text-[#222222] text-[15px] xl:text-[17px] font-normal leading-[1.7] max-w-[440px] mt-6 sm:mt-8">
              Before the first line was drawn,<br />
              there was a vision taking shape around a table.
            </p>
          </motion.div>
        </div>

        {/* RIGHT DARK CARD LAYER (Compact Size - Mobile Responsive) */}
        <div className="lg:col-start-9 lg:col-end-13 lg:row-start-1 flex flex-col justify-end items-stretch lg:items-end z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#161412] text-[#F8F5F0] p-6 lg:p-7 xl:p-8 shadow-[-15px_-15px_40px_rgba(0,0,0,0.4)] border-l border-t border-white/5 rounded-none w-full max-w-full lg:max-w-[340px] xl:max-w-[380px]"
          >
            <h3 className="font-['Cormorant_Garamond'] text-lg lg:text-[22px] xl:text-[24px] font-normal leading-[1.25] tracking-tight text-[#C86446]">
              Shared vision,<br />
              shaped together
            </h3>

            {/* Golden divider accent */}
            <div className="w-10 h-[1.5px] bg-[#A66A2C] my-3.5" />

            <div className="font-['Manrope'] text-[#CCCCCC] text-[12px] xl:text-[13px] leading-[1.65] font-light space-y-3">
              <p>
                Just three friends, a shared passion for architecture, and a conversation filled with possibilities.
              </p>
              <p>
                What began as an evening of exchanging ideas soon became something much bigger. As the conversation unfolded, so did a vision — one that would eventually grow into <span className="text-white font-semibold">SpaceMELD Architects</span>.
              </p>
              <p>
                It was the beginning of a journey built on friendship, creativity, and a shared belief in the power of design.
              </p>
            </div>
          </motion.div>
        </div>

      </div>

      {/* SECOND SECTION: BELIEFS & PHILOSOPHY */}
      <div className="w-full about-section flex flex-col justify-center relative z-10 border-b border-[#D8C5AE]/60 overflow-hidden">
        <div className="max-w-[1850px] 2xl:max-w-[1950px] w-full mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

            {/* Left: Large Architecture Interior Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <div className="w-full max-h-[50vh] xl:max-h-[54vh] aspect-[4/3] rounded-[2px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-[#D8C5AE]/60 bg-[#111111] group mx-auto">
                <img
                  src="/images/about_philosophy_courtyard.png"
                  alt="SpaceMELD Studio Courtyard"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
            </motion.div>

            {/* Right: Square Icon, Heading, Divider, Paragraphs & Sketch */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-6 flex flex-col items-start relative"
            >
              {/* Architectural Line Sketch Illustration on Far Right */}
              <div className="absolute -top-10 -right-20 pointer-events-none opacity-[0.18] w-[320px] h-[380px] z-0 text-[#A66A2C]">
                <svg className="w-full h-full" viewBox="0 0 300 400" fill="none" stroke="currentColor" strokeWidth="0.6">
                  <polygon points="150,50 280,180 280,380 150,280 20,380 20,180" />
                  <line x1="150" y1="50" x2="150" y2="280" />
                  <line x1="150" y1="280" x2="280" y2="380" />
                  <line x1="150" y1="280" x2="20" y2="380" />
                  <circle cx="150" cy="180" r="70" strokeDasharray="4 4" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="w-10 h-10 border border-[#A66A2C]/40 flex items-center justify-center text-[#A66A2C] mb-5 rounded-[2px] bg-[#F8F5F0]">
                  <Box className="w-5 h-5 stroke-[1.3]" />
                </div>

                <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-[40px] font-normal text-[#111111] leading-[1.15] tracking-tight mb-4">
                  SpaceMELD is more<br />
                  than a name—<br />
                  <span className="font-normal text-[#111111]">it reflects what we believe.</span>
                </h2>

                <span className="w-10 h-[1.5px] bg-[#A66A2C] block my-4" />

                <p className="font-['Manrope'] text-[#222222] text-sm sm:text-[15px] leading-[1.7] font-normal mb-3 max-w-[460px]">
                  Great architecture is never the work of one idea alone.<br />
                  It's a meld of creativity and functionality,<br />
                  vision and purpose,<br />
                  our expertise and your aspirations.
                </p>

                <p className="font-['Manrope'] text-[#111111] font-bold text-sm sm:text-[15px] leading-[1.6] max-w-[460px]">
                  Every project is a thoughtful collaboration that transforms ideas into spaces with meaning.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* VALUES SECTION: Exactly Four Equal Columns */}
      <div className="w-full about-section flex flex-col justify-center bg-[#F8F5F0] border-b border-[#D8C5AE]/60">
        <div className="max-w-[1850px] 2xl:max-w-[1950px] w-full mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#D8C5AE]/60">

            {/* Column 1: People Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.0 }}
              className="flex flex-col items-center text-center px-4 sm:px-6 py-8 sm:py-4 lg:py-0"
            >
              <div className="w-14 h-14 rounded-full bg-[#D8C5AE]/35 border border-[#D8C5AE] flex items-center justify-center text-[#A66A2C] mb-5 shadow-sm">
                <Users className="w-6 h-6 stroke-[1.3]" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-lg sm:text-xl md:text-[22px] font-normal text-[#111111] leading-[1.25] mb-4 min-h-[56px] flex items-center justify-center">
                SpaceMELD was founded with a purpose beyond designing buildings.
              </h3>
              <span className="w-8 h-[1px] bg-[#A66A2C] mb-4 block mx-auto" />
              <p className="font-['Manrope'] text-[#222222] text-xs sm:text-[13px] leading-[1.6] font-normal max-w-[240px] mx-auto">
                Our vision is to create thoughtful, enduring spaces that inspire, encourage interaction, and enrich the everyday lives of those who experience them.
              </p>
            </motion.div>

            {/* Column 2: Home Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col items-center text-center px-4 sm:px-6 py-8 sm:py-4 lg:py-0"
            >
              <div className="w-14 h-14 rounded-full bg-[#D8C5AE]/35 border border-[#D8C5AE] flex items-center justify-center text-[#A66A2C] mb-5 shadow-sm">
                <Home className="w-6 h-6 stroke-[1.3]" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-lg sm:text-xl md:text-[22px] font-normal text-[#111111] leading-[1.25] mb-4 min-h-[56px] flex items-center justify-center">
                Whether it's a home,<br />
                a workspace,<br />
                a commercial destination,<br />
                or a place with a unique purpose,
              </h3>
              <span className="w-8 h-[1px] bg-[#A66A2C] mb-4 block mx-auto" />
              <p className="font-['Manrope'] text-[#222222] text-xs sm:text-[13px] leading-[1.6] font-normal max-w-[220px] mx-auto">
                Every project begins with your vision.<br />
                We listen,<br />
                understand your needs,<br />
                and craft spaces that are timeless,<br />
                functional,<br />
                and uniquely yours.
              </p>
            </motion.div>

            {/* Column 3: Pencil Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center text-center px-4 sm:px-6 py-8 sm:py-4 lg:py-0"
            >
              <div className="w-14 h-14 rounded-full bg-[#D8C5AE]/35 border border-[#D8C5AE] flex items-center justify-center text-[#A66A2C] mb-5 shadow-sm">
                <Pencil className="w-6 h-6 stroke-[1.3]" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-lg sm:text-xl md:text-[22px] font-normal text-[#111111] leading-[1.25] mb-4 min-h-[56px] flex items-center justify-center">
                What began as a shared dream is now our promise—
              </h3>
              <span className="w-8 h-[1px] bg-[#A66A2C] mb-4 block mx-auto" />
              <p className="font-['Manrope'] text-[#222222] text-xs sm:text-[13px] leading-[1.6] font-normal max-w-[220px] mx-auto">
                to create spaces that inspire,<br />
                serve a purpose,<br />
                and stand the test of time.
              </p>
            </motion.div>

            {/* Column 4: Leaf Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col items-center text-center px-4 sm:px-6 py-8 sm:py-4 lg:py-0"
            >
              <div className="w-14 h-14 rounded-full bg-[#D8C5AE]/35 border border-[#D8C5AE] flex items-center justify-center text-[#A66A2C] mb-5 shadow-sm">
                <Sprout className="w-6 h-6 stroke-[1.3]" />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-lg sm:text-xl md:text-[22px] font-normal text-[#111111] leading-[1.25] mb-4 min-h-[56px] flex items-center justify-center">
                Great design is<br />
                not just built.<br />
                It's felt.
              </h3>
              <span className="w-8 h-[1px] bg-[#A66A2C] mb-4 block mx-auto" />
              <p className="font-['Manrope'] text-[#222222] text-xs sm:text-[13px] leading-[1.6] font-normal max-w-[220px] mx-auto">
                It's in the quiet corners,<br />
                the thoughtful details,<br />
                and the memories that unfold within every space.
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* FINAL SECTION: Two-Column Layout Exactly Like Reference */}
      <div className="w-full about-section flex flex-col justify-center relative z-10 overflow-hidden">
        <div className="max-w-[1850px] 2xl:max-w-[1950px] w-full mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">

            {/* Left: Large Exterior Architecture Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 flex"
            >
              <div className="w-full max-h-[50vh] xl:max-h-[54vh] aspect-[4/3] rounded-[2px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-[#D8C5AE]/60 bg-[#111111] group my-auto">
                <img
                  src="/images/about_closing_villa.png"
                  alt="SpaceMELD Residence & Landscape"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out brightness-[0.98]"
                />
              </div>
            </motion.div>

            {/* Right Side: Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 max-h-[50vh] xl:max-h-[54vh] my-auto bg-[#F8F5F0] rounded-[2px] relative border border-[#D8C5AE]/60 shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
            >
              <div>
                <span className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl text-[#A66A2C]/30 leading-none block -mb-4 select-none font-normal">
                  &ldquo;
                </span>

                <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl md:text-[34px] font-normal text-[#111111] leading-[1.3] relative z-10 mb-6">
                  We're here to help you<br />
                  write yours—<br />
                  one thoughtful design at a time.
                </h3>
              </div>

              <div>
                <span className="w-12 h-[1px] bg-[#A66A2C] block mb-5" />

                <span className="font-['Manrope'] text-xs sm:text-[13px] font-bold uppercase tracking-[0.15em] text-[#A66A2C] block">
                  SpaceMELD Architects
                </span>
                <span className="font-['Manrope'] text-xs sm:text-[13px] text-[#222222] font-normal mt-1 block">
                  Where every vision finds its place.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: TEAM (ONLY RENDERED ON /about OR WHEN showPeople IS TRUE)
         ========================================================================= */}
      {showPeople && (
        <>
          {/* Team Full-Width Studio Group Banner Image with White Center Overlay */}
          <div id="team" className="w-full h-[calc(100vh-60px)] relative overflow-hidden bg-black border-t border-gray-200 snap-start snap-always">
            <img
              src="/images/studio-team.jpg"
              alt="SpaceMELD Studio Team Group"
              className="w-full h-full object-cover brightness-[0.75] transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                Team
              </h2>
            </div>
          </div>

          {/* Cadence 3-Column Clean Portrait Grid of Employee Details */}
          <div className="max-w-[1850px] 2xl:max-w-[1950px] w-full mx-auto px-6 md:px-12 py-12 md:py-20 snap-start h-auto scroll-snap-align-start flex flex-col justify-center min-h-[calc(100vh-84px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-16">
              {employeesList.map((emp) => (
                <motion.div
                  key={emp.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Square/Portrait Crisp Architectural Grayscale Photograph */}
                  <div className="w-full aspect-square overflow-hidden bg-gray-200 mb-6 rounded-sm shadow-sm">
                    <img
                      src={emp.image}
                      alt={emp.name}
                      className={`w-full h-full object-cover ${emp.imagePosition || 'object-center'} grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out`}
                    />
                  </div>

                  {/* Employee Name */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1412] mb-1.5">
                    {emp.name}
                  </h3>

                  {/* Employee Role */}
                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-gray-500 mb-4 whitespace-pre-line text-center block">
                    {emp.role}
                  </span>

                  {/* Cadence Signature Social Links Row */}

                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* =========================================================================
          FULL-SCREEN IMAGE VIEWER (triggered by clicking the hero desk image)
         ========================================================================= */}
      <AnimatePresence>
        {fullViewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
            onClick={() => setFullViewImage(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullViewImage.src}
                alt={fullViewImage.alt}
                className="max-h-[85vh] w-auto rounded-sm shadow-2xl"
              />
              <button
                onClick={() => setFullViewImage(null)}
                className="absolute -top-10 right-0 flex items-center gap-2 text-white/90 hover:text-[#A66A2C] transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="font-mono uppercase tracking-[0.2em] text-xs font-semibold">
                  Close
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}