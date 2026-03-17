# 🚀 Perfect AI Agent - PowerAI

A premium, high-performance AI Chatbot featuring **Real-Time Hands-Free Voice**, ultra-fast **NVIDIA NIM** (Llama 3.1 405B) integration, and sophisticated modern design.

![Perfect AI Agent UI](client/src/assets/hero.png)

## ✨ Key Features

- **🎙️ Real-Time Voice Loop**: Experience the future with a seamless "Hands-Free" conversational flow. Talk, listen, and repeat—completely automatically.
- **🔇 Concise Mastery**: Engineered for zero-fluff. The AI delivers direct, professional answers without unnecessary introductory filler.
- **⚡ NVIDIA NIM Power**: Integrated with `meta/llama-3.1-405b-instruct` for expert-level reasoning at lightning speeds.
- **🔊 Premium AI Voice**: High-quality natural speech (Alloy) integration with an intelligent high-quality fallback for NVIDIA users.
- **💎 Premium UI Design**: Sophisticated glassmorphism aesthetics, pulsating visualizers, and smooth micro-animations.
- **🛡️ Secure Proxy**: Enterprise-grade Node.js backend to keep your API keys private and safe.
- **📝 Markdown Support**: Professional formatting for tables, code, and lists.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, CSS3 (Vanilla), React-Markdown (Gfm)
- **Backend**: Node.js, Express, OpenAI SDK
- **APIs**: NVIDIA NIM & OpenAI TTS

## 🚀 Getting Started (Zero-Config)

### 1. Repository Setup
```bash
git clone https://github.com/Amit123103/powerAI-Agent.git
cd powerAI-Agent
```

### 2. Quick Start (Development)
Create a `.env` file in the `server` folder:
```env
OPENAI_API_KEY=your_key_here
PORT=5000
```
Run the full stack from the root:
```bash
npm install # Installs root, client, and server
npm start   # Starts the production backend
```

### 3. Production Deployment (Render)
- **Backend (Web Service):** Root: `server`, Build: `npm install`, Start: `npm start`. Add `OPENAI_API_KEY` to env vars.
- **Frontend (Static Site):** Root: `client`, Build: `npm install; npm run build`, Publish: `dist`.

---
Built with intensity and precision by [Amit123103](https://github.com/Amit123103) & [Antigravity AI]
