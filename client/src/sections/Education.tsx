import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, Star } from 'lucide-react';

const institutionColors: Record<string, string> = {
  'Sri Eshwar College of Engineering': '#6366f1',
  'SAMHSS School': '#8b5cf6',
};

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden border-t border-white/5 bg-transparent">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#6C63FF]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#6C63FF]/40 to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-[10px] font-bold tracking-[0.25em] text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <GraduationCap size={10} />
            Education
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white font-grotesk">
            Academic <span className="text-gradient">Path</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md">
            Building a strong foundation in technology and engineering.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent" />

          <div className="space-y-8 ml-2">
            {portfolioData.education.map((item, index) => {
              const accent = institutionColors[item.institution] || '#6366f1';
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative pl-14 group"
                >
                  {/* Node */}
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="absolute left-0 top-4 w-10 h-10 rounded-xl flex items-center justify-center z-10 transition-all duration-300"
                    style={{
                      background: accent + '15',
                      border: `1px solid ${accent}40`,
                      boxShadow: `0 0 0 0 ${accent}00`,
                    }}
                  >
                    <GraduationCap size={18} style={{ color: accent }} />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 6 }}
                    className="p-6 glass rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
                    style={{ boxShadow: `0 0 0 0 ${accent}` }}
                  >
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>
                      <Calendar size={10} />
                      {item.period}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                      {item.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                      <MapPin size={12} className="text-slate-600" />
                      {item.institution}
                    </div>
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                      style={{ background: accent + '15', color: accent, border: `1px solid ${accent}30` }}
                    >
                      <Star size={10} className="fill-current" />
                      {item.details}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
