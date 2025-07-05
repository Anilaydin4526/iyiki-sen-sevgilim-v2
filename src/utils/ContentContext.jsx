import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

// API base URL - use localhost for development, relative path for production
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3001' : '';

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // İçeriği API'dan çek
  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/content`);
      setContent(res.data);
      setError("");
    } catch (err) {
      console.error('Error fetching content:', err);
      setError("İçerik yüklenemedi");
      // Fallback to default content
      setContent({
        title: "İyiki Sen Sevgilim",
        description: "Birlikte geçirdiğimiz her an, bu sitede sonsuza dek yaşayacak...",
        bannerText: "Birlikte her an, sonsuz bir masal gibi...",
        welcomeMessage: "Hoş geldin Gülüm…",
        gallery: [],
        music: [],
        timeline: []
      });
    }
    setLoading(false);
  };

  // İçeriği API'ya kaydet
  const updateContent = async (newData) => {
    setLoading(true);
    try {
      const res = await axios.patch(`${API_BASE_URL}/api/content`, newData);
      setContent(res.data);
      setError("");
    } catch (err) {
      console.error('Error updating content:', err);
      setError("İçerik güncellenemedi");
      // Update local state even if API fails
      setContent(prev => ({ ...prev, ...newData }));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, error, fetchContent, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}; 