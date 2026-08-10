import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { ShieldCheck, Award } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-pink-400 uppercase bg-pink-500/10 border border-pink-500/20 rounded-full">
            <ShieldCheck size={12} />
            Certifications
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-1">Verified Credentials</h2>
          <p className="text-sm text-slate-400">Professional certifications and training completions.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {portfolioData.certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-pink-500/30 hover:bg-white/[0.05] transition-all flex items-start gap-3 group"
            >
              <div className="w-7 h-7 shrink-0 bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                <Award size={14} />
              </div>
              <h3 className="text-sm text-slate-300 font-medium leading-snug pt-0.5">
                {cert}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
