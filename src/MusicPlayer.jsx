import React, { useRef, useState } from "react";
import { useContent } from './utils/ContentContext';
import './MusicPlayer.css';

function MusicPlayer() {
  const { content } = useContent();
  const playlist = Array.isArray(content?.music) ? content.music : [];
  const [current, setCurrent] = useState(0);
  const audioRef = useRef(null);

  const playNext = () => setCurrent((prev) => (prev + 1) % playlist.length);
  const playPrev = () => setCurrent((prev) => (prev - 1 + playlist.length) % playlist.length);

  if (playlist.length === 0) return null;

  return (
    <div className="music-player-container">
      <h2 className="music-title">Müzik Çalar</h2>
      <div className="music-info">
        <span className="music-song">{playlist[current].title}</span>
        <span className="music-artist">{playlist[current].artist}</span>
      </div>
      {playlist[current].youtubeUrl ? (
        <div className="music-youtube-embed">
          <iframe
            width="320"
            height="180"
            src={`https://www.youtube.com/embed/${playlist[current].youtubeUrl.split('v=')[1]?.split('&')[0] || ''}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <audio
          ref={audioRef}
          src={playlist[current].src}
          controls
          autoPlay
          onEnded={playNext}
          className="music-audio"
        />
      )}
      <div className="music-controls">
        <button onClick={playPrev}>&lt;&lt; Önceki</button>
        <button onClick={playNext}>Sonraki &gt;&gt;</button>
      </div>
    </div>
  );
}

export default MusicPlayer; 
