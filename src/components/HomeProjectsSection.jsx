import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';

export default function HomeProjectsSection() {
  const navigate = useNavigate();

  // Pick exactly the 5 projects the user uploaded
  const featuredIds = ['greenframe', 'suriya', 'rajesh', 'rakesh', 'venky'];
  const featuredProjects = featuredIds
    .map((id) => projectsData.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="bg-white py-20 md:py-32 font-sans relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1412] tracking-tight uppercase font-['Cormorant_Garamond']">
              Featured Works
            </h2>
            <div className="h-[1px] w-24 bg-[#c48b57] mt-6"></div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => navigate('/works')}
            className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1412] hover:text-[#c48b57] transition-colors flex items-center gap-2 group"
          >
            VIEW ALL PROJECTS
            <span className="w-8 h-[1px] bg-[#1A1412] group-hover:bg-[#c48b57] transition-colors"></span>
          </motion.button>
        </div>

        {/* 5 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => navigate(`/project/${project.id}`)}
              className={`group cursor-pointer flex flex-col ${
                index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-2 aspect-[16/9]' : 'col-span-1 aspect-[4/5]'
              }`}
            >
              <div className="w-full h-full overflow-hidden bg-[#f4f4f4] relative">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="mt-5">
                <h3 className="text-xl md:text-2xl font-light tracking-wide text-[#1A1412] group-hover:text-[#c48b57] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-gray-500 mt-2">
                  {project.category} — {project.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
