import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Linkedin, Github, Send, Loader, CheckCircle } from 'lucide-react';

function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required = true,
  rows,
  value,
  onChange
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col text-left">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 pl-1">
        {label}
      </label>
      {rows ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-xs font-semibold text-white bg-white/[0.02] border border-white/5 focus:border-[#6C63FF]/40 focus:ring-1 focus:ring-[#6C63FF]/30 transition-all outline-none resize-none placeholder-slate-650"
        />
      ) : (
        <input
          name={name}
          required={required}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-xs font-semibold text-white bg-white/[0.02] border border-white/5 focus:border-[#6C63FF]/40 focus:ring-1 focus:ring-[#6C63FF]/30 transition-all outline-none placeholder-slate-650"
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen lg:h-screen flex flex-col justify-center py-16 lg:py-0 overflow-hidden border-t border-white/5 bg-transparent"
    >
      {/* Ambient Orbs - Matching Hero Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.18)_0%,rgba(245,158,11,0.04)_35%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(108,99,255,0.2)_0%,rgba(59,130,246,0.05)_35%,transparent_65%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* ── Left Side: Call to Action (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col text-left">

            
            <h2 className="text-3xl md:text-4.5xl font-black tracking-tight text-white font-grotesk mb-4 leading-tight">
              Let's Build <br />
              <span className="text-white">Something Amazing</span>
            </h2>
            
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              Open to opportunities, collaborations, and technological innovations. Get in touch, I will respond within 24 hours.
            </p>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              {[
                { icon: Mail, label: 'Email', value: portfolioData.contact.email, href: `mailto:${portfolioData.contact.email}`, color: '#6C63FF' },
                { icon: Linkedin, label: 'LinkedIn', value: 'Sasivarnan RS', href: portfolioData.contact.linkedin, color: '#f59e0b' },
                { icon: Github, label: 'GitHub', value: 'sasivarnanRS', href: portfolioData.contact.github, color: '#8B5CF6' }
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4, borderColor: `${item.color}40` }}
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-white/5 bg-white/[0.01] transition-all duration-300 group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300"
                    style={{
                      backgroundColor: `${item.color}10`,
                      borderColor: `${item.color}25`,
                      color: item.color
                    }}
                  >
                    <item.icon size={14} />
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">{item.label}</span>
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{item.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Right Side: Contact Form (7 cols) ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md relative"
              style={{
                boxShadow: 'inset 0 0 20px rgba(255,255,255,0.01)'
              }}
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle size={48} className="text-emerald-400" />
                    </motion.div>
                    <h3 className="text-lg font-black text-white font-grotesk">Message Transmitted</h3>
                    <p className="text-xs text-slate-400">Thank you! Your message has been received.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        label="Name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(val) => setFormData((prev) => ({ ...prev, name: val }))}
                      />
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(val) => setFormData((prev) => ({ ...prev, email: val }))}
                      />
                    </div>
                    
                    <FormField
                      label="Subject"
                      name="subject"
                      placeholder="Project collaboration / Inquiry"
                      value={formData.subject}
                      onChange={(val) => setFormData((prev) => ({ ...prev, subject: val }))}
                    />

                    <FormField
                      label="Message"
                      name="message"
                      rows={4}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(val) => setFormData((prev) => ({ ...prev, message: val }))}
                    />

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={status === 'idle' ? { scale: 1.02, boxShadow: '0 0 24px rgba(108,99,255,0.4)' } : {}}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 bg-[#6C63FF] disabled:opacity-75 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#6C63FF]/20 relative overflow-hidden"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader size={14} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={13} />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
