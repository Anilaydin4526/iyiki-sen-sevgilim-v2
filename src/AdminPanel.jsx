import React, { useState } from 'react';
import './AdminPanel.css';
import { uploadToCloudinary } from "./utils/uploadToCloudinary";
import { useContent } from "./utils/ContentContext.jsx";

const password = 'iyikisen2024';

function EditableText({ value, onSave, label }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);
  return (
    <div className="editable-text" onMouseEnter={() => setEditing(true)} onMouseLeave={() => setEditing(false)}>
      {editing ? (
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => { setEditing(false); onSave(text); }}
          onKeyDown={e => { if (e.key === 'Enter') { setEditing(false); onSave(text); } }}
          autoFocus
        />
      ) : (
        <span>{text} <span className="edit-label">✏️ {label}</span></span>
      )}
    </div>
  );
}

function AdminPanel() {
  const { content, updateContent, loading } = useContent();
  const [step, setStep] = useState('login');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  // Zaman tüneli ekleme için state
  const [timelineInput, setTimelineInput] = useState({ date: '', title: '', description: '', media: null });

  if (step === 'login') {
    return (
      <div className="admin-login">
        <h2>Admin Paneli Girişi</h2>
        <input
          type="password"
          placeholder="Şifre"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={() => {
          if (input === password) setStep('panel');
          else setError('Hatalı şifre!');
        }}>Giriş</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    );
  }

  if (!content) return null;

  // Başlık, açıklama, bannerText düzenleme
  const handleTextSave = (field, value) => {
    updateContent({ [field]: value });
  };

  // Galeriye yeni medya ekleme
  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    let resourceType = "auto";
    if (file.type.startsWith("image/")) resourceType = "image";
    else if (file.type.startsWith("video/")) resourceType = "video";
    else if (file.type.startsWith("audio/")) resourceType = "video";
    const url = await uploadToCloudinary(file, resourceType);
    const newItem = {
      type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "audio",
      src: url,
      alt: file.name
    };
    updateContent({ gallery: [...(content.gallery || []), newItem] });
    setUploading(false);
  };

  // Galeriden medya silme
  const handleDeleteMedia = idx => {
    const newGallery = content.gallery.filter((_, i) => i !== idx);
    updateContent({ gallery: newGallery });
  };

  // Müzik ekleme
  const [musicInput, setMusicInput] = useState({ title: '', artist: '', src: '' });
  const handleAddMusic = () => {
    if (!musicInput.title || !musicInput.artist || !musicInput.src) return;
    updateContent({ music: [...(content.music || []), musicInput] });
    setMusicInput({ title: '', artist: '', src: '' });
  };
  // Müzik silme
  const handleDeleteMusic = idx => {
    const newMusic = content.music.filter((_, i) => i !== idx);
    updateContent({ music: newMusic });
  };

  // Zaman tüneline yeni olay ekle
  const handleAddTimeline = () => {
    if (!timelineInput.date || !timelineInput.title) return;
    updateContent({ timeline: [...(content.timeline || []), timelineInput] });
    setTimelineInput({ date: '', title: '', description: '', media: null });
  };
  // Zaman tünelinden olay sil
  const handleDeleteTimeline = idx => {
    const newTimeline = content.timeline.filter((_, i) => i !== idx);
    updateContent({ timeline: newTimeline });
  };
  // Zaman tüneli medya yükleme
  const handleTimelineMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    let resourceType = "auto";
    if (file.type.startsWith("image/")) resourceType = "image";
    else if (file.type.startsWith("video/")) resourceType = "video";
    const url = await uploadToCloudinary(file, resourceType);
    setTimelineInput(input => ({ ...input, media: { type: resourceType, src: url, alt: file.name } }));
    setUploading(false);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Paneli</h2>
      <div className="editable-section">
        <label>Başlık: </label>
        <EditableText value={content.title} onSave={v => handleTextSave('title', v)} label="Düzenle" />
      </div>
      <div className="editable-section">
        <label>Açıklama: </label>
        <EditableText value={content.description} onSave={v => handleTextSave('description', v)} label="Düzenle" />
      </div>
      <div className="editable-section">
        <label>Banner Yazısı: </label>
        <EditableText value={content.bannerText} onSave={v => handleTextSave('bannerText', v)} label="Düzenle" />
      </div>
      <section>
        <h3>Galeri (Fotoğraf & Video)</h3>
        <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} />
        {uploading && <p>Yükleniyor...</p>}
        <div className="media-preview">
          {(content.gallery || []).map((media, i) => (
            <div key={i} style={{ margin: 10, position: 'relative' }}>
              {media.type === "image" && (
                <img src={media.src} alt={media.alt} style={{ maxWidth: 200 }} />
              )}
              {media.type === "video" && (
                <video src={media.src} controls style={{ maxWidth: 200 }} />
              )}
              <button className="delete-btn" onClick={() => handleDeleteMedia(i)}>Sil</button>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3>Müzik Listesi</h3>
        <input placeholder="Şarkı adı" value={musicInput.title} onChange={e => setMusicInput({ ...musicInput, title: e.target.value })} />
        <input placeholder="Sanatçı" value={musicInput.artist} onChange={e => setMusicInput({ ...musicInput, artist: e.target.value })} />
        <input placeholder="MP3 URL" value={musicInput.src} onChange={e => setMusicInput({ ...musicInput, src: e.target.value })} />
        <button onClick={handleAddMusic}>Ekle</button>
        <div className="music-list">
          {(content.music || []).map((m, i) => (
            <div key={i} style={{ margin: 10, position: 'relative' }}>
              <span>{m.title} - {m.artist}</span>
              <audio src={m.src} controls style={{ display: 'block' }} />
              <button className="delete-btn" onClick={() => handleDeleteMusic(i)}>Sil</button>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3>Zaman Tüneli</h3>
        <div className="timeline-admin-list">
          {(content.timeline || []).map((item, idx) => (
            <div key={idx} className="timeline-admin-item">
              <div><b>{item.date}</b> - {item.title}</div>
              <div>{item.description}</div>
              {item.media && item.media.type === 'image' && (
                <img src={item.media.src} alt={item.media.alt} style={{ maxWidth: 120 }} />
              )}
              {item.media && item.media.type === 'video' && (
                <video src={item.media.src} controls style={{ maxWidth: 120 }} />
              )}
              <button className="delete-btn" onClick={() => handleDeleteTimeline(idx)}>Sil</button>
            </div>
          ))}
        </div>
        <div className="timeline-add">
          <input type="date" value={timelineInput.date} onChange={e => setTimelineInput(i => ({ ...i, date: e.target.value }))} />
          <input placeholder="Başlık" value={timelineInput.title} onChange={e => setTimelineInput(i => ({ ...i, title: e.target.value }))} />
          <input placeholder="Açıklama" value={timelineInput.description} onChange={e => setTimelineInput(i => ({ ...i, description: e.target.value }))} />
          <input type="file" accept="image/*,video/*" onChange={handleTimelineMediaUpload} />
          {uploading && <span>Yükleniyor...</span>}
          {timelineInput.media && timelineInput.media.type === 'image' && (
            <img src={timelineInput.media.src} alt={timelineInput.media.alt} style={{ maxWidth: 80 }} />
          )}
          {timelineInput.media && timelineInput.media.type === 'video' && (
            <video src={timelineInput.media.src} controls style={{ maxWidth: 80 }} />
          )}
          <button onClick={handleAddTimeline}>Ekle</button>
        </div>
      </section>
    </div>
  );
}

export default AdminPanel; 