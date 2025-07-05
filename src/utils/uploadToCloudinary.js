import axios from "axios";

export async function uploadToCloudinary(file) {
  const url = 'https://api.cloudinary.com/v1_1/dejdb80bv/auto/upload';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'iyikisen');
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return data.secure_url;
}

export const uploadToCloudinary = async (file, resourceType = "auto") => {
  const url = `https://api.cloudinary.com/v1_1/dejdb80bv/${resourceType}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "iyikisen");

  const response = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.secure_url; // Yüklenen dosyanın linki
}; 