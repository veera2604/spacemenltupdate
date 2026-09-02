import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';

const filterCategories = [
  { key: 'All', label: 'All' },
  { key: 'Residential', label: 'Residential' },
  { key: 'Commercial', label: 'Commercial' },
  { key: 'Interior', label: 'Interiors' },
  { key: 'Landscape', label: 'Landscape' },
];

// Aspect ratios cycle across the whole sequence (not per-column), so two
// items sitting side by side in the same visual row rarely share a shape.
const aspectCycle = [
  'aspect-[16/10]',
  'aspect-[4/5]',
  'aspect-[3/2]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-[16/9]',
];

// Every 5th project breaks out as a full-width panoramic piece instead of
// sitting in a column. This is what gives the page "moments" instead of a
// relentless two-up grid.
const FULL_WIDTH_EVERY = 5;

export default function ProjectShowcase({ limit, hideFilter }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBottomFilter, setShowBottomFilter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !hideFilter) {
        setShowBottomFilter(true);
      } else {
        setShowBottomFilter(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideFilter]);

  // Custom curated order for 'All' so projects pair perfectly with zero gaps
  let baseProjects =
    selectedCategory === 'All'
      ? [
          projectsData.find((p) => p.id === 'greenframe'),
          projectsData.find((p) => p.id === 'rajesh'),
          projectsData.find((p) => p.id === 'suganthi'),
          projectsData.find((p) => p.id === 'ravi'),
          projectsData.find((p) => p.id === 'kandhasamy'),
          projectsData.find((p) => p.id === 'suriya'),
          projectsData.find((p) => p.id === 'rakesh'),
          projectsData.find((p) => p.id === 'arunkumar'),
          projectsData.find((p) => p.id === 'aravind'),
          projectsData.find((p) => p.id === 'venky'),
          projectsData.find((p) => p.id === 'mangalam'),
        ].filter(Boolean)
      : projectsData.filter((p) => p.category === selectedCategory);

  if (limit) {
    baseProjects = baseProjects.slice(0, limit);
  }

  // Split projects into left and right columns for a true staggered masonry layout
  const leftCol = baseProjects.filter((_, i) => i % 2 === 0);
  const rightCol = baseProjects.filter((_, i) => i % 2 !== 0);

  // Helper to determine aesthetic card heights based on column and index
  const getCardHeight = (isLeft, index) => {
    if (isLeft) {
      // Left column sequence: Landscape, Portrait, Square
      const seq = index % 3;
      if (seq === 0) return 'aspect-[4/3] md:aspect-auto md:h-[500px] lg:h-[580px]'; // Landscape
      if (seq === 1) return 'aspect-[3/5] md:aspect-auto md:h-[620px] lg:h-[720px]'; // Portrait
      return 'aspect-square md:aspect-auto md:h-[540px] lg:h-[600px]'; // Square-ish
    } else {
      // Right column sequence: Portrait, Landscape, Portrait
      const seq = index % 3;
      if (seq === 0) return 'aspect-[3/5] md:aspect-auto md:h-[620px] lg:h-[720px]'; // Portrait
      if (seq === 1) return 'aspect-[4/3] md:aspect-auto md:h-[500px] lg:h-[580px]'; // Landscape
      return 'aspect-[3/5] md:aspect-auto md:h-[620px] lg:h-[720px]'; // Portrait
    }
  };

  const getArea = (project) => {
    const area = project.specs?.builtUpArea || '1340SQ.M.';
    return area.replace(/sq\s*ft/i, 'SQ.M.').replace(/\s+/g, '').toUpperCase();
  };

  // ZIKZAK OPEN CASE Center Crosshair Overlay
  const OpenCaseOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/15 pointer-events-none z-20">
      <div className="flex items-center gap-6 w-full px-6 sm:px-12">
        <div className="flex-1 h-px bg-white/70" />
        <div className="text-center text-white font-sans font-bold uppercase tracking-[0.3em] text-xs sm:text-sm leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <div>OPEN</div>
          <div>CASE</div>
        </div>
        <div className="flex-1 h-px bg-white/70" />
      </div>
    </div>
  );

  // Title block: bold uppercase name + tracked meta line
  const MinimalTitleBlock = ({ project }) => (
    <div
      onClick={() => navigate(`/project/${project.id}`)}
      className="mt-4 flex flex-col justify-start cursor-pointer"
    >
      <h3 className="text-[12px] sm:text-[18px] md:text-[28px] leading-[1.1] font-extrabold font-sans uppercase tracking-[0.02em] text-[#221f1e]/80 group-hover:text-[#221f1e] group-hover:translate-x-1.5 transition-all duration-500 ease-out mb-1">
        {project.title}
      </h3>
      <span className="text-[8px] sm:text-[10px] md:text-[13px] font-sans font-normal uppercase tracking-[0.2em] text-[#a8a29d] group-hover:text-[#c48b57] transition-colors duration-500 line-clamp-1">
        {[project.category, project.location, getArea(project)].filter(Boolean).join(' — ')}
      </span>
    </div>
  );

  const ProjectCard = ({ project, cardHeight = 'h-[400px] md:h-[520px]', delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group cursor-pointer flex flex-col w-full"
    >
      <div
        onClick={() => navigate(`/project/${project.id}`)}
        className={`project-card w-full ${cardHeight} overflow-hidden bg-[#1a1918] relative rounded-none shadow-sm`}
      >
        <img
          src={project.partialImage || project.heroImage}
          alt={`${project.title} partial color`}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <OpenCaseOverlay />
      </div>
      <MinimalTitleBlock project={project} />
    </motion.div>
  );

  return (
    <section className="bg-[#f7f6f5] text-[#221f1e] relative min-h-screen pb-20 font-sans overflow-hidden">

      {/* HEADER */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-10 sm:pt-14 pb-8 border-b border-[#221f1e]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-sans tracking-tight text-[#221f1e] leading-[1.08]">
              We Create <br />
              Impressions
            </h1>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="flex items-center gap-4 mb-5">
              <span className="text-6xl sm:text-7xl md:text-8xl font-extrabold font-sans text-[#c4beba] tracking-tighter leading-none">
                {projectsData.length}
              </span>
              <div className="flex flex-col text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#221f1e] font-bold leading-tight">
                <span>.REALISED</span>
                <span>.IDEAS</span>
              </div>
            </div>
            <p className="text-sm sm:text-base md:text-lg font-sans text-[#5c5755] leading-relaxed max-w-xl font-medium">
              Our diverse commercial designs unlock space potential and focus on meticulous detail development. We create comprehensive, tailored solutions for your interior design needs.
            </p>
          </div>
        </div>
      </div>

      {/* FLOATING BOTTOM-CENTER FILTER PILL BAR ON SCROLL */}
      <AnimatePresence>
        {showBottomFilter && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#221f1e]/95 backdrop-blur-md text-white px-1.5 sm:px-2 py-1.5 rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.4)] border border-white/15 flex items-center gap-0.5 sm:gap-1"
          >
            {filterCategories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setSelectedCategory(cat.key);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-sans tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${isActive
                    ? 'bg-[#c48b57] text-white font-bold shadow-sm'
                    : 'text-white/75 hover:text-white hover:bg-white/10 font-medium'
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MASONRY STAGGERED SHOWCASE — True 2-column split layout */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-8 md:pt-16">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-14 items-start"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-8 sm:gap-12 md:gap-20 w-full">
            {leftCol.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                cardHeight={getCardHeight(true, idx)}
                delay={0}
              />
            ))}
          </div>

          {/* Right Column (Staggered Down) */}
          <div className="flex flex-col gap-8 sm:gap-12 md:gap-20 w-full mt-10 md:mt-32">
            {rightCol.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                cardHeight={getCardHeight(false, idx)}
                delay={0.15}
              />
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}