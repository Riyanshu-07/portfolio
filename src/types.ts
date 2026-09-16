export type ThemeMode = 'cyberpunk' | 'amber' | 'matrix' | 'nebula' | 'titanium';

export interface ThemeColors {
  name: string;
  id: ThemeMode;
  bg: string;
  bgSecondary: string;
  panel: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  text: string;
  textMuted: string;
  glow: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badge?: string;
  flagship?: boolean;
  description: string;
  highlights: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  interactiveDemo?: 'adain' | 'smartfocus' | 'snapclass' | 'multiagent' | 'twin';
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  accuracy: number;
  latencyMs: number;
  badge: string;
  timestamp: string;
  verified: boolean;
}

export interface BenchmarkMetrics {
  fps: number;
  frameTimeMs: number;
  renderLatencyMs: number;
  activeParticles: number;
  antiCheatStatus: 'VERIFIED' | 'TAMPER_CHECK' | 'SECURE';
  audioSyncLatencyMs: number;
  gpuDrawCalls: number;
}
