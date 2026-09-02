import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Users, Calendar, Award, CheckCircle, Sparkles } from 'lucide-react';

const statsData = [
  { id: 'proj', label: 'Projects Completed', value: 50, suffix: '+', icon: Building2 },
  { id: 'clients', label: 'Happy Clients', value: 45, suffix: '+', icon: Users },

  { id: 'awards', label: 'Design Awards Won', value: 15, suffix: '+', icon: Award },
  { id: 'rate', label: 'Client Success Rate', value: 99, suffix: '%', icon: CheckCircle },
];

function AnimatedCounter({ value, suffix, duration = 2.2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const endValue = parseInt(value, 10);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Cubic ease-out for luxurious deceleration
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOutProgress * endValue);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-bold font-['Cormorant_Garamond'] tracking-tight">
      {count}
      <span className="text-[#c48b57] font-extrabold ml-0.5">{suffix}</span>
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="py-24 bg-[#f9f9f5] relative overflow-hidden border-y border-gray-200/60">
      {/* Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[250px] bg-[#c48b57]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c48b57] font-bold mb-3"
          >
            <Sparkles className="w-4 h-4" />
            <span>Proven Excellence</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-bold uppercase font-['Cormorant_Garamond'] text-[#1A1412] tracking-tight"
          >
            BY THE <span className="text-[#c48b57] font-bold">NUMBERS</span>
          </motion.h2>
        </div>

        {/* High-Contrast Luxury Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {statsData.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04, y: -6 }}
                className="p-8 rounded-3xl bg-white border border-gray-200/80 hover:border-[#c48b57] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(196,139,87,0.18)] flex flex-col items-center justify-center text-center group cursor-pointer relative overflow-hidden"
              >
                {/* Icon Badge */}
                <div className="w-14 h-14 rounded-2xl bg-[#f9f9f5] border border-gray-200 flex items-center justify-center text-[#c48b57] mb-6 group-hover:bg-[#c48b57] group-hover:text-white transition-all duration-500 shadow-sm">
                  <IconComponent className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Animated Number Counter */}
                <div className="text-4xl sm:text-5xl lg:text-6xl text-[#1A1412] font-bold tracking-tight mb-2 group-hover:text-[#1A1412] transition-colors">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <span className="text-xs uppercase tracking-widest text-gray-600 font-bold group-hover:text-[#1A1412] transition-colors">
                  {stat.label}
                </span>

                {/* Bottom Gold Accent Bar */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-[#c48b57] to-transparent group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
