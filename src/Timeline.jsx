import { useContent } from './utils/ContentContext';
import './Timeline.css';

function Timeline() {
  const { content } = useContent();
  const timeline = content?.timeline || [];

  return (
    <div className="timeline-container">
      <h2 className="timeline-title">Zaman Tüneli</h2>
      <div className="timeline-list">
        {timeline.map((item, idx) => (
          <div className="timeline-item" key={idx}>
            <div className="timeline-date">{item.date}</div>
            <div className="timeline-content">
              <div className="timeline-header">{item.title}</div>
              <div className="timeline-desc">{item.description}</div>
              {item.media && item.media.type === 'image' && (
                <img src={item.media.src} alt={item.media.alt} className="timeline-img" />
              )}
              {item.media && item.media.type === 'video' && (
                <video src={item.media.src} controls className="timeline-video" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline; 