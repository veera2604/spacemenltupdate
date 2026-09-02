import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers, Box, Compass, Monitor, Sun, Zap, Grid, Wind, Database, Sparkles } from 'lucide-react';

const techItems = [
  { name: 'Autodesk Revit', category: 'BIM Parametric Modeling', icon: Box, color: '#0696D7' },
  { name: 'Rhino 3D', category: 'NURBS & Organic Form Studio', icon: Compass, color: '#F05023' },
  { name: 'Grasshopper', category: 'Algorithmic Computation', icon: Grid, color: '#85C11E' },
  { name: 'V-Ray 6', category: 'Physically Based Rendering', icon: Sun, color: '#FF7A00' },
  { name: 'Corona Render', category: 'Photorealistic Lighting', icon: Zap, color: '#E06B26' },
  { name: 'Autodesk 3ds Max', category: 'Complex Mesh Architecture', icon: Layers, color: '#00A88F' },
  { name: 'Lumion Pro', category: 'Live Cinematic Walkthroughs', icon: Monitor, color: '#00B4D8' },
  { name: 'Unreal Engine 5', category: 'Real-Time VR Immersion', icon: Cpu, color: '#FFFFFF' },
  { name: 'Ladybug & Honeybee', category: 'Environmental Simulation', icon: Wind, color: '#F4D03F' },
  { name: 'Navisworks Manage', category: 'LOD 500 Clash Detection', icon: Database, color: '#E67E22' },
];

export default function TechStack() {
  const marqueeItems = [...techItems, ...techItems, ...techItems];

  return (
    <section id="stack" className="py-32 bg-[#0a0a0c] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#c48b57]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c48b57] font-semibold mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>Computational Arsenal</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl font-extralight uppercase font-['Cormorant_Garamond'] text-white tracking-tight leading-none mb-6"
        >
          TECHNOLOGY <span className="text-gradient-gold font-light">& SOFTWARE STACK</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm md:text-base text-gray-400 font-light max-w-2xl mx-auto leading-relaxed"
        >
          We leverage industry-leading software algorithms, environmental simulators, and real-time rendering engines to eliminate human error and achieve uncompromising aesthetic perfection.
        </motion.p>
      </div>

      {/* Floating Interactive Grid for Desktop */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {techItems.map((tech, idx) => {
          const IconComponent = tech.icon;
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#c48b57]/60 transition-all duration-500 shadow-xl flex flex-col items-center text-center justify-center gap-4 cursor-pointer overflow-hidden"
            >
              {/* Hover Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#c48b57]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Icon */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + (idx % 3), repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:border-[#c48b57] transition-all duration-500 shadow-inner"
              >
                <IconComponent className="w-7 h-7 transition-transform duration-500 group-hover:scale-110 text-[#c48b57]" />
              </motion.div>

              <div className="relative z-10">
                <h3 className="text-base font-medium text-white tracking-wide uppercase font-['Cormorant_Garamond'] group-hover:text-[#c48b57] transition-colors">
                  {tech.name}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 block mt-1">
                  {tech.category}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

