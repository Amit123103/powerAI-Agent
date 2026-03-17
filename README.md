# 🚀 Perfect AI Agent - PowerAI

A premium, high-performance AI Chatbot featuring real-time Voice Conversation, ultra-fast NVIDIA NIM integration, and sophisticated modern design.

![Perfect AI Agent UI](client/src/assets/hero.png)

## ✨ Key Features

- **🎙️ Real-Time Voice Loop**: Hands-free conversation experience. The AI listens, thinks, and speaks back automatically without manual clicks.
- **🔇 Concise Mastery**: Engineered for direct answers. No fluff, no introductory padding—just the facts and solutions you need.
- **⚡ NVIDIA NIM Power**: Integrated with `llama-3.1-405b-instruct` for expert-level reasoning at lightning speeds.
- **🔊 Premium AI Voice**: High-quality Text-to-Speech (TTS) for natural conversations (with a high-quality local fallback for NVIDIA users).
- **💎 Modern UI/UX**: Sophisticated glassmorphism design with smooth micro-animations and responsive layouts.
- **🛡️ Secure Proxy**: Enterprise-grade Node.js backend to keep your API keys safe.
- **📝 Markdown Support**: Professional formatting for tables, code, and lists.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, CSS3 (Vanilla), React-Markdown
- **Backend**: Node.js, Express, OpenAI SDK
- **APIs**: NVIDIA NIM (Meta Llama 3.1), OpenAI TTS

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- NPM or Yarn
- NVIDIA NIM API Key or OpenAI API Key

### 1. Repository Setup
```bash
git clone https://github.com/Amit123103/powerAI-Agent.git
cd powerAI-Agent
```

### 2. Backend Configuration
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder:
```env
OPENAI_API_KEY=your_nvapi_or_openai_key_here
PORT=5000
```
Start the server:
```bash
node index.js
```

### 3. Frontend Configuration
Navigate to the `client` directory and install dependencies:
```bash
cd ../client
npm install
npm run dev
```

## 📂 Project Structure

```text
├── client/           # React Frontend (Vite)
│   ├── src/
│   │   ├── components/ # VoiceMode and UI components
│   │   ├── App.jsx     # Main Logic
│   │   └── index.css   # Premium Styles
├── server/           # Node.js Backend
│   └── index.js      # API Proxy & TTS logic
└── .gitignore        # Security for API Keys
```

## 🤝 Contributing
Feel free to fork this project and submit pull requests for any features or bug fixes!

---
Created with ❤️ by [Amit123103](https://github.com/Amit123103)
