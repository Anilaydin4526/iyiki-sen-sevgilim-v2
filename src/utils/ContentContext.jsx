import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // İçeriği API'dan çek
  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/content");
      setContent(res.data);
      setError("");
    } catch (err) {
      setError("İçerik yüklenemedi");
    }
    setLoading(false);
  };

  // İçeriği API'ya kaydet
  const updateContent = async (newData) => {
    setLoading(true);
    try {
      const res = await axios.patch("/api/content", newData);
      setContent(res.data);
      setError("");
    } catch (err) {
      setError("İçerik güncellenemedi");
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