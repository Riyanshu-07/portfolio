import React, { useState } from 'react';
import { ThemeColors } from '../types';
import { soundEngine } from '../lib/audio';
import { haptic } from '../lib/haptics';
import { 
  Briefcase, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  X, 
  ExternalLink, 
  Mail, 
  GraduationCap, 
  Award, 
  Code2, 
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Terminal
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface RecruiterToolkitModalProps {
  isOpen: boolean;
  theme: ThemeColors;
  onClose: () => void;
}

export const RecruiterToolkitModal: React.FC<RecruiterToolkitModalProps> = ({
  isOpen,
  theme,
  onClose,
}) => {
  const [copiedBlurb, setCopiedBlurb] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<'blurb' | 'resume'>('blurb');

  if (!isOpen) return null;

  const recruiterPitchBlurb = `Candidate: Riyanshu Kandwal — AI/ML Engineer
Location: Dehradun, India (Open to Remote & Hybrid Relocation)
Email: riyanshukandwal07@gmail.com
Education: Bachelor of Computer Applications (BCA, Expected 2027), Graphic Era (Deemed to be University)
Certification: Prime (AI/ML) — Apna College (Verified ID: 6a689235ff15cede5e0b6900)
Algorithmic Problem Solving: 500+ Solved across LeetCode (@Riyanshu07) and GeeksforGeeks (@riyanshu07) in Java & Python
Core Competencies: PyTorch, OpenCV, Deep Neural Networks (CNNs/RNNs), Transformers (T5, LLMs), Random Forest & TreeSHAP Explainable AI, Agentic Workflows (Agno, Groq), Fast Real-Time Computer Vision.
Flagship Projects:
- SnapClass AI: Multimodal attendance & biometric recognition (OpenCV, Dlib 68-landmarks, Resemblyzer voice d-vectors).
- AdaIN Neural Style Transfer: Real-time feature statistics alignment (VGG19 encoder + PyTorch decoder with continuous α interpolation).
- SmartFocus AI: Edge productivity prediction with live SHAP explainability.
GitHub: https://github.com/Riyanshu-07
LinkedIn: https://www.linkedin.com/in/riyanshu-kandwal-555433309`;

  const handleCopyBlurb = () => {
    navigator.clipboard.writeText(recruiterPitchBlurb);
    setCopiedBlurb(true);
    soundEngine.playClick();
    haptic.trigger('success');
    setTimeout(() => setCopiedBlurb(false), 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    soundEngine.playClick();
    haptic.trigger('success');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePrint = () => {
    soundEngine.playClick();
    haptic.trigger('medium');
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn print:p-0 print:bg-white print:static"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-[#0c101a] border rounded-2xl flex flex-col shadow-2xl overflow-hidden relative print:border-none print:shadow-none print:max-h-none print:h-auto print:bg-white print:text-black"
        style={{ borderColor: `${theme.primary}50` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (Hidden in Print) */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/50 print:hidden">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-black shadow-md"
              style={{ background: theme.primary }}
            >
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                  Recruiter &amp; Hiring Manager Fast-Track
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Ready to Hire
                </span>
              </div>
              <p className="text-xs font-mono text-gray-400">
                1-Click ATS Candidate Notes, Clean Printable Resume &amp; Direct Verification Links
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-mono flex items-center gap-1.5"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Toggle (Hidden in Print) */}
        <div className="px-5 sm:px-6 pt-3 pb-1 flex gap-2 border-b border-white/10 bg-black/30 print:hidden">
          <button
            onClick={() => { setActiveTab('blurb'); soundEngine.playClick(); }}
            className={`px-4 py-2 rounded-t-lg text-xs font-mono font-bold transition-all border-b-2 ${
              activeTab === 'blurb'
                ? 'border-cyan-400 text-cyan-300 bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            📋 1-Click Candidate Blurb (For ATS / Notes)
          </button>
          <button
            onClick={() => { setActiveTab('resume'); soundEngine.playClick(); }}
            className={`px-4 py-2 rounded-t-lg text-xs font-mono font-bold transition-all border-b-2 ${
              activeTab === 'resume'
                ? 'border-cyan-400 text-cyan-300 bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            📄 Clean 1-Page Resume View
          </button>
        </div>

        {/* Tab 1: Fast Copy Blurb */}
        {activeTab === 'blurb' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 print:hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">
                Pre-formatted plain text summary ready to paste into Greenhouse, Lever, Workday, or Slack:
              </span>
              <button
                onClick={handleCopyBlurb}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white border border-cyan-400/40 font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
              >
                {copiedBlurb ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedBlurb ? 'COPIED TO CLIPBOARD!' : 'COPY CANDIDATE BLURB'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-gray-200 whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-y-auto selection:bg-cyan-500/40 custom-scrollbar">
              {recruiterPitchBlurb}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Interview%20Inquiry%20-%20AI%2FML%20Engineer&body=Hi%20Riyanshu,%20we%20reviewed%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20opportunity.`}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Email Riyanshu</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all"
              >
                <ExternalLink className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Message</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all"
              >
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>GitHub Repositories</span>
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: Clean 1-Page Resume View (Printable) */}
        {(activeTab === 'resume' || typeof window !== 'undefined') && (
          <div className={`p-6 sm:p-8 overflow-y-auto max-h-[75vh] print:max-h-none print:p-0 print:overflow-visible ${activeTab !== 'resume' ? 'hidden print:block' : 'block'}`}>
            <div className="bg-white text-slate-900 p-8 rounded-xl shadow-lg border border-slate-200 print:shadow-none print:border-none print:p-0 max-w-3xl mx-auto space-y-6 font-sans text-xs sm:text-sm">
              {/* Resume Header */}
              <div className="border-b border-slate-300 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-['Space_Grotesk']">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-sm font-semibold text-cyan-700 mt-0.5">
                    {PERSONAL_INFO.role} · Applied Machine Learning &amp; Computer Vision
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
                <div className="text-xs space-y-1 sm:text-right font-mono text-slate-600">
                  <div>{PERSONAL_INFO.email}</div>
                  <div>github.com/Riyanshu-07</div>
                  <div>linkedin.com/in/riyanshu-kandwal-555433309</div>
                  <div>leetcode.com/u/Riyanshu07</div>
                </div>
              </div>

              {/* Education & Credentials */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-1">
                  Education &amp; Credentials
                </h2>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{PERSONAL_INFO.degree}</span>
                    <span className="text-slate-600"> — {PERSONAL_INFO.university}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{PERSONAL_INFO.expectedGraduation}</span>
                </div>
                <div className="text-xs text-slate-600">
                  Coursework: Data Structures &amp; Algorithms, Neural Networks, Database Systems (SQL), Operating Systems, Applied Mathematics.
                </div>

                <div className="pt-1.5 flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">Prime (AI / Machine Learning) Certification</span>
                    <span className="text-slate-600"> — Apna College</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">ID: 6a689235ff15cede5e0b6900</span>
                </div>
              </div>

              {/* Algorithmic Problem Solving */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-1">
                  Competitive Programming &amp; Problem Solving
                </h2>
                <p className="text-xs text-slate-700">
                  <strong>500+ Solved Algorithmic Problems</strong> across <strong>LeetCode</strong> (@Riyanshu07) and <strong>GeeksforGeeks</strong> (@riyanshu07) in Java and Python. Focus on Dynamic Programming, Graph Traversals (BFS/DFS), Binary Trees, Sliding Window, and optimal O(1) space algorithms.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-1">
                  Technical Core Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div><strong>Machine Learning &amp; DL:</strong> PyTorch, Torchvision, scikit-learn, VGG-19, AdaIN, CNNs, Transformers, Random Forest, SHAP.</div>
                  <div><strong>Computer Vision &amp; Audio:</strong> OpenCV, Dlib (68 Landmarks), Resemblyzer, Librosa, MTCNN, Haar Cascades.</div>
                  <div><strong>Languages:</strong> Python, Java, SQL (SQLite, PostgreSQL), C/C++, JavaScript, HTML5/CSS3.</div>
                  <div><strong>Frameworks &amp; Tools:</strong> Flask, Streamlit, FastAPI, Agno, Groq, Git, Three.js, Docker basics.</div>
                </div>
              </div>

              {/* Key Engineered Projects */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-1">
                  Flagship Engineering Projects
                </h2>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>SnapClass — Multimodal AI Attendance Platform</span>
                    <span className="font-mono text-xs text-slate-500 font-normal">Python, OpenCV, Dlib, Resemblyzer</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Engineered facial landmark vector matching (Dlib 68-points) with Resemblyzer acoustic voice biometrics for spoof-resistant, non-intrusive classroom attendance. Achieved 99.4% verified true acceptance rate.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>AdaIN Real-Time Neural Style Transfer</span>
                    <span className="font-mono text-xs text-slate-500 font-normal">PyTorch, Torchvision, VGG-19, Flask</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Implemented real-time arbitrary artistic style transfer via Adaptive Instance Normalization in PyTorch. Aligns deep convolutional feature mean and variance moments with continuous alpha interpolation.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>SmartFocus AI — Predictive Productivity &amp; SHAP Explainability</span>
                    <span className="font-mono text-xs text-slate-500 font-normal">scikit-learn, Random Forest, SHAP, SQLite</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Trained Random Forest regressor on ambient telemetry (lighting, decibel levels, work intervals). Integrated TreeSHAP for exact marginal feature attribution with real-time feedback loops.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Autonomous Multi-Agent Research Assistant</span>
                    <span className="font-mono text-xs text-slate-500 font-normal">Agno, Groq LPUs, Llama-3, Tavily</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Tri-agent autonomous pipeline orchestrating live web retrieval, synthesis, and strict fact-verification, turning research queries into cited briefs in under 1.5 seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer (Hidden in Print) */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-gray-400 print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Open to immediate interview discussions &amp; internships</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
