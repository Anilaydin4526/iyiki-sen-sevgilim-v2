import React, { useState } from "react";
import ParallaxBanner from "./ParallaxBanner";
import AdminPanel from "./AdminPanel";
import Timeline from "./Timeline";
import Gallery from "./Gallery";
import MusicPlayer from "./MusicPlayer";
import LoveQuiz from "./LoveQuiz";
import LoveChatbot from "./LoveChatbot";
import "./App.css";

function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <div className="main-bg">
      <button
        className="header-admin-btn"
        onClick={() => setAdmin((a) => !a)}
      >
        {admin ? "Siteye Dön" : "Yönetici Girişi"}
      </button>
      <div className="header-center">
        <center><div className="heart-animation">❤️</div></center>
        <center><h1 className="main-title">İyiki Sen Sevgilim</h1></center>
        <center>
          <p className="subtitle">
            Birlikte geçirdiğimiz her an, bu sitede sonsuza dek yaşayacak...
          </p>
        </center>
      </div>
      <div className="welcome-message">
        <center>
       <p className="main-title">
  Hoş geldin Gülüm…<br /><br />
  Bazen karşımda minik bir kız çocuğu varmış gibi seviyorum seni…<br />
  Küçücük bir kalbin varmış gibi sarıyorum seni…<br />
  Bazen sessizce avuçlarından öpüyorum…<br /><br />
  "Gülüm" diyorum sana…<br />
  Çünkü gülüşüm oldun sen…<br />
  Çünkü gözlerinle açan bir gül bahçesi gibisin bana.<br /><br />
  Kalbim sana ait bir yuva artık…<br />
  Bu site de o yuvanın küçük dijital penceresi.<br /><br />
  Baktıkça seni göreceğim…<br />
  Okudukça seni hissedeceğim…<br />
  Ve her satırda yeniden seveceğim seni.<br /><br />
  01.01.2025 – bizim hikâyemizin yazıldığı ilk gün…<br />
  Ama bu sayfa, her gün yeniden yazılan bir “seni seviyorum” cümlesi…<br /><br />
  Senin için, sadece senin için...
</p>


        </center>
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
}

export default App; 
