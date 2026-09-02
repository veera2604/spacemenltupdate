import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    quote: "SpaceMELD transformed our vision of a sustainable luxury estate into an absolute architectural triumph. Their integration of organic planters directly into reinforced concrete without thermal bridging is nothing short of engineering genius.",
    author: "Arun Kumar",
    title: "Owner, Green Frame Villa",
    company: "Mangalam Holdings",
    rating: 5,
    avatar: "AK",
  },
  {
    quote: "The Level of Development (LOD 500) BIM modeling executed for Mangalam Towers saved us over four months of construction time and millions in clash mitigation. They operate at the highest echelon of architectural precision.",
    author: "Vikramaditya Rao",
    title: "Managing Director",
    company: "Apex Commercial Developments",
    rating: 5,
    avatar: "VR",
  },
  {
    quote: "Working with SpaceMELD on the Suriya Residence was an enlightening experience. Their obsession with acoustic tranquility and indirect lighting turned a bustling city apartment into an oasis of zen calm.",
    author: "Suriya Narayanan",
    title: "Tech Entrepreneur",
    company: "Narayanan Ventures",
    rating: 5,
    avatar: "SN",
  },
  {
    quote: "Their mastery of indigenous stone masonry and rainwater harvesting on the Ravi Heritage Estate demonstrates that true luxury honors the natural earth. A masterpiece that will stand for centuries.",
    author: "Ravi Shankar",
    title: "Principal Trustee",
    company: "Heritage Conservation Trust",
    rating: 5,
    avatar: "RS",
  },
];

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const displayTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-12 bg-[#fafafa] relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#c48b57]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c48b57] font-semibold mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>Client Praise</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl font-extralight uppercase font-['Cormorant_Garamond'] text-gray-900 tracking-tight leading-none"
        >
          WORDS OF <span className="text-gradient-gold font-light">APPRECIATION</span>
        </motion.h2>
      </div>

      {/* Infinite Testimonial Cards Marquee */}
      <div
        className="w-full overflow-hidden py-10 relative cursor-grab active:cursor-grabbing mb-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-8 w-max transition-transform duration-700"
          style={{
            animation: `testimonialMarquee 40s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {displayTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="w-[360px] md:w-[480px] flex-shrink-0 p-8 md:p-10 rounded-3xl glass-panel border border-gray-200 hover:border-[#c48b57]/50 transition-all duration-500 shadow-xl flex flex-col justify-between relative group bg-white"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-gray-100 group-hover:text-[#c48b57]/20 transition-colors pointer-events-none" />

              <div>
                {/* Five Star Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#c48b57] fill-[#c48b57]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 leading-relaxed font-light text-sm md:text-base italic mb-8 relative z-10">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c48b57] to-[#a66e3c] flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-900 tracking-wide uppercase font-['Cormorant_Garamond']">
                    {t.author}
                  </h4>
                  <span className="text-xs text-[#c48b57] block">{t.title}</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500">{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes testimonialMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
