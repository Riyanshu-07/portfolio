export type ThemeMode =
  | 'cyberpunk'
  | 'tokyo'
  | 'emerald'
  | 'nord'
  | 'dracula'
  | 'amber'
  | 'solar'
  | 'synthwave'
  | 'matrix'
  | 'nebula'
  | 'onyx'
  | 'titanium';

export interface ThemeColors {
  name: string;
  id: ThemeMode;
  tag: string;
  description: string;
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
