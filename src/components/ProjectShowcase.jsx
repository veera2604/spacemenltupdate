import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';

const filterCategories = [
  { key: 'All', label: 'ALL' },
  { key: 'Residential', label: 'RESIDENTIAL' },
  { key: 'Commercial', label: 'COMMERCIAL' },
  { key: 'Interior', label: 'INTERIORS' },
  { key: 'Landscape', label: 'LANDSCAPE' },
];

export default function ProjectShowcase({ limit }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-hide filter bar when not scrolling; pop up on scroll up or down
  React.useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      setShowFilter(true);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowFilter(false);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Exact 11-project staggered column distribution matching Netlify website:
  // LEFT COLUMN (6 projects):
  // 1. Green Frame Villa (greenframe)
  // 2. Shadow Box (rajesh)
  // 3. Urban Nest (kandhasamy)
  // 4. The Brick Canvas (suriya)
  // 5. The Canopy (aravind)
  // 6. Depth in Projection (venky)
  //
  // RIGHT COLUMN (5 projects, staggered down):
  // 1. The Louvered House (suganthi)
  // 2. Layered Living (ravi)
  // 3. The Framed House (rakesh)
  // 4. Pattern Residence (arunkumar)
  // 5. Mangalam Towers (mangalam)
  
  const leftProjectIds = ['greenframe', 'rajesh', 'kandhasamy', 'suriya', 'aravind', 'venky'];
  const rightProjectIds = ['suganthi', 'ravi', 'rakesh', 'arunkumar', 'mangalam'];

  let leftCol = [];
  let rightCol = [];

  if (selectedCategory === 'All') {
    leftCol = leftProjectIds.map((id) => projectsData.find((p) => p.id === id)).filter(Boolean);
    rightCol = rightProjectIds.map((id) => projectsData.find((p) => p.id === id)).filter(Boolean);
  } else {
    const filtered = projectsData.filter((p) => p.category === selectedCategory);
    leftCol = filtered.filter((_, idx) => idx % 2 === 0);
    rightCol = filtered.filter((_, idx) => idx % 2 !== 0);
  }

  if (limit) {
    const allFiltered = selectedCategory === 'All' ? projectsData : projectsData.filter((p) => p.category === selectedCategory);
    const sliced = allFiltered.slice(0, limit);
    leftCol = sliced.filter((_, idx) => idx % 2 === 0);
    rightCol = sliced.filter((_, idx) => idx % 2 !== 0);
  }

  const getProjectAspect = (project) => {
    // Height Adjustment: Taller aspect-ratio for "THE CANOPY" (aravind) and Green Frame
    if (project.id === 'aravind' || project.title?.toUpperCase().includes('CANOPY')) {
      return 'aspect-[3/4]'; // Taller, highly balanced vertical height for The Canopy
    }
    if (project.id === 'greenframe') {
      return 'aspect-[4/5]';
    }
    if (project.id === 'mangalam') {
      return 'aspect-[16/10]';
    }
    if (project.id === 'venky') {
      return 'aspect-[4/3]';
    }
    return project.category === 'Commercial' ? 'aspect-[16/10]' : 'aspect-[4/3]';
  };

  const getArea = (project) => {
    const area = project.specs?.builtUpArea || '5280 SQ.FT';
    return area.toUpperCase().replace(/\s+/g, '');
  };

  // OPEN CASE Center Crosshair Overlay
  const OpenCaseOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 pointer-events-none z-20">
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

  const ProjectTitleBlock = ({ project }) => (
    <div
      onClick={() => navigate(`/project/${project.id}`)}
      className="cursor-pointer flex flex-col"
    >
      <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-[34px] font-extrabold font-sans uppercase tracking-[0.03em] text-[#1A1412] leading-tight mb-1 group-hover:text-[#C86446] transition-colors">
        {project.title}
      </h2>
      <div className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.2em] text-[#78726e]">
        {project.category} — {getArea(project)}
      </div>
    </div>
  );

  const ProjectCard = ({ project, aspectClass }) => (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group flex flex-col w-full cursor-pointer mb-12 sm:mb-16 md:mb-20 inline-block break-inside-avoid"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {/* 1. Image Container */}
      <div className={`w-full ${aspectClass} overflow-hidden bg-[#1a1918] relative rounded-none shadow-sm`}>
        <img
          src={project.partialImage || project.heroImage}
          alt={`${project.title} partial color`}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out opacity-0 md:opacity-100 md:group-hover:opacity-0 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <OpenCaseOverlay />
      </div>

      {/* 2. Title Block ALWAYS BELOW Image */}
      <div className="mt-4 sm:mt-5 flex flex-col">
        <ProjectTitleBlock project={project} />
      </div>
    </motion.div>
  );

  // All 11 Projects in order for seamless Masonry flow
  const allProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const displayProjects = limit ? allProjects.slice(0, limit) : allProjects;

  return (
    <section className="bg-[#FAF8F5] text-[#1A1412] relative min-h-screen pb-24 font-sans overflow-hidden">
      <div className="max-w-[1700px] 2xl:max-w-[1850px] w-full mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-8 sm:pt-12">
        {/* TOP HEADER SECTION */}
        {!limit && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16 md:mb-20">
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold font-sans text-[#1A1412] tracking-tight leading-[1.05]">
                We Create<br />Impressions
              </h1>
            </div>
            <div className="flex flex-col gap-3 max-w-lg">
              <div className="flex items-baseline gap-4">
                <span className="text-7xl sm:text-8xl lg:text-[96px] font-extrabold text-[#dfd9d4] leading-none select-none font-sans">
                  11
                </span>
                <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#78726e] uppercase leading-snug font-bold">
                  .REALISED<br />.IDEAS
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#66605c] font-sans leading-relaxed">
                Our diverse commercial designs unlock space potential and focus on meticulous detail development. We create comprehensive, tailored solutions for your interior design needs.
              </p>
            </div>
          </div>
        )}

        {/* MASONRY GRID CONTAINER USING TAILWIND CSS COLUMNS */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="columns-1 md:columns-2 gap-12 md:gap-16 lg:gap-20 block w-full"
        >
          {displayProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              aspectClass={getProjectAspect(project)}
            />
          ))}
        </motion.div>
      </div>

      {/* FLOATING BOTTOM-CENTER FILTER PILL BAR - POPS UP ONLY WHEN SCROLLING */}
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{
          y: showFilter || isHovered ? 0 : 90,
          opacity: showFilter || isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A1412]/95 backdrop-blur-md text-white px-2.5 py-2 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-white/15 flex items-center gap-1 sm:gap-1.5 pointer-events-auto max-w-[94vw] sm:max-w-none overflow-x-auto scrollbar-none"
      >
        {filterCategories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                setSelectedCategory(cat.key);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#C86446] text-white font-bold shadow-md'
                  : 'text-white/75 hover:text-white hover:bg-white/10 font-medium'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </motion.div>
    </section>
  );
}