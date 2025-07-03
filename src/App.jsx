import ParallaxBanner from './ParallaxBanner';
import Timeline from './Timeline';
import Gallery from './Gallery';
import MusicPlayer from './MusicPlayer';
import SurpriseMessage from './SurpriseMessage';
import LoveQuiz from './LoveQuiz';
import LoveChatbot from './LoveChatbot';
import AdminPanel from './AdminPanel';

function App() {
  if (window.location.pathname === '/admin') {
    return <AdminPanel />;
  }
  return (
    <div className="main-bg">
      <button className="header-admin-btn" onClick={() => window.location.href = '/admin'}>Yönetici Girişi</button>
      <ParallaxBanner />
      <div className="heart-animation">❤️</div>
      <h1 className="main-title">İyiki Sen Sevgilim</h1>
      <p className="subtitle">Birlikte geçirdiğimiz her an, bu sitede sonsuza dek yaşayacak...</p>
      <div className="welcome-message">
        <p>Hoşgeldin! Bu site, aşkımızın hikayesini, anılarımızı ve sürprizleriyle dolu bir yolculuğu anlatıyor. Her tıklamada yeni bir sürpriz, her sayfada yeni bir anı seni bekliyor. Hazır mısın?</p>
      </div>
      <Timeline />
      <Gallery />
      <MusicPlayer />
      <SurpriseMessage />
      <LoveQuiz />
      <LoveChatbot />
    </div>
  );
}

export default App;