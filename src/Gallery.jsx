import { useEffect, useState } from 'react';
import './Gallery.css';

const defaultGallery = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    alt: 'Birlikte gülüşümüz',
  },
  {
    type: 'video',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    alt: 'Birlikte çektiğimiz video',
  },
];

function Gallery() {
  const [gallery, setGallery] = useState(defaultGallery);

  useEffect(() => {
    const stored = localStorage.getItem('galleryData');
    if (stored) setGallery(JSON.parse(stored));
  }, []);

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Fotoğraf & Video Galerisi</h2>
      <div className="gallery-grid">
        {gallery.map((item, idx) => (
          <div className="gallery-item" key={idx}>
            {item.type === 'image' ? (
              <img src={item.src} alt={item.alt} className="gallery-img" />
            ) : (
              <video controls className="gallery-video">
                <source src={item.src} type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery; 