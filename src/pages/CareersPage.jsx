import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';
import {
  Users,
  Lightbulb,
  Scale,
  Heart,
  ArrowRight,
  CheckCircle,
  X
} from 'lucide-react';

/* Framer Motion variants for staggered reveal */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 110,
    },
  },
};

export default function CareersPage() {
  const [activeModalRole, setActiveModalRole] = useState(null);
  const [showVacanciesModal, setShowVacanciesModal] = useState(false);
  const [expandedVacancy, setExpandedVacancy] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    location: '',
    education: '',
    portfolioUrl: '',
    resumeFile: null,
    portfolioFile: null,
    linkedin: '',
    message: ''
  });

  const vacanciesList = [
    { title: 'PROJECT MANAGER', desc: 'Seeking a seasoned Project Manager to oversee luxury residential builds from inception to handover, ensuring uncompromising quality and strict timeline adherence.' },
    { title: 'ARCHITECT', desc: 'Join our creative studio to lead spatial masterplanning and bespoke architectural design. Strong proficiency in drafting required.' },
    ,
    { title: 'INTERIOR DESIGNER', desc: 'Looking for an imaginative Interior Designer capable of crafting highly detailed, emotive interior spaces with a focus on materiality and lighting.' },
    { title: '3D VISUALIZER', desc: 'We need a talented 3D Visualizer capable of transforming conceptual designs into breathtaking, photorealistic architectural renders.' },
    { title: 'MARKETING & SALES EXECUTIVE', desc: 'Seeking a dynamic executive to drive studio growth, foster high-net-worth client relationships, and expand our architectural footprint.' },
    { title: 'SITE SUPERVISOR', desc: 'Looking for a rigorous Site Supervisor to coordinate on-site execution, manage contractors, and ensure our architectural vision is perfectly realized.' },
    { title: 'PROCUREMENT EXECUTIVE', desc: 'Join us to manage the sourcing and procurement of premium building materials, luxury fixtures, and custom finishes for our bespoke projects.' },
    { title: 'INTERN', desc: 'A hands-on learning opportunity for passionate architecture students to assist our senior design team with drafting, research, and site visits.' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApplyClick = (e, roleTitle) => {
    e.stopPropagation();
    setShowVacanciesModal(false);
    setActiveModalRole(roleTitle);
    setFormSubmitted(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      });
      data.append('role', activeModalRole);

      const response = await fetch('http://localhost:5001/api/apply', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setActiveModalRole(null);
          setFormSubmitted(false);
          setFormData({
            name: '', email: '', phone: '', experience: '', location: '',
            education: '', portfolioUrl: '', resumeFile: null, portfolioFile: null,
            linkedin: '', message: ''
          });
        }, 2500);
      } else {
        alert('There was a problem submitting your application. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please make sure the backend server is running and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SmoothScroll>
      <div className="bg-[#FAF8F5] min-h-screen text-[#1A1412] font-sans selection:bg-[#C86446] selection:text-white flex flex-col justify-between">
        <Navigation />

        <main className="flex-grow">
          {/* ====================================================================
              1. HERO SECTION (EDITORIAL QUOTE & SUNLIGHT ARCHITECTURAL BACKGROUND)
             ==================================================================== */}
          <section className="relative w-full flex items-stretch overflow-hidden border-b border-[#1A1412]/10 min-h-[560px] h-[calc(100svh-64px)] sm:h-[calc(100svh-70px)] lg:h-[calc(100vh-70px)] bg-[#FAF8F5]">
            {/* Background Full Architectural Interior Reference Image */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#FAF8F5]">
              <img
                src="/images/careers_hero_minimalist_sunlight.png"
                alt="SpaceMELD Studio Minimalist Sunlight & Workspace"
                className="w-full h-full object-cover object-[85%_center] sm:object-[88%_center] lg:object-right brightness-[0.98] scale-100 transition-transform duration-1000 ease-out opacity-90"
              />
              {/* Soft editorial gradient overlay so the text pops clearly while showing the warm sunlight interior and olive tree */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/85 sm:via-[#FAF8F5]/75 to-[#FAF8F5]/60 pointer-events-none z-[1]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/60 via-transparent to-[#FAF8F5] pointer-events-none z-[1]" />
            </div>

            {/* Content Container - vertically centered within the single viewport */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 py-6 sm:py-8 w-full h-full relative z-10 flex flex-col justify-center items-center text-center overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 max-w-5xl mx-auto my-auto py-4"
              >
                {/* Subtitle with copper line */}
                <div className="flex flex-col items-center gap-2.5 sm:gap-3">
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.28em] text-[#1A1412] font-bold">
                    CAREERS
                  </span>
                  <span className="w-10 sm:w-12 h-[1.5px] bg-[#C86446]" />
                </div>

                {/* Large Serif Quote Headline */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-serif font-normal text-[#1A1412] tracking-tight leading-[1.12] max-w-5xl mx-auto font-['Cormorant_Garamond']">
                  <span className="text-[#C86446] font-serif mr-1 sm:mr-2 inline-block">“</span>
                  Design a career that shapes spaces and inspires lives.
                  <span className="text-[#C86446] font-serif ml-1 sm:ml-2 inline-block">”</span>
                </h1>

                {/* Sub-description paragraph */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#5c5755] font-light leading-relaxed max-w-2xl mx-auto pt-1 sm:pt-2">
                  Join a team that creates thoughtful architecture with purpose, passion and collaboration.
                </p>

                {/* Action Button */}
                <div className="pt-4 sm:pt-6">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowVacanciesModal(true);
                    }}
                    className="px-7 sm:px-8 py-4 sm:py-4.5 bg-[#1A1412] text-white text-xs sm:text-sm font-mono uppercase tracking-[0.24em] font-bold hover:bg-[#C86446] transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto cursor-pointer group rounded-lg"
                  >
                    <span>VIEW OPEN POSITIONS</span>
                    <ArrowRight className="w-4 h-4 text-[#C86446] group-hover:text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ====================================================================
              2. WHY JOIN US SECTION (4 PILLAR ICON COLUMNS)
             ==================================================================== */}
          <section className="py-20 sm:py-28 bg-[#F4F1EA] border-y border-[#1A1412]/10">
            <div className="max-w-[1500px] mx-auto px-6 sm:px-12 md:px-16">

              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center text-center mb-16 sm:mb-24"
              >
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.28em] text-[#1A1412] font-bold mb-3">
                  WHY JOIN US
                </span>
                <span className="w-12 h-[1.5px] bg-[#C86446]" />
              </motion.div>

              {/* 4 Pillars Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 lg:gap-8 items-start text-center"
              >
                {/* 1. GROW */}
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4 px-3 group">
                  <div className="w-16 h-16 rounded-full border-2 border-[#C86446]/40 bg-white shadow-sm flex items-center justify-center text-[#C86446] mb-2 group-hover:bg-[#C86446] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                    <Users className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-mono uppercase tracking-[0.24em] font-extrabold text-[#1A1412]">
                    GROW
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5c5755] leading-relaxed font-light max-w-[240px]">
                    Learn, grow and work on meaningful projects.
                  </p>
                </motion.div>

                {/* 2. CREATE */}
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4 px-3 group">
                  <div className="w-16 h-16 rounded-full border-2 border-[#C86446]/40 bg-white shadow-sm flex items-center justify-center text-[#C86446] mb-2 group-hover:bg-[#C86446] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                    <Lightbulb className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-mono uppercase tracking-[0.24em] font-extrabold text-[#1A1412]">
                    CREATE
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5c5755] leading-relaxed font-light max-w-[240px]">
                    Be in a creative environment that encourages ideas.
                  </p>
                </motion.div>

                {/* 3. BALANCE */}
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4 px-3 group">
                  <div className="w-16 h-16 rounded-full border-2 border-[#C86446]/40 bg-white shadow-sm flex items-center justify-center text-[#C86446] mb-2 group-hover:bg-[#C86446] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                    <Scale className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-mono uppercase tracking-[0.24em] font-extrabold text-[#1A1412]">
                    BALANCE
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5c5755] leading-relaxed font-light max-w-[240px]">
                    Healthy work-life balance in a supportive culture.
                  </p>
                </motion.div>

                {/* 4. IMPACT */}
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4 px-3 group">
                  <div className="w-16 h-16 rounded-full border-2 border-[#C86446]/40 bg-white shadow-sm flex items-center justify-center text-[#C86446] mb-2 group-hover:bg-[#C86446] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                    <Heart className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-mono uppercase tracking-[0.24em] font-extrabold text-[#1A1412]">
                    IMPACT
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5c5755] leading-relaxed font-light max-w-[240px]">
                    Design spaces that make a positive impact.
                  </p>
                </motion.div>
              </motion.div>

            </div>
          </section>

          {/* ====================================================================
              3. SPONTANEOUS PORTFOLIO CALLOUT (KEPT EXACTLY AS REQUESTED)
             ==================================================================== */}
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#FAF8F5] py-20 sm:py-28 max-w-[1500px] mx-auto px-6 sm:px-12 md:px-16"
          >
            <div className="bg-white rounded-2xl p-8 sm:p-14 border border-[#1A1412]/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 sm:gap-8 text-center md:text-left">
                <ArrowRight className="hidden sm:block w-12 h-12 text-[#C86446] stroke-1 shrink-0" />
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#1A1412] mb-2 font-['Cormorant_Garamond']">
                    Don't see the right role?
                  </h3>
                  <p className="text-sm sm:text-base text-[#5c5755] font-light max-w-xl">
                    We're always interested in hearing from talented individuals. Send us your portfolio.
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => handleApplyClick(e, 'Spontaneous Portfolio Submission')}
                className="px-8 py-4.5 bg-[#1A1412] text-white text-xs font-mono uppercase tracking-[0.24em] font-bold hover:bg-[#C86446] transition-all duration-300 rounded-lg shrink-0 cursor-pointer flex items-center gap-3 group"
              >
                <span>SEND YOUR PORTFOLIO</span>
                <ArrowRight className="w-4 h-4 text-[#C86446] group-hover:text-white transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.section>
        </main>

        {/* ====================================================================
            4. INTERACTIVE APPLICATION MODAL
           ==================================================================== */}
        <AnimatePresence>
          {activeModalRole && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                className="bg-white max-w-xl w-full p-8 sm:p-10 relative shadow-2xl rounded-2xl border border-[#1A1412]/15"
              >
                <button
                  onClick={() => setActiveModalRole(null)}
                  className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#1A1412] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto stroke-1" />
                    <h3 className="text-2xl font-extrabold text-[#1A1412]">
                      Application Received
                    </h3>
                    <p className="text-sm text-[#5c5755] max-w-sm mx-auto">
                      Thank you for applying for <span className="font-bold text-[#1A1412]">{activeModalRole}</span>. Our studio review board will evaluate your {['ARCHITECT', 'INTERN', 'INTERIOR DESIGNER', '3D VISUALIZER', 'Spontaneous Portfolio Submission'].includes(activeModalRole) ? 'portfolio' : 'resume'} and reach out shortly.
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C86446] block mb-2 font-bold">
                      STUDIO APPLICATION
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1412] mb-6">
                      {activeModalRole}
                    </h3>

                    <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[65vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                            FULL NAME *
                          </label>
                          <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name" className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                            EMAIL ADDRESS *
                          </label>
                          <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="name@domain.com" className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-xs" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                            PHONE NUMBER *
                          </label>
                          <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                            POSITION APPLYING FOR *
                          </label>
                          <select required value={activeModalRole} onChange={(e) => setActiveModalRole(e.target.value)} className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-xs cursor-pointer">
                            {vacanciesList.map((v) => (
                              <option key={v.title} value={v.title}>{v.title}</option>
                            ))}
                            <option value="Spontaneous Portfolio Submission">Spontaneous Submission</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                            EXPERIENCE (YRS) *
                          </label>
                          <input required type="number" min="0" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} placeholder="e.g. 3" className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                            LOCATION *
                          </label>
                          <input required type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="City" className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                            EDUCATION *
                          </label>
                          <input required type="text" value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })} placeholder="Degree" className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-xs" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                            LINKEDIN PROFILE (OPTIONAL)
                          </label>
                          <input type="url" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} placeholder="https://linkedin.com/in/your-profile" className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                            OR PORTFOLIO LINK {['ARCHITECT', 'INTERN', 'INTERIOR DESIGNER', '3D VISUALIZER'].includes(activeModalRole) ? '*' : ''}
                          </label>
                          <input
                            required={['ARCHITECT', 'INTERN', 'INTERIOR DESIGNER', '3D VISUALIZER'].includes(activeModalRole) && !formData.portfolioFile}
                            type="url"
                            value={formData.portfolioUrl}
                            onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                            placeholder="https://behance.net/your-portfolio"
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                            UPLOAD RESUME / CV {!['ARCHITECT', 'INTERN', 'INTERIOR DESIGNER', '3D VISUALIZER'].includes(activeModalRole) ? '*' : ''}
                          </label>
                          <input
                            required={!['ARCHITECT', 'INTERN', 'INTERIOR DESIGNER', '3D VISUALIZER'].includes(activeModalRole)}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setFormData({ ...formData, resumeFile: e.target.files[0] })}
                            className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-[10px] file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-[#1A1412] file:text-white hover:file:bg-[#C86446] cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                            UPLOAD PORTFOLIO {['ARCHITECT', 'INTERN', 'INTERIOR DESIGNER', '3D VISUALIZER'].includes(activeModalRole) ? '*' : '(OPTIONAL)'}
                          </label>
                          <input
                            required={['ARCHITECT', 'INTERN', 'INTERIOR DESIGNER', '3D VISUALIZER'].includes(activeModalRole) && !formData.portfolioUrl}
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFormData({ ...formData, portfolioFile: e.target.files[0] })}
                            className="w-full px-4 py-2 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-[10px] file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-[#1A1412] file:text-white hover:file:bg-[#C86446] cursor-pointer"
                          />
                        </div>
                      </div>


                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-[#736f6d] mb-1 font-bold">
                          ADDITIONAL INFORMATION
                        </label>
                        <textarea rows={2} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Any other notes..." className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#1A1412]/20 rounded-lg focus:border-[#C86446] outline-none text-xs resize-none" />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 bg-[#1A1412] text-white text-xs font-mono uppercase tracking-[0.24em] font-bold transition-colors rounded-lg flex items-center justify-center gap-3 mt-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#C86446] cursor-pointer'}`}
                      >
                        <span>
                          {isSubmitting ? 'SUBMITTING...' : (
                            ['ARCHITECT', 'INTERN', 'INTERIOR DESIGNER', '3D VISUALIZER', 'Spontaneous Portfolio Submission'].includes(activeModalRole)
                              ? 'SUBMIT PORTFOLIO & APPLICATION'
                              : 'SUBMIT APPLICATION'
                          )}
                        </span>
                        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                      </button>
                    </form>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====================================================================
            5. VACANCIES POPUP MODAL
           ==================================================================== */}
        <AnimatePresence>
          {showVacanciesModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                className="bg-white max-w-4xl w-full p-8 sm:p-12 relative shadow-2xl rounded-2xl border border-gray-200 max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setShowVacanciesModal(false)}
                  className="absolute top-6 right-6 p-2 text-gray-500 hover:text-[#1A1412] transition-colors cursor-pointer z-10"
                  aria-label="Close modal"
                >
                  <X className="w-8 h-8" />
                </button>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-[#1A1412] mb-10 tracking-tight">
                  Our vacancies
                </h2>

                <div className="flex flex-col">
                  {vacanciesList.map((vacancy, index) => (
                    <div key={vacancy.id} className="w-full border-b border-gray-200">
                      <button
                        onClick={() => setExpandedVacancy(expandedVacancy === index ? null : index)}
                        className="w-full py-6 sm:py-8 flex items-start sm:items-center justify-between group cursor-pointer text-left"
                      >
                        <div className="flex flex-col gap-2 sm:gap-4 max-w-[80%]">
                          <span className="text-[10px] sm:text-xs font-mono text-gray-500 tracking-widest">{vacancy.id}</span>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1A1412] font-sans tracking-wide uppercase group-hover:text-[#C86446] transition-colors">
                            {vacancy.title}
                          </h3>
                        </div>

                        {/* Plus/Minus Icon */}
                        <div className="mt-4 sm:mt-0 text-gray-500 group-hover:text-[#C86446] font-light text-3xl sm:text-4xl leading-none transition-colors">
                          {expandedVacancy === index ? '−' : '+'}
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedVacancy === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-8 pt-2 pr-4 sm:pr-16 max-w-xl">
                              <p className="text-gray-600 font-light text-sm leading-relaxed mb-6">
                                {vacancy.desc}
                              </p>
                              <button
                                onClick={(e) => handleApplyClick(e, vacancy.title)}
                                className="text-[#C86446] hover:text-[#1A1412] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] font-bold flex items-center gap-2 transition-colors"
                              >
                                <span>Apply for this position</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
