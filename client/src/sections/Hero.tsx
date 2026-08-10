import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

import { portfolioData } from '../data/portfolioData';
import sasiImg from '../assets/sasi.png';

// Counter component for stats roll-up animation
function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 30);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use MotionValues to prevent React re-renders on mousemove
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for lag-free cursor tracking
  const springX = useSpring(mouseX, { stiffness: 90, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 28 });

  // Transforms for different layers (parallax effect)
  const typographyX = useTransform(springX, (val) => val * 0.4);
  const typographyY = useTransform(springY, (val) => val * 0.4);

  const characterX = useTransform(springX, (val) => val * -0.5);
  const characterY = useTransform(springY, (val) => val * -0.5);

  const contentX = useTransform(springX, (val) => val * 0.2);
  const contentY = useTransform(springY, (val) => val * 0.2);

  const buttonX = useTransform(springX, (val) => val * -0.2);
  const buttonY = useTransform(springY, (val) => val * -0.2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 45;
      const y = (e.clientY - window.innerHeight / 2) / 45;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full bg-transparent overflow-hidden flex flex-col justify-between select-none"
    >
      {/* ── BACKGROUND GRADIENTS WITH GPU-FRIENDLY RADIAL GLOWS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Warm Orange-Yellow Glow (Bottom-Left) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_90%,rgba(245,158,11,0.2)_0%,rgba(245,158,11,0.05)_30%,transparent_60%)]" />
        
        {/* Deep Purple-Blue Aurora Glow (Top-Right) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(108,99,255,0.22)_0%,rgba(59,130,246,0.06)_35%,transparent_65%)]" />
      </div>

      {/* Spacer to push content down below Navbar */}
      <div className="h-20" />

      {/* ── GIANT TYPOGRAPHY WITH SMOOTH KINETIC ENTRY SCALE ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none text-center pb-[15vh]">
        <motion.h1
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            x: typographyX,
            y: typographyY,
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
          className="text-[10vw] font-black uppercase tracking-normal leading-none text-white/90 font-grotesk whitespace-nowrap"
        >
          {/* Animated "I AM A CREATIVE" word entrance */}
          <motion.span
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="block"
          >
            I AM A CREATIVE
          </motion.span>
          {/* Animated "DEVELOPER" word entrance */}
          <motion.span
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="block text-white/95 mt-1"
          >
            DEVELOPER
          </motion.span>
        </motion.h1>
      </div>

      {/* ── FOREGROUND CHARACTER IMAGE WITH GPU LAYER PROMOTION ── */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center z-20 pointer-events-none select-none">
        <motion.img
          initial={{ opacity: 0, y: 150, scale: 0.94 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            x: characterX,
            y: characterY,
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
          src={sasiImg}
          alt="Sasi Varnan"
          className="h-[68vh] md:h-[75vh] object-contain object-bottom filter contrast-[1.08] saturate-[1.05]"
        />
      </div>

      {/* ── LOWER LEFT CONTENT (STATS ROLL-UP & GREETINGS INLET) ── */}
      <div className="relative z-30 w-full px-6 md:px-12 pb-16 flex flex-col md:flex-row justify-between items-end gap-8 mt-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            x: contentX,
            y: contentY,
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
          className="max-w-[380px] text-left"
        >
          {/* Greeting Tag with Waving Hand Animation */}
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-3">
            <motion.span
              animate={{ rotate: [0, 14, -10, 14, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', repeatDelay: 1 }}
              className="inline-block origin-bottom-right"
            >
              👋
            </motion.span>{' '}
            Hi, I Am Sasi Varnan
          </div>

          {/* Description */}
          <p className="text-[13px] leading-relaxed text-white/70">
            I create and maintain modern websites and applications. I develop AI-powered applications, data-driven solutions, and scalable full-stack systems.
          </p>

          {/* Stats metrics */}
          <div className="flex items-center gap-8 mt-6 pt-6 border-t border-white/5">
            {/* Stat 1 */}
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black text-white font-grotesk">
                <AnimatedCounter value={10} />+
              </div>
              <div className="text-[7.5px] font-bold text-white/40 uppercase tracking-widest leading-tight">
                Successfully<br />Completed Projects
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black text-white font-grotesk">
                <AnimatedCounter value={2} />+
              </div>
              <div className="text-[7.5px] font-bold text-white/40 uppercase tracking-widest leading-tight">
                Years of<br />Experience
              </div>
            </div>
          </div>
        </motion.div>


      </div>
    </div>
  );
}
