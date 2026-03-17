import React, { useState, useEffect, useRef } from 'react';

const VoiceMode = ({ onSendMessage, isProcessing, isAiSpeaking }) => {
  const [isListening, setIsListening] = useState(false);
  const [isHandsFree, setIsHandsFree] = useState(true);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setTranscript(currentTranscript);
        
        if (event.results[0].isFinal) {
          onSendMessage(currentTranscript);
          setTranscript('');
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setIsHandsFree(false);
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onSendMessage]);

  useEffect(() => {
    // Auto-restart logic for hands-free mode
    if (isHandsFree && !isProcessing && !isAiSpeaking && !isListening) {
      const timer = setTimeout(() => {
        try {
          recognitionRef.current?.start();
          setIsListening(true);
        } catch (e) {
          console.error('Auto-start failed:', e);
        }
      }, 500); // Small delay to ensure audio is fully cleared
      return () => clearTimeout(timer);
    }
  }, [isHandsFree, isProcessing, isAiSpeaking, isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  return (
    <div className="voice-mode-container">
      <div className="voice-mode-controls">
        <label className="hands-free-toggle">
          <input 
            type="checkbox" 
            checked={isHandsFree} 
            onChange={(e) => setIsHandsFree(e.target.checked)} 
          />
          <span>Hands-Free Loop</span>
        </label>
      </div>

      <div className={`visualizer ${isListening ? 'active' : ''} ${isProcessing || isAiSpeaking ? 'processing' : ''}`}>
        <div className="circle large"></div>
        <div className="circle medium"></div>
        <div className="circle small"></div>
        <button 
          className={`mic-button ${isListening ? 'listening' : ''}`} 
          onClick={toggleListening}
          disabled={isProcessing || isAiSpeaking}
        >
          {isListening ? (
            <svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          )}
        </button>
      </div>
      
      <div className="transcript-preview">
        {transcript || (isListening ? 'Listening...' : isAiSpeaking ? 'AI is speaking...' : 'Ready to listen')}
      </div>
      
      {(isProcessing || isAiSpeaking) && (
        <div className="voice-status">
          {isProcessing ? 'AI is thinking...' : 'AI is speaking...'}
        </div>
      )}
    </div>
  );
};

export default VoiceMode;
