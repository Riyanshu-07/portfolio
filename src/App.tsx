import React, { useState, useEffect } from 'react';
import { ThemeMode, BenchmarkMetrics } from './types';
import { THEMES, getInitialTheme } from './lib/theme';
import { soundEngine } from './lib/audio';
import { haptic } from './lib/haptics';
import { antiCheat } from './lib/anticheat';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, JOURNEY_STAGES } from './data/portfolioData';

// Components
import { ThreeCanvas } from './components/ThreeCanvas';
import { DigitalTwinHUD } from './components/DigitalTwinHUD';
import { MLSandboxes } from './components/MLSandboxes';
import { PhysicsPlayground } from './components/PhysicsPlayground';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SocialLeaderboard } from './components/SocialLeaderboard';
import { TerminalComponent } from './components/Terminal';
import { CommandPalette } from './components/CommandPalette';
import { OnboardingModal } from './components/OnboardingModal';

// Icons
import {
  Bot,
  Sparkles,
  Sliders,
  Volume2,
  VolumeX,
  Trophy,
  Activity,
  Terminal as TermIcon,
  ExternalLink,
  Code,
  Compass,
  ShieldCheck,
  Palette,
  Cpu,
  Zap,
  ArrowUpRight,
  Music,
  CheckCircle,
  Award,
} from 'lucide-react';

export default function App() {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeMode>(getInitialTheme());
  const theme = THEMES[currentThemeId];

  // Audio / Haptic State
  const [isAudioMuted, setIsAudioMuted] = useState(soundEngine.getMuted());
  const [isAmbientActive, setIsAmbientActive] = useState(false);

  // Command Palette & Onboarding State
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  // System Telemetry state
  const [metrics, setMetrics] = useState<BenchmarkMetrics>({
    fps: 60,
    frameTimeMs: 14.2,
    renderLatencyMs: 16,
    activeParticles: 1800,
    antiCheatStatus: 'SECURE',
    audioSyncLatencyMs: 8,
    gpuDrawCalls: 42,
  });

  // Check first time visitor for onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('riyanshu_onboarding_completed');
    if (!hasSeenOnboarding) {
      setOnboardingOpen(true);
    }

    // Global keyboard shortcut for Command Palette (⌘K or Ctrl+K)
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

  const toggleAmbient = () => {
    const active = soundEngine.toggleAmbient();
    setIsAmbientActive(active);
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

  const handleFpsUpdate = (fps: number, latency: number, particles: number) => {
    setMetrics((prev) => ({
      ...prev,
      fps,
      frameTimeMs: latency,
      activeParticles: particles,
    }));
  };

  return (
    <div
      className="min-h-screen relative text-[#e7e9f0] selection:bg-cyan-400 selection:text-black transition-colors duration-500 overflow-x-hidden font-sans"
      style={{ backgroundColor: theme.bg }}
    >
      {/* 3D Visualizer Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <ThreeCanvas theme={theme} onFpsUpdate={handleFpsUpdate} />
      </div>

      {/* Cyber Grid Texture Overlay */}
      <div
        className="fixed inset-0 z-1 pointer-events-none opacity-25"
        style={{
          backgroundImage: `linear-gradient(to right, ${theme.border} 1px, transparent 1px), linear-gradient(to bottom, ${theme.border} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* FIXED NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/60 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Logo & Callsign */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-black shadow-lg"
              style={{ background: theme.primary }}
            >
              R
            </div>
            <div>
              <span className="font-['Space_Grotesk'] font-bold text-white tracking-wider text-base">
                RIYANSHU<span style={{ color: theme.primary }}>.OS</span>
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE // AI ENGINEER</span>
              </div>
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-gray-300">
            <button onClick={() => scrollToSection('about')} className="hover:text-cyan-300 transition-colors">
              // 01 IDENTITY
            </button>
            <button onClick={() => scrollToSection('journey')} className="hover:text-cyan-300 transition-colors">
              // 02 JOURNEY
            </button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-cyan-300 transition-colors">
              // 03 PROJECTS
            </button>
            <button onClick={() => scrollToSection('sandboxes')} className="hover:text-cyan-300 transition-colors">
              // 04 ML SANDBOX
            </button>
            <button onClick={() => scrollToSection('digital-twin')} className="hover:text-cyan-300 transition-colors">
              // 05 AI TWIN
            </button>
            <button onClick={() => scrollToSection('physics')} className="hover:text-cyan-300 transition-colors">
              // 06 PHYSICS
            </button>
            <button onClick={() => scrollToSection('analytics')} className="hover:text-cyan-300 transition-colors">
              // 07 TELEMETRY
            </button>
            <button onClick={() => scrollToSection('leaderboard')} className="hover:text-cyan-300 transition-colors">
              // 08 LEADERBOARD
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* Theme Selector */}
            <div className="relative group">
              <button
                className="p-2 rounded-xl bg-black/40 border border-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
                title="Change Theme"
              >
                <Palette className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">{theme.name.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 mt-2 w-44 bg-[#0d111c] border border-white/15 rounded-xl p-1.5 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all font-mono text-xs">
                {(Object.keys(THEMES) as ThemeMode[]).map((tKey) => (
                  <button
                    key={tKey}
                    onClick={() => handleThemeChange(tKey)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                      currentThemeId === tKey ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{THEMES[tKey].name}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: THEMES[tKey].primary }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Synth Drone Toggle */}
            <button
              onClick={toggleAmbient}
              className={`p-2 rounded-xl border transition-all ${
                isAmbientActive
                  ? 'bg-violet-500/20 border-violet-400 text-violet-300'
                  : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
              }`}
              title={isAmbientActive ? 'Ambient Drone: Active' : 'Enable Ambient Synth'}
            >
              <Music className="w-4 h-4" />
            </button>

            {/* Audio Mute/Unmute */}
            <button
              onClick={toggleAudioMute}
              className={`p-2 rounded-xl border transition-all ${
                isAudioMuted
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-black/40 border-white/10 text-cyan-400'
              }`}
              title={isAudioMuted ? 'Unmute Audio' : 'Mute Spatial Audio'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-all"
            >
              <span>⌘K</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative z-10 pt-28 pb-20">
        <section className="min-h-[85vh] flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6 pt-8">
            {/* Holographic Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>AETHER 3D DIGITAL TWIN &amp; NEURAL CORE INITIALIZED</span>
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
              Nine shipped systems across real-time neural style transfer (AdaIN in PyTorch), explainable ML (Random Forest + SHAP), multimodal 3D digital twins, and autonomous multi-agent pipelines.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection('sandboxes')}
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2 transition-all shadow-xl hover:scale-105"
                style={{ background: theme.primary }}
              >
                <Sliders className="w-4 h-4" />
                <span>Launch ML Sandboxes</span>
              </button>

              <button
                onClick={() => scrollToSection('digital-twin')}
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-black/60 border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-2 shadow-lg"
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>Chat with 3D AI Twin</span>
              </button>

              <button
                onClick={() => scrollToSection('physics')}
                className="px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-violet-400 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-violet-400" />
                <span>Quantum Physics Arena</span>
              </button>
            </div>

            {/* Verified Track Record Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-white/10">
              <div className="p-3 bg-black/40 border border-white/10 rounded-xl font-mono">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-[11px] text-cyan-400">DSA Problems Solved</div>
              </div>
              <div className="p-3 bg-black/40 border border-white/10 rounded-xl font-mono">
                <div className="text-2xl font-bold text-white">14</div>
                <div className="text-[11px] text-violet-400">Public Repositories</div>
              </div>
              <div className="p-3 bg-black/40 border border-white/10 rounded-xl font-mono">
                <div className="text-2xl font-bold text-white">9+</div>
                <div className="text-[11px] text-emerald-400">Shipped ML Projects</div>
              </div>
              <div className="p-3 bg-black/40 border border-white/10 rounded-xl font-mono">
                <div className="text-2xl font-bold text-white">BCA</div>
                <div className="text-[11px] text-amber-400">Graphic Era University</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-28">
          {/* SECTION 01: IDENTITY & TERMINAL */}
          <section id="about" className="space-y-8 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">01 // IDENTITY.EXE</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white">
                An AI/ML Engineer who ships working systems — not theoretical slides.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4 text-gray-300 leading-relaxed font-light text-base">
                <p>
                  I'm <strong className="text-white font-semibold">Riyanshu Kandwal</strong> — an AI/ML Engineer and BCA student at Graphic Era University in Dehradun. I learn by building, breaking down complex architectures, and turning challenging concepts into end-to-end running software.
                </p>
                <p>
                  My engineering repertoire bridges classical machine learning, PyTorch deep learning, neural style transfer with Adaptive Instance Normalization, computer vision face &amp; voice biometrics, and autonomous multi-agent pipelines orchestrated via Groq and Agno.
                </p>
                <p>
                  With <strong className="text-cyan-300">500+ solved algorithmic problems</strong> in Java on LeetCode and GeeksforGeeks, I enforce strict computational efficiency, clean modularity, and reproducible code across every model I train.
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-gray-300">
                    🎓 BCA (Graphic Era, 2024-2027)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-gray-300">
                    📜 Prime (AI/ML) Apna College
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-gray-300">
                    🌐 Open Source: GSSoC Contributor
                  </span>
                </div>
              </div>

              {/* Interactive Terminal Window */}
              <div className="lg:col-span-6">
                <TerminalComponent
                  theme={theme}
                  onThemeChange={handleThemeChange}
                  onNavigate={scrollToSection}
                />
              </div>
            </div>
          </section>

          {/* SECTION 02: NEURAL JOURNEY TIMELINE */}
          <section id="journey" className="space-y-8 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">02 // NEURAL PATHWAY</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white">
                A sequential progression — every milestone built directly on the last.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {JOURNEY_STAGES.map((j, i) => (
                <div
                  key={i}
                  className="bg-[#0b0e18]/80 border border-white/10 rounded-2xl p-5 space-y-2 hover:border-cyan-400/50 transition-all hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                    <span className="text-cyan-400 font-bold">{j.stage}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5">{j.tech}</span>
                  </div>
                  <h4 className="text-base font-bold font-['Space_Grotesk'] text-white">{j.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{j.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 03: PROJECTS GALAXY */}
          <section id="projects" className="space-y-8 scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">03 // PROJECT GALAXY</span>
                <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white mt-1">
                  Real Repositories. Real Runnable Systems.
                </h2>
              </div>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-1.5 border-b border-cyan-400/40 pb-1"
              >
                <span>VIEW ALL 14 REPOSITORIES ON GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className={`bg-[#0d111c]/90 border rounded-2xl p-6 sm:p-7 space-y-4 transition-all hover:border-cyan-400/60 flex flex-col justify-between ${
                    proj.flagship ? 'border-cyan-400/30 bg-[#0d1220]' : 'border-white/10'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                          {proj.category}
                        </span>
                        <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white mt-0.5">
                          {proj.title}
                        </h3>
                      </div>
                      {proj.badge && (
                        <span
                          className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                            proj.flagship
                              ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40'
                              : 'bg-white/10 text-gray-300 border border-white/15'
                          }`}
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
                          className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1.5"
                        >
                          <Code className="w-3.5 h-3.5" />
                          <span>SOURCE CODE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {proj.interactiveDemo && (
                        <button
                          onClick={() => scrollToSection('sandboxes')}
                          className="text-xs font-mono text-violet-300 hover:text-white flex items-center gap-1.5 font-bold"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>TEST IN SANDBOX</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 04: INTERACTIVE ML SANDBOXES */}
          <section id="sandboxes" className="scroll-mt-24">
            <MLSandboxes theme={theme} />
          </section>

          {/* SECTION 05: AETHER 3D DIGITAL TWIN CHAT */}
          <section id="digital-twin" className="space-y-6 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">05 // MULTIMODAL AVATAR</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white">
                AETHER — 3D AI Digital Twin
              </h2>
              <p className="text-sm text-gray-400 font-light max-w-2xl">
                Trained on Riyanshu's engineering background, projects, algorithms, and philosophies. Features speech synthesis and RAG retrieval memory.
              </p>
            </div>

            <DigitalTwinHUD theme={theme} />
          </section>

          {/* SECTION 06: QUANTUM PHYSICS PLAYGROUND */}
          <section id="physics" className="scroll-mt-24">
            <PhysicsPlayground theme={theme} />
          </section>

          {/* SECTION 07: PERFORMANCE & SYSTEM TELEMETRY */}
          <section id="analytics" className="scroll-mt-24">
            <AnalyticsDashboard theme={theme} metrics={metrics} />
          </section>

          {/* SECTION 08: GLOBAL LEADERBOARD & SOCIAL INVITES */}
          <section id="leaderboard" className="scroll-mt-24">
            <SocialLeaderboard theme={theme} />
          </section>

          {/* SECTION 09: SKILL MATRIX */}
          <section id="skills" className="space-y-8 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">09 // TECHNICAL ARSENAL</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white">
                Skills, Frameworks &amp; Deep Learning Stack
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="bg-[#0d111c]/80 border border-white/10 rounded-2xl p-6 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    {cat.name}
                  </h4>
                  <div className="space-y-3">
                    {cat.skills.map((s, i) => (
                      <div key={i} className="space-y-0.5 border-b border-white/5 pb-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-white font-medium">{s.name}</span>
                          <span className="text-cyan-300 text-[11px]">{s.level}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-tight font-light">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 10: CONNECT & FOOTER */}
          <section id="connect" className="pt-10 pb-16 border-t border-white/10">
            <div className="bg-linear-to-b from-[#0d111c] to-black border border-white/15 rounded-3xl p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center">
                <Zap className="w-8 h-8 text-cyan-300" />
              </div>

              <h3 className="text-3xl sm:text-5xl font-bold font-['Space_Grotesk'] text-white">
                Let's Engineer Intelligent Systems Together.
              </h3>

              <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
                Open to cutting-edge AI/ML engineering roles, deep learning research, generative AI systems, and high-performance software engineering collaborations.
              </p>

              {/* Direct Contact Links */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2 shadow-lg"
                  style={{ background: theme.primary }}
                >
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl font-mono text-xs bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center gap-2 transition-all"
                >
                  <span>GITHUB (Riyanshu-07)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl font-mono text-xs bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center gap-2 transition-all"
                >
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PERSONAL_INFO.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl font-mono text-xs bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center gap-2 transition-all"
                >
                  <span>LEETCODE (500+ SOLVED)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PERSONAL_INFO.geeksforgeeks}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl font-mono text-xs bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center gap-2 transition-all"
                >
                  <span>GEEKSFORGEEKS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Bottom metadata */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-gray-500">
              <div>
                © {new Date().getFullYear()} {PERSONAL_INFO.name} — AI/ML Engineer · Graphic Era University
              </div>
              <div className="flex items-center gap-4">
                <span>BUILD · LEARN · EXPERIMENT · IMPROVE</span>
                <span className="text-cyan-400">PORT 3000 // VERIFIED</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* COMMAND PALETTE MODAL */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectTheme={handleThemeChange}
        onNavigate={scrollToSection}
      />

      {/* ONBOARDING FLOW MODAL */}
      <OnboardingModal
        isOpen={onboardingOpen}
        theme={theme}
        onComplete={() => {
          setOnboardingOpen(false);
          localStorage.setItem('riyanshu_onboarding_completed', 'true');
        }}
      />
    </div>
  );
}
