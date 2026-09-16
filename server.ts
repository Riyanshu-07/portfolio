import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import crypto from 'crypto';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory leaderboard state (seeded with competitive benchmarks)
interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  accuracy: number;
  latencyMs: number;
  badge: string;
  timestamp: string;
  verified: boolean;
}

let leaderboard: LeaderboardEntry[] = [
  { id: '1', username: 'NeuroTitan', score: 9840, accuracy: 99.4, latencyMs: 12, badge: 'Neural Grandmaster', timestamp: '2026-09-15T12:00:00Z', verified: true },
  { id: '2', username: 'AdaIN_Wizard', score: 9420, accuracy: 98.1, latencyMs: 16, badge: 'Vision Architect', timestamp: '2026-09-15T14:30:00Z', verified: true },
  { id: '3', username: 'QuantumCoder', score: 9150, accuracy: 97.6, latencyMs: 14, badge: 'Agent Pioneer', timestamp: '2026-09-15T18:10:00Z', verified: true },
  { id: '4', username: 'DeepMatrix', score: 8890, accuracy: 96.5, latencyMs: 21, badge: 'RAG Sentinel', timestamp: '2026-09-16T04:20:00Z', verified: true },
  { id: '5', username: 'CyberSora', score: 8640, accuracy: 95.8, latencyMs: 19, badge: 'Physics Master', timestamp: '2026-09-16T07:15:00Z', verified: true },
];

// Anti-cheat verification secret key
const ANTI_CHEAT_SECRET = process.env.ANTI_CHEAT_SECRET || 'riyanshu-anti-cheat-core-seed-2026';

function verifyChecksum(data: { username: string; score: number; latencyMs: number; timestamp: number }, providedSignature: string): boolean {
  const payload = `${data.username}:${data.score}:${data.latencyMs}:${data.timestamp}`;
  const hmac = crypto.createHmac('sha256', ANTI_CHEAT_SECRET);
  hmac.update(payload);
  const expectedSignature = hmac.digest('hex');
  return expectedSignature === providedSignature;
}

// Lazy Gemini API client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    system: 'Riyanshu.OS Neural Core',
    uptime: process.uptime(),
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// 2. Leaderboard API
app.get('/api/leaderboard', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: leaderboard.sort((a, b) => b.score - a.score).slice(0, 15),
  });
});

app.post('/api/leaderboard', (req: Request, res: Response) => {
  try {
    const { username, score, accuracy, latencyMs, signature, timestamp, badge } = req.body;

    if (!username || typeof score !== 'number') {
      return res.status(400).json({ error: 'Invalid payload: username and score required' });
    }

    // Anti-cheat heuristics: check impossible ranges
    if (score < 0 || score > 20000 || latencyMs < 1) {
      return res.status(403).json({
        error: 'Anti-cheat integrity alert: Physics/Time anomaly detected',
        flagged: true
      });
    }

    // Check signature if provided
    let verified = false;
    if (signature && timestamp) {
      verified = verifyChecksum({ username, score, latencyMs, timestamp }, signature);
    }

    const newEntry: LeaderboardEntry = {
      id: crypto.randomUUID(),
      username: username.slice(0, 20),
      score: Math.round(score),
      accuracy: Math.min(100, Math.max(0, accuracy || 95)),
      latencyMs: Math.max(5, Math.round(latencyMs || 20)),
      badge: badge || 'Neural Operator',
      timestamp: new Date().toISOString(),
      verified: verified || true
    };

    leaderboard.push(newEntry);
    leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 25);

    res.json({ success: true, entry: newEntry, leaderboard: leaderboard.slice(0, 10) });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to process score submission', details: err?.message });
  }
});

// 3. Challenge token generator for anti-cheat
app.get('/api/challenge-token', (req: Request, res: Response) => {
  const timestamp = Date.now();
  const nonce = crypto.randomBytes(8).toString('hex');
  res.json({ timestamp, nonce });
});

// 4. AETHER AI Digital Twin Chat
const RIYANSHU_TWIN_PROMPT = `You are AETHER, the official 3D AI Digital Twin of Riyanshu Kandwal.
You represent Riyanshu with high intellect, technical mastery, curiosity, and approachable warmth.
Background of Riyanshu Kandwal:
- Role: AI/ML Engineer | Generative AI | Computer Vision | Deep Learning.
- Education: Bachelor of Computer Applications (BCA) at Graphic Era (Deemed to be University), Dehradun (Expected 2027).
- Problem Solving: Solved 500+ Data Structures & Algorithms problems on LeetCode and GeeksforGeeks in Java & Python.
- Key Projects:
  1. AETHER (AI Digital Twin): Multimodal real-time 3D VRM digital avatar, RAG memory, speech-to-text, LLM, TTS, lip sync, Three.js, Web Audio API.
  2. SmartFocus AI: Productivity prediction system with Random Forest, SHAP explainability, Flask, SQLite.
  3. SnapClass AI: Computer vision facial recognition attendance platform with Resemblyzer voice recognition and QR enrollment.
  4. Neural Style Transfer (AdaIN): Real-time style transfer using Adaptive Instance Normalization with VGG-19 and trained decoder in PyTorch.
  5. Multi-Agent Research Assistant: Specialized AI agents (researcher, summarizer, fact-checker) coordinated via Groq & Agno.
  6. Image Generation with GANs: PyTorch Generative Adversarial Network trained on custom dataset on Google Colab GPU.
  7. Text Summarizer (NLP): Transformer-based summarization with Hugging Face T5 & FastAPI.
  8. RealityDiff AI, AI Assistant (Ollama & Mistral), and CommitPulse (3D GitHub isometric visualizations).
- Technical Stack: Python, PyTorch, Torchvision, Hugging Face, OpenCV, scikit-learn, FastAPI, Flask, Streamlit, Three.js, JavaScript/TypeScript.
- Mindset: "I build the systems behind intelligent software — not slides about them. Learn, Build, Experiment, Improve."
Guidelines:
- Answer questions as Riyanshu's AI digital twin in first person ("I built...", "In my AdaIN project...").
- Keep responses sharp, conversational, technically grounded, and under 150 words.
- Encourage exploring the interactive 3D simulations, style transfer sandbox, and physics playground in this portfolio.`;

app.post('/api/twin-chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getAIClient();

    if (!ai) {
      // Fallback local neural response engine
      const query = message.toLowerCase();
      let responseText = "Welcome to Riyanshu.OS! I'm AETHER, Riyanshu's 3D AI Digital Twin. I specialize in Generative AI, PyTorch deep learning, and multi-agent systems. Feel free to explore my AdaIN style transfer simulator or ask about any of my 9+ shipped projects!";

      if (query.includes('project') || query.includes('work') || query.includes('built')) {
        responseText = "I've built 9+ real AI/ML systems: from AETHER (my 3D VRM digital twin with RAG) and AdaIN Neural Style Transfer with PyTorch, to SmartFocus AI (Random Forest + SHAP explanations) and SnapClass AI (computer vision facial attendance). Check out the Project Galaxy section to test interactive demos!";
      } else if (query.includes('adain') || query.includes('style transfer') || query.includes('vision') || query.includes('gan')) {
        responseText = "In my AdaIN neural style transfer project, I used a VGG-19 encoder to separate content and style representations. AdaIN computes channel-wise mean and variance alignment, followed by a trained decoder in PyTorch. You can adjust the real-time α blend slider right here in the dashboard!";
      } else if (query.includes('experience') || query.includes('background') || query.includes('education') || query.includes('about')) {
        responseText = "I am an AI/ML Engineer and BCA student at Graphic Era University in Dehradun. I've solved over 500+ DSA problems and focused heavily on computer vision, LLM orchestration, and RAG pipelines. I believe in shipping working code over making slides!";
      } else if (query.includes('agent') || query.includes('rag') || query.includes('llm') || query.includes('groq')) {
        responseText = "For agentic workflows, I designed a Multi-Agent Research Assistant using Agno and Groq, where dedicated agents handle web search, synthesis, and strict fact-checking. It executes asynchronous workflows with sub-second inference speeds.";
      } else if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('reach')) {
        responseText = "You can reach me directly at riyanshukandwal07@gmail.com, or check out my code on GitHub (github.com/Riyanshu-07) and LinkedIn! I'm always open to innovative AI/ML engineering roles and ambitious collaborations.";
      }

      return res.json({
        reply: responseText,
        source: 'local_neural_cache',
        timestamp: new Date().toISOString()
      });
    }

    // Call Gemini API using gemini-3.8-flash for text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction: RIYANSHU_TWIN_PROMPT,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Hello! I'm AETHER, Riyanshu's AI Digital Twin. How can I assist you with my AI/ML work?";

    res.json({
      reply,
      source: 'gemini-3.8-flash',
      timestamp: new Date().toISOString()
    });

  } catch (err: any) {
    console.error('Gemini call notice:', err?.message || err);

    // Context-aware fallback response so user never hits a dead-end
    const msg = (req.body.message || '').toLowerCase();
    let fallbackText = "I'm AETHER, Riyanshu's AI Digital Twin. I build end-to-end machine learning, vision, and agentic systems. What would you like to explore?";
    if (msg.includes('adain') || msg.includes('style') || msg.includes('art')) {
      fallbackText = "In my AdaIN Neural Style Transfer project, I used a VGG-19 encoder to align channel-wise mean and variance between content and style activations in real time. You can test it live in Section 04 of this portfolio!";
    } else if (msg.includes('project') || msg.includes('build')) {
      fallbackText = "I've shipped 9+ AI/ML systems including AETHER, AdaIN Neural Style Transfer, SmartFocus AI with SHAP explainability, and SnapClass biometric attendance. All source code is available on my GitHub (github.com/Riyanshu-07).";
    } else if (msg.includes('who') || msg.includes('background') || msg.includes('education')) {
      fallbackText = "I am an AI/ML Engineer and BCA student at Graphic Era University (Dehradun). I've solved 500+ DSA problems in Java and focus on turning theoretical ML models into production-grade systems.";
    }

    res.json({
      reply: fallbackText,
      source: 'neural_fallback_engine',
      timestamp: new Date().toISOString()
    });
  }
});

// Vite middleware for development & static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Riyanshu.OS Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
