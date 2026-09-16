import { ProjectItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Riyanshu Kandwal',
  role: 'AI / ML Engineer',
  tagline: 'Building intelligent systems that learn, create, and solve real-world problems.',
  location: 'Dehradun, Uttarakhand, India',
  email: 'riyanshukandwal07@gmail.com',
  github: 'https://github.com/Riyanshu-07',
  linkedin: 'https://www.linkedin.com/in/riyanshu-kandwal-555433309',
  geeksforgeeks: 'https://www.geeksforgeeks.org/profile/riyanshu07',
  leetcode: 'https://leetcode.com/u/Riyanshu07',
  university: 'Graphic Era (Deemed to be University) | Dehradun',
  degree: 'Bachelor of Computer Applications (BCA)',
  expectedGraduation: 'Expected 2027',
  certification: 'Prime (AI/ML) — Apna College (Credential ID: 6a689235ff15cede5e0b6900)',
  dsaSolvedCount: 500,
  publicReposCount: 14,
  mlProjectsCount: 9,
  mindset: 'I build the systems behind intelligent software — not slides about them. Learn, Build, Experiment, Improve.'
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'aether-twin',
    title: 'AETHER — 3D AI Digital Twin',
    category: 'Generative AI & Real-Time 3D',
    badge: 'FLAGSHIP',
    flagship: true,
    description: 'A multimodal AI Digital Twin integrating RAG, semantic embeddings, long-term memory, personality modeling, voice interaction, and real-time 3D VRM avatar with audio lip-synchronization.',
    highlights: [
      'Speech-to-Text → Retrieval & Memory → LLM → Text-to-Speech pipeline',
      'Real-time 3D VRM Avatar rendered with Three.js & Web Audio API lip-sync',
      'Context-aware knowledge base over Riyanshu\'s personal work and engineering philosophy',
    ],
    tags: ['Python', 'LLMs', 'RAG', 'Semantic Embeddings', 'Three.js', 'VRM', 'Web Audio API', 'TTS'],
    githubUrl: 'https://github.com/Riyanshu-07/ai-digital-twin',
    interactiveDemo: 'twin',
  },
  {
    id: 'adain-style',
    title: 'Neural Style Transfer — AdaIN',
    category: 'Computer Vision & Deep Learning',
    badge: 'FLAGSHIP',
    flagship: true,
    description: 'Implements real-time neural style transfer using Adaptive Instance Normalization (AdaIN), VGG-19 feature extraction, and a trained decoder in PyTorch with adjustable style strength (α).',
    highlights: [
      'VGG-19 encoder extracts content and style activations',
      'AdaIN layer aligns channel-wise mean and standard deviation between feature maps',
      'Trained decoder network reconstructs stylized images with interactive α interpolation slider'
    ],
    tags: ['PyTorch', 'Torchvision', 'AdaIN', 'VGG-19', 'Deep Learning', 'Flask', 'Pillow', 'NumPy'],
    githubUrl: 'https://github.com/Riyanshu-07',
    interactiveDemo: 'adain',
  },
  {
    id: 'smartfocus',
    title: 'SmartFocus AI — Productivity Prediction',
    category: 'Explainable AI & Machine Learning',
    badge: 'ORIGINAL',
    description: 'Random Forest regression pipeline predicting student productivity scores using behavioral and environmental factors with live SHAP feature attribution and SQLite history.',
    highlights: [
      'Trained Random Forest regressor on study hours, breaks, noise (dB), lighting, and distractions',
      'Integrated SHAP (SHapley Additive exPlanations) for transparent model explainability',
      'Interactive dashboard for predictive scenario simulation and productivity tracking'
    ],
    tags: ['Python', 'scikit-learn', 'Random Forest', 'SHAP', 'Flask', 'SQLite', 'Pandas', 'Matplotlib'],
    githubUrl: 'https://github.com/Riyanshu-07/SmartFocus-AI',
    interactiveDemo: 'smartfocus',
  },
  {
    id: 'snapclass',
    title: 'SnapClass — AI Attendance System',
    category: 'Computer Vision & Audio Biometrics',
    badge: 'ORIGINAL',
    description: 'An AI-powered attendance platform combining face recognition, voice biometric authentication, and QR-based student enrollment with dedicated teacher/student dashboards.',
    highlights: [
      'Facial recognition via OpenCV & Dlib 68-point landmark vector embeddings',
      'Voice recognition module powered by Resemblyzer and Librosa for biometric spoof resistance',
      'Automated attendance logging with cloud Supabase integration and real-time dashboard'
    ],
    tags: ['Python', 'Streamlit', 'Flask', 'OpenCV', 'Dlib', 'Resemblyzer', 'Librosa', 'Supabase'],
    githubUrl: 'https://github.com/Riyanshu-07/snapclass-main-riyanshu',
    interactiveDemo: 'snapclass',
  },
  {
    id: 'multiagent-research',
    title: 'Multi-Agent Research Assistant',
    category: 'Agentic AI & Orchestration',
    badge: 'ORIGINAL',
    description: 'Coordinated autonomous agent pipeline where specialized research, summarization, and verification agents collaborate in real-time to generate factual research briefs.',
    highlights: [
      'Multi-agent orchestration architecture utilizing Agno and Groq high-speed inference',
      'Tri-stage execution: Autonomous Web Searcher → Synthesis Engine → Strict Fact-Checker',
      'Sub-second query turnaround with citations and confidence metrics'
    ],
    tags: ['Python', 'Streamlit', 'Groq', 'Agno', 'LLMs', 'Agentic Workflows'],
    githubUrl: 'https://github.com/Riyanshu-07/multi-agent-research-assistant',
    interactiveDemo: 'multiagent',
  },
  {
    id: 'gan-image-gen',
    title: 'Image Generation with GANs',
    category: 'Deep Learning & Generative Models',
    badge: 'ORIGINAL',
    description: 'PyTorch-based Generative Adversarial Network trained on custom image datasets for realistic synthetic image generation using Google Colab GPU compute.',
    highlights: [
      'Deep Convolutional GAN (DCGAN) with custom Generator and Discriminator architectures',
      'Minimax loss function with spectral normalization and Adam optimizer',
      'Latent space interpolation allowing fluid transitions between generated styles'
    ],
    tags: ['PyTorch', 'Torchvision', 'GANs', 'Deep Learning', 'Computer Vision'],
    githubUrl: 'https://github.com/Riyanshu-07/Image-Generation-with-GANs',
  },
  {
    id: 'text-summarizer',
    title: 'Text Summarizer (NLP)',
    category: 'Natural Language Processing',
    badge: 'ORIGINAL',
    description: 'Transformer-based text summarization service powered by fine-tuned T5 models from Hugging Face, turning lengthy documents into concise summaries.',
    highlights: [
      'Hugging Face T5-small and T5-base encoder-decoder transformer architecture',
      'FastAPI microservice endpoints with beam-search generation',
      'Configurable compression ratios for abstractive summarization'
    ],
    tags: ['T5', 'Transformers', 'Hugging Face', 'FastAPI', 'NLP', 'Python'],
    githubUrl: 'https://github.com/Riyanshu-07/Text-Summarizer-NLP-',
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant (Local LLM)',
    category: 'LLMs & Edge Inference',
    badge: 'ORIGINAL',
    description: 'Flask-based local assistant handling question answering and email summarization using Ollama and Mistral — running 100% offline with zero external API costs.',
    highlights: [
      'Ollama runtime integration with quantized Mistral 7B model',
      'Zero external API dependencies ensuring complete data privacy',
      'Interactive web UI with conversation memory and task templates'
    ],
    tags: ['Flask', 'Ollama', 'Mistral', 'Local LLMs', 'Edge AI'],
    githubUrl: 'https://github.com/Riyanshu-07/Ai-Assistant',
  },
  {
    id: 'realitydiff',
    title: 'RealityDiff AI',
    category: 'Applied AI & Vision',
    badge: 'ORIGINAL',
    description: 'An AI-focused exploration into intelligent vision analysis and differential feature synthesis.',
    highlights: [
      'Computer vision feature comparison pipelines',
      'Differential neural analysis across image pairs'
    ],
    tags: ['Python', 'AI/ML', 'Computer Vision'],
    githubUrl: 'https://github.com/Riyanshu-07/RealityDiff',
  },
  {
    id: 'commitpulse',
    title: 'CommitPulse',
    category: 'Visual Systems & GraphQL',
    badge: 'FORK · CONTRIBUTION',
    description: 'High-performance Next.js API converting raw GitHub contribution data into 3D isometric visualizations with real-time GraphQL syncing. (Forked from JhaSourav07/commitpulse; contributed code improvements).',
    highlights: [
      'Real-time GitHub GraphQL API streaming',
      '3D isometric canvas rendering of commit heatmaps'
    ],
    tags: ['TypeScript', 'Next.js', 'GraphQL', '3D Isometric'],
    githubUrl: 'https://github.com/Riyanshu-07/commitpulse',
  }
];

export const SKILL_CATEGORIES = [
  {
    name: 'PROGRAMMING',
    skills: [
      { name: 'Python', level: 'Expert', desc: 'Core ML language, PyTorch, NumPy, Flask, FastAPI' },
      { name: 'Java', level: 'Advanced', desc: 'DSA on LeetCode & GeeksforGeeks (500+ solved)' },
      { name: 'C / C++', level: 'Intermediate', desc: 'Memory efficiency, algorithmic foundations' },
      { name: 'JavaScript / TypeScript', level: 'Advanced', desc: 'Modern web, Three.js, React, Node' },
      { name: 'SQL', level: 'Intermediate', desc: 'Relational databases, SQLite, Supabase' },
    ]
  },
  {
    name: 'AI & MACHINE LEARNING',
    skills: [
      { name: 'Machine Learning', level: 'Advanced', desc: 'Regression, classification, random forests, clustering' },
      { name: 'Deep Learning', level: 'Advanced', desc: 'CNNs, RNNs, Autoencoders, ResNet architectures' },
      { name: 'Generative AI', level: 'Advanced', desc: 'GANs, diffusion, style transfer, multimodal avatars' },
      { name: 'LLMs & RAG', level: 'Advanced', desc: 'Retrieval-Augmented Generation, vector embeddings' },
      { name: 'Agentic AI', level: 'Advanced', desc: 'Multi-agent orchestration, Agno, Groq, tool calling' },
      { name: 'Explainable AI', level: 'Advanced', desc: 'SHAP (Shapley values), model transparency' },
    ]
  },
  {
    name: 'COMPUTER VISION & NLP',
    skills: [
      { name: 'Computer Vision', level: 'Advanced', desc: 'OpenCV, Dlib facial landmarks, image processing' },
      { name: 'Neural Style Transfer', level: 'Advanced', desc: 'AdaIN, VGG-19 feature statistics normalization' },
      { name: 'Transformers & NLP', level: 'Advanced', desc: 'Hugging Face T5, text summarization, tokenizers' },
      { name: 'Audio Biometrics', level: 'Intermediate', desc: 'Resemblyzer, Librosa voice verification' },
    ]
  },
  {
    name: 'FRAMEWORKS & TOOLS',
    skills: [
      { name: 'PyTorch & Torchvision', level: 'Advanced', desc: 'Model training, custom autograd, GPU acceleration' },
      { name: 'FastAPI & Flask', level: 'Advanced', desc: 'REST API microservices, model serving' },
      { name: 'Three.js & Web Audio', level: 'Advanced', desc: 'Interactive 3D visuals, VRM avatars, spatial audio' },
      { name: 'Streamlit & Docker', level: 'Advanced', desc: 'Rapid prototyping, containerized ML pipelines' },
      { name: 'Git & GitHub', level: 'Advanced', desc: 'Version control, open-source collaboration (GSSoC)' },
    ]
  }
];

export const JOURNEY_STAGES = [
  {
    stage: 'STAGE 01',
    title: 'Programming Foundations',
    tech: 'Python · Java',
    description: 'Syntax, logic structures, and building the daily non-negotiable habit of writing production code.'
  },
  {
    stage: 'STAGE 02',
    title: 'Data Structures & Algorithms',
    tech: 'Java · LeetCode · GfG',
    description: 'Solved 500+ algorithmic problems across trees, graphs, dynamic programming, and greedy methods.'
  },
  {
    stage: 'STAGE 03',
    title: 'Machine Learning',
    tech: 'NumPy · Pandas · scikit-learn',
    description: 'Statistical groundwork, feature engineering, and classical machine learning models.'
  },
  {
    stage: 'STAGE 04',
    title: 'Deep Learning & Computer Vision',
    tech: 'PyTorch · Torchvision · OpenCV',
    description: 'Trained convolutional neural networks, GANs, and vision architectures from scratch on GPUs.'
  },
  {
    stage: 'STAGE 05',
    title: 'NLP & Transformers',
    tech: 'T5 · Hugging Face · FastAPI',
    description: 'Sequence-to-sequence transformers, tokenization, and deployable NLP text summarization services.'
  },
  {
    stage: 'STAGE 06',
    title: 'Generative AI & RAG',
    tech: 'Groq · Agno · ChromaDB',
    description: 'Vector embeddings, semantic retrieval-augmented generation pipelines, and local LLMs (Ollama).'
  },
  {
    stage: 'STAGE 07',
    title: 'Agentic & Multi-Agent Systems',
    tech: 'Agno · Groq · Multimodal 3D',
    description: 'Coordinating autonomous specialized agents (research, verification, summarization) into resilient pipelines.'
  },
  {
    stage: 'NOW',
    title: 'Build · Experiment · Improve',
    tech: 'Digital Twin · Open-Source',
    description: 'Deepening multimodal digital twin systems and contributing to high-impact open-source initiatives.'
  }
];
