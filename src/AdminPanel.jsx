import { useState, useEffect } from 'react';
import './AdminPanel.css';

const password = 'iyikisen2024';

function AdminPanel() {
  const [step, setStep] = useState('login');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  // Timeline
  const [timeline, setTimeline] = useState([]);
  const [newTimeline, setNewTimeline] = useState({ date: '', title: '', description: '', image: '' });
  // Gallery
  const [gallery, setGallery] = useState([]);
  const [newGallery, setNewGallery] = useState({ type: 'image', src: '', alt: '' });
  // Music
  const [music, setMusic] = useState([]);
  const [newMusic, setNewMusic] = useState({ title: '', artist: '', src: '' });
  // Quiz
  const [quiz, setQuiz] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ question: '', options: ['', '', '', ''], answer: 0 });

  useEffect(() => {
    if (step === 'panel') {
      setTimeline(JSON.parse(localStorage.getItem('timelineData') || '[]'));
      setGallery(JSON.parse(localStorage.getItem('galleryData') || '[]'));
      setMusic(JSON.parse(localStorage.getItem('musicData') || '[]'));
      setQuiz(JSON.parse(localStorage.getItem('quizData') || '[]'));
    }
  }, [step]);

  // Timeline
  const handleTimelineAdd = () => {
    if (!newTimeline.date || !newTimeline.title) return;
    const updated = [...timeline, newTimeline];
    setTimeline(updated);
    localStorage.setItem('timelineData', JSON.stringify(updated));
    setNewTimeline({ date: '', title: '', description: '', image: '' });
  };
  const handleTimelineDelete = idx => {
    const updated = timeline.filter((_, i) => i !== idx);
    setTimeline(updated);
    localStorage.setItem('timelineData', JSON.stringify(updated));
  };
  const handleTimelineEdit = (idx, key, value) => {
    const updated = timeline.map((item, i) => i === idx ? { ...item, [key]: value } : item);
    setTimeline(updated);
    localStorage.setItem('timelineData', JSON.stringify(updated));
  };
  // Gallery
  const handleGalleryAdd = () => {
    if (!newGallery.src || !newGallery.alt) return;
    const updated = [...gallery, newGallery];
    setGallery(updated);
    localStorage.setItem('galleryData', JSON.stringify(updated));
    setNewGallery({ type: 'image', src: '', alt: '' });
  };
  const handleGalleryDelete = idx => {
    const updated = gallery.filter((_, i) => i !== idx);
    setGallery(updated);
    localStorage.setItem('galleryData', JSON.stringify(updated));
  };
  const handleGalleryEdit = (idx, key, value) => {
    const updated = gallery.map((item, i) => i === idx ? { ...item, [key]: value } : item);
    setGallery(updated);
    localStorage.setItem('galleryData', JSON.stringify(updated));
  };
  // Music
  const handleMusicAdd = () => {
    if (!newMusic.src || !newMusic.title) return;
    const updated = [...music, newMusic];
    setMusic(updated);
    localStorage.setItem('musicData', JSON.stringify(updated));
    setNewMusic({ title: '', artist: '', src: '' });
  };
  const handleMusicDelete = idx => {
    const updated = music.filter((_, i) => i !== idx);
    setMusic(updated);
    localStorage.setItem('musicData', JSON.stringify(updated));
  };
  const handleMusicEdit = (idx, key, value) => {
    const updated = music.map((item, i) => i === idx ? { ...item, [key]: value } : item);
    setMusic(updated);
    localStorage.setItem('musicData', JSON.stringify(updated));
  };
  // Quiz
  const handleQuizAdd = () => {
    if (!newQuiz.question || newQuiz.options.some(opt => !opt)) return;
    const updated = [...quiz, newQuiz];
    setQuiz(updated);
    localStorage.setItem('quizData', JSON.stringify(updated));
    setNewQuiz({ question: '', options: ['', '', '', ''], answer: 0 });
  };
  const handleQuizDelete = idx => {
    const updated = quiz.filter((_, i) => i !== idx);
    setQuiz(updated);
    localStorage.setItem('quizData', JSON.stringify(updated));
  };
  const handleQuizEdit = (idx, key, value) => {
    const updated = quiz.map((item, i) => i === idx ? { ...item, [key]: value } : item);
    setQuiz(updated);
    localStorage.setItem('quizData', JSON.stringify(updated));
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
          onKeyDown={e => e.key === 'Enter' && (input === password ? setStep('panel') : setError('Şifre yanlış!'))}
        />
        <button onClick={() => input === password ? setStep('panel') : setError('Şifre yanlış!')}>Giriş Yap</button>
        {error && <div className="admin-error">{error}</div>}
      </div>
    );
  }

  return (
    <div className="admin-panel-container">
      <h2>Yönetici Paneli</h2>
      {/* Timeline */}
      <section>
        <h3>Zaman Tüneli</h3>
        <div className="admin-list">
          {timeline.map((item, idx) => (
            <div className="admin-item" key={idx}>
              <input value={item.date} onChange={e => handleTimelineEdit(idx, 'date', e.target.value)} />
              <input value={item.title} onChange={e => handleTimelineEdit(idx, 'title', e.target.value)} />
              <input value={item.description} onChange={e => handleTimelineEdit(idx, 'description', e.target.value)} />
              <input value={item.image} onChange={e => handleTimelineEdit(idx, 'image', e.target.value)} placeholder="Resim URL" />
              <button onClick={() => handleTimelineDelete(idx)}>Sil</button>
            </div>
          ))}
        </div>
        <div className="admin-add">
          <input type="date" value={newTimeline.date} onChange={e => setNewTimeline({ ...newTimeline, date: e.target.value })} />
          <input type="text" placeholder="Başlık" value={newTimeline.title} onChange={e => setNewTimeline({ ...newTimeline, title: e.target.value })} />
          <input type="text" placeholder="Açıklama" value={newTimeline.description} onChange={e => setNewTimeline({ ...newTimeline, description: e.target.value })} />
          <input type="text" placeholder="Resim URL" value={newTimeline.image} onChange={e => setNewTimeline({ ...newTimeline, image: e.target.value })} />
          <button onClick={handleTimelineAdd}>Ekle</button>
        </div>
      </section>
      {/* Gallery */}
      <section>
        <h3>Galeri</h3>
        <div className="admin-list">
          {gallery.map((item, idx) => (
            <div className="admin-item" key={idx}>
              <select value={item.type} onChange={e => handleGalleryEdit(idx, 'type', e.target.value)}>
                <option value="image">Fotoğraf</option>
                <option value="video">Video</option>
              </select>
              <input value={item.src} onChange={e => handleGalleryEdit(idx, 'src', e.target.value)} placeholder="URL" />
              <input value={item.alt} onChange={e => handleGalleryEdit(idx, 'alt', e.target.value)} placeholder="Açıklama" />
              <button onClick={() => handleGalleryDelete(idx)}>Sil</button>
            </div>
          ))}
        </div>
        <div className="admin-add">
          <select value={newGallery.type} onChange={e => setNewGallery({ ...newGallery, type: e.target.value })}>
            <option value="image">Fotoğraf</option>
            <option value="video">Video</option>
          </select>
          <input type="text" placeholder="URL" value={newGallery.src} onChange={e => setNewGallery({ ...newGallery, src: e.target.value })} />
          <input type="text" placeholder="Açıklama" value={newGallery.alt} onChange={e => setNewGallery({ ...newGallery, alt: e.target.value })} />
          <button onClick={handleGalleryAdd}>Ekle</button>
        </div>
      </section>
      {/* Music */}
      <section>
        <h3>Müzik</h3>
        <div className="admin-list">
          {music.map((item, idx) => (
            <div className="admin-item" key={idx}>
              <input value={item.title} onChange={e => handleMusicEdit(idx, 'title', e.target.value)} placeholder="Şarkı Adı" />
              <input value={item.artist} onChange={e => handleMusicEdit(idx, 'artist', e.target.value)} placeholder="Sanatçı" />
              <input value={item.src} onChange={e => handleMusicEdit(idx, 'src', e.target.value)} placeholder="URL" />
              <button onClick={() => handleMusicDelete(idx)}>Sil</button>
            </div>
          ))}
        </div>
        <div className="admin-add">
          <input type="text" placeholder="Şarkı Adı" value={newMusic.title} onChange={e => setNewMusic({ ...newMusic, title: e.target.value })} />
          <input type="text" placeholder="Sanatçı" value={newMusic.artist} onChange={e => setNewMusic({ ...newMusic, artist: e.target.value })} />
          <input type="text" placeholder="URL" value={newMusic.src} onChange={e => setNewMusic({ ...newMusic, src: e.target.value })} />
          <button onClick={handleMusicAdd}>Ekle</button>
        </div>
      </section>
      {/* Quiz */}
      <section>
        <h3>Quiz</h3>
        <div className="admin-list">
          {quiz.map((item, idx) => (
            <div className="admin-item" key={idx}>
              <input value={item.question} onChange={e => handleQuizEdit(idx, 'question', e.target.value)} placeholder="Soru" />
              {item.options.map((opt, i) => (
                <input key={i} value={opt} onChange={e => handleQuizEdit(idx, 'options', item.options.map((o, j) => j === i ? e.target.value : o))} placeholder={`Seçenek ${i+1}`} />
              ))}
              <select value={item.answer} onChange={e => handleQuizEdit(idx, 'answer', Number(e.target.value))}>
                {item.options.map((_, i) => <option key={i} value={i}>{`Doğru: Seçenek ${i+1}`}</option>)}
              </select>
              <button onClick={() => handleQuizDelete(idx)}>Sil</button>
            </div>
          ))}
        </div>
        <div className="admin-add">
          <input type="text" placeholder="Soru" value={newQuiz.question} onChange={e => setNewQuiz({ ...newQuiz, question: e.target.value })} />
          {newQuiz.options.map((opt, i) => (
            <input key={i} type="text" placeholder={`Seçenek ${i+1}`} value={opt} onChange={e => setNewQuiz({ ...newQuiz, options: newQuiz.options.map((o, j) => j === i ? e.target.value : o) })} />
          ))}
          <select value={newQuiz.answer} onChange={e => setNewQuiz({ ...newQuiz, answer: Number(e.target.value) })}>
            {newQuiz.options.map((_, i) => <option key={i} value={i}>{`Doğru: Seçenek ${i+1}`}</option>)}
          </select>
          <button onClick={handleQuizAdd}>Ekle</button>
        </div>
      </section>
    </div>
  );
}

export default AdminPanel; 