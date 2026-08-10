import { motion } from 'motion/react';
import { Award, Trophy, Star, ChevronRight, Zap } from 'lucide-react';

const achievementsList = [
  {
    title: 'Sports Excellence Award',
    detail: 'Honored for outstanding performance in state & college martial arts representations.',
    badge: 'Special Honors'
  },
  {
    title: 'First Place',
    detail: 'Divisional Silambam Tournament champion, showcasing traditional stick-fighting excellence.',
    badge: 'Divisional Rank 1'
  },
  {
    title: 'District Second Place',
    detail: 'Silambam Tournament silver medalist, representing competitive district divisions.',
    badge: 'District Rank 2'
  }
];

const certificationsList = [
  'C++ Training – Spoken Tutorial, IIT Bombay',
  'C Training – Spoken Tutorial, IIT Bombay',
  'MS Office & Web Design',
  'Semiconductor Foundation & Electronics',
  'Debugging C Code Optimization',
  'Python for Data Science Specialization',
  'SkillRack Certificates (7+ completed modules)'
];

export default function Achievements() {
  return (
    <section
      id="achievements"
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
          className="mb-10 lg:mb-12"
        >

          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white font-grotesk">
            Recognition & <span className="text-white">Professional Milestones</span>
          </h2>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* ── Left Column: Achievements ── */}
          <div className="flex flex-col text-left">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
              <Trophy size={14} className="text-amber-500" />
              Achievements
            </h3>

            <div className="space-y-4">
              {achievementsList.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  whileHover={{ x: 6, borderColor: 'rgba(245,158,11,0.25)' }}
                  className="p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] flex items-start gap-4 transition-all duration-300 group cursor-default"
                >
                  <div className="w-9 h-9 shrink-0 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                    <Star size={14} className="text-amber-400 fill-amber-400/20" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[8px] font-bold uppercase tracking-wider text-amber-500 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Certification Wall ── */}
          <div className="flex flex-col text-left">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
              <Award size={14} className="text-indigo-500" />
              Certification Wall
            </h3>

            <div className="space-y-3 pr-2">
              {certificationsList.map((cert, idx) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{ x: -4, borderColor: 'rgba(108,99,255,0.25)' }}
                  className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] flex items-center gap-3.5 transition-all duration-300 group cursor-default"
                >
                  <div className="w-7 h-7 shrink-0 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center">
                    <ChevronRight size={14} className="text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors leading-tight">
                    {cert}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
