import React, { useEffect } from 'react';
import SmoothScroll from '../components/SmoothScroll';
import Navigation from '../components/Navigation';
import ProjectShowcase from '../components/ProjectShowcase';
import Footer from '../components/Footer';

export default function Works() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-[#c48b57] selection:text-white">
        <Navigation />
        <main className="pt-3">
          <ProjectShowcase />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
