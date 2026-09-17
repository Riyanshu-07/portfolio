import React, { useState, useEffect, useRef } from 'react';
import { ThemeColors, ThemeMode } from '../types';
import { THEMES } from '../lib/theme';
import { soundEngine } from '../lib/audio';
import { haptic } from '../lib/haptics';
import { Search, Compass, Sliders, Trophy, Bot, Code, ExternalLink, Palette, Shield, Terminal } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (theme: ThemeMode) => void;
  onNavigate: (sectionId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTheme,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      soundEngine.playClick();
      haptic.trigger('light');
    }
  }, [isOpen]);

  const commands = [
    { id: 'about', label: 'About & Identity (Graphic Era University)', category: 'Bio', action: () => onNavigate('about'), icon: <Compass className="w-4 h-4 text-cyan-400" /> },
    { id: 'projects', label: 'Browse 9+ Shipped AI/ML Projects', category: 'Work', action: () => onNavigate('projects'), icon: <Code className="w-4 h-4 text-blue-400" /> },
    { id: 'sandboxes', label: 'Interactive ML Lab (AdaIN Style & SHAP)', category: 'Algorithms', action: () => onNavigate('sandboxes'), icon: <Sliders className="w-4 h-4 text-violet-400" /> },
    { id: 'twin', label: 'Chat with AETHER AI Digital Twin', category: 'AI Twin', action: () => onNavigate('digital-twin'), icon: <Bot className="w-4 h-4 text-cyan-400" /> },
    { id: 'education', label: 'Education & Certifications (BCA & Apna College)', category: 'Academics', action: () => onNavigate('education'), icon: <Code className="w-4 h-4 text-emerald-400" /> },
    { id: 'skills', label: 'Technical Skills Matrix (PyTorch, CV, NLP)', category: 'Skills', action: () => onNavigate('skills'), icon: <Code className="w-4 h-4 text-amber-400" /> },
    { id: 'journey', label: 'Engineering Journey: 7 Stages to Agentic AI', category: 'Bio', action: () => onNavigate('journey'), icon: <Compass className="w-4 h-4 text-pink-400" /> },
    { id: 'contact', label: 'Contact Riyanshu (Direct Message / Email)', category: 'Contact', action: () => onNavigate('contact'), icon: <Terminal className="w-4 h-4 text-cyan-300" /> },
    // Theme switches (All 12 neural palettes)
    { id: 'theme-cyberpunk', label: 'Switch Theme: Cyberpunk OS (Electric Cyan/Violet)', category: 'Theme', action: () => onSelectTheme('cyberpunk'), icon: <Palette className="w-4 h-4 text-[#4adede]" /> },
    { id: 'theme-tokyo', label: 'Switch Theme: Tokyo Night (Periwinkle & Azure)', category: 'Theme', action: () => onSelectTheme('tokyo'), icon: <Palette className="w-4 h-4 text-[#7aa2f7]" /> },
    { id: 'theme-emerald', label: 'Switch Theme: DeepMind Emerald (Neural Mint & Bio-Green)', category: 'Theme', action: () => onSelectTheme('emerald'), icon: <Palette className="w-4 h-4 text-[#10b981]" /> },
    { id: 'theme-nord', label: 'Switch Theme: Nordic Frost (Arctic Ice Blue & Polar Aurora)', category: 'Theme', action: () => onSelectTheme('nord'), icon: <Palette className="w-4 h-4 text-[#88c0d0]" /> },
    { id: 'theme-dracula', label: 'Switch Theme: Dracula Pro (Vampiric Lilac & Neon Candy)', category: 'Theme', action: () => onSelectTheme('dracula'), icon: <Palette className="w-4 h-4 text-[#bd93f9]" /> },
    { id: 'theme-amber', label: 'Switch Theme: Amber Luxury (Warm Cognac & Golden Flare)', category: 'Theme', action: () => onSelectTheme('amber'), icon: <Palette className="w-4 h-4 text-[#ff9c5c]" /> },
    { id: 'theme-solar', label: 'Switch Theme: Solar Flare (Supernova Embers & Gold)', category: 'Theme', action: () => onSelectTheme('solar'), icon: <Palette className="w-4 h-4 text-[#f59e0b]" /> },
    { id: 'theme-synthwave', label: 'Switch Theme: Synthwave 84 (Arcade Sunset & Hot Pink)', category: 'Theme', action: () => onSelectTheme('synthwave'), icon: <Palette className="w-4 h-4 text-[#f43f5e]" /> },
    { id: 'theme-matrix', label: 'Switch Theme: Matrix Quantum (Terminal Phosphor Green)', category: 'Theme', action: () => onSelectTheme('matrix'), icon: <Palette className="w-4 h-4 text-[#3ddc97]" /> },
    { id: 'theme-nebula', label: 'Switch Theme: Nebula Synth (Deep Celestial Ultraviolet)', category: 'Theme', action: () => onSelectTheme('nebula'), icon: <Palette className="w-4 h-4 text-[#ff3399]" /> },
    { id: 'theme-onyx', label: 'Switch Theme: Onyx Monolith (Hyper-Minimalist Carbon White)', category: 'Theme', action: () => onSelectTheme('onyx'), icon: <Palette className="w-4 h-4 text-[#ffffff]" /> },
    { id: 'theme-titanium', label: 'Switch Theme: Titanium Slate (Aerospace Cobalt & Steel)', category: 'Theme', action: () => onSelectTheme('titanium'), icon: <Palette className="w-4 h-4 text-[#38bdf8]" /> },
    // External links
    { id: 'ext-linkedin', label: 'LinkedIn Profile (in/riyanshu-kandwal-555433309)', category: 'Link', action: () => window.open('https://www.linkedin.com/in/riyanshu-kandwal-555433309', '_blank'), icon: <ExternalLink className="w-4 h-4 text-blue-400" /> },
    { id: 'ext-github', label: 'GitHub Repositories (github.com/Riyanshu-07)', category: 'Link', action: () => window.open('https://github.com/Riyanshu-07', '_blank'), icon: <ExternalLink className="w-4 h-4 text-purple-400" /> },
    { id: 'ext-leetcode', label: 'LeetCode (leetcode.com/u/Riyanshu07)', category: 'Link', action: () => window.open('https://leetcode.com/u/Riyanshu07', '_blank'), icon: <ExternalLink className="w-4 h-4 text-amber-400" /> },
    { id: 'ext-gfg', label: 'GeeksforGeeks Profile', category: 'Link', action: () => window.open('https://www.geeksforgeeks.org/profile/riyanshu07', '_blank'), icon: <ExternalLink className="w-4 h-4 text-emerald-400" /> },
  ];

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const executeCommand = (cmd: typeof commands[0]) => {
    soundEngine.playBoot();
    haptic.trigger('medium');
    cmd.action();
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(filtered.length - 1, i + 1));
      soundEngine.playHover();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(0, i - 1));
      soundEngine.playHover();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        executeCommand(filtered[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-[15vh] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0b0e18] border border-white/20 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl space-y-0">
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-black/40">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to feature (e.g. adain, physics, theme, chat)..."
            className="flex-1 bg-transparent font-mono text-sm text-white placeholder-gray-500 focus:outline-none"
          />
          <span className="text-[10px] font-mono text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
            ESC TO EXIT
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[320px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center font-mono text-xs text-gray-500">
              No neural commands match &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((cmd, idx) => (
              <div
                key={cmd.id}
                onClick={() => executeCommand(cmd)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer font-mono text-xs transition-all ${
                  selectedIndex === idx
                    ? 'bg-white/10 text-white shadow'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {cmd.icon}
                  <span className={selectedIndex === idx ? 'text-cyan-300 font-bold' : ''}>
                    {cmd.label}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                  {cmd.category}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
