import { useState } from 'react';
import './LoveChatbot.css';
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyCkU66GIIV-9W6UdNvTvgzr_01m2D0HuCI';
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
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(GEMINI_API_URL, {
        contents: [{ role: 'user', parts: [{ text: input }] }]
      });
      const geminiReply = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Cevap alınamadı.';
      setMessages(msgs => [...msgs, { from: 'bot', text: geminiReply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Bir hata oluştu: ' + (err.response?.data?.error?.message || err.message) }]);
      setError('API Hatası: ' + (err.response?.data?.error?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">Aşk Botu</h2>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-msg ${msg.from}`}>{msg.text}</div>
        ))}
        {loading && <div className="chatbot-msg bot">Yazıyor...</div>}
        {error && <div className="chatbot-msg bot error">{error}</div>}
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
    </div>
  );
}

export default LoveChatbot; 