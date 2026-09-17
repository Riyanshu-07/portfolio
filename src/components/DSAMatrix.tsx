import React from 'react';
import { ThemeColors } from '../types';
import { 
  ExternalLink, 
  Clock, 
  Database, 
  Cpu, 
  Layers, 
  GitBranch, 
  Award
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface DSAMatrixProps {
  theme: ThemeColors;
}

export const DSAMatrix: React.FC<DSAMatrixProps> = ({ theme }) => {
  const topicDistribution = [
    { name: 'Arrays & Two Pointers', count: '160+', pct: 32, icon: <Layers className="w-4 h-4 text-cyan-400" /> },
    { name: 'Binary Trees & BSTs', count: '95+', pct: 19, icon: <GitBranch className="w-4 h-4 text-emerald-400" /> },
    { name: 'Dynamic Programming', count: '85+', pct: 17, icon: <Cpu className="w-4 h-4 text-violet-400" /> },
    { name: 'Graph Theory (BFS/DFS)', count: '75+', pct: 15, icon: <Database className="w-4 h-4 text-amber-400" /> },
    { name: 'Greedy & Heaps', count: '85+', pct: 17, icon: <Clock className="w-4 h-4 text-pink-400" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats Bar */}
      <div 
        className="p-6 sm:p-8 rounded-2xl border backdrop-blur-xl relative overflow-hidden transition-all"
        style={{
          backgroundColor: `${theme.panel}e6`,
          borderColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <div 
          className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: theme.primary }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-mono text-amber-400">
              <Award className="w-3.5 h-3.5" />
              <span>VERIFIED COMPETITIVE PROBLEM SOLVING</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-white">
              500+ Algorithmic Problems Solved
            </h3>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              Consistently practicing data structures &amp; algorithms in Java and Python across LeetCode and GeeksforGeeks. Focus on optimal time/space complexity, edge case handling, and scalable logic.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <a
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-black/70 border border-amber-400/30 hover:border-amber-400 hover:bg-amber-400/10 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold font-mono text-sm">
                LC
              </div>
              <div>
                <div className="text-[10px] font-mono text-gray-400 uppercase">LeetCode Profile</div>
                <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>@Riyanshu07</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </div>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.geeksforgeeks}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-black/70 border border-emerald-400/30 hover:border-emerald-400 hover:bg-emerald-400/10 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold font-mono text-sm">
                GFG
              </div>
              <div>
                <div className="text-[10px] font-mono text-gray-400 uppercase">GeeksforGeeks</div>
                <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>@riyanshu07</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Topic Breakdown Progress Bars */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
          {topicDistribution.map((item) => (
            <div 
              key={item.name} 
              className="p-3 rounded-xl border space-y-1.5"
              style={{
                backgroundColor: `${theme.bgSecondary}80`,
                borderColor: 'rgba(255, 255, 255, 0.06)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="p-1 rounded bg-white/5">{item.icon}</span>
                <span className="text-xs font-mono font-bold text-white">{item.count}</span>
              </div>
              <div className="text-xs text-gray-300 font-medium truncate">{item.name}</div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.pct * 2.8}%`, backgroundColor: theme.primary }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
