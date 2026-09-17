import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { THEMES, getInitialTheme } from './lib/theme';
import { soundEngine } from './lib/audio';
import { haptic } from './lib/haptics';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, JOURNEY_STAGES } from './data/portfolioData';

// Components
import { BackgroundDecor } from './components/BackgroundDecor';
import { DigitalTwinHUD } from './components/DigitalTwinHUD';
import { ArchitectureCaseStudies } from './components/ArchitectureCaseStudies';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactSection } from './components/ContactSection';
import { TerminalComponent } from './components/Terminal';
import { CommandPalette } from './components/CommandPalette';
import { ThemeGalleryModal } from './components/ThemeGalleryModal';
import { RecruiterToolkitModal } from './components/RecruiterToolkitModal';

// Icons
import {
  Bot,
  Sliders,
  Volume2,
  VolumeX,
  ExternalLink,
  Code,
  Palette,
  ArrowUpRight,
  CheckCircle,
  Share2,
  Copy,
  Check,
  Globe,
  X,
  Send,
  Linkedin,
  Github,
  Mail,
  GraduationCap,
  Sparkles,
  Layers,
  Terminal as TermIcon,
  Briefcase,
  FileText,
  Network,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeMode>(getInitialTheme());
  const theme = THEMES[currentThemeId];

  // Audio state
  const [isAudioMuted, setIsAudioMuted] = useState(soundEngine.getMuted());

  // Command Palette
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Project Category Filter
  const [activeProjectCategory, setActiveProjectCategory] = useState<string>('All');

  // Share Modal State
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Theme Gallery Modal State
  const [showThemeGallery, setShowThemeGallery] = useState(false);

  // Recruiter Toolkit Modal State
  const [showRecruiterToolkit, setShowRecruiterToolkit] = useState(false);

  const CANONICAL_PUBLIC_URL = 'https://ais-pre-5imutcwjrbkq4l46sh6teo-433415658876.asia-southeast1.run.app';

  const getEffectiveShareUrl = () => {
    if (typeof window !== 'undefined' && window.location.origin && window.location.origin.startsWith('http')) {
      return window.location.origin;
    }
    return CANONICAL_PUBLIC_URL;
  };

  const handleCopyShareLink = async () => {
    const url = getEffectiveShareUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback
    }
    setCopiedShareLink(true);
    soundEngine.playBoot();
    haptic.trigger('success');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.15 } });
    setTimeout(() => setCopiedShareLink(false), 2500);
  };

  // Global keyboard shortcut for Command Palette (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setCurrentThemeId(newTheme);
    localStorage.setItem('riyanshu_theme', newTheme);
    soundEngine.playBoot();
    haptic.trigger('medium');
  };

  const toggleAudioMute = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    soundEngine.setMuted(next);
    haptic.trigger('light');
  };

  const scrollToSection = (id: string) => {
    soundEngine.playClick();
    haptic.trigger('light');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter projects
  const filteredProjects = activeProjectCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.toLowerCase().includes(activeProjectCategory.toLowerCase()));

  const projectCategories = ['All', 'Computer Vision', 'Generative AI', 'Machine Learning', 'NLP'];

  return (
    <div
      className="min-h-screen relative text-[#e7e9f0] selection:bg-cyan-400 selection:text-black transition-colors duration-500 overflow-x-hidden font-sans"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Dynamic Atmospheric Background Engine (Volumetric lighting, Aurora orbs, 3D neural brain, masked tech matrix & cursor spotlight) */}
      <BackgroundDecor theme={theme} />

      {/* FIXED NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/60 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Logo & Callsign */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-black shadow-lg"
              style={{ background: theme.primary }}
            >
              RK
            </div>
            <div>
              <span className="font-['Space_Grotesk'] font-bold text-white tracking-wider text-base">
                RIYANSHU<span style={{ color: theme.primary }}>.AI</span>
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AI / ML ENGINEER · GEU</span>
              </div>
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-5 text-xs font-mono text-gray-300">
            <button onClick={() => scrollToSection('about')} className="hover:text-cyan-300 transition-colors">
              // 01 ABOUT
            </button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-cyan-300 transition-colors">
              // 02 PROJECTS
            </button>
            <button onClick={() => scrollToSection('architecture')} className="hover:text-cyan-300 transition-colors">
              // 03 ARCHITECTURE
            </button>
            <button onClick={() => scrollToSection('digital-twin')} className="hover:text-cyan-300 transition-colors">
              // 04 AI TWIN
            </button>
            <button onClick={() => scrollToSection('education')} className="hover:text-cyan-300 transition-colors">
              // 05 ACADEMICS
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-300 transition-colors">
              // 06 CONTACT
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* Recruiter Pack Button */}
            <button
              onClick={() => {
                setShowRecruiterToolkit(true);
                soundEngine.playBoot();
                haptic.trigger('medium');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-xs font-mono text-emerald-300 hover:text-white transition-all shadow-sm group"
              title="Open Recruiter Toolkit (ATS Blurb & 1-Page Resume)"
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="font-bold hidden sm:inline">RECRUITER PACK</span>
            </button>

            {/* Theme Selector */}
            <div className="relative group">
              <button
                onClick={() => setShowThemeGallery(true)}
                className="p-2 rounded-xl bg-black/40 border border-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono group-hover:border-cyan-400/40"
                title="Open Theme Gallery (12 Palettes)"
              >
                <Palette className="w-4 h-4" style={{ color: theme.primary }} />
                <span className="hidden sm:inline font-bold">{theme.name.split(' ')[0]}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-cyan-300 font-mono hidden md:inline">
                  12
                </span>
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-[#0d111c] border border-white/15 rounded-xl p-2 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all font-mono text-xs z-50">
                <div className="px-2 py-1 text-[10px] uppercase font-bold text-gray-400 border-b border-white/10 mb-1 flex justify-between items-center">
                  <span>12 Neural Palettes</span>
                  <button
                    onClick={() => setShowThemeGallery(true)}
                    className="text-cyan-400 hover:text-white"
                  >
                    View All
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-0.5 pr-1">
                  {(Object.keys(THEMES) as ThemeMode[]).map((tKey) => (
                    <button
                      key={tKey}
                      onClick={() => handleThemeChange(tKey)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between text-xs ${
                        currentThemeId === tKey ? 'bg-white/15 text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="truncate">{THEMES[tKey].name}</span>
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 ml-2"
                        style={{ background: THEMES[tKey].primary }}
                      />
                    </button>
                  ))}
                </div>
                <div className="pt-2 mt-1 border-t border-white/10">
                  <button
                    onClick={() => setShowThemeGallery(true)}
                    className="w-full py-1.5 px-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white text-center text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>Theme Gallery Modal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Audio Mute/Unmute */}
            <button
              onClick={toggleAudioMute}
              className={`p-2 rounded-xl border transition-all ${
                isAudioMuted
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-black/40 border-white/10 text-cyan-400'
              }`}
              title={isAudioMuted ? 'Unmute UI Audio' : 'Mute UI Audio'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Share Public Live Link Button */}
            <button
              onClick={handleCopyShareLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-xs font-mono text-cyan-300 hover:text-white transition-all shadow-sm"
              title="Copy public live URL to share"
            >
              {copiedShareLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
              <span className="font-bold">{copiedShareLink ? 'COPIED!' : 'SHARE'}</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-all"
              title="Command Palette (⌘K)"
            >
              <span>⌘K</span>
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 pt-28 pb-20">
        {/* HERO SECTION */}
        <section className="min-h-[85vh] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6 pt-8">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>GRAPHIC ERA UNIVERSITY · APNA COLLEGE PRIME CERTIFIED</span>
            </div>

            {/* Main Display Title */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-['Space_Grotesk'] tracking-tight text-white leading-none">
              RIYANSHU <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(120deg, ${theme.primary}, ${theme.secondary})`,
                }}
              >
                KANDWAL
              </span>
            </h1>

            {/* Tagline */}
            <div className="text-lg sm:text-2xl font-mono tracking-wide" style={{ color: theme.primary }}>
              AI / ML ENGINEER // GENERATIVE AI &amp; COMPUTER VISION
            </div>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-light">
              Undergraduate at Graphic Era University specializing in real-time neural style transfer (AdaIN in PyTorch), explainable ML (Random Forest + SHAP), multimodal AI digital twins, and autonomous multi-agent pipelines. 500+ algorithmic problems solved across LeetCode and GeeksforGeeks.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2 transition-all shadow-xl hover:scale-105"
                style={{ background: theme.primary }}
              >
                <Code className="w-4 h-4" />
                <span>Explore Shipped Projects</span>
              </button>

              <button
                onClick={() => {
                  setShowRecruiterToolkit(true);
                  soundEngine.playBoot();
                  haptic.trigger('medium');
                }}
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 hover:text-white hover:bg-emerald-500/25 transition-all flex items-center gap-2 shadow-lg hover:scale-105"
              >
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Recruiter Pack &amp; ATS Resume</span>
              </button>

              <button
                onClick={() => scrollToSection('sandboxes')}
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-black/60 border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-2 shadow-lg"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Interactive ML Lab</span>
              </button>

              <button
                onClick={() => scrollToSection('architecture')}
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-cyan-300 hover:text-white hover:border-cyan-400 transition-all flex items-center gap-2"
              >
                <Network className="w-4 h-4 text-cyan-400" />
                <span>Architecture Deep-Dives</span>
              </button>

              <button
                onClick={() => scrollToSection('digital-twin')}
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-violet-400 transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-violet-400" />
                <span>Ask AI Digital Twin</span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Riyanshu</span>
              </button>
            </div>

            {/* 12 Live Themes Quick Switcher Strip */}
            <div className="p-4 bg-black/60 border border-white/15 rounded-2xl backdrop-blur-md space-y-2.5 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" style={{ color: theme.primary }} />
                  <span className="text-gray-300">
                    ACTIVE PALETTE:{' '}
                    <strong className="text-white uppercase tracking-wider">{theme.name}</strong>
                  </span>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold hidden sm:inline"
                    style={{
                      background: `${theme.primary}20`,
                      color: theme.primary,
                      border: `1px solid ${theme.primary}40`,
                    }}
                  >
                    {theme.tag}
                  </span>
                </div>
                <button
                  onClick={() => setShowThemeGallery(true)}
                  className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1 border-b border-cyan-400/40 pb-0.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>EXPLORE ALL 12 THEMES</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              {/* Responsive Theme Pills */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 pt-1">
                {(Object.keys(THEMES) as ThemeMode[]).map((tKey) => {
                  const t = THEMES[tKey];
                  const isActive = currentThemeId === tKey;
                  return (
                    <button
                      key={tKey}
                      onClick={() => handleThemeChange(tKey)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all truncate text-left ${
                        isActive
                          ? 'bg-white/20 text-white font-bold border shadow-md'
                          : 'bg-black/40 text-gray-400 hover:text-white border border-white/10 hover:border-white/25 hover:bg-white/5'
                      }`}
                      style={{
                        borderColor: isActive ? t.primary : undefined,
                      }}
                      title={`${t.name} (${t.tag}): ${t.description}`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: t.primary }}
                      />
                      <span className="text-[11px] truncate">{t.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Public Live Preview Link Bar */}
            <div 
              className="p-4 border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl backdrop-blur-md"
              style={{
                backgroundColor: `${theme.panel}f2`,
                borderColor: `${theme.primary}35`,
                boxShadow: `0 0 35px ${theme.primary}12`,
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${theme.primary}20`,
                    borderColor: `${theme.primary}40`,
                    color: theme.primary,
                  }}
                >
                  <Globe className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="uppercase font-bold tracking-wider" style={{ color: theme.primary }}>PUBLIC LIVE LINK</span>
                    <span className="text-gray-400 hidden sm:inline">• Shareable with recruiters worldwide</span>
                  </div>
                  <div className="font-mono text-xs truncate select-all mt-0.5 text-gray-200">
                    {CANONICAL_PUBLIC_URL}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyShareLink}
                  className="px-4 py-2.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-105"
                  style={{
                    background: `linear-gradient(to right, ${theme.primary}30, ${theme.secondary}30)`,
                    borderColor: `${theme.primary}60`,
                    color: '#fff',
                  }}
                >
                  {copiedShareLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedShareLink ? 'LINK COPIED!' : 'COPY LINK'}</span>
                </button>
                <a
                  href={CANONICAL_PUBLIC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all flex items-center justify-center"
                  title="Open live URL in full browser tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Verified Track Record Badges (100% Real) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <div 
                className="p-3.5 border rounded-xl font-mono space-y-0.5"
                style={{ backgroundColor: `${theme.panel}99`, borderColor: 'rgba(255, 255, 255, 0.08)' }}
              >
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-[11px] font-semibold" style={{ color: theme.primary }}>DSA Solved (LeetCode &amp; GFG)</div>
              </div>
              <div 
                className="p-3.5 border rounded-xl font-mono space-y-0.5"
                style={{ backgroundColor: `${theme.panel}99`, borderColor: 'rgba(255, 255, 255, 0.08)' }}
              >
                <div className="text-2xl font-bold text-white">14</div>
                <div className="text-[11px] font-semibold" style={{ color: theme.secondary }}>Public GitHub Repos</div>
              </div>
              <div 
                className="p-3.5 border rounded-xl font-mono space-y-0.5"
                style={{ backgroundColor: `${theme.panel}99`, borderColor: 'rgba(255, 255, 255, 0.08)' }}
              >
                <div className="text-2xl font-bold text-white">9+</div>
                <div className="text-[11px] font-semibold" style={{ color: theme.accent }}>Shipped ML Systems</div>
              </div>
              <div 
                className="p-3.5 border rounded-xl font-mono space-y-0.5"
                style={{ backgroundColor: `${theme.panel}99`, borderColor: 'rgba(255, 255, 255, 0.08)' }}
              >
                <div className="text-2xl font-bold text-white">BCA</div>
                <div className="text-[11px] font-semibold" style={{ color: theme.primary }}>Graphic Era University</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-28">
          {/* SECTION 01: IDENTITY & TERMINAL */}
          <section id="about" className="space-y-8 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: theme.primary }}>
                01 // IDENTITY &amp; PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white">
                An AI/ML Engineer who ships working systems — not theoretical slides.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Profile Card */}
              <div 
                className="lg:col-span-5 border rounded-2xl p-6 sm:p-8 space-y-6 backdrop-blur-md"
                style={{
                  backgroundColor: `${theme.panel}d9`,
                  borderColor: `${theme.primary}25`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold font-['Space_Grotesk'] text-2xl shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                      color: '#000',
                    }}
                  >
                    RK
                  </div>
                  <div>
                    <h3 className="font-bold text-white font-['Space_Grotesk'] text-xl">
                      {PERSONAL_INFO.name}
                    </h3>
                    <div className="text-xs font-mono font-semibold" style={{ color: theme.primary }}>
                      {PERSONAL_INFO.role}
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">{PERSONAL_INFO.location}</div>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  <p>
                    I build the neural architectures, computer vision pipelines, and agentic workflows behind intelligent software.
                  </p>
                  <p>
                    Passionate about deep learning with PyTorch, convolutional feature alignment (AdaIN), explainable AI (SHAP), and building production-grade full-stack applications.
                  </p>
                </div>

                {/* Direct Links */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-300 hover:bg-blue-500/20 text-xs font-mono flex items-center gap-1.5 transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-purple-500/10 border border-purple-400/30 text-purple-300 hover:bg-purple-500/20 text-xs font-mono flex items-center gap-1.5 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 hover:bg-amber-500/20 text-xs font-mono flex items-center gap-1.5 transition-all"
                  >
                    <span>LeetCode</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.geeksforgeeks}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-mono flex items-center gap-1.5 transition-all"
                  >
                    <span>GFG</span>
                  </a>
                </div>
              </div>

              {/* Interactive Terminal for developers */}
              <div className="lg:col-span-7">
                <TerminalComponent theme={theme} onSelectTheme={handleThemeChange} />
              </div>
            </div>
          </section>

          {/* SECTION 02: PROJECTS SHOWCASE */}
          <section id="projects" className="space-y-8 scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: theme.primary }}>
                  02 // SHIPPED SYSTEMS
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white mt-1">
                  Real Repositories. Real Machine Learning.
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 max-w-xl mt-1">
                  Explore 9+ verified AI &amp; deep learning projects built by Riyanshu with public source code and interactive architecture demos.
                </p>
              </div>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono flex items-center gap-1.5 border-b pb-1 transition-colors hover:text-white"
                style={{ color: theme.primary, borderColor: `${theme.primary}50` }}
              >
                <span>VIEW ALL 14 REPOSITORIES ON GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 pt-2">
              {projectCategories.map((cat) => {
                const isActive = activeProjectCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveProjectCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
                      isActive
                        ? 'font-bold shadow-md border'
                        : 'bg-black/40 border border-white/10 text-gray-400 hover:text-white'
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: `${theme.primary}25`,
                            borderColor: theme.primary,
                            color: '#fff',
                          }
                        : {}
                    }
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="border rounded-2xl p-6 sm:p-7 space-y-4 transition-all flex flex-col justify-between group hover:translate-y-[-2px]"
                  style={{
                    backgroundColor: proj.flagship ? `${theme.panel}f2` : `${theme.panel}bf`,
                    borderColor: proj.flagship ? `${theme.primary}50` : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: proj.flagship ? `0 0 35px ${theme.primary}15` : undefined,
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span 
                          className="text-[10px] font-mono uppercase tracking-widest font-semibold"
                          style={{ color: theme.primary }}
                        >
                          {proj.category}
                        </span>
                        <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white mt-0.5 group-hover:text-cyan-200 transition-colors">
                          {proj.title}
                        </h3>
                      </div>
                      {proj.badge && (
                        <span
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider"
                          style={
                            proj.flagship
                              ? {
                                  backgroundColor: `${theme.primary}20`,
                                  color: theme.primary,
                                  border: `1px solid ${theme.primary}40`,
                                }
                              : {
                                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                  color: '#cbd5e1',
                                  border: '1px solid rgba(255, 255, 255, 0.12)',
                                }
                          }
                        >
                          {proj.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                      {proj.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {proj.highlights.map((h, i) => (
                        <div key={i} className="text-xs font-mono text-gray-400 flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/5 text-gray-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-mono hover:text-white flex items-center gap-1.5 transition-colors"
                          style={{ color: theme.primary }}
                        >
                          <Code className="w-3.5 h-3.5" />
                          <span>SOURCE CODE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {proj.interactiveDemo && (
                        <button
                          onClick={() => scrollToSection('sandboxes')}
                          className="text-xs font-mono hover:text-white flex items-center gap-1.5 font-bold transition-colors"
                          style={{ color: theme.secondary }}
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>TEST IN ML LAB</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 03: ARCHITECTURE CASE STUDIES */}
          <section id="architecture" className="scroll-mt-24">
            <ArchitectureCaseStudies theme={theme} />
          </section>

          {/* SECTION 04: AETHER 3D DIGITAL TWIN CHAT */}
          <section id="digital-twin" className="space-y-6 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: theme.primary }}>
                04 // AI CONVERSATIONAL TWIN
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white">
                AETHER — 3D AI Digital Twin
              </h2>
              <p className="text-sm text-gray-300 font-light max-w-2xl">
                Trained on Riyanshu's verified background, projects, LeetCode problem solving, and engineering philosophies. Ask questions about his work!
              </p>
            </div>

            <DigitalTwinHUD theme={theme} />
          </section>

          {/* SECTION 05: EDUCATION & CERTIFICATIONS */}
          <section id="education" className="scroll-mt-24">
            <EducationCertifications theme={theme} />
          </section>

          {/* SECTION 06: TECHNICAL SKILLS MATRIX */}
          <section id="skills" className="space-y-8 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: theme.primary }}>
                06 // TECHNICAL ARSENAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white">
                Skills, Frameworks &amp; Deep Learning Stack
              </h2>
              <p className="text-sm text-gray-300 max-w-2xl font-light">
                Proficiencies built through daily problem-solving, training neural models, and deploying web services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div 
                  key={idx} 
                  className="border rounded-2xl p-6 space-y-4 backdrop-blur-md transition-all hover:translate-y-[-2px]"
                  style={{
                    backgroundColor: `${theme.panel}cc`,
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <h4 
                    className="text-xs font-mono uppercase tracking-wider font-bold"
                    style={{ color: theme.primary }}
                  >
                    {cat.name}
                  </h4>
                  <div className="space-y-3">
                    {cat.skills.map((s, i) => (
                      <div key={i} className="space-y-0.5 border-b border-white/5 pb-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-white font-medium">{s.name}</span>
                          <span className="text-[11px]" style={{ color: theme.secondary }}>{s.level}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-tight font-light">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 07: LEARNING & ENGINEERING JOURNEY */}
          <section id="journey" className="space-y-8 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: theme.primary }}>
                07 // MILESTONES
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white">
                Engineering Journey &amp; Milestones
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {JOURNEY_STAGES.map((item, idx) => (
                <div
                  key={idx}
                  className="border rounded-2xl p-5 space-y-3 transition-all backdrop-blur-md hover:translate-y-[-2px]"
                  style={{
                    backgroundColor: `${theme.panel}99`,
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${theme.primary}15`,
                        color: theme.primary,
                        border: `1px solid ${theme.primary}30`,
                      }}
                    >
                      {item.stage}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">{item.tech}</span>
                  </div>
                  <h4 className="text-base font-bold font-['Space_Grotesk'] text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 08: DIRECT CONTACT & CONNECT */}
          <section id="contact" className="scroll-mt-24">
            <ContactSection theme={theme} />
          </section>

          {/* FOOTER */}
          <footer className="pt-10 pb-16 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs"
                  style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
                >
                  RK
                </div>
                <div>
                  <span className="text-white font-semibold">{PERSONAL_INFO.name}</span> · Graphic Era University
                  <div className="text-[11px] text-gray-500">Dehradun, Uttarakhand, India</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-cyan-300 transition-colors"
                >
                  LINKEDIN
                </a>
                <span>·</span>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-cyan-300 transition-colors"
                >
                  GITHUB
                </a>
                <span>·</span>
                <a
                  href={PERSONAL_INFO.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-cyan-300 transition-colors"
                >
                  LEETCODE
                </a>
                <span>·</span>
                <a
                  href={PERSONAL_INFO.geeksforgeeks}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-cyan-300 transition-colors"
                >
                  GFG
                </a>
                <span>·</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-gray-300 hover:text-cyan-300 transition-colors"
                >
                  EMAIL
                </a>
              </div>

              <div className="text-[11px] text-gray-500">
                © {new Date().getFullYear()} {PERSONAL_INFO.name}. All verified.
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* COMMAND PALETTE MODAL */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectTheme={handleThemeChange}
        onNavigate={scrollToSection}
      />

      {/* THEME GALLERY MODAL (12 NEURAL PALETTES) */}
      <ThemeGalleryModal
        isOpen={showThemeGallery}
        currentThemeId={currentThemeId}
        onClose={() => setShowThemeGallery(false)}
        onSelectTheme={handleThemeChange}
      />

      {/* RECRUITER TOOLKIT MODAL */}
      <RecruiterToolkitModal
        isOpen={showRecruiterToolkit}
        onClose={() => setShowRecruiterToolkit(false)}
        theme={theme}
      />

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="w-full max-w-lg bg-[#0d111c] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative space-y-6"
            style={{ boxShadow: `0 0 40px ${theme.primary}20` }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Share Portfolio</h3>
                  <p className="text-xs font-mono text-gray-400">Public Live URL for recruiters &amp; collaborators</p>
                </div>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-cyan-300 uppercase tracking-wider block">
                Public Live Link
              </label>
              <div className="flex items-center gap-2 p-2.5 bg-black/70 border border-white/15 rounded-xl font-mono text-xs text-gray-200">
                <span className="truncate flex-1 select-all">{CANONICAL_PUBLIC_URL}</span>
                <button
                  onClick={handleCopyShareLink}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-1 shrink-0"
                >
                  {copiedShareLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedShareLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs font-mono text-gray-400 border-t border-white/10">
              <span>Optimized for desktop &amp; mobile browsers</span>
              <a
                href={CANONICAL_PUBLIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                <span>Open Fullscreen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
