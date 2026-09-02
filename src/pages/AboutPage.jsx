import React, { useEffect } from 'react';
import SmoothScroll from '../components/SmoothScroll';
import Navigation from '../components/Navigation';
import About from '../components/About';
import Footer from '../components/Footer';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('snap-y', 'snap-proximity');
    return () => {
      document.documentElement.classList.remove('snap-y', 'snap-proximity');
    };
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen selection:bg-[#c48b57] selection:text-white">
        <Navigation hideSpacer={true} />
        <main className="about-container bg-[#F8F5F0] text-[#111111] font-sans">
          <About />
          <div className="about-section h-auto flex flex-col justify-end">
            <Footer />
          </div>
        </main>
      </div>
    </SmoothScroll>
  );
}
