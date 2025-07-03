import React, { useRef, useState } from 'react';
import './MusicPlayer.css';

const playlist = [
  {
    title: 'Sonsuza Dek',
    artist: 'Aşkımızın Şarkısı',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: 'Birlikte Güzel',
    artist: 'Romantik Anlar',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
];

function MusicPlayer() {
  const [current, setCurrent] = useState(0);
  const audioRef = useRef(null);

  const playNext = () => {
    setCurrent((prev) => (prev + 1) % playlist.length);
  };
  const playPrev = () => {
    setCurrent((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="music-player-container">
      <h2 className="music-title">Müzik Çalar</h2>
      <div className="music-info">
        <span className="music-song">{playlist[current].title}</span>
        <span className="music-artist">{playlist[current].artist}</span>
      </div>
      <audio
        ref={audioRef}
        src={playlist[current].src}
        controls
        autoPlay
        onEnded={playNext}
        className="music-audio"
      />
      <div className="music-controls">
        <button onClick={playPrev}>&lt;&lt; Önceki</button>
        <button onClick={playNext}>Sonraki &gt;&gt;</button>
      </div>
    </div>
  );
}

export default MusicPlayer; 