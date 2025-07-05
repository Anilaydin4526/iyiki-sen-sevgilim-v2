import React, { useState } from 'react';
import './AdminPanel.css';
import { uploadToCloudinary } from "./utils/uploadToCloudinary";
import { useContent } from "./utils/ContentContext.jsx";
import ParallaxBanner from "./ParallaxBanner";
import Timeline from "./Timeline";
import Gallery from "./Gallery";
import MusicPlayer from "./MusicPlayer";
import LoveQuiz from "./LoveQuiz";
import LoveChatbot from "./LoveChatbot";

function EditableText({ value, onSave, label, className = "" }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);
  
  return (
    <div className={`editable-text ${className}`} 
         onMouseEnter={() => setEditing(true)} 
         onMouseLeave={() => setEditing(false)}>
      {editing ? (
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => { setEditing(false); onSave(text); }}
          onKeyDown={e => { if (e.key === 'Enter') { setEditing(false); onSave(text); } }}
          autoFocus
          className="edit-input"
        />
      ) : (
        <span className="editable-content">
          {text} 
          <span className="edit-label">✏️ {label}</span>
        </span>
      )}
    </div>
  );
}

function EditableImage({ src, alt, onSave, onDelete, className = "" }) {
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(src);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, "image");
      onSave({ src: url, alt: file.name });
    } catch (error) {
      console.error("Yükleme hatası:", error);
    }
    setUploading(false);
    setEditing(false);
  };

  const handleUrlSave = () => {
    onSave({ src: urlInput, alt: alt });
    setEditing(false);
  };

  return (
    <div className={`editable-image ${className}`} 
         onMouseEnter={() => setEditing(true)} 
         onMouseLeave={() => setEditing(false)}>
      <img src={src} alt={alt} />
      {editing && (
        <div className="image-edit-overlay">
          <div className="edit-options">
            <div className="url-input-section">
              <input
                type="text"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="URL girin"
                className="url-input"
              />
              <button onClick={handleUrlSave} className="url-save-btn">URL Kaydet</button>
            </div>
            <div className="file-upload-section">
              <input 
                type="file" 
                accept="image/*,video/*,audio/*" 
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="media-upload"
              />
              <label htmlFor="media-upload" className="upload-btn">
                {uploading ? "Yükleniyor..." : "Dosya Yükle"}
              </label>
            </div>
            <button className="delete-btn" onClick={onDelete}>Sil</button>
          </div>
        </div>
      )}
    </div>
  );
}

function EditableVideo({ src, alt, onSave, onDelete, className = "" }) {
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(src);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, "video");
      onSave({ src: url, alt: file.name });
    } catch (error) {
      console.error("Yükleme hatası:", error);
    }
    setUploading(false);
    setEditing(false);
  };

  const handleUrlSave = () => {
    onSave({ src: urlInput, alt: alt });
    setEditing(false);
  };

  return (
    <div className={`editable-video ${className}`} 
         onMouseEnter={() => setEditing(true)} 
         onMouseLeave={() => setEditing(false)}>
      <video controls>
        <source src={src} type="video/mp4" />
        Tarayıcınız video oynatmayı desteklemiyor.
      </video>
      {editing && (
        <div className="video-edit-overlay">
          <div className="edit-options">
            <div className="url-input-section">
              <input
                type="text"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="Video URL girin"
                className="url-input"
              />
              <button onClick={handleUrlSave} className="url-save-btn">URL Kaydet</button>
            </div>
            <div className="file-upload-section">
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="video-upload"
              />
              <label htmlFor="video-upload" className="upload-btn">
                {uploading ? "Yükleniyor..." : "Video Yükle"}
              </label>
            </div>
            <button className="delete-btn" onClick={onDelete}>Sil</button>
          </div>
        </div>
      )}
    </div>
  );
}

function EditableAudio({ src, alt, onSave, onDelete, className = "" }) {
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(src);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, "video");
      onSave({ src: url, alt: file.name });
    } catch (error) {
      console.error("Yükleme hatası:", error);
    }
    setUploading(false);
    setEditing(false);
  };

  const handleUrlSave = () => {
    onSave({ src: urlInput, alt: alt });
    setEditing(false);
  };

  return (
    <div className={`editable-audio ${className}`} 
         onMouseEnter={() => setEditing(true)} 
         onMouseLeave={() => setEditing(false)}>
      <audio controls>
        <source src={src} type="audio/mpeg" />
        Tarayıcınız ses oynatmayı desteklemiyor.
      </audio>
      {editing && (
        <div className="audio-edit-overlay">
          <div className="edit-options">
            <div className="url-input-section">
              <input
                type="text"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="Ses URL girin"
                className="url-input"
              />
              <button onClick={handleUrlSave} className="url-save-btn">URL Kaydet</button>
            </div>
            <div className="file-upload-section">
              <input 
                type="file" 
                accept="audio/*" 
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="audio-upload"
              />
              <label htmlFor="audio-upload" className="upload-btn">
                {uploading ? "Yükleniyor..." : "Ses Yükle"}
              </label>
            </div>
            <button className="delete-btn" onClick={onDelete}>Sil</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminPanel() {
  const { content, updateContent, loading } = useContent();
  const [uploading, setUploading] = useState(false);

  // Zaman tüneli ekleme için state
  const [timelineInput, setTimelineInput] = useState({ date: '', title: '', description: '', media: null });

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

  // Galeri medya güncelleme
  const handleUpdateMedia = (idx, updatedMedia) => {
    const newGallery = [...content.gallery];
    newGallery[idx] = updatedMedia;
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

  // Müzik güncelleme
  const handleUpdateMusic = (idx, updatedMusic) => {
    const newMusic = [...content.music];
    newMusic[idx] = updatedMusic;
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

  // Zaman tüneli güncelleme
  const handleUpdateTimeline = (idx, updatedTimeline) => {
    const newTimeline = [...content.timeline];
    newTimeline[idx] = updatedTimeline;
    updateContent({ timeline: newTimeline });
  };

  return (
    <div className="admin-panel">
      <h2>Admin Paneli - Ana Ekran Önizleme ve Düzenleme</h2>
      
      {/* Ana Ekran Önizleme */}
      <div className="admin-preview">
        <h3>Ana Ekran Önizleme</h3>
        <div className="preview-container">
          <div className="main-bg">
            <div className="header-center">
              <center><div className="heart-animation">❤️</div></center>
              <center>
                <EditableText 
                  value={content.title} 
                  onSave={v => handleTextSave('title', v)} 
                  label="Başlık Düzenle" 
                  className="main-title"
                />
              </center>
              <center>
                <EditableText 
                  value={content.description} 
                  onSave={v => handleTextSave('description', v)} 
                  label="Açıklama Düzenle" 
                  className="subtitle"
                />
              </center>
            </div>
            <div className="welcome-message">
              <center>
                <EditableText 
                  value={content.welcomeMessage || "Hoş geldin!"} 
                  onSave={v => handleTextSave('welcomeMessage', v)} 
                  label="Hoş Geldin Mesajı Düzenle" 
                />
              </center>
            </div>
            <div className="banner-section">
              <EditableText 
                value={content.bannerText} 
                onSave={v => handleTextSave('bannerText', v)} 
                label="Banner Yazısı Düzenle" 
                className="banner-text"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Galeri Yönetimi */}
      <div className="admin-section">
        <h3>Galeri Yönetimi</h3>
        <div className="gallery-preview">
          <h4>Mevcut Galeri Öğeleri</h4>
          <div className="gallery-items">
            {content.gallery && content.gallery.map((item, idx) => (
              <div key={idx} className="gallery-item-admin">
                {item.type === 'image' && (
                  <EditableImage
                    src={item.src}
                    alt={item.alt}
                    onSave={(updated) => handleUpdateMedia(idx, { ...item, ...updated })}
                    onDelete={() => handleDeleteMedia(idx)}
                    className="gallery-image"
                  />
                )}
                {item.type === 'video' && (
                  <EditableVideo
                    src={item.src}
                    alt={item.alt}
                    onSave={(updated) => handleUpdateMedia(idx, { ...item, ...updated })}
                    onDelete={() => handleDeleteMedia(idx)}
                    className="gallery-video"
                  />
                )}
                {item.type === 'audio' && (
                  <EditableAudio
                    src={item.src}
                    alt={item.alt}
                    onSave={(updated) => handleUpdateMedia(idx, { ...item, ...updated })}
                    onDelete={() => handleDeleteMedia(idx)}
                    className="gallery-audio"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="add-media-section">
            <h4>Yeni Medya Ekle</h4>
            <input 
              type="file" 
              accept="image/*,video/*,audio/*" 
              onChange={handleMediaUpload}
              className="file-input"
            />
            {uploading && <p>Yükleniyor...</p>}
          </div>
        </div>
      </div>

      {/* Müzik Yönetimi */}
      <div className="admin-section">
        <h3>Müzik Yönetimi</h3>
        <div className="music-preview">
          <h4>Mevcut Müzikler</h4>
          {content.music && content.music.map((song, idx) => (
            <div key={idx} className="music-item-admin">
              <EditableText
                value={song.title}
                onSave={(value) => handleUpdateMusic(idx, { ...song, title: value })}
                label="Şarkı Adı"
                className="music-title"
              />
              <EditableText
                value={song.artist}
                onSave={(value) => handleUpdateMusic(idx, { ...song, artist: value })}
                label="Sanatçı"
                className="music-artist"
              />
              <EditableText
                value={song.src}
                onSave={(value) => handleUpdateMusic(idx, { ...song, src: value })}
                label="Müzik URL"
                className="music-url"
              />
              <button onClick={() => handleDeleteMusic(idx)} className="delete-music-btn">Müziği Sil</button>
            </div>
          ))}
          <div className="add-music-section">
            <h4>Yeni Müzik Ekle</h4>
            <input
              type="text"
              placeholder="Şarkı Adı"
              value={musicInput.title}
              onChange={e => setMusicInput({ ...musicInput, title: e.target.value })}
              className="music-input"
            />
            <input
              type="text"
              placeholder="Sanatçı"
              value={musicInput.artist}
              onChange={e => setMusicInput({ ...musicInput, artist: e.target.value })}
              className="music-input"
            />
            <input
              type="text"
              placeholder="Müzik URL"
              value={musicInput.src}
              onChange={e => setMusicInput({ ...musicInput, src: e.target.value })}
              className="music-input"
            />
            <button onClick={handleAddMusic} className="add-music-btn">Müzik Ekle</button>
          </div>
        </div>
      </div>

      {/* Zaman Tüneli Yönetimi */}
      <div className="admin-section">
        <h3>Zaman Tüneli Yönetimi</h3>
        <div className="timeline-preview">
          <h4>Mevcut Zaman Tüneli Öğeleri</h4>
          {content.timeline && content.timeline.map((event, idx) => (
            <div key={idx} className="timeline-item-admin">
              <EditableText
                value={event.date}
                onSave={(value) => handleUpdateTimeline(idx, { ...event, date: value })}
                label="Tarih"
                className="timeline-date"
              />
              <EditableText
                value={event.title}
                onSave={(value) => handleUpdateTimeline(idx, { ...event, title: value })}
                label="Başlık"
                className="timeline-title"
              />
              <EditableText
                value={event.description}
                onSave={(value) => handleUpdateTimeline(idx, { ...event, description: value })}
                label="Açıklama"
                className="timeline-description"
              />
              {event.media && (
                <div className="timeline-media">
                  {event.media.type === 'image' && (
                    <EditableImage
                      src={event.media.src}
                      alt={event.media.alt}
                      onSave={(updated) => handleUpdateTimeline(idx, { ...event, media: { ...event.media, ...updated } })}
                      onDelete={() => handleUpdateTimeline(idx, { ...event, media: null })}
                      className="timeline-image"
                    />
                  )}
                  {event.media.type === 'video' && (
                    <EditableVideo
                      src={event.media.src}
                      alt={event.media.alt}
                      onSave={(updated) => handleUpdateTimeline(idx, { ...event, media: { ...event.media, ...updated } })}
                      onDelete={() => handleUpdateTimeline(idx, { ...event, media: null })}
                      className="timeline-video"
                    />
                  )}
                </div>
              )}
              <button onClick={() => handleDeleteTimeline(idx)} className="delete-timeline-btn">Olayı Sil</button>
            </div>
          ))}
          <div className="add-timeline-section">
            <h4>Yeni Zaman Tüneli Olayı Ekle</h4>
            <input
              type="text"
              placeholder="Tarih (YYYY-MM-DD)"
              value={timelineInput.date}
              onChange={e => setTimelineInput({ ...timelineInput, date: e.target.value })}
              className="timeline-input"
            />
            <input
              type="text"
              placeholder="Başlık"
              value={timelineInput.title}
              onChange={e => setTimelineInput({ ...timelineInput, title: e.target.value })}
              className="timeline-input"
            />
            <input
              type="text"
              placeholder="Açıklama"
              value={timelineInput.description}
              onChange={e => setTimelineInput({ ...timelineInput, description: e.target.value })}
              className="timeline-input"
            />
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleTimelineMediaUpload}
              className="timeline-media-input"
            />
            <button onClick={handleAddTimeline} className="add-timeline-btn">Olay Ekle</button>
          </div>
        </div>
      </div>

      {/* Tam Önizleme */}
      <div className="admin-section">
        <h3>Tam Site Önizleme</h3>
        <div className="full-preview">
          <div className="main-bg">
            <div className="header-center">
              <center><div className="heart-animation">❤️</div></center>
              <center><h1 className="main-title">{content.title}</h1></center>
              <center><p className="subtitle">{content.description}</p></center>
            </div>
            <div className="welcome-message">
              <center><p>{content.welcomeMessage || "Hoş geldin!"}</p></center>
            </div>
            <ParallaxBanner bannerText={content.bannerText} />
            <Timeline />
            <Gallery />
            <MusicPlayer />
            <LoveQuiz />
            <LoveChatbot />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel; 