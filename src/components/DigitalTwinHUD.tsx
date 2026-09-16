import React, { useState, useRef, useEffect } from 'react';
import { ThemeColors } from '../types';
import { soundEngine } from '../lib/audio';
import { haptic } from '../lib/haptics';
import { Bot, Send, Volume2, VolumeX, Sparkles, User, RefreshCw, Radio } from 'lucide-react';

interface DigitalTwinHUDProps {
  theme: ThemeColors;
  onBenchmarkScore?: (points: number) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'twin';
  text: string;
  timestamp: string;
}

export const DigitalTwinHUD: React.FC<DigitalTwinHUDProps> = ({ theme, onBenchmarkScore }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'twin',
      text: "Greetings! I'm AETHER, the 3D AI Digital Twin of Riyanshu Kandwal. I embody his knowledge in Generative AI, PyTorch architectures, computer vision, and multi-agent systems. Ask me anything about my projects or engineering journey!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || isLoading) return;

    soundEngine.playClick();
    haptic.trigger('light');

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/twin-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const replyText = data.reply || data.fallback || "I'm always ready to talk about machine learning, RAG, and computer vision!";

      const twinMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'twin',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, twinMsg]);
      soundEngine.playNeuralPulse();
      haptic.trigger('medium');

      if (ttsEnabled) {
        speakText(replyText);
      }

      if (onBenchmarkScore) {
        onBenchmarkScore(150);
      }
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'twin',
        text: "I specialize in end-to-end AI systems: from AdaIN neural style transfer in PyTorch and SmartFocus AI with SHAP, to my Multi-Agent Research Assistant. Feel free to explore my repositories on GitHub (github.com/Riyanshu-07)!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Explain your AdaIN style transfer project',
    'What is the architecture of AETHER 3D Twin?',
    'Tell me about your 500+ DSA problem journey',
    'How does SmartFocus AI use SHAP values?',
  ];

  return (
    <div className="w-full bg-[#0b0e17]/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Top Banner / Avatar Header */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-black/40">
        <div className="flex items-center gap-4">
          {/* Holographic Avatar Circle */}
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-full p-0.5 border-2 flex items-center justify-center transition-all ${
                isSpeaking ? 'scale-105 animate-pulse' : ''
              }`}
              style={{
                borderColor: theme.primary,
                boxShadow: isSpeaking ? `0 0 25px ${theme.glow}` : 'none',
              }}
            >
              <div className="w-full h-full rounded-full bg-black/60 flex items-center justify-center overflow-hidden">
                <Bot className="w-7 h-7" style={{ color: theme.primary }} />
              </div>
            </div>
            {/* Online Status beacon */}
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-white">
                AETHER // AI Digital Twin
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300">
                RAG + 3D SYNC
              </span>
            </div>
            <p className="text-xs font-mono text-gray-400">
              Multimodal Persona · Neural Memory · Latency: 18ms
            </p>
          </div>
        </div>

        {/* Audio / TTS Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setTtsEnabled(!ttsEnabled);
              soundEngine.playClick();
              haptic.trigger('light');
              if (ttsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
              ttsEnabled
                ? 'bg-cyan-400/15 border-cyan-400 text-cyan-300 shadow'
                : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {ttsEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{ttsEnabled ? 'VOICE SYNTH ON' : 'VOICE SYNTH OFF'}</span>
          </button>
        </div>
      </div>

      {/* Chat History */}
      <div className="p-4 sm:p-6 h-[340px] overflow-y-auto space-y-4 font-mono text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                m.sender === 'user'
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-black/60 text-cyan-400'
              }`}
              style={m.sender === 'twin' ? { borderColor: theme.primary, color: theme.primary } : {}}
            >
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[82%] rounded-2xl p-3.5 leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-white/10 text-white rounded-tr-xs border border-white/10'
                  : 'bg-black/40 text-gray-200 rounded-tl-xs border border-white/10'
              }`}
            >
              <div className="text-[10px] text-gray-400 mb-1 flex justify-between gap-4">
                <span>{m.sender === 'user' ? 'Visitor' : 'AETHER'}</span>
                <span>{m.timestamp}</span>
              </div>
              <p className="text-xs font-sans sm:text-[13px] leading-relaxed text-gray-200">{m.text}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg bg-black/60 border flex items-center justify-center shrink-0"
              style={{ borderColor: theme.primary, color: theme.primary }}
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="bg-black/40 border border-white/10 rounded-2xl rounded-tl-xs px-4 py-3 text-xs text-gray-400 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>AETHER is querying neural memory...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 sm:px-6 py-2 bg-black/20 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-400 transition-all shrink-0"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-4 sm:p-6 border-t border-white/10 bg-black/40 flex items-center gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AETHER about Riyanshu's ML models, vision architectures, or DSA experience..."
          className="flex-1 bg-black/50 border border-white/15 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 rounded-xl font-mono text-xs font-bold transition-all disabled:opacity-40"
          style={{
            background: theme.primary,
            color: '#000',
          }}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
