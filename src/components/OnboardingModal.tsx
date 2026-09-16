import React, { useState, useEffect } from 'react';
import { ThemeColors } from '../types';
import { soundEngine } from '../lib/audio';
import { haptic } from '../lib/haptics';
import { antiCheat } from '../lib/anticheat';
import { Terminal, ShieldCheck, Sparkles, ArrowRight, Check, Bot, Zap, Trophy, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  theme: ThemeColors;
  isOpen: boolean;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ theme, isOpen, onComplete }) => {
  const [phase, setPhase] = useState<'boot' | 'callsign' | 'tour'>('boot');
  const [bootLines, setBootLines] = useState<{ label: string; status: string }[]>([]);
  const [callsignInput, setCallsignInput] = useState(antiCheat.getCallsign() || 'Operator');
  const [tourStep, setTourStep] = useState(0);

  const steps = [
    {
      title: 'AETHER 3D AI Digital Twin',
      icon: <Bot className="w-8 h-8 text-cyan-400" />,
      desc: 'Explore Riyanshu Kandwal’s official AI digital twin powered by real-time speech synthesis, neural memory, and PyTorch architecture explanations.',
      badge: 'MULTIMODAL AI',
    },
    {
      title: 'Interactive ML Sandboxes',
      icon: <Zap className="w-8 h-8 text-violet-400" />,
      desc: 'Test working implementations of AdaIN Neural Style Transfer with live α interpolation, SmartFocus Random Forest with live SHAP explainability, and SnapClass facial biometrics.',
      badge: 'REAL RUNNING CODE',
    },
    {
      title: 'Quantum Physics & Global Leaderboard',
      icon: <Trophy className="w-8 h-8 text-amber-400" />,
      desc: 'Launch particles into gravity wells to rack up points protected by client-side anti-cheat cryptographic verification. Invite friends and climb the ranks!',
      badge: 'COMPETITIVE ARENA',
    },
  ];

  useEffect(() => {
    if (!isOpen) return;

    // Boot sequence animation
    const lines = [
      { label: 'NEURAL TENSOR CORE', status: 'ONLINE' },
      { label: 'SIMULATED RAY-TRACING SHADERS', status: 'CALIBRATED' },
      { label: 'ADAIN STYLE TRANSFER ENGINE', status: 'COMPILED' },
      { label: 'SPATIAL AUDIO & HAPTIC SYNTH', status: 'SYNCHRONIZED' },
      { label: 'ANTI-CHEAT SHIELD PROTOCOL', status: '100% VERIFIED' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < lines.length) {
        setBootLines((prev) => [...prev, lines[current]]);
        soundEngine.playHover();
        haptic.trigger('light');
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('callsign');
          soundEngine.playBoot();
          haptic.trigger('medium');
        }, 600);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFinishOnboarding = () => {
    antiCheat.setCallsign(callsignInput);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    soundEngine.playBoot();
    haptic.trigger('success');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-[#0b0e18] border border-white/20 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Holographic Top Glow */}
        <div
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: theme.primary }}
        />

        {/* Phase 1: Boot Sequence */}
        {phase === 'boot' && (
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-gray-400">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>RIYANSHU.OS // SYSTEM INITIALIZATION</span>
              </div>
              <button
                onClick={() => setPhase('callsign')}
                className="text-xs font-mono text-cyan-400 hover:underline"
              >
                SKIP INTRO →
              </button>
            </div>

            <div className="space-y-2.5 font-mono text-xs min-h-[160px]">
              {bootLines.map((line, idx) => (
                <div key={idx} className="flex justify-between items-center text-gray-300">
                  <span>{line.label} .........................</span>
                  <span className="text-emerald-400 font-bold">[{line.status}]</span>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <div className="text-xs font-mono text-gray-500 animate-pulse">
                INITIALIZING MULTIMODAL AVATAR &amp; 3D ENVIRONMENT...
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Enter Callsign */}
        {phase === 'callsign' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center">
                <Bot className="w-7 h-7 text-cyan-300" />
              </div>
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
                Welcome to Riyanshu.OS
              </h3>
              <p className="text-xs font-mono text-gray-400 max-w-sm mx-auto">
                Next-generation 3D AI Digital Twin &amp; Neural Engineering Portfolio of Riyanshu Kandwal.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-300 block">
                Assign Your Operator Callsign (For Global Leaderboard &amp; Challenges):
              </label>
              <input
                type="text"
                value={callsignInput}
                onChange={(e) => setCallsignInput(e.target.value)}
                placeholder="e.g. CyberPioneer, AdaIN_Pilot"
                className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-cyan-400 transition-all"
                maxLength={20}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPhase('tour')}
                className="flex-1 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 transition-all shadow-lg"
                style={{ background: theme.primary }}
              >
                <span>Take Guided Feature Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleFinishOnboarding}
                className="px-4 py-3 rounded-xl font-mono text-xs text-gray-400 hover:text-white border border-white/10"
              >
                Skip to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Phase 3: Tour */}
        {phase === 'tour' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs font-mono text-gray-400 border-b border-white/10 pb-3">
              <span>FEATURE TOUR ({tourStep + 1} OF 3)</span>
              <span className="text-cyan-400 font-bold">{steps[tourStep].badge}</span>
            </div>

            <div className="space-y-4 py-2 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                {steps[tourStep].icon}
              </div>
              <h4 className="text-xl font-bold font-['Space_Grotesk'] text-white">
                {steps[tourStep].title}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-mono max-w-sm mx-auto">
                {steps[tourStep].desc}
              </p>
            </div>

            {/* Stepper Dots */}
            <div className="flex justify-center gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    tourStep === i ? 'w-7 bg-cyan-400' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              {tourStep < steps.length - 1 ? (
                <button
                  onClick={() => {
                    setTourStep((s) => s + 1);
                    soundEngine.playClick();
                    haptic.trigger('light');
                  }}
                  className="flex-1 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2"
                  style={{ background: theme.primary }}
                >
                  <span>Next Feature</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishOnboarding}
                  className="flex-1 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 shadow-lg"
                  style={{ background: theme.primary }}
                >
                  <span>Enter Digital Twin Realm</span>
                  <Play className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
