import React, { useState } from 'react';
import { ThemeColors, ThemeMode } from '../types';
import { THEMES, THEME_LIST } from '../lib/theme';
import { soundEngine } from '../lib/audio';
import { haptic } from '../lib/haptics';
import { Palette, Check, X, Sparkles, Sliders, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ThemeGalleryModalProps {
  isOpen: boolean;
  currentThemeId: ThemeMode;
  onClose: () => void;
  onSelectTheme: (themeId: ThemeMode) => void;
}

export const ThemeGalleryModal: React.FC<ThemeGalleryModalProps> = ({
  isOpen,
  currentThemeId,
  onClose,
  onSelectTheme,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredTheme, setHoveredTheme] = useState<ThemeMode | null>(null);

  if (!isOpen) return null;

  const currentTheme = THEMES[currentThemeId];

  const categories = ['All', 'Cyber & Neon', 'Deep Learning', 'Dark Minimal', 'Retro Synth'];

  const filteredThemes = THEME_LIST.filter((t) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Cyber & Neon') return ['cyberpunk', 'tokyo', 'matrix'].includes(t.id);
    if (activeCategory === 'Deep Learning') return ['emerald', 'titanium', 'nord'].includes(t.id);
    if (activeCategory === 'Dark Minimal') return ['onyx', 'amber'].includes(t.id);
    if (activeCategory === 'Retro Synth') return ['synthwave', 'nebula', 'dracula', 'solar'].includes(t.id);
    return true;
  });

  const handleApply = (id: ThemeMode) => {
    onSelectTheme(id);
    soundEngine.playBoot();
    haptic.trigger('success');
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.2 },
      colors: [THEMES[id].primary, THEMES[id].secondary, THEMES[id].accent],
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-[#090c15] border rounded-2xl flex flex-col shadow-2xl overflow-hidden relative"
        style={{
          borderColor: currentTheme.primary,
          boxShadow: `0 0 50px ${currentTheme.primary}20`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold shadow-lg"
              style={{ background: currentTheme.primary, color: '#000' }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white tracking-wide">
                  Theme Gallery
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-white/10 text-cyan-300 border border-white/10">
                  12 Palettes
                </span>
              </div>
              <p className="text-xs font-mono text-gray-400 mt-0.5">
                Real-time 3D particle lighting, UI accents, and neural canvas shaders
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-5 sm:px-6 pt-4 pb-2 flex flex-wrap gap-2 border-b border-white/5 bg-black/20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                activeCategory === cat
                  ? 'bg-white/15 text-white font-bold border border-white/20'
                  : 'text-gray-400 hover:text-white bg-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Theme Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar">
          {filteredThemes.map((item) => {
            const isSelected = currentThemeId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleApply(item.id)}
                onMouseEnter={() => setHoveredTheme(item.id)}
                onMouseLeave={() => setHoveredTheme(null)}
                className={`group cursor-pointer rounded-xl p-4 transition-all duration-300 border relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 scale-[1.02] shadow-xl'
                    : 'border-white/10 hover:border-white/30 hover:scale-[1.01]'
                }`}
                style={{
                  backgroundColor: item.panel,
                  borderColor: isSelected ? item.primary : undefined,
                  boxShadow: isSelected ? `0 0 24px ${item.primary}30` : undefined,
                }}
              >
                {/* Theme Title & Tag */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="font-['Space_Grotesk'] font-bold text-base text-white group-hover:text-cyan-200 transition-colors">
                      {item.name}
                    </h4>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold tracking-wider"
                      style={{
                        background: `${item.primary}20`,
                        color: item.primary,
                        border: `1px solid ${item.primary}40`,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-4 min-h-[36px]">
                    {item.description}
                  </p>

                  {/* Color Swatches Palette */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider flex justify-between">
                      <span>Palette</span>
                      <span className="font-mono text-gray-500">{item.primary}</span>
                    </div>
                    <div className="flex items-center gap-1.5 h-6 rounded-lg p-1 bg-black/50 border border-white/10">
                      <div
                        className="flex-1 h-full rounded-md shadow-inner transition-transform group-hover:scale-105"
                        style={{ backgroundColor: item.primary }}
                        title={`Primary: ${item.primary}`}
                      />
                      <div
                        className="flex-1 h-full rounded-md shadow-inner transition-transform group-hover:scale-105"
                        style={{ backgroundColor: item.secondary }}
                        title={`Secondary: ${item.secondary}`}
                      />
                      <div
                        className="flex-1 h-full rounded-md shadow-inner transition-transform group-hover:scale-105"
                        style={{ backgroundColor: item.accent }}
                        title={`Accent: ${item.accent}`}
                      />
                      <div
                        className="w-8 h-full rounded-md border border-white/20 shadow-inner"
                        style={{ backgroundColor: item.bg }}
                        title={`Background: ${item.bg}`}
                      />
                    </div>
                  </div>

                  {/* Mini Preview Mockup */}
                  <div
                    className="p-2.5 rounded-lg border text-[11px] font-mono space-y-1"
                    style={{
                      backgroundColor: item.bg,
                      borderColor: item.border,
                      color: item.text,
                    }}
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <span style={{ color: item.primary }}>// NEURAL CORE</span>
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: item.accent }}
                      />
                    </div>
                    <div className="text-xs font-bold" style={{ color: item.primary }}>
                      PyTorch · SHAP · AdaIN
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between">
                  {isSelected ? (
                    <div
                      className="flex items-center gap-1.5 text-xs font-mono font-bold"
                      style={{ color: item.primary }}
                    >
                      <Check className="w-4 h-4" />
                      <span>ACTIVE THEME</span>
                    </div>
                  ) : (
                    <div className="text-xs font-mono text-gray-400 group-hover:text-white flex items-center gap-1">
                      <span>Click to Apply</span>
                      <Sparkles className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(item.id);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Applied' : 'Select'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-black/50 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Changes persist across visits via local storage</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Shortcut: Press ⌘K and type "Theme"</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
