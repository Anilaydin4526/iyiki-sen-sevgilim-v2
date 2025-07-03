import React, { useEffect, useState } from 'react';
import './Timeline.css';

const defaultTimelineData = [
  {
    date: '2022-02-14',
    title: 'İlk Buluşmamız',
    description: 'O gün hayatımın en güzel günüydü. İlk defa göz göze geldik ve her şey başladı.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    date: '2022-05-01',
    title: 'İlk Tatilimiz',
    description: 'Birlikte çıktığımız ilk tatil, deniz kenarında uzun yürüyüşler ve bolca kahkaha...',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    date: '2023-01-01',
    title: 'Yeni Yıla Birlikte Giriş',
    description: 'Yeni yılı birlikte karşılamak, yeni umutlar ve hayallerle dolu bir geceydi.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
];

function Timeline() {
  const [timelineData, setTimelineData] = useState(defaultTimelineData);

  useEffect(() => {
    const stored = localStorage.getItem('timelineData');
    if (stored) {
      setTimelineData(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="timeline-container">
      <h2 className="timeline-title">Zaman Tünelimiz</h2>
      <div className="timeline-list">
        {timelineData.map((item, idx) => (
          <div className="timeline-item" key={idx}>
            <div className="timeline-date">{item.date}</div>
            <img className="timeline-img" src={item.image} alt={item.title} />
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline; 