import React, { useState } from 'react';
import { ThemeColors } from '../types';
import { Mail, Linkedin, Github, ExternalLink, Copy, Check, Send, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundEngine } from '../lib/audio';
import { haptic } from '../lib/haptics';

interface ContactSectionProps {
  theme: ThemeColors;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    soundEngine.playBoot();
    haptic.trigger('success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    soundEngine.playSuccess();
    haptic.trigger('success');
    setFormSubmitted(true);

    // Open mail client with pre-filled content
    const subject = encodeURIComponent(`Inquiry from ${formState.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(`${formState.message}\n\nFrom: ${formState.name} (${formState.email})`);
    window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-mono text-cyan-300">
          <Mail className="w-3.5 h-3.5" />
          <span>DIRECT COMMUNICATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white">
          Let's Build Something Meaningful
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-light">
          Whether you have an ambitious AI/ML engineering role, a challenging research collaboration, or want to discuss machine learning architectures, my inbox is always open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Social Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Email Card */}
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-500/30 transition-all backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-gray-400">EMAIL ADDRESS</div>
                <div className="text-sm sm:text-base font-semibold text-white break-all">
                  {PERSONAL_INFO.email}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleCopyEmail}
                className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 hover:text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'EMAIL COPIED!' : 'COPY EMAIL'}</span>
              </button>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span>OPEN CLIENT</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-4">
            <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              VERIFIED PROFILES
            </div>

            <div className="space-y-2.5">
              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-black/50 border border-white/10 hover:border-blue-400/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                      LinkedIn Profile
                    </div>
                    <div className="text-[11px] font-mono text-gray-400 truncate max-w-[200px]">
                      in/riyanshu-kandwal-555433309
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-black/50 border border-white/10 hover:border-purple-400/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                      GitHub Repositories
                    </div>
                    <div className="text-[11px] font-mono text-gray-400">
                      @Riyanshu-07 · 14 Repos
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
              </a>

              {/* Location Badge */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex items-center gap-3 text-xs font-mono text-gray-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Dehradun, Uttarakhand, India · Available for Remote &amp; On-Site Roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md relative">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">Send Direct Message</h3>
            </div>

            {formSubmitted ? (
              <div className="p-8 text-center space-y-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30">
                <div className="w-12 h-12 rounded-full bg-emerald-400/20 border border-emerald-400/40 mx-auto flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Message Prepared!
                </h4>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  Your email client has been opened with your message to {PERSONAL_INFO.email}. Looking forward to connecting with you!
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 block">YOUR NAME</label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 block">YOUR EMAIL *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300 block">MESSAGE *</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hi Riyanshu, I checked out your AdaIN style transfer and SmartFocus projects and would love to connect regarding..."
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-[1.01]"
                  style={{ background: theme.primary }}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message Directly</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
