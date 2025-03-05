// pages/api/predict.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { temperature, humidity, sunlight } = req.body;

    try {
      const response = await axios.post(apiUrl, { temperature, humidity, sunlight, vpd, time });
      return response.data;
  } catch (error) {
      console.error("Prediction API error:", error);  // 👈 error 변수를 사용하여 eslint 오류 방지
  }
  } else {
    res.status(405).json({ error: '메소드 허용되지 않음' });
  }
}
