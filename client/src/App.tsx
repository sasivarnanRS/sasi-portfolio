import { lazy, Suspense, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';


import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const About        = lazy(() => import('./sections/About'));
const Skills       = lazy(() => import('./sections/Skills'));
const Projects     = lazy(() => import('./sections/Projects'));
const Achievements = lazy(() => import('./sections/Achievements'));
const Contact      = lazy(() => import('./sections/Contact'));

const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-ping" />
      <div className="absolute inset-2 rounded-full border border-indigo-500/50 animate-spin" />
    </div>
  </div>
);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="bg-[#050505] text-slate-50 relative min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* ── Background layers (lowest z) ── */}

      {/* Grain noise overlay */}
      <div className="noise" />

      {/* Custom cursor */}


      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Main content ── */}
      <main className="relative z-10">
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Achievements />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 py-14 border-t border-white/5 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-indigo-600/6 blur-[60px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">

            <div>
              <div className="text-2xl font-black tracking-tighter text-gradient font-grotesk mb-1">
                SASIVARNAN RS
              </div>
              <p className="text-xs text-slate-600 font-mono-custom">
                Full Stack Developer · AI & Data Science
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {['#home', '#about', '#skills', '#projects', '#achievements', '#contact'].map(href => (
                <a
                  key={href}
                  href={href}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 hover:text-indigo-400 transition-colors"
                >
                  {href.slice(1)}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: 'https://github.com/sasivarnanRS', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/sasivarnan-r-s-230a37333', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:rssasivarnan@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 bg-white/5 border border-white/8 rounded-xl flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all"
                >
                  <Icon size={15} />
                </motion.a>
              ))}

              <div className="w-px h-5 bg-white/10 mx-1" />

              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 16px rgba(99,102,241,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400 hover:bg-indigo-600/40 transition-all"
                aria-label="Back to top"
              >
                <ArrowUp size={15} />
              </motion.button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-[10px] text-slate-700 font-mono-custom">
              © {new Date().getFullYear()} Sasivarnan RS · Built with React, Three.js & Framer Motion
            </p>
            <p className="text-[10px] text-slate-700 font-mono-custom">
              Coimbatore, Tamil Nadu, India 🇮🇳
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
