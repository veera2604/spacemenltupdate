import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';

export default function ProjectDetail() {
  const { id } = useParams();

  // Find current, prev, and next projects
  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const project = currentIndex !== -1 ? projectsData[currentIndex] : projectsData[0];
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!project) return null;

  // Only collect images from the gallery, explicitly ignoring the homepage specific covers even if they are in the gallery array
  const uniqueImages = [...new Set([
    ...(project.gallery || []),
  ].filter(img => img && !img.includes('Project_Homepage_')))];

  // If the gallery is completely empty, fallback to the homepage image so the page isn't broken
  if (uniqueImages.length === 0 && project.heroImage) {
    uniqueImages.push(project.heroImage);
  }

  const heroImage = uniqueImages[0];
  const primaryExterior = uniqueImages.length > 1 ? uniqueImages[1] : null;
  const secondaryImage = uniqueImages.length > 2 ? uniqueImages[2] : null;
  const footerImage = uniqueImages.length > 3 ? uniqueImages[3] : null;

  const contractor = project.specs?.contractors || project.specs?.structuralConsultants || 'N/A';

  return (
    <SmoothScroll>
      <div className="bg-[#fcfaf8] min-h-screen text-[#1a1a1a] font-sans selection:bg-[#c48b57] selection:text-white">
        <Navigation />

        <main className="pt-24 pb-32">
          {/* Back Button */}
          <div className="max-w-[1850px] 2xl:max-w-[1950px] mx-auto px-8 mb-8">
            <Link
              to="/works"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:text-[#c48b57] transition-colors group font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Projects</span>
            </Link>
          </div>

          <article className="max-w-[1850px] 2xl:max-w-[1950px] mx-auto px-8 flex flex-col items-center">

            {/* 1. Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full mb-16"
            >
              <img
                src={heroImage}
                alt={`${project.title} Hero`}
                className="w-full h-auto object-cover shadow-sm"
              />
            </motion.div>

            {/* 2. Project Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center w-full mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111]">
                {project.title}
              </h1>
            </motion.div>

            {/* 3. Quick Specs Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full border-t border-b border-gray-200 py-6 mb-20"
            >
              <div className="flex flex-wrap justify-center md:justify-between items-start gap-8 md:gap-4 text-center md:text-left">
                <div className="flex flex-col gap-1.5 w-[40%] md:w-auto">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Project Type</span>
                  <span className="text-xs font-medium text-gray-900 uppercase">{project.specs?.projectType || project.category}</span>
                </div>
                <div className="flex flex-col gap-1.5 w-[40%] md:w-auto">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Geographical Location</span>
                  <span className="text-xs font-medium text-gray-900 uppercase">{project.specs?.location || 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1.5 w-[40%] md:w-auto">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Built Up Area</span>
                  <span className="text-xs font-medium text-gray-900 uppercase">{project.specs?.builtUpArea || 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1.5 w-[40%] md:w-auto">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Project Status</span>
                  <span className="text-xs font-medium text-gray-900 uppercase">{project.specs?.projectStatus || 'Ongoing'}</span>
                </div>
                <div className="flex flex-col gap-1.5 w-[40%] md:w-auto">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Contractor</span>
                  <span className="text-xs font-medium text-gray-900 uppercase">{contractor}</span>
                </div>
              </div>
            </motion.div>

            {/* 4. Primary Exterior Image */}
            {primaryExterior && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="w-full mb-16"
              >
                <img
                  src={primaryExterior}
                  alt={`${project.title} Exterior`}
                  className="w-full h-auto object-cover shadow-sm"
                />
              </motion.div>
            )}

            {/* 5. Description Block 1 */}
            {project.overview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full text-left mb-16"
              >
                <p className="text-sm md:text-base text-gray-700 leading-[1.8] font-medium tracking-wide">
                  {project.overview}
                </p>
              </motion.div>
            )}

            {/* 6. Secondary Image */}
            {secondaryImage && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="w-full mb-16"
              >
                <img
                  src={secondaryImage}
                  alt={`${project.title} Interior`}
                  className="w-full h-auto object-cover shadow-sm"
                />
              </motion.div>
            )}

            {/* 7. Description Block 2 */}
            {project.designPhilosophy && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full text-left mb-16"
              >
                <p className="text-sm md:text-base text-gray-700 leading-[1.8] font-medium tracking-wide whitespace-pre-line">
                  {project.designPhilosophy}
                </p>
              </motion.div>
            )}

            {/* 8. Footer Image */}
            {footerImage && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="w-full mb-20"
              >
                <img
                  src={footerImage}
                  alt={`${project.title} Detail`}
                  className="w-full h-auto object-cover shadow-sm"
                />
              </motion.div>
            )}

            {/* Divider */}
            <div className="w-24 h-px bg-[#c48b57]/40 mb-12"></div>

            <p className="text-xs text-gray-400 tracking-widest uppercase font-semibold text-center mb-16">
              End of Project Presentation
            </p>

            {/* EXPLORE FURTHER COMPENDIUM */}
            <div className="w-full pt-20 pb-12 mt-10 flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-3">Explore Further</span>
              <h2 className="text-3xl md:text-4xl font-light uppercase text-gray-800 mb-16 tracking-wide font-['Cormorant_Garamond']">
                Cycle Architectural Compendium
              </h2>

              <div className="w-full flex flex-col md:flex-row gap-6">
                {/* PREVIOUS CARD */}
                <Link to={`/project/${prevProject.id}`} className="relative group overflow-hidden rounded-3xl w-full md:w-1/2 aspect-[16/9] md:aspect-[2/1] shadow-sm border border-gray-100">
                  <img src={prevProject.heroImage} alt={prevProject.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent opacity-95 transition-opacity group-hover:opacity-100"></div>

                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                    <div className="flex items-center justify-between w-full">
                      <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transform transition-transform group-hover:-translate-x-2 border border-gray-100">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#c48b57] font-bold block mb-1.5">&larr; Previous Project</span>
                        <span className="text-xl md:text-2xl font-['Cormorant_Garamond'] text-gray-900 uppercase">{prevProject.title}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* NEXT CARD */}
                <Link to={`/project/${nextProject.id}`} className="relative group overflow-hidden rounded-3xl w-full md:w-1/2 aspect-[16/9] md:aspect-[2/1] shadow-sm border border-gray-100">
                  <img src={nextProject.heroImage} alt={nextProject.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent opacity-95 transition-opacity group-hover:opacity-100"></div>

                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                    <div className="flex items-center justify-between w-full">
                      <div className="text-left">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#c48b57] font-bold block mb-1.5">Next Project &rarr;</span>
                        <span className="text-xl md:text-2xl font-['Cormorant_Garamond'] text-gray-900 uppercase">{nextProject.title}</span>
                      </div>
                      <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transform transition-transform group-hover:translate-x-2 border border-gray-100">
                        <ArrowRight className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

          </article>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
