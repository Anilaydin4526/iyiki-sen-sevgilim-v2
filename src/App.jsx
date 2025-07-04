import React, { useState } from "react";
import ParallaxBanner from "./ParallaxBanner";
import AdminPanel from "./AdminPanel";
import Timeline from "./Timeline";
import Gallery from "./Gallery";
import MusicPlayer from "./MusicPlayer";
import LoveQuiz from "./LoveQuiz";
import LoveChatbot from "./LoveChatbot";
import "./App.css";
import { ContentProvider, useContent } from "./utils/ContentContext.jsx";

function MainContent({ admin }) {
  const { content, loading, error } = useContent();

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;
  if (!content) return null;

  return (
    <div className="main-bg">
      <button
        className="header-admin-btn"
        onClick={() => window.location.reload()}
      >
        {admin ? "Siteye Dön" : "Yönetici Girişi"}
      </button>
      <div className="header-center">
        <center><div className="heart-animation">❤️</div></center>
        <center><h1 className="main-title">{content.title}</h1></center>
        <center>
          <p className="subtitle">{content.description}</p>
        </center>
      </div>
      <div className="welcome-message">
        <center>
          <p>{content.welcomeMessage || "Hoş geldin!"}</p>
        </center>
      </div>
      <ParallaxBanner bannerText={content.bannerText} />
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

function App() {
  const [admin, setAdmin] = useState(false);
  return (
    <ContentProvider>
      <MainContent admin={admin} />
    </ContentProvider>
  );
}

export default App;
