const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, 'content-data.json');

function readData() {
  if (!fs.existsSync(DATA_PATH)) {
    // Varsayılan veri
    const defaultData = {
      title: "İyiki Sen Sevgilim",
      description: "Birlikte geçirdiğimiz her an, bu sitede sonsuza dek yaşayacak...",
      bannerText: "Birlikte her an, sonsuz bir masal gibi...",
      welcomeMessage: "Hoş geldin!",
      gallery: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
          alt: "Birlikte gülüşümüz"
        }
      ],
      music: [
        {
          title: "Sonsuza Dek",
          artist: "Aşkımızın şarkısı",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        }
      ],
      timeline: [
        {
          date: "2024-01-01",
          title: "İlk Buluşma",
          description: "Birlikte ilk defa buluştuk.",
          media: {
            type: "image",
            src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
            alt: "İlk buluşma fotoğrafı"
          }
        }
      ]
    };
    fs.writeFileSync(DATA_PATH, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const data = readData();
      res.status(200).json(data);
    } else if (req.method === 'POST' || req.method === 'PATCH') {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {
          return res.status(400).json({ error: 'Invalid JSON' });
        }
      }
      
      const current = readData();
      const updated = { ...current, ...body };
      writeData(updated);
      res.status(200).json(updated);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 