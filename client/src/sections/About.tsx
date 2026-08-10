import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, MapPin, Target, Code } from 'lucide-react';
import sasiImg from '../assets/sasi.png';

const infoCards = [
  { label: 'Degree', value: 'B.Tech AI & DS', icon: BookOpen, color: '#6C63FF' },
  { label: 'College', value: 'Sri Eshwar College', icon: GraduationCap, color: '#f59e0b' },
  { label: 'Graduation', value: '2028', icon: Award, color: '#8B5CF6' },
  { label: 'Location', value: 'Tamil Nadu', icon: MapPin, color: '#3b82f6' },
  { label: 'Focus', value: 'MERN + AI', icon: Target, color: '#10b981' },
  { label: 'Problem Solving', value: 'Competitive C++', icon: Code, color: '#ec4899' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen lg:h-screen flex flex-col justify-center py-16 lg:py-0 overflow-hidden border-t border-white/5 bg-transparent"
    >
      {/* Ambient Orbs - Matching Hero Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,rgba(245,158,11,0.18)_0%,rgba(245,158,11,0.04)_35%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(108,99,255,0.2)_0%,rgba(59,130,246,0.05)_35%,transparent_65%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 lg:mb-10"
        >

          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white font-grotesk">
            About & <span className="text-white">Academic Profile</span>
          </h2>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* ── Left Side: Portrait & Floating Profile Pill (5 cols) ── */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Holographic background circle glow */}
            <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#6C63FF]/10 to-transparent blur-[40px] pointer-events-none" />

            {/* Profile Frame with image */}
            <div className="relative w-56 h-72 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] flex items-end justify-center group shadow-xl">
              <img
                src={sasiImg}
                alt="Sasivarnan RS"
                className="h-[94%] object-contain object-bottom filter brightness-95 group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating Profile glass overlay */}
              <div className="absolute inset-x-3 bottom-3 p-3.5 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md text-left z-20">
                <h3 className="text-sm font-black text-white font-grotesk tracking-tight">Sasivarnan RS</h3>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">AI & DS Student</p>
                <p className="text-[9px] font-medium text-slate-500 mt-0.5 leading-tight">Sri Eshwar College of Engineering</p>
                <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">CGPA</span>
                  <span className="text-xs font-black text-amber-400">8.1</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Side: Short story & 6 Cards (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Short professional story - strictly 5-6 lines */}
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm md:text-base leading-relaxed text-slate-300 mb-6 lg:mb-8"
            >
              I am an AI & Data Science engineering student at Sri Eshwar College of Engineering. With a solid foundation in MERN stack development and data science libraries, I specialize in architecting intelligent systems and web interfaces. I focus on code efficiency, algorithmic optimization, and delivering smooth user experiences.
            </motion.p>

            {/* Quick Information Cards Grid (6 cards) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {infoCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    whileHover={{ y: -3, borderColor: 'rgba(255,255,255,0.08)' }}
                    className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3 transition-all duration-300"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{
                        background: `${card.color}08`,
                        borderColor: `${card.color}20`,
                        color: card.color
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <div>
                      <div className="text-[8.5px] font-bold text-slate-500 uppercase tracking-wider">{card.label}</div>
                      <div className="text-[11px] font-bold text-white mt-0.5 leading-tight">{card.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
