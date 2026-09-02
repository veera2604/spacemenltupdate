import React, { useEffect } from 'react';
import SmoothScroll from '../components/SmoothScroll';
import Navigation from '../components/Navigation';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-[#c48b57] selection:text-white">
        <Navigation />
        <main className="pt-3">
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
