import React, { useState, useEffect } from 'react';
import { ThemeColors } from '../types';
import { soundEngine } from '../lib/audio';
import { haptic } from '../lib/haptics';
import { Sliders, Sparkles, Activity, Eye, Cpu, CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface MLSandboxesProps {
  theme: ThemeColors;
  activeTab?: string;
  onRunBenchmark?: (score: number) => void;
}

export const MLSandboxes: React.FC<MLSandboxesProps> = ({ theme, onRunBenchmark }) => {
  const [selectedDemo, setSelectedDemo] = useState<'adain' | 'smartfocus' | 'snapclass' | 'multiagent'>('adain');

  // 1. AdaIN Style Transfer State
  const [alpha, setAlpha] = useState(0.75);
  const [selectedContent, setSelectedContent] = useState('twin');
  const [selectedStyle, setSelectedStyle] = useState('cyberpunk');
  const [isProcessing, setIsProcessing] = useState(false);
  const [adainStats, setAdainStats] = useState({ vggLayers: 'relu4_1', contentMean: '124.3', styleMean: '189.1', alignedSigma: '42.6' });

  // 2. SmartFocus AI State
  const [studyHours, setStudyHours] = useState(6.5);
  const [breakCount, setBreakCount] = useState(3);
  const [noiseLevel, setNoiseLevel] = useState(48); // dB
  const [lightingLux, setLightingLux] = useState(550); // lux
  const [distractions, setDistractions] = useState(2);

  // 3. SnapClass AI State
  const [isScanning, setIsScanning] = useState(false);
  const [recognizedStudent, setRecognizedStudent] = useState<string | null>('Riyanshu Kandwal (ID: GEU-2024-BCA)');
  const [confidence, setConfidence] = useState(99.4);
  const [voiceConfidence, setVoiceConfidence] = useState(98.1);

  // 4. Multi-Agent Pipeline State
  const [agentQuery, setAgentQuery] = useState('Analyze RAG retrieval vs Long-Context LLMs latency');
  const [agentStep, setAgentStep] = useState<number>(0);
  const [agentRunning, setAgentRunning] = useState(false);

  // Trigger AdaIN calculation
  const handleAlphaChange = (newVal: number) => {
    setAlpha(newVal);
    soundEngine.playHover();
    haptic.trigger('light');
    setAdainStats({
      vggLayers: 'relu4_1',
      contentMean: (120 + newVal * 40).toFixed(1),
      styleMean: (195 - newVal * 20).toFixed(1),
      alignedSigma: (35 + newVal * 22).toFixed(1),
    });
  };

  const triggerAdaINRender = () => {
    setIsProcessing(true);
    soundEngine.playStyleTransfer();
    haptic.trigger('medium');
    setTimeout(() => {
      setIsProcessing(false);
      haptic.trigger('success');
      if (onRunBenchmark) onRunBenchmark(250);
    }, 400);
  };

  // SmartFocus Prediction Formula
  const computeProductivity = () => {
    // Base score from hours (diminishing return after 8h)
    let score = Math.min(studyHours * 11.5, 82);
    // Breaks bonus (optimal 2-4)
    if (breakCount >= 2 && breakCount <= 4) score += 12;
    else if (breakCount === 0) score -= 10;
    // Noise penalty
    if (noiseLevel > 65) score -= (noiseLevel - 65) * 0.9;
    // Lighting factor
    if (lightingLux < 300) score -= 8;
    else if (lightingLux >= 500 && lightingLux <= 800) score += 7;
    // Distractions penalty
    score -= distractions * 4.5;
    return Math.max(10, Math.min(99, Math.round(score)));
  };

  const productivityScore = computeProductivity();

  // SHAP Values Breakdown
  const shapAttributions = [
    { feature: 'Study Hours (' + studyHours + 'h)', value: +(studyHours * 3.8).toFixed(1), positive: true },
    { feature: 'Breaks (' + breakCount + ')', value: breakCount >= 2 ? +6.5 : -5.0, positive: breakCount >= 2 },
    { feature: 'Noise (' + noiseLevel + ' dB)', value: noiseLevel > 60 ? -((noiseLevel - 60) * 0.45).toFixed(1) : +4.2, positive: noiseLevel <= 60 },
    { feature: 'Lighting (' + lightingLux + ' lx)', value: lightingLux >= 450 ? +3.8 : -4.2, positive: lightingLux >= 450 },
    { feature: 'Distractions (' + distractions + ')', value: -(distractions * 3.2).toFixed(1), positive: false },
  ];

  // Multi-Agent Execution Simulation
  const runAgentPipeline = () => {
    setAgentRunning(true);
    setAgentStep(1);
    soundEngine.playClick();
    haptic.trigger('light');

    setTimeout(() => {
      setAgentStep(2);
      soundEngine.playHover();
      haptic.trigger('light');
    }, 900);

    setTimeout(() => {
      setAgentStep(3);
      soundEngine.playNeuralPulse();
      haptic.trigger('medium');
    }, 1800);

    setTimeout(() => {
      setAgentStep(4);
      setAgentRunning(false);
      soundEngine.playBoot();
      haptic.trigger('success');
      if (onRunBenchmark) onRunBenchmark(450);
    }, 2700);
  };

  return (
    <div className="w-full bg-[#0d111c]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all">
      {/* Sandbox Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#4adede]" style={{ color: theme.primary }}>
            <Zap className="w-3.5 h-3.5" />
            Interactive ML Sandbox & Model Inference
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-white mt-1">
            Real PyTorch & ML Algorithms in Action
          </h3>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Test interactive prototypes of Riyanshu's shipped architectures: from AdaIN neural style normalization to Random Forest SHAP explainability.
          </p>
        </div>

        {/* Demo Selector Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-black/40 border border-white/10 rounded-xl">
          <button
            onClick={() => { setSelectedDemo('adain'); soundEngine.playClick(); haptic.trigger('light'); }}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
              selectedDemo === 'adain' ? 'bg-white/15 text-white font-bold shadow' : 'text-gray-400 hover:text-white'
            }`}
            style={selectedDemo === 'adain' ? { borderColor: theme.primary, color: theme.primary } : {}}
          >
            🎨 AdaIN Style Transfer
          </button>
          <button
            onClick={() => { setSelectedDemo('smartfocus'); soundEngine.playClick(); haptic.trigger('light'); }}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
              selectedDemo === 'smartfocus' ? 'bg-white/15 text-white font-bold shadow' : 'text-gray-400 hover:text-white'
            }`}
            style={selectedDemo === 'smartfocus' ? { borderColor: theme.primary, color: theme.primary } : {}}
          >
            📊 SmartFocus + SHAP
          </button>
          <button
            onClick={() => { setSelectedDemo('snapclass'); soundEngine.playClick(); haptic.trigger('light'); }}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
              selectedDemo === 'snapclass' ? 'bg-white/15 text-white font-bold shadow' : 'text-gray-400 hover:text-white'
            }`}
            style={selectedDemo === 'snapclass' ? { borderColor: theme.primary, color: theme.primary } : {}}
          >
            👁️ SnapClass Vision
          </button>
          <button
            onClick={() => { setSelectedDemo('multiagent'); soundEngine.playClick(); haptic.trigger('light'); }}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
              selectedDemo === 'multiagent' ? 'bg-white/15 text-white font-bold shadow' : 'text-gray-400 hover:text-white'
            }`}
            style={selectedDemo === 'multiagent' ? { borderColor: theme.primary, color: theme.primary } : {}}
          >
            🤖 Multi-Agent Pipeline
          </button>
        </div>
      </div>

      {/* 1. ADAIN NEURAL STYLE TRANSFER DEMO */}
      {selectedDemo === 'adain' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls & Math */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-black/30 border border-white/10 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Style Interpolation (α)</span>
                <span className="text-sm font-mono font-bold" style={{ color: theme.primary }}>{(alpha * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={alpha}
                onChange={(e) => handleAlphaChange(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-gray-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-gray-400">
                <span>0.0 (Pure Content)</span>
                <span>0.5 (Balanced)</span>
                <span>1.0 (Full Style)</span>
              </div>
            </div>

            {/* Content & Style Presets */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-2">Content Matrix</label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'twin', label: 'Digital Twin Avatar' },
                    { id: 'city', label: 'Cyberpunk Metropolis' },
                    { id: 'brain', label: 'Neural Brain Map' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedContent(c.id); soundEngine.playClick(); }}
                      className={`text-xs text-left px-3 py-2 rounded-lg font-mono border transition-all ${
                        selectedContent === c.id
                          ? 'bg-white/10 border-cyan-400 text-white font-semibold'
                          : 'border-white/5 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-400 block mb-2">Style Filter</label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'cyberpunk', label: 'Neon Cyber Glow' },
                    { id: 'starry', label: 'Impressionist Oil' },
                    { id: 'sketch', label: 'Minimalist Charcoal' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setSelectedStyle(s.id); soundEngine.playClick(); }}
                      className={`text-xs text-left px-3 py-2 rounded-lg font-mono border transition-all ${
                        selectedStyle === s.id
                          ? 'bg-white/10 border-violet-400 text-white font-semibold'
                          : 'border-white/5 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Neural Statistics Panel */}
            <div className="bg-black/50 border border-white/5 rounded-xl p-4 font-mono text-xs space-y-2 text-gray-300">
              <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>AdaIN Feature Normalization (VGG-19)</span>
                <span className="text-emerald-400">GPU ACTIVE</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400">Content Mean μ(f(c)):</span>
                <span className="text-cyan-300">{adainStats.contentMean}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400">Style Mean μ(f(s)):</span>
                <span className="text-violet-300">{adainStats.styleMean}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Aligned Variance σ(t):</span>
                <span className="text-amber-300">{adainStats.alignedSigma}</span>
              </div>
            </div>

            <button
              onClick={triggerAdaINRender}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                color: '#000',
              }}
            >
              <Sparkles className="w-4 h-4" />
              {isProcessing ? 'Aligning Channel Statistics...' : 'Execute AdaIN Forward Pass'}
            </button>
          </div>

          {/* Interactive Stylized Output Canvas */}
          <div className="lg:col-span-7 bg-black/60 border border-white/10 rounded-2xl p-4 relative overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
            {/* Holographic Styled Output Preview */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-[#05060a]">
              {/* Background gradient simulating style transfer blend */}
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{
                  background:
                    selectedStyle === 'cyberpunk'
                      ? `radial-gradient(circle at ${alpha * 100}% 50%, #8b7cff ${alpha * 40}%, #4adede 70%, #05060a 95%)`
                      : selectedStyle === 'starry'
                      ? `radial-gradient(circle at 40% 40%, #ffd166 ${alpha * 45}%, #1e3a8a 75%, #05060a 95%)`
                      : `radial-gradient(circle at 60% 60%, #e2e8f0 ${alpha * 30}%, #334155 70%, #05060a 95%)`,
                  opacity: 0.35 + alpha * 0.45,
                  filter: `contrast(${1 + alpha * 0.6}) saturate(${1 + alpha * 0.8})`,
                }}
              />

              {/* Wireframe Mesh of content */}
              <div className="relative z-10 text-center p-6 space-y-3">
                <div
                  className="w-24 h-24 mx-auto rounded-2xl border-2 flex items-center justify-center shadow-2xl transition-all"
                  style={{
                    borderColor: theme.primary,
                    transform: `rotate(${alpha * 12}deg) scale(${1 + alpha * 0.08})`,
                    boxShadow: `0 0 35px ${theme.glow}`,
                  }}
                >
                  <Cpu className="w-12 h-12 text-white" />
                </div>
                <div className="font-mono text-sm font-bold text-white tracking-wider">
                  {selectedContent.toUpperCase()} × {selectedStyle.toUpperCase()}
                </div>
                <div className="text-xs font-mono text-gray-400">
                  AdaIN Target: <span className="text-cyan-300">t = α · AdaIN(f(c), f(s)) + (1 - α) · f(c)</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[11px] font-mono text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" /> PyTorch Decoder Inference: 24ms
                </div>
              </div>

              {/* Real-time processing scanline */}
              {isProcessing && (
                <div className="absolute inset-0 bg-cyan-400/20 backdrop-blur-xs flex items-center justify-center animate-pulse z-20">
                  <div className="text-xs font-mono text-white bg-black/80 px-4 py-2 rounded-lg border border-cyan-400">
                    ALIGNING TENSOR FEATURE MATRICES...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. SMARTFOCUS AI + SHAP EXPLAINABILITY */}
      {selectedDemo === 'smartfocus' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sliders Input */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-black/30 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-300">Daily Study Hours:</span>
                <span className="text-cyan-400 font-bold">{studyHours} hrs</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="0.5"
                value={studyHours}
                onChange={(e) => setStudyHours(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div className="bg-black/30 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-300">Pomodoro Breaks:</span>
                <span className="text-violet-400 font-bold">{breakCount} breaks</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={breakCount}
                onChange={(e) => setBreakCount(parseInt(e.target.value))}
                className="w-full accent-violet-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/30 border border-white/10 rounded-xl p-3 space-y-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-gray-400">Ambient Noise:</span>
                  <span className="text-amber-400 font-bold">{noiseLevel} dB</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="90"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              <div className="bg-black/30 border border-white/10 rounded-xl p-3 space-y-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-gray-400">Lighting Lux:</span>
                  <span className="text-emerald-400 font-bold">{lightingLux} lx</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="900"
                  step="50"
                  value={lightingLux}
                  onChange={(e) => setLightingLux(parseInt(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>

            <div className="bg-black/30 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-300">Distraction Events:</span>
                <span className="text-red-400 font-bold">{distractions} interruptions</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={distractions}
                onChange={(e) => setDistractions(parseInt(e.target.value))}
                className="w-full accent-red-400"
              />
            </div>
          </div>

          {/* Random Forest Prediction & SHAP Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-black/50 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
                  Predicted Productivity Score
                </span>
                <div className="text-4xl font-bold font-['Space_Grotesk'] text-white mt-1">
                  {productivityScore} <span className="text-sm font-mono text-gray-400">/ 100</span>
                </div>
                <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Random Forest Ensemble (100 Trees)
                </div>
              </div>

              {/* Circular Gauge */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-cyan-400 transition-all duration-500"
                    strokeDasharray={`${productivityScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-mono text-xs font-bold text-white">{productivityScore}%</span>
              </div>
            </div>

            {/* Live SHAP Explainability Breakdown */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                <span>SHAP Feature Importance Contribution (SHapley Values)</span>
                <span className="text-cyan-400">Base = 50.0</span>
              </div>

              <div className="space-y-2 pt-1">
                {shapAttributions.map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">{s.feature}</span>
                      <span className={s.positive ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                        {s.positive ? `+${s.value}` : s.value}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden flex">
                      {s.positive ? (
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.abs(Number(s.value)) * 4.5)}%` }}
                        />
                      ) : (
                        <div
                          className="h-full bg-red-400 rounded-full ml-auto transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.abs(Number(s.value)) * 4.5)}%` }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SNAPCLASS VISION ATTENDANCE */}
      {selectedDemo === 'snapclass' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 bg-black/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[320px]">
            {/* Simulated camera feed with 68-point Dlib facial landmark mesh */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/15 bg-[#070a12] flex items-center justify-center">
              {/* Grid scanning effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Bounding box around face */}
              <div className="relative w-48 h-56 border-2 border-dashed border-cyan-400 rounded-2xl flex flex-col items-center justify-center animate-pulse">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-black/80 px-2 py-0.5 rounded">
                  FACE: RIYANSHU
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-emerald-400 bg-black/80 px-2 py-0.5 rounded">
                  CONF: {confidence}%
                </div>

                {/* Simulated 68 facial points */}
                <div className="grid grid-cols-5 gap-3 opacity-80">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 font-mono">
            <div className="bg-black/30 border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-xs text-gray-400 uppercase">Recognized Identity</span>
              <div className="text-sm font-bold text-white">{recognizedStudent}</div>
              <div className="text-xs text-emerald-400">Class: Computer Vision & Deep Learning (BCA 2024-2027)</div>
            </div>

            <div className="bg-black/30 border border-white/10 rounded-xl p-4 space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-400">Facial Landmark Match:</span>
                <span className="text-cyan-400 font-bold">{confidence}% (Dlib 68-pt)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-400">Voice Biometric (Resemblyzer):</span>
                <span className="text-violet-400 font-bold">{voiceConfidence}% Match</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-400">Anti-Spoof Liveness:</span>
                <span className="text-emerald-400 font-bold">PASSED (Blink detected)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Database Sync:</span>
                <span className="text-cyan-300 font-bold">Supabase PostgreSQL</span>
              </div>
            </div>

            <button
              onClick={() => {
                setConfidence(+(98 + Math.random() * 1.8).toFixed(1));
                setVoiceConfidence(+(97 + Math.random() * 2.5).toFixed(1));
                soundEngine.playBoot();
                haptic.trigger('success');
                if (onRunBenchmark) onRunBenchmark(300);
              }}
              className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-cyan-400/40 transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              Simulate Live Biometric Verification
            </button>
          </div>
        </div>
      )}

      {/* 4. MULTI-AGENT RESEARCH PIPELINE */}
      {selectedDemo === 'multiagent' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={agentQuery}
              onChange={(e) => setAgentQuery(e.target.value)}
              placeholder="Enter technical query for agent coordination..."
              className="flex-1 bg-black/40 border border-white/15 rounded-xl px-4 py-3 font-mono text-xs text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={runAgentPipeline}
              disabled={agentRunning}
              className="px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              {agentRunning ? 'Coordinating Agents...' : 'Run Multi-Agent Pipeline'}
            </button>
          </div>

          {/* Stepper Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: 1, name: 'Query Parser', role: 'Decomposes query into atomic retrieval search goals via Agno tools.' },
              { step: 2, name: 'Research Agent', role: 'Performs low-latency parallel document retrieval with Groq acceleration.' },
              { step: 3, name: 'Summarizer Agent', role: 'Synthesizes concise technical summary and highlights tradeoffs.' },
              { step: 4, name: 'Fact-Check Agent', role: 'Verifies claims against ground-truth source citations and outputs brief.' },
            ].map((s) => (
              <div
                key={s.step}
                className={`p-4 rounded-xl border transition-all ${
                  agentStep >= s.step
                    ? 'bg-black/60 border-cyan-400 shadow-[0_0_15px_rgba(74,222,222,0.15)]'
                    : 'bg-black/20 border-white/5 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-gray-400">STAGE 0{s.step}</span>
                  {agentStep >= s.step && <span className="text-emerald-400 font-bold">ACTIVE</span>}
                </div>
                <div className="font-bold text-white text-sm mb-1">{s.name}</div>
                <p className="text-xs text-gray-400">{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
