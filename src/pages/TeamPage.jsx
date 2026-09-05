import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

/* Exact SpaceMELD Studio Architects with Editorial Structure & Studio Portraits */
const teamMembers = [
  {
    name: 'Suriya',
    role: 'Chief Architect',
    crew: 'administrative',
    degree: 'Bachelor of Architecture',
    image: '/TEAM/SURIYA.jpg',
    bio: [
      'Suriya leads SpaceMELD as Chief Architect, guiding spatial masterplanning, conceptual design direction, and architectural vision across bespoke residential, commercial, and institutional projects.',
      'His architectural philosophy bridges timeless materiality with contemporary functionalism, harmonizing daylight, acoustic tranquility, and sensory calmness.',
      'With an uncompromising commitment to craft, punctuality, and structural clarity, Suriya ensures that every space engineered by the studio elevates human focus, well-being, and connection.'
    ],
  },
  {
    name: 'Syed Bilal',
    role: 'Principal Architect & Materiality Specifier',
    crew: 'creative',
    degree: 'Bachelor of Architecture',
    image: '/TEAM/BILAL.jpeg',
    bio: [
      'Syed Bilal directs architectural design exploration and tactile materiality curation. His work explores the delicate interplay between raw textures, natural light, and structural harmony.',
      'Collaborating closely with artisanal craftsmen and material innovators, he transforms tactile finishes into emotive, enduring architectural environments.'
    ],
  },
  {
    name: 'Selvaraj',
    role: 'Creative Design Director | Architecture & Interiors',
    crew: 'creative',
    degree: 'Master of Interior Architecture & Design',
    image: '/TEAM/SELVA.JPG',
    imagePosition: 'object-[center_top]',
    bio: [
      'Selvaraj oversees creative design direction across both architecture and bespoke interior environments. His design ethos strips away unnecessary ornamentation in favor of pure proportions, tactile joinery, and poetic lighting.',
      'He crafts unified spatial narratives where interior volumes seamlessly extend exterior architectural concepts.'
    ],
  },
  {
    name: 'Shivadharani',
    role: 'Senior Architect & Interior Designer',
    crew: 'creative',
    degree: 'Bachelor of Architecture & Interior Design',
    image: '/TEAM/SHIVADHARANI.jpeg',
    bio: [
      'Shivadharani specializes in high-end interior detailing, spatial ergonomics, and custom furniture curation.',
      'Her meticulous attention to proportion, bespoke palettes, and ambient lighting scenarios ensures that every residence balances serene comfort with elevated aesthetic refinement.'
    ],
  },
  {
    name: 'Raghuram',
    role: 'Architect & Senior Project Manager',
    crew: 'technical',
    degree: 'Bachelor of Architecture & Construction Management',
    image: '/TEAM/RAGHU.jpeg',
    bio: [
      'Raghuram coordinates comprehensive project delivery, contractor dialogue, and turnkey execution from ground-breaking to handover.',
      'His technical rigor and proactive site leadership ensure that architectural vision is translated into flawless on-site reality on time and to the highest standards of craftsmanship.'
    ],
  },
];

const crewTabs = [
  { key: 'all', label: 'ALL' },
  { key: 'administrative', label: 'ADMINISTRATIVE CREW' },
  { key: 'creative', label: 'CREATIVE CREW' },
  { key: 'technical', label: 'TECHNICAL CREW' },
];

export default function TeamPage() {
  const [selectedCrew, setSelectedCrew] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredTeam =
    selectedCrew === 'all'
      ? teamMembers
      : teamMembers.filter((m) => m.crew === selectedCrew);

  return (
    <div className="min-h-screen bg-white text-[#212121] flex flex-col font-sans selection:bg-[#c48b57] selection:text-white">
      <Navigation />

      {/* Between Spaces Exact Centered Page Title & Narrative Intro */}
      <section className="relative w-full pt-16 pb-12 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#212121] font-['Cormorant_Garamond'] mb-6">
            Team
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#686868] font-normal leading-relaxed text-left md:text-justify">
            SpaceMELD Architects has a strong multidisciplinary team of young and energetic architects, computational designers, and interior specialists from diverse backgrounds. We work very closely with a highly skilled network of structural engineers and craftsmen—believing strongly in design as an intensive dialogue between clients, consultants, and architects.
          </p>
        </div>
      </section>

      {/* Crew Category Tabs */}
      <section className="max-w-[1850px] 2xl:max-w-[1950px] w-full mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-8">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 border-b border-gray-200 pb-5">
          {crewTabs.map((tab) => {
            const isActive = selectedCrew === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedCrew(tab.key)}
                className={`text-xs sm:text-sm uppercase tracking-[0.22em] transition-all duration-300 pb-2 relative cursor-pointer ${isActive
                  ? 'text-[#212121] font-bold'
                  : 'text-gray-400 hover:text-[#212121]'
                  }`}
              >
                {isActive ? `. ${tab.label}` : tab.label}
                {isActive && (
                  <motion.div
                    layoutId="teamPageUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c48b57]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Exactly Between Spaces 33.3% Left Photo / 66.6% Right Narrative Profiles */}
      <section className="max-w-[1850px] 2xl:max-w-[1950px] w-full mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-10 mb-28 flex-grow">
        <div className="flex flex-col gap-16 md:gap-24">
          <AnimatePresence mode="popLayout">
            {filteredTeam.map((member) => (
              <motion.div
                key={member.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 pb-16 md:pb-20 border-b border-gray-200/80 last:border-b-0 last:pb-0 items-start"
              >
                {/* Left Column (33.3% Width — Exact Between Spaces Portrait Figure) */}
                <div className="md:col-span-4 lg:col-span-4">
                  <figure className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full object-cover ${member.imagePosition || 'object-center'} filter brightness-[0.98] hover:scale-105 transition-transform duration-700 ease-out`}
                    />
                  </figure>
                </div>

                {/* Right Column (66.6% Width — Between Spaces Editorial Profile & Biography) */}
                <div className="md:col-span-8 lg:col-span-8 flex flex-col justify-start">
                  {/* Name + Title Badge */}
                  <div className="mb-2 flex flex-wrap items-baseline gap-2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#212121] font-['Cormorant_Garamond']">
                      {member.name}
                    </h2>
                    <span className="text-base sm:text-lg text-[#686868] font-light italic">
                      ({member.role})
                    </span>
                  </div>

                  {/* Qualification / Degree */}
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#c48b57] mb-6 font-semibold">
                    {member.degree}
                  </p>

                  {/* Multi-paragraph biographical narrative */}
                  <div className="flex flex-col gap-4 text-base sm:text-lg text-[#686868] font-normal leading-relaxed">
                    {member.bio.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
