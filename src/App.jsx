  return (
    <div className="main-bg">
      <button
        className="header-admin-btn"
        onClick={() => setAdmin((a) => !a)}
      >
        {admin ? "Siteye Dön" : "Yönetici Girişi"}
      </button>
      <div className="header-center">
        <div className="heart-animation">❤️</div>
        <h1 className="main-title">İyiki Sen Sevgilim</h1>
        <p className="subtitle">
          Birlikte geçirdiğimiz her an, bu sitede sonsuza dek yaşayacak...
        </p>
      </div>
      <div className="welcome-message">
        <p>
          Hoşgeldin! Bu site, aşkımızın hikayesini, anılarımızı ve sürprizleriyle dolu bir yolculuğu anlatıyor. Her tıklamada yeni bir sürpriz, her sayfada yeni bir anı seni bekliyor. Hazır mısın?
        </p>
      </div>
      <ParallaxBanner />
      {admin ? (
        <AdminPanel />
      ) : (
        <>
          <Timeline />
          <Gallery />
          <MusicPlayer />
          <LoveQuiz />
          <LoveChatbot />
        </>
      )}
    </div>
  ); 