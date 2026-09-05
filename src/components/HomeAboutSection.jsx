import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function HomeAboutSection() {
  const navigate = useNavigate();

  const handleExploreAbout = () => {
    navigate('/about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="about-story" className="min-h-[calc(100vh-84px)] py-6 lg:py-8 flex flex-col justify-center bg-[#f9f8f3] border-y border-gray-200/60 text-[#1A1412]">
      <div className="max-w-[1850px] 2xl:max-w-[1950px] w-full mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        {/* TOP ROW: 3-Column Editorial Hero Layout Matching Exact Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">

          {/* COLUMN 1: Story Badge, Big Serif Title, Summary Paragraph */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 flex flex-col items-start"
          >
            {/* Terracotta / Gold Pill Badge */}
            <span className="inline-block bg-[#c48b57] text-white px-3 py-0.5 text-xs font-mono uppercase tracking-widest rounded-sm mb-4 font-semibold shadow-sm">
              OUR STORY
            </span>

            {/* Editorial 3-Line Title */}
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light leading-[1.12] tracking-tight text-[#1A1412] mb-4">
              Built on friendship.
              <br />
              <span className="italic text-[#c48b57] font-normal">Driven by curiosity.</span>
              <br />
              Guided by purpose.
            </h2>

            {/* Sub-Paragraph */}
            <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed font-normal max-w-md">
              SpaceMELD Architects was born from a simple idea — that meaningful spaces emerge when people, ideas, and purpose come together.
            </p>
          </motion.div>

          {/* COLUMN 2: Center Courtyard / Architectural Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-4 flex justify-center"
          >
            <div className="w-full max-w-sm xl:max-w-md max-h-[380px] xl:max-h-[420px] aspect-[4/5] overflow-hidden rounded-sm shadow-[0_20px_45px_rgba(0,0,0,0.12)] border border-gray-200/80 bg-gray-900 group">
              <img
                src="/images/terracotta_courtyard_bench.png"
                alt="SpaceMELD Architectural Courtyard"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </motion.div>

          {/* COLUMN 3: Right Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-4 flex flex-col items-start"
          >
            <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl lg:text-3xl xl:text-4xl text-[#c48b57] font-normal mb-2">
              It began around a table.
            </h3>
            <span className="w-12 h-0.5 bg-[#c48b57] mb-4 block" />

            <div className="text-gray-700 text-xs lg:text-sm leading-relaxed space-y-2.5 font-normal max-w-md">
              <p className="font-medium text-gray-900">
                Three friends. Countless conversations.
              </p>
              <p>
                What started as an ordinary evening slowly became the blueprint of something extraordinary.
              </p>
              <p>
                Between laughter, ideas, and dreams that refused to stay dreams, we realized we weren’t just talking about architecture—we were imagining a different way of creating it.
              </p>
              <p>
                That’s how SpaceMELD was born. From connection. From curiosity. From a shared belief in design that inspires and endures.
              </p>

              {/* READ OUR JOURNEY ANIMATED LINK */}
              <div className="pt-2">
                <button
                  onClick={handleExploreAbout}
                  className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] font-bold text-[#c48b57] hover:text-[#1A1412] transition-colors duration-300"
                >
                  <span className="relative pb-1 border-b-2 border-[#c48b57]/60 group-hover:border-[#1A1412] transition-colors">
                    READ OUR JOURNEY
                  </span>
                  <span className="text-base font-light group-hover:translate-x-2 transition-transform duration-300 ease-out">
                    →
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
