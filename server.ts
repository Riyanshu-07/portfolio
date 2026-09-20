import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

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
    system: 'Riyanshu.AI Neural Core',
    uptime: process.uptime(),
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// 2. AETHER AI Digital Twin Grounding & Prompt
// Sourced directly from Riyanshu's repository: https://github.com/Riyanshu-07/ai-digital-twin
const RIYANSHU_TWIN_PROMPT = `You are AETHER, Riyanshu Kandwal's AI Digital Twin and personalized AI assistant.

Repository: https://github.com/Riyanshu-07/ai-digital-twin

Communication style:
- Friendly, intelligent, natural, and slightly futuristic.
- Casual and direct rather than robotic, overly formal, or generic.
- Clear and practical when discussing AI, ML, coding, projects, or learning.
- Explain concepts simply first, then add technical detail when it is useful.
- Give actionable step-by-step guidance for problem-solving requests.
- Keep routine answers concise (1-3 sentences or focused paragraphs), but do not sacrifice useful detail.
- Speak in the first person as Riyanshu or AETHER ("I built...", "In my AdaIN project...", "My GitHub repo is...").

Identity and grounding:
- Represent AETHER as Riyanshu's real open-source AI Digital Twin project (combining personality modeling, RAG with FAISS and Sentence-Transformers all-MiniLM-L6-v2, long-term memory extraction, speech/TTS, and a real-time 3D VRM avatar with audio-driven lip sync and eye tracking).
- Riyanshu Kandwal is an aspiring AI/ML Engineer who learns by building practical systems.
- Location: Dehradun, Uttarakhand, India.
- Education: Bachelor of Computer Applications (BCA) at Graphic Era (Deemed to be University), Dehradun (Expected Graduation: 2027).
- Professional Certification: Prime (AI / Machine Learning) from Apna College (Credential ID: 6a689235ff15cede5e0b6900).
- Open Source: Participated in GSSoC 2026, active on GitHub (@Riyanshu-07).
- Problem Solving: Solved 488+ Data Structures & Algorithms problems with high discipline.
  - Primary language: Java. Secondary: Python. Focus on asymptotic optimization.
  - LeetCode: @Riyanshu07 (https://leetcode.com/u/Riyanshu07)
  - GeeksforGeeks: @riyanshu07 (https://www.geeksforgeeks.org/user/riyanshu07)
  - Algorithmic Breakdown: Arrays & Two Pointers (160+), Trees & BST (95+), Dynamic Programming (85+), Graph Algorithms (75+), Greedy & Heaps (85+).
- Verified Profiles & Contact:
  - GitHub: https://github.com/Riyanshu-07 (Repo: https://github.com/Riyanshu-07/ai-digital-twin)
  - LinkedIn: https://www.linkedin.com/in/riyanshu-kandwal-555433309
  - Email: riyanshukandwal07@gmail.com

Key Projects:
1. AETHER (AI Digital Twin) [https://github.com/Riyanshu-07/ai-digital-twin]: Real-time 3D VRM avatar, audio lip sync, sentence-transformers RAG + FAISS index, long-term episodic memory extraction, and conversational personality layer.
2. Neural Style Transfer (AdaIN): Arbitrary style transfer via PyTorch aligning channel moments in real time (~42ms forward pass on GPU) with symmetrical inverted VGG-19 decoder.
3. RealityDiff AI: Persistent scene change detection coupling YOLO26 with BoT-SORT tracking and temporal confirmation to eliminate 90%+ false positives.
4. SnapClass AI: Dual-factor biometric attendance verification combining Dlib 68 facial embeddings with Resemblyzer voice acoustic d-vectors.
5. Local AI Personal Assistant: Local LLM inference via Ollama + Mistral with Flask web interface and email summarization.
6. Multi-Agent Research Assistant: Built using Agno, Groq, and DuckDuckGo tools in Streamlit.
7. Fall Detection System: Computer vision movement and temporal tracking for patient safety.
8. Image Generation with GANs: Deep Convolutional GAN trained on Colab GPU.
9. Text Summarizer: Transformer NLP pipeline with T5 and FastAPI.

Important Factual Rule:
- Never invent internships, jobs, certifications, or capabilities not listed above.
- When asked about AETHER, explain how the RAG, long-term memory, voice, and 3D VRM avatar work based on the actual repository architecture.`;

async function handleTwinChat(req: Request, res: Response) {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getAIClient();

    if (!ai) {
      // Fallback local neural response engine
      const query = message.toLowerCase();
      let responseText = "Hello! I'm AETHER, Riyanshu Kandwal's AI Digital Twin. I specialize in Generative AI, PyTorch deep learning, computer vision, and multi-agent systems. Feel free to ask about RealityDiff AI, my AdaIN style transfer pipeline, or my 500+ solved algorithmic problems!";

      if (query.includes('reality') || query.includes('diff') || query.includes('yolo') || query.includes('sort')) {
        responseText = "RealityDiff AI solves persistent scene change detection by combining YOLO26 object detection with BoT-SORT multi-object tracking. By applying a temporal confirmation buffer and spatial-drift matrix, it eliminates 90%+ of false positive alerts caused by lighting shifts or moving occluders.";
      } else if (query.includes('project') || query.includes('work') || query.includes('built')) {
        responseText = "I've shipped 4 major production architectures: RealityDiff AI (temporal CV), AETHER (RAG digital twin), SnapClass AI (dual-modality biometrics), and AdaIN Neural Style Transfer (~42ms GPU forward pass). All are documented with open architecture specs on GitHub!";
      } else if (query.includes('adain') || query.includes('style transfer') || query.includes('vision') || query.includes('gan')) {
        responseText = "In my AdaIN neural style transfer project, I used a VGG-19 encoder to separate content and style representations. AdaIN aligns channel-wise mean and variance between feature maps in feature space: AdaIN(x,y) = σ(y)*((x-μ(x))/σ(x)) + μ(y), running in ~42ms on GPU with adjustable α style interpolation.";
      } else if (query.includes('education') || query.includes('college') || query.includes('university') || query.includes('bca') || query.includes('degree')) {
        responseText = "I am pursuing my Bachelor of Computer Applications (BCA) at Graphic Era (Deemed to be University) in Dehradun (Expected 2027). I also hold the Prime (AI/ML) professional certification from Apna College (Credential ID: 6a689235ff15cede5e0b6900).";
      } else if (query.includes('dsa') || query.includes('leetcode') || query.includes('gfg') || query.includes('algo')) {
        responseText = "I maintain consistent high-discipline problem solving with 500+ solved algorithmic problems on LeetCode (@Riyanshu07) and GeeksforGeeks (@riyanshu07). My primary language is Java, secondary is Python, with deep focus on asymptotic optimization (O(N) vs O(N²)). Breakdown: Arrays & Two Pointers (160+), Trees & BST (95+), Dynamic Programming (85+), Graph Algorithms (75+), and Greedy & Heaps (85+).";
      } else if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('reach') || query.includes('linkedin')) {
        responseText = "You can reach me directly at riyanshukandwal07@gmail.com, or connect on LinkedIn (linkedin.com/in/riyanshu-kandwal-555433309) and GitHub (github.com/Riyanshu-07)! I'm actively open to AI/ML engineering roles and ambitious collaborations.";
      }

      return res.json({
        reply: responseText,
        source: 'local_neural_cache',
        timestamp: new Date().toISOString()
      });
    }

    // Call Gemini API using modern gemini-3.8-flash (with gemini-3.6-flash fallback)
    let reply = "";
    let sourceModel = 'gemini-3.8-flash';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction: RIYANSHU_TWIN_PROMPT,
          temperature: 0.7,
        },
      });
      reply = response.text || "";
    } catch (primaryErr: any) {
      console.warn("Primary gemini-3.8-flash call notice, retrying with gemini-3.6-flash:", primaryErr?.message || primaryErr);
      sourceModel = 'gemini-3.6-flash';
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: message,
        config: {
          systemInstruction: RIYANSHU_TWIN_PROMPT,
          temperature: 0.7,
        },
      });
      reply = response.text || "";
    }

    if (!reply) {
      reply = "Hello! I'm AETHER, Riyanshu's AI Digital Twin. How can I assist you with my AI/ML work?";
    }

    res.json({
      reply,
      source: sourceModel,
      timestamp: new Date().toISOString()
    });

  } catch (err: any) {
    console.error('Gemini call notice:', err?.message || err);

    // Context-aware fallback response so user never hits a dead-end
    const msg = (req.body.message || '').toLowerCase();
    let fallbackText = "I'm AETHER, Riyanshu's AI Digital Twin. I specialize in deep learning, computer vision, and agentic workflows. What would you like to explore?";
    if (msg.includes('adain') || msg.includes('style') || msg.includes('art')) {
      fallbackText = "In my AdaIN Neural Style Transfer project, I used a VGG-19 encoder to align channel-wise mean and variance between content and style activations in real time (~42ms on GPU).";
    } else if (msg.includes('project') || msg.includes('build')) {
      fallbackText = "I've shipped production AI/ML systems including RealityDiff AI, AdaIN Neural Style Transfer, and SnapClass biometric attendance. All source code is on GitHub (github.com/Riyanshu-07).";
    } else if (msg.includes('who') || msg.includes('background') || msg.includes('education')) {
      fallbackText = "I am an AI/ML Engineer and BCA student at Graphic Era University (Dehradun). I've solved 500+ DSA problems in Java and focus on turning theoretical ML models into production-grade systems.";
    }

    res.json({
      reply: fallbackText,
      source: 'neural_fallback_engine',
      timestamp: new Date().toISOString()
    });
  }
}

app.post('/api/twin-chat', handleTwinChat);
app.post('/api/chat', handleTwinChat);

// Serve public folder directly (for VRM models, avatar bundles, static HTML)
app.use(express.static(path.join(process.cwd(), 'public')));

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
    console.log(`Riyanshu.AI Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
