import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import VoiceMode from './components/VoiceMode';
import './index.css';

function App() {
  const [mode, setMode] = useState('chat'); // 'chat' or 'voice'
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '# Welcome to your AI Agent\n\nI am your **OpenAI-powered** assistant. I can help you with:\n\n*   **Complex Questions**: Ask me about research, coding, or facts.\n*   **Structuring Data**: I can provide organized lists and tables.\n*   **Casual Chat**: We can just talk!\n\nHow can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const synthesisRef = useRef(window.speechSynthesis);
  const audioRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speak = async (text) => {
    if (mode !== 'voice') return;

    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      setIsAiSpeaking(true);
      const response = await fetch('http://localhost:5000/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('TTS failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsAiSpeaking(false);
      };

      audio.play();
    } catch (error) {
      console.error('TTS Error:', error);
      // Fallback to high-quality browser synthesis if premium TTS fails
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      // Try to find a premium/natural sounding voice
      const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural')) || voices[0];
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.rate = 1;

      utterance.onstart = () => setIsAiSpeaking(true);
      utterance.onend = () => setIsAiSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: newMessages
            .filter((m, i) => i > 0 || m.role === 'user')
            .map(m => ({ role: m.role, content: m.content })) 
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || 'API request failed');
      }
      
      const aiContent = data.choices[0].message.content;
      const aiMessage = { role: 'assistant', content: aiContent };
      setMessages([...newMessages, aiMessage]);
      
      if (mode === 'voice') {
        speak(aiContent.replace(/[#*`]/g, ''));
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = `Error: ${error.message}. Please check server logs.`;
      setMessages([...newMessages, { role: 'assistant', content: errorMessage }]);
      if (mode === 'voice') speak("Sorry, I encountered an error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-left">
          <h1>Perfect AI Agent</h1>
          <div className="status-badge" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Powered by NVIDIA NIM / Llama 3.1
          </div>
        </div>
        
        <div className="chat-header-actions">
          <button 
            className={`mode-toggle ${mode === 'chat' ? 'active' : ''}`}
            onClick={() => setMode('chat')}
          >
            Chat
          </button>
          <button 
            className={`mode-toggle ${mode === 'voice' ? 'active' : ''}`}
            onClick={() => setMode('voice')}
          >
            Voice
          </button>
        </div>
      </div>

      {mode === 'chat' ? (
        <>
          <div className="messages-area">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role === 'user' ? 'user' : 'ai'}`}>
                {msg.role === 'assistant' ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message ai">
                <div className="typing-indicator">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="input-area" onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }}>
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !input.trim()}>
                Send
              </button>
            </div>
          </form>
        </>
      ) : (
        <VoiceMode 
          onSendMessage={handleSendMessage} 
          isProcessing={isLoading} 
          isAiSpeaking={isAiSpeaking}
        />
      )}
    </div>
  );
}

export default App;
