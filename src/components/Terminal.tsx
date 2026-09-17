import React, { useState, useRef, useEffect } from 'react';
import { ThemeColors, ThemeMode } from '../types';
import { soundEngine } from '../lib/audio';
import { haptic } from '../lib/haptics';
import { Terminal as TermIcon, CornerDownLeft } from 'lucide-react';

interface TerminalProps {
  theme: ThemeColors;
  onThemeChange?: (theme: ThemeMode) => void;
  onNavigate?: (sectionId: string) => void;
}

interface TermOutput {
  id: string;
  command?: string;
  output: string;
  type?: 'cmd' | 'text' | 'success' | 'warn';
}

export const TerminalComponent: React.FC<TerminalProps> = ({
  theme,
  onThemeChange,
  onNavigate,
}) => {
  const [history, setHistory] = useState<TermOutput[]>([
    { id: '1', command: 'whoami', output: 'Riyanshu Kandwal — AI/ML Engineer | Generative AI | Computer Vision | Deep Learning', type: 'cmd' },
    { id: '2', command: 'education', output: 'BCA (Bachelor of Computer Applications), Graphic Era (Deemed to be University), Dehradun [2024 - 2027]', type: 'cmd' },
    { id: '3', command: 'dsa --count', output: '500+ algorithmic problems solved across LeetCode and GeeksforGeeks in Java & Python.', type: 'cmd' },
    { id: '4', command: 'help', output: "Available commands: 'projects', 'adain', 'skills', 'twin', 'benchmark', 'theme <cyberpunk|amber|matrix|nebula|titanium>', 'clear'", type: 'cmd' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    soundEngine.playClick();
    haptic.trigger('light');

    const [cmd, ...args] = raw.toLowerCase().split(' ');
    let response = '';
    let resType: TermOutput['type'] = 'text';

    switch (cmd) {
      case 'help':
        response = "Commands: 'whoami', 'projects', 'skills', 'adain', 'twin', 'stats', 'themes', 'theme <name>', 'clear'";
        break;
      case 'themes':
        response = "12 Neural Themes: 'cyberpunk', 'tokyo', 'emerald', 'nord', 'dracula', 'amber', 'solar', 'synthwave', 'matrix', 'nebula', 'onyx', 'titanium'";
        break;
      case 'whoami':
        response = 'Riyanshu Kandwal — AI/ML Engineer building intelligent systems that learn, create, and solve real-world problems.';
        break;
      case 'projects':
        response = '1. AETHER 3D Digital Twin | 2. AdaIN Style Transfer | 3. SmartFocus AI (SHAP) | 4. SnapClass AI (Vision) | 5. Multi-Agent Assistant | 6. GAN Image Gen | 7. T5 Text Summarizer | 8. Local AI Assistant | 9. CommitPulse';
        break;
      case 'skills':
        response = 'Languages: Python, Java, C, C++, JS, SQL | AI/ML: PyTorch, Torchvision, Hugging Face, OpenCV, scikit-learn, Agno, Groq, ChromaDB | Web: FastAPI, Flask, Streamlit, Three.js';
        break;
      case 'adain':
        response = 'Adaptive Instance Normalization aligns channel-wise mean and variance of content feature maps with style activations extracted via VGG-19, decoded in real-time in PyTorch.';
        break;
      case 'twin':
        response = 'Navigating to AETHER 3D AI Digital Twin...';
        if (onNavigate) onNavigate('digital-twin');
        break;
      case 'stats':
        response = 'Metrics: 500+ DSA Solved · 14 Public Repositories · 9+ Shipped AI Systems · 99.4% Biometric Precision';
        break;
      case 'theme':
        const targetTheme = args[0] as ThemeMode;
        const validThemes: ThemeMode[] = [
          'cyberpunk', 'tokyo', 'emerald', 'nord', 'dracula', 'amber',
          'solar', 'synthwave', 'matrix', 'nebula', 'onyx', 'titanium'
        ];
        if (validThemes.includes(targetTheme)) {
          if (onThemeChange) onThemeChange(targetTheme);
          response = `Theme switched to '${targetTheme}'`;
          resType = 'success';
          soundEngine.playBoot();
        } else {
          response = "Invalid theme. Type 'themes' to list all 12 available palettes (e.g. 'theme tokyo', 'theme emerald', 'theme nord')";
          resType = 'warn';
        }
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for valid commands.`;
        resType = 'warn';
    }

    setHistory((prev) => [
      ...prev,
      { id: Math.random().toString(), command: raw, output: response, type: resType },
    ]);
    setInput('');
  };

  return (
    <div className="w-full bg-[#05060a] border border-white/15 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
      {/* Window Title Bar */}
      <div className="bg-[#111420] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[11px] text-gray-400 ml-3">riyanshu@neural-core:~ (zsh)</span>
        </div>
        <div className="text-[10px] text-gray-400 flex items-center gap-1.5">
          <TermIcon className="w-3 h-3 text-cyan-400" />
          <span>PORT 3000 // TENSOR HOST</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 h-[280px] overflow-y-auto space-y-3 leading-relaxed">
        {history.map((h) => (
          <div key={h.id} className="space-y-1">
            {h.command && (
              <div className="flex items-center gap-2 text-white">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-cyan-300 font-bold">{h.command}</span>
              </div>
            )}
            <div
              className={`pl-4 ${
                h.type === 'success'
                  ? 'text-emerald-400'
                  : h.type === 'warn'
                  ? 'text-amber-400'
                  : 'text-gray-300'
              }`}
            >
              {h.output}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command Input Bar */}
      <form onSubmit={handleCommand} className="border-t border-white/10 p-3 bg-black/50 flex items-center gap-2">
        <span className="text-emerald-400 font-bold pl-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help', 'projects', 'adain', 'stats', or 'theme matrix'..."
          className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-gray-600"
        />
        <button type="submit" className="p-1.5 rounded-lg text-gray-400 hover:text-white">
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
