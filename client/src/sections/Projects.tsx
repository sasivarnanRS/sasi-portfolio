import { motion } from 'motion/react';
import { Github, ExternalLink, Globe, Brain, Server } from 'lucide-react';
import codeImg from '../assets/project_code.png';
import patientImg from '../assets/project_patient.png';
import vehicleImg from '../assets/project_vehicle.png';

const projectsList = [
  {
    title: 'Real-Time Collaborative Code Editor',
    description: 'A premium collaborative development canvas with real-time multi-user synchronization, integrated AI code completions, and secure code execution sandbox. Users can write, debug, and run code together seamlessly.',
    tech: ['React.js', 'Node.js', 'Socket.io', 'MongoDB', 'OpenAI API'],
    features: ['Instant cursor tracking & sync', 'In-editor AI helper model', 'Multi-language compiler sandbox'],
    image: codeImg,
    github: 'https://github.com/sasivarnanRS',
    demo: '#',
    accent: '#6C63FF',
    glow: 'rgba(108,99,255,0.15)',
    border: 'rgba(108,99,255,0.2)'
  },
  {
    title: 'Patient Management System',
    description: 'An advanced computer vision monitor engineered for medical facilities. Using OpenCV and deep learning, it continuously tracks abnormal motions like accidental falls and seizures in real-time, instantly notifying staff.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Flask', 'Twilio API'],
    features: ['Deep learning motion tracking', 'Seizure & fall alert logic', 'Immediate emergency sms trigger'],
    image: patientImg,
    github: 'https://github.com/sasivarnanRS',
    demo: '#',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
    border: 'rgba(245,158,11,0.2)'
  },
  {
    title: 'Automatic Vehicle Registration Number Plate Generator',
    description: 'A high-throughput rule-based generation system. Features custom string pattern generation matching local regulatory styles, fast indexing MongoDB schemas, and REST endpoints for license validation.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth'],
    features: ['Regulatory pattern generator engine', 'Rapid index queries', 'Secure microservices API validation'],
    image: vehicleImg,
    github: 'https://github.com/sasivarnanRS',
    demo: '#',
    accent: '#8B5CF6',
    glow: 'rgba(139,92,246,0.15)',
    border: 'rgba(139,92,246,0.2)'
  }
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 overflow-hidden border-t border-white/5 bg-transparent"
    >
      {/* Ambient Orbs - Matching Hero Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.18)_0%,rgba(245,158,11,0.04)_35%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(108,99,255,0.2)_0%,rgba(59,130,246,0.05)_35%,transparent_65%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >

          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white font-grotesk">
            Featured <span className="text-white">Showcase Works</span>
          </h2>
        </motion.div>

        {/* Project Layout - Alternating Cards */}
        <div className="space-y-24">
          {projectsList.map((project, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-12 gap-8 items-center ${isLeft ? '' : 'lg:flex-row-reverse'}`}
              >
                {/* ── Image Side (5 cols) ── */}
                <div
                  className={`lg:col-span-5 relative w-full h-64 md:h-76 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-xl group ${
                    isLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle color overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"
                  />
                </div>

                {/* ── Content Side (7 cols) ── */}
                <div
                  className={`lg:col-span-7 flex flex-col text-left ${
                    isLeft ? 'lg:order-2 lg:pl-6' : 'lg:order-1 lg:pr-6'
                  }`}
                >
                  {/* Accent tag */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: project.accent }}
                    />
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest"
                      style={{ color: project.accent }}
                    >
                      Project {index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-3 font-grotesk">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-350 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Features Checklist */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5">
                    {project.features.map((feat) => (
                      <span key={feat} className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: project.accent }} />
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-white/5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[10px] font-bold rounded-lg font-mono border"
                        style={{
                          backgroundColor: project.glow,
                          borderColor: project.border,
                          color: project.accent
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.02] flex items-center gap-2 transition-all"
                    >
                      <Github size={13} />
                      View Code
                    </motion.a>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
