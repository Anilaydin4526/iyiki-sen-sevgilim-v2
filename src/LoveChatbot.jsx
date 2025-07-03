import React, { useState } from 'react';
import './LoveChatbot.css';

const responses = [
  {
    keywords: ['seni seviyorum', 'aşk'],
    answer: 'Ben de seni çok seviyorum! 💖'
  },
  {
    keywords: ['özledim'],
    answer: 'Ben de seni çok özledim! Sarılmak için sabırsızlanıyorum. 🤗'
  },
  {
    keywords: ['güzel', 'tatlı'],
    answer: 'Sen benden daha güzelsin! 😍'
  },
  {
    keywords: ['mutlu'],
    answer: 'Seninle her anım çok mutlu! 😊'
  },
  {
    keywords: ['nasılsın'],
    answer: 'Seninle olduğum için çok iyiyim! Sen nasılsın?'
  },
];

const randomReplies = [
  'Sana her gün yeniden aşık oluyorum! 💘',
  'Birlikte nice güzel anılar biriktireceğiz!',
  'Seninle hayat çok daha güzel!',
  'Sana sürprizlerim bitmez! 🎁',
  'Gülüşün dünyamı aydınlatıyor! ☀️',
];

function getBotReply(message) {
  const lower = message.toLowerCase();
  for (const resp of responses) {
    if (resp.keywords.some((kw) => lower.includes(kw))) {
      return resp.answer;
    }
  }
  return randomReplies[Math.floor(Math.random() * randomReplies.length)];
}

function LoveChatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Merhaba! Ben senin aşk botunum. Bana istediğini yazabilirsin 💌' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    const botMsg = { from: 'bot', text: getBotReply(input) };
    setMessages([...messages, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">Aşk Botu</h2>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-msg ${msg.from}`}>{msg.text}</div>
        ))}
      </div>
      <div className="chatbot-input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Mesajını yaz..."
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Gönder</button>
      </div>
    </div>
  );
}

export default LoveChatbot; 