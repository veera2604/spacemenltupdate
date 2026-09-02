import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, Sparkles, Eye, Share2, Download } from 'lucide-react';

const galleryItems = [
  { id: 'g1', title: 'Green Frame Cantilever Planter', category: 'Biophilic Structural Detail', image: '/APR/A_F.jpg (1).jpeg', aspect: 'col-span-1 row-span-2' },
  { id: 'g2', title: 'Mangalam Aerodynamic Facade', category: 'Commercial Glass Curtain Wall', image: '/Mangalam Towers/A.jpg.jpeg', aspect: 'col-span-1 row-span-1' },
  { id: 'g3', title: 'Venky Double-Height Courtyard', category: 'Residential Interior Skylight', image: '/Venky/R_01.png', aspect: 'col-span-1 row-span-2' },
  { id: 'g4', title: 'Ravi Heritage Stone Pavilion', category: 'Landscape Stone Masonry', image: '/Ravi/A3.jpg.jpeg', aspect: 'col-span-1 row-span-1' },
  { id: 'g5', title: 'Suriya Acoustic Sanctuary', category: 'Zen Minimalist Living', image: '/Suriya/Render_03.png', aspect: 'col-span-1 row-span-1' },
  { id: 'g6', title: 'Suganthi Rammed Earth Wall', category: 'Zero-Carbon Eco Retreat', image: '/Suganthi/A_2 - Photo.jpg (1).jpeg', aspect: 'col-span-1 row-span-2' },
  { id: 'g7', title: 'Mangalam Sunset Atrium', category: 'Solar Responsive Louvers', image: '/Mangalam Towers/B.jpg.jpeg', aspect: 'col-span-1 row-span-1' },
  { id: 'g8', title: 'Ravi Water Retention Pond', category: 'Ecological Water Feature', image: '/Ravi/A5.jpg.jpeg', aspect: 'col-span-1 row-span-1' },
  { id: 'g9', title: 'Parametric Design Headquarters', category: 'Studio Architectural Render', image: '/Mangalam Towers/C.jpg.jpeg', aspect: 'col-span-1 row-span-1' },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-32 bg-[#fafafa] relative overflow-hidden">
      {/* Background Ambient Light */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#c48b57]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c48b57] font-semibold mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>Visual Archive</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl font-extralight uppercase font-['Cormorant_Garamond'] text-gray-900 tracking-tight leading-none mb-6"
        >
          DYNAMIC <span className="text-gradient-gold font-light">ZIG-ZAG ARCHIVE</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm md:text-base text-gray-600 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Explore our extensive visual compendium of completed residential estates, structural BIM simulations, and tactile interior details.
        </motion.p>
      </div>

      {/* Dynamic Zig-Zag Staggered Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {galleryItems.map((item, idx) => {
            // Dynamic Zig-Zag Configuration: alternating large and small cards across rows!
            const zigZagConfigs = [
              { colSpan: 'lg:col-span-7', height: 'h-[420px] sm:h-[500px] md:h-[580px]', stagger: 'lg:mt-0' },
              { colSpan: 'lg:col-span-5', height: 'h-[340px] sm:h-[420px] md:h-[480px]', stagger: 'lg:mt-20' },
              { colSpan: 'lg:col-span-5', height: 'h-[360px] sm:h-[440px] md:h-[500px]', stagger: 'lg:mt-10' },
              { colSpan: 'lg:col-span-7', height: 'h-[440px] sm:h-[540px] md:h-[620px]', stagger: 'lg:-mt-6' },
              { colSpan: 'lg:col-span-8', height: 'h-[400px] sm:h-[480px] md:h-[560px]', stagger: 'lg:mt-4' },
              { colSpan: 'lg:col-span-4', height: 'h-[320px] sm:h-[400px] md:h-[460px]', stagger: 'lg:mt-28' },
            ];
            const config = zigZagConfigs[idx % zigZagConfigs.length];

            return (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`group relative rounded-3xl overflow-hidden glass-panel border border-gray-200 cursor-pointer shadow-xl hover:border-[#c48b57]/80 hover:shadow-[0_25px_50px_rgba(196,139,87,0.25)] transition-all duration-500 bg-gray-900 ${config.colSpan} ${config.height} ${config.stagger}`}
              >
                {/* Image: Black & White by default, turns to full color on hover! */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out filter brightness-95 group-hover:brightness-100"
                  loading="lazy"
                />

                {/* Subtle bottom gradient to keep text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent pointer-events-none" />

                {/* Clean Bottom Bar */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between z-10 pointer-events-none">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c48b57] font-bold block mb-1 drop-shadow-md">
                      0{idx + 1} // {item.category}
                    </span>
                    <h4 className="text-2xl md:text-3xl font-light uppercase text-white font-['Cormorant_Garamond'] tracking-wide drop-shadow-lg">
                      {item.title}
                    </h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 shadow-lg group-hover:bg-[#c48b57] group-hover:border-transparent transition-all duration-300">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-[#c48b57] hover:border-transparent transition-all flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              layoutId={`box-${selectedImage.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[85vh] bg-[#121216] rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_100px_rgba(0,0,0,0.9)] flex flex-col md:flex-row"
            >
              {/* Image Side */}
              <div className="md:w-3/4 h-[50vh] md:h-[80vh] relative bg-black flex items-center justify-center">
                <motion.img
                  layoutId={`img-${selectedImage.id}`}
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details Side */}
              <div className="md:w-1/4 p-8 flex flex-col justify-between bg-[#121216]/90 border-t md:border-t-0 md:border-l border-white/10">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#c48b57] font-bold block mb-2">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light uppercase font-['Cormorant_Garamond'] text-white leading-tight mb-6">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light mb-8">
                    High-resolution architectural photograph capturing structural finishes, natural lighting geometry, and bespoke material palettes.
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                  <a
                    href={selectedImage.image}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c48b57] to-[#a66e3c] text-white text-center text-xs uppercase tracking-widest font-bold shadow-lg shadow-[#c48b57]/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Full Resolution</span>
                    <Eye className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => alert('Image link copied to clipboard!')}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/15 text-gray-300 hover:text-white text-center text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Share Artifact</span>
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
