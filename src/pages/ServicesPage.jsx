import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';
import {
  ArrowRight,
  CheckCircle,
  X,
  Search,
  PenTool,
  FileText,
  HardHat,
  Home
} from 'lucide-react';

const coreServices = [
  {
    id: 'architecture',
    number: '01',
    title: 'ARCHITECTURE',
    tagline: 'Innovation & Creativity',
    image: '/images/service-card-architecture.png',
    description: 'Our Designs are innovative, fresh and inspirational in both form and function & we are equipped with highly qualified Structural team with latest design technologies.',
    detailedOverview: 'Our architectural practice approaches every site as a dialogue between natural ecology and built form. Using advanced biophilic engineering, passive solar orientation, and regional material palettes, we craft timeless structures that age gracefully.',
    deliverables: [
      'Site Masterplanning & Micro-climate Analysis',
      'Schematic Design & Architectural 3D BIM Modeling',
      'Structural & MEP Engineering Coordination',
      'Municipal Approval Drawings & Regulatory Compliance',
      'On-site Architectural Execution Supervision'
    ]
  },
  {
    id: 'interior-design',
    number: '02',
    title: 'INTERIORS',
    tagline: 'Modern & Unique',
    image: '/images/service-card-interiors.png',
    description: 'Each space in every project is designed to perfection, incorporating the most recent advances in architecture.',
    detailedOverview: 'We curate tactile environments where natural light sculpts custom joinery, handcrafted stone surfaces, and acoustic timber ceilings. Every interior element is designed specifically for how you live, work, and entertain.',
    deliverables: [
      'Spatial Zoning & Ergonomic Flow Optimization',
      'Bespoke Joinery, Millwork & Furniture Engineering',
      'Architectural Lighting Design & Automation Layouts',
      'Custom Material & Finish Specification Boards',
      'Art Curation & Soft Furnishing Selection'
    ]
  },
  {
    id: 'construction',
    number: '03',
    title: 'CONSTRUCTION',
    tagline: 'Expertise & Experience',
    image: '/images/service-card-construction.png',
    description: 'Conceptualizing spaces and translating them into functional and aesthetic buildings & Our holistic approach combines cutting edge construction techniques to ensure every project reflects your unique personality and requirements.',
    detailedOverview: 'We eliminate the friction between architectural vision and site reality. Our dedicated project management team oversees structural contractors, specialist artisans, and quality assurance protocols with real-time digital tracking.',
    deliverables: [
      'LOD 500 Working Construction Documentation',
      'Daily Structural Quality Control & Site Inspections',
      'Transparent Vendor & Material Cost Audits',
      'Milestone-driven Gantt Scheduling & Risk Mitigation',
      'Material Testing & Structural Safety Certifications'
    ]
  },
  {
    id: 'design-build',
    number: '04',
    title: 'DESIGN & BUILD',
    tagline: 'From Vision to Reality',
    image: '/images/service-card-design-build.png',
    description: 'We bring Architecture, Interiors, and Construction together under one integrated approach. From concept to completion, every detail is thoughtfully designed and precisely executed to create spaces that are functional, enduring, and uniquely yours.',
    detailedOverview: 'Our turnkey Design & Build model unifies architecture, interior styling, engineering, and execution under a single contract. You interface with one dedicated studio principal while we manage every detail from ground-breaking to handover.',
    deliverables: [
      'Single Point of Accountability from Concept to Key Handover',
      'Fixed-Cost Financial Governance & Budget Protection',
      'Integrated BIM Clash Detection Across All Disciplines',
      'Priority Access to Studio Craftsmen & Joinery Workshops',
      'Comprehensive Post-Handover Maintenance Protocols'
    ]
  }
];

const processSteps = [
  {
    number: '01',
    title: 'DISCOVER',
    icon: Search,
    description: 'We listen closely, understand your needs, and explore the possibilities that shape your vision.'
  },
  {
    number: '02',
    title: 'DESIGN',
    icon: PenTool,
    description: 'We transform your ideas into thoughtful, purposeful designs that balance aesthetics, functionality, and character.'
  },
  {
    number: '03',
    title: 'DEVELOP',
    icon: FileText,
    description: 'We refine the design, resolve every detail, and prepare a clear roadmap for seamless execution.'
  },
  {
    number: '04',
    title: 'BUILD',
    icon: HardHat,
    description: 'We bring the vision to life through precise execution, quality craftsmanship, and attention to every detail.'
  },
  {
    number: '05',
    title: 'DELIVER',
    icon: Home,
    description: 'We complete and hand over a thoughtfully crafted space, ready to be experienced, lived in, and cherished.'
  }
];

/* Framer Motion Variants for Staggered Pop & Reveal Animations */
const servicesGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.1,
    },
  },
};

const serviceCardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 110,
    },
  },
};

const imagePopVariants = {
  hidden: { scale: 1.25, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const processGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.15,
    },
  },
};

const processStepVariants = {
  hidden: { opacity: 0, y: 45, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 16,
      stiffness: 130,
    },
  },
};

export default function ServicesPage() {
  const [modalServiceTitle, setModalServiceTitle] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Villa',
    location: '',
    message: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInquiryClick = (e, serviceTitle) => {
    e.stopPropagation();
    setModalServiceTitle(serviceTitle);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setModalServiceTitle(null);
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Residential Villa',
        location: '',
        message: ''
      });
    }, 2500);
  };

  return (
    <SmoothScroll>
      <div className="bg-[#FAF8F5] min-h-screen text-[#1A1412] font-sans selection:bg-[#C86446] selection:text-white flex flex-col justify-between">
        <Navigation />

        <main className="flex-grow">
          {/* ====================================================================
              1. HERO SECTION (MATCHING DESIGN MOCKUP WITH ENTRANCE REVEAL)
             ==================================================================== */}
          <section id="services-intro" className="relative pt-[100px] sm:pt-[120px] pb-12 sm:pb-16 w-full overflow-hidden flex flex-col justify-center bg-[#FAF8F5]">

            {/* Background Architectural Image (Right Side) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute inset-y-0 right-0 w-[90%] md:w-[65%] lg:w-[60%] z-0 opacity-40 sm:opacity-60 lg:opacity-100"
            >
              {/* CSS gradient mask to blend smoothly into the cream background */}
              <div
                className="w-full h-full"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)'
                }}
              >
                <img
                  src="/images/services_hero_dusk.png"
                  alt="Architecture hero"
                  className="w-full h-full object-cover object-left"
                />
              </div>
            </motion.div>

            {/* Mobile-Only Cream Gradient Mask to Ensure 100% Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/95 to-[#FAF8F5]/20 lg:hidden pointer-events-none z-10" />

            {/* Foreground Content */}
            <div className="relative z-20 max-w-[1400px] xl:max-w-[1600px] w-full mx-auto px-6 sm:px-12 md:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                {/* Left Column: Heading & Content */}
                <motion.div
                  initial={{ opacity: 0, x: -35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 xl:col-span-6 space-y-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center opacity-80">
                      <span className="w-2 h-[1px] bg-[#C86446]" />
                      <span className="w-1.5 h-1.5 rounded-full border border-[#C86446] rotate-45 mx-1" />
                      <span className="w-12 h-[1px] bg-[#C86446]" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#C86446] font-bold">
                      WHAT WE DO
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl md:text-[4rem] lg:text-[4.5rem] font-serif text-[#1A1412] font-medium leading-[1.2] sm:leading-[1.15] tracking-tight font-['Cormorant_Garamond'] pt-1 sm:pt-2">
                    Thoughtful spaces. <br className="hidden xs:block" />
                    End-to-end solutions.
                  </h1>

                  <p className="text-sm md:text-base text-[#4A4442] font-normal leading-[1.7] max-w-[28rem] pt-2 sm:pt-3">
                    From concept to completion, we offer integrated services in architecture, interiors, construction and design-build. <br className="hidden sm:block" />
                    Every project is crafted with purpose, precision and passion.
                  </p>
                </motion.div>

              </div>
            </div>
          </section>

          {/* ====================================================================
              2. OUR SERVICES (STAGGERED POP-IN ARCHITECTURAL CARDS GRID)
             ==================================================================== */}
          <section className="py-16 sm:py-24 max-w-[1400px] xl:max-w-[1600px] w-full mx-auto px-6 sm:px-12 md:px-16 relative z-10 flex flex-col justify-center">

            {/* Center Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16 flex flex-col items-center justify-center gap-3"
            >
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#C86446] font-semibold">
                OUR SERVICES
              </span>
              <div className="flex items-center opacity-80">
                <span className="w-10 h-[1px] bg-[#C86446]" />
                <span className="w-1.5 h-1.5 rounded-full border border-[#C86446] rotate-45 mx-1" />
                <span className="w-10 h-[1px] bg-[#C86446]" />
              </div>
            </motion.div>

            {/* 4 Cards Grid with Staggered Spring Pop */}
            <motion.div
              variants={servicesGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch"
            >
              {coreServices.map((svc) => (
                <motion.div
                  key={svc.id}
                  variants={serviceCardVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  onClick={(e) => handleInquiryClick(e, svc.title)}
                  className="group cursor-pointer bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#1A1412]/5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(200,100,70,0.12)] transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Architectural Photograph with Inner Zoom & Grayscale Pop */}
                    <div className="w-full aspect-[16/11] rounded-xl overflow-hidden bg-gray-100 relative mb-5">
                      <motion.img
                        variants={imagePopVariants}
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-full object-cover grayscale contrast-[1.1] brightness-[0.92] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      {/* Bottom Left Number Overlay */}
                      <div className="absolute bottom-3 left-4 text-white text-xl sm:text-2xl font-bold font-mono tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] flex items-center gap-1.5">
                        <span>{svc.number}</span>
                      </div>
                    </div>

                    {/* Title, Tagline & Description */}
                    <h3 className="text-xs sm:text-sm font-mono uppercase tracking-[0.24em] font-extrabold text-[#1A1412] mb-1 group-hover:text-[#C86446] transition-colors">
                      {svc.title}
                    </h3>

                    {svc.tagline && (
                      <p className="text-[11px] font-sans uppercase tracking-wider text-[#C86446] font-semibold mb-2.5">
                        {svc.tagline}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-[#5c5755] leading-relaxed font-light">
                      {svc.description}
                    </p>
                  </div>


                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ====================================================================
              3. OUR PROCESS (STAGGERED POP TIMELINE WITH CIRCLE ICONS)
             ==================================================================== */}
          <section className="py-16 sm:py-24 max-w-[1400px] xl:max-w-[1500px] w-full mx-auto px-6 sm:px-12 md:px-16 overflow-hidden flex flex-col items-center justify-center">

            {/* Center Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14 sm:mb-20"
            >
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.28em] text-[#C86446] font-bold">
                OUR PROCESS
              </span>
            </motion.div>

            {/* 5 Process Steps Horizontal Grid */}
            <motion.div
              variants={processGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative items-start"
            >
              {processSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    variants={processStepVariants}
                    className="flex flex-col items-center relative group"
                  >

                    {/* Connecting Horizontal Line with Arrow (Desktop Only between steps) */}
                    {idx < processSteps.length - 1 && (
                      <div className="hidden lg:flex items-center absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] z-0 pointer-events-none">
                        <div className="h-[1.5px] bg-[#C86446]/25 w-full relative">
                          <ArrowRight className="w-3.5 h-3.5 text-[#C86446]/70 absolute right-0 -top-1.5" />
                        </div>
                      </div>
                    )}

                    {/* Circle Icon Button */}
                    <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#C86446]/40 bg-white/90 shadow-sm flex items-center justify-center text-[#C86446] mb-5 group-hover:bg-[#C86446] group-hover:text-white group-hover:border-[#C86446] group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5] transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Step Title (01 DISCOVER) */}
                    <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] font-extrabold mb-2.5 text-center">
                      <span className="text-[#C86446] mr-1.5">{step.number}</span>
                      <span className="text-[#1A1412]">{step.title}</span>
                    </div>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-[#5c5755] text-center font-light leading-relaxed px-2 max-w-[230px]">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

          </section>
        </main>

        {/* ====================================================================
            4. CALL TO ACTION BOTTOM BANNER
           ==================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#141211] text-white py-16 sm:py-20 px-6 sm:px-12 md:px-16 overflow-hidden border-t border-[#1A1412]/20"
        >
          <img
            src="/images/services_hero_dusk_villa.png"
            alt="Architectural atmosphere"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141211]/95 via-[#141211]/85 to-[#141211]/95 pointer-events-none" />

          <div className="max-w-[1850px] 2xl:max-w-[1950px] mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white tracking-tight mb-2 font-['Cormorant_Garamond']">
                Let's build something extraordinary.
              </h3>
              <p className="text-sm sm:text-base text-gray-400 font-light">
                We'd love to hear about your project.
              </p>
            </div>

            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-4 sm:px-8 sm:py-4.5 border border-white/30 text-xs font-mono uppercase tracking-[0.24em] font-bold text-white hover:bg-[#C86446] hover:border-[#C86446] transition-all flex items-center gap-3 shrink-0 cursor-pointer group"
            >
              <span>LET'S WORK TOGETHER</span>
              <ArrowRight className="w-4 h-4 text-[#C86446] group-hover:text-white transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.section>

        {/* ====================================================================
            5. CONSULTATION REQUEST MODAL
           ==================================================================== */}
        <AnimatePresence>
          {modalServiceTitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white max-w-xl w-full p-8 sm:p-10 relative shadow-2xl rounded-2xl border border-[#1A1412]/15"
              >
                <button
                  onClick={() => setModalServiceTitle(null)}
                  className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#1A1412] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto stroke-1" />
                    <h3 className="text-2xl font-extrabold text-[#1A1412]">
                      Consultation Request Received
                    </h3>
                    <p className="text-sm text-[#5c5755] max-w-sm mx-auto">
                      Thank you for inquiring about <span className="font-bold text-[#1A1412]">{modalServiceTitle}</span>. Our studio director will contact you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C86446] block mb-2 font-bold">
                      STUDIO CONSULTATION
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1412] mb-6">
                      {modalServiceTitle}
                    </h3>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#736f6d] mb-1.5 font-bold">
                          FULL NAME *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Client / Project Lead Name"
                          className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#736f6d] mb-1.5 font-bold">
                            EMAIL ADDRESS *
                          </label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="client@domain.com"
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#736f6d] mb-1.5 font-bold">
                            PHONE NUMBER *
                          </label>
                          <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 / +1 ..."
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#736f6d] mb-1.5 font-bold">
                            PROJECT TYPE
                          </label>
                          <select
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-sm"
                          >
                            <option value="Residential Villa">Luxury Residential Villa</option>
                            <option value="Commercial Space">Commercial / Studio Space</option>
                            <option value="Interior Styling">Turnkey Interior Styling</option>
                            <option value="Masterplanning">Masterplanning & Landscape</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#736f6d] mb-1.5 font-bold">
                            PROJECT LOCATION
                          </label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="City, Region"
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#736f6d] mb-1.5 font-bold">
                          PROJECT VISION & TIMELINE
                        </label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about the site size, architectural goals, and target start date..."
                          className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-sm resize-none"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-4 bg-[#1A1412] text-white text-xs font-mono uppercase tracking-[0.24em] font-bold hover:bg-[#C86446] transition-colors rounded-lg cursor-pointer flex items-center justify-center gap-3"
                        >
                          <span>SUBMIT CONSULTATION REQUEST</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
