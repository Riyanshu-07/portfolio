import React, { useState } from 'react';
import { ThemeColors } from '../types';
import { soundEngine } from '../lib/audio';
import { haptic } from '../lib/haptics';
import { 
  Network, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Sliders, 
  Eye, 
  Layers, 
  Terminal,
  Clock,
  Sparkles,
  Server
} from 'lucide-react';

interface ArchitectureCaseStudiesProps {
  theme: ThemeColors;
}

export const ArchitectureCaseStudies: React.FC<ArchitectureCaseStudiesProps> = ({ theme }) => {
  const [activeArch, setActiveArch] = useState<'snapclass' | 'smartfocus' | 'adain' | 'multiagent'>('snapclass');

  const architectures = [
    {
      id: 'snapclass',
      name: 'SnapClass AI',
      subtitle: 'Real-Time Biometric Multimodal Attendance & Attention Pipeline',
      tag: 'Computer Vision & Audio Biometrics',
      latency: '76 ms total pipeline',
      hardware: 'CPU Edge / WebRTC Stream',
      overview: 'End-to-end multimodal verification combining 68-point Dlib facial landmark embeddings with Resemblyzer acoustic voice d-vectors for spoof-resistant, non-intrusive classroom attendance.',
      flowSteps: [
        {
          stage: '01. Ingestion',
          title: 'WebRTC / RTSP Video Stream',
          details: 'Captures 1080p @ 30 FPS video frames; dynamic downsampling to 640x480 for edge efficiency.',
          latency: '14 ms',
          tech: 'OpenCV · NumPy'
        },
        {
          stage: '02. Detection',
          title: 'MTCNN & Dlib 68 Landmarks',
          details: 'Extracts bounding boxes, aligns facial roll/pitch/yaw angles, normalizes lighting gradients.',
          latency: '28 ms',
          tech: 'Dlib · C++ Bindings'
        },
        {
          stage: '03. Embedding',
          title: 'ResNet-34 128-D Euclidean Vector',
          details: 'Maps aligned faces to hypersphere vector space where Euclidean distance L2 < 0.6 indicates identity match.',
          latency: '31 ms',
          tech: 'PyTorch · Torchvision'
        },
        {
          stage: '04. Verification',
          title: 'Cosine Distance & Database Commit',
          details: 'Indexed KD-Tree spatial search against classroom roster; atomic SQLite transaction logs timestamp & confidence.',
          latency: '3 ms',
          tech: 'SQLite · Supabase'
        }
      ],
      metrics: [
        { label: 'True Acceptance Rate', value: '99.4%', detail: 'Evaluated on 45-student batch test' },
        { label: 'False Acceptance Rate', value: '< 0.08%', detail: 'Cosine distance threshold = 0.6' },
        { label: 'Latency Overhead', value: '76 ms', detail: 'Edge CPU execution (Intel i5/M1)' },
        { label: 'Voice Anti-Spoof', value: '98.1%', detail: 'Resemblyzer voice embedding match' },
      ],
      diagram: 'Video Stream → Face Alignment → 128-D Feature Embedding → Vector Search → Presence Verification'
    },
    {
      id: 'smartfocus',
      name: 'SmartFocus AI',
      subtitle: 'Edge Productivity Regression & Explainable TreeSHAP Telemetry',
      tag: 'Explainable AI & ML Regression',
      latency: '12 ms inference',
      hardware: 'Client-side Local Python Engine',
      overview: 'Predictive behavioral regression pipeline estimating cognitive productivity scores using ambient environment metrics and Pomodoro logs with real-time SHAP (Shapley Additive exPlanations) attribution.',
      flowSteps: [
        {
          stage: '01. Telemetry',
          title: 'Environmental & Behavioral Sensors',
          details: 'Collects lux ambient lighting, decibel noise levels, active work duration, and interruption frequency.',
          latency: '2 ms',
          tech: 'SoundDevice · Sensors'
        },
        {
          stage: '02. Feature Pipeline',
          title: 'Sliding-Window Feature Normalization',
          details: 'Applies z-score scaling and exponential moving average (EMA) to smooth short-term telemetry bursts.',
          latency: '3 ms',
          tech: 'scikit-learn · Pandas'
        },
        {
          stage: '03. Regression',
          title: 'Random Forest Ensemble (100 Trees)',
          details: 'Non-linear tree ensemble computes expected productivity score with diminished return curve past 8 hours.',
          latency: '4 ms',
          tech: 'scikit-learn · NumPy'
        },
        {
          stage: '04. Explainability',
          title: 'TreeSHAP Attribution Vector',
          details: 'Computes exact Shapley values φ_i for each feature, identifying whether noise or break deficit is dragging performance.',
          latency: '3 ms',
          tech: 'SHAP · Matplotlib'
        }
      ],
      metrics: [
        { label: 'Regression R² Score', value: '0.892', detail: 'Cross-validated on 1,200 sessions' },
        { label: 'Mean Absolute Error', value: '4.1 pts', detail: 'On 0-100 cognitive scale' },
        { label: 'SHAP Compute Time', value: '3.2 ms', detail: 'Optimized TreeSHAP algorithm' },
        { label: 'Inference Footprint', value: '18 MB', detail: 'Zero cloud latency dependency' },
      ],
      diagram: 'Sensor Intake → Feature Normalization → Random Forest Ensemble → TreeSHAP Explainer → Dynamic Suggestions'
    },
    {
      id: 'adain',
      name: 'AdaIN Neural Style Transfer',
      subtitle: 'Real-Time Arbitrary Artistic Feature Moment Alignment in PyTorch',
      tag: 'Generative Deep Learning & Vision',
      latency: '45 ms (GPU) / 120 ms (CPU)',
      hardware: 'PyTorch · Torchvision VGG-19',
      overview: 'Solves arbitrary neural style transfer in real-time without iterative optimization by aligning the channel-wise mean and variance of deep convolutional feature representations.',
      flowSteps: [
        {
          stage: '01. Encoding',
          title: 'VGG-19 Fixed Feature Extractor',
          details: 'Passes content image x and style image y through pre-trained VGG-19 truncated at relu4_1.',
          latency: '18 ms',
          tech: 'PyTorch · VGG-19'
        },
        {
          stage: '02. AdaIN Layer',
          title: 'Feature Statistics Alignment',
          details: 'AdaIN(x, y) = σ(y) * ((x - μ(x)) / σ(x)) + μ(y). Interpolates with content features via slider α.',
          latency: '4 ms',
          tech: 'Custom PyTorch Layer'
        },
        {
          stage: '03. Decoding',
          title: 'Symmetric Inverted Convolutional Decoder',
          details: 'Trained decoder network (mirroring VGG relu4_1 to relu1_1 with nearest-neighbor upsampling) reconstructs RGB image.',
          latency: '22 ms',
          tech: 'Conv2D · InstanceNorm'
        },
        {
          stage: '04. Loss Backprop',
          title: 'Content & Style Gram Matrix Loss',
          details: 'Optimized via L = L_content + λ * L_style, matching perceptual feature distributions without artifacts.',
          latency: 'Training',
          tech: 'Adam Optimizer'
        }
      ],
      metrics: [
        { label: 'Inference Speedup', value: '250x', detail: 'Compared to Gatys iterative optimization' },
        { label: 'Arbitrary Styles', value: 'Zero Retrain', detail: 'New artistic styles applied instantly' },
        { label: 'Interpolation Control', value: 'Continuous α', detail: 'Linear interpolation in feature space' },
        { label: 'Model Weight Size', value: '14.2 MB', detail: 'Compact trained decoder network' },
      ],
      diagram: 'Content/Style Images → VGG19 Encoder → AdaIN Mean/Var Shift → Inverted Decoder → Stylized Synthesis'
    },
    {
      id: 'multiagent',
      name: 'Autonomous Multi-Agent Assistant',
      subtitle: 'Tri-Stage Orchestrated Research & Strict Fact-Verification Pipeline',
      tag: 'Agentic Workflows & LLM Orchestration',
      latency: '1.2 s full research brief',
      hardware: 'Groq LPUs + Agno Framework',
      overview: 'Coordinates autonomous specialized sub-agents with dedicated roles (Retrieval, Synthesis, Fact-Checking) to produce cited, hallucination-free research summaries.',
      flowSteps: [
        {
          stage: '01. Orchestration',
          title: 'Supervisor Agent Intent Routing',
          details: 'Deconstructs user prompt into sub-hypotheses and dispatches parallel search queries.',
          latency: '120 ms',
          tech: 'Agno · Groq Llama-3'
        },
        {
          stage: '02. Web Grounding',
          title: 'Search Retrieval Agent',
          details: 'Scrapes live web sources, deduplicates snippets, and filters noise via cosine similarity.',
          latency: '450 ms',
          tech: 'Tavily API · Async HTTP'
        },
        {
          stage: '03. Synthesis',
          title: 'Research Analyst Agent',
          details: 'Aggregates citations, outlines key tradeoffs, and formats structured Markdown sections.',
          latency: '380 ms',
          tech: 'Groq LPU Acceleration'
        },
        {
          stage: '04. Verification',
          title: 'Critic & Fact-Checker Agent',
          details: 'Audits every extracted claim against original URL source text; strips unsupported assertions.',
          latency: '250 ms',
          tech: 'Cross-Encoder Verifier'
        }
      ],
      metrics: [
        { label: 'Citation Grounding', value: '96.8%', detail: 'Source verified per claim' },
        { label: 'Inference Turnaround', value: '1.2 s', detail: 'Groq ultra-fast token streaming' },
        { label: 'Hallucination Rate', value: '< 2.4%', detail: 'Strict critic agent filter' },
        { label: 'Multi-Step Autonomy', value: '3 Agents', detail: 'Zero manual handoff required' },
      ],
      diagram: 'User Query → Supervisor Agent → Web Retriever → Synthesis Engine → Critic Fact-Checker → Final Brief'
    }
  ];

  const currentArch = architectures.find((a) => a.id === activeArch) || architectures[0];

  return (
    <div 
      className="w-full border rounded-2xl p-6 sm:p-8 shadow-2xl transition-all space-y-8"
      style={{
        backgroundColor: `${theme.panel}e6`,
        borderColor: `${theme.primary}25`,
        boxShadow: `0 0 40px ${theme.primary}10`,
      }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase" style={{ color: theme.primary }}>
            <Network className="w-3.5 h-3.5" />
            <span>SYSTEM ARCHITECTURE &amp; DEEP-DIVE CASE STUDIES</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-white mt-1">
            Production Engineering Walkthroughs
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl font-light">
            Detailed dataflow diagrams, pipeline latency budgets, ablation metrics, and hardware specifications behind Riyanshu's flagship machine learning systems.
          </p>
        </div>

        {/* Architecture Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-black/40 border border-white/10 rounded-xl">
          {architectures.map((arch) => {
            const isSelected = activeArch === arch.id;
            return (
              <button
                key={arch.id}
                onClick={() => {
                  setActiveArch(arch.id as any);
                  soundEngine.playClick();
                  haptic.trigger('light');
                }}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  isSelected
                    ? 'font-bold shadow-md border'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={isSelected ? { 
                  color: '#fff', 
                  backgroundColor: `${theme.primary}30`, 
                  borderColor: theme.primary 
                } : {}}
              >
                {arch.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Architecture Overview Banner */}
      <div 
        className="p-5 rounded-xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        style={{
          backgroundColor: `${theme.bgSecondary}b3`,
          borderColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xl font-bold text-white font-['Space_Grotesk']">
              {currentArch.name}
            </h4>
            <span 
              className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase"
              style={{ background: `${theme.primary}20`, color: theme.primary, border: `1px solid ${theme.primary}40` }}
            >
              {currentArch.tag}
            </span>
          </div>
          <p className="text-xs text-gray-300 font-light max-w-3xl">
            {currentArch.overview}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10">
            <span className="text-gray-400">Total Latency: </span>
            <span className="font-bold" style={{ color: theme.primary }}>{currentArch.latency}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10">
            <span className="text-gray-400">Runtime: </span>
            <span className="font-bold text-emerald-400">{currentArch.hardware}</span>
          </div>
        </div>
      </div>

      {/* Flow Diagram Strip */}
      <div 
        className="p-4 rounded-xl border font-mono text-xs text-center overflow-x-auto whitespace-nowrap shadow-inner"
        style={{
          backgroundColor: `${theme.bg}cc`,
          borderColor: `${theme.primary}25`,
        }}
      >
        <span className="text-gray-400 uppercase text-[10px] tracking-widest block mb-1.5">// End-to-End Tensor Dataflow Pipeline</span>
        <div className="flex items-center justify-center gap-2 font-bold min-w-max">
          {currentArch.diagram.split('→').map((step, idx, arr) => (
            <React.Fragment key={idx}>
              <span 
                className="px-2.5 py-1 rounded bg-white/5 border border-white/10 transition-colors"
                style={{ color: idx === 0 || idx === arr.length - 1 ? theme.primary : '#e2e8f0' }}
              >
                {step.trim()}
              </span>
              {idx < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Detailed Pipeline Stage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentArch.flowSteps.map((step, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 relative group"
            style={{
              backgroundColor: `${theme.bgSecondary}99`,
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold" style={{ color: theme.primary }}>{step.stage}</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10 text-[11px]">
                  {step.latency}
                </span>
              </div>
              <h5 className="font-bold text-white text-sm font-['Space_Grotesk']">
                {step.title}
              </h5>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                {step.details}
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3" style={{ color: theme.primary }} />
                <span>{step.tech}</span>
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Verified Ablation Metrics */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>Empirical Validation &amp; Production Benchmarks</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentArch.metrics.map((m, i) => (
            <div 
              key={i} 
              className="p-4 rounded-xl border space-y-1"
              style={{
                backgroundColor: `${theme.bgSecondary}80`,
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="text-xs text-gray-400 font-mono truncate">{m.label}</div>
              <div className="text-2xl font-bold font-mono" style={{ color: theme.primary }}>
                {m.value}
              </div>
              <div className="text-[11px] text-gray-400 font-light truncate">{m.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
