import { ThemeColors, ThemeMode } from '../types';

export const THEMES: Record<ThemeMode, ThemeColors> = {
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk OS',
    bg: '#05060a',
    bgSecondary: '#0a0d16',
    panel: '#0d111c',
    primary: '#4adede',
    secondary: '#8b7cff',
    accent: '#ff6b6b',
    border: 'rgba(255, 255, 255, 0.08)',
    text: '#e7e9f0',
    textMuted: '#828a9c',
    glow: 'rgba(74, 222, 222, 0.45)',
  },
  amber: {
    id: 'amber',
    name: 'Amber Luxury',
    bg: '#0a0d14',
    bgSecondary: '#111520',
    panel: '#151a28',
    primary: '#ff9c5c',
    secondary: '#8ba0ff',
    accent: '#ffd166',
    border: 'rgba(255, 255, 255, 0.09)',
    text: '#eef0f6',
    textMuted: '#8b91a3',
    glow: 'rgba(255, 156, 92, 0.45)',
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix Quantum',
    bg: '#020b08',
    bgSecondary: '#061610',
    panel: '#0a2017',
    primary: '#3ddc97',
    secondary: '#00f5d4',
    accent: '#a7f3d0',
    border: 'rgba(61, 220, 151, 0.16)',
    text: '#ecfdf5',
    textMuted: '#6ee7b7',
    glow: 'rgba(61, 220, 151, 0.45)',
  },
  nebula: {
    id: 'nebula',
    name: 'Nebula Synth',
    bg: '#0a0515',
    bgSecondary: '#120924',
    panel: '#1a0d33',
    primary: '#ff3399',
    secondary: '#9d4edd',
    accent: '#00f0ff',
    border: 'rgba(255, 51, 153, 0.16)',
    text: '#fae8ff',
    textMuted: '#c084fc',
    glow: 'rgba(255, 51, 153, 0.45)',
  },
  titanium: {
    id: 'titanium',
    name: 'Titanium Light Tech',
    bg: '#0f172a',
    bgSecondary: '#1e293b',
    panel: '#334155',
    primary: '#38bdf8',
    secondary: '#818cf8',
    accent: '#f43f5e',
    border: 'rgba(255, 255, 255, 0.14)',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    glow: 'rgba(56, 189, 248, 0.45)',
  },
};

export function getInitialTheme(): ThemeMode {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('riyanshu_theme') as ThemeMode;
    if (saved && THEMES[saved]) return saved;
  }
  return 'cyberpunk';
}
