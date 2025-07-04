import { useState } from 'react';
import './LoveChatbot.css';

function LoveChatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Merhaba! Ben senin aşk botunum. Bana istediğini yazabilirsin 💌' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Sana cevap vermek için sabırsızlanıyorum! 💖' }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">Aşk Botu</h2>
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
    </div>
  );
}

export default LoveChatbot; 