import { useState } from 'react';
import { useContent } from './utils/ContentContext';
import ParallaxBanner from './ParallaxBanner';
import Timeline from './Timeline';
import Gallery from './Gallery';
import MusicPlayer from './MusicPlayer';
import LoveQuiz from './LoveQuiz';
import LoveChatbot from './LoveChatbot';
import { uploadToCloudinary } from './utils/uploadToCloudinary';
import './AdminPanel.css';

const password = 'iyikisen2024';

function AdminPanel() {
  const [step, setStep] = useState('login');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [uploadStatus, setUploadStatus] = useState({});
  const { content, updateContent } = useContent();

  const handleLogin = () => {
    if (input === password) {
      setStep('panel');
      setError('');
    } else {
      setError('Şifre yanlış!');
    }
  };

  const handleEdit = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSave = async () => {
    if (editingField && content) {
      const newContent = { ...content };
      if (editingField.includes('.')) {
        const [parent, child] = editingField.split('.');
        newContent[parent] = { ...newContent[parent], [child]: editValue };
      } else {
        newContent[editingField] = editValue;
      }
      await updateContent(newContent);
      setEditingField(null);
      setEditValue('');
    }
  };

  // Cloudinary ile dosya yükleme
  const handleFileUpload = async (event, field, type = 'auto') => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Yükleme durumunu güncelle
        setUploadStatus(prev => ({ ...prev, [field]: 'Yükleniyor...' }));
        
        const url = await uploadToCloudinary(file);
        
        if (content) {
          const newContent = { ...content };
          // timeline.gallery.music gibi alanlar için dinamik güncelleme
          const fieldParts = field.split('.');
          if (fieldParts.length === 3) {
            // Örn: timeline.0.media.src
            const [parent, idx, subfield] = fieldParts;
            if (Array.isArray(newContent[parent])) {
              const arr = [...newContent[parent]];
              if (subfield === 'media.src') {
                arr[Number(idx)] = {
                  ...arr[Number(idx)],
                  media: { ...arr[Number(idx)].media, src: url }
                };
              } else {
                arr[Number(idx)] = {
                  ...arr[Number(idx)],
                  [subfield]: url
                };
              }
              newContent[parent] = arr;
            }
          } else if (fieldParts.length === 2) {
            // Örn: gallery.0.src veya music.0.src
            const [parent, idx] = fieldParts;
            if (Array.isArray(newContent[parent])) {
              const arr = [...newContent[parent]];
              arr[Number(idx)] = {
                ...arr[Number(idx)],
                src: url
              };
              newContent[parent] = arr;
            }
          } else {
            // Tek alan
            newContent[field] = url;
          }
          await updateContent(newContent);
          
          // Başarı durumunu güncelle
          setUploadStatus(prev => ({ ...prev, [field]: 'Başarıyla yüklendi!' }));
          
          // 3 saniye sonra durum mesajını temizle
          setTimeout(() => {
            setUploadStatus(prev => {
              const newStatus = { ...prev };
              delete newStatus[field];
              return newStatus;
            });
          }, 3000);
        }
      } catch (error) {
        console.error('Dosya yükleme hatası:', error);
        setUploadStatus(prev => ({ ...prev, [field]: `Hata: ${error.message}` }));
        
        // 5 saniye sonra hata mesajını temizle
        setTimeout(() => {
          setUploadStatus(prev => {
            const newStatus = { ...prev };
            delete newStatus[field];
            return newStatus;
          });
        }, 5000);
      } finally {
        // Input'u sıfırla
        event.target.value = '';
      }
    }
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

  if (!content) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="main-bg">
      <div className="header-center">
        <center><div className="heart-animation">❤️</div></center>
        <center>
          <h1 className="main-title">
            {editingField === 'title' ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  className="edit-input"
                />
              </div>
            ) : (
              <span onClick={() => handleEdit('title', content.title)}>
                {content.title}
              </span>
            )}
          </h1>
        </center>
        <center>
          <p className="subtitle">
            {editingField === 'description' ? (
              <div className="edit-container">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleSave}
                  className="edit-textarea"
                />
              </div>
            ) : (
              <span onClick={() => handleEdit('description', content.description)}>
                {content.description}
              </span>
            )}
          </p>
        </center>
      </div>
      
      <div className="welcome-message">
        <center>
          <p className="main-title">
            {editingField === 'welcomeMessage' ? (
              <div className="edit-container">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleSave}
                  className="edit-textarea-large"
                />
              </div>
            ) : (
              <span onClick={() => handleEdit('welcomeMessage', content.welcomeMessage)}>
                {(content.welcomeMessage || "").split('\n').map((line, i) => (
                  <span key={i}>
                    {line}<br />
                  </span>
                ))}
              </span>
            )}
          </p>
        </center>
      </div>

      <ParallaxBanner />

      {/* Timeline Section with Admin Controls */}
      <div className="admin-section">
        <h2>Zaman Tüneli</h2>
        <Timeline />
        <div className="admin-controls">
          <h3>Zaman Tüneli Düzenle</h3>
          <div className="upload-info">
            <p>💡 <strong>Dosya Yükleme Bilgisi:</strong></p>
            <ul>
              <li>Desteklenen formatlar: JPG, PNG, GIF, WebP, MP4, WebM, OGG, MP3, WAV</li>
              <li>Maksimum dosya boyutu: 10MB</li>
              <li>Dosyalar Cloudinary'ye yüklenir ve kalıcı olarak saklanır</li>
              <li>Yükleme başarısız olursa dosya geçici olarak tarayıcıda saklanır</li>
            </ul>
          </div>
          <div className="admin-timeline-controls">
            {Array.isArray(content.timeline) && content.timeline.map((item, index) => (
              <div key={index} className="admin-timeline-item">
                <input
                  type="date"
                  value={item.date}
                  onChange={(e) => {
                    const newTimeline = [...content.timeline];
                    newTimeline[index] = { ...item, date: e.target.value };
                    updateContent({ ...content, timeline: newTimeline });
                  }}
                />
                <input
                  type="text"
                  placeholder="Başlık"
                  value={item.title}
                  onChange={(e) => {
                    const newTimeline = [...content.timeline];
                    newTimeline[index] = { ...item, title: e.target.value };
                    updateContent({ ...content, timeline: newTimeline });
                  }}
                />
                <textarea
                  placeholder="Açıklama"
                  value={item.description}
                  onChange={(e) => {
                    const newTimeline = [...content.timeline];
                    newTimeline[index] = { ...item, description: e.target.value };
                    updateContent({ ...content, timeline: newTimeline });
                  }}
                />
                <div className="media-upload">
                  <input
                    type="text"
                    placeholder="Medya URL"
                    value={item.media?.src || ''}
                    onChange={(e) => {
                      const newTimeline = [...content.timeline];
                      newTimeline[index] = {
                        ...item,
                        media: { ...item.media, src: e.target.value }
                      };
                      updateContent({ ...content, timeline: newTimeline });
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e, `timeline.${index}.media.src`)}
                  />
                  {uploadStatus[`timeline.${index}.media.src`] && (
                    <div className={`upload-status ${uploadStatus[`timeline.${index}.media.src`].startsWith('Hata') ? 'upload-error' : ''}`}>
                      {uploadStatus[`timeline.${index}.media.src`]}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    const newTimeline = content.timeline.filter((_, i) => i !== index);
                    updateContent({ ...content, timeline: newTimeline });
                  }}
                  className="delete-btn"
                >
                  Sil
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newTimeline = [...(content.timeline || []), {
                  date: '',
                  title: '',
                  description: '',
                  media: { type: 'image', src: '', alt: '' }
                }];
                updateContent({ ...content, timeline: newTimeline });
              }}
              className="add-btn"
            >
              Yeni Zaman Tüneli Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Section with Admin Controls */}
      <div className="admin-section">
        <h2>Galeri</h2>
        <Gallery />
        <div className="admin-controls">
          <h3>Galeri Düzenle</h3>
          <div className="upload-info">
            <p>💡 <strong>Dosya Yükleme Bilgisi:</strong></p>
            <ul>
              <li>Desteklenen formatlar: JPG, PNG, GIF, WebP, MP4, WebM, OGG</li>
              <li>Maksimum dosya boyutu: 10MB</li>
              <li>Dosyalar Cloudinary'ye yüklenir ve kalıcı olarak saklanır</li>
              <li>Yükleme başarısız olursa dosya geçici olarak tarayıcıda saklanır</li>
            </ul>
          </div>
          <div className="admin-gallery-controls">
            {Array.isArray(content.gallery) && content.gallery.map((item, index) => (
              <div key={index} className="admin-gallery-item">
                <select
                  value={item.type}
                  onChange={(e) => {
                    const newGallery = [...content.gallery];
                    newGallery[index] = { ...item, type: e.target.value };
                    updateContent({ ...content, gallery: newGallery });
                  }}
                >
                  <option value="image">Fotoğraf</option>
                  <option value="video">Video</option>
                </select>
                <input
                  type="text"
                  placeholder="Medya URL"
                  value={item.src}
                  onChange={(e) => {
                    const newGallery = [...content.gallery];
                    newGallery[index] = { ...item, src: e.target.value };
                    updateContent({ ...content, gallery: newGallery });
                  }}
                />
                <input
                  type="file"
                  accept={item.type === 'image' ? 'image/*' : 'video/*'}
                  onChange={(e) => handleFileUpload(e, `gallery.${index}`)}
                />
                {uploadStatus[`gallery.${index}`] && (
                  <div className={`upload-status ${uploadStatus[`gallery.${index}`].startsWith('Hata') ? 'upload-error' : ''}`}>
                    {uploadStatus[`gallery.${index}`]}
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Açıklama"
                  value={item.alt}
                  onChange={(e) => {
                    const newGallery = [...content.gallery];
                    newGallery[index] = { ...item, alt: e.target.value };
                    updateContent({ ...content, gallery: newGallery });
                  }}
                />
                <button
                  onClick={() => {
                    const newGallery = content.gallery.filter((_, i) => i !== index);
                    updateContent({ ...content, gallery: newGallery });
                  }}
                  className="delete-btn"
                >
                  Sil
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newGallery = [...(content.gallery || []), {
                  type: 'image',
                  src: '',
                  alt: ''
                }];
                updateContent({ ...content, gallery: newGallery });
              }}
              className="add-btn"
            >
              Yeni Galeri Öğesi Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Music Section with Admin Controls */}
      <div className="admin-section">
        <h2>Müzik</h2>
        <MusicPlayer />
        <div className="admin-controls">
          <h3>Müzik Düzenle</h3>
          <div className="upload-info">
            <p>💡 <strong>Dosya Yükleme Bilgisi:</strong></p>
            <ul>
              <li>Desteklenen formatlar: MP3, WAV, OGG</li>
              <li>Maksimum dosya boyutu: 10MB</li>
              <li>Dosyalar Cloudinary'ye yüklenir ve kalıcı olarak saklanır</li>
              <li>Yükleme başarısız olursa dosya geçici olarak tarayıcıda saklanır</li>
            </ul>
          </div>
          <div className="admin-music-controls">
            {Array.isArray(content.music) && content.music.map((item, index) => (
              <div key={index} className="admin-music-item">
                <input
                  type="text"
                  placeholder="Şarkı Adı"
                  value={item.title}
                  onChange={(e) => {
                    const newMusic = [...content.music];
                    newMusic[index] = { ...item, title: e.target.value };
                    updateContent({ ...content, music: newMusic });
                  }}
                />
                <input
                  type="text"
                  placeholder="Sanatçı"
                  value={item.artist}
                  onChange={(e) => {
                    const newMusic = [...content.music];
                    newMusic[index] = { ...item, artist: e.target.value };
                    updateContent({ ...content, music: newMusic });
                  }}
                />
                <input
                  type="text"
                  placeholder="Müzik URL"
                  value={item.src}
                  onChange={(e) => {
                    const newMusic = [...content.music];
                    newMusic[index] = { ...item, src: e.target.value };
                    updateContent({ ...content, music: newMusic });
                  }}
                />
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileUpload(e, `music.${index}`)}
                />
                {uploadStatus[`music.${index}`] && (
                  <div className={`upload-status ${uploadStatus[`music.${index}`].startsWith('Hata') ? 'upload-error' : ''}`}>
                    {uploadStatus[`music.${index}`]}
                  </div>
                )}
                <button
                  onClick={() => {
                    const newMusic = content.music.filter((_, i) => i !== index);
                    updateContent({ ...content, music: newMusic });
                  }}
                  className="delete-btn"
                >
                  Sil
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newMusic = [...(content.music || []), {
                  title: '',
                  artist: '',
                  src: ''
                }];
                updateContent({ ...content, music: newMusic });
              }}
              className="add-btn"
            >
              Yeni Müzik Ekle
            </button>
          </div>
        </div>
      </div>

      <LoveQuiz />
      <LoveChatbot />
    </div>
  );
}

export default AdminPanel; 