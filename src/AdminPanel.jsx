import React, { useState } from 'react';
import './AdminPanel.css';
import { uploadToCloudinary } from "./utils/uploadToCloudinary";
import { useContent } from "./utils/ContentContext";

const password = 'iyikisen2024';

function EditableText({ value, onSave, label, multiline = false }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  const handleSave = () => {
    setEditing(false);
    onSave(text);
  };

  return (
    <div className="editable-text-container">
      {editing ? (
        <div className="edit-mode">
          {multiline ? (
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); } }}
              autoFocus
              rows={4}
              className="edit-textarea"
            />
          ) : (
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={e => { if (e.key === 'Enter') { handleSave(); } }}
              autoFocus
              className="edit-input"
            />
          )}
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">✓</button>
            <button onClick={() => { setEditing(false); setText(value); }} className="cancel-btn">✗</button>
          </div>
        </div>
      ) : (
        <div className="display-mode" onClick={() => setEditing(true)}>
          <span className="text-content">{text}</span>
          <span className="edit-icon">✏️ {label}</span>
        </div>
      )}
    </div>
  );
}

function MediaUploader({ onUpload, accept = "image/*,video/*,audio/*", label = "Medya Yükle" }) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
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
      onUpload(newItem);
    } catch (error) {
      console.error('Upload failed:', error);
    }
    setUploading(false);
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;
    
    const fileType = urlInput.toLowerCase();
    let type = "image";
    if (fileType.includes('.mp4') || fileType.includes('.avi') || fileType.includes('.mov')) type = "video";
    else if (fileType.includes('.mp3') || fileType.includes('.wav')) type = "audio";
    
    const newItem = {
      type,
      src: urlInput,
      alt: "URL'den yüklenen medya"
    };
    onUpload(newItem);
    setUrlInput('');
    setShowUrlInput(false);
  };

  return (
    <div className="media-uploader">
      <div className="upload-options">
        <label className="file-upload-btn">
          <input type="file" accept={accept} onChange={handleFileUpload} />
          📁 Dosya Seç
        </label>
        <button 
          className="url-upload-btn"
          onClick={() => setShowUrlInput(!showUrlInput)}
        >
          🔗 URL Ekle
        </button>
      </div>
      
      {showUrlInput && (
        <div className="url-input-section">
          <input
            type="url"
            placeholder="Medya URL'si girin..."
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            className="url-input"
          />
          <button onClick={handleUrlSubmit} className="url-submit-btn">Ekle</button>
        </div>
      )}
      
      {uploading && <div className="upload-status">⏳ Yükleniyor...</div>}
    </div>
  );
}

function AdminPanel() {
  const { content, updateContent, loading } = useContent();
  const [step, setStep] = useState('login');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('main');

  if (step === 'login') {
    return (
      <div className="admin-login-container">
        <div className="heart-animation">❤️</div>
        <h2>Admin Paneli Girişi</h2>
        <input
          type="password"
          placeholder="Şifre"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (input === password) setStep('panel');
              else setError('Hatalı şifre!');
            }
          }}
        />
        <button onClick={() => {
          if (input === password) setStep('panel');
          else setError('Hatalı şifre!');
        }}>Giriş</button>
        {error && <div className="admin-error">{error}</div>}
      </div>
    );
  }

  if (!content) return <div className="loading">Yükleniyor...</div>;

  const handleTextSave = (field, value) => {
    updateContent({ [field]: value });
  };

  const handleGalleryUpload = (newItem) => {
    updateContent({ gallery: [...(content.gallery || []), newItem] });
  };

  const handleDeleteGallery = (idx) => {
    const newGallery = content.gallery.filter((_, i) => i !== idx);
    updateContent({ gallery: newGallery });
  };

  const handleMusicUpload = (newItem) => {
    updateContent({ music: [...(content.music || []), newItem] });
  };

  const handleDeleteMusic = (idx) => {
    const newMusic = content.music.filter((_, i) => i !== idx);
    updateContent({ music: newMusic });
  };

  const handleTimelineUpload = (newItem) => {
    updateContent({ timeline: [...(content.timeline || []), newItem] });
  };

  const handleDeleteTimeline = (idx) => {
    const newTimeline = content.timeline.filter((_, i) => i !== idx);
    updateContent({ timeline: newTimeline });
  };

  const navigationItems = [
    { id: 'main', label: 'Ana İçerik', icon: '🏠' },
    { id: 'gallery', label: 'Galeri', icon: '📸' },
    { id: 'music', label: 'Müzik', icon: '🎵' },
    { id: 'timeline', label: 'Zaman Tüneli', icon: '📅' }
  ];

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <div className="heart-animation">❤️</div>
        <h1 className="main-title">Admin Paneli</h1>
        <p className="subtitle">İçerikleri düzenle ve yönet</p>
      </div>

      <div className="admin-navigation">
        {navigationItems.map(item => (
          <button
            key={item.id}
            className={`nav-btn ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="admin-content">
        {activeSection === 'main' && (
          <div className="content-section">
            <h3>Ana Sayfa İçerikleri</h3>
            
            <div className="edit-group">
              <label>Site Başlığı:</label>
              <EditableText 
                value={content.title || "İyiki Sen Sevgilim"} 
                onSave={v => handleTextSave('title', v)} 
                label="Düzenle" 
              />
            </div>

            <div className="edit-group">
              <label>Alt Başlık:</label>
              <EditableText 
                value={content.description || "Birlikte geçirdiğimiz her an, bu sitede sonsuza dek yaşayacak..."} 
                onSave={v => handleTextSave('description', v)} 
                label="Düzenle" 
              />
            </div>

            <div className="edit-group">
              <label>Banner Yazısı:</label>
              <EditableText 
                value={content.bannerText || "Birlikte her an, sonsuz bir masal gibi..."} 
                onSave={v => handleTextSave('bannerText', v)} 
                label="Düzenle" 
              />
            </div>

            <div className="edit-group">
              <label>Hoş Geldin Mesajı:</label>
              <EditableText 
                value={content.welcomeMessage || "Hoş geldin Gülüm..."} 
                onSave={v => handleTextSave('welcomeMessage', v)} 
                label="Düzenle" 
                multiline={true}
              />
            </div>
          </div>
        )}

        {activeSection === 'gallery' && (
          <div className="content-section">
            <h3>Galeri Yönetimi</h3>
            
            <MediaUploader 
              onUpload={handleGalleryUpload}
              accept="image/*,video/*"
              label="Galeriye Medya Ekle"
            />

            <div className="media-grid">
              {(content.gallery || []).map((media, i) => (
                <div key={i} className="media-item">
                  <div className="media-preview">
                    {media.type === "image" && (
                      <img src={media.src} alt={media.alt} />
                    )}
                    {media.type === "video" && (
                      <video src={media.src} controls />
                    )}
                  </div>
                  <div className="media-info">
                    <span className="media-name">{media.alt}</span>
                    <span className="media-type">{media.type}</span>
                  </div>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDeleteGallery(i)}
                    title="Sil"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'music' && (
          <div className="content-section">
            <h3>Müzik Yönetimi</h3>
            
            <MediaUploader 
              onUpload={handleMusicUpload}
              accept="audio/*"
              label="Müzik Ekle"
            />

            <div className="music-list">
              {(content.music || []).map((music, i) => (
                <div key={i} className="music-item">
                  <div className="music-info">
                    <span className="music-title">{music.title}</span>
                    <span className="music-artist">{music.artist}</span>
                  </div>
                  <audio src={music.src} controls />
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDeleteMusic(i)}
                    title="Sil"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'timeline' && (
          <div className="content-section">
            <h3>Zaman Tüneli Yönetimi</h3>
            
            <TimelineEditor onAdd={handleTimelineUpload} />

            <div className="timeline-list">
              {(content.timeline || []).map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    {item.media && (
                      <div className="timeline-media">
                        {item.media.type === 'image' && (
                          <img src={item.media.src} alt={item.media.alt} />
                        )}
                        {item.media.type === 'video' && (
                          <video src={item.media.src} controls />
                        )}
                      </div>
                    )}
                  </div>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDeleteTimeline(i)}
                    title="Sil"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineEditor({ onAdd }) {
  const [timelineData, setTimelineData] = useState({
    date: '',
    title: '',
    description: '',
    media: null
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = () => {
    if (!timelineData.date || !timelineData.title) return;
    onAdd(timelineData);
    setTimelineData({ date: '', title: '', description: '', media: null });
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      let resourceType = "auto";
      if (file.type.startsWith("image/")) resourceType = "image";
      else if (file.type.startsWith("video/")) resourceType = "video";
      
      const url = await uploadToCloudinary(file, resourceType);
      setTimelineData(prev => ({
        ...prev,
        media: { type: resourceType, src: url, alt: file.name }
      }));
    } catch (error) {
      console.error('Upload failed:', error);
    }
    setUploading(false);
  };

  return (
    <div className="timeline-editor">
      <div className="timeline-form">
        <input
          type="date"
          value={timelineData.date}
          onChange={e => setTimelineData(prev => ({ ...prev, date: e.target.value }))}
          placeholder="Tarih"
        />
        <input
          type="text"
          value={timelineData.title}
          onChange={e => setTimelineData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Başlık"
        />
        <textarea
          value={timelineData.description}
          onChange={e => setTimelineData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Açıklama"
          rows={3}
        />
        
        <div className="media-upload-section">
          <label className="file-upload-btn">
            <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} />
            📷 Medya Ekle
          </label>
          {uploading && <span>Yükleniyor...</span>}
          {timelineData.media && (
            <div className="media-preview">
              {timelineData.media.type === 'image' && (
                <img src={timelineData.media.src} alt={timelineData.media.alt} />
              )}
              {timelineData.media.type === 'video' && (
                <video src={timelineData.media.src} controls />
              )}
            </div>
          )}
        </div>
        
        <button onClick={handleSubmit} className="add-btn">
          ➕ Zaman Tüneli Ekle
        </button>
      </div>
    </div>
  );
}

export default AdminPanel; 