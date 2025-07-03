import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const ADMIN_PASSWORD = 'iyikisen2024'; // Dilersen burayı değiştirirsin

function getTimeline() {
  return JSON.parse(localStorage.getItem('timelineData') || '[]');
}
function setTimeline(data) {
  localStorage.setItem('timelineData', JSON.stringify(data));
}

function getGallery() {
  return JSON.parse(localStorage.getItem('galleryData') || '[]');
}
function setGallery(data) {
  localStorage.setItem('galleryData', JSON.stringify(data));
}

function getMusic() {
  return JSON.parse(localStorage.getItem('musicData') || '[]');
}
function setMusic(data) {
  localStorage.setItem('musicData', JSON.stringify(data));
}

function getQuiz() {
  return JSON.parse(localStorage.getItem('quizData') || '[]');
}
function setQuiz(data) {
  localStorage.setItem('quizData', JSON.stringify(data));
}

function AdminPanel() {
  const [step, setStep] = useState('login');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [timeline, setTimelineState] = useState([]);
  const [newItem, setNewItem] = useState({ date: '', title: '', description: '', image: '' });
  const [gallery, setGalleryState] = useState([]);
  const [newGallery, setNewGallery] = useState({ type: 'image', src: '', alt: '' });
  const [music, setMusicState] = useState([]);
  const [newMusic, setNewMusic] = useState({ title: '', artist: '', src: '' });
  const [quiz, setQuizState] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ question: '', options: ['', '', '', ''], answer: 0 });

  useEffect(() => {
    if (step === 'panel') {
      setTimelineState(getTimeline());
      setGalleryState(getGallery());
      setMusicState(getMusic());
      setQuizState(getQuiz());
    }
  }, [step]);

  const handleLogin = () => {
    if (input === ADMIN_PASSWORD) {
      setStep('panel');
      setError('');
    } else {
      setError('Şifre yanlış!');
    }
  };

  const handleAdd = () => {
    if (!newItem.date || !newItem.title || !newItem.description) return;
    const updated = [...timeline, newItem];
    setTimeline(updated);
    setTimelineState(updated);
    setNewItem({ date: '', title: '', description: '', image: '' });
  };

  const setTimeline = (data) => {
    setTimelineState(data);
    setTimeline(data);
  };

  const handleDelete = (idx) => {
    const updated = timeline.filter((_, i) => i !== idx);
    setTimeline(updated);
    setTimelineState(updated);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setNewItem({ ...newItem, image: ev.target.result });
    reader.readAsDataURL(file);
  };

  const handleGalleryAdd = () => {
    if (!newGallery.src || !newGallery.alt) return;
    const updated = [...gallery, newGallery];
    setGallery(updated);
    setGalleryState(updated);
    setNewGallery({ type: 'image', src: '', alt: '' });
  };

  const setGallery = (data) => {
    setGalleryState(data);
    setGallery(data);
  };

  const handleGalleryDelete = (idx) => {
    const updated = gallery.filter((_, i) => i !== idx);
    setGallery(updated);
    setGalleryState(updated);
  };

  const handleGalleryFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setNewGallery({ ...newGallery, src: ev.target.result });
    reader.readAsDataURL(file);
  };

  const handleMusicAdd = () => {
    if (!newMusic.src || !newMusic.title) return;
    const updated = [...music, newMusic];
    setMusic(updated);
    setMusicState(updated);
    setNewMusic({ title: '', artist: '', src: '' });
  };

  const setMusic = (data) => {
    setMusicState(data);
    setMusic(data);
  };

  const handleMusicDelete = (idx) => {
    const updated = music.filter((_, i) => i !== idx);
    setMusic(updated);
    setMusicState(updated);
  };

  const handleMusicFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setNewMusic({ ...newMusic, src: ev.target.result });
    reader.readAsDataURL(file);
  };

  const handleQuizAdd = () => {
    if (!newQuiz.question || newQuiz.options.some(opt => !opt)) return;
    const updated = [...quiz, newQuiz];
    setQuiz(updated);
    setQuizState(updated);
    setNewQuiz({ question: '', options: ['', '', '', ''], answer: 0 });
  };

  const setQuiz = (data) => {
    setQuizState(data);
    setQuiz(data);
  };

  const handleQuizDelete = (idx) => {
    const updated = quiz.filter((_, i) => i !== idx);
    setQuiz(updated);
    setQuizState(updated);
  };

  if (step === 'login') {
    return (
      <div className="admin-login-container">
        <h2>Yönetici Girişi</h2>
        <input
          type="password"
          placeholder="Şifre"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin}>Giriş Yap</button>
        {error && <div className="admin-error">{error}</div>}
      </div>
    );
  }

  return (
    <div className="admin-panel-container">
      <h2>Yönetici Paneli</h2>
      <h3>Zaman Tüneli Yönetimi</h3>
      <div className="admin-timeline-list">
        {timeline.map((item, idx) => (
          <div key={idx} className="admin-timeline-item">
            <div><b>{item.date}</b> - <b>{item.title}</b></div>
            <div>{item.description}</div>
            {item.image && <img src={item.image} alt="" style={{maxWidth:80, maxHeight:60}} />}
            <button onClick={() => handleDelete(idx)}>Sil</button>
          </div>
        ))}
      </div>
      <div className="admin-timeline-add">
        <input type="date" value={newItem.date} onChange={e => setNewItem({ ...newItem, date: e.target.value })} />
        <input type="text" placeholder="Başlık" value={newItem.title} onChange={e => setNewItem({ ...newItem, title: e.target.value })} />
        <input type="text" placeholder="Açıklama" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} />
        <input type="file" accept="image/*" onChange={handleImage} />
        <button onClick={handleAdd}>Ekle</button>
      </div>
      <h3>Galeri Yönetimi</h3>
      <div className="admin-gallery-list">
        {gallery.map((item, idx) => (
          <div key={idx} className="admin-gallery-item">
            <div><b>{item.type === 'image' ? 'Fotoğraf' : 'Video'}</b> - {item.alt}</div>
            {item.type === 'image' ? (
              <img src={item.src} alt={item.alt} style={{maxWidth:80, maxHeight:60}} />
            ) : (
              <video src={item.src} controls style={{maxWidth:80, maxHeight:60}} />
            )}
            <button onClick={() => handleGalleryDelete(idx)}>Sil</button>
          </div>
        ))}
      </div>
      <div className="admin-gallery-add">
        <select value={newGallery.type} onChange={e => setNewGallery({ ...newGallery, type: e.target.value })}>
          <option value="image">Fotoğraf</option>
          <option value="video">Video</option>
        </select>
        <input type="text" placeholder="Açıklama" value={newGallery.alt} onChange={e => setNewGallery({ ...newGallery, alt: e.target.value })} />
        <input type="file" accept={newGallery.type === 'image' ? 'image/*' : 'video/*'} onChange={handleGalleryFile} />
        <button onClick={handleGalleryAdd}>Ekle</button>
      </div>
      <h3>Müzik Yönetimi</h3>
      <div className="admin-music-list">
        {music.map((item, idx) => (
          <div key={idx} className="admin-music-item">
            <div><b>{item.title}</b> - {item.artist}</div>
            <audio src={item.src} controls style={{maxWidth:120}} />
            <button onClick={() => handleMusicDelete(idx)}>Sil</button>
          </div>
        ))}
      </div>
      <div className="admin-music-add">
        <input type="text" placeholder="Şarkı Adı" value={newMusic.title} onChange={e => setNewMusic({ ...newMusic, title: e.target.value })} />
        <input type="text" placeholder="Sanatçı" value={newMusic.artist} onChange={e => setNewMusic({ ...newMusic, artist: e.target.value })} />
        <input type="file" accept="audio/*" onChange={handleMusicFile} />
        <button onClick={handleMusicAdd}>Ekle</button>
      </div>
      <h3>Quiz (Oyun) Yönetimi</h3>
      <div className="admin-quiz-list">
        {quiz.map((item, idx) => (
          <div key={idx} className="admin-quiz-item">
            <div><b>{item.question}</b></div>
            <ol>
              {item.options.map((opt, i) => (
                <li key={i} style={{fontWeight: item.answer === i ? 'bold' : 'normal'}}>{opt}</li>
              ))}
            </ol>
            <button onClick={() => handleQuizDelete(idx)}>Sil</button>
          </div>
        ))}
      </div>
      <div className="admin-quiz-add">
        <input type="text" placeholder="Soru" value={newQuiz.question} onChange={e => setNewQuiz({ ...newQuiz, question: e.target.value })} />
        {newQuiz.options.map((opt, i) => (
          <input key={i} type="text" placeholder={`Seçenek ${i+1}`} value={opt} onChange={e => {
            const opts = [...newQuiz.options]; opts[i] = e.target.value;
            setNewQuiz({ ...newQuiz, options: opts });
          }} />
        ))}
        <select value={newQuiz.answer} onChange={e => setNewQuiz({ ...newQuiz, answer: Number(e.target.value) })}>
          {newQuiz.options.map((_, i) => <option key={i} value={i}>{`Doğru: Seçenek ${i+1}`}</option>)}
        </select>
        <button onClick={handleQuizAdd}>Ekle</button>
      </div>
    </div>
  );
}

export default AdminPanel; 