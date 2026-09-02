import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Globe, Briefcase, CheckCircle, Sparkles, ArrowUpRight, X, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const studioLocations = [
  {
    city: 'Bengaluru Studio',
    address: '19th Main Road, HSR Layout, Bengaluru-560 102.',
  },
  {
    city: 'Vellore Studio',
    address: 'Jamalpuram Road, Vellore – 632 002.',
  },
];

const DEFAULT_FORM = {
  name: '',
  email: '',
  phone: '',
  projectType: 'Residential',
  projectLocation: '',
  builtUpArea: '< 1,500 sq.ft',
  budget: '₹25–50 L',
  message: '',
};

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isSubmitted) setIsSubmitted(false);
        if (submissionError) setSubmissionError(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSubmitted, submissionError]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      if (isSubmitting) return false;

      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
        setSubmissionError('Please complete all required fields (*).');
        return false;
      }

      setSubmissionError(null);
      setIsSubmitted(true);

      confetti({
        particleCount: 160,
        spread: 95,
        origin: { y: 0.55 },
        colors: ['#c48b57', '#d99c63', '#ffffff', '#e6b380', '#1A1412'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.65 },
          colors: ['#c48b57', '#d99c63', '#ffffff'],
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.65 },
          colors: ['#c48b57', '#d99c63', '#ffffff'],
        });
      }, 350);

      // Send to backend API
      fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          projectLocation: formData.projectLocation,
          builtUpArea: formData.builtUpArea,
          budget: formData.budget,
          message: formData.message,
        }),
      }).catch(() => { });

    } catch (err) {
      console.error('Contact form submit error:', err);
      setSubmissionError('Something went wrong sending your inquiry. Please try again.');
    }

    return false;
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#1A1412]">
        <img
          src="/contact-bg.png"
          alt="SpaceMELD Architectural Studio Background"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Header matching document */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c48b57] font-bold mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>INITIATE DIALOGUE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl font-bold uppercase font-['Cormorant_Garamond'] text-white tracking-tight leading-none mb-6"
        >
          LET’S SHAPE YOUR <span className="text-gradient-gold font-bold">VISION</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-3"
        >
          <p className="text-base sm:text-lg text-white font-medium">
            Have a vision in mind? Let’s bring it to life.
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-light leading-relaxed">
            Whether you are planning a new home, transforming an existing space, developing a commercial project, or looking for an integrated design and build solution, we are here to collaborate. From the first idea to the final detail, we work closely with you to create spaces.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* Left Column: Form with exact fields from the table */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 p-8 md:p-12 rounded-sm bg-[#f9f9f5]/95 backdrop-blur-xl border border-[#222222]/15 shadow-[0_20px_60px_rgba(0,0,0,0.25)] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#222222]/15">
            <span className="text-xs uppercase tracking-[0.24em] font-bold text-[#1A1412]">
              SEND A MESSAGE
            </span>
            <span className="text-[11px] font-mono text-[#c48b57] font-semibold tracking-wider">
              * REQUIRED FIELDS
            </span>
          </div>

          <div className="flex flex-col gap-5">
            {/* Row 1: Your Name* & Email Address* */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-[#222222] block mb-2 font-bold">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-white/90 border border-[#222222]/25 rounded-sm px-4 py-3.5 text-sm font-semibold text-[#222222] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:border-[#c48b57] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-[#222222] block mb-2 font-bold">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full bg-white/90 border border-[#222222]/25 rounded-sm px-4 py-3.5 text-sm font-semibold text-[#222222] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:border-[#c48b57] transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Phone Number* & Project Type* */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-[#222222] block mb-2 font-bold">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-white/90 border border-[#222222]/25 rounded-sm px-4 py-3.5 text-sm font-semibold text-[#222222] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:border-[#c48b57] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-[#222222] block mb-2 font-bold">
                  Project Type *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-white/90 border border-[#222222]/25 rounded-sm px-4 py-3.5 text-sm font-semibold text-[#222222] focus:outline-none focus:border-[#c48b57] transition-colors cursor-pointer"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Interior">Interior</option>
                  <option value="Renovation">Renovation</option>
                  <option value="Design & Build">Design & Build</option>
                </select>
              </div>
            </div>

            {/* Row 3: Project Location & Approx. Built-up Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-[#222222] block mb-2 font-bold">
                  Project Location
                </label>
                <input
                  type="text"
                  name="projectLocation"
                  value={formData.projectLocation}
                  onChange={handleChange}
                  placeholder="City / Location"
                  className="w-full bg-white/90 border border-[#222222]/25 rounded-sm px-4 py-3.5 text-sm font-semibold text-[#222222] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:border-[#c48b57] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-[#222222] block mb-2 font-bold">
                  Approx. Built-up Area
                </label>
                <select
                  name="builtUpArea"
                  value={formData.builtUpArea}
                  onChange={handleChange}
                  className="w-full bg-white/90 border border-[#222222]/25 rounded-sm px-4 py-3.5 text-sm font-semibold text-[#222222] focus:outline-none focus:border-[#c48b57] transition-colors cursor-pointer"
                >
                  <option value="< 1,500 sq.ft">&lt; 1,500 sq.ft</option>
                  <option value="1,500–3,000 sq.ft">1,500–3,000 sq.ft</option>
                  <option value="3,000–5,000 sq.ft">3,000–5,000 sq.ft</option>
                  <option value="5,000+ sq.ft">5,000+ sq.ft</option>
                </select>
              </div>
            </div>

            {/* Row 4: Estimated Budget */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[#222222] block mb-2 font-bold">
                Estimated Budget
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-white/90 border border-[#222222]/25 rounded-sm px-4 py-3.5 text-sm font-semibold text-[#222222] focus:outline-none focus:border-[#c48b57] transition-colors cursor-pointer"
              >
                <option value="₹25–50 L">₹25–50 L</option>
                <option value="₹50 L–1 Cr">₹50 L–1 Cr</option>
                <option value="₹1–2 Cr">₹1–2 Cr</option>
                <option value="₹2 Cr+">₹2 Cr+</option>
              </select>
            </div>

            {/* Row 5: Project Brief* */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[#222222] block mb-2 font-bold">
                Project Brief *
              </label>
              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project, requirements and vision"
                className="w-full bg-white/90 border border-[#222222]/25 rounded-sm px-4 py-3.5 text-sm font-semibold text-[#222222] placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:border-[#c48b57] transition-colors resize-none"
              />
            </div>

            {submissionError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submissionError}</span>
              </div>
            )}

            {/* Submit Button with "Let's Discuss" */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group relative w-full py-4 rounded-sm bg-gradient-to-r from-[#c48b57] via-[#d99c63] to-[#c48b57] text-white text-xs uppercase tracking-[0.2em] font-bold overflow-hidden shadow-[0_4px_24px_rgba(196,139,87,0.4)] hover:shadow-[0_4px_32px_rgba(196,139,87,0.6)] transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-3 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="relative z-10 font-bold">Submitting...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10 font-bold">Let's Discuss</span>
                  <Send className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Right Column: OUR STUDIO Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Studios Address Box */}
          <div className="p-8 rounded-sm bg-[#f9f9f5]/95 backdrop-blur-xl border border-[#222222]/15 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <h3 className="text-xs uppercase tracking-[0.24em] text-[#c48b57] font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> OUR STUDIO
            </h3>

            <div className="flex flex-col gap-6 pb-6 border-b border-[#222222]/15">
              {studioLocations.map((loc, idx) => (
                <div key={idx} className="flex flex-col gap-1.5 group">
                  <h4 className="text-base font-bold text-[#222222] tracking-wide uppercase group-hover:text-[#c48b57] transition-colors">
                    {loc.city}
                  </h4>
                  <p className="text-sm text-[#444444] font-medium leading-relaxed">
                    {loc.address}
                  </p>
                </div>
              ))}
            </div>

            {/* Studio Contact Channels */}
            <div className="flex flex-col gap-3.5 pt-6 text-sm text-[#222222] font-semibold">
              <a
                href="tel:+918095500050"
                className="flex items-center gap-3 hover:text-[#c48b57] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#c48b57]/15 flex items-center justify-center text-[#c48b57] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 80955 00050</span>
              </a>

              <a
                href="mailto:info@spacemeldarchitects.com"
                className="flex items-center gap-3 hover:text-[#c48b57] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#c48b57]/15 flex items-center justify-center text-[#c48b57] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@spacemeldarchitects.com</span>
              </a>

              <a
                href="mailto:careers@spacemeldarchitects.com"
                className="flex items-center gap-3 hover:text-[#c48b57] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#c48b57]/15 flex items-center justify-center text-[#c48b57] shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span>careers@spacemeldarchitects.com</span>
              </a>

              <a
                href="https://www.spacemeldarchitects.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-[#c48b57] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#c48b57]/15 flex items-center justify-center text-[#c48b57] shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <span>www.spacemeldarchitects.com</span>
              </a>
            </div>
          </div>

          {/* Quick Mail Card */}
          <div className="p-8 rounded-sm bg-[#f9f9f5]/95 backdrop-blur-xl border border-[#c48b57]/40 flex items-center justify-between shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#c48b57] font-bold block mb-1">
                Direct Communication & RFQs
              </span>
              <h4 className="text-base sm:text-lg font-bold font-['Cormorant_Garamond'] text-[#222222]">
                info@spacemeldarchitects.com
              </h4>
            </div>
            <a
              href="mailto:info@spacemeldarchitects.com"
              className="w-12 h-12 rounded-sm bg-[#c48b57] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(196,139,87,0.4)]"
            >
              <ArrowUpRight className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* SUCCESS / ERROR MODAL */}
      <AnimatePresence>
        {(isSubmitted || submissionError) && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => {
              if (isSubmitted) {
                setIsSubmitted(false);
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              if (submissionError) setSubmissionError(null);
            }}
          >
            <motion.div
              key="modal-card"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-gray-100 shadow-[0_25px_90px_rgba(0,0,0,0.4)] max-w-md w-full rounded-sm p-8 sm:p-10 relative overflow-hidden text-center text-[#1A1412]"
            >
              <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#c48b57]/10 rounded-full blur-2xl pointer-events-none" />

              <button
                type="button"
                onClick={() => {
                  if (isSubmitted) {
                    setIsSubmitted(false);
                    navigate('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                  if (submissionError) setSubmissionError(null);
                }}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-[#1A1412] flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {isSubmitted ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.05 }}
                    className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 rounded-full bg-[#c48b57]/15 animate-ping duration-1000" />
                    <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#c48b57] to-[#9c6a3f] flex items-center justify-center text-white shadow-lg shadow-[#c48b57]/30">
                      <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                    </div>
                  </motion.div>

                  <h3 className="text-3xl sm:text-4xl font-normal font-['Cormorant_Garamond'] text-[#1A1412] mb-3">
                    Thank You!
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed font-normal mb-8">
                    Your inquiry has been submitted successfully to <span className="font-bold text-[#1A1412]">info@spacemeldarchitects.com</span>. Our principal architects will contact you shortly.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData(DEFAULT_FORM);
                        navigate('/');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#1A1412] text-white text-xs uppercase font-mono tracking-[0.2em] font-bold hover:bg-[#c48b57] transition-all shadow-md hover:shadow-xl cursor-pointer"
                    >
                      Return Home
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData(DEFAULT_FORM);
                      }}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-full border border-gray-300 text-[#1A1412] text-xs uppercase font-mono tracking-[0.2em] font-bold hover:border-[#1A1412] hover:bg-gray-50 transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-6">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-[#1A1412] mb-2">Submission Error</h4>
                  <p className="text-sm text-gray-600 mb-6">{submissionError}</p>
                  <button
                    type="button"
                    onClick={() => setSubmissionError(null)}
                    className="px-6 py-2.5 bg-[#1A1412] text-white rounded-full text-xs uppercase tracking-wider font-bold"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}