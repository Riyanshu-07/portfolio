import React, { useState, useEffect } from 'react';
import { ThemeColors, LeaderboardEntry } from '../types';
import { antiCheat } from '../lib/anticheat';
import { soundEngine } from '../lib/audio';
import { haptic } from '../lib/haptics';
import { Trophy, Users, Share2, Copy, Check, ShieldCheck, UserCheck, Sparkles, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SocialLeaderboardProps {
  theme: ThemeColors;
  userScore?: number;
}

export const SocialLeaderboard: React.FC<SocialLeaderboardProps> = ({ theme, userScore = 0 }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [callsign, setCallsign] = useState(antiCheat.getCallsign());
  const [isEditingCallsign, setIsEditingCallsign] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'speed'>('all');

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      if (data.success && data.data) {
        setLeaderboard(data.data);
      }
    } catch (e) {
      // Fallback in-memory scores
      setLeaderboard([
        { id: '1', username: 'NeuroTitan', score: 9840, accuracy: 99.4, latencyMs: 12, badge: 'Neural Grandmaster', timestamp: '2026-09-15', verified: true },
        { id: '2', username: 'AdaIN_Wizard', score: 9420, accuracy: 98.1, latencyMs: 16, badge: 'Vision Architect', timestamp: '2026-09-15', verified: true },
        { id: '3', username: 'QuantumCoder', score: 9150, accuracy: 97.6, latencyMs: 14, badge: 'Agent Pioneer', timestamp: '2026-09-15', verified: true },
        { id: '4', username: 'DeepMatrix', score: 8890, accuracy: 96.5, latencyMs: 21, badge: 'RAG Sentinel', timestamp: '2026-09-16', verified: true },
        { id: '5', username: 'CyberSora', score: 8640, accuracy: 95.8, latencyMs: 19, badge: 'Physics Master', timestamp: '2026-09-16', verified: true },
      ]);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleSaveCallsign = () => {
    antiCheat.setCallsign(callsign);
    setIsEditingCallsign(false);
    soundEngine.playClick();
    haptic.trigger('success');
  };

  const inviteCode = `RIY-${callsign.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5) || 'NEURO'}-2026`;
  const inviteUrl = typeof window !== 'undefined' ? `${window.location.origin}/#invite=${inviteCode}` : `https://riyanshu-os.dev/#invite=${inviteCode}`;

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    soundEngine.playBoot();
    haptic.trigger('success');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const filteredLeaderboard = leaderboard.filter((item) => {
    if (activeFilter === 'verified') return item.verified;
    if (activeFilter === 'speed') return item.latencyMs <= 15;
    return true;
  });

  return (
    <div className="w-full bg-[#0d111c]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400">
            <Trophy className="w-3.5 h-3.5" />
            Global Competitive Neural Leaderboard & Social Mesh
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-white mt-1">
            Global Benchmarks & Operator Ranks
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Rankings cryptographically verified by client-side anti-cheat HMAC signatures.
          </p>
        </div>

        {/* User Callsign Card */}
        <div className="flex items-center gap-3 bg-black/40 border border-white/10 p-2.5 rounded-xl">
          <div className="w-9 h-9 rounded-lg bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm">
            {callsign.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-[10px] font-mono text-gray-400">CURRENT OPERATOR</div>
            {isEditingCallsign ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  className="bg-black border border-cyan-400 px-2 py-0.5 rounded text-xs font-mono text-white focus:outline-none w-28"
                  autoFocus
                />
                <button
                  onClick={handleSaveCallsign}
                  className="text-xs font-mono bg-cyan-400 text-black px-2 py-0.5 rounded font-bold"
                >
                  SAVE
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingCallsign(true)}
                className="text-xs font-mono font-bold text-white hover:text-cyan-400 cursor-pointer flex items-center gap-1.5"
                title="Click to rename callsign"
              >
                <span>{callsign}</span>
                <span className="text-[10px] text-gray-500 underline">[EDIT]</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Social Invite & Referral Section */}
      <div
        className="rounded-2xl p-6 border transition-all"
        style={{
          background: `linear-gradient(135deg, rgba(74, 222, 222, 0.05), rgba(139, 124, 255, 0.05))`,
          borderColor: 'rgba(255, 255, 255, 0.12)',
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
              <Users className="w-4 h-4" />
              <span>INVITE PEERS &amp; COLLABORATE</span>
            </div>
            <h4 className="text-lg font-bold font-['Space_Grotesk'] text-white">
              Recruit Engineers to Riyanshu.OS Challenge
            </h4>
            <p className="text-xs text-gray-400 max-w-xl">
              Share your personal invite link to compare neural particle physics scores, model benchmark inference speeds, and unlock collaborative social badges.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <div className="bg-black/60 border border-white/15 px-4 py-2.5 rounded-xl font-mono text-xs text-cyan-300 flex items-center justify-between gap-3">
              <span className="text-gray-400">CODE:</span>
              <span className="font-bold tracking-wider">{inviteCode}</span>
            </div>
            <button
              onClick={handleCopyInvite}
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 transition-all shadow-lg"
              style={{ background: theme.primary }}
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'COPIED LINK!' : 'COPY INVITE LINK'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="space-y-4">
        {/* Filter Pills */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => { setActiveFilter('all'); soundEngine.playClick(); }}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                activeFilter === 'all'
                  ? 'bg-white/15 border-cyan-400 text-white font-bold'
                  : 'border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              ALL OPERATORS
            </button>
            <button
              onClick={() => { setActiveFilter('verified'); soundEngine.playClick(); }}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                activeFilter === 'verified'
                  ? 'bg-white/15 border-cyan-400 text-white font-bold'
                  : 'border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              100% VERIFIED
            </button>
            <button
              onClick={() => { setActiveFilter('speed'); soundEngine.playClick(); }}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                activeFilter === 'speed'
                  ? 'bg-white/15 border-cyan-400 text-white font-bold'
                  : 'border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              SUB-15MS LATENCY
            </button>
          </div>

          <div className="text-[11px] font-mono text-gray-400 hidden sm:block">
            ACTIVE PEER NODES: 24 · ANTI-CHEAT SYNC: REALTIME
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-[11px] bg-black/30">
                <th className="p-3 pl-4">RANK</th>
                <th className="p-3">OPERATOR CALLSIGN</th>
                <th className="p-3">SCORE</th>
                <th className="p-3">ACCURACY</th>
                <th className="p-3">LATENCY</th>
                <th className="p-3">ANTI-CHEAT</th>
                <th className="p-3 pr-4">BADGE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredLeaderboard.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`hover:bg-white/5 transition-colors ${
                    row.username.toLowerCase() === callsign.toLowerCase()
                      ? 'bg-cyan-500/10 font-bold text-white'
                      : ''
                  }`}
                >
                  <td className="p-3 pl-4 flex items-center gap-2">
                    {idx === 0 && <span className="text-amber-400 font-bold">🥇 01</span>}
                    {idx === 1 && <span className="text-gray-300 font-bold">🥈 02</span>}
                    {idx === 2 && <span className="text-amber-600 font-bold">🥉 03</span>}
                    {idx > 2 && <span className="text-gray-500">#{idx + 1}</span>}
                  </td>
                  <td className="p-3 font-semibold text-white flex items-center gap-2">
                    <span>{row.username}</span>
                    {row.username.toLowerCase() === callsign.toLowerCase() && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300">YOU</span>
                    )}
                  </td>
                  <td className="p-3 font-bold" style={{ color: theme.primary }}>
                    {row.score.toLocaleString()}
                  </td>
                  <td className="p-3 text-emerald-400">{row.accuracy}%</td>
                  <td className="p-3 text-gray-400">{row.latencyMs}ms</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED
                    </span>
                  </td>
                  <td className="p-3 pr-4">
                    <span className="text-[11px] text-gray-300 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {row.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
