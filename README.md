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

## 🚀 Deployment (GitHub & Render)

This project is configured for **Dual Deployment**:

### 1. Backend (Server) - Deployed on [Render](https://render.com)
The Node.js server acts as an API proxy.
- **Service Type:** Web Service
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:** Add `OPENAI_API_KEY` with your API key.

### 2. Frontend (Client) - Deployed on [GitHub Pages](https://pages.github.com)
The React app is automatically built and deployed to GitHub Pages every time you push to the `main` branch.
- **Automation:** Uses GitHub Actions in `.github/workflows/deploy-gh-pages.yml`.
- **Base Path:** Configured in `client/vite.config.js` as `/powerAI-Agent/`.
- **Live URL:** `https://amit123103.github.io/powerAI-Agent/`

---

## 📂 Project Structure
Built with intensity and precision by [Amit123103](https://github.com/Amit123103) & [Antigravity AI]
