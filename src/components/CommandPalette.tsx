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
    { id: 'twin', label: 'Chat with AETHER AI Digital Twin', category: 'AI Twin', action: () => onNavigate('digital-twin'), icon: <Bot className="w-4 h-4 text-cyan-400" /> },
    { id: 'sandboxes', label: 'Interactive ML Sandbox (AdaIN & SHAP)', category: 'Algorithms', action: () => onNavigate('sandboxes'), icon: <Sliders className="w-4 h-4 text-violet-400" /> },
    { id: 'physics', label: 'Quantum Particle Physics Playground', category: 'Simulations', action: () => onNavigate('physics'), icon: <Terminal className="w-4 h-4 text-amber-400" /> },
    { id: 'analytics', label: 'Performance Analytics & Telemetry', category: 'System', action: () => onNavigate('analytics'), icon: <Shield className="w-4 h-4 text-emerald-400" /> },
    { id: 'leaderboard', label: 'Global Leaderboard & Social Invite', category: 'Social', action: () => onNavigate('leaderboard'), icon: <Trophy className="w-4 h-4 text-yellow-400" /> },
    { id: 'projects', label: 'Browse 9+ Shipped AI/ML Projects', category: 'Work', action: () => onNavigate('projects'), icon: <Code className="w-4 h-4 text-blue-400" /> },
    { id: 'journey', label: 'Engineering Journey: 7 Stages to Agentic AI', category: 'Bio', action: () => onNavigate('journey'), icon: <Compass className="w-4 h-4 text-pink-400" /> },
    // Theme switches
    { id: 'theme-cyberpunk', label: 'Switch Theme: Cyberpunk OS (Cyan/Violet)', category: 'Theme', action: () => onSelectTheme('cyberpunk'), icon: <Palette className="w-4 h-4 text-cyan-400" /> },
    { id: 'theme-amber', label: 'Switch Theme: Amber Luxury (Warm Core)', category: 'Theme', action: () => onSelectTheme('amber'), icon: <Palette className="w-4 h-4 text-amber-400" /> },
    { id: 'theme-matrix', label: 'Switch Theme: Matrix Quantum (Emerald)', category: 'Theme', action: () => onSelectTheme('matrix'), icon: <Palette className="w-4 h-4 text-emerald-400" /> },
    { id: 'theme-nebula', label: 'Switch Theme: Nebula Synth (Electric Pink)', category: 'Theme', action: () => onSelectTheme('nebula'), icon: <Palette className="w-4 h-4 text-pink-400" /> },
    { id: 'theme-titanium', label: 'Switch Theme: Titanium Light Tech', category: 'Theme', action: () => onSelectTheme('titanium'), icon: <Palette className="w-4 h-4 text-slate-300" /> },
    // External links
    { id: 'ext-github', label: 'GitHub Profile (github.com/Riyanshu-07)', category: 'Link', action: () => window.open('https://github.com/Riyanshu-07', '_blank'), icon: <ExternalLink className="w-4 h-4 text-gray-400" /> },
    { id: 'ext-linkedin', label: 'LinkedIn Profile', category: 'Link', action: () => window.open('https://www.linkedin.com/in/riyanshu-kandwal-555433309', '_blank'), icon: <ExternalLink className="w-4 h-4 text-gray-400" /> },
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
