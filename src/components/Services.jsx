import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Compass, Layers, Cpu, ShieldCheck, ChevronRight, Plus, Minus, Sparkles } from 'lucide-react';

const servicesData = [
  {
    id: 'arch',
    title: 'Architectural Design',
    subtitle: 'From Conceptualization to Structural Mastery',
    icon: Compass,
    description: 'Bespoke residential and commercial architectural design focusing on biophilic integration, solar orientation, and timeless spatial harmony.',
    features: ['Feasibility & Master Planning', 'BIM Parametric 3D Modeling', 'Climate-Responsive Orientation', 'Municipal Compliance & Approvals'],
    deliverables: 'Complete Architectural Drawings, 3D Renderings, VR Walkthroughs',
  },
  {
    id: 'interior',
    title: 'Luxury Interior Styling',
    subtitle: 'Elevating the Human Experience Indoors',
    icon: Layers,
    description: 'Curated interior spaces combining custom joinery, acoustic engineering, artisanal lighting, and tactile material palettes.',
    features: ['Custom Furniture & Joinery Design', 'Acoustic & Lighting Calculations', 'Art & Material Curation', 'Turnkey Execution Management'],
    deliverables: 'Material Sample Boards, Working Detail Drawings, Lighting Schedules',
  },
  {
    id: 'bim',
    title: 'BIM & Structural Engineering',
    subtitle: 'Precision Automation & Clash Detection',
    icon: Cpu,
    description: 'Advanced Level of Development (LOD 500) Building Information Modeling ensuring flawless construction without on-site structural clashes.',
    features: ['MEP & Structural Clash Detection', '4D Construction Scheduling', 'Cost Estimation & Bill of Quantities', 'Energy Efficiency Simulation'],
    deliverables: 'Live Interactive Revit Models, Automated BoQ Reports',
  },
  {
    id: 'landscape',
    title: 'Sustainable Landscaping',
    subtitle: 'Restoring Earthly Biodiversity',
    icon: ShieldCheck,
    description: 'Regenerative landscape architecture integrating native flora, natural water retention ponds, and outdoor stone pavilions.',
    features: ['Indigenous Botanical Selection', 'Rainwater Harvesting Systems', 'Passive Microclimate Cooling', 'Artisanal Hardscaping & Water Features'],
    deliverables: 'Landscape Masterplan, Irrigation Schemes, Maintenance Guides',
  },
];

function TiltCard({ service, index }) {
  const [expanded, setExpanded] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl p-[1px] bg-gradient-to-b from-gray-200 via-gray-100 to-transparent hover:from-[#c48b57] hover:to-[#c48b57]/20 transition-all duration-500 shadow-xl group cursor-pointer"
    >
      <div className="rounded-[23px] bg-white/95 backdrop-blur-xl p-8 md:p-10 h-full flex flex-col justify-between overflow-hidden relative border border-gray-200">
        {/* Ambient Hover Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#c48b57]/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div style={{ transform: 'translateZ(30px)' }} className="relative z-10">
          {/* Top Row: Icon & Expand Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-[#c48b57] group-hover:bg-[#c48b57] group-hover:text-white transition-all duration-500 shadow-inner">
              <IconComponent className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" />
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-[#c48b57] transition-all"
              aria-label="Toggle Details"
            >
              {expanded ? <Minus className="w-5 h-5 text-[#c48b57]" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>

          {/* Title & Subtitle */}
          <span className="text-xs uppercase tracking-[0.2em] text-[#c48b57] font-semibold block mb-2">
            Service 0{index + 1}
          </span>
          <h3 className="text-2xl md:text-3xl font-light uppercase font-['Cormorant_Garamond'] text-gray-900 tracking-wide mb-3 group-hover:text-[#c48b57] transition-all">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed font-light mb-6">
            {service.description}
          </p>

          {/* Expandable Features Area */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden pt-4 border-t border-gray-100 flex flex-col gap-4"
              >
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-800 font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#c48b57]" /> Key Capabilities
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c48b57]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-[10px] uppercase tracking-wider text-[#c48b57] font-bold block mb-1">
                    Deliverables
                  </span>
                  <p className="text-xs text-gray-700">{service.deliverables}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Link */}
        <div
          style={{ transform: 'translateZ(20px)' }}
          onClick={() => setExpanded(!expanded)}
          className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition-colors cursor-pointer"
        >
          <span>{expanded ? 'Hide Methodology' : 'Explore Capabilities'}</span>
          <ChevronRight className="w-4 h-4 text-[#c48b57] transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c48b57] font-semibold mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Our Expertise</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-extralight uppercase font-['Cormorant_Garamond'] text-gray-900 tracking-tight leading-none mb-6"
          >
            BESPOKE <span className="text-gradient-gold font-light">SERVICES</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-gray-600 font-light leading-relaxed"
          >
            We merge cutting-edge computational BIM automation with timeless architectural aesthetics to deliver environments that inspire, elevate, and endure for generations.
          </motion.p>
        </div>

        {/* Services Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 perspective-[1000px]">
          {servicesData.map((service, idx) => (
            <TiltCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
