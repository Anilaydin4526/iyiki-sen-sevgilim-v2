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
         Hoş geldin Gülüm…

Bazen karşımda minik bir kız çocuğu varmış gibi seviyorum seni…
Küçücük bir kalbin varmış gibi sarıyorum seni…
Bazen sessizce avuçlarından öpüyorum…

"Gülüm" diyorum sana…
Çünkü gülüşüm oldun sen…
Çünkü gözlerinle açan bir gül bahçesi gibisin bana.

Kalbim sana ait bir yuva artık…
Bu site de o yuvanın küçük dijital penceresi.

Baktıkça seni göreceğim…
Okudukça seni hissedeceğim…
Ve her satırda yeniden seveceğim seni.

01.01.2025 – bizim hikâyemizin yazıldığı ilk gün…
Ama bu sayfa, her gün yeniden yazılan bir “seni seviyorum” cümlesi…

Senin için, sadece senin için...
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
