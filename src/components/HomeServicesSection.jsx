import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const homeServicesData = [
  {
    id: 'architecture',
    number: '01',
    title: 'ARCHITECTURE',
    tagline: 'Innovation & Creativity',
    image: '/images/service-card-architecture.png',
    description: 'Our Designs are innovative, fresh and inspirational in both form and function & we are equipped with highly qualified Structural team with latest design technologies.',
  },
  {
    id: 'interior-design',
    number: '02',
    title: 'INTERIORS',
    tagline: 'Modern & Unique',
    image: '/images/service-card-interiors.png',
    description: 'Each space in every project is designed to perfection, incorporating the most recent advances in architecture.',
  },
  {
    id: 'construction',
    number: '03',
    title: 'CONSTRUCTION',
    tagline: 'Expertise & Experience',
    image: '/images/service-card-construction.png',
    description: 'Conceptualizing spaces and translating them into functional and aesthetic buildings & Our holistic approach combines cutting edge construction techniques to ensure every project reflects your unique personality and requirements.',
  },
  {
    id: 'design-build',
    number: '04',
    title: 'DESIGN & BUILD',
    tagline: 'From Vision to Reality',
    image: '/images/service-card-design-build.png',
    description: 'We bring Architecture, Interiors, and Construction together under one integrated approach. From concept to completion, every detail is thoughtfully designed and precisely executed to create spaces that are functional, enduring, and uniquely yours.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
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

export default function HomeServicesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 sm:py-32 bg-[#f9f9f5] border-t border-gray-200/60 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c48b57]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1A1412]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header Matching Screenshot with Animated Reveal */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-[2px] bg-[#c48b57] mx-auto mb-5"
          />
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-xs font-mono uppercase tracking-[0.3em] text-[#c48b57] mb-4 font-bold flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHAT WE DO</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-normal font-['Cormorant_Garamond'] text-[#1A1412] tracking-tight leading-tight max-w-3xl mx-auto"
          >
            Architecture. Interior.
            <br />
            Construction.
          </motion.h2>
        </div>

        {/* 4-Column Services Grid with Smooth Architectural Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {homeServicesData.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              onClick={() => {
                navigate('/services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex flex-col cursor-pointer bg-white p-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] border border-gray-200/60 hover:border-[#c48b57]/40 transition-all duration-500 relative overflow-hidden"
            >
              {/* Animated Top Sheen Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#c48b57] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Image Box with Grayscale to Color Hover & Overlay Number */}
              <div className="w-full aspect-[16/10] overflow-hidden relative bg-gray-900 rounded-lg mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale contrast-[1.1] brightness-[0.92] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700 ease-out"
                />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Number Overlay at Bottom Left */}
                <div className="absolute bottom-3 left-4 text-white text-xl sm:text-2xl font-bold font-mono tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] flex items-center gap-1.5">
                  <span>{service.number}</span>
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-xs sm:text-sm font-mono uppercase tracking-[0.24em] font-extrabold text-[#1A1412] mb-1 group-hover:text-[#C86446] transition-colors px-1">
                {service.title}
              </h3>

              {/* Service Tagline / Subtitle */}
              {service.tagline && (
                <p className="text-[11px] font-sans uppercase tracking-wider text-[#c48b57] font-semibold mb-2.5 px-1">
                  {service.tagline}
                </p>
              )}

              {/* Service Description */}
              <p className="text-xs sm:text-sm text-[#5c5755] leading-relaxed font-light mb-4 flex-grow px-1">
                {service.description}
              </p>


            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
