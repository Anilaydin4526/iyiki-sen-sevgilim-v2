import React, { useState } from 'react';
import './LoveChatbot.css';

const GEMINI_API_KEY = 'AIzaSyC43mEy_0M0XtcYdNxp8eZQ9D91n8mE7Zg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY;

function LoveChatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Merhaba! Ben senin aşk botunum. Bana istediğini yazabilirsin 💌' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setLoading(true);
    setError('');
    try {
      const res = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }]
        })
      });
      const data = await res.json();
      let botText = 'Bir hata oluştu.';
      if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        botText = data.candidates[0].content.parts.map(p => p.text).join(' ');
      }
      setMessages(msgs => [...msgs, { from: 'bot', text: botText }]);
    } catch (e) {
      setError('AI bağlantı hatası!');
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">Aşk Botu (Gemini AI)</h2>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-msg ${msg.from}`}>{msg.text}</div>
        ))}
        {loading && <div className="chatbot-msg bot">Yazıyor...</div>}
      </div>
      <div className="chatbot-input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Mesajını yaz..."
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>Gönder</button>
      </div>
      {error && <div className="admin-error">{error}</div>}
    </div>
  );
}

export default LoveChatbot; 