import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Terminal, Layout, Server, BarChart2, Shield } from 'lucide-react';

// Tooltip dictionary mapping each technology to its modern description
const tooltips: Record<string, string> = {
  'C': 'System Programming Language',
  'C++': 'High-Performance OOP Language',
  'Java': 'Enterprise Application Platform',
  'Python': 'AI & Machine Learning Core',
  'HTML': 'Structured Document Markup',
  'CSS': 'Sleek Modern Styling Engine',
  'JavaScript': 'Interactive Client Scripting',
  'React': 'Declarative UI Library',
  'Node.js': 'V8 JavaScript Runtime Backend',
  'Express.js': 'Minimalist Web API Framework',
  'MongoDB': 'Scalable NoSQL Document Database',
  'NumPy': 'Fast Multi-dimensional Computing',
  'Pandas': 'Structured Data Analysis Tool',
  'Matplotlib': 'Static & Interactive Visualizations',
  'Git': 'Distributed Version Control System',
  'GitHub': 'Cloud Code Repository Host',
  'VS Code': 'Modern Extensible Source Editor',
  'Jupyter': 'Interactive Computing Notebook',
  'Power BI': 'Business Intelligence Analytics',
  'Canva': 'Creative Visual Graphic Tool',
};

const categories = [
  {
    id: 'programming',
    title: 'Programming',
    icon: Terminal,
    color: '#6C63FF',
    skills: ['C', 'C++', 'Java', 'Python'],
    floatDuration: 5.2,
    coords: { x: '12%', y: '15%' } // Approximate layout connection anchors
  },
  {
    id: 'frontend',
    title: 'Frontend & UI',
    icon: Layout,
    color: '#f59e0b',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    floatDuration: 6.8,
    coords: { x: '88%', y: '15%' }
  },
  {
    id: 'tools',
    title: 'Tools & Systems',
    icon: Shield,
    color: '#10b981',
    skills: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Power BI', 'Canva'],
    floatDuration: 5.8,
    coords: { x: '50%', y: '12%' }
  },
  {
    id: 'backend',
    title: 'Backend & DB',
    icon: Server,
    color: '#8B5CF6',
    skills: ['Node.js', 'Express.js', 'MongoDB'],
    floatDuration: 4.6,
    coords: { x: '15%', y: '82%' }
  },
  {
    id: 'datascience',
    title: 'Data Science',
    icon: BarChart2,
    color: '#3b82f6',
    skills: ['NumPy', 'Pandas', 'Matplotlib'],
    floatDuration: 7.4,
    coords: { x: '85%', y: '82%' }
  }
];

export default function Skills() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [activatedCard, setActivatedCard] = useState<string | null>(null);

  // Mouse Parallax movement setup
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 25 };
  const parallaxX = useSpring(useTransform(mouseX, [-400, 400], [-8, 8]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-400, 400], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredCard(null);
  };

  // Get active color for the center core based on hovered card
  const getCoreGlow = () => {
    if (!hoveredCard) return 'rgba(108,99,255,0.25)';
    const cat = categories.find(c => c.id === hoveredCard);
    return cat ? `${cat.color}60` : 'rgba(108,99,255,0.25)';
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="skills"
      className="relative min-h-screen lg:h-screen flex flex-col justify-center py-16 lg:py-0 overflow-hidden border-t border-white/5 bg-transparent select-none animate-fadeIn"
    >
      {/* ── Ambient Orbs - Matching Hero Theme Exactly ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.18)_0%,rgba(245,158,11,0.04)_35%,transparent_65%)] pointer-events-none animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(108,99,255,0.2)_0%,rgba(59,130,246,0.05)_35%,transparent_65%)] pointer-events-none animate-pulse" style={{ animationDuration: '14s' }} />

      {/* ── Background Grid ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      {/* Moving slow gradient blobs */}
      <div className="absolute top-[25%] left-[12%] w-[400px] h-[400px] rounded-full bg-[#f59e0b]/8 blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-[25%] right-[12%] w-[420px] h-[420px] rounded-full bg-[#6C63FF]/8 blur-[110px] animate-pulse pointer-events-none" style={{ animationDuration: '16s' }} />

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(28)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 2 + 'px',
              height: Math.random() * 3 + 2 + 'px',
              backgroundColor: i % 3 === 0 ? '#6C63FF' : i % 3 === 1 ? '#f59e0b' : '#3b82f6',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.45 + 0.15,
            }}
            animate={{
              y: [0, Math.random() * -80 - 40],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 7,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-6.5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 lg:mb-14 text-center"
        >

          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white font-grotesk">
            Futuristic <span className="text-white">Technology Ecosystem</span>
          </h2>
        </motion.div>

        {/* Parallax moving container */}
        <motion.div 
          style={{ x: parallaxX, y: parallaxY }} 
          className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center max-w-6xl mx-auto"
        >
          {/* ── Dashboard Connection Network lines (Desktop only) ── */}
          <div className="absolute inset-0 hidden lg:block pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
              {/* Programming Base Line */}
              <path d="M 500 300 C 400 260, 240 180, 180 150" stroke="#white" strokeWidth="0.5" strokeOpacity="0.05" fill="none" />
              {/* Programming Flowing Line */}
              <motion.path
                d="M 500 300 C 400 260, 240 180, 180 150"
                stroke="url(#purpleGlow)"
                strokeWidth={hoveredCard === 'programming' ? "2.5" : "1.5"}
                strokeDasharray="5 15"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                fill="none"
                opacity={hoveredCard === 'programming' ? 0.8 : 0.25}
                className="transition-all duration-300"
              />

              {/* Tools Base Line */}
              <path d="M 500 300 C 480 240, 490 180, 500 120" stroke="#white" strokeWidth="0.5" strokeOpacity="0.05" fill="none" />
              {/* Tools Flowing Line */}
              <motion.path
                d="M 500 300 C 480 240, 490 180, 500 120"
                stroke="url(#greenGlow)"
                strokeWidth={hoveredCard === 'tools' ? "2.5" : "1.5"}
                strokeDasharray="5 15"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                fill="none"
                opacity={hoveredCard === 'tools' ? 0.8 : 0.25}
                className="transition-all duration-300"
              />

              {/* Frontend Base Line */}
              <path d="M 500 300 C 600 260, 760 180, 820 150" stroke="#white" strokeWidth="0.5" strokeOpacity="0.05" fill="none" />
              {/* Frontend Flowing Line */}
              <motion.path
                d="M 500 300 C 600 260, 760 180, 820 150"
                stroke="url(#orangeGlow)"
                strokeWidth={hoveredCard === 'frontend' ? "2.5" : "1.5"}
                strokeDasharray="5 15"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                fill="none"
                opacity={hoveredCard === 'frontend' ? 0.8 : 0.25}
                className="transition-all duration-300"
              />

              {/* Backend Base Line */}
              <path d="M 500 300 C 400 340, 240 420, 180 450" stroke="#white" strokeWidth="0.5" strokeOpacity="0.05" fill="none" />
              {/* Backend Flowing Line */}
              <motion.path
                d="M 500 300 C 400 340, 240 420, 180 450"
                stroke="url(#purpleGlow)"
                strokeWidth={hoveredCard === 'backend' ? "2.5" : "1.5"}
                strokeDasharray="5 15"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                fill="none"
                opacity={hoveredCard === 'backend' ? 0.8 : 0.25}
                className="transition-all duration-300"
              />

              {/* Data Science Base Line */}
              <path d="M 500 300 C 600 340, 760 420, 820 450" stroke="#white" strokeWidth="0.5" strokeOpacity="0.05" fill="none" />
              {/* Data Science Flowing Line */}
              <motion.path
                d="M 500 300 C 600 340, 760 420, 820 450"
                stroke="url(#blueGlow)"
                strokeWidth={hoveredCard === 'datascience' ? "2.5" : "1.5"}
                strokeDasharray="5 15"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                fill="none"
                opacity={hoveredCard === 'datascience' ? 0.8 : 0.25}
                className="transition-all duration-300"
              />

              {/* Define gradients for the network lines */}
              <defs>
                <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6C63FF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="orangeGlow" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6C63FF" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="greenGlow" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6C63FF" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="blueGlow" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6C63FF" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              <DataCapsuleSystem 
                isInView={isInView} 
                hoveredCard={hoveredCard} 
                onActivateCard={setActivatedCard} 
              />
            </svg>
          </div>

          {/* ── Card 1: Programming (Top Left) ── */}
          <SkillCard
            category={categories[0]}
            delay={0.1}
            onHover={setHoveredCard}
            onHoverTag={setHoveredTag}
            onTooltipPos={setTooltipPos}
            isActivated={activatedCard === categories[0].id}
          />

          {/* ── Card 2: Tools & Systems (Top Center) ── */}
          <SkillCard
            category={categories[2]}
            delay={0.2}
            onHover={setHoveredCard}
            onHoverTag={setHoveredTag}
            onTooltipPos={setTooltipPos}
            isActivated={activatedCard === categories[2].id}
          />

          {/* ── Card 3: Frontend & UI (Top Right) ── */}
          <SkillCard
            category={categories[1]}
            delay={0.3}
            onHover={setHoveredCard}
            onHoverTag={setHoveredTag}
            onTooltipPos={setTooltipPos}
            isActivated={activatedCard === categories[1].id}
          />

          {/* ── Card 4: Backend & DB (Bottom Left) ── */}
          <SkillCard
            category={categories[3]}
            delay={0.4}
            onHover={setHoveredCard}
            onHoverTag={setHoveredTag}
            onTooltipPos={setTooltipPos}
            isActivated={activatedCard === categories[3].id}
          />

          {/* ── Center Core: Technology Ecosystem ── */}
          <div className="hidden lg:flex items-center justify-center relative h-64 z-10">
            {/* Pulsing energy radiating waves */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-36 h-36 rounded-full border border-[#6C63FF]/30"
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  delay: i * 0.9,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Outer dotted dial rotating clockwise */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="absolute w-44 h-44 rounded-full border border-dashed border-[#6C63FF]/20 flex items-center justify-center"
            />

            {/* Inner dial rotating counter-clockwise */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
              className="absolute w-38 h-38 rounded-full border border-dotted border-[#f59e0b]/25"
            />

            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              style={{
                boxShadow: `0 0 45px ${getCoreGlow()}`,
                borderColor: hoveredCard ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'
              }}
              className="w-32 h-32 rounded-full border bg-black/75 backdrop-blur-xl flex flex-col items-center justify-center text-center relative z-20 group transition-all duration-300"
            >
              {/* Inner core pulse */}
              <div className="absolute inset-0.5 rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.12)_0%,transparent_70%)] animate-pulse" />
              
              <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-[0.2em] font-mono-custom">Ecosystem</span>
              <span className="text-[11px] font-black text-white uppercase tracking-wider mt-1 select-none font-grotesk px-2">Core Hub</span>
              
              {/* Holographic light lines */}
              <div className="absolute w-12 h-0.5 bg-indigo-500/30 top-1/2 -translate-y-1/2 left-0 animate-pulse" />
              <div className="absolute w-12 h-0.5 bg-indigo-500/30 top-1/2 -translate-y-1/2 right-0 animate-pulse" />
            </motion.div>
          </div>

          {/* ── Card 5: Data Science (Bottom Right) ── */}
          <SkillCard
            category={categories[4]}
            delay={0.5}
            onHover={setHoveredCard}
            onHoverTag={setHoveredTag}
            onTooltipPos={setTooltipPos}
            isActivated={activatedCard === categories[4].id}
          />
        </motion.div>
      </div>

      {/* ── Premium Floating Tooltip ── */}
      <AnimatePresence>
        {hoveredTag && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.18 }}
            className="fixed pointer-events-none z-50 px-3 py-1.5 rounded-lg border border-white/10 bg-black/85 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white shadow-2xl flex items-center gap-1.5"
            style={{
              left: tooltipPos.x + 12 + 'px',
              top: tooltipPos.y - 12 + 'px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
            <span>{tooltips[hoveredTag] || 'Technology Parameter'}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Inner SkillCard implementation incorporating continuous animations, floating cycles, spotlights, and tag mouse events
function SkillCard({
  category,
  delay,
  onHover,
  onHoverTag,
  onTooltipPos,
  isActivated = false
}: {
  category: typeof categories[0];
  delay: number;
  onHover: (id: string | null) => void;
  onHoverTag: (tag: string | null) => void;
  onTooltipPos: (pos: { x: number; y: number }) => void;
  isActivated?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = category.icon;
  const cardMouseX = useMotionValue(0);
  const cardMouseY = useMotionValue(0);

  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardMouseX.set(e.clientX - rect.left);
    cardMouseY.set(e.clientY - rect.top);
  };

  const spotBg = useTransform(
    [cardMouseX, cardMouseY],
    ([x, y]) => `radial-gradient(140px circle at ${x}px ${y}px, ${category.color}15 0%, transparent 80%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      onMouseEnter={() => onHover(category.id)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, y: 35, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -8,
        borderColor: `${category.color}35`,
        boxShadow: `0 15px 35px ${category.color}15`,
        backgroundColor: 'rgba(255,255,255,0.03)'
      }}
      style={{
        willChange: 'transform, border-color, box-shadow',
      }}
      className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.015] backdrop-blur-md transition-colors duration-300 group overflow-hidden cursor-default"
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          duration: category.floatDuration,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="w-full h-full relative z-10"
      >
        {/* Spotlight overlay mapped to cursor */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-none"
          style={{ background: spotBg }}
        />

        <div className="flex items-center gap-3 mb-6">
          {/* Animated Category Icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 relative"
            style={{
              background: `${category.color}10`,
              borderColor: `${category.color}25`,
              color: category.color,
              boxShadow: `0 0 15px ${category.color}05`
            }}
          >
            {category.id === 'programming' ? (
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
                <Icon size={18} />
              </motion.div>
            ) : category.id === 'frontend' ? (
              <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
                <Icon size={18} />
              </motion.div>
            ) : category.id === 'backend' ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}>
                <Icon size={18} />
              </motion.div>
            ) : category.id === 'datascience' ? (
              <div className="flex items-end gap-0.5 h-[16px] w-[18px] justify-center overflow-hidden">
                <motion.div className="w-[3px] bg-blue-500" animate={{ height: [4, 14, 4] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }} />
                <motion.div className="w-[3px] bg-blue-500" animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.3, ease: 'easeInOut' }} />
                <motion.div className="w-[3px] bg-blue-500" animate={{ height: [6, 12, 6] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.6, ease: 'easeInOut' }} />
              </div>
            ) : (
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
                <Icon size={18} />
              </motion.div>
            )}
          </div>
          <h3 className="text-md font-bold text-white font-grotesk tracking-tight">{category.title}</h3>
        </div>

        {/* Skill Pill Badges */}
        <div className="flex flex-wrap gap-2.5">
          {category.skills.map((skill) => (
            <motion.span
              key={skill}
              onMouseEnter={(e) => {
                onHoverTag(skill);
                onTooltipPos({ x: e.clientX, y: e.clientY });
              }}
              onMouseMove={(e) => {
                onTooltipPos({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => onHoverTag(null)}
              whileHover={{
                scale: 1.05,
                borderColor: `${category.color}50`,
                boxShadow: `0 0 10px ${category.color}15`,
                color: '#ffffff'
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-350 bg-white/[0.015] border border-white/5 transition-all duration-200 cursor-pointer"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}


// --- Data Capsule System ---
const PATHS = {
  programming: "M 500 300 C 400 260, 240 180, 180 150",
  tools:       "M 500 300 C 480 240, 490 180, 500 120",
  frontend:    "M 500 300 C 600 260, 760 180, 820 150",
  backend:     "M 500 300 C 400 340, 240 420, 180 450",
  datascience: "M 500 300 C 600 340, 760 420, 820 450",
};

const TARGET_ORDER = ['tools', 'frontend', 'datascience', 'programming', 'backend'];

function DataCapsuleSystem({ 
  isInView, 
  hoveredCard, 
  onActivateCard 
}: { 
  isInView: boolean; 
  hoveredCard: string | null;
  onActivateCard: (id: string | null) => void;
}) {
  const [targetId, setTargetId] = useState('tools');
  const [phase, setPhase] = useState<'idle' | 'charge' | 'launch' | 'arrival' | 'return'>('idle');
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  // Handle hover overrides
  useEffect(() => {
    if (hoveredCard && phase === 'idle' && !prefersReducedMotion) {
      setTargetId(hoveredCard);
    }
  }, [hoveredCard, phase, prefersReducedMotion]);

  // Main animation loop
  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setPhase('idle');
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'idle') {
      // Wait 5 seconds between launches (or 2.5s for the very first one)
      timeout = setTimeout(() => {
        setPhase('charge');
      }, 5000);
    } else if (phase === 'charge') {
      timeout = setTimeout(() => {
        setPhase('launch');
      }, 400);
    } else if (phase === 'launch') {
      timeout = setTimeout(() => {
        setPhase('arrival');
        onActivateCard(targetId);
      }, 1000); // 1s travel time
    } else if (phase === 'arrival') {
      timeout = setTimeout(() => {
        setPhase('return');
        onActivateCard(null); // Remove card highlight
      }, 600); // Highlight card for 600ms
    } else if (phase === 'return') {
      timeout = setTimeout(() => {
        setPhase('idle');
        // Rotate to next target if not being hovered over currently
        if (!hoveredCard) {
          const nextIdx = (TARGET_ORDER.indexOf(targetId) + 1) % TARGET_ORDER.length;
          setTargetId(TARGET_ORDER[nextIdx]);
        }
      }, 500); // Return pulse takes 500ms
    }

    return () => clearTimeout(timeout);
  }, [phase, isInView, targetId, hoveredCard, onActivateCard, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  const currentPath = PATHS[targetId as keyof typeof PATHS] || PATHS.tools;
  const currentCat = categories.find(c => c.id === targetId) || categories[2];
  const accentColor = currentCat.color;

  return (
    <g className="data-capsule-system z-50 pointer-events-none">
      <defs>
        <filter id="capsuleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="trailGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Trail (only visible during launch) */}
      <AnimatePresence>
        {phase === 'launch' && (
          <motion.path
            d={currentPath}
            fill="none"
            stroke={accentColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#trailGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* The Capsule */}
      <AnimatePresence>
        {(phase === 'charge' || phase === 'launch') && (
          <motion.g
            filter="url(#capsuleGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              phase === 'charge' 
                ? { opacity: 1, scale: 1 } 
                : { opacity: [1, 1, 0], scale: [1, 1, 0] }
            }
            transition={{ 
              duration: phase === 'charge' ? 0.4 : 1.0, 
              ease: phase === 'charge' ? "easeOut" : "easeInOut" 
            }}
          >
            {/* We use framer motion's offsetPath to move the group along the SVG path */}
            {phase === 'launch' && (
              <motion.g
                style={{ offsetPath: `path('${currentPath}')` } as any}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
              >
                {/* Capsule Geometry */}
                <polygon points="0,-6 4,0 0,6 -4,0" fill="rgba(255,255,255,0.95)" />
                <circle r="1.5" fill={accentColor} />
                <polygon points="0,-6 4,0 0,6 -4,0" fill="none" stroke="white" strokeWidth="0.5" opacity="0.8" />
              </motion.g>
            )}
            {phase === 'charge' && (
               <motion.g style={{ offsetPath: `path('${currentPath}')`, offsetDistance: "0%" } as any}>
                  <polygon points="0,-6 4,0 0,6 -4,0" fill="rgba(255,255,255,0.95)" />
                  <circle r="1.5" fill={accentColor} />
               </motion.g>
            )}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Return Pulse */}
      <AnimatePresence>
        {phase === 'return' && (
          <motion.g
            style={{ offsetPath: `path('${currentPath}')` } as any}
            initial={{ offsetDistance: "100%", opacity: 0, scale: 0 }}
            animate={{ offsetDistance: "0%", opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
          >
            <circle r="2.5" fill={accentColor} filter="url(#capsuleGlow)" />
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  );
}
