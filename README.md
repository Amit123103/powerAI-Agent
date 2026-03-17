# 🚀 Perfect AI Agent - PowerAI

A premium, high-performance AI Chatbot featuring real-time Voice Conversation, ultra-fast NVIDIA NIM integration, and sophisticated modern design.

![Perfect AI Agent UI](client/src/assets/hero.png)

## ✨ Key Features

- **🎙️ Real-Time Voice Loop**: Hands-free conversation experience. The AI listens, thinks, and speaks back automatically.
- **⚡ NVIDIA NIM Integration**: Powered by `llama-3.1-405b` for lightning-fast, expert-level reasoning.
- **🔊 Premium AI Voice**: High-quality Text-to-Speech (TTS) integration for a natural conversational feel.
- **💎 Modern UI/UX**: Glassmorphism design, smooth micro-animations, and responsive layout for all devices.
- **🛡️ Secure Proxy**: Dedicated Node.js backend to protect your API keys.
- **📝 Markdown Support**: Beautifully formatted responses including tables, lists, and code blocks.

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
