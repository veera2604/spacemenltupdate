import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // We rely on the video onEnded event, but as a fallback, we can add a max timeout
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 8000); // 8 second max fallback in case video fails to load or play

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = '';
    };
  }, []);

  const handleComplete = () => {
    if (!isLoaded) {
      setIsLoaded(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800); // Wait for fade-out transition
    }
  };

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-white flex items-center justify-center cursor-wait"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleComplete}
            className="w-full h-full object-contain object-center invert scale-125 md:scale-[1.4]"
          >
            <source src="/landing_page.mp4" type="video/mp4" />
          </video>
          
          {/* Optional: Skip button for users who don't want to wait */}
          <button
            onClick={handleComplete}
            className="absolute bottom-8 right-8 text-gray-500 hover:text-black text-xs font-mono tracking-widest transition-colors z-10"
          >
            SKIP →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
